import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Calendar, Info, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

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

export default function RealIDPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 opacity-20">
          <Image src="/assets/backgrounds/real_id.png" alt="Real ID Background" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 container mx-auto px-6 text-center">
          <AnimatedElement>
            <div className="flex justify-center mb-6">
              <div className="bg-white p-4 rounded-xl shadow-2xl">
                <ShieldCheck className="w-12 h-12 text-accent" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-4">
              REAL ID Compliance
            </h1>
            <p className="text-xl font-paragraph text-white/80 max-w-2xl mx-auto">
              Everything you need to know about the new federal requirements for domestic air travel.
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <div className="bg-accent/5 border-l-4 border-accent p-8 rounded-r-2xl mb-12 flex items-start gap-6">
                <AlertTriangle className="w-8 h-8 text-accent shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-heading font-bold text-primary mb-2 uppercase tracking-wide">Deadline: May 7, 2025</h2>
                  <p className="font-paragraph text-gray-700 leading-relaxed">
                    Starting May 7, 2025, every air traveler 18 years of age and older will need a REAL ID-compliant license or another acceptable form of ID for domestic air travel within the United States.
                  </p>
                </div>
              </div>

              <div className="space-y-16">
                {/* What is REAL ID */}
                <div>
                  <h3 className="text-3xl font-heading font-bold text-primary mb-6">What is REAL ID?</h3>
                  <div className="font-paragraph text-gray-700 leading-relaxed space-y-4 text-lg">
                    <p>
                      The REAL ID Act, passed by Congress in 2005, enacted the 9/11 Commission's recommendation that the Federal Government “set standards for the issuance of sources of identification, such as driver's licenses.”
                    </p>
                    <p>
                      REAL ID-compliant cards are marked with a star at the top of the card. If you're not sure, contact your state driver's license agency on how to obtain a REAL ID compliant card.
                    </p>
                  </div>
                </div>

                {/* How to prepare */}
                <div>
                  <h3 className="text-3xl font-heading font-bold text-primary mb-6">How to Prepare for Your Flight</h3>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 className="w-6 h-6 text-accent" />
                      </div>
                      <h4 className="text-lg font-heading font-bold text-primary mb-3">Check Your Current ID</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Look for the star symbol in the upper right-hand corner of your driver's license. If it's missing, you may need an update.
                      </p>
                    </div>
                    <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                        <Calendar className="w-6 h-6 text-accent" />
                      </div>
                      <h4 className="text-lg font-heading font-bold text-primary mb-3">Schedule an Appointment</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Don't wait until the last minute. DMV wait times are expected to increase as the deadline approaches.
                      </p>
                    </div>
                  </div>
                </div>

                {/* FAQ Snippet */}
                <div className="p-10 bg-gray-50 rounded-3xl border border-gray-100">
                  <h3 className="text-2xl font-heading font-bold text-primary mb-8">Frequently Asked Questions</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-primary mb-2">Do I need a REAL ID for private charter?</h4>
                      <p className="text-gray-600 text-sm">Yes. Federal regulations for identity verification at FBOs (Fixed Base Operators) will align with standard airport security protocols regarding REAL ID compliance.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-primary mb-2">Can I still use my Passport?</h4>
                      <p className="text-gray-600 text-sm">Yes. A valid U.S. passport is an acceptable form of identification for domestic travel and is REAL ID compliant.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="mt-20 text-center">
                <h3 className="text-2xl font-heading font-bold text-primary mb-8">Need more information about your upcoming travel?</h3>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="bg-accent text-white hover:bg-accent/90 px-8 py-6 rounded-none font-heading font-bold uppercase tracking-widest text-xs"
                  >
                    Contact Our Support Team
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => window.open('https://www.tsa.gov/real-id', '_blank')}
                    className="border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 rounded-none font-heading font-bold uppercase tracking-widest text-xs transition-all"
                  >
                    Official TSA Website <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
