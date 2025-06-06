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
            <h3 className="text-4xl font-playfair font-bold text-center text-dark-brown mb-12">Featured Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Antique Furniture" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-playfair font-semibold text-dark-brown mb-2">Furniture</h4>
                  <p className="text-gray-600 mb-4">Restored chairs, tables, and cabinets from bygone eras</p>
                  <span className="text-chocolate font-semibold">View Collection</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Vintage Decor" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-playfair font-semibold text-dark-brown mb-2">Decorative Items</h4>
                  <p className="text-gray-600 mb-4">Unique ornaments and decorative pieces</p>
                  <span className="text-chocolate font-semibold">View Collection</span>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <img 
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300" 
                  alt="Vintage Jewelry" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-playfair font-semibold text-dark-brown mb-2">Jewelry & Accessories</h4>
                  <p className="text-gray-600 mb-4">Timeless pieces that tell unique stories</p>
                  <span className="text-chocolate font-semibold">View Collection</span>
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
                <h4 className="text-xl font-playfair font-bold text-goldenrod mb-4">Heritage Treasures</h4>
                <p className="text-sm">Preserving history through carefully restored antiques and vintage treasures.</p>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Quick Links</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-goldenrod transition-colors">About Us</a></li>
                  <li><a href="#catalog" className="hover:text-goldenrod transition-colors">Catalog</a></li>
                  <li><a href="#" className="hover:text-goldenrod transition-colors">Restoration Services</a></li>
                  <li><a href="#" className="hover:text-goldenrod transition-colors">Contact</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Categories</h5>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="hover:text-goldenrod transition-colors">Furniture</a></li>
                  <li><a href="#" className="hover:text-goldenrod transition-colors">Decorative Items</a></li>
                  <li><a href="#" className="hover:text-goldenrod transition-colors">Jewelry</a></li>
                  <li><a href="#" className="hover:text-goldenrod transition-colors">Books & Documents</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-semibold mb-4">Contact Info</h5>
                <div className="space-y-2 text-sm">
                  <p>📞 +1 (555) 123-4567</p>
                  <p>✉️ info@heritagetreasures.com</p>
                  <p>📍 123 Antique St, Vintage City</p>
                </div>
              </div>
            </div>
            <div className="border-t border-vintage-brown mt-8 pt-8 text-center text-sm">
              <p>&copy; 2024 Heritage Treasures. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
