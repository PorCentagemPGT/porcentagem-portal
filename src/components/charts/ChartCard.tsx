'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface ChartCardProps {
  title: string;
  subtitle: string;
  value: string;
  children: React.ReactNode;
}

export function ChartCard({ title, subtitle, value, children }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        <CardDescription>{subtitle}</CardDescription>
        <p className="text-xl font-semibold text-gray-900">{value}</p>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}
