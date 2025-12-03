/**
 * Exemples d'utilisation de l'architecture API et Zustand
 *
 * Ce fichier contient des exemples pratiques pour utiliser
 * les stores, hooks et API client que nous avons créés.
 */

import React, { useEffect } from 'react';
import {
  useAuth,
  useAuthActions,
  useUserProfile,
  useMotivationLetters,
  useAppActions,
  usePermissions,
  useApi,
  useMutation,
} from '../hooks';
import { API_ENDPOINTS } from '../api';

// ===== EXEMPLE 1: Authentification =====
export function LoginExample() {
  const { isAuthenticated, isLoading, error } = useAuth();
  const { login, register, clearError } = useAuthActions();

  const handleLogin = async () => {
    try {
      await login({
        email: 'user@example.com',
        password: 'password123',
      });
    } catch (error) {
      // L'erreur est déjà gérée dans le store
      console.error('Login failed:', error);
    }
  };

  const handleRegister = async () => {
    try {
      await register({
        email: 'newuser@example.com',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
      });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  if (isAuthenticated) {
    return <div>Utilisateur connecté !</div>;
  }

  return (
    <div>
      {isLoading && <div>Connexion en cours...</div>}
      {error && (
        <div>
          Erreur: {error}
          <button onClick={clearError}>Fermer</button>
        </div>
      )}
      <button onClick={handleLogin}>Se connecter</button>
      <button onClick={handleRegister}>S'inscrire</button>
    </div>
  );
}

// ===== EXEMPLE 2: Gestion des lettres de motivation =====
export function MotivationLettersExample() {
  const {
    letters,
    isLoading,
    error,
    fetchLetters,
    createLetter,
    updateLetter,
    deleteLetter,
  } = useMotivationLetters();

  useEffect(() => {
    fetchLetters({ page: 1, limit: 10 });
  }, [fetchLetters]);

  const handleCreateLetter = async () => {
    try {
      await createLetter({
        jobTitle: 'Développeur Frontend',
        companyName: 'TechCorp',
        content: 'Contenu de la lettre...',
      });
    } catch (error) {
      console.error('Failed to create letter:', error);
    }
  };

  const handleUpdateLetter = async (id: string) => {
    try {
      await updateLetter(id, {
        content: 'Contenu mis à jour...',
      });
    } catch (error) {
      console.error('Failed to update letter:', error);
    }
  };

  const handleDeleteLetter = async (id: string) => {
    try {
      await deleteLetter(id);
    } catch (error) {
      console.error('Failed to delete letter:', error);
    }
  };

  return (
    <div>
      <h2>Lettres de Motivation</h2>

      {isLoading && <div>Chargement...</div>}
      {error && <div>Erreur: {error}</div>}

      <button onClick={handleCreateLetter}>Créer une nouvelle lettre</button>

      <div>
        {letters.map(letter => (
          <div key={letter.id}>
            <h3>
              {letter.jobTitle} - {letter.companyName}
            </h3>
            <p>{letter.content}</p>
            <button onClick={() => handleUpdateLetter(letter.id)}>
              Modifier
            </button>
            <button onClick={() => handleDeleteLetter(letter.id)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== EXEMPLE 3: Utilisation des hooks API personnalisés =====
export function ApiHooksExample() {
  const { data, loading, error, get, post, reset } = useApi();
  const { mutate, loading: mutationLoading } = useMutation();
  const { handleGlobalError, handleGlobalSuccess } = useAppActions();

  const fetchUserData = async () => {
    try {
      await get(API_ENDPOINTS.AUTH.PROFILE);
    } catch (error) {
      handleGlobalError(error, 'Fetch User Data');
    }
  };

  const createUser = async () => {
    try {
      await mutate(
        () =>
          api.post(API_ENDPOINTS.USERS.CREATE, {
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
          }),
        {
          successMessage: 'Utilisateur créé avec succès',
          onSuccess: data => {
            console.log('User created:', data);
            handleGlobalSuccess('Utilisateur créé !');
          },
          onError: error => {
            handleGlobalError(error, 'Create User');
          },
        }
      );
    } catch (error) {
      // L'erreur est déjà gérée dans le hook
    }
  };

  return (
    <div>
      <h2>Exemple API Hooks</h2>

      <div>
        <button onClick={fetchUserData} disabled={loading}>
          {loading ? 'Chargement...' : 'Récupérer les données utilisateur'}
        </button>
        <button onClick={createUser} disabled={mutationLoading}>
          {mutationLoading ? 'Création...' : 'Créer un utilisateur'}
        </button>
        <button onClick={reset}>Réinitialiser</button>
      </div>

      {error && <div>Erreur: {error}</div>}

      {data && (
        <div>
          <h3>Données récupérées:</h3>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

// ===== EXEMPLE 4: Gestion des permissions =====
export function PermissionsExample() {
  const { hasPermission, hasRole, isAdmin, isUser, user } = usePermissions();

  return (
    <div>
      <h2>Gestion des Permissions</h2>

      <div>
        <p>Utilisateur: {user?.email}</p>
        <p>Rôle: {user?.role}</p>
      </div>

      <div>
        <h3>Vérifications de permissions:</h3>
        <ul>
          <li>
            Peut lire le profil: {hasPermission('read:profile') ? '✅' : '❌'}
          </li>
          <li>
            Peut écrire le profil:{' '}
            {hasPermission('write:profile') ? '✅' : '❌'}
          </li>
          <li>Est administrateur: {isAdmin() ? '✅' : '❌'}</li>
          <li>Est utilisateur: {isUser() ? '✅' : '❌'}</li>
          <li>
            A le rôle admin ou user: {hasRole(['admin', 'user']) ? '✅' : '❌'}
          </li>
        </ul>
      </div>

      {/* Rendu conditionnel basé sur les permissions */}
      {hasPermission('write:profile') && (
        <div>
          <button>Modifier le profil</button>
        </div>
      )}

      {isAdmin() && (
        <div>
          <button>Panneau d'administration</button>
        </div>
      )}
    </div>
  );
}

// ===== EXEMPLE 5: Composant complet avec toutes les fonctionnalités =====
export function CompleteExample() {
  const { isAuthenticated } = useAuth();
  const { user } = useUserProfile();
  const { motivationLetters } = useMotivationLetters();
  const { handleGlobalSuccess } = useAppActions();
  const { hasPermission } = usePermissions();

  useEffect(() => {
    if (isAuthenticated) {
      handleGlobalSuccess(`Bienvenue ${user?.firstName} !`);
    }
  }, [isAuthenticated, user, handleGlobalSuccess]);

  if (!isAuthenticated) {
    return <LoginExample />;
  }

  return (
    <div>
      <h1>Dashboard Complet</h1>

      <div>
        <h2>Profil Utilisateur</h2>
        <p>
          Nom: {user?.firstName} {user?.lastName}
        </p>
        <p>Email: {user?.email}</p>
        <p>Rôle: {user?.role}</p>
      </div>

      <div>
        <h2>Statistiques</h2>
        <p>Lettres de motivation: {motivationLetters.length}</p>
      </div>

      {hasPermission('write:letters') && (
        <div>
          <h2>Actions Rapides</h2>
          <button>Créer une lettre</button>
          <button>Analyser un CV</button>
        </div>
      )}

      <MotivationLettersExample />
      <PermissionsExample />
    </div>
  );
}

// ===== EXEMPLE 6: Upload de fichiers =====
export function FileUploadExample() {
  const { upload, loading, error } = useApi();

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'resume');

    try {
      const result = await upload(API_ENDPOINTS.RESUMES.UPLOAD, formData, {
        loadingMessage: 'Upload du fichier en cours...',
        successMessage: 'Fichier uploadé avec succès',
      });

      console.log('Upload successful:', result);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  return (
    <div>
      <h2>Upload de Fichier</h2>

      <input
        type="file"
        onChange={handleFileUpload}
        disabled={loading}
        accept=".pdf,.doc,.docx"
      />

      {loading && <div>Upload en cours...</div>}
      {error && <div>Erreur: {error}</div>}
    </div>
  );
}
