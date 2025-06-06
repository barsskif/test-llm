import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import styles from "./cart-sidebar.module.css";

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CheckoutFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    shippingAddress: "",
  });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const createOrderMutation = useMutation({
    mutationFn: async (orderData: any) => {
      const response = await apiRequest("POST", "/api/orders", orderData);
      return response.json();
    },
    onSuccess: () => {
      clearCart();
      setShowCheckout(false);
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
        shippingAddress: "",
      });
      onClose();
      queryClient.invalidateQueries({ queryKey: ['/api/orders'] });
      toast({
        title: "Заказ оформлен",
        description: "Ваш заказ успешно оформлен! Мы свяжемся с вами в ближайшее время.",
      });
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: "Не удалось оформить заказ. Попробуйте еще раз.",
        variant: "destructive",
      });
    },
  });

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Корзина пуста",
        description: "Добавьте товары в корзину перед оформлением заказа.",
        variant: "destructive",
      });
      return;
    }
    setShowCheckout(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customerName || !formData.customerEmail || !formData.shippingAddress) {
      toast({
        title: "Неполная информация",
        description: "Пожалуйста, заполните все обязательные поля.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      order: {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        shippingAddress: formData.shippingAddress,
        total: getTotalPrice(),
        status: "pending",
      },
      items: items.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      })),
    };

    createOrderMutation.mutate(orderData);
  };

  const total = getTotalPrice();

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {showCheckout ? "Оформление заказа" : "Корзина покупок"}
          </h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X className={styles.closeIcon} />
          </button>
        </div>

        {!showCheckout ? (
          <>
            <div className={styles.content}>
              {items.length === 0 ? (
                <div className={styles.emptyState}>
                  <p className={styles.emptyText}>Ваша корзина пуста</p>
                </div>
              ) : (
                <div className={styles.itemsList}>
                  {items.map((item) => (
                    <div key={item.product.id} className={styles.item}>
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className={styles.itemImage}
                      />
                      <div className={styles.itemDetails}>
                        <h5 className={styles.itemName}>{item.product.name}</h5>
                        <p className={styles.itemPrice}>
                          {formatPrice(item.product.price)}
                        </p>
                        <div className={styles.quantityControls}>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className={styles.quantityButton}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className={styles.quantity}>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            className={styles.quantityButton}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className={styles.removeButton}
                      >
                        <Trash2 className={styles.removeIcon} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className={styles.checkoutSection}>
                <div className={styles.total}>
                  <span>Итого:</span>
                  <span className={styles.totalPrice}>{formatPrice(total)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className={styles.checkoutButton}
                >
                  Оформить заказ
                </button>
              </div>
            )}
          </>
        ) : (
          <div className={styles.content}>
            <form onSubmit={handleSubmitOrder} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="customerName" className={styles.label}>
                  Имя *
                </label>
                <input
                  id="customerName"
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="customerEmail" className={styles.label}>
                  Email *
                </label>
                <input
                  id="customerEmail"
                  type="email"
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="customerPhone" className={styles.label}>
                  Телефон
                </label>
                <input
                  id="customerPhone"
                  type="tel"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="shippingAddress" className={styles.label}>
                  Адрес доставки *
                </label>
                <textarea
                  id="shippingAddress"
                  value={formData.shippingAddress}
                  onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                  className={styles.textarea}
                  required
                />
              </div>

              <div className={styles.total}>
                <span>Итого к оплате:</span>
                <span className={styles.totalPrice}>{formatPrice(total)}</span>
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="submit"
                  disabled={createOrderMutation.isPending}
                  className={styles.submitButton}
                >
                  {createOrderMutation.isPending ? "Оформление..." : "Подтвердить заказ"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCheckout(false)}
                  className={styles.cancelButton}
                >
                  Назад
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}