import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProductGrid } from "@/components/product-grid";
import { CartProvider } from "@/hooks/use-cart";

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-antique-white">
        <Navbar />
        <Hero />
        
        {/* Featured Categories */}
        <section className="py-16 bg-vintage-beige">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-4xl font-playfair font-bold text-center text-dark-brown mb-12">Популярные Категории</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-warm overflow-hidden hover:shadow-warm-lg transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Антикварная мебель" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-playfair font-semibold text-dark-brown mb-2">Мебель</h4>
                  <p className="text-gray-600 mb-4">Отреставрированные стулья, столы и шкафы прошлых эпох</p>
                  <span className="text-warm-gold font-semibold">Смотреть коллекцию</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-warm overflow-hidden hover:shadow-warm-lg transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Винтажный декор" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-playfair font-semibold text-dark-brown mb-2">Декоративные предметы</h4>
                  <p className="text-gray-600 mb-4">Уникальные украшения и декоративные элементы</p>
                  <span className="text-warm-gold font-semibold">Смотреть коллекцию</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-warm overflow-hidden hover:shadow-warm-lg transition-all">
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Винтажные украшения" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-playfair font-semibold text-dark-brown mb-2">Украшения и аксессуары</h4>
                  <p className="text-gray-600 mb-4">Вневременные изделия с уникальной историей</p>
                  <span className="text-warm-gold font-semibold">Смотреть коллекцию</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <ProductGrid />

        {/* Footer */}
        <footer className="bg-dark-brown text-antique-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h4 className="text-xl font-playfair font-bold text-warm-gold mb-4">Наследие Сокровищ</h4>
                <p className="text-sm">Сохраняем историю через тщательно отреставрированный антиквариат и винтажные сокровища.</p>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Быстрые ссылки</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-warm-gold transition-colors">О нас</a></li>
                  <li><a href="#catalog" className="hover:text-warm-gold transition-colors">Каталог</a></li>
                  <li><a href="#" className="hover:text-warm-gold transition-colors">Услуги реставрации</a></li>
                  <li><a href="#" className="hover:text-warm-gold transition-colors">Контакты</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Категории</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-warm-gold transition-colors">Мебель</a></li>
                  <li><a href="#" className="hover:text-warm-gold transition-colors">Декоративные предметы</a></li>
                  <li><a href="#" className="hover:text-warm-gold transition-colors">Украшения</a></li>
                  <li><a href="#" className="hover:text-warm-gold transition-colors">Книги и документы</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Контактная информация</h5>
                <div className="space-y-2 text-sm">
                  <p>📞 +7 (495) 123-45-67</p>
                  <p>✉️ info@nasledie-sokrovisch.ru</p>
                  <p>📍 Москва, ул. Антикварная, 15</p>
                </div>
              </div>
            </div>
            <div className="border-t border-vintage-brown mt-8 pt-8 text-center text-sm">
              <p>&copy; 2024 Наследие Сокровищ. Все права защищены.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
