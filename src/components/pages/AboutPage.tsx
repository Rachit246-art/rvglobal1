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
      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-8">
                Our Journey
              </h2>
              <p className="font-paragraph text-lg text-gray-600 leading-relaxed mb-6">
                RV Global Aviation has grown from humble beginnings to become one of the world&apos;s leading aircraft charter companies. With over 35,000 flights per year, we have established ourselves as the largest private charter brokerage globally.
              </p>
              <p className="font-paragraph text-lg text-gray-600 leading-relaxed mb-6">
                Our commitment to excellence, personalized service, and global reach has made us the preferred choice for discerning travelers and businesses worldwide. We take pride in our ability to provide tailored solutions for every charter need, from private jets to cargo aircraft.
              </p>
              <p className="font-paragraph text-lg text-gray-600 leading-relaxed">
                With 40+ offices across 6 continents and access to 50,000 aircraft worldwide, we ensure that no matter where you need to go, we can get you there safely, efficiently, and in style.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: TrendingUp, number: '35,000+', label: 'Flights Annually', color: 'text-accent' },
              { icon: Globe, number: '40+', label: 'Global Offices', color: 'text-accent' },
              { icon: Users, number: '50,000', label: 'Aircraft Access', color: 'text-accent' },
              { icon: Award, number: '30+', label: 'Years Experience', color: 'text-accent' },
            ].map((stat, index) => (
              <AnimatedElement key={index} className={`delay-${index * 100}`}>
                <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-4xl font-heading font-bold text-primary mb-2">{stat.number}</div>
                  <p className="font-paragraph text-gray-600">{stat.label}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>
      {/* Team Section */}
      {teamMembers.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
                Meet Our Team
              </h2>
            </AnimatedElement>

            <div className="min-h-[400px]">
              {isLoading ? null : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.map((member, index) => (
                    <AnimatedElement key={member._id} className={`delay-${(index % 3) * 100}`}>
                      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                        {member.photo && (
                          <div className="relative h-64 overflow-hidden">

                          </div>
                        )}
                        <div className="p-6">

                          <p className="text-accent font-paragraph font-medium mb-3">
                            {member.role}
                          </p>
                          <p className="font-paragraph text-sm text-gray-600 mb-4 line-clamp-4">
                            {member.bio}
                          </p>
                          {member.linkedinProfile && (
                            <a 
                              href={member.linkedinProfile} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-accent hover:text-accent/80 transition-colors"
                            >

                            </a>
                          )}
                        </div>
                      </div>
                    </AnimatedElement>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}
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
                              <p>{office.city}, {office.country}</p>
                            </div>
                          </div>
                          
                          {office.phoneNumber && (
                            <div className="flex items-center text-gray-600">
                              <Phone className="w-4 h-4 mr-2 text-accent" />
                              <a href={`tel:${office.phoneNumber}`} className="font-paragraph text-sm hover:text-accent transition-colors">
                                {office.phoneNumber}
                              </a>
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
