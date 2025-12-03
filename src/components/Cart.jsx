import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';

export function CartPopup({ 
  onClose, 
  open, 
  onUpdateQuantity, 
  cartItems = [], 
  onClearCart 
}) {
  const total = cartItems.reduce((sum, item) => {
    const price = item.product.isPromo && item.product.promoPrice 
      ? item.product.promoPrice 
      : item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  const handleCheckout = () => {
    alert('Compra realizada con éxito! Total: $' + total.toFixed(2));
    onClearCart();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-amber-900">
            Carrito de Compras
          </DialogTitle>
        </DialogHeader>
        
        {cartItems.length === 0 ? (
          <div className="py-12 text-center text-gray-500 flex flex-col items-center">
            <p>Tu carrito está vacío</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-4">
              {cartItems.map((item) => {
                const price = item.product.isPromo && item.product.promoPrice 
                  ? item.product.promoPrice 
                  : item.product.price;
                const itemTotal = price * item.quantity;
                
                return (
                  <div key={item.product.id} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg shadow-sm bg-gray-50">
                    <div className="flex items-center gap-1">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="h-8 w-8"
                      >
                        -
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="h-8 w-8"
                      >
                        +
                      </Button>
                    </div>
                    
                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 border border-gray-200">
                      <img 
                        src={item.product.image} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate text-gray-900">{item.product.name}</h4>
                      <p className="text-sm text-gray-500 line-clamp-1">{item.product.description}</p>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-amber-900">${itemTotal.toFixed(2)}</div>
                      {item.product.isPromo && (
                        <div className="text-xs text-green-600 font-medium">
                          Oferta
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-medium text-gray-700">Total a pagar:</span>
                <span className="text-2xl font-bold text-amber-900">${total.toFixed(2)}</span>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={onClearCart}
                  className="flex-1 gap-2 border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
                >
                  Vaciar
                </Button>
                <Button 
                  onClick={handleCheckout}
                  className="flex-[2] text-lg bg-amber-900 hover:bg-amber-800 text-white"
                >
                  Finalizar Compra
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}