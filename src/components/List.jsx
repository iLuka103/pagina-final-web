import { Badge } from './ui/badge.jsx';
import { Button } from './ui/button.jsx';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog.jsx';

export function CategoryList({ 
  onClose, 
  categoryName, 
  products, 
  onAddToCart, 
  open,
  onProductClick
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">{categoryName}</DialogTitle>
        </DialogHeader>
        
        {products.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            No hay productos en esta categoría
          </div>
        ) : (
          <div className="space-y-3">
            {products.map((product) => {
              const displayPrice = product.isPromo && product.promoPrice 
                ? product.promoPrice 
                : product.price;
              
              return (
                <div 
                  key={product.id} 
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                  onClick={() => onProductClick && onProductClick(product)}
                >
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                    <img 
                      src={product.image || "https://placehold.co/150?text=Producto"} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <h3 className="font-medium text-gray-900 group-hover:text-amber-700 transition-colors">
                        {product.name}
                      </h3>
                      {product.isPromo && (
                        <Badge variant="destructive" className="text-xs">
                          Oferta
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <div className="font-medium text-gray-900">${displayPrice.toFixed(2)}</div>
                      {product.isPromo && (
                        <div className="text-xs text-gray-500 line-through">
                          ${product.price.toFixed(2)}
                        </div>
                      )}
                    </div>
                    <Button 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation(); 
                        onAddToCart(product);
                      }}
                      className="bg-amber-900 hover:bg-amber-800 text-white shadow-sm"
                    >
                      Agregar
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}