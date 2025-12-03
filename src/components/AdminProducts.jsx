import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import { ProductFormDialog } from './ProductFormDialog';
import { ConfirmDialog } from './ConfirmDialog';
import { Pencil, Trash2, Plus, ArrowLeft } from 'lucide-react';

export function AdminProducts({ products, categories, onAdd, onEdit, onDelete }) {
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleSave = (data) => {
    currentProduct ? onEdit(data) : onAdd({ ...data, id: Date.now().toString() });
  };

  const handleDelete = () => {
    if (currentProduct) onDelete(currentProduct.id);
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
             Gestión de Productos
           </h1>
        </div>
        <Button onClick={() => { setCurrentProduct(null); setIsFormOpen(true); }} className="bg-amber-900 hover:bg-amber-800 text-white gap-2">
          <Plus className="h-4 w-4" /> Nuevo Producto
        </Button>
      </div>
      
      <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Imagen</TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                   <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden">
                     <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                   </div>
                </TableCell>
                <TableCell className="font-medium">{p.name}</TableCell>
                <TableCell>
                   <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800">
                     {categories?.find(c => c.id === p.category)?.name || p.category}
                   </span>
                </TableCell>
                <TableCell className="text-right font-bold">${p.price}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" onClick={() => { setCurrentProduct(p); setIsFormOpen(true); }}>
                      <Pencil className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => { setCurrentProduct(p); setIsDeleteOpen(true); }}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <ProductFormDialog 
        open={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        productToEdit={currentProduct} 
        categories={categories}
        onSave={handleSave} 
      />
      
      <ConfirmDialog 
        open={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)} 
        onConfirm={handleDelete} 
        title="¿Borrar producto?" 
        description={`Se eliminará "${currentProduct?.name}".`} 
        confirmText="Eliminar" 
        isDestructive 
      />
    </div>
  );
}