import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    addItem(product);
    
    // Show feedback for 1 second
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <Card className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <img 
        src={product.imageUrl} 
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <CardContent className="p-4">
        <h4 className="text-lg font-playfair font-semibold text-dark-brown mb-2">
          {product.name}
        </h4>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-chocolate">
            {formatPrice(product.price)}
          </span>
          <Button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
              isAdding 
                ? 'bg-green-500 hover:bg-green-500 text-white' 
                : 'bg-goldenrod hover:bg-dark-goldenrod text-dark-brown'
            }`}
          >
            {isAdding ? 'Added!' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
