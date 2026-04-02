import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { TeamMembers, OfficeLocations } from '@/entities';
import { Globe, Award, Users, TrendingUp, MapPin, Phone, Mail, Linkedin, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [offices, setOffices] = useState<OfficeLocations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [teamData, officesData] = await Promise.all([
        BaseCrudService.getAll<TeamMembers>('teammembers'),
        BaseCrudService.getAll<OfficeLocations>('officelocations'),
      ]);
      setTeamMembers(teamData.items);
      setOffices(officesData.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section with Image Carousel */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/20">
        <div className="absolute inset-0 w-full h-full">
          <ImageCarousel images={[
            'https://images.aircharterservice.com/global/home/acs-chris-leach.jpg',
            'https://images.aircharterservice.com/global/home/acs-process.jpg',
            'https://images.aircharterservice.com/global/us-real-id/real-id-img.png'
          ]} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            About Us
          </h1>
          <p className="text-lg md:text-xl font-paragraph text-white/90 max-w-3xl mx-auto">
            Leading the way in private aircraft charter with over 30 years of excellence
          </p>
        </div>
      </section>
      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-8">
                About RV Global Aviation
              </h2>
              <p className="font-paragraph text-lg text-gray-600 leading-relaxed mb-6">
                RV Global Aviation is a dynamic aviation company focused on delivering customized solutions to meet diverse client requirements. With expertise in aviation logistics, charter services, and consultancy, we bridge the gap between complex aviation needs and efficient execution.
              </p>
              <p className="font-paragraph text-lg text-gray-600 leading-relaxed">
                We are backed by industry professionals with deep knowledge in aircraft operations, regulatory compliance, and global aviation markets. Our strong partnerships with operators worldwide enable us to provide flexible and cost-effective solutions.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
                Vision & Mission
              </h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <AnimatedElement>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-heading font-bold text-accent mb-4">Vision</h3>
                  <p className="font-paragraph text-gray-600 leading-relaxed">
                    To become a globally recognized aviation service provider known for reliability, innovation, and customer satisfaction.
                  </p>
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-heading font-bold text-accent mb-4">Mission</h3>
                  <ul className="space-y-3 font-paragraph text-gray-600">
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-3">•</span>
                      <span>Deliver safe, efficient, and timely aviation solutions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-3">•</span>
                      <span>Build long-term relationships with clients and partners</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-3">•</span>
                      <span>Continuously innovate and improve aviation services</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent font-bold mr-3">•</span>
                      <span>Maintain the highest standards of safety and compliance</span>
                    </li>
                  </ul>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>
      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
                Our Services
              </h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedElement>
                <div className="bg-gradient-to-br from-accent/10 to-transparent rounded-2xl p-8 border border-accent/20">
                  <h3 className="text-xl font-heading font-bold text-primary mb-3">Aircraft Charter Services</h3>
                  <p className="font-paragraph text-gray-600">
                    We provide private jet, business jet, and group charter solutions tailored to client needs. Whether for business travel, VIP movement, or emergency evacuation, we ensure comfort and efficiency.
                  </p>
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <div className="bg-gradient-to-br from-accent/10 to-transparent rounded-2xl p-8 border border-accent/20">
                  <h3 className="text-xl font-heading font-bold text-primary mb-3">Air Cargo Solutions</h3>
                  <p className="font-paragraph text-gray-600">
                    We specialize in transporting time-sensitive, oversized, and high-value cargo globally. Our cargo services cater to industries requiring urgent and reliable logistics support.
                  </p>
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <div className="bg-gradient-to-br from-accent/10 to-transparent rounded-2xl p-8 border border-accent/20">
                  <h3 className="text-xl font-heading font-bold text-primary mb-3">Aircraft Management</h3>
                  <p className="font-paragraph text-gray-600">
                    End-to-end aircraft management services including maintenance coordination, crew management, and operational oversight.
                  </p>
                </div>
              </AnimatedElement>
              <AnimatedElement>
                <div className="bg-gradient-to-br from-accent/10 to-transparent rounded-2xl p-8 border border-accent/20">
                  <h3 className="text-xl font-heading font-bold text-primary mb-3">Aviation Consulting</h3>
                  <p className="font-paragraph text-gray-600">
                    We offer strategic consulting services including route planning, cost optimization, regulatory guidance, and aviation project management.
                  </p>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </section>
      {/* Industries We Serve */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
                Industries We Serve
              </h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Oil & Gas – Logistics for remote and offshore operations',
                'Pharmaceuticals – Temperature-sensitive cargo handling',
                'Automotive – Urgent spare parts transportation',
                'Government & Defense – Secure and mission-critical operations',
                'Healthcare – Medical evacuation and emergency response',
                'Manufacturing – Supply chain and logistics support'
              ].map((industry, index) => (
                <AnimatedElement key={index}>
                  <div className="flex items-start bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                    <span className="text-accent font-bold text-xl mr-4 flex-shrink-0">✓</span>
                    <p className="font-paragraph text-gray-600">{industry}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Operational Strengths */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
                Operational Strengths
              </h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Global Network of Operators',
                '24/7 Customer Support',
                'Quick Response Time',
                'Cost-Effective Solutions',
                'Flexible Charter Options',
                'Strong Industry Relationships'
              ].map((strength, index) => (
                <AnimatedElement key={index}>
                  <div className="flex items-center bg-gradient-to-r from-accent/10 to-transparent rounded-lg p-6 border-l-4 border-accent">
                    <Award className="w-6 h-6 text-accent mr-4 flex-shrink-0" />
                    <p className="font-paragraph font-medium text-gray-700">{strength}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Safety & Compliance */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-8">
                Safety & Compliance
              </h2>
              <p className="font-paragraph text-lg text-gray-600 leading-relaxed text-center mb-8">
                Safety is at the core of everything we do. RV Global Aviation strictly adheres to international aviation standards and regulations.
              </p>
            </AnimatedElement>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  'Certified aircraft and operators',
                  'Compliance with global aviation authorities',
                  'Continuous monitoring and risk assessment',
                  'Experienced and trained crew'
                ].map((item, index) => (
                  <AnimatedElement key={index}>
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-md bg-accent text-white">
                          ✓
                        </div>
                      </div>
                      <p className="ml-4 font-paragraph text-gray-600">{item}</p>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
              <p className="font-paragraph text-gray-600 text-center mt-8 pt-8 border-t border-gray-200">
                Our commitment to safety ensures peace of mind for our clients in every operation.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
                Why Choose RV Global Aviation
              </h2>
            </AnimatedElement>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                'Reliable and professional service',
                'Customized solutions for every client',
                'Strong global presence',
                'Transparent pricing',
                'High safety standards',
                'Experienced aviation team'
              ].map((reason, index) => (
                <AnimatedElement key={index}>
                  <div className="flex items-center bg-gradient-to-r from-primary/5 to-transparent rounded-lg p-6 border border-primary/10">
                    <Globe className="w-6 h-6 text-accent mr-4 flex-shrink-0" />
                    <p className="font-paragraph font-medium text-gray-700">{reason}</p>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* Future Expansion */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-8">
                Future Expansion
              </h2>
              <p className="font-paragraph text-lg text-gray-600 leading-relaxed text-center mb-8">
                RV Global Aviation aims to expand its footprint globally by:
              </p>
            </AnimatedElement>
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
              <ul className="space-y-4">
                {[
                  'Strengthening partnerships with international operators',
                  'Expanding cargo and logistics capabilities',
                  'Entering new aviation markets',
                  'Leveraging technology for smarter aviation solutions'
                ].map((item, index) => (
                  <AnimatedElement key={index}>
                    <div className="flex items-start">
                      <TrendingUp className="w-5 h-5 text-accent mr-4 flex-shrink-0 mt-1" />
                      <p className="font-paragraph text-gray-600">{item}</p>
                    </div>
                  </AnimatedElement>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Team Section */}

      {/* Office Locations */}
      {offices.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
                Our Global Offices
              </h2>
            </AnimatedElement>

            <div className="min-h-[400px]">
              {isLoading ? null : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {offices.map((office, index) => (
                    <AnimatedElement key={office._id} className={`delay-${(index % 3) * 100}`}>
                      <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                        <h3 className="text-lg font-heading font-bold text-primary mb-3">
                          {office.officeName}
                        </h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-start text-gray-600">
                            <MapPin className="w-4 h-4 mr-2 flex-shrink-0 mt-1 text-accent" />
                            <div className="font-paragraph text-sm">
                              <p>{office.address}</p>

                            </div>
                          </div>
                          
                          {office.phoneNumber && (
                            <div className="flex items-center text-gray-600">

                            </div>
                          )}
                          
                          {office.email && (
                            <div className="flex items-center text-gray-600">
                              <Mail className="w-4 h-4 mr-2 text-accent" />
                              <a href={`mailto:${office.email}`} className="font-paragraph text-sm hover:text-accent transition-colors">
                                {office.email}
                              </a>
                            </div>
                          )}
                        </div>

                        {office.mapUrl && (
                          <a 
                            href={office.mapUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-accent hover:text-accent/80 font-paragraph text-sm font-medium transition-colors"
                          >
                            View on Map →
                          </a>
                        )}
                      </div>
                    </AnimatedElement>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent/20">
        <div className="container mx-auto px-4 text-center">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Experience the Difference
            </h2>
            <p className="text-lg font-paragraph text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who trust us with their charter needs
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-primary hover:bg-gray-100 font-paragraph font-medium px-8 py-6 text-lg rounded-lg transition-colors"
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
