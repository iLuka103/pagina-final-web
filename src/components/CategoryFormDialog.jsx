import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function CategoryFormDialog({ open, onClose, onSave, categoryToEdit }) {
  const initialFormState = { id: '', title: '', description: '', image: '' };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (open) {
      if (categoryToEdit) {
        let cleanImage = '';
        if (Array.isArray(categoryToEdit.images) && categoryToEdit.images.length > 0) {
           cleanImage = categoryToEdit.images[0];
        } else if (categoryToEdit.image) {
           cleanImage = categoryToEdit.image;
        } else if (categoryToEdit.picture) {
           cleanImage = categoryToEdit.picture;
        }

        if (cleanImage && cleanImage.includes('placehold.co')) {
          cleanImage = '';
        }

        setFormData({
          id: categoryToEdit.id || '',
          title: categoryToEdit.title || categoryToEdit.name || '',
          description: categoryToEdit.description || '',
          image: cleanImage
        });
      } else {
        setFormData(initialFormState);
      }
    }
  }, [categoryToEdit, open]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      name: formData.title,
      image: formData.image 
    };
    onSave(payload);
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
              disabled={!!categoryToEdit} 
              placeholder="ej: bebidas-calientes"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="title">Título</Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              placeholder="ej: Bebidas Calientes"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Input 
              id="description" 
              value={formData.description} 
              onChange={handleChange} 
              required 
              placeholder="Descripción breve de la categoría"
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
            {formData.image && !formData.image.includes('placehold.co') && (
               <div className="mt-2 w-full h-32 rounded border overflow-hidden bg-gray-100">
                  <img src={formData.image} alt="Vista previa" className="w-full h-full object-cover" />
               </div>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
            <Button type="submit" className="bg-amber-900 hover:bg-amber-800 text-white">Guardar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}