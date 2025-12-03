'use client';

import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ValidationError } from '@/components/ui/error-display';
import { User as UserIcon, Phone, Mail, MapPin, Linkedin as LinkedIn, Lock } from 'lucide-react';
import type { OnboardingFormData } from './types';
import type { User } from '@/lib/api/types';

interface PersonalInfoStepProps {
  formData: OnboardingFormData;
  setFormData: React.Dispatch<React.SetStateAction<OnboardingFormData>>;
  fieldErrors?: Record<string, string>;
  onFieldChange?: (field: string) => void;
  isAuthenticated?: boolean;
  user: User | null;
}

export default function PersonalInfoStep({
  user,
  formData,
  setFormData,
  fieldErrors = {},
  onFieldChange,
  isAuthenticated = false,
}: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserIcon className="text-emerald-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Informations personnelles { isAuthenticated ? ' (connecté)' : ' (non connecté)' } { user ? ` (${user.firstName} ${user.lastName})` : 'nan' }
        </h2>
        <p className="text-gray-600">Commençons par vos informations de base</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">Nom complet *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={e => {
              setFormData(s => ({ ...s, fullName: e.target.value }));
              onFieldChange?.('fullName');
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
                onFieldChange?.('email');
              }}
              placeholder="votre@email.com"
              className={`pl-10 ${fieldErrors.email ? 'border-red-500' : ''}`}
              disabled={isAuthenticated}
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

        {!isAuthenticated && (
          <div>
            <Label htmlFor="password">Mot de passe *</Label>
            <div className="relative mt-2">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={e => {
                  setFormData(s => ({ ...s, password: e.target.value }));
                  onFieldChange?.('password');
                }}
                placeholder="••••••••"
                className={`pl-10 ${fieldErrors.password ? 'border-red-500' : ''}`}
              />
            </div>
            {fieldErrors.password && (
              <ValidationError message={fieldErrors.password} field="password" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}