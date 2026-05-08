import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';

import { Plane, Users, Package, Globe, CheckCircle, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Carousel Component
// ... (rest of the Carousel component)

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

export default function ServicesPage() {
  const [services, setServices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    if (!isLoading && location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly to ensure layout is ready after animation
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location, isLoading]);

  const loadServices = async () => {
    setServices([
      { 
        _id: 'private-jet', 
        serviceName: 'Private Jet Charter', 
        serviceImage: '/assets/services/private_jet_charter.jpg', 
        description: 'Our Private Jet Charter service offers the ultimate in convenience, comfort, and privacy. Tailored to your schedule, you can fly to thousands of airports worldwide, avoiding commercial airport hassles. Enjoy bespoke catering, spacious cabins, and dedicated service from booking to landing.',
        benefits: 'Time-saving, privacy, comfort, flexibility, access to remote locations, personalized service.'
      },
      { 
        _id: 'group-charter', 
        serviceName: 'Group Charter Flights', 
        serviceImage: '/assets/backgrounds/hero_bg_1.png', 
        description: 'Whether it\'s for corporate events, sports teams, incentive travel, or large family gatherings, our Group Charter Flights provide a seamless travel experience. We manage all logistics, offering customized branding, flexible scheduling, and a choice of aircraft to suit your group\'s specific needs and budget.',
        benefits: 'Cost-effective for groups, customized itineraries, dedicated check-in, brand visibility, enhanced group cohesion.'
      },
      { 
        _id: 'cargo-charter', 
        serviceName: 'Cargo Charter Services', 
        serviceImage: '/assets/services/cargo_charter.jpg', 
        description: 'When standard shipping isn\'t enough, our Cargo Charter Services provide dedicated aircraft for your critical freight. From humanitarian aid and industrial equipment to high-value goods and dangerous materials, we offer bespoke solutions for time-sensitive and specialized cargo, ensuring secure and timely delivery globally.',
        benefits: 'Speed, security, capacity for oversized items, global reach, specialized handling, reduced transit times.'
      },
      { 
        _id: 'helicopter', 
        serviceName: 'Helicopter Charter', 
        serviceImage: '/assets/services/helicopter_charter.jpg', 
        description: 'Our Helicopter Charter service offers unparalleled access to remote locations, city-to-city transfers, and scenic tours. Ideal for executive travel, aerial surveys, or special events, helicopters provide flexibility and speed, bypassing traffic and reaching destinations inaccessible by fixed-wing aircraft.',
        benefits: 'Direct access, speed, flexibility, scenic views, ideal for short distances and difficult terrain.'
      },
    ]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Image Carousel */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/20">
        <div className="absolute inset-0 w-full h-full">
          <ImageCarousel images={[
            '/assets/backgrounds/jet_bg_1.jpg',
            '/assets/backgrounds/la_bg.jpg',
            '/assets/services/cargo_charter.jpg'
          ]} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wider">
            Our Charter Services
          </h1>
          <p className="text-lg md:text-xl font-paragraph text-white/90 max-w-3xl mx-auto">
            Comprehensive aircraft charter solutions tailored to your specific needs, from private jets to cargo aircraft
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? null : services.length > 0 ? (
              <div className="space-y-20">
                {services.map((service, index) => (
                  <div key={service._id} id={service._id} className="scroll-mt-32">
                    <AnimatedElement>
                      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                        {/* Image */}
                        <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                          {service.serviceImage && (
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-accent/20 transition-all duration-500 hover:scale-[1.02]">
                              <Image 
                                src={service.serviceImage} 
                                alt={service.serviceName || 'Service'} 
                                className="w-full h-[350px] md:h-[450px] object-cover"
                                width={600}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                <Button 
                                  onClick={() => navigate(`/services/${service._id}`)}
                                  variant="outline" 
                                  className="text-white border-white hover:bg-white hover:text-primary rounded-none"
                                >
                                  View Details
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                          <div className="flex items-center mb-6">
                            {service._id === 'private-jet' && <Plane className="w-8 h-8 text-accent mr-4" />}
                            {service._id === 'group-charter' && <Users className="w-8 h-8 text-accent mr-4" />}
                            {service._id === 'cargo-charter' && <Package className="w-8 h-8 text-accent mr-4" />}
                            {service._id === 'helicopter' && <Plane className="w-8 h-8 text-accent mr-4 rotate-45" />}
                            <h2 className="text-2xl md:text-4xl font-heading font-bold text-primary uppercase tracking-tight">
                              {service.serviceName}
                            </h2>
                          </div>

                          <p className="text-base md:text-lg font-paragraph text-gray-600 mb-8 leading-relaxed">
                            {service.description}
                          </p>

                          {service.benefits && (
                            <div className="mb-10">
                              <h3 className="text-sm font-heading font-bold text-primary mb-5 uppercase tracking-[0.2em] border-b border-gray-100 pb-2">Key Benefits</h3>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {service.benefits.split(',').filter(b => b.trim()).map((benefit, i) => (
                                  <div key={i} className="flex items-center">
                                    <CheckCircle className="w-4 h-4 text-accent mr-3 flex-shrink-0" />
                                    <p className="font-paragraph text-xs md:text-sm text-gray-600 font-medium">{benefit.trim()}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div className="flex flex-wrap gap-4">
                            <Button 
                              onClick={() => navigate(`/services/${service._id}`)}
                              className="bg-primary hover:bg-primary/90 text-white font-heading font-bold tracking-wider px-8 py-6 text-xs rounded-none shadow-lg transition-all"
                            >
                              Explore Service <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button 
                              onClick={() => navigate('/contact', { state: { service: service.serviceName } })}
                              variant="outline"
                              className="border-accent text-accent hover:bg-accent hover:text-white font-heading font-bold tracking-wider px-8 py-6 text-xs rounded-none shadow-sm transition-all"
                            >
                              Request a Quote
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AnimatedElement>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-gray-500 text-lg">No services available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <AnimatedElement>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 uppercase tracking-widest">
              Ready to Charter Your Aircraft?
            </h2>
            <p className="text-lg md:text-xl font-paragraph text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
              Our dedicated team is available 24/7 to assist you with bespoke aviation solutions tailored to your mission requirements.
            </p>
            <div className="flex justify-center gap-6">
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-white text-primary hover:bg-gray-100 font-heading font-bold uppercase tracking-widest px-12 py-5 text-sm rounded-none shadow-2xl transition-all hover:scale-105"
              >
                Contact Our Experts
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
