# Backend Data - Letters Domain

Ce dossier contient les entités, repositories et services pour le domaine "Letters" du backend JobPrep.

## Structure

### 📁 Entities

Définition des modèles de données et interfaces TypeScript :

- **`User.ts`** - Entités utilisateur et profil
- **`JobOffer.ts`** - Entités offres d'emploi et entreprises
- **`MotivationLetter.ts`** - Entités lettres de motivation, templates et tons
- **`FollowUpLetter.ts`** - Entités lettres de relance, candidatures et timing
- **`LetterGeneration.ts`** - Entités génération, feedback et analytics

### 📁 Repositories

Interfaces pour l'accès aux données :

- **`UserRepository.ts`** - Gestion des utilisateurs et profils
- **`MotivationLetterRepository.ts`** - Gestion des lettres de motivation
- **`FollowUpLetterRepository.ts`** - Gestion des lettres de relance

### 📁 Services

Logique métier et services applicatifs :

- **`LetterGenerationService.ts`** - Service de génération de lettres IA
- **`LetterAnalyticsService.ts`** - Service d'analytics et métriques

## Entités Principales

### User & UserProfile

- Gestion complète des utilisateurs
- Profils avec compétences, langues, certifications
- Préférences personnalisées

### JobOffer & Company

- Offres d'emploi détaillées
- Informations entreprises
- Matching et compatibilité

### MotivationLetter

- Lettres de motivation avec templates et tons
- Analyse IA et scoring
- Versioning et historique

### FollowUpLetter & Application

- Lettres de relance intelligentes
- Suivi des candidatures
- Timing optimal et analytics

### LetterGeneration

- Processus de génération IA
- Métriques de qualité
- Feedback et amélioration continue

## Services

### LetterGenerationService

- Génération de lettres personnalisées
- Validation qualité
- Gestion des modèles IA
- Traitement par lots

### LetterAnalyticsService

- Tracking des événements
- Calcul des métriques
- Analyses de performance
- Insights personnalisés

## Utilisation

```typescript
import {
  User,
  MotivationLetter,
  LetterGenerationService,
  UserRepository,
} from './backend-data/letters';

// Exemple d'utilisation
const userRepo: UserRepository = new UserRepositoryImpl();
const letterService: LetterGenerationService =
  new LetterGenerationServiceImpl();

const user = await userRepo.findById('user-123');
const letter = await letterService.generateMotivationLetter({
  userId: user.id,
  jobOfferId: 'job-456',
  templateId: 'template-789',
  // ...
});
```

## Évolutivité

Cette structure permet :

- ✅ Ajout facile de nouveaux types de lettres
- ✅ Extension des analytics et métriques
- ✅ Intégration de nouveaux modèles IA
- ✅ Scaling horizontal des services
- ✅ Maintenance et tests simplifiés
