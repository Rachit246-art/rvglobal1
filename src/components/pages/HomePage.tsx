// WI-HPI
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { CharterServices, AircraftGuide, DestinationGuides, BlogArticles } from '@/entities';
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
  
  const [services, setServices] = useState<CharterServices[]>([]);
  const [aircraft, setAircraft] = useState<AircraftGuide[]>([]);
  const [destinations, setDestinations] = useState<DestinationGuides[]>([]);
  const [blogArticles, setBlogArticles] = useState<BlogArticles[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [servicesData, aircraftData, destinationsData, blogData] = await Promise.all([
        BaseCrudService.getAll<CharterServices>('charterservices', {}, { limit: 3 }),
        BaseCrudService.getAll<AircraftGuide>('aircraftguide', {}, { limit: 4 }),
        BaseCrudService.getAll<DestinationGuides>('destinationguides', {}, { limit: 4 }),
        BaseCrudService.getAll<BlogArticles>('blogarticles', {}, { limit: 3 }),
      ]);
      setServices(servicesData.items);
      setAircraft(aircraftData.items);
      setDestinations(destinationsData.items);
      setBlogArticles(blogData.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInquire = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/contact');
  };

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary">
      <Header />

      {/* Hero Section with Dynamic Flight Landing */}
      <section className="relative min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-r from-primary/90 to-primary/70">
        {/* Video Background with Flight Landing Animation */}
        <div className="absolute inset-0 w-full h-full">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="https://videos.pexels.com/video-files/3571937/3571937-sd_640_360_30fps.mp4" type="video/mp4" />
          </video>
          {/* Fallback Image */}
          <Image 
            src="https://static.wixstatic.com/media/41cdae_a8be753691854c67a2c4452b2dacbd32~mv2.jpeg"
            alt="Aviation Hero Background"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
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
            ) : services.length > 0 ? (
              services.map((service, index) => (
                <AnimatedElement key={service._id} delay={index * 150} className="flex flex-col items-center text-center group">
                  <div className="w-full h-56 mb-6 overflow-hidden relative">
                    <Image 
                      src={service.serviceImage || 'https://static.wixstatic.com/media/41cdae_3413f7a4474b49b2ab4b94c44ce664d6~mv2.png?originWidth=384&originHeight=192'} 
                      alt={service.serviceName || 'Service'} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-4 uppercase tracking-wide">
                    {service.serviceName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed px-4 flex-grow">
                    {service.shortDescription || service.description?.substring(0, 120) + '...'}
                  </p>
                  <Link to={`/services/${service._id}`}>
                    <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-2 text-xs font-bold tracking-wider uppercase transition-all hover:shadow-lg hover:-translate-y-1">
                      Learn More
                    </Button>
                  </Link>
                </AnimatedElement>
              ))
            ) : (
              // Fallback static content if DB is empty
              [
                { title: 'PRIVATE JET CHARTER', img: 'https://images.aircharterservice.com/global/spotlight/private-charter.jpg', desc: 'RV Global Aviation can offer helicopters, private jets and executive airliner charters, as well as a huge range of small specialist aircraft for all business and leisure purposes.' },
                { title: 'GROUP AIRCRAFT CHARTER', img: 'https://images.aircharterservice.com/global/spotlight/group-charter.jpg', desc: 'RV Global Aviation can arrange charters for larger groups of passengers on aircraft including regional jet airliners and turboprops, VIP & executive airliners, as well as narrow and wide-body airliners.' },
                { title: 'CARGO AIRCRAFT CHARTER', img: 'https://images.aircharterservice.com/global/spotlight/cargo-charter.jpg', desc: 'Our award winning cargo department offers a full range of cargo aircraft and helicopters, from shipment of small urgent packages to large, heavy outsize consignments.' }
              ].map((item, index) => (
                <AnimatedElement key={index} delay={index * 150} className="flex flex-col items-center text-center group">
                  <div className="w-full h-56 mb-6 overflow-hidden relative">
                    <Image src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-4 uppercase tracking-wide">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed px-4 flex-grow">{item.desc}</p>
                  <Link to="/services">
                    <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-2 text-xs font-bold tracking-wider uppercase transition-all hover:shadow-lg hover:-translate-y-1">
                      Learn More
                    </Button>
                  </Link>
                </AnimatedElement>
              ))
            )}
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
              { icon: 'https://images.aircharterservice.com/icons/ico_globe.svg', number: '35,000+', title: 'Flights per year', desc: 'The largest private charter brokerage in the world.' },
              { icon: 'https://images.aircharterservice.com/icons/ico_globe.svg', number: '40+', title: 'Global coverage', desc: '40+ offices across 6 continents.' },
              { icon: 'https://images.aircharterservice.com/icons//ico_jet.svg', number: '50,000', title: 'Largest range of aircraft', desc: 'Access to 50,000 aircraft across the globe.' },
              { icon: 'https://images.aircharterservice.com/icons/ico_phone24.svg', number: '24/7', title: 'Personal service', desc: 'Dedicated account managers available 24/7.' },
            ].map((item, index) => (
              <AnimatedElement key={index} delay={index * 100} className="flex flex-col items-center text-center px-4">
                <div className="h-12 flex items-center justify-center mb-4">
                  <Image src={item.icon} alt={item.title} className="h-10 w-auto opacity-80" onError={(e) => { e.currentTarget.src = 'https://static.wixstatic.com/media/41cdae_64108c82ff4a4a0cb43a0e88ab48b288~mv2.png?originWidth=128&originHeight=128'; e.currentTarget.className = 'h-10 w-10 opacity-20'; }} />
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
              <Image src="https://images.aircharterservice.com/global/us-real-id/real-id-img.png" alt="Real ID" className="w-full h-full object-cover" />
            </div>
            <div className="w-full md:w-2/3 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <span className="text-xl font-light">Are you</span>
                  <Image src="https://images.aircharterservice.com/global/us-real-id/real-id-logo.svg" alt="REAL ID" className="h-6 bg-white px-2 rounded" onError={(e) => e.currentTarget.style.display = 'none'} />
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

      {/* Journey & Process Section */}
      <section className="bg-white">
        <div className="container mx-auto px-4 py-16">
          <AnimatedElement>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-primary text-center mb-12 uppercase tracking-wide">
              LEADING THE WAY IN PRIVATE AIRCRAFT CHARTER
            </h2>
          </AnimatedElement>

          <div className="max-w-6xl mx-auto">
            {/* Top Split - Journey */}
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 relative group cursor-pointer overflow-hidden">
                <Image src="https://images.aircharterservice.com/global/home/acs-chris-leach.jpg" alt="Chris Leach" className="w-full h-full object-cover min-h-[300px] transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors group-hover:bg-black/40">
                  <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 bg-primary text-white p-12 flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-heading font-bold mb-6 uppercase tracking-wide">OUR JOURNEY</h3>
                <p className="text-sm text-white/80 mb-8 leading-relaxed max-w-md">
                  Watch our video to see the rise of RV Global Aviation from one man in the basement of his house to one of the largest aircraft charter companies in the world.
                </p>
                <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-2 text-xs font-bold tracking-wider uppercase transition-all hover:shadow-lg hover:-translate-y-1">
                  Our History
                </Button>
              </div>
            </div>

            {/* Bottom Split - Process */}
            <div className="flex flex-col md:flex-row-reverse bg-gray-50">
              <div className="w-full md:w-1/2 relative overflow-hidden">
                <Image src="https://images.aircharterservice.com/global/home/acs-process.jpg" alt="Process" className="w-full h-full object-cover min-h-[300px]" />
              </div>
              <div className="w-full md:w-1/2 p-12 flex flex-col justify-center items-center text-center">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6 uppercase tracking-wide leading-tight">
                  LEARN ABOUT OUR SIMPLE,<br/>FOUR-STAGE PROCESS.
                </h3>
                <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-md">
                  We take the confusion out of chartering with a four-stage process. Your dedicated charter consultant, backed up by our global network of offices and 24-hour operations team, ensure no matter what your requirements, your charter goes off without a hitch.
                </p>
                <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-2 text-xs font-bold tracking-wider uppercase transition-all hover:shadow-lg hover:-translate-y-1">
                  Watch Video
                </Button>
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
                  {aircraft.length > 0 ? aircraft.map((plane, index) => (
                    <div key={plane._id} className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                      <div className="h-40 overflow-hidden relative">
                        <Image 
                          src={plane.aircraftImage || 'https://static.wixstatic.com/media/41cdae_4e423c58051943998250833ad41b8c0c~mv2.png?originWidth=256&originHeight=128'} 
                          alt={plane.aircraftName || 'Aircraft'} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="font-bold text-primary text-sm mb-1">{plane.aircraftName}</h4>
                        <p className="text-xs text-gray-500">Passengers {plane.passengerCapacity}</p>
                      </div>
                    </div>
                  )) : (
                    // Fallback static data
                    [
                      { name: 'Bombardier Global Express XRS', pax: 12, img: 'https://images.aircharterservice.com/global/aircraft-guide/private-charter/bombardier-global-xrs-6000-1.jpg?imwidth=640' },
                      { name: 'Dassault Falcon 900B', pax: 14, img: 'https://images.aircharterservice.com/content/dassault-falcon-900b-sized.jpg?imwidth=640' },
                      { name: 'Hawker Beechcraft 800XP', pax: 8, img: 'https://images.aircharterservice.com/global/aircraft-guide/private-charter/hawker-800-800xp-1.jpg?imwidth=640' },
                      { name: 'Hawker Beechcraft 900XP', pax: 8, img: 'https://images.aircharterservice.com/global/aircraft-guide/private-charter/hawker-beechcraft-900xp-1.jpg?imwidth=640' }
                    ].map((plane, i) => (
                      <div key={i} className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                        <div className="h-40 overflow-hidden relative">
                          <Image src={plane.img} alt={plane.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="p-4 text-center">
                          <h4 className="font-bold text-primary text-sm mb-1">{plane.name}</h4>
                          <p className="text-xs text-gray-500">Passengers {plane.pax}</p>
                        </div>
                      </div>
                    ))
                  )}
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
                  {destinations.length > 0 ? destinations.map((dest, index) => (
                    <div key={dest._id} className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                      <div className="h-40 overflow-hidden relative">
                        <Image 
                          src={dest.destinationImage || 'https://static.wixstatic.com/media/41cdae_f3731956007d43e8aa22d8658878a93e~mv2.png?originWidth=256&originHeight=128'} 
                          alt={dest.destinationName || 'Destination'} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-4 text-center flex-grow flex flex-col">
                        <h4 className="font-bold text-primary text-sm mb-2">{dest.destinationName}</h4>
                        <p className="text-xs text-gray-500 line-clamp-4 flex-grow">{dest.description}</p>
                      </div>
                    </div>
                  )) : (
                    // Fallback static data
                    [
                      { name: 'Los Angeles', desc: 'Toasted beaches, emerald landscapes and neatly arranged boulevards – Los Angeles is a place that spawns dreamers and rebels alike.', img: 'https://images.aircharterservice.com/global/home/los-angeles-private-jet-charter.jpg?imwidth=640' },
                      { name: 'New York', desc: 'From towering cityscapes to the raw energy emanating from street performers in Central Park, a visit to New York is as thrilling as its world-renowned Broadway shows.', img: 'https://images.aircharterservice.com/global/home/new-york-private-jet-charter.jpg?imwidth=640' },
                      { name: 'Miami', desc: 'Miami and Miami Beach are some of Florida’s most eclectic areas, offering a real diverse mix of cultures as well as iconic South Beach.', img: 'https://images.aircharterservice.com/global/home/miami-private-jet-charter.jpg?imwidth=640' },
                      { name: 'Las Vegas', desc: 'Las Vegas is the original Sin City, with its iconic Strip lined with some of the glitziest hotels in the world.', img: 'https://images.aircharterservice.com/global/home/las-vegas-private-jet-charter.jpg?imwidth=640' }
                    ].map((dest, i) => (
                      <div key={i} className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
                        <div className="h-40 overflow-hidden relative">
                          <Image src={dest.img} alt={dest.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        </div>
                        <div className="p-4 text-center flex-grow flex flex-col">
                          <h4 className="font-bold text-primary text-sm mb-2">{dest.name}</h4>
                          <p className="text-xs text-gray-500 line-clamp-4 flex-grow">{dest.desc}</p>
                        </div>
                      </div>
                    ))
                  )}
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
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatedElement>
            <h2 className="text-xl md:text-2xl font-heading font-bold text-primary text-center mb-12 uppercase tracking-wide">
              POPULAR BLOG STORIES
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="animate-pulse flex flex-col items-center">
                  <div className="w-full h-48 bg-gray-200 mb-4"></div>
                  <div className="h-6 w-3/4 bg-gray-200 mb-4"></div>
                  <div className="h-20 w-full bg-gray-200 mb-6"></div>
                  <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
                </div>
              ))
            ) : blogArticles.length > 0 ? (
              blogArticles.map((article, index) => (
                <AnimatedElement key={article._id} delay={index * 150} className="flex flex-col items-center text-center group">
                  <div className="w-full h-48 mb-6 overflow-hidden relative">
                    <Image 
                      src={article.mainImage || 'https://static.wixstatic.com/media/41cdae_3c11898b9ef0472cba62e1ba5eee9ce5~mv2.png?originWidth=320&originHeight=192'} 
                      alt={article.title || 'Blog'} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-sm font-heading font-bold text-primary mb-4 uppercase tracking-wide px-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-6 leading-relaxed px-4 flex-grow line-clamp-4">
                    {article.content}
                  </p>
                  <Link to={`/blog/${article._id}`}>
                    <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-2 text-xs font-bold tracking-wider uppercase transition-all hover:shadow-lg hover:-translate-y-1">
                      Read more
                    </Button>
                  </Link>
                </AnimatedElement>
              ))
            ) : (
              // Fallback static data
              [
                { title: 'HOW TO CHARTER A PRIVATE JET', desc: 'Chartering a private jet can seem daunting on the surface – there’s choosing the aircraft that’s right for you, working out which airports to fly from/to, and then finding out how much it all costs.', img: 'https://images.aircharterservice.com/content/thumb-how-to-charter-a-private-jet.jpg' },
                { title: 'THE BENEFITS OF A COMMERCIAL JET FOR BUSINESS', desc: 'Despite the rise of AI technologies and the continued automation of our society and its processes, business is still, for the most part, undertaken face-to-face between human beings.', img: 'https://images.aircharterservice.com/content/the-benefits-of-a-commercial-jet-for-business-thumb.jpg' },
                { title: 'THE CARGO CHARTERS THAT DEFINED 2025', desc: '2025 was a strong year for Air Charter Service’s Cargo Division. Despite volatile demand and regional disruption, our teams kept relief, industrial and specialist cargo moving with speed and precision.', img: 'https://images.aircharterservice.com/content/the-cargo-charters-that-defined-2025-thumb.jpg' }
              ].map((article, index) => (
                <AnimatedElement key={index} delay={index * 150} className="flex flex-col items-center text-center group">
                  <div className="w-full h-48 mb-6 overflow-hidden relative">
                    <Image src={article.img} alt={article.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <h3 className="text-sm font-heading font-bold text-primary mb-4 uppercase tracking-wide px-2">
                    {article.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-6 leading-relaxed px-4 flex-grow line-clamp-4">
                    {article.desc}
                  </p>
                  <Link to="/blog">
                    <Button className="bg-accent hover:bg-accent/90 text-white rounded-full px-8 py-2 text-xs font-bold tracking-wider uppercase transition-all hover:shadow-lg hover:-translate-y-1">
                      Read more
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
            <button onClick={() => window.location.href = 'tel:+1234567890'} className="flex items-center justify-center gap-2 py-6 hover:bg-gray-200 transition-colors text-primary font-bold text-xs uppercase tracking-wider">
              <PhoneCall className="w-4 h-4" /> Call Us
            </button>
            <button onClick={() => window.location.href = 'mailto:info@example.com'} className="flex items-center justify-center gap-2 py-6 hover:bg-gray-200 transition-colors text-primary font-bold text-xs uppercase tracking-wider">
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