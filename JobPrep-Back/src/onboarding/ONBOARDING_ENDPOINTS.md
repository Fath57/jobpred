# Onboarding API - Documentation

## Vue d'ensemble

L'API d'onboarding a été refactorisée pour suivre une approche claire et simplifiée :
- **Chaque étape a sa propre méthode et route dédiée**
- **Chaque étape met à jour uniquement les entités concernées**
- **Validation stricte par étape avec des DTOs spécifiques**

---

## Structure des étapes

### Étape 1 : Informations personnelles
**Entité mise à jour** : `User`

**Endpoint** : `PUT /onboarding/step/1/personal-info`

**DTO** : `Step1PersonalInfoDto`

**Données requises** :
```typescript
{
  fullName: string;      // Requis
  email: string;         // Requis
  phone?: string;        // Optionnel
  linkedin?: string;     // Optionnel
  location?: string;     // Optionnel
}
```

**Ce qui est créé/mis à jour** :
- Met à jour les informations de base dans `User` (firstName, lastName, email, phone, linkedin, location)
- Définit `onboardingStep = 1`

---

### Étape 2 : Informations professionnelles
**Entités mises à jour** : `Candidate` + `CandidateJobPreferences`

**Endpoint** : `PUT /onboarding/step/2/professional-info`

**DTO** : `Step2ProfessionalInfoDto`

**Données requises** :
```typescript
{
  desiredPosition: string;         // Requis
  experience: ExperienceLevel;     // Requis (JUNIOR, INTERMEDIATE, SENIOR, EXPERT)
  workMode: WorkMode;              // Requis (REMOTE, HYBRID, ON_SITE)
}
```

**Ce qui est créé/mis à jour** :
- Crée ou met à jour l'entité `Candidate` avec les informations de l'utilisateur
- Crée ou met à jour `CandidateJobPreferences` avec les préférences professionnelles
- Définit `onboardingStep = 2`

---

### Étape 3 : Upload du CV
**Entité mise à jour** : `Candidate` + `AppFile`

**Endpoint** : `POST /onboarding/upload-cv`

**Type** : `multipart/form-data`

**Données requises** :
```typescript
{
  file: File;  // PDF, DOC, DOCX (max 5MB)
}
```

**Ce qui est créé/mis à jour** :
- Crée une entrée `AppFile` avec les métadonnées du fichier
- Met à jour `Candidate.cvId` avec la référence au fichier
- Définit `onboardingStep = 3`

---

### Étape 4 : Description du poste
**Entité mise à jour** : `CandidateJobPreferences`

**Endpoint** : `PUT /onboarding/step/4/job-description`

**DTO** : `Step4JobDescriptionDto`

**Données requises** :
```typescript
{
  jobDescription: string;           // Requis
  formalityLevel?: FormalityLevel;  // Optionnel (CASUAL, PROFESSIONAL, FORMAL)
}
```

**Ce qui est créé/mis à jour** :
- Met à jour `CandidateJobPreferences` existant avec la description du poste
- Met à jour le niveau de formalité si fourni
- Définit `onboardingStep = 4`
- **Important** : Nécessite que l'étape 2 soit complétée (CandidateJobPreferences doit exister)

---

## Route générique (Legacy)

**Endpoint** : `PUT /onboarding/update`

**DTO** : `OnboardingUpdateDto`

Cette route est conservée pour compatibilité. Elle route automatiquement vers la méthode appropriée selon `currentStep` :
- `currentStep = 1` → `updatePersonalInfo()`
- `currentStep = 2` → `updateProfessionalInfo()`
- `currentStep = 4` → `updateJobDescription()`

---

## Autres endpoints

### Récupérer la progression
**Endpoint** : `GET /onboarding/progress`

**Retour** :
```typescript
{
  currentStep: number;
  totalSteps: number;
  candidate: Candidate;
  jobPreferences: CandidateJobPreferences;
}
```

### Récupérer le contenu de l'onboarding
**Endpoint** : `GET /onboarding/content`

**Retour** :
```typescript
{
  steps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
}
```

### Générer la description du profil IA
**Endpoint** : `POST /onboarding/generate-profile`

**DTO** : `GenerateWeKnowYouDto`

---

## Flux recommandé

1. **Étape 1** : L'utilisateur remplit ses informations personnelles
   - Appel : `PUT /onboarding/step/1/personal-info`
   - Crée les infos de base dans User

2. **Étape 2** : L'utilisateur renseigne ses préférences professionnelles
   - Appel : `PUT /onboarding/step/2/professional-info`
   - Crée Candidate + CandidateJobPreferences

3. **Étape 3** : L'utilisateur upload son CV
   - Appel : `POST /onboarding/upload-cv`
   - Crée AppFile et met à jour Candidate

4. **Étape 4** : L'utilisateur colle la description du poste
   - Appel : `PUT /onboarding/step/4/job-description`
   - Met à jour CandidateJobPreferences avec jobDescription

---

## Bonnes pratiques

### Frontend
- Utilisez les routes spécifiques par étape (plus claires et typées)
- Envoyez uniquement les données nécessaires à chaque étape
- Gérez les erreurs de validation par champ

### Validation
- Chaque DTO a ses propres règles de validation
- Les champs requis sont clairement définis
- Les erreurs de validation sont explicites

### Base de données
- Chaque méthode met à jour uniquement les entités concernées
- Pas de données redondantes ou inutiles
- Relations entre entités respectées (User → Candidate → CandidateJobPreferences)
