'use client';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { useState } from 'react';

type SortDirection = 'asc' | 'desc' | null;
type SortField = 'valor' | 'categoria' | 'pagamento' | 'local' | 'dataHora' | null;

interface Transaction {
  valor: number;
  categoria: string;
  pagamento: string;
  local: string;
  dataHora: string;
}

export default function HomePage() {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { valor: 10.00, categoria: 'Alimentação', pagamento: 'Table item title', local: 'Oxxo', dataHora: '12/05/2024 15:40' },
    { valor: 50.00, categoria: 'Games', pagamento: 'Table item title', local: 'PS Store', dataHora: '10/05/2024 12:40' },
    { valor: 110.00, categoria: 'Alimentação', pagamento: 'Table item title', local: 'Oxxo', dataHora: '08/05/2024 15:00' },
    { valor: 30.00, categoria: 'Casa', pagamento: 'Table item title', local: 'Enel', dataHora: '08/05/2024 14:00' },
    { valor: 300.00, categoria: 'Games', pagamento: 'Table item title', local: 'PS Store', dataHora: '03/05/2024 18:00' },
  ]);

  const handleSort = (field: SortField) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    const newDirection = isAsc ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);

    const sortedTransactions = [...transactions].sort((a, b) => {
      let comparison = 0;
      if (field === 'valor') {
        comparison = a.valor - b.valor;
      } else if (field === 'dataHora') {
        comparison = new Date(a.dataHora.split(' ')[0].split('/').reverse().join('-')).getTime() -
                    new Date(b.dataHora.split(' ')[0].split('/').reverse().join('-')).getTime();
      } else if (field) {
        comparison = a[field].localeCompare(b[field]);
      }
      return newDirection === 'asc' ? comparison : -comparison;
    });

    setTransactions(sortedTransactions);
  };

  const getSortIcon = (field: SortField) => {
    const isActive = sortField === field;
    const upIconClasses = `w-3 h-3 ${isActive && sortDirection === 'asc' ? 'text-indigo-600 fill-current' : 'text-gray-400'}`;
    const downIconClasses = `w-3 h-3 ${isActive && sortDirection === 'desc' ? 'text-indigo-600 fill-current' : 'text-gray-400'}`;

    return (
      <div className="flex flex-col gap-[2px]">
        <svg className={upIconClasses} viewBox="0 0 24 24">
          <path d="M12 4l-8 8h16z" />
        </svg>
        <svg className={downIconClasses} viewBox="0 0 24 24">
          <path d="M12 20l-8-8h16z" />
        </svg>
      </div>
    );
  };

  return (
    <PrivateRoute>
      <DashboardLayout>
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Home Section */}
          <div className="bg-white rounded-lg p-6 border border-gray-400">
            <h2 className="text-lg font-medium text-gray-900">Home</h2>
            <p className="text-sm text-gray-500 mt-1">Mês Atual</p>
          </div>

          {/* Stats boxes */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-400">
            <p className="text-sm text-gray-500">Total de Gastos no mês</p>
            <p className="text-2xl font-semibold mt-1">64</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 border border-gray-400">
            <p className="text-sm text-gray-500">Última Compra</p>
            <p className="text-2xl font-semibold mt-1">12/12/2024</p>
          </div>
        </div>

        {/* Bancos e Categorias */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Bancos Cadastrados */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-400">
            <h2 className="text-base font-medium text-gray-900 mb-4">Bancos Cadastrados</h2>
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">nu</span>
              </div>
              <div className="w-12 h-12 bg-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">C6</span>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">itaú</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-400">
            <h2 className="text-base font-medium text-gray-900 mb-4">Categorias</h2>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Alimentação</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Games</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Casa</span>
            </div>
          </div>
        </div>

        {/* Compras Recentes */}
        <div className="mt-6">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-base font-medium text-gray-900">Compras Recentes</h2>
          </div>
          
          <div className="bg-gray-50 rounded-lg border border-gray-400">
            {/* Filter and Columns */}
            <div className="p-4 flex justify-between items-center border-b border-gray-300">
              <input
                type="text"
                placeholder="Filter lines..."
                className="block w-80 rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                Columns
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th scope="col" className="py-3 pl-4 pr-3 text-left text-sm font-medium text-gray-500">
                      <button 
                        onClick={() => handleSort('valor')}
                        className="flex items-center gap-2 hover:text-gray-700"
                      >
                        VALOR
                        {getSortIcon('valor')}
                      </button>
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500">
                      <button 
                        onClick={() => handleSort('categoria')}
                        className="flex items-center gap-2 hover:text-gray-700"
                      >
                        CATEGORIA
                        {getSortIcon('categoria')}
                      </button>
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500">
                      <button 
                        onClick={() => handleSort('pagamento')}
                        className="flex items-center gap-2 hover:text-gray-700"
                      >
                        PAGAMENTO
                        {getSortIcon('pagamento')}
                      </button>
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500">
                      <button 
                        onClick={() => handleSort('local')}
                        className="flex items-center gap-2 hover:text-gray-700"
                      >
                        LOCAL
                        {getSortIcon('local')}
                      </button>
                    </th>
                    <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-500">
                      <button 
                        onClick={() => handleSort('dataHora')}
                        className="flex items-center gap-2 hover:text-gray-700"
                      >
                        DATA E HORA
                        {getSortIcon('dataHora')}
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                        R$ {transaction.valor.toFixed(2)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                          transaction.categoria === 'Alimentação' ? 'bg-blue-100 text-blue-800' :
                          transaction.categoria === 'Games' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.categoria}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {transaction.pagamento}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {transaction.local}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {transaction.dataHora}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end gap-2 p-4 border-t border-gray-300">
              <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Previous</button>
              <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Next</button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
}
