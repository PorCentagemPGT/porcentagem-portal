'use client';

import { useEffect, useState } from 'react';
import { BelvoLayout } from '@/components/layouts/BelvoLayout';
import { BelvoAccount, BelvoService } from '@/services/belvo.service';
import { BelvoLinkedBanksCard } from '@/components/belvo/BelvoLinkedBanksCard';
import { BelvoConnectCard } from '@/components/belvo/BelvoConnectCard';
import { AuthService } from '@/services/auth.service';

export default function BelvoPage() {
  const [accounts, setAccounts] = useState<BelvoAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function loadAccounts() {
    setIsLoading(true);

    try {
      const user = AuthService.getUser();
      console.log(user);
      if (!user?.id) return;

      const accounts = await BelvoService.listUserAccounts(user.id);
      console.log('Accounts:', accounts);
      setAccounts(accounts.data);
    } catch (error) {
      console.error('Erro ao carregar contas:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  return (
    <BelvoLayout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6">
              Contas Bancárias
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Gerencie suas contas bancárias conectadas através do Belvo
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <BelvoConnectCard onSuccess={loadAccounts} />
          <BelvoLinkedBanksCard
            accounts={accounts}
            isLoading={isLoading}
            onUnlink={() => loadAccounts()}
          />
        </div>
      </div>
    </BelvoLayout>
  );
}
