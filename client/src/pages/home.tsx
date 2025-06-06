import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { CartProvider } from "@/hooks/use-cart";
import styles from "./home.module.css";

export default function Home() {
  return (
    <CartProvider>
      <div className={styles.mainContainer}>
        <Navbar />
        <Hero />
        
        {/* Featured Categories */}
        <section className={styles.categoriesSection}>
          <div className={styles.categoriesContainer}>
            <h3 className={styles.categoriesTitle}>Популярные Категории</h3>
            <div className={styles.categoriesGrid}>
              <div className={styles.categoryCard}>
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Антикварная мебель" 
                  className={styles.categoryImage}
                />
                <div className={styles.categoryContent}>
                  <h4 className={styles.categoryTitle}>Мебель</h4>
                  <p className={styles.categoryDescription}>Отреставрированные стулья, столы и шкафы прошлых эпох</p>
                  <span className={styles.categoryLink}>Смотреть коллекцию</span>
                </div>
              </div>
              
              <div className={styles.categoryCard}>
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Винтажный декор" 
                  className={styles.categoryImage}
                />
                <div className={styles.categoryContent}>
                  <h4 className={styles.categoryTitle}>Декоративные предметы</h4>
                  <p className={styles.categoryDescription}>Уникальные украшения и декоративные элементы</p>
                  <span className={styles.categoryLink}>Смотреть коллекцию</span>
                </div>
              </div>
              
              <div className={styles.categoryCard}>
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Винтажные украшения" 
                  className={styles.categoryImage}
                />
                <div className={styles.categoryContent}>
                  <h4 className={styles.categoryTitle}>Украшения и аксессуары</h4>
                  <p className={styles.categoryDescription}>Вневременные изделия с уникальной историей</p>
                  <span className={styles.categoryLink}>Смотреть коллекцию</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductGrid />

        {/* Footer */}
        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerGrid}>
              <div className={styles.footerSection}>
                <h4>Наследие Сокровищ</h4>
                <p>Сохраняем историю через тщательно отреставрированный антиквариат и винтажные сокровища.</p>
              </div>
              <div className={styles.footerSection}>
                <h5>Быстрые ссылки</h5>
                <ul className={styles.footerList}>
                  <li><a href="#" className={styles.footerLink}>О нас</a></li>
                  <li><a href="#catalog" className={styles.footerLink}>Каталог</a></li>
                  <li><a href="#" className={styles.footerLink}>Услуги реставрации</a></li>
                  <li><a href="#" className={styles.footerLink}>Контакты</a></li>
                </ul>
              </div>
              <div className={styles.footerSection}>
                <h5>Категории</h5>
                <ul className={styles.footerList}>
                  <li><a href="#" className={styles.footerLink}>Мебель</a></li>
                  <li><a href="#" className={styles.footerLink}>Декоративные предметы</a></li>
                  <li><a href="#" className={styles.footerLink}>Украшения</a></li>
                  <li><a href="#" className={styles.footerLink}>Книги и документы</a></li>
                </ul>
              </div>
              <div className={styles.footerSection}>
                <h5>Контактная информация</h5>
                <div>
                  <p>📞 +7 (495) 123-45-67</p>
                  <p>✉️ info@nasledie-sokrovisch.ru</p>
                  <p>📍 Москва, ул. Антикварная, 15</p>
                </div>
              </div>
            </div>
            <div className={styles.footerBottom}>
              <p>&copy; 2024 Наследие Сокровищ. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
