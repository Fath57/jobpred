'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, Menu, Search, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/lib/stores/authStore';
import { ApplicationSwitcher } from '@/components/dashboard/ApplicationSwitcher';
import { NewApplicationModal } from '@/components/dashboard/NewApplicationModal';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { user, isAuthenticated, token, fetchProfile } = useAuthStore();
  const [isNewApplicationModalOpen, setIsNewApplicationModalOpen] = useState(false);

  // Récupérer le profil utilisateur au montage du composant
  useEffect(() => {
    if (isAuthenticated && token && !user) {
      fetchProfile().catch(console.error);
    }
  }, [isAuthenticated, token, user, fetchProfile]);

  // Calculer les informations d'affichage
  const display = {
    name: user ? `${user.firstName} ${user.lastName}`.trim() : 'Utilisateur',
    initials: user ? `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() : 'US',
    subtitle: user?.role?.name || 'Utilisateur',
    avatar: user?.avatar || '',
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <Menu size={20} />
          </Button>

          <div className="relative max-w-md hidden md:block">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Rechercher..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>

          {/* ApplicationSwitcher - visible uniquement pour les candidats */}
          {user?.role?.name === 'Candidate' && (
            <div className="hidden lg:block">
              <ApplicationSwitcher
                onNewApplication={() => setIsNewApplicationModalOpen(true)}
              />
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="relative">
            <MessageCircle size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></span>
          </Button>

          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </Button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{display.name}</p>
              <p className="text-xs text-gray-500">{display.subtitle}</p>
            </div>
            <Avatar>
              {display.avatar ? (
                <AvatarImage src={display.avatar} alt={display.name} />
              ) : null}
              <AvatarFallback className="bg-emerald-100 text-emerald-700">
                {display.initials}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>

      {/* Modale de création de nouvelle candidature */}
      <NewApplicationModal
        open={isNewApplicationModalOpen}
        onOpenChange={setIsNewApplicationModalOpen}
        onSuccess={() => {
          // Optionnel: afficher une notification de succès
          console.log('Nouvelle candidature créée avec succès');
        }}
      />
    </header>
  );
}