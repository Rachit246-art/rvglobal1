import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { servicesData, ServiceDetail } from '@/lib/services-data';
import { CheckCircle, ArrowRight, Plane, Shield, Clock, Globe } from 'lucide-react';

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

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<ServiceDetail | null>(null);

  useEffect(() => {
    if (id && servicesData[id]) {
      setService(servicesData[id]);
    } else {
      navigate('/services');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!service) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image src={service.heroImage} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <AnimatedElement className="max-w-3xl">
            <h4 className="text-accent font-heading font-bold uppercase tracking-[0.3em] mb-4 text-sm md:text-base">
              {service.subtitle}
            </h4>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl font-paragraph text-white/90 mb-10 max-w-2xl leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4 w-full">
              <Button 
                onClick={() => navigate('/contact')}
                className="bg-accent hover:bg-accent/90 text-white font-heading font-bold uppercase tracking-widest px-8 md:px-10 py-5 md:py-7 text-xs md:text-sm rounded-none shadow-xl transition-all hover:scale-105 w-full md:w-auto"
              >
                Request a Quote
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Key Benefits & Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedElement>
              <div className="relative">
                <Image src={service.mainImage} alt="Service Detail" className="w-full rounded-2xl shadow-2xl relative z-10" />
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-primary/5 rounded-full blur-3xl" />
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8 uppercase tracking-wider">
                Excellence in Every Detail
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <p className="font-paragraph text-gray-700 text-sm md:text-base">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="p-8 bg-gray-50 border-l-4 border-accent">
                <p className="italic text-gray-600 font-paragraph">
                  &quot;Our commitment to your journey goes beyond just reaching the destination. We focus on providing a seamless, secure, and luxurious environment where your needs are anticipated and met with precision.&quot;
                </p>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6 uppercase tracking-widest">
              Unmatched Features
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {service.features.map((feature, i) => (
              <AnimatedElement key={i} delay={i * 200}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg group hover:shadow-2xl transition-all duration-500">
                  <div className="h-64 overflow-hidden">
                    <Image src={feature.image} alt={feature.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">
                      {feature.title}
                    </h3>
                    <p className="font-paragraph text-gray-600 leading-relaxed mb-6">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 uppercase tracking-widest">
              Our Simple Process
            </h2>
            <p className="text-white/60 font-paragraph max-w-2xl mx-auto">
              From initial contact to final arrival, we ensure a streamlined experience that respects your time and expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, i) => (
              <AnimatedElement key={i} delay={i * 150} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="text-6xl font-heading font-black text-white/10 mb-[-30px] z-0 select-none">
                    {step.step}
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-heading font-bold mb-4 uppercase tracking-wider text-accent">
                      {step.title}
                    </h3>
                    <p className="text-white/80 font-paragraph text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
                {i < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-[85%] w-full border-t border-dashed border-white/20" />
                )}
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <AnimatedElement>
            <div className="inline-block p-4 bg-accent/10 rounded-full mb-8">
              <Plane className="w-8 h-8 text-accent animate-pulse" />
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-8 uppercase tracking-widest leading-tight">
              Experience the Pinnacle of <br className="hidden md:block" /> Private Aviation
            </h2>
            <p className="text-lg font-paragraph text-gray-600 mb-12 max-w-2xl mx-auto">
              Our team is ready to coordinate your next mission with the precision and luxury you deserve.
            </p>
            <Button 
              onClick={() => navigate('/contact')}
              className="bg-accent hover:bg-accent/90 text-white font-heading font-bold uppercase tracking-[0.2em] px-8 md:px-16 py-5 md:py-8 text-sm md:text-base rounded-none shadow-2xl transition-all hover:scale-105 w-full md:w-auto"
            >
              Get Your Custom Quote <ArrowRight className="ml-3 w-5 h-5" />
            </Button>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
