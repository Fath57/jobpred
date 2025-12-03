import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../shared/prisma';
import { OnboardingUpdateDto } from './dto/onboarding-update.dto';
import { GenerateWeKnowYouDto } from './dto/generate-we-know-you.dto';
import { AuthService } from '../auth/auth.service';
import { Prisma } from '@prisma/client';
import { Step1PersonalInfoDto } from './dto/step1-personal-info.dto';
import { Step2ProfessionalInfoDto } from './dto/step2-professional-info.dto';
import { Step4JobDescriptionDto } from './dto/step4-job-description.dto';
import { AIService } from '../ai-service/ai.service';

@Injectable()
export class OnboardingService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    private aiService: AIService,
  ) {}

  // STEP 1: Informations personnelles
  async updatePersonalInfo(userId: string, updateDto: Step1PersonalInfoDto | OnboardingUpdateDto) {
    // Validation
    if (!updateDto.fullName || !updateDto.email) {
      throw new BadRequestException('Full name and email are required for step 1');
    }

    // Mise à jour User uniquement
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: updateDto.fullName.split(' ')[0],
        lastName: updateDto.fullName.split(' ').slice(1).join(' ') || '',
        email: updateDto.email,
        phone: updateDto.phone,
        linkedin: updateDto.linkedin,
        location: updateDto.location,
        onboardingStep: 1,
      },
      include: {
        candidate: {
          include: {
            candidateJobPreferences: true
          }
        }
      },
    });

    return updatedUser;
  }

  // STEP 2: Informations professionnelles (CandidateJobPreferences)
  async updateProfessionalInfo(userId: string, updateDto: Step2ProfessionalInfoDto | OnboardingUpdateDto) {
    // Validation
    if (!updateDto.desiredPosition || !updateDto.experience || !updateDto.workMode) {
      throw new BadRequestException('Desired position, experience and work mode are required for step 2');
    }

    // Récupérer l'utilisateur et vérifier si un candidat existe
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        candidate: {
          include: {
            candidateJobPreferences: true
          }
        }
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Générer un nom pour la candidature avec l'IA
    const generatedName = await this.aiService.generateJobPreferenceName({
      desiredPosition: updateDto.desiredPosition,
      experience: updateDto.experience,
      workMode: updateDto.workMode,
    });

    // Créer ou mettre à jour Candidate et CandidateJobPreferences
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        onboardingStep: 2,
        candidate: {
          upsert: {
            create: {
              fullName: `${user.firstName} ${user.lastName}`,
              email: user.email,
              phone: user.phone,
              linkedin: user.linkedin,
              location: user.location,
              aiProfileDescription: '',
              candidateJobPreferences: {
                create: {
                  name: generatedName,
                  desiredPosition: updateDto.desiredPosition,
                  experience: updateDto.experience,
                  workMode: updateDto.workMode,
                  isActive: true, // Première candidature est active par défaut
                }
              }
            },
            update: {
              candidateJobPreferences: user.candidate?.candidateJobPreferences?.[0]
                ? {
                    update: {
                      where: { id: user.candidate.candidateJobPreferences[0].id },
                      data: {
                        name: generatedName,
                        desiredPosition: updateDto.desiredPosition,
                        experience: updateDto.experience,
                        workMode: updateDto.workMode,
                      }
                    }
                  }
                : {
                    create: {
                      name: generatedName,
                      desiredPosition: updateDto.desiredPosition,
                      experience: updateDto.experience,
                      workMode: updateDto.workMode,
                      isActive: true,
                    }
                  }
            }
          }
        }
      },
      include: {
        candidate: {
          include: {
            candidateJobPreferences: true
          }
        }
      },
    });

    return updatedUser;
  }

  // STEP 3: Upload CV (géré par uploadCv() existant)

  // STEP 4: Description du poste (mise à jour de CandidateJobPreferences)
  async updateJobDescription(userId: string, updateDto: Step4JobDescriptionDto | OnboardingUpdateDto) {
    // Validation
    if (!updateDto.jobDescription) {
      throw new BadRequestException('Job description is required for step 4');
    }

    // Récupérer l'utilisateur et vérifier si les préférences existent
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        candidate: {
          include: {
            candidateJobPreferences: true
          }
        }
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!user.candidate) {
      throw new BadRequestException('Candidate profile not found. Please complete step 2 first.');
    }

    // Récupérer la candidature active
    const candidateJobPreference = user.candidate.candidateJobPreferences.find(jp => jp.isActive)
      || user.candidate.candidateJobPreferences[user.candidate.candidateJobPreferences.length - 1];

    if (!candidateJobPreference) {
      throw new BadRequestException('Job preferences not found. Please complete step 2 first.');
    }

    // Régénérer un nom plus précis avec la description du poste
    const updatedName = await this.aiService.generateJobPreferenceName({
      desiredPosition: candidateJobPreference.desiredPosition,
      jobDescription: updateDto.jobDescription,
      experience: candidateJobPreference.experience,
      workMode: candidateJobPreference.workMode,
    });

    // Mise à jour de la description du poste et du niveau de formalité
    await this.prisma.candidateJobPreference.update({
      where: { id: candidateJobPreference.id },
      data: {
        name: updatedName,
        jobDescription: updateDto.jobDescription,
        formalityLevel: updateDto.formalityLevel,
      }
    });

    // Mettre à jour le step de l'utilisateur
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        onboardingStep: 4,
      },
      include: {
        candidate: {
          include: {
            candidateJobPreferences: true
          }
        }
      },
    });

    return updatedUser;
  }

  // Méthode générique (conservée pour compatibilité)
  async updateOnboarding(userId: string, updateDto: OnboardingUpdateDto) {
    const step = updateDto.currentStep;

    switch (step) {
      case 1:
        return this.updatePersonalInfo(userId, updateDto);
      case 2:
        return this.updateProfessionalInfo(userId, updateDto);
      case 3:
        return this.updateJobDescription(userId, updateDto);
      default:
        throw new BadRequestException(`Invalid step: ${step}`);
    }
  }

  async generateWeKnowYouText(userId: string, generateDto: GenerateWeKnowYouDto) {
    // Implémenter la logique de génération de texte ici
    return {
      aiProfileDescription: "Texte généré par l'IA...",
    };
  }

  async uploadCv(userId: string, file: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        candidate: {
          include: {
            candidateJobPreferences: true
          }
        }
      }
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!user.candidate) {
      throw new BadRequestException('Candidate not found. Please complete step 2 first.');
    }

    // Récupérer la candidature active ou la dernière créée
    const activeJobPreference = user.candidate.candidateJobPreferences.find(jp => jp.isActive)
      || user.candidate.candidateJobPreferences[user.candidate.candidateJobPreferences.length - 1];

    if (!activeJobPreference) {
      throw new BadRequestException('No job preference found. Please complete step 2 first.');
    }

    // Créer un nom de fichier unique
    const fileExtension = file.originalname.split('.').pop();
    const uniqueFileName = `${userId}_${Date.now()}.${fileExtension}`;
    const filePath = `uploads/cv/${uniqueFileName}`;

    // Créer le dossier uploads/cv s'il n'existe pas
    const fs = require('fs');
    const path = require('path');
    const uploadDir = path.join(process.cwd(), 'uploads/cv');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sauvegarder le fichier
    fs.writeFileSync(path.join(process.cwd(), filePath), file.buffer);

    // Créer l'entrée AppFile
    const appFile = await this.prisma.appFile.create({
      data: {
        name: file.originalname,
        extension: fileExtension,
        size: BigInt(file.size),
        path: filePath,
      }
    });

    // Lier le CV à la CandidateJobPreference active
    await this.prisma.candidateJobPreference.update({
      where: { id: activeJobPreference.id },
      data: {
        cvId: appFile.id
      }
    });

    // Mettre à jour le step de l'utilisateur
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        onboardingStep: 3,
      }
    });

    return {
      message: 'CV uploaded successfully',
      fileName: uniqueFileName,
      path: filePath,
      jobPreferenceId: activeJobPreference.id
    };
  }

  async getProgress(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        candidate: {
          include: {
            candidateJobPreferences: true
          }
        }
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return {
      currentStep: user.onboardingStep,
      totalSteps: 4,
      candidate: user.candidate,
      jobPreferences: user.candidate?.candidateJobPreferences[0],
    };
  }

  async getContent() {
    return {
      steps: [
        {
          step: 1,
          title: 'Personal Information',
          description: 'Basic information about you',
        },
        {
          step: 2,
          title: 'We Know You',
          description: 'AI-generated profile and customization',
        },
        {
          step: 3,
          title: 'Professional Information',
          description: 'Your professional experience and preferences',
        },
        {
          step: 4,
          title: 'CV Upload',
          description: 'Upload your current CV',
        },
        {
          step: 5,
          title: 'Job Description',
          description: 'Target job description and preferences',
        },
      ],
    };
  }

  // ============================================================
  // NOUVEAU FLOW: "Postuler à une autre offre"
  // ============================================================

  /**
   * Crée une nouvelle candidature pour un candidat existant
   * Simplifié : seulement les infos professionnelles + CV
   */
  async createNewApplication(userId: string, data: Step2ProfessionalInfoDto) {
    // Vérifier que l'utilisateur existe et a un candidat
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        candidate: {
          include: {
            candidateJobPreferences: true
          }
        }
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!user.candidate) {
      throw new BadRequestException('Candidate profile not found. Please complete initial onboarding first.');
    }

    // Désactiver toutes les candidatures existantes
    await this.prisma.candidateJobPreference.updateMany({
      where: { candidateId: user.candidate.id },
      data: { isActive: false }
    });

    // Générer un nom pour la nouvelle candidature
    const generatedName = await this.aiService.generateJobPreferenceName({
      desiredPosition: data.desiredPosition,
      experience: data.experience,
      workMode: data.workMode,
    });

    // Créer une nouvelle CandidateJobPreferences
    const newJobPreference = await this.prisma.candidateJobPreference.create({
      data: {
        candidateId: user.candidate.id,
        name: generatedName,
        desiredPosition: data.desiredPosition,
        experience: data.experience,
        workMode: data.workMode,
        isActive: true,
      },
      include: {
        cv: true,
      }
    });

    return {
      message: 'New application created successfully',
      jobPreference: newJobPreference,
    };
  }

  /**
   * Upload un CV pour une candidature spécifique
   */
  async uploadCvForApplication(
    userId: string,
    jobPreferenceId: string,
    file: Express.Multer.File
  ) {
    // Vérifier que la job preference appartient bien à l'utilisateur
    const jobPreference = await this.prisma.candidateJobPreference.findUnique({
      where: { id: jobPreferenceId },
      include: {
        candidate: {
          include: {
            user: true
          }
        }
      }
    });

    if (!jobPreference) {
      throw new BadRequestException('Job preference not found');
    }

    if (jobPreference.candidate.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    // Créer un nom de fichier unique
    const fileExtension = file.originalname.split('.').pop();
    const uniqueFileName = `${userId}_${jobPreferenceId}_${Date.now()}.${fileExtension}`;
    const filePath = `uploads/cv/${uniqueFileName}`;

    // Créer le dossier uploads/cv s'il n'existe pas
    const fs = require('fs');
    const path = require('path');
    const uploadDir = path.join(process.cwd(), 'uploads/cv');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sauvegarder le fichier
    fs.writeFileSync(path.join(process.cwd(), filePath), file.buffer);

    // Créer l'entrée AppFile
    const appFile = await this.prisma.appFile.create({
      data: {
        name: file.originalname,
        extension: fileExtension,
        size: BigInt(file.size),
        path: filePath,
      }
    });

    // Lier le CV à la CandidateJobPreference
    await this.prisma.candidateJobPreference.update({
      where: { id: jobPreferenceId },
      data: {
        cvId: appFile.id
      }
    });

    return {
      message: 'CV uploaded successfully',
      fileName: uniqueFileName,
      path: filePath,
      jobPreferenceId: jobPreferenceId
    };
  }

  /**
   * Mettre à jour la description du poste pour une candidature spécifique
   */
  async updateApplicationJobDescription(
    userId: string,
    jobPreferenceId: string,
    data: Step4JobDescriptionDto
  ) {
    // Vérifier que la job preference appartient bien à l'utilisateur
    const jobPreference = await this.prisma.candidateJobPreference.findUnique({
      where: { id: jobPreferenceId },
      include: {
        candidate: {
          include: {
            user: true
          }
        }
      }
    });

    if (!jobPreference) {
      throw new BadRequestException('Job preference not found');
    }

    if (jobPreference.candidate.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    // Régénérer un nom plus précis avec la description du poste
    const updatedName = await this.aiService.generateJobPreferenceName({
      desiredPosition: jobPreference.desiredPosition,
      jobDescription: data.jobDescription,
      experience: jobPreference.experience,
      workMode: jobPreference.workMode,
    });

    // Mettre à jour la job preference
    const updated = await this.prisma.candidateJobPreference.update({
      where: { id: jobPreferenceId },
      data: {
        name: updatedName,
        jobDescription: data.jobDescription,
        formalityLevel: data.formalityLevel,
      },
      include: {
        cv: true,
      }
    });

    return {
      message: 'Job description updated successfully',
      jobPreference: updated,
    };
  }

  /**
   * Liste toutes les candidatures d'un utilisateur
   */
  async listApplications(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        candidate: {
          include: {
            candidateJobPreferences: {
              include: {
                cv: true,
              },
              orderBy: {
                createdAt: 'desc'
              }
            }
          }
        }
      },
    });

    if (!user || !user.candidate) {
      throw new BadRequestException('Candidate not found');
    }

    return {
      applications: user.candidate.candidateJobPreferences,
      activeApplication: user.candidate.candidateJobPreferences.find(jp => jp.isActive),
    };
  }

  /**
   * Activer une candidature spécifique (pour le dropdown)
   */
  async setActiveApplication(userId: string, jobPreferenceId: string) {
    // Vérifier que la job preference appartient bien à l'utilisateur
    const jobPreference = await this.prisma.candidateJobPreference.findUnique({
      where: { id: jobPreferenceId },
      include: {
        candidate: {
          include: {
            user: true
          }
        }
      }
    });

    if (!jobPreference) {
      throw new BadRequestException('Job preference not found');
    }

    if (jobPreference.candidate.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    // Désactiver toutes les candidatures de ce candidat
    await this.prisma.candidateJobPreference.updateMany({
      where: { candidateId: jobPreference.candidateId },
      data: { isActive: false }
    });

    // Activer la candidature sélectionnée
    const activated = await this.prisma.candidateJobPreference.update({
      where: { id: jobPreferenceId },
      data: { isActive: true },
      include: {
        cv: true,
      }
    });

    return {
      message: 'Application activated successfully',
      jobPreference: activated,
    };
  }

  /**
   * Récupérer les détails d'une candidature spécifique
   */
  async getApplicationDetails(userId: string, jobPreferenceId: string) {
    const jobPreference = await this.prisma.candidateJobPreference.findUnique({
      where: { id: jobPreferenceId },
      include: {
        candidate: {
          include: {
            user: true
          }
        },
        cv: true,
      }
    });

    if (!jobPreference) {
      throw new BadRequestException('Job preference not found');
    }

    if (jobPreference.candidate.userId !== userId) {
      throw new BadRequestException('Unauthorized');
    }

    return jobPreference;
  }
}