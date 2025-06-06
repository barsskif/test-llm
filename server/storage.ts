import { 
  users, 
  products, 
  orders, 
  orderItems,
  type User, 
  type InsertUser,
  type Product,
  type InsertProduct,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type OrderWithItems
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Order methods
  getAllOrders(): Promise<OrderWithItems[]>;
  getOrder(id: number): Promise<OrderWithItems | undefined>;
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<OrderWithItems>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private currentUserId: number;
  private currentProductId: number;
  private currentOrderId: number;
  private currentOrderItemId: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.currentUserId = 1;
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentOrderItemId = 1;

    // Initialize with some sample products
    this.initializeProducts();
  }

  private initializeProducts() {
    const sampleProducts: InsertProduct[] = [
      {
        name: "Victorian Armchair",
        description: "Restored 1890s mahogany armchair with original velvet upholstery",
        price: 125000, // $1,250.00
        category: "Furniture",
        condition: "Fully Restored",
        imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        name: "Brass Chandelier",
        description: "Ornate 1920s brass chandelier with crystal accents",
        price: 85000, // $850.00
        category: "Decorative Items",
        condition: "Fully Restored",
        imageUrl: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        name: "Mahogany Chest",
        description: "1930s chest of drawers with brass hardware",
        price: 68000, // $680.00
        category: "Furniture",
        condition: "Fully Restored",
        imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        name: "Porcelain Vase",
        description: "Hand-painted porcelain vase from the 1880s",
        price: 42000, // $420.00
        category: "Decorative Items",
        condition: "Original Condition",
        imageUrl: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        name: "Leather Book Set",
        description: "Collection of 12 leather-bound classics from 1900s",
        price: 29000, // $290.00
        category: "Books & Documents",
        condition: "Partially Restored",
        imageUrl: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      },
      {
        name: "Gilded Mirror",
        description: "Ornate French mirror with gold leaf frame, circa 1910",
        price: 97500, // $975.00
        category: "Decorative Items",
        condition: "Fully Restored",
        imageUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        isActive: true
      }
    ];

    sampleProducts.forEach(product => {
      this.createProduct(product);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
    };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(product => product.isActive);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = {
      ...insertProduct,
      id,
      createdAt: new Date(),
      isActive: insertProduct.isActive ?? true,
    };
    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: number, updateData: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updatedProduct: Product = {
      ...product,
      ...updateData,
    };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const product = this.products.get(id);
    if (!product) return false;

    const updatedProduct: Product = {
      ...product,
      isActive: false,
    };
    this.products.set(id, updatedProduct);
    return true;
  }

  // Order methods
  async getAllOrders(): Promise<OrderWithItems[]> {
    const ordersArray = Array.from(this.orders.values());
    return ordersArray.map(order => this.enrichOrderWithItems(order));
  }

  async getOrder(id: number): Promise<OrderWithItems | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    return this.enrichOrderWithItems(order);
  }

  async createOrder(insertOrder: InsertOrder, items: InsertOrderItem[]): Promise<OrderWithItems> {
    const orderId = this.currentOrderId++;
    const order: Order = {
      ...insertOrder,
      id: orderId,
      createdAt: new Date(),
      customerPhone: insertOrder.customerPhone || null,
      status: "pending",
    };
    this.orders.set(orderId, order);

    // Create order items
    items.forEach(item => {
      const orderItem: OrderItem = {
        ...item,
        id: this.currentOrderItemId++,
        orderId,
      };
      this.orderItems.set(orderItem.id, orderItem);
    });

    return this.enrichOrderWithItems(order);
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const updatedOrder: Order = {
      ...order,
      status,
    };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }

  private enrichOrderWithItems(order: Order): OrderWithItems {
    const items = Array.from(this.orderItems.values())
      .filter(item => item.orderId === order.id)
      .map(item => {
        const product = this.products.get(item.productId);
        return {
          ...item,
          product: product!,
        };
      });

    return {
      ...order,
      items,
    };
  }
}

export const storage = new MemStorage();
