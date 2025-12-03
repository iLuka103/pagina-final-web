import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function ProductFormDialog({ open, onClose, onSave, productToEdit, categories = [] }) {
  const initialFormState = {
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (open) {
      setFormData(productToEdit || initialFormState);
    }
  }, [productToEdit, open]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, price: parseFloat(formData.price) });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-amber-900 text-xl font-bold">
            {productToEdit ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre</Label>
            <Input id="name" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="price">Precio ($)</Label>
            <Input id="price" type="number" min="0" step="0.01" value={formData.price} onChange={handleChange} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Categoría</Label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none focus-visible:ring-1 focus-visible:ring-amber-900 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Input id="description" value={formData.description} onChange={handleChange} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">URL de Imagen</Label>
            <Input id="image" placeholder="https://..." value={formData.image} onChange={handleChange} />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="bg-amber-900 hover:bg-amber-800 text-white">
              {productToEdit ? 'Guardar Cambios' : 'Crear Producto'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}