import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export function ProductCarousel({ onProductClick, products }) {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);
  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + itemsPerPage < products.length;

  const handleNext = () => {
    if (canGoForward) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (canGoBack) {
      setStartIndex(startIndex - 1);
    }
  };

  if (products.length === 0) {
    return null; 
  }

  return (
    <div className="bg-amber-50 rounded-3xl p-6 my-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-amber-900">Ofertas Destacadas</h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            disabled={!canGoBack}
            className="rounded-full bg-white border-amber-200 text-amber-900 hover:bg-amber-100 disabled:opacity-50"
          >
            &lt;
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            disabled={!canGoForward}
            className="rounded-full bg-white border-amber-200 text-amber-900 hover:bg-amber-100 disabled:opacity-50"
          >
            &gt;
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {visibleProducts.map((product) => {
          const displayPrice = product.isPromo && product.promoPrice 
            ? product.promoPrice 
            : product.price;
          
          return (
            <div
              key={product.id}
              onClick={() => onProductClick(product)}
              className="cursor-pointer group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-3 relative bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.isPromo && (
                  <Badge 
                    variant="destructive" 
                    className="absolute top-2 right-2 shadow-sm"
                  >
                    Oferta
                  </Badge>
                )}
              </div>
              
              <div className="text-center space-y-1">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-amber-700 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-bold text-lg text-amber-900">
                    ${displayPrice.toFixed(2)}
                  </span>
                  {product.isPromo && product.promoPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}