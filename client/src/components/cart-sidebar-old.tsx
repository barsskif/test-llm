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
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({
        title: "Order placed successfully!",
        description: "Thank you for your purchase. We'll contact you soon.",
      });
    },
    onError: () => {
      toast({
        title: "Order failed",
        description: "Please try again or contact us for assistance.",
        variant: "destructive",
      });
    },
  });

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart first.",
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
        title: "Missing information",
        description: "Please fill in all required fields.",
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
      {isOpen && <div className={`${styles.overlay} ${!isOpen ? styles.hidden : ''}`} onClick={onClose} />}
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
            <div className="flex-1 overflow-y-auto py-4">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Ваша корзина пуста</p>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <img
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-medium text-sm truncate">{item.product.name}</h5>
                        <p className="text-chocolate font-semibold text-sm">
                          {formatPrice(item.product.price)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.product.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold text-dark-brown">Итого:</span>
                <span className="text-xl font-bold text-warm-gold">
                  {formatPrice(total)}
                </span>
              </div>
              <Button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full bg-warm-gold hover:bg-deep-gold text-dark-brown font-semibold transition-all shadow-warm hover:shadow-warm-lg"
              >
                Оформить заказ
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4">
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <Label htmlFor="customerName">Полное имя *</Label>
                  <Input
                    id="customerName"
                    value={formData.customerName}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="customerEmail">Email *</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={formData.customerEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerEmail: e.target.value }))}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="customerPhone">Телефон</Label>
                  <Input
                    id="customerPhone"
                    type="tel"
                    value={formData.customerPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, customerPhone: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label htmlFor="shippingAddress">Адрес доставки *</Label>
                  <Textarea
                    id="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData(prev => ({ ...prev, shippingAddress: e.target.value }))}
                    required
                    rows={3}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <h4 className="font-semibold">Сводка заказа</h4>
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span>{item.product.name} x {item.quantity}</span>
                      <span>{formatPrice(item.product.price * item.quantity)}</span>
                    </div>
                  ))}
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Итого:</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
              </form>
            </div>

            <div className="border-t pt-4 space-y-2">
              <Button
                onClick={handleSubmitOrder}
                disabled={createOrderMutation.isPending}
                className="w-full bg-warm-gold hover:bg-deep-gold text-dark-brown font-semibold transition-all shadow-warm hover:shadow-warm-lg"
              >
                {createOrderMutation.isPending ? "Обработка..." : "Разместить заказ"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowCheckout(false)}
                className="w-full"
              >
                Назад в корзину
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
