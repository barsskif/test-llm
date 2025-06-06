import type { Product } from "@shared/schema";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import styles from "./product-card.module.css";

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
    <div className={styles.card}>
      <img 
        src={product.imageUrl} 
        alt={product.name}
        className={styles.image}
      />
      <div className={styles.content}>
        <h4 className={styles.title}>
          {product.name}
        </h4>
        <p className={styles.description}>
          {product.description}
        </p>
        <div className={styles.footer}>
          <span className={styles.price}>
            {formatPrice(product.price)}
          </span>
          <button 
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`${styles.button} ${isAdding ? styles.added : ''}`}
          >
            {isAdding ? 'Добавлено!' : 'В корзину'}
          </button>
        </div>
      </div>
    </div>
  );
}
