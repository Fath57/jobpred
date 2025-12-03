# Architecture API et Gestion d'État - JobPrep Frontend

Cette documentation explique l'architecture mise en place pour la gestion d'état avec Zustand et les appels API avec Axios.

## 🏗️ Structure de l'Architecture

```
lib/
├── api/                    # Couche API centralisée
│   ├── client.ts          # Instance Axios avec interceptors
│   ├── endpoints.ts       # Définition des endpoints
│   ├── types.ts          # Types TypeScript pour les API
│   └── index.ts          # Export central
├── stores/                # Stores Zustand modulaires
│   ├── authStore.ts      # Authentification
│   ├── appStore.ts       # État global de l'app
│   ├── userStore.ts      # Données utilisateur
│   └── index.ts          # Export central
├── hooks/                 # Hooks personnalisés
│   ├── useApi.ts         # Hooks pour les appels API
│   ├── useStore.ts       # Hooks utilitaires pour les stores
│   └── index.ts          # Export central
├── examples/              # Exemples d'utilisation
│   └── usage-examples.tsx
└── README.md              # Cette documentation
```

## 🚀 Installation et Configuration

### 1. Dépendances installées

```json
{
  "axios": "^1.6.0",
  "zustand": "^4.4.0"
}
```

### 2. Variables d'environnement

Créez un fichier `.env.local` :

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api/v1
```

## 📡 Couche API (Axios)

### Client centralisé

Le client Axios est configuré avec :

- ✅ **Interceptors automatiques** pour l'authentification
- ✅ **Gestion des tokens** (refresh automatique)
- ✅ **Gestion d'erreurs centralisée**
- ✅ **Logging en développement**
- ✅ **Timeout configurable**
- ✅ **Annulation des requêtes**

### Utilisation de base

```typescript
import { api, API_ENDPOINTS } from '@/lib/api';

// GET
const response = await api.get(API_ENDPOINTS.AUTH.PROFILE);

// POST
const response = await api.post(API_ENDPOINTS.USERS.CREATE, userData);

// PUT
const response = await api.put(API_ENDPOINTS.USERS.UPDATE(id), userData);

// DELETE
await api.delete(API_ENDPOINTS.USERS.DELETE(id));

// UPLOAD
const formData = new FormData();
formData.append('file', file);
await api.upload(API_ENDPOINTS.RESUMES.UPLOAD, formData);
```

## 🗄️ Stores Zustand

### 1. AuthStore - Authentification

```typescript
import { useAuth, useAuthActions } from '@/lib/stores';

function LoginComponent() {
  const { isAuthenticated, user, isLoading } = useAuth();
  const { login, logout, updateProfile } = useAuthActions();

  const handleLogin = async () => {
    try {
      await login({
        email: 'user@example.com',
        password: 'password123',
      });
    } catch (error) {
      // L'erreur est automatiquement gérée
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>Bienvenue {user?.firstName}!</div>
      ) : (
        <button onClick={handleLogin}>Se connecter</button>
      )}
    </div>
  );
}
```

### 2. AppStore - État global

```typescript
import { useAppSettings, useNotifications, useSidebar } from '@/lib/stores';

function AppComponent() {
  const { sidebarCollapsed, theme } = useAppSettings();
  const { addNotification } = useNotifications();
  const { toggleSidebar } = useSidebar();

  return (
    <div>
      <button onClick={toggleSidebar}>
        {sidebarCollapsed ? 'Ouvrir' : 'Fermer'} sidebar
      </button>

      <button onClick={() => addNotification({
        type: 'success',
        title: 'Succès',
        message: 'Opération réussie',
      })}>
        Ajouter notification
      </button>
    </div>
  );
}
```

### 3. UserStore - Données utilisateur

```typescript
import { useMotivationLetters, useResumes } from '@/lib/stores';

function UserDataComponent() {
  const { letters, isLoading, fetchLetters, createLetter } = useMotivationLetters();
  const { resumes, fetchResumes } = useResumes();

  useEffect(() => {
    fetchLetters({ page: 1, limit: 10 });
    fetchResumes();
  }, []);

  return (
    <div>
      <h2>Lettres de Motivation ({letters.length})</h2>
      <h2>CV ({resumes.length})</h2>
    </div>
  );
}
```

## 🪝 Hooks Personnalisés

### 1. useApi - Appels API avec gestion d'état

```typescript
import { useApi } from '@/lib/hooks';

function ApiComponent() {
  const { data, loading, error, get, post } = useApi();

  const fetchData = async () => {
    try {
      await get(API_ENDPOINTS.USERS.LIST);
    } catch (error) {
      // Gestion automatique des erreurs
    }
  };

  const createData = async () => {
    try {
      await post(API_ENDPOINTS.USERS.CREATE, {
        name: 'Nouveau utilisateur',
      });
    } catch (error) {
      // Gestion automatique des erreurs
    }
  };

  return (
    <div>
      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Chargement...' : 'Récupérer'}
      </button>
      <button onClick={createData}>Créer</button>

      {error && <div>Erreur: {error}</div>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
}
```

### 2. useMutation - Mutations avec callbacks

```typescript
import { useMutation } from '@/lib/hooks';

function MutationComponent() {
  const { mutate, loading } = useMutation();

  const handleSubmit = async () => {
    try {
      await mutate(
        () => api.post(API_ENDPOINTS.USERS.CREATE, userData),
        {
          successMessage: 'Utilisateur créé avec succès',
          onSuccess: (data) => {
            console.log('Success:', data);
            // Redirection ou autre action
          },
          onError: (error) => {
            console.error('Error:', error);
          },
        }
      );
    } catch (error) {
      // L'erreur est déjà gérée
    }
  };

  return (
    <button onClick={handleSubmit} disabled={loading}>
      {loading ? 'Création...' : 'Créer'}
    </button>
  );
}
```

### 3. usePermissions - Gestion des permissions

```typescript
import { usePermissions } from '@/lib/hooks';

function PermissionComponent() {
  const { hasPermission, isAdmin, user } = usePermissions();

  return (
    <div>
      {hasPermission('write:profile') && (
        <button>Modifier le profil</button>
      )}

      {isAdmin() && (
        <div>Panneau d'administration</div>
      )}

      <p>Utilisateur: {user?.email}</p>
    </div>
  );
}
```

## 🔧 Configuration Avancée

### Interceptors personnalisés

Vous pouvez ajouter des interceptors personnalisés dans `lib/api/client.ts` :

```typescript
// Interceptor pour ajouter des métriques
apiClient.interceptors.request.use(config => {
  config.metadata = { startTime: Date.now() };
  return config;
});

apiClient.interceptors.response.use(response => {
  const duration = Date.now() - response.config.metadata.startTime;
  console.log(`Request took ${duration}ms`);
  return response;
});
```

### Middleware Zustand personnalisé

Vous pouvez ajouter des middlewares personnalisés dans les stores :

```typescript
import { devtools, persist } from 'zustand/middleware';

export const useCustomStore = create<State>()(
  devtools(
    persist(
      set => ({
        // Votre état
      }),
      {
        name: 'custom-storage',
      }
    ),
    {
      name: 'custom-store',
    }
  )
);
```

## 📝 Bonnes Pratiques

### 1. Structure des composants

```typescript
// ✅ Bon : Utilisation des hooks personnalisés
function MyComponent() {
  const { data, loading, error } = useApi();
  const { user } = useAuth();

  // Logique du composant
}

// ❌ Éviter : Accès direct aux stores
function MyComponent() {
  const store = useAuthStore(); // Pas recommandé
}
```

### 2. Gestion des erreurs

```typescript
// ✅ Bon : Utilisation des actions avec gestion d'erreur
const { login } = useAuthActions();

const handleLogin = async () => {
  try {
    await login(credentials);
  } catch (error) {
    // L'erreur est déjà gérée dans le store
  }
};

// ✅ Bon : Utilisation des hooks API avec gestion automatique
const { get } = useApi();
await get(endpoint); // Erreurs gérées automatiquement
```

### 3. Optimisation des performances

```typescript
// ✅ Bon : Utilisation des sélecteurs spécifiques
const { user } = useAuth(); // Seulement les données auth
const { letters } = useMotivationLetters(); // Seulement les lettres

// ❌ Éviter : Accès à tout le store
const store = useAuthStore(); // Tout le store
```

## 🧪 Tests

### Test des stores

```typescript
import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from '@/lib/stores';

test('should login user', async () => {
  const { result } = renderHook(() => useAuthStore());

  await act(async () => {
    await result.current.login({
      email: 'test@example.com',
      password: 'password',
    });
  });

  expect(result.current.isAuthenticated).toBe(true);
});
```

### Test des hooks API

```typescript
import { renderHook } from '@testing-library/react';
import { useApi } from '@/lib/hooks';

test('should handle API errors', async () => {
  const { result } = renderHook(() => useApi());

  // Mock de l'API pour retourner une erreur
  // Test de la gestion d'erreur
});
```

## 🚀 Déploiement

### Variables d'environnement de production

```env
NEXT_PUBLIC_API_URL=https://api.jobprep.com/api
```

### Optimisations de build

```typescript
// next.config.js
module.exports = {
  // Optimisations pour Zustand
  experimental: {
    optimizePackageImports: ['zustand'],
  },
};
```

## 📚 Ressources

- [Documentation Zustand](https://github.com/pmndrs/zustand)
- [Documentation Axios](https://axios-http.com/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [TypeScript avec React](https://react-typescript-cheatsheet.netlify.app/)

## 🤝 Contribution

1. Suivez la structure existante
2. Ajoutez des tests pour les nouvelles fonctionnalités
3. Documentez les nouvelles API et hooks
4. Respectez les conventions TypeScript

---

Cette architecture vous donne une base solide et extensible pour gérer l'état et les appels API dans votre application JobPrep ! 🎉
