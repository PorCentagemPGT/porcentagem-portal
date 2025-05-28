/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { FiCalendar, FiFilter, FiDownload } from 'react-icons/fi';
import { Header } from '@/components/common/Header';

// Mock data for the charts
const monthlyData = [
  { month: 'Jan', value: 54 },
  { month: 'Fev', value: 195 },
  { month: 'Mar', value: 134 },
  { month: 'Abr', value: 123 },
  { month: 'Mai', value: 143 },
  { month: 'Jun', value: 145 },
  { month: 'Jul', value: 145 },
  { month: 'Ago', value: 165 },
  { month: 'Set', value: 204 },
  { month: 'Out', value: 204 },
  { month: 'Nov', value: 182 },
  { month: 'Dez', value: 0 },
];

const categoryData = [
  { title: 'Título', value: 54 },
  { title: 'Título', value: 134 },
  { title: 'Título', value: 123 },
  { title: 'Título', value: 145 },
  { title: 'Título', value: 145 },
  { title: 'Título', value: 165 },
  { title: 'Título', value: 204 },
  { title: 'Título', value: 204 },
];

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState('Atual');
  const totalGastos = 1540.00;

  // Calculate the maximum value for proper scaling
  const maxCategoryValue = Math.max(...categoryData.map(item => item.value));
  const maxMonthlyValue = Math.max(...monthlyData.map(item => item.value));

  return (
    <PrivateRoute>
      <DashboardLayout>
      <Header title="Dashboard" userName="João da Silva" userEmail="joao@email.com" />
        <div className="mt-8 rounded-lg border border-dashed border-purple-300 bg-white p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Mês {selectedMonth}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-sm text-gray-500">Total de Gastos no mês</p>
                <p className="text-2xl font-bold">R$ {totalGastos.toFixed(2).replace('.', ',')}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Exportar</p>
                <button className="px-3 py-1 bg-black text-white text-sm rounded flex items-center">
                  <FiDownload className="mr-1" size={14} />
                  Exportar Relatório
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Data *</label>
            <div className="relative">
              <input
                type="text"
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm"
                placeholder="Jan 30, 2023 - Feb 30, 2023"
                readOnly
                value="Jan 30, 2023 - Feb 30, 2023"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiCalendar className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria *</label>
            <div className="relative">
              <select className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm appearance-none">
                <option>Risco</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiFilter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Mês *</label>
            <div className="relative">
              <select className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm appearance-none">
                <option>Status</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <FiFilter className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="col-span-1 flex items-end">
            <button className="text-blue-500 text-sm font-medium">Limpar Filtros</button>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left Side - Vertical Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">Valor / Categoria</h3>
              <p className="text-sm text-gray-500">Subtitle</p>
            </div>
            <p className="text-xl font-semibold mb-6">R$ 1540,00</p>
            
            {/* Vertical Bar Chart */}
            <div className="h-64 mt-4">
              <div className="flex h-full items-end">
                {categoryData.map((item, index) => {
                  const heightPercentage = (item.value / maxCategoryValue) * 100;
                  
                  return (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-primary rounded-t"
                        style={{ 
                          height: `${heightPercentage}%`,
                          minHeight: '10px'
                        }}
                      ></div>
                      <span className="text-xs mt-2">{item.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side - Horizontal Bar Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">Valor / Mês</h3>
              <p className="text-sm text-gray-500">Subtitle</p>
            </div>
            <p className="text-xl font-semibold mb-6">R$ 1540,00</p>
            
            {/* Horizontal Bar Chart */}
            <div className="space-y-2 mt-4">
              {monthlyData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-12 text-xs">{item.month}</div>
                  <div className="flex-1 ml-2">
                    <div className="relative">
                      <div 
                        className="bg-primary h-8 rounded-sm flex items-center justify-end pr-2"
                        style={{ width: `${(item.value / maxMonthlyValue) * 100}%` }}
                      >
                        <span className="text-xs text-white">{item.value}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
}
