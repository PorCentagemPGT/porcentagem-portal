'use client';

import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface BarData {
  month: string;
  value: number;
}

interface HorizontalBarChartProps {
  data: BarData[];
}

export function HorizontalBarChart({ data }: HorizontalBarChartProps) {
  const categories = data.map(item => item.month);
  const values = data.map(item => item.value);

  const options: ApexOptions = {
    chart: {
      type: 'bar' as const,
      toolbar: {
        show: false
      }
    },
    legend: {
      show: false
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        barHeight: '70%',
        distributed: true
      }
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'start',
      style: {
        colors: ['#fff']
      },
      formatter: function (val: string) {
        return `R$ ${parseFloat(val).toFixed(2)}`;
      },
      offsetX: 8
    },
    series: [{
      data: values
    }],
    xaxis: {
      categories: categories,
      labels: {
        formatter: function (val: string) {
          return `R$ ${parseFloat(val).toFixed(2)}`;
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#666',
          fontSize: '12px'
        }
      }
    },
    colors: ['#2563eb'], // Cor azul forte
    grid: {
      show: false
    },
    tooltip: {
      enabled: true,
      x: {
        show: false
      },
      y: {
        title: {
          formatter: () => 'Valor:'
        },
        formatter: (val: string) => `R$ ${parseFloat(val).toFixed(2)}`
      }
    }
  };

  return (
    <div className="h-[350px] w-full">
      <Chart
        options={options}
        series={[{
          data: values
        }]}
        type="bar"
        height="100%"
      />
    </div>
  );
}
