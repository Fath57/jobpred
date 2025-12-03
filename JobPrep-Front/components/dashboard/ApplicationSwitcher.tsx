'use client';

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Plus, Loader2 } from 'lucide-react';
import { useApplications } from '@/lib/hooks/useApplications';
import { Button } from '@/components/ui/button';

interface ApplicationSwitcherProps {
  onNewApplication?: () => void;
  className?: string;
}

export function ApplicationSwitcher({
  onNewApplication,
  className = '',
}: ApplicationSwitcherProps) {
  const {
    applications,
    activeApplication,
    isLoading,
    activateApplication,
  } = useApplications();

  const handleValueChange = async (value: string) => {
    if (value === 'new') {
      onNewApplication?.();
      return;
    }

    try {
      await activateApplication(value);
      // Optionnel: Notifier l'utilisateur du succès
    } catch (error) {
      console.error('Failed to switch application:', error);
      // L'erreur est déjà gérée par le hook
    }
  };

  if (applications.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Briefcase className="h-4 w-4 text-muted-foreground" />

      <Select
        value={activeApplication?.id || ''}
        onValueChange={handleValueChange}
        disabled={isLoading}
      >
        <SelectTrigger className="w-[280px]">
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Chargement...</span>
            </div>
          ) : (
            <SelectValue placeholder="Sélectionner une candidature" />
          )}
        </SelectTrigger>

        <SelectContent>
          {applications.map((app) => (
            <SelectItem key={app.id} value={app.id}>
              <div className="flex items-center gap-2">
                <span className="font-medium">
                  {app.name || app.desiredPosition}
                </span>
                {app.isActive && (
                  <Badge variant="default" className="ml-2 text-xs">
                    Active
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}

          {onNewApplication && (
            <>
              <div className="h-px bg-border my-1" />
              <SelectItem value="new">
                <div className="flex items-center gap-2 text-primary">
                  <Plus className="h-4 w-4" />
                  <span className="font-medium">Nouvelle candidature</span>
                </div>
              </SelectItem>
            </>
          )}
        </SelectContent>
      </Select>

      {applications.length > 0 && (
        <Badge variant="secondary" className="text-xs">
          {applications.length}
        </Badge>
      )}
    </div>
  );
}

// Version compacte pour mobile
export function ApplicationSwitcherMobile({
  onNewApplication,
  className = '',
}: ApplicationSwitcherProps) {
  const {
    applications,
    activeApplication,
    isLoading,
  } = useApplications();

  if (applications.length === 0 && !isLoading) {
    return null;
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center gap-2">
        <Briefcase className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-medium">
          {activeApplication?.name || activeApplication?.desiredPosition || 'Aucune candidature'}
        </span>
      </div>

      {onNewApplication && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onNewApplication}
          className="h-8"
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
