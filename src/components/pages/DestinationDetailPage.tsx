import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { destinationsData, DestinationDetail } from '@/lib/destinations-data';
import { MapPin, Globe, Plane, Clock, ArrowRight, CheckCircle, Navigation } from 'lucide-react';

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

export default function DestinationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [dest, setDest] = useState<DestinationDetail | null>(null);

  useEffect(() => {
    if (id && destinationsData[id]) {
      setDest(destinationsData[id]);
    } else {
      navigate('/destinations');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!dest) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <Image src={dest.heroImage} alt={dest.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6">
          <AnimatedElement className="max-w-4xl">
            <div className="flex items-center gap-3 text-accent font-heading font-bold uppercase tracking-[0.4em] mb-6">
              <MapPin className="w-5 h-5" />
              <span>{dest.country}</span>
              {dest.iataCode && <span className="ml-2 border border-accent/30 px-2 py-0.5 rounded text-xs">{dest.iataCode}</span>}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold text-white mb-8 leading-none">
              {dest.name}
            </h1>
            <p className="text-xl md:text-2xl font-paragraph text-white/90 mb-12 max-w-2xl leading-relaxed">
              Experience the world&apos;s most exclusive destination with a bespoke private jet charter tailored to your journey.
            </p>
            <Button 
              onClick={() => navigate('/contact', { state: { destination: dest.name } })}
              className="bg-accent hover:bg-accent/90 text-white font-heading font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] px-8 md:px-16 py-5 md:py-8 text-xs md:text-sm rounded-none shadow-2xl transition-all hover:scale-105 w-full md:w-auto"
            >
              Charter to {dest.name}
            </Button>
          </AnimatedElement>
        </div>
      </section>

      {/* Overview & Description */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <AnimatedElement>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-8 uppercase tracking-widest leading-tight">
                About Your <br /> Destination
              </h2>
              <div className="w-20 h-1.5 bg-accent mb-10" />
              <p className="text-lg md:text-xl font-paragraph text-gray-700 mb-8 leading-relaxed italic">
                &quot;{dest.description}&quot;
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
                {dest.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <p className="font-paragraph text-gray-800 text-sm md:text-base font-medium">{highlight}</p>
                  </div>
                ))}
              </div>
            </AnimatedElement>

            <AnimatedElement delay={200}>
              <div className="relative group">
                <Image src={dest.mainImage} alt={dest.name} className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]" />
                <div className="absolute -bottom-10 -left-10 bg-primary p-10 rounded-[2rem] text-white shadow-xl hidden md:block">
                  <div className="text-4xl font-heading font-black text-accent mb-2">24/7</div>
                  <div className="text-xs uppercase tracking-widest font-bold text-white/60">Concierge <br /> Support</div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <AnimatedElement className="max-w-xl">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-6 uppercase tracking-widest leading-tight">
                Popular Charter <br /> Routes
              </h2>
              <p className="text-gray-500 font-paragraph">
                The most frequent flight paths taken by our clients to reach this exclusive destination.
              </p>
            </AnimatedElement>
            <AnimatedElement delay={200}>
              <Button 
                onClick={() => navigate('/contact')}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white rounded-none px-10 py-6 font-heading font-bold uppercase tracking-widest text-xs"
              >
                Custom Route Request
              </Button>
            </AnimatedElement>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {dest.popularRoutes.map((route, i) => (
              <AnimatedElement key={i} delay={i * 150}>
                <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 group border border-gray-100">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-accent/5 flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                      <Plane className="w-7 h-7 text-accent group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div className="h-px flex-grow bg-gray-100" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-primary uppercase tracking-wide mb-2 group-hover:text-accent transition-colors">
                    {route}
                  </h3>
                  <div className="text-xs font-paragraph text-gray-400 uppercase tracking-widest font-bold">Recommended Fleet: Heavy Jet</div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Big Content Sections */}
      {dest.content.map((section, idx) => (
        <section key={idx} className={`py-32 ${idx % 2 === 1 ? 'bg-primary text-white' : 'bg-white text-primary'}`}>
          <div className="container mx-auto px-6">
            <div className={`flex flex-col ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-24 items-center`}>
              <AnimatedElement className="lg:w-1/2">
                <Image src={section.image} alt={section.title} className="w-full h-[600px] object-cover rounded-[4rem] shadow-2xl" />
              </AnimatedElement>
              <AnimatedElement className="lg:w-1/2" delay={200}>
                <h2 className={`text-4xl md:text-6xl font-heading font-bold mb-10 uppercase tracking-tighter leading-tight ${idx % 2 === 1 ? 'text-white' : 'text-primary'}`}>
                  {section.title}
                </h2>
                <div className={`w-24 h-2 mb-10 ${idx % 2 === 1 ? 'bg-accent' : 'bg-accent'}`} />
                <p className={`text-lg md:text-xl font-paragraph leading-relaxed mb-12 ${idx % 2 === 1 ? 'text-white/80' : 'text-gray-600'}`}>
                  {section.text}
                </p>
                <Button 
                  onClick={() => navigate('/contact')}
                  className={`${idx % 2 === 1 ? 'bg-white text-primary hover:bg-gray-100' : 'bg-primary text-white hover:bg-primary/90'} font-heading font-bold uppercase tracking-widest px-12 py-7 rounded-none transition-all hover:scale-105`}
                >
                  Plan Your Trip <ArrowRight className="ml-3 w-5 h-5" />
                </Button>
              </AnimatedElement>
            </div>
          </div>
        </section>
      ))}

      {/* Airport Information */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 uppercase tracking-widest">
              Aviation Logistics
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {dest.airportInfo.map((airport, i) => (
              <AnimatedElement key={i} delay={i * 200}>
                <div className="bg-white/5 border border-white/10 p-12 rounded-[3rem] h-full hover:bg-white/10 transition-colors duration-500">
                  <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                      <Navigation className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold uppercase tracking-tight text-accent">
                        {airport.name}
                      </h3>
                      <div className="text-white/40 font-paragraph text-sm">{airport.distance}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {airport.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <CheckCircle className="w-4 h-4 text-accent" />
                        <span className="font-paragraph text-white/80 text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-accent relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <AnimatedElement>
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-10 uppercase tracking-widest leading-none">
              Your World, <br /> Your Way.
            </h2>
            <p className="text-xl md:text-2xl font-paragraph text-white/90 mb-16 max-w-3xl mx-auto leading-relaxed">
              From the moment you book until you arrive at your final destination, we manage every detail with the precision and excellence you deserve.
            </p>
            <Button 
              onClick={() => navigate('/contact', { state: { destination: dest.name } })}
              className="bg-white text-primary hover:bg-gray-100 font-heading font-bold uppercase tracking-[0.2em] md:tracking-[0.4em] px-8 md:px-20 py-5 md:py-10 text-sm md:text-base rounded-none shadow-2xl transition-all hover:scale-105 w-full md:w-auto"
            >
              Start Your Journey <ArrowRight className="ml-4 w-6 h-6" />
            </Button>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
