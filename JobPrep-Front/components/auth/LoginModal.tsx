'use client';

import React, { useState } from 'react';
import { X, Eye, EyeOff, CheckCircle, Shield, Clock } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import { API_ENDPOINTS } from '@/lib/api';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

type Props = {
  onClose: () => void;
};

export default function LoginModal({ onClose }: Props) {
  const router = useRouter();
  const { isLoading, error, login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login({ email, password } as any);
      router.push('/admin');
      onClose();
    } catch (_) {
      // handled by store
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-100"
          aria-label="Fermer"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Carousel/Benefits */}
          <div className="hidden md:block bg-[#41966A] text-white p-8">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold">Pourquoi JobPrep ?</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <CheckCircle className="mt-1" />
                  <div>
                    <div className="font-semibold">CV optimisé par l'IA</div>
                    <div className="text-white/90 text-sm">Améliorez votre CV et augmentez vos chances</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="mt-1" />
                  <div>
                    <div className="font-semibold">Préparation d'entretiens</div>
                    <div className="text-white/90 text-sm">Coaching et simulations guidées</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="mt-1" />
                  <div>
                    <div className="font-semibold">Gain de temps</div>
                    <div className="text-white/90 text-sm">Tout au même endroit, en quelques clics</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Connexion</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="vous@exemple.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(p => !p)}
                    aria-label={showPassword ? 'Cacher le mot de passe' : 'Afficher le mot de passe'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-sm text-red-600">{error}</div>
              )}

              <Button
                type="submit"
                className="w-full bg-[#41966A] hover:bg-[#37835C]"
                disabled={submitting || isLoading}
              >
                {submitting || isLoading ? 'Connexion...' : 'Se connecter'}
              </Button>
            </form>

            <div className="mt-6 text-sm text-gray-600">
              Pas de compte ?
              <span className="ml-1 font-medium text-[#41966A]">Inscription à l'onboarding</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


