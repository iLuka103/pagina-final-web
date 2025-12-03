import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export function ProductCard({ 
  onClose, 
  product, 
  onAddToCart, 
  open 
}) {
  if (!product) return null;

  const displayPrice = product.isPromo && product.promoPrice 
    ? product.promoPrice 
    : product.price;

  const handleAddToCart = () => {
    onAddToCart(product);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-amber-900">
            {product.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-100">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex gap-2">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                {product.category}
              </Badge>
              
              {product.isPromo && (
                <Badge variant="destructive">
                  Oferta
                </Badge>
              )}
            </div>
            
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <div className="text-2xl font-bold text-amber-900">
                ${displayPrice.toFixed(2)}
              </div>
              {product.isPromo && product.promoPrice && (
                <div className="text-sm text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </div>
              )}
            </div>
            <Button 
              onClick={handleAddToCart} 
              className="bg-amber-900 hover:bg-amber-800 text-white"
            >
              Agregar al Carrito
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}