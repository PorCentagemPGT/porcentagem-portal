'use client';

import { CategoryLayout } from '@/components/layouts/CategoryLayout';
//import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { Toggle } from '@/components/ui/Toggle';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, Trash } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { MoreVertical, SquarePen } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu'
import { hexToRgba } from '@/utils/hexToRgba';


const userData = {
  name: 'João da Silva',
  email: 'joaosilva@email.com'
};

const categoryData = {
  totalAccounts: 3,
  categories: [
    { 
      id: 1, 
      name: 'Alimentação',
      color: '#2563EB',
      status: 'Ativo' 
    },
    { 
      id: 2, 
      name: 'Games',
      color: '#047857',
      status: 'Ativo' 
    },
    { 
      id: 3, 
      name: 'Casa',
      color: '#A16207',
      status: 'Desativado' 
    }
  ]
};


interface CategoryStatuses {
  [key: number]: boolean;
}

export default function CategoryPage() {
  const [categoryStatuses, setCategoryStatuses] = useState<CategoryStatuses>(() => 
    categoryData.categories.reduce((acc, category) => ({
      ...acc,
      [category.id]: category.status === 'Ativo'
    }), {} as CategoryStatuses)
  );

  const [sortField, setSortField] = useState<'name' | 'status' | null>(null);
const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

const sortedCategories = [...categoryData.categories].sort((a, b) => {
  if (!sortField) return 0;

  const aValue = a[sortField]?.toString().toLowerCase() || '';
  const bValue = b[sortField]?.toString().toLowerCase() || '';

  if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
  if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
  return 0;
});

const handleSort = (field: 'name' | 'status') => {
  if (sortField === field) {
    setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
  } else {
    setSortField(field);
    setSortDirection('asc');
  }
};


  const handleToggle = (categoryId: number) => {
    setCategoryStatuses(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  return (
    //<PrivateRoute>
      <CategoryLayout>
        <Card className="mt-2 shadow rounded-2xl" style={{ backgroundColor: '#169DA0' }}>
  <CardHeader className="px-10 py-6">
    <div className="flex justify-between items-center w-full">
      <CardTitle className="text-base font-semibold text-white">
        Categorias
      </CardTitle>
      <div className="text-right">
        <span className="block text-base text-white">{userData.name}</span>
        <CardDescription className="text-sm text-white">{userData.email}</CardDescription>
      </div>
    </div>
  </CardHeader>
</Card>


        <div className="grid grid-cols-5 gap-8 mt-14">
          <Card className="col-span-4">
  <CardHeader className="px-5 py-5">
    <CardTitle className="text-base text-gray-900">Minhas Categorias</CardTitle>
  </CardHeader>
</Card>

<Card>
  <CardHeader className="px-6 py-5">
    <CardTitle className="text-base text-gray-900">Categorias Cadastradas</CardTitle>
    <CardDescription className="text-3xl font-bold text-gray-900 mt-2">
      {categoryData.totalAccounts}
    </CardDescription>
  </CardHeader>
</Card>

        </div>

        <div className="w-1/5 mt-4">
  <Button variant={"gradient"}>
    Criar nova categoria
  </Button>
</div>

<div className="w-1/5 mt-3">
  <Input
  type="text"
  placeholder="Filter lines..."
// onChange={(e) => setFiltro(e.target.value)}
/>
</div>

        <Card className="mt-8">
  <CardHeader className="px-5 py-5 border-b border-gray-200">
    <div className="grid grid-cols-3 px-4">
      <button
        onClick={() => handleSort("name")}
        className="text-sm font-medium text-gray-500 text-left flex items-center gap-1"
      >
        Categoria
        <ArrowUpDown
          size={14}
          className={`ml-1 ${
            sortField === "name" ? "text-black" : "text-gray-400"
          }`}
        />
      </button>

      <button
        onClick={() => handleSort("status")}
        className="text-sm font-medium text-gray-500 text-center flex items-center justify-center gap-1"
      >
        Status
        <ArrowUpDown
          size={14}
          className={`ml-1 ${
            sortField === "status" ? "text-black" : "text-gray-400"
          }`}
        />
      </button>
    </div>
  </CardHeader>

  <CardContent className="divide-y divide-gray-200">
  {sortedCategories.map((category) => (
    <div
  key={category.id}
  className="grid grid-cols-3 px-4 py-3 items-center"
>
  <div className="flex items-center justify-start">
    <span
      className="text-sm font-medium px-3 py-1 rounded-full"
      style={{
        backgroundColor: hexToRgba(category.color || "#000", 0.2),
        color: category.color || "#000",
      }}
    >
      {category.name}
    </span>
  </div>

  <div className="flex items-center justify-center w-full gap-2 ml-9">
    <div>
      <Toggle
        enabled={categoryStatuses[category.id]}
        onChange={() => handleToggle(category.id)}
      />
    </div>
    <span
      className={`text-sm w-[80px] text-left ${
        categoryStatuses[category.id]
      }`}
    >
      {categoryStatuses[category.id] ? "Ativo" : "Desativado"}
    </span>
  </div>

  <div className="flex items-center justify-end">
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 hover:bg-muted rounded-full">
          <MoreVertical size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => editarCategoria(category.id)}>
          <SquarePen size={14} className="mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => deletarCategoria(category.id)}
          className="text-red-500"
        >
          <Trash size={14} className="mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</div>
  ))}
</CardContent>

</Card>
      </CategoryLayout>
    //</PrivateRoute>
  );
}
