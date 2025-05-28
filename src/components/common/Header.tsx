'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

interface HeaderProps {
  title: string;
  userName: string;
  userEmail: string;
  backgroundColor?: string;
}

export function Header({ 
  title, 
  userName, 
  userEmail, 
  backgroundColor = '#169DA0' 
}: HeaderProps) {
  return (
    <Card className="mt-2 shadow rounded-2xl" style={{ backgroundColor }}>
      <CardHeader className="px-10 py-6">
        <div className="flex justify-between items-center w-full">
          <CardTitle className="text-base font-semibold text-white">
            {title}
          </CardTitle>
          <div className="text-right">
            <span className="block text-base text-white">{userName}</span>
            <CardDescription className="text-sm text-white">
              {userEmail}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
