import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { aircraftData, AircraftDetail } from '@/lib/aircraft-data';
import { Plane, Ruler, Users, Wind, Shield, ArrowRight, CheckCircle } from 'lucide-react';

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

export default function AircraftDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [aircraft, setAircraft] = useState<AircraftDetail | null>(null);

  useEffect(() => {
    if (id && aircraftData[id]) {
      setAircraft(aircraftData[id]);
    } else {
      navigate('/aircraft');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!aircraft) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image src={aircraft.heroImage} alt={aircraft.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <AnimatedElement className="max-w-3xl">
            <h4 className="text-accent font-heading font-bold uppercase tracking-[0.4em] mb-4 text-sm">
              {aircraft.manufacturer}
            </h4>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-heading font-bold text-white mb-8 leading-tight">
              {aircraft.name}
            </h1>
            <div className="flex flex-wrap gap-6 mb-10">
              <div className="flex items-center gap-3 text-white/90">
                <Users className="w-5 h-5 text-accent" />
                <span className="font-paragraph text-sm uppercase tracking-widest">{aircraft.capacity} PASSENGERS</span>
              </div>
              <div className="flex items-center gap-3 text-white/90">
                <Wind className="w-5 h-5 text-accent" />
                <span className="font-paragraph text-sm uppercase tracking-widest">RANGE: {aircraft.rangeNm} NM</span>
              </div>
            </div>
            <Button 
              onClick={() => navigate('/contact', { state: { aircraft: aircraft.name } })}
              className="bg-accent hover:bg-accent/90 text-white font-heading font-bold uppercase tracking-[0.2em] px-12 py-7 text-sm rounded-none shadow-2xl transition-all hover:scale-105"
            >
              Request a Quote
            </Button>
          </AnimatedElement>
        </div>
      </section>

      {/* Overview & Image */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedElement>
              <div className="relative p-4 bg-gray-50 rounded-3xl">
                <Image src={aircraft.mainImage} alt={aircraft.name} className="w-full h-auto rounded-2xl shadow-xl relative z-10" />
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-8 uppercase tracking-tighter">
                Redefining <br /> {aircraft.type} Performance
              </h2>
              <p className="text-lg font-paragraph text-gray-600 mb-10 leading-relaxed">
                {aircraft.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {aircraft.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                      <CheckCircle className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-paragraph text-sm font-bold text-gray-800 uppercase tracking-wide">{feature}</span>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Specifications Grid */}
      <section className="py-24 bg-gray-950 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <AnimatedElement className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 uppercase tracking-widest">
                Technical <br /> Specifications
              </h2>
              <p className="text-white/60 font-paragraph">
                Precision engineering and cutting-edge technology combine to deliver industry-leading performance.
              </p>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <div className="flex gap-4">
                <div className="p-6 bg-white/5 border border-white/10 text-center">
                  <div className="text-2xl font-heading font-bold text-accent mb-1">{aircraft.speed}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Cruise Speed</div>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 text-center">
                  <div className="text-2xl font-heading font-bold text-accent mb-1">{aircraft.capacity}</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-white/40">Pax Capacity</div>
                </div>
              </div>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
            {aircraft.specifications.map((spec, i) => (
              <AnimatedElement key={i} delay={i * 100} className="border-b border-white/10 pb-6 group hover:border-accent transition-colors">
                <div className="flex justify-between items-center">
                  <span className="text-white/50 font-heading text-xs uppercase tracking-widest">{spec.label}</span>
                  <span className="text-white font-heading font-bold text-lg uppercase">{spec.value}</span>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Cabin Dimensions */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6 uppercase tracking-widest">
              Cabin Comfort
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <AnimatedElement className="relative">
              <div className="p-12 bg-primary rounded-[3rem] text-white">
                <h3 className="text-2xl font-heading font-bold mb-10 uppercase tracking-widest">Interior Dimensions</h3>
                <div className="space-y-8">
                  {[
                    { label: 'Cabin Height', value: aircraft.cabinHeight, icon: Ruler },
                    { label: 'Cabin Width', value: aircraft.cabinWidth, icon: Ruler },
                    { label: 'Cabin Length', value: aircraft.cabinLength, icon: Ruler },
                  ].map((dim, i) => (
                    <div key={i} className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                        <dim.icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <div className="text-white/50 text-[10px] uppercase tracking-[0.2em] mb-1">{dim.label}</div>
                        <div className="text-xl font-heading font-bold tracking-wider">{dim.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement delay={300} className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden group">
                  <Image src={aircraft.mainImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="aspect-[4/3] bg-primary rounded-3xl p-8 flex flex-col justify-end">
                  <Shield className="w-8 h-8 text-accent mb-4" />
                  <div className="text-white font-heading font-bold uppercase tracking-widest leading-tight">Industry Leading <br /> Safety Standards</div>
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="aspect-[4/3] bg-accent rounded-3xl p-8 flex flex-col justify-end text-white">
                  <div className="text-4xl font-heading font-black mb-2">100%</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest">Fresh Air <br /> Circulation</div>
                </div>
                <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden group">
                  <Image src={aircraft.heroImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <AnimatedElement>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-8 uppercase tracking-widest leading-tight">
              Ready to fly on <br className="hidden md:block" /> the {aircraft.name}?
            </h2>
            <p className="text-lg font-paragraph text-gray-600 mb-12 max-w-2xl mx-auto">
              Contact our charter experts 24/7 to receive a custom quote for your next journey.
            </p>
            <Button 
              onClick={() => navigate('/contact', { state: { aircraft: aircraft.name } })}
              className="bg-primary hover:bg-primary/90 text-white font-heading font-bold uppercase tracking-[0.3em] px-16 py-8 text-base rounded-none shadow-2xl transition-all hover:scale-105"
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
