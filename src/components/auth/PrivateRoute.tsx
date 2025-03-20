'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/services/auth.service';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Começa true para evitar flash

  useEffect(() => {
    if (!AuthService.isAuthenticated()) {
      setIsAuthenticated(false);
      router.replace('/login');
    }
  }, [router]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
