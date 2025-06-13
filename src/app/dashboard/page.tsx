/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { Header } from '@/components/common/Header';
import { ChartCard } from '@/components/charts/ChartCard';
import { VerticalBarChart } from '@/components/charts/VerticalBarChart';
import { HorizontalBarChart } from '@/components/charts/HorizontalBarChart';
import { FiCalendar, FiFilter, FiDownload } from 'react-icons/fi';

// Mock data for the charts
import { monthlyData, categoryData } from '@/data/mockData';

export default function DashboardPage() {
  const [selectedMonth, setSelectedMonth] = useState('Atual');
  const totalGastos = 5250.80;

  const handleDownloadReport = async () => {
    try {
      const response = await fetch('/mock-transactions.csv');
      const csvContent = await response.text();
      
      // Criar um blob com o conteúdo CSV
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      
      // Criar URL temporária para o blob
      const url = window.URL.createObjectURL(blob);
      
      // Criar elemento <a> temporário
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transacoes-${new Date().toISOString().split('T')[0]}.csv`);
      
      // Adicionar ao documento, clicar e remover
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Limpar a URL temporária
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar o relatório:', error);
      // Aqui você pode adicionar uma notificação de erro para o usuário
    }
  };

  // Calculate the maximum value for proper scaling
  const maxCategoryValue = Math.max(...categoryData.map(item => item.value));
  const maxMonthlyValue = Math.max(...monthlyData.map(item => item.value));

  return (
    <PrivateRoute>
      <DashboardLayout>
      <Header title="Dashboard" userName="Usuário Teste" userEmail="usuario@email.com" />
        <div className="mt-8 rounded-lg border border-dashed border-purple-300 bg-white p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
            <div>
                <p className="text-sm text-gray-500">Total de Gastos</p>
                <p className="text-2xl font-bold">R$ {totalGastos.toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              
              <div>
                <p className="text-sm text-gray-500 mb-2">Exportar</p>
                <button 
                  onClick={handleDownloadReport}
                  className="px-3 py-1 bg-black text-white text-sm rounded flex items-center hover:bg-gray-800 transition-colors"
                >
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
                placeholder="Jan 31, 2024 - Feb 28, 2024"
                readOnly
                value="Jan 31, 2024 - Feb 28, 2024"
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
          <ChartCard
            title="Valor / Categoria"
            subtitle="Distribuição de gastos por categoria"
            value={`R$ ${categoryData.reduce((sum, item) => sum + item.value, 0).toFixed(2)}`}
          >
            <VerticalBarChart data={categoryData} />
          </ChartCard>

          {/* Right Side - Horizontal Bar Chart */}
          <ChartCard
            title="Valor / Mês"
            subtitle="Distribuição de gastos por mês"
            value={`R$ ${monthlyData.reduce((sum, item) => sum + item.value, 0).toFixed(2)}`}
          >
            <HorizontalBarChart data={monthlyData} />
          </ChartCard>
        </div>
      </DashboardLayout>
    </PrivateRoute>
  );
}
