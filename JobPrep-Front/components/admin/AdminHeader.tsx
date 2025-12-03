'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Bell,
  Search,
  Settings,
  LogOut,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/lib/hooks';

export default function AdminHeader() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const notifications = [
    { type: 'alert', message: 'Pic de trafic détecté', time: '2 min' },
    { type: 'success', message: 'Sauvegarde réussie', time: '15 min' },
    { type: 'warning', message: 'Maintenance programmée', time: '1h' },
  ];

  const systemStatus = {
    overall: 'operational',
    api: 'operational',
    database: 'operational',
    ai: 'operational',
    cdn: 'maintenance',
  };

  const { user } = useAuth();

  const effectiveUser = useMemo(() => {
    if (user) return user as any;
    if (!mounted) return null;
    try {
      const raw = localStorage.getItem('auth-storage');
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed?.state?.user || parsed?.user || null;
    } catch {
      return null;
    }
  }, [user, mounted]);

  const profile = useMemo(() => {
    const u: any = effectiveUser;
    const fullName = u ? `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() : '';
    const initials = fullName
      ? fullName.split(' ').filter(Boolean).map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
      : (u?.email ? u.email[0].toUpperCase() : 'AD');

    // Compute role label robustly (supports string or object roles)
    let roleLabel = 'Utilisateur';
    const roleAny: any = u?.role;
    if (roleAny) {
      if (typeof roleAny === 'string') {
        roleLabel = roleAny.toLowerCase() === 'admin'
          ? 'Super Admin'
          : roleAny.charAt(0).toUpperCase() + roleAny.slice(1);
      } else if (typeof roleAny === 'object') {
        const raw = roleAny.label || roleAny.name || '';
        roleLabel = raw ? String(raw) : 'Utilisateur';
      }
    }

    return {
      name: fullName || u?.email || 'Utilisateur',
      avatar: u?.avatar || '',
      initials,
      roleLabel,
    };
  }, [effectiveUser]);

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative max-w-md">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={16}
            />
            <Input
              placeholder="Rechercher dans l'admin..."
              className="pl-10 bg-gray-50 border-gray-200 focus:bg-white"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* System Status */}
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                systemStatus.overall === 'operational'
                  ? 'bg-emerald-500'
                  : systemStatus.overall === 'maintenance'
                    ? 'bg-amber-500'
                    : 'bg-red-500'
              }`}
            ></div>
            <span className="text-sm text-gray-600">
              {systemStatus.overall === 'operational'
                ? 'Système opérationnel'
                : systemStatus.overall === 'maintenance'
                  ? 'Maintenance en cours'
                  : 'Problème détecté'}
            </span>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {notifications.length}
            </span>
          </Button>

          {/* Quick Actions */}
          <Button variant="ghost" size="sm">
            <Activity size={20} />
          </Button>

          <Button variant="ghost" size="sm">
            <Settings size={20} />
          </Button>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{profile.name}</p>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                >
                  <Shield size={10} className="mr-1" />
                  {profile.roleLabel}
                </Badge>
              </div>
            </div>
            <Avatar>
              {profile.avatar ? (
                <AvatarImage src={profile.avatar} alt={profile.name} />
              ) : null}
              <AvatarFallback className="bg-blue-100 text-blue-700">
                {profile.initials}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut size={20} />
          </Button>
        </div>
      </div>

      {/* System Status Bar */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">
                État des services:
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-emerald-500" />
                <span className="text-gray-600">API</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-emerald-500" />
                <span className="text-gray-600">Base de données</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle size={14} className="text-emerald-500" />
                <span className="text-gray-600">IA Services</span>
              </div>
              <div className="flex items-center gap-1">
                <AlertTriangle size={14} className="text-amber-500" />
                <span className="text-gray-600">CDN (Maintenance)</span>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm">
            Voir détails
          </Button>
        </div>
      </div>
    </header>
  );
}
