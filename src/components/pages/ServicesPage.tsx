import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { BaseCrudService } from '@/integrations';
import { CharterServices } from '@/entities';
import { Plane, Users, Package, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

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

export default function ServicesPage() {
  const [services, setServices] = useState<CharterServices[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getAll<CharterServices>('charterservices');
      setServices(data.items);
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
                  <AnimatedElement key={service._id}>
                    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                      {/* Image */}
                      <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                        {service.serviceImage && (
                          <div className="relative rounded-3xl overflow-hidden shadow-2xl hover:shadow-accent/20 transition-shadow duration-300">
                            <Image 
                              src={service.serviceImage} 
                              alt={service.serviceName || 'Service'} 
                              className="w-full h-[400px] object-cover"
                              width={600}
                            />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                        <div className="flex items-center mb-4">
                          {index === 0 && <Plane className="w-8 h-8 text-accent mr-3" />}
                          {index === 1 && <Users className="w-8 h-8 text-accent mr-3" />}
                          {index === 2 && <Package className="w-8 h-8 text-accent mr-3" />}
                          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary">
                            {service.serviceName}
                          </h2>
                        </div>

                        <p className="text-lg font-paragraph text-gray-600 mb-6 leading-relaxed">
                          {service.description}
                        </p>

                        {service.benefits && (
                          <div className="mb-6">
                            <h3 className="text-xl font-heading font-bold text-primary mb-4">Key Benefits</h3>
                            <div className="space-y-3">
                              {service.benefits.split('\n').filter(b => b.trim()).map((benefit, i) => (
                                <div key={i} className="flex items-start">
                                  <CheckCircle className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-1" />
                                  <p className="font-paragraph text-gray-700">{benefit}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <Link to="/contact">
                          <Button className="bg-accent hover:bg-accent/90 text-white font-paragraph font-medium px-8 py-6 text-lg">
                            Request a Quote
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </AnimatedElement>
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
      <section className="py-20 bg-gradient-to-br from-primary to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Charter Your Aircraft?
            </h2>
            <p className="text-lg font-paragraph text-white/90 mb-8 max-w-2xl mx-auto">
              Our dedicated team is available 24/7 to assist you with your charter needs
            </p>
            <Link to="/contact">
              <Button className="bg-white text-primary hover:bg-gray-100 font-paragraph font-medium px-8 py-6 text-lg">
                Contact Us Now
              </Button>
            </Link>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
