import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';

import { Plane, Users, Gauge, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

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

const AnimatedElement: React.FC<{children: React.ReactNode; className?: string; delay?: number}> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
        observer.unobserve(el);
      }
    }, { threshold: 0.1, rootMargin: '50px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className || ''}`}
    >
      {children}
    </div>
  );
};

export default function AircraftPage() {
  const [aircraft, setAircraft] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');
  const navigate = useNavigate();

  useEffect(() => {
    loadAircraft();
  }, []);

  const loadAircraft = async () => {
    setAircraft([
      { _id: 'citation-m2', aircraftName: 'Citation M2', aircraftType: 'Light Jet', passengerCapacity: 7, rangeNm: 1550, manufacturer: 'Cessna', aircraftImage: '/assets/aircraft/citation_m2.png', specifications: 'The Citation M2 is a light jet that combines speed, range, and efficiency. It features a modern Garmin G3000 avionics suite and a comfortable cabin for up to 7 passengers.' },
      { _id: 'phenom-300e', aircraftName: 'Phenom 300E', aircraftType: 'Light Jet', passengerCapacity: 10, rangeNm: 2010, manufacturer: 'Embraer', aircraftImage: '/assets/aircraft/phenom_300e.png', specifications: 'The Embraer Phenom 300E is a best-selling light jet known for its speed, range, and spacious cabin. It offers advanced avionics and a luxurious interior design.' },
      { _id: 'challenger-350', aircraftName: 'Challenger 350', aircraftType: 'Super Mid-Size Jet', passengerCapacity: 10, rangeNm: 3200, manufacturer: 'Bombardier', aircraftImage: '/assets/aircraft/challenger_350.png', specifications: 'The Bombardier Challenger 350 is a super mid-size jet offering exceptional performance, comfort, and reliability. It boasts a large cabin, advanced wing design, and powerful engines.' },
      { _id: 'g650er', aircraftName: 'Gulfstream G650ER', aircraftType: 'Heavy Jet', passengerCapacity: 19, rangeNm: 7500, manufacturer: 'Gulfstream Aerospace', aircraftImage: '/assets/aircraft/generic_jet.jpg', specifications: 'The Gulfstream G650ER is an ultra-long-range heavy jet, capable of connecting distant cities non-stop. It features a spacious, quiet cabin with advanced technology and luxurious amenities.' },
      { _id: 'global-7500', aircraftName: 'Global 7500', aircraftType: 'Ultra Long-Range Jet', passengerCapacity: 19, rangeNm: 7700, manufacturer: 'Bombardier', aircraftImage: '/assets/aircraft/generic_jet.jpg', specifications: 'The Bombardier Global 7500 is a flagship ultra-long-range business jet, offering an unparalleled combination of range, speed, and comfort. It features four true living spaces and a... ' },
      { _id: 'bell-407gxi', aircraftName: 'Bell 407GXi', aircraftType: 'Helicopter', passengerCapacity: 6, rangeNm: 330, manufacturer: 'Bell Textron', aircraftImage: '/assets/aircraft/generic_helicopter.jpg', specifications: 'The Bell 407GXi is a versatile single-engine helicopter known for its performance, reliability, and advanced Garmin G1000H NXi flight deck. Ideal for corporate transport and utility... ' },
      { _id: 'pilatus-pc-12', aircraftName: 'Pilatus PC-12 NGX', aircraftType: 'Turboprop', passengerCapacity: 10, rangeNm: 1803, manufacturer: 'Pilatus Aircraft', aircraftImage: '/assets/aircraft/generic_jet.jpg', specifications: 'The Pilatus PC-12 NGX is a single-engine turboprop aircraft renowned for its versatility, reliability, and short-field performance. It offers a large cabin and advanced avionics.' },
      { _id: 'legacy-600', aircraftName: 'Legacy 600', aircraftType: 'Large Jet', passengerCapacity: 13, rangeNm: 3250, manufacturer: 'Embraer', aircraftImage: '/assets/aircraft/legacy_600.jpg', specifications: 'The Embraer Legacy 600 is a large business jet derived from the ERJ 135 regional airliner. It offers a spacious three-zone cabin, excellent range, and robust performance.' },
      { _id: 'hawker-800xp', aircraftName: 'Hawker 800XP', aircraftType: 'Mid-Size Jet', passengerCapacity: 8, rangeNm: 2600, manufacturer: 'Hawker Beechcraft', aircraftImage: '/assets/aircraft/generic_jet.jpg', specifications: 'The Hawker 800XP is a popular mid-size business jet known for its comfortable cabin, good range, and reliable performance. It is a workhorse in the private aviation sector.' },
      { _id: 'citation-x', aircraftName: 'Citation X+', aircraftType: 'Super Mid-Size Jet', passengerCapacity: 9, rangeNm: 3460, manufacturer: 'Cessna', aircraftImage: '/assets/aircraft/generic_jet.jpg', specifications: 'The Citation X+ is one of the fastest civilian aircraft in the world, offering impressive speed and range. It features a comfortable cabin and advanced avionics for efficient travel.' },
      { _id: 'king-air-350i', aircraftName: 'King Air 350i', aircraftType: 'Turboprop', passengerCapacity: 11, rangeNm: 1806, manufacturer: 'Textron Aviation', aircraftImage: '/assets/aircraft/generic_jet.jpg', specifications: 'The King Air 350i is a versatile twin-turboprop aircraft, renowned for its reliability, spacious cabin, and ability to operate from shorter runways. Ideal for regional travel.' },
      { _id: 'h145', aircraftName: 'Airbus H145', aircraftType: 'Helicopter', passengerCapacity: 10, rangeNm: 351, manufacturer: 'Airbus Helicopters', aircraftImage: '/assets/aircraft/generic_helicopter.jpg', specifications: 'The Airbus H145 is a high-performance twin-engine helicopter, known for its spacious cabin, low noise levels, and advanced Helionix avionics suite. Suitable for various missions.' },
    ]);
    setIsLoading(false);
  };

  const filteredAircraft = selectedType === 'all' 
    ? aircraft 
    : aircraft.filter(a => a.aircraftType?.toLowerCase().includes(selectedType.toLowerCase()));

  const aircraftTypes = [
    'all', 
    'Light Jet', 
    'Super Mid-Size Jet', 
    'Heavy Jet', 
    'Ultra Long-Range Jet', 
    'Helicopter', 
    'Turboprop', 
    'Large Jet', 
    'Mid-Size Jet'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Image Carousel */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/20">
        <div className="absolute inset-0 w-full h-full">
          <ImageCarousel images={[
            '/assets/aircraft/generic_jet.jpg',
            '/assets/backgrounds/jet_bg_1.jpg',
            '/assets/backgrounds/ny_bg.jpg'
          ]} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wider">
            Aircraft Guide
          </h1>
          <p className="text-lg md:text-xl font-paragraph text-white/90 max-w-3xl mx-auto">
            Explore our extensive fleet of private jets, helicopters, and executive airliners
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {aircraftTypes.map((type) => (
              <Button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`${
                  selectedType === type 
                    ? 'bg-accent text-white' 
                    : 'bg-gray-100 text-primary hover:bg-gray-200'
                } font-paragraph font-medium capitalize`}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Aircraft Grid */}
      <section id="fleet" className="py-20 bg-gradient-to-b from-white to-gray-50 scroll-mt-24">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? null : filteredAircraft.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAircraft.map((plane, index) => (
                  <AnimatedElement key={plane._id} className={`delay-${(index % 3) * 100}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                      {plane.aircraftImage && (
                        <div className="relative h-56 overflow-hidden">
                          <Image 
                            src={plane.aircraftImage} 
                            alt={plane.aircraftName || 'Aircraft'} 
                            className="w-full h-full object-cover"
                            width={400}
                          />
                          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-[10px] font-heading font-bold uppercase tracking-wider">
                            {plane.aircraftType}
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-lg md:text-xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">
                          {plane.aircraftName}
                        </h3>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-gray-600">
                            <Users className="w-5 h-5 mr-3 text-accent" />
                            <span className="font-paragraph text-xs uppercase tracking-widest">
                              <strong>Capacity:</strong> {plane.passengerCapacity} pax
                            </span>
                          </div>
                          
                          {plane.rangeNm && (
                            <div className="flex items-center text-gray-600">
                              <Gauge className="w-5 h-5 mr-3 text-accent" />
                              <span className="font-paragraph text-xs uppercase tracking-widest">
                                <strong>Range:</strong> {plane.rangeNm} NM
                              </span>
                            </div>
                          )}

                          {plane.manufacturer && (
                            <div className="flex items-center text-gray-600">
                              <Plane className="w-5 h-5 mr-3 text-accent" />
                              <span className="font-paragraph text-xs uppercase tracking-widest">
                                <strong>Manufacturer:</strong> {plane.manufacturer}
                              </span>
                            </div>
                          )}
                        </div>

                        {plane.specifications && (
                          <p className="font-paragraph text-sm text-gray-600 mb-8 line-clamp-3 leading-relaxed">
                            {plane.specifications}
                          </p>
                        )}

                        <div className="mt-auto flex gap-3">
                          <Button 
                            onClick={() => navigate(`/aircraft/${plane._id}`)}
                            className="flex-1 bg-primary hover:bg-primary/90 text-white font-heading font-bold uppercase tracking-wider text-[10px] rounded-none py-6 shadow-md transition-all"
                          >
                            Explore <ArrowRight className="ml-2 w-3 h-3" />
                          </Button>
                          <Button 
                            onClick={() => navigate('/contact', { state: { aircraft: plane.aircraftName } })}
                            variant="outline"
                            className="flex-1 border-accent text-accent hover:bg-accent hover:text-white font-heading font-bold uppercase tracking-wider text-[10px] rounded-none py-6 shadow-sm transition-all"
                          >
                            Quote
                          </Button>
                        </div>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-gray-500 text-lg">
                  {selectedType === 'all' 
                    ? 'No aircraft available at the moment.' 
                    : `No ${selectedType} aircraft available.`}
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
              Need Help Choosing the Right Aircraft?
            </h2>
            <p className="text-lg font-paragraph text-white/90 mb-8 max-w-2xl mx-auto">
              Our aviation experts are available 24/7 to help you select the perfect aircraft for your journey
            </p>
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-white text-primary hover:bg-gray-100 font-heading font-bold uppercase tracking-wider px-10 py-4 text-sm rounded-none shadow-lg transition-all"
            >
              Speak to an Expert
            </Button>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
