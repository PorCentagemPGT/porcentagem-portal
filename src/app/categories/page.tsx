'use client';

import { DashboardLayout } from '@/components/layouts/DashboardLayout';
import { PrivateRoute } from '@/components/auth/PrivateRoute';
import { Toggle } from '@/components/ui/Toggle';
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowUpDown, Trash, MoreVertical, SquarePen, ChevronDown } from 'lucide-react';
import { Header } from '@/components/common/Header';
import {
  Card,
  CardContent,
  // CardDescription,
  CardHeader,
  // CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu'
import { hexToRgba } from '@/utils/hexToRgba';
import { deleteCategory } from '@/http/core/deleteCategory';
import { BaseModal } from '@/components/ui/BaseModal';


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

const colorOptions = [
  { label: 'Azul', value: '#2563EB' },
  { label: 'Verde', value: '#047857' },
  { label: 'Amarelo', value: '#A16207' },
  { label: 'Vermelho', value: '#DC2626' },
];

export default function CategoryPage() {
  const [categoryStatuses, setCategoryStatuses] = useState<CategoryStatuses>(() =>
    categoryData.categories.reduce((acc, category) => ({
      ...acc,
      [category.id]: category.status === 'Ativo'
    }), {} as CategoryStatuses)
  );

  const [sortField, setSortField] = useState<'name' | 'status' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterText, setFilterText] = useState('');

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

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedColorLabel, setSelectedColorLabel] = useState<string | null>("selecione uma cor");

  const handleCreateCategory = () => {
    setEditingCategoryId(null);
    setModalOpen(true);
  };

  const editarCategoria = (id: number) => {
    setEditingCategoryId(id);
    setModalOpen(true);
  };

    const filteredCategories = useMemo(() => {
      return [...categoryData.categories]
        .filter(category =>
          category.name.toLowerCase().includes(filterText.toLowerCase())
        )
        .sort((a, b) => {
          if (!sortField) return 0;
          const aValue = a[sortField]?.toString().toLowerCase() || '';
          const bValue = b[sortField]?.toString().toLowerCase() || '';
          if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
          if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        });
    }, [filterText, sortField, sortDirection]);

  return (
    <PrivateRoute>
      <DashboardLayout>
        <Header
          title="Categorias"
          userName={userData.name}
          userEmail={userData.email}
        />


        {/* <div className="grid grid-cols-5 gap-8 mt-14">
          <Card>
            <CardHeader className="px-6 py-5">
              <CardTitle className="text-base text-gray-900">Categorias Cadastradas</CardTitle>
              <CardDescription className="text-3xl font-bold text-gray-900 mt-2">
                {categoryData.totalAccounts}
              </CardDescription>
            </CardHeader>
          </Card>
        </div> */}

        <div className="w-1/5 mt-14">
          <Button className="w-full" onClick={handleCreateCategory}>
            Criar nova categoria
          </Button>
        </div>

        <div className="w-1/3 mt-14">
            <Input
              type="text"
              placeholder="Filter lines..."
              className="w-full"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>

        <Card className="mt-8">
          <CardHeader className="px-5 py-5 border-b border-gray-200">
            <div className="grid grid-cols-3 px-1">
              <button
                onClick={() => handleSort("name")}
                className="text-sm font-medium text-gray-500 text-left flex items-center gap-1"
              >
                Categoria
                <ArrowUpDown
                  size={14}
                  className={`ml-1 ${sortField === "name" ? "text-black" : "text-gray-400"
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
                  className={`ml-1 ${sortField === "status" ? "text-black" : "text-gray-400"
                    }`}
                />
              </button>
            </div>
          </CardHeader>

          <CardContent className="divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="grid grid-cols-3 py-3 items-center"
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
                    className={`text-sm w-[80px] text-left ${categoryStatuses[category.id]
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
                      <DropdownMenuItem
                        onClick={() => {
                          setTimeout(() => editarCategoria(category.id), 0);
                        }}
                      >
                        <SquarePen size={14} className="mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deleteCategory(category.id)}
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

        <BaseModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          title={editingCategoryId ? "Editar Categoria" : "Cadastrar Nova Categoria"}
          onSave={() => {
            console.log("Salvar categoria com cor:", selectedColor);
            setModalOpen(false);
          }}
        >
          {/* Nome da categoria */}
          <div className="mt-10 w-full">
            <label className="text-sm font-medium text-gray-700">
              Nome da Categoria<span className="text-red-500">*</span>
            </label>
            <Input placeholder="digite..." className="w-full mt-1" />
          </div>

          {/* Dropdown para selecionar cor */}
          <div className="mt-5 w-full">
            <label className="text-sm font-medium text-gray-700">
              Selecione uma cor<span className="text-red-500">*</span>
            </label>
            <div className="mt-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span className={selectedColor === null ? "text-muted-foreground" : ""}>{selectedColorLabel}</span>
                    <ChevronDown className="w-4 h-4 ml-2 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {colorOptions.map((color) => (
                    <DropdownMenuItem
                      key={color.value}
                      onSelect={() => {
                        setSelectedColor(color.value);
                        setSelectedColorLabel(color.label);
                      }}
                    >
                      {color.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </BaseModal>

      </DashboardLayout>
    </PrivateRoute>
  );
}
