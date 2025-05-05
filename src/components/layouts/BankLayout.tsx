'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, UserCircleIcon } from '@heroicons/react/24/outline';
import { AuthService } from '@/services/auth.service';
import { Sidebar } from '@/components/layouts/Sidebar';
// import { classNames } from '@/utils/styles';

export function BankLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await AuthService.logout();
    router.replace('/login');
  };

  return (
    <div>
      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
        onLogout={handleLogout}
      />
      
      <div className="lg:pl-72">
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
