import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function CategoryFormDialog({ open, onClose, onSave, categoryToEdit }) {
  const initialFormState = { id: '', name: '', image: '' };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (open) {
      setFormData(categoryToEdit || initialFormState);
    }
  }, [categoryToEdit, open]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-amber-900 text-xl font-bold">
            {categoryToEdit ? 'Editar Categoría' : 'Nueva Categoría'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="id">ID (Slug)</Label>
            <Input 
              id="id" 
              value={formData.id} 
              onChange={handleChange} 
              required 
              disabled={!!categoryToEdit} 
              placeholder="ej: bebidas-calientes" 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="name">Nombre Visible</Label>
            <Input 
              id="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="ej: Bebidas Calientes" 
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">URL Imagen</Label>
            <Input 
              id="image" 
              value={formData.image} 
              onChange={handleChange} 
              placeholder="https://..." 
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-amber-900 hover:bg-amber-800 text-white">
              Guardar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}