'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/stores/authStore';
import Cookies from 'js-cookie';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isAuthenticated, token } = useAuthStore();

  // Client-side auth check compatible with static export
  useEffect(() => {
    const checkAuth = () => {
      // Vérifier le state Zustand
      if (!isAuthenticated || !token) {
        // Vérifier le localStorage et les cookies comme fallback
        const localToken = localStorage.getItem('auth_token');
        const cookieToken = Cookies.get('auth_token');

        if (!localToken && !cookieToken) {
          // Si aucun token n'est trouvé, rediriger vers la page de connexion
          router.replace('/login');
        }
      }
    };

    checkAuth();
  }, [isAuthenticated, token, router]);

  return children;
}