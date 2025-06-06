import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";
import { Search } from "lucide-react";
import { useState, useMemo } from "react";
import type { Product } from "@shared/schema";
import styles from "./product-grid.module.css";

export function ProductGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, sortBy, categoryFilter]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories.sort();
  }, [products]);

  if (isLoading) {
    return (
      <div className={styles.loadingGrid}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.loadingCard}>
            <div className={styles.loadingImage}></div>
            <div className={styles.loadingContent}>
              <div className={styles.loadingTitle}></div>
              <div className={styles.loadingDescription}></div>
              <div className={styles.loadingFooter}>
                <div className={styles.loadingPrice}></div>
                <div className={styles.loadingButton}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <section id="catalog" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h3 className={styles.title}>Наша Коллекция</h3>
          
          <div className={styles.controls}>
            <select 
              value={categoryFilter} 
              onChange={(e) => setCategoryFilter(e.target.value)}
              className={styles.select}
            >
              <option value="all">Все категории</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className={styles.select}
            >
              <option value="name">По названию</option>
              <option value="price-low">Цена: по возрастанию</option>
              <option value="price-high">Цена: по убыванию</option>
              <option value="category">По категории</option>
            </select>
            
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Поиск товаров..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <Search className={styles.searchIcon} />
            </div>
          </div>
        </div>

        {filteredAndSortedProducts.length === 0 ? (
          <div className={styles.emptyState}>
            <p className={styles.emptyText}>Товары по вашим критериям не найдены.</p>
          </div>
        ) : (
          <div className={styles.grid}>
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
