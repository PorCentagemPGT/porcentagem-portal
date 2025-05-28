import { ReactNode } from 'react';
import { DashboardLayout } from './DashboardLayout';

interface BelvoLayoutProps {
  children: ReactNode;
}

export function BelvoLayout({ children }: BelvoLayoutProps) {
  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
}
