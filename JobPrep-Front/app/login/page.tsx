'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, register, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const [mode, setMode] = useState<'login' | 'register'>('login');

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.replace(redirect);
      }
  }, [isAuthenticated, router, searchParams]);

  const handleLogin = async (email: string, password: string) => {
    clearError();
    try {
      await login({ email, password });
      const redirect = searchParams.get('redirect') || '/dashboard';
      router.replace(redirect);
    } catch (err) {
      // L'erreur est déjà gérée par le store
    }
  };

  const handleRegister = async (formData: {
    fullName: string;
    email: string;
    phone: string;
    linkedin: string;
    location: string;
    password: string;
  }) => {
    clearError();
    try {
      const [firstName, ...lastNameParts] = formData.fullName.split(' ');
      const lastName = lastNameParts.join(' ');

      await register({
        email: formData.email,
        password: formData.password,
        firstName,
        lastName,
        phone: formData.phone,
        location: formData.location,
        linkedin: formData.linkedin,
      });
      router.replace('/onboarding');
    } catch (err) {
      // L'erreur est déjà gérée par le store
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left image block */}
      <div className="relative hidden lg:block">
        <div className="absolute inset-0 bg-[#0d9488]" aria-hidden="true" />
        <img
          src="/images/search_job.jpg"
          alt="Illustration professionnelle"
          className="absolute inset-0 h-full w-full object-cover mix-blend-multiply"
        />
        <div className="relative z-10 h-full w-full p-10 flex flex-col justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold">JobPrep</h1>
              <p className="text-white/80 text-sm">Construisez votre carrière en confiance</p>
            </div>
          </div>
          <p className="text-white/80 text-sm max-w-md">
            Rejoignez JobPrep pour avancer sereinement dans votre recherche d&apos;emploi.
          </p>
        </div>
      </div>

      {/* Right form block */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Header (mobile only) */}
          <div className="lg:hidden text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#0d9488]">
                <Shield className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">JobPrep</h2>
                <p className="text-sm text-gray-600">
                  {mode === 'login' ? 'Espace de connexion' : 'Créer un compte'}
                </p>
              </div>
            </div>
          </div>

          <Card className="shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-center">
                {mode === 'login' ? 'Connexion' : 'Inscription'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mode === 'login' ? (
                <LoginForm
                  onSubmit={handleLogin}
                  isLoading={isLoading}
                  error={error}
                />
              ) : (
                <RegisterForm
                  onSubmit={handleRegister}
                  isLoading={isLoading}
                  error={error}
                />
              )}

              {/* Helper Links */}
              <div className="mt-6 text-center text-sm">
                {mode === 'login' ? (
                  <>
                    <button onClick={() => setMode('register')} className="text-[#0d9488] hover:underline">
                      Créer un compte
                    </button>
                <span className="mx-2 text-gray-400">•</span>
                    <button className="text-[#0d9488] hover:underline">
                      Mot de passe oublié ?
                    </button>
                  </>
                ) : (
                  <>
                    <span>Déjà inscrit ?</span>{' '}
                    <button onClick={() => setMode('login')} className="text-[#0d9488] hover:underline">
                      Se connecter
                    </button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              {mode === 'login'
                ? 'Connexion sécurisée. Vos données sont protégées.'
                : 'Inscription sécurisée. Vos données sont protégées.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}