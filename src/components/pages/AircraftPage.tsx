import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { AircraftGuide } from '@/entities';
import { Plane, Users, Gauge } from 'lucide-react';

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

export default function AircraftPage() {
  const [aircraft, setAircraft] = useState<AircraftGuide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string>('all');

  useEffect(() => {
    loadAircraft();
  }, []);

  const loadAircraft = async () => {
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getAll<AircraftGuide>('aircraftguide');
      setAircraft(data.items);
    } catch (error) {
      console.error('Error loading aircraft:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredAircraft = selectedType === 'all' 
    ? aircraft 
    : aircraft.filter(a => a.aircraftType?.toLowerCase().includes(selectedType.toLowerCase()));

  const aircraftTypes = ['all', ...Array.from(new Set(aircraft.map(a => a.aircraftType).filter(Boolean)))];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(83,180,230,0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
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
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? null : filteredAircraft.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAircraft.map((plane, index) => (
                  <AnimatedElement key={plane._id} className={`delay-${(index % 3) * 100}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full">
                      {plane.aircraftImage && (
                        <div className="relative h-56 overflow-hidden">
                          <Image 
                            src={plane.aircraftImage} 
                            alt={plane.aircraftName || 'Aircraft'} 
                            className="w-full h-full object-cover"
                            width={400}
                          />
                          <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-paragraph font-medium">
                            {plane.aircraftType}
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="text-xl font-heading font-bold text-primary mb-4">
                          {plane.aircraftName}
                        </h3>

                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-gray-600">
                            <Users className="w-5 h-5 mr-3 text-accent" />
                            <span className="font-paragraph text-sm">
                              <strong>Capacity:</strong> {plane.passengerCapacity} passengers
                            </span>
                          </div>
                          
                          {plane.rangeNm && (
                            <div className="flex items-center text-gray-600">
                              <Gauge className="w-5 h-5 mr-3 text-accent" />
                              <span className="font-paragraph text-sm">
                                <strong>Range:</strong> {plane.rangeNm} NM
                              </span>
                            </div>
                          )}

                          {plane.manufacturer && (
                            <div className="flex items-center text-gray-600">
                              <Plane className="w-5 h-5 mr-3 text-accent" />
                              <span className="font-paragraph text-sm">
                                <strong>Manufacturer:</strong> {plane.manufacturer}
                              </span>
                            </div>
                          )}
                        </div>

                        {plane.specifications && (
                          <p className="font-paragraph text-sm text-gray-600 mb-4 line-clamp-3">
                            {plane.specifications}
                          </p>
                        )}

                        <Button 
                          onClick={() => window.location.href = '/contact'}
                          className="w-full bg-accent hover:bg-accent/90 text-white font-paragraph font-medium"
                        >
                          Request Quote
                        </Button>
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
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Need Help Choosing the Right Aircraft?
            </h2>
            <p className="text-lg font-paragraph text-white/90 mb-8 max-w-2xl mx-auto">
              Our aviation experts are available 24/7 to help you select the perfect aircraft for your journey
            </p>
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-primary hover:bg-gray-100 font-paragraph font-medium px-8 py-6 text-lg"
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
