import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { CategoryFormDialog } from './CategoryFormDialog';
import { ConfirmDialog } from './ConfirmDialog';
import { Pencil, Trash2, Plus, ArrowLeft } from 'lucide-react';

export function AdminCategories({ categories, onAdd, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleSave = (data) => {
    currentCategory ? onEdit(data) : onAdd(data);
  };

  const handleDelete = () => {
    if (currentCategory) {
      onDelete(currentCategory.id);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 bg-white/90 backdrop-blur-md rounded-xl my-8 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
           <Button variant="ghost" onClick={() => navigate('/admin')}>
             <ArrowLeft className="h-4 w-4 mr-2" /> Volver
           </Button>
           <h1 
             className="text-3xl font-bold text-amber-900"
             style={{ textShadow: '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff' }}
           >
             Categorías
           </h1>
        </div>
        <Button onClick={() => { setCurrentCategory(null); setIsFormOpen(true); }} className="bg-amber-900 hover:bg-amber-800 text-white gap-2">
          <Plus className="h-4 w-4" /> Nueva Categoría
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead>ID</TableHead>
              <TableHead>Título</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell className="font-medium">{cat.id}</TableCell>
                
                <TableCell>{cat.title}</TableCell>
                
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => { setCurrentCategory(cat); setIsFormOpen(true); }}>
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => { setCurrentCategory(cat); setIsDeleteOpen(true); }}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <CategoryFormDialog 
        open={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        categoryToEdit={currentCategory} 
        onSave={handleSave} 
      />
      
      <ConfirmDialog 
        open={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDelete} 
        title="¿Borrar categoría?" 
        description={`Se eliminará la categoría "${currentCategory?.title}".`} 
        confirmText="Eliminar" 
        isDestructive 
      />
    </div>
  );
}