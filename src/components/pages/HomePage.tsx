// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';

import { Plane, Users, Package, Globe, Phone, ChevronLeft, ChevronRight, Play, ArrowRight, Mail, PhoneCall, MessageSquare } from 'lucide-react';

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

// Enhanced Animated Element for smooth scroll reveals
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

export default function HomePage() {
  const navigate = useNavigate();
  const [charterType, setCharterType] = useState<'passenger' | 'cargo'>('passenger');
  const [activeTab, setActiveTab] = useState<'jets' | 'destinations'>('jets');
  
  const [services, setServices] = useState<any[]>([]);
  const [aircraft, setAircraft] = useState<any[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [blogArticles, setBlogArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setServices([
      { 
        _id: '1', 
        serviceName: 'PRIVATE JET CHARTER', 
        serviceImage: '/assets/services/private_jet_charter.jpg', 
        description: 'Experience unparalleled luxury and flexibility with our private jet services.',
        shortDescription: 'Experience unparalleled luxury and flexibility with our private jet services.'
      },
      { 
        _id: '2', 
        serviceName: 'GROUP CHARTER FLIGHTS', 
        serviceImage: '/assets/services/private_jet_charter.jpg', 
        description: 'Efficient and customized air travel solutions for groups of any size.',
        shortDescription: 'Efficient and customized air travel solutions for groups of any size.'
      },
      { 
        _id: '3', 
        serviceName: 'CARGO CHARTER SERVICES', 
        serviceImage: '/assets/services/cargo_charter.jpg', 
        description: 'Reliable and rapid air freight solutions for urgent or oversized cargo.',
        shortDescription: 'Reliable and rapid air freight solutions for urgent or oversized cargo.'
      },
    ]);
    
    setAircraft([
      { _id: '1', aircraftName: 'Citation M2', passengerCapacity: 7, aircraftImage: '/assets/aircraft/citation_m2.png' },
      { _id: '2', aircraftName: 'Phenom 300E', passengerCapacity: 10, aircraftImage: '/assets/aircraft/phenom_300e.png' },
      { _id: '3', aircraftName: 'Challenger 350', passengerCapacity: 10, aircraftImage: '/assets/aircraft/challenger_350.png' },
      { _id: '4', aircraftName: 'Gulfstream G650ER', passengerCapacity: 19, aircraftImage: '/assets/aircraft/generic_jet.jpg' },
    ]);

    setDestinations([
      { _id: '1', destinationName: 'Aspen', description: 'Nestled in the Rocky Mountains, Aspen is a premier destination for luxury ski vacations and outdoor adventures. Private jet charters offer...', destinationImage: '/assets/destinations/aspen.jpg' },
      { _id: '2', destinationName: 'Maldives', description: 'The Maldives, an archipelago of breathtaking coral islands, is the epitome of luxury tropical escapes. Chartering a private jet is the preferre...', destinationImage: '/assets/destinations/maldives.jpg' },
      { _id: '3', destinationName: 'St. Barts', description: 'Saint Barthélemy, or St. Barts, is a jewel of the Caribbean, renowned for its pristine beaches, gourmet dining, and exclusive atmosphere. Private jet...', destinationImage: '/assets/destinations/st_barts.jpg' },
      { _id: '4', destinationName: 'Mykonos', description: 'Mykonos, a glamorous Greek island in the Aegean Sea, is famous for its vibrant nightlife, stunning beaches, and iconic Cycladic architecture...', destinationImage: '/assets/destinations/mykonos.jpg' },
    ]);

    setBlogArticles([
      { 
        _id: '1', 
        title: 'THE FUTURE OF PRIVATE JET TRAVEL: WHAT TO EXPECT IN THE NEXT DECADE', 
        content: 'Private jet travel is constantly evolving, driven by technological advancements, sustainability initiatives, and changing passenger demands. This article explores emerging trends such as electric aircraft, AI-powered personalized services, and the growing focus on reducing the carbon footprint of private aviation.', 
        mainImage: '/assets/aircraft/generic_jet.jpg' 
      },
      { 
        _id: '2', 
        title: 'NAVIGATING GLOBAL SUPPLY CHAINS: THE CRITICAL ROLE OF AIR CARGO IN MODERN LOGISTICS', 
        content: 'In an increasingly interconnected world, efficient global supply chains are paramount. Air cargo plays a pivotal role, offering speed and reliability unmatched by other transportation methods. This article delves into how businesses are leveraging air freight to overcome supply chain disruptions and meet the demands of a global market.', 
        mainImage: '/assets/services/cargo_charter.jpg' 
      },
      { 
        _id: '3', 
        title: 'TOP 5 EXCLUSIVE DESTINATIONS ACCESSIBLE ONLY BY PRIVATE CHARTER', 
        content: 'Dreaming of an escape to a truly unique and secluded paradise? Private charter flights open up a world of possibilities, granting access to destinations that commercial airlines simply cannot reach. This article unveils five breathtaking locations, from remote island retreats to mountain hideaways, that offer the ultimate in exclusivity and luxury.', 
        mainImage: '/assets/destinations/maldives.jpg' 
      },
    ]);

    setIsLoading(false); 
  };

  const handleInquire = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary">
      <Header />

      {/* Hero Section with Dynamic Flight Landing Carousel */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-r from-primary/90 to-primary/70">
        {/* Dynamic Flight Landing Image Carousel */}
        <div className="absolute inset-0 w-full h-full">
          <ImageCarousel images={[
            '/assets/backgrounds/hero_bg_1.png',
            '/assets/backgrounds/la_bg.jpg',
            '/assets/backgrounds/ny_bg.jpg',
            '/assets/backgrounds/miami_bg.jpg'
          ]} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" /> {/* Enhanced overlay for text readability */}
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <AnimatedElement className="max-w-[450px] bg-white shadow-2xl">
            {/* Form Tabs */}
            <div className="flex w-full">
              <button
                onClick={() => setCharterType('passenger')}
                className={`flex-1 py-4 text-sm font-heading font-bold tracking-wider transition-colors ${
                  charterType === 'passenger' ? 'bg-accent text-white' : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                PASSENGER
              </button>
              <button
                onClick={() => setCharterType('cargo')}
                className={`flex-1 py-4 text-sm font-heading font-bold tracking-wider transition-colors ${
                  charterType === 'cargo' ? 'bg-accent text-white' : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                CARGO
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleInquire} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium">Departure</label>
                  <Input placeholder="City or Airport" className="border-gray-300 rounded-none focus-visible:ring-accent" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium">Destination</label>
                  <Input placeholder="City or Airport" className="border-gray-300 rounded-none focus-visible:ring-accent" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium">Date</label>
                  <Input type="date" className="border-gray-300 rounded-none focus-visible:ring-accent text-gray-600" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-gray-500 font-medium">
                    {charterType === 'passenger' ? 'No. passengers' : 'Weight (kg)'}
                  </label>
                  <Input type="number" min="1" placeholder="0" className="border-gray-300 rounded-none focus-visible:ring-accent" required />
                </div>
              </div>
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-heading font-bold tracking-wider py-6 rounded-none mt-2 transition-transform hover:scale-[1.02]">
                INQUIRE NOW
              </Button>
            </form>
          </AnimatedElement>
        </div>
      </section>


      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary text-center mb-12 uppercase tracking-wide">
              PRIVATE JET, GROUP & CARGO AIRCRAFT CHARTERS
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {isLoading ? (
              // Loading Skeletons
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col items-center">
                  <div className="w-full h-48 bg-gray-200 mb-6"></div>
                  <div className="h-6 w-3/4 bg-gray-200 mb-4"></div>
                  <div className="h-4 w-full bg-gray-200 mb-2"></div>
                  <div className="h-4 w-5/6 bg-gray-200 mb-6"></div>
                  <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
                </div>
              ))
            ) : services.map((service, index) => (
              <AnimatedElement key={service._id} delay={index * 150} className="flex flex-col items-center text-center group">
                <div className="w-full h-56 mb-6 overflow-hidden relative">
                  <Image 
                    src={service.serviceImage} 
                    alt={service.serviceName} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-lg font-heading font-bold text-primary mb-4 uppercase tracking-wide">
                  {service.serviceName}
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed px-4 flex-grow">
                  {service.shortDescription || service.description}
                </p>
                <Link to={`/services`}>
                  <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-2 text-xs font-bold tracking-wider uppercase transition-all hover:shadow-lg hover:-translate-y-1">
                    Learn More
                  </Button>
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-primary text-center mb-12 uppercase tracking-wide">
              WHY CHOOSE RV GLOBAL AVIATION
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
            {[
              { icon: '/assets/icons/globe.svg', number: '35,000+', title: 'Flights per year', desc: 'The largest private charter brokerage in the world.' },
              { icon: '/assets/icons/globe.svg', number: '40+', title: 'Global coverage', desc: '40+ offices across 6 continents.' },
              { icon: '/assets/icons/jet.svg', number: '50,000', title: 'Largest range of aircraft', desc: 'Access to 50,000 aircraft across the globe.' },
              { icon: '/assets/icons/phone.svg', number: '24/7', title: 'Personal service', desc: 'Dedicated account managers available 24/7.' },
            ].map((item, index) => (
              <AnimatedElement key={index} delay={index * 100} className="flex flex-col items-center text-center px-4">
                <div className="h-12 flex items-center justify-center mb-4">
                  <Image src={item.icon} alt={item.title} className="h-10 w-auto opacity-80" />
                </div>
                <div className="text-2xl font-heading font-bold text-primary mb-1">{item.number}</div>
                <h3 className="text-sm font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </AnimatedElement>
            ))}
          </div>

          {/* REAL ID Banner */}
          <AnimatedElement className="max-w-4xl mx-auto bg-primary text-white flex flex-col md:flex-row items-center justify-between p-0 overflow-hidden shadow-xl">
            <div className="w-full md:w-1/3 h-48 md:h-auto relative">
              <Image src="/assets/backgrounds/real_id.png" alt="Real ID" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-2/3 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="text-xl font-light">Are you</span>
                  <Image src="/assets/icons/globe.svg" alt="REAL ID" className="h-6 bg-white px-2 rounded" />
                  <span className="text-xl font-light">ready?</span>
                </div>
                <p className="text-sm text-white/80">Required for all domestic flights since May 2025.</p>
              </div>
              <Button variant="outline" className="border-white text-primary bg-white hover:bg-gray-100 rounded-none px-8 py-2 text-xs font-bold tracking-wider uppercase whitespace-nowrap">
                Learn more
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* About RV Global Aviation Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            {/* Main Content Split */}
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="w-full md:w-1/2">
                <AnimatedElement>
                  <Image src="/assets/backgrounds/owner.jpg" alt="RV Global Aviation" className="w-full h-full object-cover rounded-lg shadow-lg" />
                </AnimatedElement>
              </div>
                <div className="w-full md:w-1/2">
                <AnimatedElement>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6 uppercase tracking-wide">
                    ABOUT RV GLOBAL AVIATION
                  </h2>
                  <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                    RV Global Aviation is a premier aviation solutions provider delivering world-class aircraft charter, cargo logistics, and aviation support services. With a strong global network and customer-first approach, we ensure seamless and efficient operations across continents.
                  </p>
                  <div className="bg-accent/10 border-l-4 border-accent p-6 mb-6">
                    <h3 className="text-lg font-heading font-bold text-primary mb-3 uppercase tracking-wide">OUR MISSION</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      To simplify aviation services while maintaining the highest standards of safety, reliability, and operational excellence.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-primary text-sm uppercase tracking-wide mb-1">Safety First</h4>
                        <p className="text-xs text-gray-600">Unwavering commitment to the highest safety standards in all operations</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-primary text-sm uppercase tracking-wide mb-1">Reliability</h4>
                        <p className="text-xs text-gray-600">Dependable service you can count on, every single time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-xs font-bold">✓</span>
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-primary text-sm uppercase tracking-wide mb-1">Operational Excellence</h4>
                        <p className="text-xs text-gray-600">Continuous improvement and best practices in everything we do</p>
                      </div>
                    </div>
                  </div>
                </AnimatedElement>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section: Jets & Destinations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Tab Headers */}
          <div className="flex flex-col md:flex-row w-full mb-12 shadow-sm">
            <button
              onClick={() => setActiveTab('jets')}
              className={`flex-1 py-4 text-sm font-heading font-bold tracking-wider uppercase transition-all relative ${
                activeTab === 'jets' ? 'bg-accent text-white' : 'bg-gray-100 text-primary hover:bg-gray-200'
              }`}
            >
              Popular Private Jets
              {activeTab === 'jets' && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-accent z-10"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('destinations')}
              className={`flex-1 py-4 text-sm font-heading font-bold tracking-wider uppercase transition-all relative ${
                activeTab === 'destinations' ? 'bg-accent text-white' : 'bg-gray-100 text-primary hover:bg-gray-200'
              }`}
            >
              Popular Destinations
              {activeTab === 'destinations' && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[12px] border-t-accent z-10"></div>
              )}
            </button>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
              </div>
            ) : activeTab === 'jets' ? (
              <AnimatedElement className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {aircraft.map((plane, index) => (
                    <div key={plane._id} className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                      <div className="h-40 overflow-hidden relative">
                        <Image 
                          src={plane.aircraftImage} 
                          alt={plane.aircraftName} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="font-bold text-primary text-sm mb-1">{plane.aircraftName}</h4>
                        <p className="text-xs text-gray-500">Passengers {plane.passengerCapacity}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link to="/aircraft">
                    <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-2 text-xs font-bold tracking-wider uppercase transition-all hover:shadow-lg hover:-translate-y-1">
                      View Aircraft Guide
                    </Button>
                  </Link>
                </div>
              </AnimatedElement>
            ) : (
              <AnimatedElement className="space-y-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {destinations.map((dest, index) => (
                    <div key={dest._id} className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                      <div className="h-40 overflow-hidden relative">
                        <Image 
                          src={dest.destinationImage} 
                          alt={dest.destinationName} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4 text-center flex-grow flex flex-col">
                        <h4 className="font-bold text-primary text-sm mb-2">{dest.destinationName}</h4>
                        <p className="text-xs text-gray-500 line-clamp-4 flex-grow">{dest.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center">
                  <Link to="/destinations">
                    <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-2 text-xs font-bold tracking-wider uppercase transition-all hover:shadow-lg hover:-translate-y-1">
                      Visit Destination Guide
                    </Button>
                  </Link>
                </div>
              </AnimatedElement>
            )}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatedElement>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-primary text-center mb-16 uppercase tracking-widest">
              POPULAR BLOG STORIES
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col items-center">
                  <div className="w-full aspect-video bg-gray-200 mb-6 rounded-lg"></div>
                  <div className="h-6 w-3/4 bg-gray-200 mb-4"></div>
                  <div className="h-20 w-full bg-gray-200 mb-6"></div>
                  <div className="h-10 w-32 bg-gray-200 rounded-full"></div>
                </div>
              ))
            ) : (
              blogArticles.map((article, index) => (
                <AnimatedElement key={article._id} delay={index * 150} className="flex flex-col items-center text-center group">
                  <div className="w-full aspect-video mb-8 overflow-hidden relative rounded-sm shadow-sm">
                    <Image 
                      src={article.mainImage} 
                      alt={article.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-sm md:text-base font-heading font-bold text-primary mb-6 uppercase tracking-wide px-2 leading-tight">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-500 mb-8 leading-relaxed px-2 flex-grow">
                    {article.content}
                  </p>
                  <Link to={`/blog`}>
                    <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-10 py-3 text-xs font-bold tracking-widest uppercase transition-all hover:shadow-lg hover:-translate-y-1">
                      READ MORE
                    </Button>
                  </Link>
                </AnimatedElement>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Contact Strip */}
      <section className="bg-gray-100 border-t border-gray-200">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-200">
            <button onClick={() => window.location.href = 'tel:+918047111000'} className="flex items-center justify-center gap-2 py-6 hover:bg-gray-200 transition-colors text-primary font-bold text-xs uppercase tracking-wider">
              <PhoneCall className="w-4 h-4" /> Call Us
            </button>
            <button onClick={() => window.location.href = 'mailto:info@rvglobalaviation.com'} className="flex items-center justify-center gap-2 py-6 hover:bg-gray-200 transition-colors text-primary font-bold text-xs uppercase tracking-wider">
              <Mail className="w-4 h-4" /> Email Us
            </button>
            <button onClick={() => navigate('/contact')} className="flex items-center justify-center gap-2 py-6 hover:bg-gray-200 transition-colors text-primary font-bold text-xs uppercase tracking-wider">
              <MessageSquare className="w-4 h-4" /> Callback
            </button>
            <button onClick={() => navigate('/contact')} className="flex items-center justify-center gap-2 py-6 bg-accent text-white hover:bg-accent/90 transition-colors font-bold text-xs uppercase tracking-wider">
              <Plane className="w-4 h-4" /> Inquire Now
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}