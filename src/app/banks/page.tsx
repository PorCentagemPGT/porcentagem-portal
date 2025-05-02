'use client';

import { BankLayout } from '@/components/layouts/BankLayout';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { Toggle } from '@/components/ui/Toggle';
import { useState } from 'react';
import Image from 'next/image';

const userData = {
  name: 'João da Silva',
  email: 'joaosilva@email.com'
};

const bankData = {
  totalAccounts: 3,
  period: 'Mês Atual',
  banks: [
    { 
      id: 1, 
      name: 'Nubank',
      logo: '/bank-logos/nu.png',
      status: 'Ativo' 
    },
    { 
      id: 2, 
      name: 'Banco do Brasil',
      logo: '/bank-logos/bb.png',
      status: 'Ativo' 
    },
    { 
      id: 3, 
      name: 'Itaú',
      logo: '/bank-logos/ita.png',
      status: 'Inativo' 
    }
  ]
};


interface BankStatuses {
  [key: number]: boolean;
}

export default function BankPage() {
  const [bankStatuses, setBankStatuses] = useState<BankStatuses>(() => 
    bankData.banks.reduce((acc, bank) => ({
      ...acc,
      [bank.id]: bank.status === 'Ativo'
    }), {} as BankStatuses)
  );

  const handleToggle = (bankId: number) => {
    setBankStatuses(prev => ({
      ...prev,
      [bankId]: !prev[bankId]
    }));
  };

  return (
    <PrivateRoute>
      <BankLayout>
        <div className="rounded-2xl bg-white shadow mt-2">
          <div className="px-40 py-3 sm:p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Bancos
              </h2>
              <div className="flex flex-col mr-20">
                <span className="text-base text-gray-600">{userData.name}</span>
                <span className="text-sm text-gray-500">{userData.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-8 mt-14">
          <div className="col-span-4 rounded-2xl bg-white shadow border border-gray-200">
            <div className="px-5 py-5">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Meus Bancos
              </h2>
              <p className="text-base text-gray-900">
                {bankData.period}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white shadow border border-gray-200">
            <div className="px-6 py-5">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Bancos Cadastrados
              </h2>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                {bankData.totalAccounts}
              </h1>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="rounded-2xl bg-white shadow border border-gray-200">
            <div className="px-5 py-5">
              <div className="border-b border-gray-200 pb-2">
                <div className="grid grid-cols-2 px-4">
                  <span className="text-sm font-medium text-gray-500">Banco</span>
                  <span className="text-sm font-medium text-gray-500 text-center">Status</span>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {bankData.banks.map((bank) => (
                  <div key={bank.id} className="grid grid-cols-2 px-4 py-3 items-center">
                    <div className="flex items-center">
                      <div className="relative h-8 w-32">
                        <Image
                          src={bank.logo}
                          alt={bank.name}
                          fill
                          className="object-contain object-left"
                          sizes="(max-width: 128px) 100vw, 128px"
                          priority
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <span className={`text-sm ${bankStatuses[bank.id] ? 'text-green-600' : 'text-red-600'}`}>
                        {bankStatuses[bank.id] ? 'Ativo' : 'Inativo'}
                      </span>
                      <Toggle enabled={bankStatuses[bank.id]} onChange={() => handleToggle(bank.id)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BankLayout>
    </PrivateRoute>
  );
}
