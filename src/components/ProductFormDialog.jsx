import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function ProductFormDialog({ open, onClose, onSave, productToEdit, categories = [] }) {
  const initialFormState = {
    title: '',
    price: '',
    promoPrice: '',
    categoryId: '',
    description: '',
    image: '',
    isPromo: false
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (open) {
      if (productToEdit) {
        let imgUrl = '';
        if (productToEdit.picture) imgUrl = productToEdit.picture;
        else if (Array.isArray(productToEdit.images) && productToEdit.images.length > 0) imgUrl = productToEdit.images[0];
        else if (productToEdit.image) imgUrl = productToEdit.image;

        if (imgUrl && imgUrl.includes('placehold.co')) {
          imgUrl = '';
        }
          
        const catId = productToEdit.category_id || productToEdit.categoryId || productToEdit.category || '';

        setFormData({
          title: productToEdit.title || productToEdit.name || '',
          price: productToEdit.price || '',
          promoPrice: productToEdit.promoPrice || '',
          categoryId: String(catId),
          description: productToEdit.description || '',
          image: imgUrl,
          isPromo: !!productToEdit.isPromo 
        });
      } else {
        setFormData(initialFormState);
      }
    }
  }, [productToEdit, open]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [id]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const regularPrice = parseFloat(formData.price);
    const promotionalPrice = formData.isPromo && formData.promoPrice ? parseFloat(formData.promoPrice) : null;

    const payload = {
      title: formData.title,
      price: regularPrice,
      promoPrice: promotionalPrice,
      description: formData.description,
      categoryId: formData.categoryId, 
      image: formData.image,
      isPromo: formData.isPromo
    };

    if (productToEdit) {
      payload.id = productToEdit.id;
    }

    onSave(payload);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-amber-900 text-xl font-bold">
            {productToEdit ? 'Editar Producto' : 'Nuevo Producto'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título del Producto</Label>
            <Input 
              id="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              placeholder="Ej: Café Expreso"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4 items-start">
            <div className="grid gap-2">
              <Label htmlFor="price" className={formData.isPromo ? "text-gray-500 line-through" : ""}>
                {formData.isPromo ? "Precio Regular ($)" : "Precio ($)"}
              </Label>
              <Input 
                id="price" 
                type="number" 
                min="0" 
                step="0.01" 
                value={formData.price} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="flex items-end h-full pb-1">
              <div className={`flex items-center space-x-2 border p-2 rounded-md w-full transition-colors ${formData.isPromo ? 'bg-amber-100 border-amber-300' : 'bg-gray-50 border-gray-200'}`}>
                <input
                  type="checkbox"
                  id="isPromo"
                  checked={formData.isPromo}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-300 text-amber-900 focus:ring-amber-900 cursor-pointer accent-amber-900"
                />
                <Label htmlFor="isPromo" className="cursor-pointer font-bold text-amber-900 text-sm whitespace-nowrap">
                  ¡En Oferta!
                </Label>
              </div>
            </div>
          </div>

          {formData.isPromo && (
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 animate-in fade-in slide-in-from-top-2">
              <div className="grid gap-2">
                <Label htmlFor="promoPrice" className="text-amber-700 font-bold">
                  Precio Oferta ($)
                </Label>
                <Input 
                  id="promoPrice" 
                  type="number" 
                  min="0" 
                  step="0.01" 
                  value={formData.promoPrice} 
                  onChange={handleChange} 
                  required={formData.isPromo}
                  className="border-amber-200 focus-visible:ring-amber-500 font-bold text-lg"
                  placeholder="0.00"
                />
              </div>
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="categoryId">Categoría</Label>
            <select
              id="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="flex h-9 w-full rounded-md border border-gray-200 bg-transparent px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none focus-visible:ring-1 focus-visible:ring-amber-900 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            >
              <option value="" disabled>Selecciona una categoría</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title || cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descripción</Label>
            <Input id="description" value={formData.description} onChange={handleChange} placeholder="Breve descripción..." />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">URL de Imagen</Label>
            <Input id="image" placeholder="https://..." value={formData.image} onChange={handleChange} />
            {formData.image && !formData.image.includes('placehold.co') && (
               <div className="mt-2 w-full h-32 rounded border overflow-hidden bg-gray-100">
                  <img src={formData.image} alt="Vista previa" className="w-full h-full object-cover" />
               </div>
            )}
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