import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Settings, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { CartSidebar } from "./cart-sidebar";

export function Navbar() {
  const [location] = useLocation();
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = getTotalItems();

  return (
    <>
      <nav className="bg-dark-brown text-antique-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <h1 className="text-2xl font-playfair font-bold text-warm-gold cursor-pointer">
                  Наследие Сокровищ
                </h1>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/">
                <a className={`hover:text-warm-gold transition-colors ${location === '/' ? 'text-warm-gold' : ''}`}>
                  Каталог
                </a>
              </Link>
              <a href="#about" className="hover:text-warm-gold transition-colors">О нас</a>
              <a href="#contact" className="hover:text-warm-gold transition-colors">Контакты</a>
              <Link href="/admin">
                <Button variant="ghost" className="hover:text-warm-gold transition-colors text-antique-white">
                  <Settings className="w-4 h-4 mr-1" />
                  Админ
                </Button>
              </Link>
              <Button
                variant="ghost"
                onClick={() => setIsCartOpen(true)}
                className="relative hover:text-warm-gold transition-colors text-antique-white"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-warm-gold text-dark-brown rounded-full w-5 h-5 text-xs flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
            
            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-antique-white"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
          
          {isMobileMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <Link href="/">
                  <a className="block py-2 hover:text-warm-gold transition-colors">Каталог</a>
                </Link>
                <a href="#about" className="block py-2 hover:text-warm-gold transition-colors">О нас</a>
                <a href="#contact" className="block py-2 hover:text-warm-gold transition-colors">Контакты</a>
                <Link href="/admin">
                  <a className="block py-2 hover:text-warm-gold transition-colors">Админ</a>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => setIsCartOpen(true)}
                  className="flex items-center justify-start p-2 hover:text-warm-gold transition-colors text-antique-white"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Корзина ({totalItems})
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>
      
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
