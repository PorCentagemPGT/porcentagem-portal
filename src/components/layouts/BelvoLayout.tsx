import { ReactNode } from 'react';
import { DashboardLayout } from './DashboardLayout';

interface BelvoLayoutProps {
  children: ReactNode;
}

export function BelvoLayout({ children }: BelvoLayoutProps) {
  return (
    <DashboardLayout>
      <div className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </DashboardLayout>
  );
}
