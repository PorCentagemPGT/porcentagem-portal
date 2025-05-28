'use client';

import { useEffect, useState } from 'react';
import { BelvoLayout } from '@/components/layouts/BelvoLayout';
import { BelvoAccount, BelvoService } from '@/services/belvo.service';
import { BelvoLinkedBanksCard } from '@/components/belvo/BelvoLinkedBanksCard';
import { BelvoConnectCard } from '@/components/belvo/BelvoConnectCard';
import { AuthService } from '@/services/auth.service';
import { Header } from '@/components/common/Header';

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

  const user = AuthService.getUser();

  return (
    <BelvoLayout>
      <Header title="Contas Bancárias" userName="João da Silva" userEmail="joao@email.com" />
      <div className="mt-8">
        <div className="rounded-lg border border-dashed border-purple-300 bg-white p-4 mb-6">
          <p className="text-sm text-gray-500">
            Gerencie suas contas bancárias conectadas através do Belvo
          </p>
        </div>

        <div className="mt-8 grid gap-8">
          <BelvoConnectCard onSuccess={loadAccounts} />
          <BelvoLinkedBanksCard
            accounts={accounts}
            isLoading={isLoading}
            onUnlink={() => loadAccounts()}
            userId={user?.id || ''}
          />
        </div>
      </div>
    </BelvoLayout>
  );
}
