'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface BarData {
  title: string;
  value: number;
}

interface VerticalBarChartProps {
  data: BarData[];
}

export function VerticalBarChart({ data }: VerticalBarChartProps) {
  // Ordena os dados do maior para o menor valor
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  const options: ApexOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        dataLabels: {
          position: 'top'
        },
        distributed: true // Habilita cores diferentes para cada barra
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return `R$ ${val.toFixed(2)}`;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ['#666']
      }
    },
    xaxis: {
      categories: sortedData.map(item => item.title),
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px'
        }
      }
    },
    yaxis: {
      labels: {
        formatter: function (val: number) {
          return `R$ ${val.toFixed(0)}`;
        },
        style: {
          colors: '#666',
          fontSize: '12px'
        }
      }
    },
    colors: ['#FDF9C9', '#DEE9FC', '#E2FBE8'], // Cores específicas para Casa, Alimentação e Games
    grid: {
      borderColor: '#f3f4f6',
      strokeDashArray: 4
    },
    tooltip: {
      y: {
        formatter: function(val: number) {
          return `R$ ${val.toFixed(2)}`;
        }
      }
    }
  };

  const series = [{
    name: 'Valor',
    data: sortedData.map(item => item.value)
  }];

  return (
    <div className="h-[300px] w-full">
      <Chart
        options={options}
        series={series}
        type="bar"
        height="100%"
      />
    </div>
  );
}
