'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = AuthService.isAuthenticated();
      
      if (isAuthenticated) {
        try {
          const isValid = await AuthService.validateToken();

          if (isValid) {
            router.replace('/dashboard');
            return;
          }

          AuthService.clearAuth();
        } catch {
          AuthService.clearAuth();
        }
      }
    };

    checkAuth();
  }, [router]);

  return <>{children}</>;
}
