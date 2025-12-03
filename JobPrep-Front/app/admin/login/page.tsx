'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff, AlertTriangle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        const message = errData?.message || 'Email ou mot de passe incorrect';
        throw new Error(Array.isArray(message) ? message.join(', ') : message);
      }

      const data = await response.json();
      const { access_token, user } = data || {};

      if (!access_token) {
        throw new Error("Réponse d'authentification invalide (token manquant)");
      }

      // Simple role check (expects user.role?.name === 'Admin')
      const roleName = user?.role?.name || user?.role || '';
      if (roleName !== 'Admin') {
        throw new Error("Accès refusé: vous n'avez pas les droits administrateur");
      }

      try {
        localStorage.setItem('auth_token', access_token);
        if (user) localStorage.setItem('auth_user', JSON.stringify(user));
      } catch (_) {}

      // Also set an auth cookie so server-side layouts can verify authentication
      try {
        const maxAgeSeconds = 60 * 60 * 24 * 7; // 7 days
        document.cookie = `auth_token=${access_token}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax` + (location.protocol === 'https:' ? '; Secure' : '');
      } catch (_) {}

      window.location.href = '/admin';
    } catch (err: any) {
      setError(err?.message || 'Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">JobPrep Admin</h1>
              <p className="text-sm text-gray-600">Panneau d&apos;administration</p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center">
              Connexion Administrateur
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="text-red-600" size={16} />
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="email">Email administrateur</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="admin@jobprep.com"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">
                Identifiants de démonstration
              </h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>
                  <strong>Email:</strong> admin@jobprep.com
                </p>
                <p>
                  <strong>Mot de passe:</strong> admin123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Connexion sécurisée avec authentification à deux facteurs.
            <br />
            Toutes les actions sont enregistrées et auditées.
          </p>
        </div>
      </div>
    </div>
  );
}
