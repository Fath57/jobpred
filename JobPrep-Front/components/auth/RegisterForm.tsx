'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, AlertTriangle, Mail, Phone, MapPin, Linkedin as LinkedIn, Lock, User as UserIcon } from 'lucide-react';
import { ValidationError } from '@/components/ui/error-display';

interface RegisterFormData {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  location: string;
  password: string;
}

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading: boolean;
  error?: string;
}

export default function RegisterForm({ onSubmit, isLoading, error }: RegisterFormProps) {
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    location: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

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

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="text-red-600" size={16} />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <div>
        <Label htmlFor="fullName">Nom complet *</Label>
        <div className="relative mt-2">
          <UserIcon
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={16}
          />
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={e => {
              setFormData(s => ({ ...s, fullName: e.target.value }));
              clearFieldError('fullName');
            }}
            placeholder="Jean René Roustand"
            className={`pl-10 ${fieldErrors.fullName ? 'border-red-500' : ''}`}
          />
        </div>
        {fieldErrors.fullName && (
          <ValidationError message={fieldErrors.fullName} field="fullName" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
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
              placeholder="vous@exemple.com"
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
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {fieldErrors.password && (
          <ValidationError message={fieldErrors.password} field="password" />
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-[#0d9488] hover:bg-[#0b7f74] text-white"
        disabled={isLoading}
      >
        {isLoading ? 'Inscription...' : "S'inscrire"}
      </Button>
    </form>
  );
}
