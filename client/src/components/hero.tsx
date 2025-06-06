import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog');
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-96 bg-gradient-to-r from-vintage-brown to-chocolate">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-center text-white w-full">
          <h2 className="text-5xl md:text-6xl font-playfair font-bold mb-4">Timeless Elegance</h2>
          <p className="text-xl md:text-2xl mb-8 font-light">Restored antiques with stories to tell</p>
          <Button 
            onClick={scrollToCatalog}
            className="bg-goldenrod hover:bg-dark-goldenrod text-dark-brown px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
          >
            Explore Collection
          </Button>
        </div>
      </div>
    </section>
  );
}
