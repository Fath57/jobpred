'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Wand2,
  Palette,
  Layout,
  Type,
  Image,
  Download,
  Eye,
  RefreshCw,
  Sparkles,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  FileText,
  Settings,
  Zap,
  Star,
  Target,
  Award,
  Clock,
  TrendingUp,
  Users,
  Briefcase,
  GraduationCap,
  Languages,
  Trophy,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Globe,
} from 'lucide-react';
import ProgressSteps from '@/components/dashboard/ProgressSteps';
import PageHeader from '@/components/dashboard/PageHeader';

interface ResumeConfectionProps {
  resumeConfectionData: typeof import('@/lib/resume/resumeConfectionData').resumeConfectionData;
}

const ResumeConfection: React.FC<ResumeConfectionProps> = ({
  resumeConfectionData,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(
    resumeConfectionData.templates[0]
  );
  const [selectedStyle, setSelectedStyle] = useState(
    resumeConfectionData.styles[0]
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(resumeConfectionData.userProfile);
  const [customizations, setCustomizations] = useState(
    resumeConfectionData.customizationOptions
  );

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 4000);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const steps = [
    { id: 1, title: 'Template', icon: Layout },
    { id: 2, title: 'Style', icon: Palette },
    { id: 3, title: 'Contenu', icon: FileText },
    { id: 4, title: 'Personnalisation', icon: Settings },
    { id: 5, title: 'Aperçu', icon: Eye },
  ];

  return (
    <>
      <PageHeader
        title="Confection de CV"
        description="Créez un CV professionnel et moderne avec notre IA de design"
        icon={Wand2}
        iconColor="text-purple-600"
        breadcrumbItems={[
          { href: '/dashboard', label: 'Dashboard' },
          { href: '/dashboard/resume', label: 'Resume' },
          { label: 'Confection', isCurrentPage: true },
        ]}
        actions={[
          { label: 'Aperçu Live', icon: Eye, variant: 'outline' },
          { label: 'Télécharger', icon: Download, variant: 'outline' },
        ]}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
        generateButtonText="Générer CV"
        generateLoadingText="Génération..."
        generateButtonGradient="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
      />

      {/* Progress Steps */}
      <ProgressSteps
        steps={steps}
        currentStep={currentStep}
        onStepChange={handleStepChange}
        activeColor="bg-purple-100 text-purple-700 border border-purple-200"
        completedColor="bg-emerald-100 text-emerald-700 border border-emerald-200"
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2">
          <Tabs value={`step-${currentStep}`} className="space-y-6">
            {/* Step 1: Template Selection */}
            <TabsContent value="step-1" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layout className="text-blue-600" size={20} />
                    Choisir un Template
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {resumeConfectionData.templates.map((template: any) => (
                      <div
                        key={template.id}
                        onClick={() => setSelectedTemplate(template)}
                        className={`relative p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                          selectedTemplate.id === template.id
                            ? 'border-purple-300 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                          <FileText className="text-gray-400" size={48} />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">
                            {template.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className={
                              template.category === 'Modern'
                                ? 'border-purple-200 text-purple-700 bg-purple-50'
                                : template.category === 'Classic'
                                  ? 'border-blue-200 text-blue-700 bg-blue-50'
                                  : 'border-emerald-200 text-emerald-700 bg-emerald-50'
                            }
                          >
                            {template.category}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">
                          {template.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`${i < template.rating ? 'text-amber-400 fill-current' : 'text-gray-300'}`}
                                size={14}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            ({template.downloads}k téléchargements)
                          </span>
                        </div>
                        {selectedTemplate.id === template.id && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle
                              className="text-purple-600 bg-white rounded-full"
                              size={24}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 2: Style Selection */}
            <TabsContent value="step-2" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="text-pink-600" size={20} />
                    Style et Couleurs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {resumeConfectionData.styles.map((style: any) => (
                      <div
                        key={style.id}
                        onClick={() => setSelectedStyle(style)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedStyle.id === style.id
                            ? 'border-pink-300 bg-pink-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-8 h-8 rounded-full"
                            style={{ backgroundColor: style.primaryColor }}
                          ></div>
                          <div>
                            <h4 className="font-medium text-gray-900">
                              {style.name}
                            </h4>
                            <p className="text-xs text-gray-600">
                              {style.mood}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: style.primaryColor }}
                          ></div>
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: style.secondaryColor }}
                          ></div>
                          <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: style.accentColor }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Police de caractères</Label>
                      <Select defaultValue="inter">
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inter">Inter (Moderne)</SelectItem>
                          <SelectItem value="roboto">
                            Roboto (Classique)
                          </SelectItem>
                          <SelectItem value="playfair">
                            Playfair Display (Élégant)
                          </SelectItem>
                          <SelectItem value="source">
                            Source Sans Pro (Professionnel)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Taille de police</Label>
                      <Slider
                        defaultValue={[12]}
                        max={16}
                        min={10}
                        step={1}
                        className="mt-2"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>10pt</span>
                        <span>16pt</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 3: Content */}
            <TabsContent value="step-3" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-emerald-600" size={20} />
                    Contenu du CV
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-5">
                      <TabsTrigger value="personal">Personnel</TabsTrigger>
                      <TabsTrigger value="experience">Expérience</TabsTrigger>
                      <TabsTrigger value="education">Formation</TabsTrigger>
                      <TabsTrigger value="skills">Compétences</TabsTrigger>
                      <TabsTrigger value="additional">Extras</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="fullName">Nom complet</Label>
                          <Input
                            id="fullName"
                            value={formData.personalInfo.fullName}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                personalInfo: {
                                  ...formData.personalInfo,
                                  fullName: e.target.value,
                                },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Titre professionnel</Label>
                          <Input
                            id="title"
                            value={formData.personalInfo.title}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                personalInfo: {
                                  ...formData.personalInfo,
                                  title: e.target.value,
                                },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.personalInfo.email}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                personalInfo: {
                                  ...formData.personalInfo,
                                  email: e.target.value,
                                },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Téléphone</Label>
                          <Input
                            id="phone"
                            value={formData.personalInfo.phone}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                personalInfo: {
                                  ...formData.personalInfo,
                                  phone: e.target.value,
                                },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="location">Localisation</Label>
                          <Input
                            id="location"
                            value={formData.personalInfo.location}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                personalInfo: {
                                  ...formData.personalInfo,
                                  location: e.target.value,
                                },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={formData.personalInfo.linkedin}
                            onChange={e =>
                              setFormData({
                                ...formData,
                                personalInfo: {
                                  ...formData.personalInfo,
                                  linkedin: e.target.value,
                                },
                              })
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="summary">Résumé professionnel</Label>
                        <Textarea
                          id="summary"
                          value={formData.personalInfo.summary}
                          onChange={e =>
                            setFormData({
                              ...formData,
                              personalInfo: {
                                ...formData.personalInfo,
                                summary: e.target.value,
                              },
                            })
                          }
                          className="mt-1 min-h-[100px]"
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="experience" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">
                          Expériences professionnelles
                        </h4>
                        <Button variant="outline" size="sm">
                          <Briefcase size={16} className="mr-2" />
                          Ajouter
                        </Button>
                      </div>
                      {formData.experience.map((exp: any, index: number) => (
                        <Card
                          key={index}
                          className="p-4 border border-gray-200"
                        >
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <Label>Poste</Label>
                              <Input value={exp.position} className="mt-1" />
                            </div>
                            <div>
                              <Label>Entreprise</Label>
                              <Input value={exp.company} className="mt-1" />
                            </div>
                            <div>
                              <Label>Période</Label>
                              <Input value={exp.period} className="mt-1" />
                            </div>
                            <div>
                              <Label>Lieu</Label>
                              <Input value={exp.location} className="mt-1" />
                            </div>
                          </div>
                          <div>
                            <Label>Description</Label>
                            <Textarea
                              value={exp.description}
                              className="mt-1"
                            />
                          </div>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="education" className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-gray-900">Formation</h4>
                        <Button variant="outline" size="sm">
                          <GraduationCap size={16} className="mr-2" />
                          Ajouter
                        </Button>
                      </div>
                      {formData.education.map((edu: any, index: number) => (
                        <Card
                          key={index}
                          className="p-4 border border-gray-200"
                        >
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label>Diplôme</Label>
                              <Input value={edu.degree} className="mt-1" />
                            </div>
                            <div>
                              <Label>École/Université</Label>
                              <Input value={edu.school} className="mt-1" />
                            </div>
                            <div>
                              <Label>Année</Label>
                              <Input value={edu.year} className="mt-1" />
                            </div>
                            <div>
                              <Label>Mention</Label>
                              <Input value={edu.grade || ''} className="mt-1" />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="skills" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">
                            Compétences techniques
                          </h4>
                          <div className="space-y-3">
                            {formData.skills.technical.map(
                              (skill: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center justify-between"
                                >
                                  <span className="text-sm text-gray-700">
                                    {skill.name}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <Progress
                                      value={skill.level}
                                      className="w-20 h-2"
                                    />
                                    <span className="text-xs text-gray-500">
                                      {skill.level}%
                                    </span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3">
                            Compétences interpersonnelles
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {formData.skills.soft.map(
                              (skill: string, index: number) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="bg-blue-50 text-blue-700 border-blue-200"
                                >
                                  {skill}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="additional" className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                            <Languages size={16} />
                            Langues
                          </h4>
                          <div className="space-y-2">
                            {formData.languages.map(
                              (lang: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex justify-between items-center"
                                >
                                  <span className="text-sm text-gray-700">
                                    {lang.language}
                                  </span>
                                  <Badge variant="outline">{lang.level}</Badge>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                            <Trophy size={16} />
                            Certifications
                          </h4>
                          <div className="space-y-2">
                            {formData.certifications.map(
                              (cert: any, index: number) => (
                                <div
                                  key={index}
                                  className="text-sm text-gray-700"
                                >
                                  <div className="font-medium">{cert.name}</div>
                                  <div className="text-xs text-gray-500">
                                    {cert.issuer} - {cert.year}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 4: Customization */}
            <TabsContent value="step-4" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="text-indigo-600" size={20} />
                    Personnalisation Avancée
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label>Sections à inclure</Label>
                    <div className="grid md:grid-cols-2 gap-3 mt-2">
                      {customizations.sections.map((section: any) => (
                        <div
                          key={section.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={section.id}
                            checked={section.enabled}
                            onChange={e => {
                              const updatedSections =
                                customizations.sections.map((s: any) =>
                                  s.id === section.id
                                    ? { ...s, enabled: e.target.checked }
                                    : s
                                );
                              setCustomizations({
                                ...customizations,
                                sections: updatedSections,
                              });
                            }}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor={section.id} className="text-sm">
                            {section.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label>Mise en page</Label>
                    <Select defaultValue={customizations.layout}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single-column">
                          Une colonne
                        </SelectItem>
                        <SelectItem value="two-column">
                          Deux colonnes
                        </SelectItem>
                        <SelectItem value="sidebar">Barre latérale</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Espacement</Label>
                    <Slider
                      value={[customizations.spacing]}
                      onValueChange={value =>
                        setCustomizations({
                          ...customizations,
                          spacing: value[0],
                        })
                      }
                      max={20}
                      min={5}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Compact</span>
                      <span>Aéré</span>
                    </div>
                  </div>

                  <div>
                    <Label>Photo de profil</Label>
                    <Select defaultValue={customizations.photo}>
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">Aucune</SelectItem>
                        <SelectItem value="circle">Circulaire</SelectItem>
                        <SelectItem value="square">Carrée</SelectItem>
                        <SelectItem value="rounded">Arrondie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Step 5: Preview */}
            <TabsContent value="step-5" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="text-green-600" size={20} />
                    Aperçu Final
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
                    <div className="aspect-[8.5/11] bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <FileText
                          className="text-gray-400 mx-auto mb-4"
                          size={64}
                        />
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          Aperçu du CV
                        </h3>
                        <p className="text-gray-500 mb-4">
                          Template: {selectedTemplate.name}
                        </p>
                        <p className="text-gray-500 mb-4">
                          Style: {selectedStyle.name}
                        </p>
                        <div className="flex justify-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye size={16} className="mr-2" />
                            Plein écran
                          </Button>
                          <Button
                            size="sm"
                            className="bg-emerald-500 hover:bg-emerald-600"
                          >
                            <Download size={16} className="mr-2" />
                            Télécharger PDF
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={() => handleStepChange(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Précédent
            </Button>
            <Button
              onClick={() => handleStepChange(Math.min(5, currentStep + 1))}
              disabled={currentStep === 5}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Suivant
            </Button>
          </div>
        </div>

        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-sm sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="text-orange-600" size={20} />
                Statistiques
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Score ATS</span>
                <div className="flex items-center gap-2">
                  <Progress
                    value={resumeConfectionData.stats.atsScore}
                    className="w-16 h-2"
                  />
                  <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {resumeConfectionData.stats.atsScore}%
                  </Badge>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Lisibilité</span>
                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                  {resumeConfectionData.stats.readability}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Longueur</span>
                <Badge variant="outline" className="bg-amber-50 text-amber-700">
                  {resumeConfectionData.stats.length}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-600">Mots-clés</span>
                <Badge
                  variant="outline"
                  className="bg-purple-50 text-purple-700"
                >
                  {resumeConfectionData.stats.keywords}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="text-yellow-600" size={20} />
                Suggestions IA
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {resumeConfectionData.aiSuggestions.map(
                (suggestion: string, index: number) => (
                  <Alert key={index} className="border-blue-200 bg-blue-50">
                    <AlertDescription className="text-blue-800 text-sm">
                      {suggestion}
                    </AlertDescription>
                  </Alert>
                )
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ResumeConfection;
