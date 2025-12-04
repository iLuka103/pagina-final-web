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
    currentProduct ? onEdit(data) : onAdd(data);
  };

  const handleDelete = () => {
    if (currentProduct) onDelete(currentProduct.id);
  };

  const getImageUrl = (p) => {
    if (p.picture && !p.picture.includes('placehold')) return p.picture;

    if (Array.isArray(p.images) && p.images.length > 0) {
       const img = p.images[0];
       if (img && !img.includes('placehold')) return img;
    }

    return p.image || "https://placehold.co/100?text=IMG";
  };

  const getCategoryName = (p) => {
    const catId = p.category_id || p.categoryId || p.category?.id || p.category;
    
    const category = categories?.find(c => String(c.id) === String(catId));
    
    return category?.title || category?.name || "Sin categoría";
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
              <TableHead>Título</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Precio</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                   <div className="w-12 h-12 rounded bg-gray-100 overflow-hidden border border-gray-200">
                     <img 
                        src={getImageUrl(p)} 
                        alt={p.title} 
                        className="w-full h-full object-cover" 
                        onError={(e) => e.target.src = "https://placehold.co/100?text=Error"}
                     />
                   </div>
                </TableCell>
                <TableCell className="font-medium">{p.title || p.name}</TableCell>
                <TableCell>
                   <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800 border border-amber-100">
                     {getCategoryName(p)}
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
        description={`Se eliminará "${currentProduct?.title || currentProduct?.name}".`} 
        confirmText="Eliminar" 
        isDestructive 
      />
    </div>
  );
}