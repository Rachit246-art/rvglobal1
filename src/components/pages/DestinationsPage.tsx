import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
  const [destinations, setDestinations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    setDestinations([
      { _id: '1', destinationName: 'Aspen', country: 'USA', iataCode: 'ASE', destinationImage: '/assets/destinations/aspen.jpg', description: 'Nestled in the Rocky Mountains, Aspen is a premier destination for luxury ski vacations and outdoor adventures. Private jet charters offer unparalleled convenience for accessing this exclusive resort town...', popularRoutes: 'New York (TEB), Los Angeles (VNY), Dallas (DAL), Miami (OPF)' },
      { _id: '2', destinationName: 'Maldives', country: 'Maldives', iataCode: 'MLE', destinationImage: '/assets/destinations/maldives.jpg', description: 'The Maldives, an archipelago of breathtaking coral islands, is the epitome of luxury tropical escapes. Chartering a private jet is the preferred way to reach this secluded paradise, offering direct access to...', popularRoutes: 'Dubai (DXB), London (LTN), Singapore (SIN), Mumbai (BOM)' },
      { _id: '3', destinationName: 'St. Barts', country: 'France', iataCode: 'SBH', destinationImage: '/assets/destinations/st_barts.jpg', description: 'Saint Barthélemy, or St. Barts, is a jewel of the Caribbean, renowned for its pristine beaches, gourmet dining, and exclusive atmosphere. Private jet charters are essential for reaching this island, often...', popularRoutes: 'San Juan (SJU), St. Maarten (SXM), Miami (OPF), New York (TEB)' },
      { _id: '4', destinationName: 'Mykonos', country: 'Greece', iataCode: 'JMK', destinationImage: '/assets/destinations/mykonos.jpg', description: 'Mykonos, a glamorous Greek island in the Aegean Sea, is famous for its vibrant nightlife, stunning beaches, and iconic Cycladic architecture. Private jet charters are popular for those seeking a stylish and...', popularRoutes: 'Athens (ATH), London (LTN), Rome (CIA), Istanbul (IST)' },
      { _id: '5', destinationName: 'Dubai', country: 'UAE', iataCode: 'DXB', destinationImage: '/assets/destinations/dubai.jpg', description: 'Dubai, a city of superlatives, offers a unique blend of futuristic architecture, luxury shopping, and desert adventures. As a global business and leisure hub, it\'s a prime destination for private jet charters, catering to...', popularRoutes: 'London (LTN), Moscow (VKO), Riyadh (RUH), Mumbai (BOM)' },
      { _id: '6', destinationName: 'London', country: 'UK', iataCode: 'LTN', destinationImage: '/assets/destinations/london.jpg', description: 'London, a world-leading financial and cultural capital, attracts a high volume of private jet traffic for both business and leisure. Its multiple private jet airports provide excellent connectivity to global destinations...', popularRoutes: 'New York (TEB), Paris (LBG), Geneva (GVA), Dubai (DXB)' },
      { _id: '7', destinationName: 'Paris', country: 'France', iataCode: 'LBG', destinationImage: '/assets/destinations/paris.jpg', description: 'Paris, the \'City of Lights,\' is an enduring symbol of romance, art, and haute couture. Private jet charters to Paris are highly sought after for fashion weeks, cultural events, and luxury getaways, offering direct...', popularRoutes: 'London (LTN), Geneva (GVA), New York (TEB), Milan (LIN)' },
      { _id: '8', destinationName: 'Geneva', country: 'Switzerland', iataCode: 'GVA', destinationImage: '/assets/destinations/geneva.jpg', description: 'Geneva, nestled on the shores of Lake Geneva with the Alps as a backdrop, is a significant international hub for diplomacy, finance, and luxury tourism. It\'s a popular private jet destination, especially for busines...', popularRoutes: 'London (LTN), Paris (LBG), Zurich (ZRH), Moscow (VKO)' },
    ]);
    setIsLoading(false);
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
            '/assets/backgrounds/la_bg.jpg',
            '/assets/backgrounds/ny_bg.jpg',
            '/assets/backgrounds/miami_bg.jpg'
          ]} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wider">
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
                            <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-2 uppercase tracking-wide">
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
                          className="w-full bg-accent hover:bg-accent/90 text-white font-heading font-bold uppercase tracking-wider rounded-none"
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
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-6 uppercase tracking-wider">
              Ready to Explore Your Next Destination?
            </h2>
            <p className="text-lg font-paragraph text-white/90 mb-8 max-w-2xl mx-auto">
              Let our team help you plan the perfect charter to any destination worldwide
            </p>
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-primary hover:bg-gray-100 font-heading font-bold uppercase tracking-wider px-10 py-4 text-sm rounded-none shadow-lg transition-all"
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
