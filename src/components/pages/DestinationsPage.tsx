import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { DestinationGuides } from '@/entities';
import { MapPin, Search, ChevronLeft, ChevronRight } from 'lucide-react';

// Carousel Component
const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative w-full h-full">
      {images.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
        </div>
      ))}
      
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const AnimatedElement: React.FC<{children: React.ReactNode; className?: string}> = ({ children, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { 
        el.classList.add('opacity-100', 'translate-y-0'); 
        observer.unobserve(el); 
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`${className || ''} opacity-0 translate-y-8 transition-all duration-700`}>{children}</div>;
};

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<DestinationGuides[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getAll<DestinationGuides>('destinationguides');
      setDestinations(data.items);
    } catch (error) {
      console.error('Error loading destinations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDestinations = destinations.filter(dest => 
    dest.destinationName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dest.iataCode?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Image Carousel */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/20">
        <div className="absolute inset-0 w-full h-full">
          <ImageCarousel images={[
            'https://images.aircharterservice.com/global/home/los-angeles-private-jet-charter.jpg?imwidth=640',
            'https://images.aircharterservice.com/global/home/new-york-private-jet-charter.jpg?imwidth=640',
            'https://images.aircharterservice.com/global/home/miami-private-jet-charter.jpg?imwidth=640'
          ]} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Destination Guides
          </h1>
          <p className="text-lg md:text-xl font-paragraph text-white/90 max-w-3xl mx-auto mb-8">
            Discover the world&apos;s most sought-after destinations for private jet charter
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search destinations, countries, or airport codes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-lg font-paragraph bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? null : filteredDestinations.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((destination, index) => (
                  <AnimatedElement key={destination._id} className={`delay-${(index % 3) * 100}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full">
                      {destination.destinationImage && (
                        <div className="relative h-64 overflow-hidden">
                          <Image 
                            src={destination.destinationImage} 
                            alt={destination.destinationName || 'Destination'} 
                            className="w-full h-full object-cover"
                            width={400}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                          
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="text-2xl font-heading font-bold text-white mb-2">
                              {destination.destinationName}
                            </h3>
                            <div className="flex items-center text-white/90">
                              <MapPin className="w-4 h-4 mr-2" />
                              <span className="font-paragraph text-sm">{destination.country}</span>
                              {destination.iataCode && (
                                <span className="ml-3 bg-accent text-white px-2 py-1 rounded text-xs font-paragraph font-medium">
                                  {destination.iataCode}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <p className="font-paragraph text-gray-600 mb-4 line-clamp-4">
                          {destination.description}
                        </p>

                        {destination.popularRoutes && (
                          <div className="mb-4">
                            <h4 className="text-sm font-heading font-bold text-primary mb-2">Popular Routes</h4>
                            <p className="font-paragraph text-sm text-gray-600 line-clamp-2">
                              {destination.popularRoutes}
                            </p>
                          </div>
                        )}

                        <Button 
                          onClick={() => window.location.href = '/contact'}
                          className="w-full bg-accent hover:bg-accent/90 text-white font-paragraph font-medium"
                        >
                          Charter to {destination.destinationName}
                        </Button>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-gray-500 text-lg">
                  {searchTerm 
                    ? `No destinations found matching "${searchTerm}"` 
                    : 'No destinations available at the moment.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Explore Your Next Destination?
            </h2>
            <p className="text-lg font-paragraph text-white/90 mb-8 max-w-2xl mx-auto">
              Let our team help you plan the perfect charter to any destination worldwide
            </p>
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-primary hover:bg-gray-100 font-paragraph font-medium px-8 py-6 text-lg"
            >
              Plan Your Journey
            </Button>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
