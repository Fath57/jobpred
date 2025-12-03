# Gestion des multiples candidatures - Documentation

## Vue d'ensemble

Le système a été refactorisé pour permettre à un candidat de créer **plusieurs candidatures** (CandidateJobPreferences), chacune avec son propre CV. Cela permet de postuler à différentes offres avec des profils adaptés.

---

## Architecture

### Modifications du modèle de données

#### Avant
```
User → Candidate → CV
              → CandidateJobPreferences (une seule)
```

#### Après
```
User → Candidate → CandidateJobPreferences[] (plusieurs)
                    ↓
                    CV (un CV par candidature)
```

### Nouveaux champs

**CandidateJobPreferences**:
- `name` (String?) - Nom généré par IA pour identifier la candidature
- `isActive` (Boolean) - Indique quelle candidature est actuellement active
- `cvId` (String?) - Référence vers le CV spécifique de cette candidature
- `cv` (AppFile?) - Relation vers le fichier CV

---

## Service IA Modulaire

Un service IA réutilisable a été créé pour gérer les appels à Gemini ou GPT.

### Structure
```
src/ai-service/
├── interfaces/
│   └── ai-provider.interface.ts    # Interface commune
├── providers/
│   ├── gemini.provider.ts          # Implémentation Gemini
│   └── openai.provider.ts          # Implémentation OpenAI/GPT
├── ai.service.ts                   # Service principal
└── ai.module.ts                    # Module NestJS
```

### Utilisation

```typescript
// Configuration dans .env
AI_DEFAULT_PROVIDER=gemini  # ou 'openai'
GEMINI_API_KEY=your_key
OPENAI_API_KEY=your_key

// Dans le code
constructor(private aiService: AIService) {}

// Génération de texte simple
const response = await this.aiService.generate('Your prompt here');

// Génération JSON
const json = await this.aiService.generateJSON<YourType>('Your prompt');

// Générer un nom pour une candidature
const name = await this.aiService.generateJobPreferenceName({
  desiredPosition: 'Développeur Full Stack',
  jobDescription: '...',
  experience: 'SENIOR',
  workMode: 'REMOTE'
});
```

---

## Flow 1: Onboarding Initial (Première candidature)

Le flow initial reste similaire mais avec des modifications :

### Step 1: Informations personnelles
**Endpoint**: `PUT /onboarding/step/1/personal-info`
- Met à jour l'entité `User`

### Step 2: Informations professionnelles
**Endpoint**: `PUT /onboarding/step/2/professional-info`
- Crée `Candidate` + `CandidateJobPreferences`
- **Génère automatiquement un nom** via IA
- Marque la candidature comme `isActive = true`

### Step 3: Upload CV
**Endpoint**: `POST /onboarding/upload-cv`
- Upload le CV et le lie à la `CandidateJobPreferences` active
- **Important**: Le CV est maintenant lié à CandidateJobPreferences, pas à Candidate

### Step 4: Description du poste
**Endpoint**: `PUT /onboarding/step/4/job-description`
- Met à jour la `CandidateJobPreferences` active
- **Régénère un nom plus précis** avec la description du poste

---

## Flow 2: "Postuler à une autre offre"

Après le premier onboarding, l'utilisateur peut créer de nouvelles candidatures simplifiées.

### Étape 1: Créer une nouvelle candidature

**Endpoint**: `POST /onboarding/applications/new`

**Body**:
```json
{
  "desiredPosition": "Data Scientist",
  "experience": "SENIOR",
  "workMode": "HYBRID"
}
```

**Comportement**:
- Désactive toutes les candidatures existantes (`isActive = false`)
- Crée une nouvelle `CandidateJobPreferences`
- Génère un nom avec l'IA
- Active la nouvelle candidature (`isActive = true`)

**Réponse**:
```json
{
  "message": "New application created successfully",
  "jobPreference": {
    "id": "uuid",
    "name": "Data Scientist Senior - Remote",
    "desiredPosition": "Data Scientist",
    "experience": "SENIOR",
    "workMode": "HYBRID",
    "isActive": true,
    ...
  }
}
```

### Étape 2: Upload le CV pour cette candidature

**Endpoint**: `POST /onboarding/applications/:jobPreferenceId/upload-cv`

**Type**: `multipart/form-data`

**Body**:
```
file: File (PDF, DOC, DOCX, max 5MB)
```

**Comportement**:
- Vérifie que la job preference appartient à l'utilisateur
- Upload le fichier
- Lie le CV à cette `CandidateJobPreferences` spécifique

### Étape 3 (optionnelle): Ajouter la description du poste

**Endpoint**: `PUT /onboarding/applications/:jobPreferenceId/job-description`

**Body**:
```json
{
  "jobDescription": "Description complète du poste...",
  "formalityLevel": "PROFESSIONAL"
}
```

**Comportement**:
- Met à jour la description et le niveau de formalité
- Régénère un nom plus précis avec la description

---

## Gestion des candidatures

### Lister toutes les candidatures

**Endpoint**: `GET /onboarding/applications`

**Réponse**:
```json
{
  "applications": [
    {
      "id": "uuid-1",
      "name": "Développeur Full Stack - Startup FinTech",
      "desiredPosition": "Développeur Full Stack",
      "isActive": true,
      "cv": { ... },
      "createdAt": "2024-11-04T...",
      ...
    },
    {
      "id": "uuid-2",
      "name": "Data Scientist Senior - Remote",
      "desiredPosition": "Data Scientist",
      "isActive": false,
      "cv": { ... },
      "createdAt": "2024-11-04T...",
      ...
    }
  ],
  "activeApplication": { ... }
}
```

### Activer une candidature (Switcher)

**Endpoint**: `PUT /onboarding/applications/:jobPreferenceId/activate`

**Comportement**:
- Désactive toutes les autres candidatures
- Active la candidature sélectionnée
- Utilisé par le dropdown dans le header du dashboard

**Réponse**:
```json
{
  "message": "Application activated successfully",
  "jobPreference": { ... }
}
```

### Récupérer les détails d'une candidature

**Endpoint**: `GET /onboarding/applications/:jobPreferenceId`

**Réponse**:
```json
{
  "id": "uuid",
  "name": "Développeur Full Stack - Startup FinTech",
  "desiredPosition": "Développeur Full Stack",
  "jobDescription": "...",
  "experience": "SENIOR",
  "workMode": "REMOTE",
  "formalityLevel": "PROFESSIONAL",
  "isActive": true,
  "cv": {
    "id": "uuid",
    "name": "cv_john_doe.pdf",
    "path": "uploads/cv/...",
    ...
  },
  "candidate": { ... },
  "createdAt": "2024-11-04T...",
  "updatedAt": "2024-11-04T..."
}
```

---

## Intégration Frontend

### Dropdown dans le header du dashboard

```typescript
// 1. Récupérer toutes les candidatures au chargement
const { applications, activeApplication } = await api.get('/onboarding/applications');

// 2. Afficher dans un dropdown
<Select value={activeApplication?.id}>
  {applications.map(app => (
    <SelectItem key={app.id} value={app.id}>
      {app.name}
    </SelectItem>
  ))}
</Select>

// 3. Au changement, activer la candidature sélectionnée
const handleChange = async (jobPreferenceId) => {
  await api.put(`/onboarding/applications/${jobPreferenceId}/activate`);
  // Recharger les données du dashboard avec la nouvelle candidature active
};
```

### Bouton "Postuler à une autre offre"

```typescript
const handleNewApplication = async (data) => {
  // 1. Créer la nouvelle candidature
  const { jobPreference } = await api.post('/onboarding/applications/new', {
    desiredPosition: data.desiredPosition,
    experience: data.experience,
    workMode: data.workMode
  });

  // 2. Upload le CV
  const formData = new FormData();
  formData.append('file', cvFile);
  await api.post(`/onboarding/applications/${jobPreference.id}/upload-cv`, formData);

  // 3. Optionnel: Ajouter la description
  await api.put(`/onboarding/applications/${jobPreference.id}/job-description`, {
    jobDescription: data.jobDescription,
    formalityLevel: data.formalityLevel
  });

  // 4. Rediriger vers le dashboard
  router.push('/dashboard');
};
```

---

## Sécurité

Toutes les méthodes vérifient que:
- L'utilisateur est authentifié (via `AuthGuard`)
- La `CandidateJobPreferences` appartient bien à l'utilisateur connecté
- Les fichiers uploadés respectent les contraintes (type, taille)

---

## Migration de données

La migration SQL effectue automatiquement:
1. ✅ Ajout des colonnes `name`, `isActive`, `cvId` à `candidate_job_preferences`
2. ✅ Migration des CV existants de `candidates.cvId` vers `candidate_job_preferences.cvId`
3. ✅ Activation automatique de la première candidature de chaque candidat
4. ✅ Suppression de `candidates.cvId`

---

## Variables d'environnement requises

```env
# Service IA
AI_DEFAULT_PROVIDER=gemini    # ou 'openai'
GEMINI_API_KEY=your_gemini_key
OPENAI_API_KEY=your_openai_key

# Autres configs existantes
DATABASE_URL=...
JWT_SECRET=...
```

---

## Résumé des endpoints

### Onboarding Initial
- `PUT /onboarding/step/1/personal-info`
- `PUT /onboarding/step/2/professional-info`
- `POST /onboarding/upload-cv`
- `PUT /onboarding/step/4/job-description`

### Nouvelles candidatures
- `POST /onboarding/applications/new` - Créer une nouvelle candidature
- `POST /onboarding/applications/:id/upload-cv` - Upload CV pour une candidature
- `PUT /onboarding/applications/:id/job-description` - Mettre à jour la description

### Gestion
- `GET /onboarding/applications` - Liste toutes les candidatures
- `GET /onboarding/applications/:id` - Détails d'une candidature
- `PUT /onboarding/applications/:id/activate` - Activer une candidature (dropdown)

---

## Prochaines étapes possibles

- [ ] Ajouter la possibilité de supprimer une candidature
- [ ] Permettre de dupliquer une candidature existante
- [ ] Ajouter des statistiques par candidature (vues, candidatures envoyées, etc.)
- [ ] Notification lorsqu'une candidature est active mais sans CV
