'use client';

import { BelvoConnectButton } from './BelvoConnectButton';
import { Building2 } from 'lucide-react';

interface BelvoConnectCardProps {
  onSuccess?: () => void;
}

export function BelvoConnectCard({ onSuccess }: BelvoConnectCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow w-full">
      <div className="p-5">
        <div className="flex items-center w-full">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div id="belvo"></div>
          <div className="ml-5 w-0 flex-1">
            <h3 className="truncate text-sm font-medium text-gray-900">
              Conectar Conta Bancária
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Conecte suas contas bancárias de forma segura para começar a gerenciar suas finanças.
            </p>
            <div className="mt-4">
              <BelvoConnectButton onSuccess={onSuccess} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
