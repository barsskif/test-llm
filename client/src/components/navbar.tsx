import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Settings, Menu, X } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { CartSidebar } from "./cart-sidebar";
import styles from "./navbar.module.css";

export function Navbar() {
  const [location] = useLocation();
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = getTotalItems();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <div className={styles.navContent}>
            <div className={styles.logoSection}>
              <Link href="/">
                <h1 className={styles.logo}>
                  Наследие Сокровищ
                </h1>
              </Link>
            </div>
            
            <div className={styles.desktopMenu}>
              <Link href="/">
                <a className={`${styles.navLink} ${location === '/' ? styles.active : ''}`}>
                  Каталог
                </a>
              </Link>
              <a href="#about" className={styles.navLink}>О нас</a>
              <a href="#contact" className={styles.navLink}>Контакты</a>
              <Link href="/admin">
                <button className={styles.adminButton}>
                  <Settings className={styles.icon} />
                  Админ
                </button>
              </Link>
              <button
                onClick={() => setIsCartOpen(true)}
                className={styles.cartButton}
              >
                <ShoppingCart className={styles.cartIcon} />
                {totalItems > 0 && (
                  <span className={styles.cartBadge}>
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
            
            <div className={styles.mobileMenuButton}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className={styles.mobileIcon} /> : <Menu className={styles.mobileIcon} />}
              </button>
            </div>
          </div>
          
          {isMobileMenuOpen && (
            <div className={styles.mobileMenu}>
              <div className={styles.mobileMenuContent}>
                <Link href="/">
                  <a className={styles.mobileNavLink}>Каталог</a>
                </Link>
                <a href="#about" className={styles.mobileNavLink}>О нас</a>
                <a href="#contact" className={styles.mobileNavLink}>Контакты</a>
                <Link href="/admin">
                  <a className={styles.mobileNavLink}>Админ</a>
                </Link>
                <button
                  onClick={() => setIsCartOpen(true)}
                  className={styles.mobileCartButton}
                >
                  <ShoppingCart className={styles.cartIcon} />
                  Корзина ({totalItems})
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
