'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ValidationError } from '@/components/ui/error-display';
import { User as UserIcon, Phone, Mail, MapPin, Linkedin as LinkedIn, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';
import Link from 'next/link';

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  password: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const { register, isLoading, error } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    location: '',
    password: '',
  });

  const clearFieldError = (field: string) => {
    setFieldErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.fullName) {
      errors.fullName = 'Le nom complet est requis';
    }
    
    if (!formData.email) {
      errors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "L'email n'est pas valide";
    }
    
    if (!formData.password) {
      errors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 8) {
      errors.password = 'Le mot de passe doit contenir au moins 8 caractères';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

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

      // Redirection vers le dashboard après inscription réussie
      router.push('/dashboard');
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserIcon className="text-emerald-600" size={32} />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Créer votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Ou{' '}
          <Link href="/login" className="font-medium text-emerald-600 hover:text-emerald-500">
            connectez-vous à votre compte existant
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName">Nom complet *</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={e => {
                    setFormData(s => ({ ...s, fullName: e.target.value }));
                    clearFieldError('fullName');
                  }}
                  placeholder="Jean René Roustand"
                  className={`mt-2 ${fieldErrors.fullName ? 'border-red-500' : ''}`}
                />
                {fieldErrors.fullName && (
                  <ValidationError message={fieldErrors.fullName} field="fullName" />
                )}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <div className="relative mt-2">
                  <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={e => {
                      setFormData(s => ({ ...s, email: e.target.value }));
                      clearFieldError('email');
                    }}
                    placeholder="votre@email.com"
                    className={`pl-10 ${fieldErrors.email ? 'border-red-500' : ''}`}
                  />
                </div>
                {fieldErrors.email && (
                  <ValidationError message={fieldErrors.email} field="email" />
                )}
              </div>

              <div>
                <Label htmlFor="phone">Numéro de téléphone</Label>
                <div className="relative mt-2">
                  <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={e =>
                      setFormData(s => ({ ...s, phone: e.target.value }))
                    }
                    placeholder="+33 7 81 65 59 92"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="linkedin">URL LinkedIn (Facultatif)</Label>
                <div className="relative mt-2">
                  <LinkedIn
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={e =>
                      setFormData(s => ({ ...s, linkedin: e.target.value }))
                    }
                    placeholder="https://www.linkedin.com/in/yourname"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location">Lieu/Ville</Label>
                <div className="relative mt-2">
                  <MapPin
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={e =>
                      setFormData(s => ({ ...s, location: e.target.value }))
                    }
                    placeholder="Villejuif"
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password">Mot de passe *</Label>
                <div className="relative mt-2">
                  <Lock
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={e => {
                      setFormData(s => ({ ...s, password: e.target.value }));
                      clearFieldError('password');
                    }}
                    placeholder="••••••••"
                    className={`pl-10 pr-10 ${fieldErrors.password ? 'border-red-500' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-500"
                  >
                    {showPassword ? (
                      <EyeOff size={16} />
                    ) : (
                      <Eye size={16} />
                    )}
                  </button>
                </div>
                {fieldErrors.password && (
                  <ValidationError message={fieldErrors.password} field="password" />
                )}
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Erreur lors de l'inscription
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4"
                disabled={isLoading}
              >
                {isLoading ? 'Inscription en cours...' : 'S\'inscrire'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
