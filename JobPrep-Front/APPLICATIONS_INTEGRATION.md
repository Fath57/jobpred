# Intégration Frontend - Gestion des Applications Multiples

## Vue d'ensemble

Cette documentation explique comment intégrer la fonctionnalité de gestion d'applications multiples dans votre frontend.

---

## Structure créée

```
lib/
├── api/
│   ├── types.ts                    # Types TypeScript mis à jour
│   └── endpoints.ts                # Nouveaux endpoints API
├── hooks/
│   └── useApplications.ts          # Hook personnalisé

components/
└── dashboard/
    ├── ApplicationSwitcher.tsx     # Dropdown de sélection
    └── NewApplicationModal.tsx     # Modal de création
```

---

## 1. Hook `useApplications`

Hook personnalisé pour gérer toutes les opérations liées aux applications.

### Import

```typescript
import { useApplications } from '@/lib/hooks/useApplications';
```

### Utilisation

```typescript
function MyComponent() {
  const {
    // État
    applications,           // Liste des candidatures
    activeApplication,      // Candidature active
    isLoading,             // Chargement en cours
    isRefreshing,          // Rechargement en cours
    errorState,            // État d'erreur

    // Actions
    loadApplications,                  // Recharger la liste
    createApplication,                 // Créer une candidature
    uploadCvForApplication,            // Upload CV
    updateJobDescription,              // Mettre à jour description
    activateApplication,               // Activer une candidature
    getApplicationDetails,             // Détails d'une candidature
    createCompleteApplication,         // Créer candidature complète
    clearError,                        // Effacer les erreurs
  } = useApplications();

  // Les applications sont chargées automatiquement au montage
}
```

### Méthodes disponibles

#### `loadApplications()`
Recharge la liste des candidatures.

```typescript
await loadApplications();
```

#### `createApplication(data)`
Crée une nouvelle candidature (sans CV).

```typescript
const response = await createApplication({
  desiredPosition: 'Développeur Full Stack',
  experience: 'SENIOR',
  workMode: 'HYBRID'
});
```

#### `uploadCvForApplication(jobPreferenceId, file)`
Upload un CV pour une candidature spécifique.

```typescript
const file = new File([...], 'cv.pdf', { type: 'application/pdf' });
await uploadCvForApplication('uuid-123', file);
```

#### `updateJobDescription(jobPreferenceId, data)`
Met à jour la description du poste.

```typescript
await updateJobDescription('uuid-123', {
  jobDescription: 'Description...',
  formalityLevel: 'PROFESSIONAL'
});
```

#### `activateApplication(jobPreferenceId)`
Active une candidature (pour le dropdown).

```typescript
await activateApplication('uuid-123');
```

#### `createCompleteApplication(data)`
Crée une candidature complète (infos + CV + description).

```typescript
await createCompleteApplication({
  professionalInfo: {
    desiredPosition: 'Data Scientist',
    experience: 'SENIOR',
    workMode: 'REMOTE'
  },
  cvFile: file,
  jobDescription: {
    jobDescription: 'Description...',
    formalityLevel: 'PROFESSIONAL'
  }
});
```

---

## 2. Composant `ApplicationSwitcher`

Dropdown pour switcher entre les candidatures.

### Import

```typescript
import { ApplicationSwitcher } from '@/components/dashboard/ApplicationSwitcher';
```

### Utilisation de base

```typescript
<ApplicationSwitcher
  onNewApplication={() => {
    // Ouvrir le modal de création
    setIsModalOpen(true);
  }}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `onNewApplication` | `() => void` | Callback pour créer une nouvelle candidature |
| `className` | `string` | Classes CSS additionnelles |

### Version mobile

```typescript
import { ApplicationSwitcherMobile } from '@/components/dashboard/ApplicationSwitcher';

<ApplicationSwitcherMobile
  onNewApplication={() => setIsModalOpen(true)}
/>
```

---

## 3. Composant `NewApplicationModal`

Modal pour créer une nouvelle candidature (3 étapes).

### Import

```typescript
import { NewApplicationModal } from '@/components/dashboard/NewApplicationModal';
```

### Utilisation

```typescript
function DashboardHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        Nouvelle candidature
      </Button>

      <NewApplicationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={() => {
          // Optionnel: action après succès
          console.log('Candidature créée !');
        }}
      />
    </>
  );
}
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `open` | `boolean` | État d'ouverture du modal |
| `onOpenChange` | `(open: boolean) => void` | Callback changement d'état |
| `onSuccess` | `() => void` | Callback après création réussie |

### Étapes du modal

1. **Étape 1**: Informations professionnelles
   - Poste souhaité (requis)
   - Niveau d'expérience
   - Mode de travail

2. **Étape 2**: Upload du CV
   - Fichier PDF, DOC ou DOCX
   - Maximum 5 MB

3. **Étape 3**: Description du poste (optionnelle)
   - Description complète
   - Niveau de formalité

---

## 4. Intégration dans le Dashboard

### Exemple complet

```typescript
// app/dashboard/page.tsx
'use client';

import { useState } from 'react';
import { ApplicationSwitcher } from '@/components/dashboard/ApplicationSwitcher';
import { NewApplicationModal } from '@/components/dashboard/NewApplicationModal';
import { useApplications } from '@/lib/hooks/useApplications';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { activeApplication, isLoading } = useApplications();

  return (
    <div>
      {/* Header avec dropdown */}
      <header className="border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1>Dashboard</h1>

          <ApplicationSwitcher
            onNewApplication={() => setIsModalOpen(true)}
          />
        </div>
      </header>

      {/* Contenu du dashboard */}
      <main className="container mx-auto p-4">
        {isLoading ? (
          <div>Chargement...</div>
        ) : activeApplication ? (
          <div>
            <h2>{activeApplication.name}</h2>
            <p>Poste: {activeApplication.desiredPosition}</p>
            <p>Expérience: {activeApplication.experience}</p>
            {/* Afficher les infos de la candidature active */}
          </div>
        ) : (
          <div>Aucune candidature active</div>
        )}
      </main>

      {/* Modal de création */}
      <NewApplicationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSuccess={() => {
          // Recharger ou rafraîchir le dashboard
          console.log('Nouvelle candidature créée !');
        }}
      />
    </div>
  );
}
```

---

## 5. Intégration dans le Header

```typescript
// components/layout/Header.tsx
'use client';

import { ApplicationSwitcher } from '@/components/dashboard/ApplicationSwitcher';
import { useState } from 'react';
import { NewApplicationModal } from '@/components/dashboard/NewApplicationModal';

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="mr-4">Logo</div>

        {/* Navigation */}
        <nav className="flex flex-1">
          {/* Items de navigation */}
        </nav>

        {/* Application Switcher */}
        <ApplicationSwitcher
          onNewApplication={() => setIsModalOpen(true)}
          className="ml-auto"
        />

        {/* User menu */}
        <div className="ml-4">
          {/* Menu utilisateur */}
        </div>
      </div>

      <NewApplicationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </header>
  );
}
```

---

## 6. Gestion des erreurs

Le hook `useApplications` gère automatiquement les erreurs via `useErrorHandler`.

```typescript
function MyComponent() {
  const { errorState, clearError } = useApplications();

  if (errorState.hasError) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          {errorState.message}
        </AlertDescription>
        <Button onClick={clearError}>OK</Button>
      </Alert>
    );
  }

  // ...
}
```

---

## 7. Types TypeScript

### Types principaux

```typescript
// CandidateJobPreference
interface CandidateJobPreference {
  id: string;
  candidateId: string;
  name?: string;                    // Nom généré par IA
  desiredPosition: string;
  jobDescription?: string;
  experience?: ExperienceLevel;
  workMode?: WorkMode;
  formalityLevel?: FormalityLevel;
  isActive: boolean;                // Candidature active
  cvId?: string;
  cv?: AppFile;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Enum types
type ExperienceLevel = 'JUNIOR' | 'INTERMEDIATE' | 'SENIOR' | 'EXPERT';
type WorkMode = 'REMOTE' | 'HYBRID' | 'IN_PERSON';
type FormalityLevel = 'DECONTRACTE' | 'PROFESSIONAL' | 'FORMEL';
```

### DTOs de requête

```typescript
interface CreateApplicationDto {
  desiredPosition: string;
  experience: ExperienceLevel;
  workMode: WorkMode;
}

interface UpdateApplicationJobDescriptionDto {
  jobDescription: string;
  formalityLevel?: FormalityLevel;
}
```

---

## 8. Endpoints API

Tous les endpoints sont définis dans `lib/api/endpoints.ts` :

```typescript
API_ENDPOINTS.ONBOARDING.APPLICATIONS.LIST                      // GET
API_ENDPOINTS.ONBOARDING.APPLICATIONS.CREATE                    // POST
API_ENDPOINTS.ONBOARDING.APPLICATIONS.GET(id)                   // GET
API_ENDPOINTS.ONBOARDING.APPLICATIONS.ACTIVATE(id)              // PUT
API_ENDPOINTS.ONBOARDING.APPLICATIONS.UPLOAD_CV(id)             // POST
API_ENDPOINTS.ONBOARDING.APPLICATIONS.UPDATE_JOB_DESCRIPTION(id) // PUT
```

---

## 9. Exemples d'utilisation avancée

### Filtrer les applications

```typescript
const { applications } = useApplications();

// Applications avec CV
const applicationsWithCV = applications.filter(app => app.cvId);

// Applications sans description
const incompleteApplications = applications.filter(
  app => !app.jobDescription
);
```

### Afficher un badge de statut

```typescript
function ApplicationBadge({ application }: { application: CandidateJobPreference }) {
  return (
    <div className="flex items-center gap-2">
      <span>{application.name || application.desiredPosition}</span>

      {application.isActive && (
        <Badge variant="default">Active</Badge>
      )}

      {!application.cvId && (
        <Badge variant="destructive">Sans CV</Badge>
      )}

      {!application.jobDescription && (
        <Badge variant="warning">Incomplet</Badge>
      )}
    </div>
  );
}
```

### Gestion du chargement

```typescript
function ApplicationsList() {
  const { applications, isRefreshing, loadApplications } = useApplications();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2>Mes candidatures</h2>
        <Button
          onClick={loadApplications}
          disabled={isRefreshing}
        >
          {isRefreshing ? 'Chargement...' : 'Actualiser'}
        </Button>
      </div>

      {applications.map(app => (
        <ApplicationCard key={app.id} application={app} />
      ))}
    </div>
  );
}
```

---

## 10. Checklist d'intégration

- [ ] Importer et utiliser `useApplications` dans vos composants
- [ ] Ajouter `ApplicationSwitcher` dans le header/dashboard
- [ ] Ajouter `NewApplicationModal` avec un bouton de déclenchement
- [ ] Afficher les infos de `activeApplication` dans le dashboard
- [ ] Gérer les erreurs avec `errorState`
- [ ] Tester la création d'une nouvelle candidature
- [ ] Tester le switch entre candidatures
- [ ] Vérifier que les données se rechargent correctement

---

## 11. Personnalisation

### Changer les couleurs du switcher

```typescript
<ApplicationSwitcher
  className="border-primary"
  onNewApplication={...}
/>
```

### Ajouter des actions personnalisées

```typescript
function CustomApplicationSwitcher() {
  const { applications, activateApplication } = useApplications();

  return (
    <div>
      {applications.map(app => (
        <div key={app.id} className="flex gap-2">
          <Button onClick={() => activateApplication(app.id)}>
            {app.name}
          </Button>
          <Button onClick={() => handleEdit(app)}>
            Éditer
          </Button>
          <Button onClick={() => handleDelete(app)}>
            Supprimer
          </Button>
        </div>
      ))}
    </div>
  );
}
```

---

## Support et dépannage

### Le dropdown ne s'affiche pas
- Vérifier que l'utilisateur est authentifié
- Vérifier que `applications.length > 0`
- Vérifier la console pour les erreurs

### Les applications ne se chargent pas
- Vérifier la connexion au backend
- Vérifier le token d'authentification
- Vérifier la console pour les erreurs API

### L'upload de CV échoue
- Vérifier le format du fichier (PDF, DOC, DOCX)
- Vérifier la taille (max 5 MB)
- Vérifier que `jobPreferenceId` est correct

---

## Prochaines étapes

- Ajouter des tests unitaires pour le hook
- Ajouter la fonctionnalité de suppression
- Ajouter la duplication de candidatures
- Ajouter des statistiques par candidature
