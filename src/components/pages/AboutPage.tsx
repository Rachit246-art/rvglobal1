import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

import { Globe, Award, Users, TrendingUp, MapPin, Mail, ChevronLeft, ChevronRight, CheckCircle, Shield } from 'lucide-react';

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/20">
        <div className="absolute inset-0 w-full h-full">
          <ImageCarousel images={[
            '/assets/backgrounds/about_hero.jpg',
            '/assets/backgrounds/la_bg.jpg',
            '/assets/backgrounds/team.jpg'
          ]} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <AnimatedElement>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wider">
              About Us
            </h1>
            <p className="text-lg md:text-xl font-paragraph text-white/90 max-w-3xl mx-auto leading-relaxed">
              Leading the way in private aircraft charter with over 30 years of excellence
            </p>
          </AnimatedElement>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8 uppercase tracking-wide">
                About RV Global Aviation
              </h2>
              <div className="space-y-6 text-lg font-paragraph text-gray-600 leading-relaxed">
                <p>
                  RV Global Aviation is a dynamic aviation company focused on delivering customized solutions to meet diverse client requirements. With expertise in aviation logistics, charter services, and consultancy, we bridge the gap between complex aviation needs and efficient execution.
                </p>
                <p>
                  We are backed by industry professionals with deep knowledge in aircraft operations, regulatory compliance, and global aviation markets. Our strong partnerships with operators worldwide enable us to provide flexible and cost-effective solutions.
                </p>
              </div>
            </AnimatedElement>
          </div>

          {/* Vision & Mission */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
            <AnimatedElement className="h-full">
              <div className="bg-white p-10 rounded-3xl h-full border border-gray-100 shadow-xl hover:shadow-2xl transition-all">
                <h3 className="text-2xl font-heading font-bold text-accent mb-6 uppercase tracking-wide border-b pb-4">Vision</h3>
                <p className="text-gray-600 font-paragraph text-lg leading-relaxed">
                  To become a globally recognized aviation service provider known for reliability, innovation, and customer satisfaction.
                </p>
              </div>
            </AnimatedElement>
            <AnimatedElement className="h-full delay-100">
              <div className="bg-white p-10 rounded-3xl h-full border border-gray-100 shadow-xl hover:shadow-2xl transition-all">
                <h3 className="text-2xl font-heading font-bold text-accent mb-6 uppercase tracking-wide border-b pb-4">Mission</h3>
                <ul className="space-y-4 text-gray-600 font-paragraph text-base">
                  {[
                    'Deliver safe, efficient, and timely aviation solutions',
                    'Build long-term relationships with clients and partners',
                    'Continuously innovate and improve aviation services',
                    'Maintain the highest standards of safety and compliance'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-accent mr-3 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedElement>
          </div>

          {/* Our Services */}
          <div className="mb-24">
            <AnimatedElement className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#475569] tracking-tight">
                Our Services
              </h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {[
                { 
                  title: 'Aircraft Charter Services', 
                  desc: 'We provide private jet, business jet, and group charter solutions tailored to client needs. Whether for business travel, VIP movement, or emergency evacuation, we ensure comfort and efficiency.' 
                },
                { 
                  title: 'Air Cargo Solutions', 
                  desc: 'We specialize in transporting time-sensitive, oversized, and high-value cargo globally. Our cargo services cater to industries requiring urgent and reliable logistics support.' 
                },
                { 
                  title: 'Aircraft Management', 
                  desc: 'End-to-end aircraft management services including maintenance coordination, crew management, and operational oversight.' 
                },
                { 
                  title: 'Aviation Consulting', 
                  desc: 'We offer strategic consulting services including route planning, cost optimization, regulatory guidance, and aviation project management.' 
                }
              ].map((service, i) => (
                <AnimatedElement key={i} className={`delay-${i * 100}`}>
                  <div className="bg-[#F0F7FF] rounded-[2rem] p-10 h-full border border-[#E0EFFF] hover:shadow-lg transition-all duration-300">
                    <h4 className="text-2xl font-heading font-bold text-[#475569] mb-4">{service.title}</h4>
                    <p className="text-[#64748B] font-paragraph text-base leading-relaxed">{service.desc}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>

          {/* Industries We Serve */}
          <div className="mb-24">
            <AnimatedElement className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary uppercase tracking-wide">
                Industries We Serve
              </h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Oil & Gas - Logistics for remote and offshore operations',
                'Pharmaceuticals - Temperature-sensitive cargo handling',
                'Automotive - Urgent spare parts transportation',
                'Government & Defense - Secure and mission-critical operations',
                'Healthcare - Medical evacuation and emergency response',
                'Manufacturing - Supply chain and logistics support'
              ].map((industry, i) => (
                <AnimatedElement key={i} className={`delay-${i * 50}`}>
                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <CheckCircle className="w-5 h-5 text-accent mr-4 flex-shrink-0" />
                    <span className="font-paragraph text-gray-700">{industry}</span>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>

          {/* Operational Strengths */}
          <div className="mb-24">
            <AnimatedElement className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary uppercase tracking-wide">
                Operational Strengths
              </h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Global Network of Operators',
                '24/7 Customer Support',
                'Quick Response Time',
                'Cost-Effective Solutions',
                'Flexible Charter Options',
                'Strong Industry Relationships'
              ].map((strength, i) => (
                <AnimatedElement key={i} className={`delay-${i * 50}`}>
                  <div className="bg-primary/5 p-5 rounded-xl border-l-4 border-accent flex items-center">
                    <Award className="w-5 h-5 text-accent mr-4 flex-shrink-0" />
                    <span className="font-heading font-bold text-primary text-sm uppercase tracking-wider">{strength}</span>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>

          {/* Safety & Compliance */}
          <div className="mb-24">
            <AnimatedElement className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#475569] mb-6 tracking-tight">
                Safety & Compliance
              </h2>
              <p className="text-[#64748B] font-paragraph text-lg max-w-3xl mx-auto leading-relaxed">
                Safety is at the core of everything we do. RV Global Aviation strictly adheres to international aviation standards and regulations.
              </p>
            </AnimatedElement>

            <AnimatedElement>
              <div className="bg-white rounded-[2rem] p-12 md:p-16 shadow-lg border border-[#F1F5F9] max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-12 mb-12">
                  {[
                    'Certified aircraft and operators',
                    'Compliance with global aviation authorities',
                    'Continuous monitoring and risk assessment',
                    'Experienced and trained crew'
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="bg-[#58A9E1] text-white w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <span className="font-paragraph text-[#64748B] text-lg">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#F1F5F9] pt-8 text-center">
                  <p className="text-[#94A3B8] font-paragraph text-base italic">
                    Our commitment to safety ensures peace of mind for our clients in every operation.
                  </p>
                </div>
              </div>
            </AnimatedElement>
          </div>

          {/* Why Choose */}
          <div className="mb-24">
            <AnimatedElement className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary uppercase tracking-wide">
                Why Choose RV Global Aviation
              </h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Reliable and professional service',
                'Customized solutions for every client',
                'Strong global presence',
                'Transparent pricing',
                'High safety standards',
                'Experienced aviation team'
              ].map((reason, i) => (
                <AnimatedElement key={i} className={`delay-${i * 50}`}>
                  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center">
                    <Globe className="w-5 h-5 text-accent mr-4 flex-shrink-0" />
                    <span className="font-heading font-bold text-primary text-sm uppercase tracking-wider">{reason}</span>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>

          {/* Future Expansion */}
          <div className="mb-24">
            <AnimatedElement className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#475569] mb-6 tracking-tight">
                Future Expansion
              </h2>
              <p className="text-[#64748B] font-paragraph text-lg max-w-3xl mx-auto leading-relaxed">
                RV Global Aviation aims to expand its footprint globally by:
              </p>
            </AnimatedElement>

            <AnimatedElement>
              <div className="bg-white rounded-[2rem] p-12 md:p-16 shadow-lg border border-[#F1F5F9] max-w-4xl mx-auto">
                <ul className="space-y-6">
                  {[
                    'Strengthening partnerships with international operators',
                    'Expanding cargo and logistics capabilities',
                    'Entering new aviation markets',
                    'Leveraging technology for smarter aviation solutions'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-6">
                      <div className="text-[#58A9E1] flex-shrink-0">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <span className="font-paragraph text-[#64748B] text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedElement>
          </div>

          {/* Global Offices */}
          <div className="mb-24">
            <AnimatedElement className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary uppercase tracking-wide">
                Our Global Offices
              </h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { city: 'London Branch', address: 'Level 4, Rex House, 4-12 Regent St., London SW1Y 4PE, UK' },
                { city: 'United Arab Emirates Branch', address: 'Level 1, C1, S Z Road, Trade Centre Dubai' },
                { city: 'New Zealand', address: 'Level 31/6 Gilmer, Terrace, Wellington central, Wellington NZ' },
                { city: 'Bangalore Head Office', address: 'Level 11, Prestige Trade Tower, No. 46 Palace Road, Sampangi Rama Nagar, Bangalore, Karnataka 560001, India' }
              ].map((office, i) => (
                <AnimatedElement key={i}>
                  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg h-full hover:shadow-xl transition-all">
                    <h4 className="text-xl font-heading font-bold text-primary mb-4">{office.city}</h4>
                    <div className="flex items-start text-gray-600 mb-4">
                      <MapPin className="w-4 h-4 text-accent mr-3 mt-1 flex-shrink-0" />
                      <p className="font-paragraph text-sm">{office.address}</p>
                    </div>
                    <div className="flex items-center text-gray-600 mb-6">
                      <Mail className="w-4 h-4 text-accent mr-3" />
                      <p className="font-paragraph text-sm">info@rvglobalaviation.com</p>
                    </div>
                    <button className="text-accent font-heading font-bold text-xs uppercase tracking-widest hover:underline">
                      View on Map →
                    </button>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-[#64748B] via-[#94A3B8] to-[#CBD5E1] text-white text-center">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6 tracking-tight">
              Experience the Difference
            </h2>
            <p className="text-xl font-paragraph text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied clients who trust us with their charter needs
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-[#475569] hover:bg-white/90 font-heading font-bold uppercase tracking-widest px-12 py-5 rounded-xl shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              Get Started Today
            </button>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </div>
  );
}
