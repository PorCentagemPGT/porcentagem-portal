'use client';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { BelvoConnectCard } from '@/components/belvo/BelvoConnectCard';

export default function DashboardPage() {
  return (
    <PrivateRoute>
      <DashboardLayout>
        <div className="rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Bem-vindo ao PorCentagem
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Aqui você poderá gerenciar suas finanças de forma simples e eficiente.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1 */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                    💰
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      Saldo Total
                    </dt>
                    <dd className="text-lg font-semibold text-gray-900">
                      R$ 0,00
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    📈
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      Receitas do Mês
                    </dt>
                    <dd className="text-lg font-semibold text-green-600">
                      R$ 0,00
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                    📉
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="truncate text-sm font-medium text-gray-500">
                      Despesas do Mês
                    </dt>
                    <dd className="text-lg font-semibold text-red-600">
                      R$ 0,00
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Belvo Connect Card */}
          <BelvoConnectCard />
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
}
