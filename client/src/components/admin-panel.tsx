import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Edit, Trash2, Package, ShoppingBag, BarChart3 } from "lucide-react";
import { ProductForm } from "./product-form";
import { formatPrice, formatDate } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product, OrderWithItems } from "@shared/schema";
import styles from "./admin-panel.module.css";

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState("products");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: products = [], isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: orders = [], isLoading: ordersLoading } = useQuery<OrderWithItems[]>({
    queryKey: ["/api/orders"],
  });

  const deleteProductMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/products/${id}`);
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
      toast({
        title: "Product deleted",
        description: "The product has been successfully deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateOrderStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiRequest("PATCH", `/api/orders/${id}`, { status });
      if (!response.ok) {
        throw new Error("Failed to update order status");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/orders"] });
      toast({
        title: "Order updated",
        description: "Order status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update order status. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(id);
    }
  };

  const handleAddProduct = () => {
    setEditingProduct(undefined);
    setShowProductForm(true);
  };

  const handleCloseForm = () => {
    setShowProductForm(false);
    setEditingProduct(undefined);
  };

  const getBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return styles.badgePending;
      case "processing":
        return styles.badgeProcessing;
      case "shipped":
        return styles.badgeShipped;
      case "delivered":
        return styles.badgeDelivered;
      default:
        return styles.badgePending;
    }
  };

  // Analytics calculations
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalProducts = products.length;
  const thisMonthOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
  }).length;

  if (showProductForm) {
    return (
      <div className={styles.formContainer}>
        <ProductForm product={editingProduct} onClose={handleCloseForm} />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Админ панель</h1>
          <p className={styles.subtitle}>Управление антикварным магазином</p>
        </div>

        {/* Analytics Cards */}
        <div className={styles.analyticsGrid}>
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsHeader}>
              <span className={styles.analyticsTitle}>Общая выручка</span>
              <BarChart3 className={styles.analyticsIcon} />
            </div>
            <div className={styles.analyticsValue}>{formatPrice(totalRevenue)}</div>
          </div>
          
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsHeader}>
              <span className={styles.analyticsTitle}>Всего товаров</span>
              <Package className={styles.analyticsIcon} />
            </div>
            <div className={styles.analyticsValue}>{totalProducts}</div>
          </div>
          
          <div className={styles.analyticsCard}>
            <div className={styles.analyticsHeader}>
              <span className={styles.analyticsTitle}>Заказы за месяц</span>
              <ShoppingBag className={styles.analyticsIcon} />
            </div>
            <div className={styles.analyticsValue}>{thisMonthOrders}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles.tabs}>
          <div className={styles.tabsList}>
            <button
              className={`${styles.tabsTrigger} ${activeTab === "products" ? styles.active : ""}`}
              onClick={() => setActiveTab("products")}
            >
              Товары
            </button>
            <button
              className={`${styles.tabsTrigger} ${activeTab === "orders" ? styles.active : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              Заказы
            </button>
            <button
              className={`${styles.tabsTrigger} ${activeTab === "analytics" ? styles.active : ""}`}
              onClick={() => setActiveTab("analytics")}
            >
              Аналитика
            </button>
          </div>

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className={styles.tabsContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Управление товарами</h2>
                <button onClick={handleAddProduct} className={styles.addButton}>
                  <Plus className={styles.addIcon} />
                  Добавить товар
                </button>
              </div>

              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr className={styles.tableRow}>
                    <th className={styles.tableHead}>Изображение</th>
                    <th className={styles.tableHead}>Название</th>
                    <th className={styles.tableHead}>Цена</th>
                    <th className={styles.tableHead}>Категория</th>
                    <th className={styles.tableHead}>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className={styles.productImage}
                        />
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.productName}>{product.name}</div>
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.productPrice}>{formatPrice(product.price)}</div>
                      </td>
                      <td className={styles.tableCell}>{product.category}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.actions}>
                          <button
                            onClick={() => handleEditProduct(product)}
                            className={`${styles.actionButton} ${styles.editButton}`}
                          >
                            <Edit className={styles.actionIcon} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className={`${styles.actionButton} ${styles.deleteButton}`}
                          >
                            <Trash2 className={styles.actionIcon} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className={styles.tabsContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Управление заказами</h2>
              </div>

              <table className={styles.table}>
                <thead className={styles.tableHeader}>
                  <tr className={styles.tableRow}>
                    <th className={styles.tableHead}>ID</th>
                    <th className={styles.tableHead}>Клиент</th>
                    <th className={styles.tableHead}>Email</th>
                    <th className={styles.tableHead}>Итого</th>
                    <th className={styles.tableHead}>Статус</th>
                    <th className={styles.tableHead}>Дата</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className={styles.tableRow}>
                      <td className={styles.tableCell}>#{order.id}</td>
                      <td className={styles.tableCell}>{order.customerName}</td>
                      <td className={styles.tableCell}>{order.customerEmail}</td>
                      <td className={styles.tableCell}>
                        <div className={styles.orderTotal}>{formatPrice(order.total)}</div>
                      </td>
                      <td className={styles.tableCell}>
                        <span className={`${styles.badge} ${getBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className={styles.tableCell}>{formatDate(order.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className={styles.tabsContent}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Аналитика</h2>
              </div>
              <p>Раздел аналитики в разработке...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}