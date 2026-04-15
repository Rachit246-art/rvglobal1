import React, { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { MapPin, Calendar, Users, IndianRupee, Clock, CheckCircle, ArrowRight } from 'lucide-react';

// Animated Element for scroll reveals
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

export default function ChardhamYatraPage() {
  const packageCost = 250000;
  const duration = '5 Nights / 6 Days';
  const departure = 'Bangalore';

  const itinerary = [
    {
      day: 1,
      title: 'Bangalore to Haridwar',
      description: 'Arrive in Haridwar, the gateway to the Chardham pilgrimage. Check-in to your hotel and visit the sacred Ghat for evening Aarti ceremony.',
      highlights: ['Arrival in Haridwar', 'Hotel Check-in', 'Ghat Aarti Ceremony', 'Dinner'],
      meals: 'Dinner'
    },
    {
      day: 2,
      title: 'Haridwar to Kedarnath',
      description: 'Early morning departure to Kedarnath. Visit the sacred Kedarnath Temple, one of the four Dhams. Experience the spiritual atmosphere and participate in evening prayers.',
      highlights: ['Kedarnath Temple Darshan', 'Spiritual Ceremony', 'Local Exploration', 'Dinner'],
      meals: 'Breakfast, Lunch, Dinner'
    },
    {
      day: 3,
      title: 'Kedarnath to Badrinath',
      description: 'Travel to Badrinath, the second Dham. Visit the magnificent Badrinath Temple and explore the surrounding natural beauty. Participate in the evening Aarti.',
      highlights: ['Badrinath Temple Darshan', 'Tapt Kund Hot Springs', 'Evening Aarti', 'Dinner'],
      meals: 'Breakfast, Lunch, Dinner'
    },
    {
      day: 4,
      title: 'Badrinath to Guptakashi',
      description: 'Journey to Guptakashi, a sacred town. Visit the Vishwanath Temple and explore the spiritual significance of this pilgrimage site.',
      highlights: ['Vishwanath Temple', 'Local Market Visit', 'Spiritual Discourse', 'Dinner'],
      meals: 'Breakfast, Lunch, Dinner'
    },
    {
      day: 5,
      title: 'Guptakashi to Rudraprayag',
      description: 'Travel to Rudraprayag, where the Alaknanda and Mandakini rivers meet. Visit the Rudranath Temple and enjoy the scenic beauty of the Himalayas.',
      highlights: ['Rudranath Temple', 'River Confluence', 'Nature Walk', 'Dinner'],
      meals: 'Breakfast, Lunch, Dinner'
    },
    {
      day: 6,
      title: 'Rudraprayag to Bangalore',
      description: 'Final day of your spiritual journey. Depart for Bangalore with blessed memories and spiritual enrichment from the Chardham Yatra.',
      highlights: ['Breakfast', 'Departure', 'Journey to Bangalore'],
      meals: 'Breakfast'
    }
  ];

  const inclusions = [
    'Accommodation in 3-star hotels',
    'All meals (Breakfast, Lunch, Dinner)',
    'Guided temple visits and darshan',
    'Transportation throughout the journey',
    'Experienced spiritual guide',
    'All entrance fees and permits',
    'Travel insurance coverage',
    'Evening Aarti ceremonies'
  ];

  const exclusions = [
    'Flights to/from Bangalore',
    'Personal expenses',
    'Alcoholic beverages',
    'Activities not mentioned in itinerary',
    'Tips and gratuities'
  ];

  return (
    <div className="min-h-screen bg-background font-paragraph text-primary">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gradient-to-r from-primary/90 to-primary/70">
        <div className="absolute inset-0 w-full h-full">
          <Image 
            src="https://static.wixstatic.com/media/41cdae_a20d9724f2be452488a7da38b4ff56ec~mv2.png?originWidth=1152&originHeight=576" 
            alt="Chardham Yatra" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        
        <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12">
          <AnimatedElement className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 uppercase tracking-wide">
              Chardham Yatra
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
              A sacred pilgrimage to the four holiest Hindu temples in the Himalayas
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white">
                <Calendar className="w-5 h-5" />
                <span className="font-bold">{duration}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <MapPin className="w-5 h-5" />
                <span className="font-bold">From {departure}</span>
              </div>
              <div className="flex items-center gap-2 text-white">
                <IndianRupee className="w-5 h-5" />
                <span className="font-bold">₹{packageCost.toLocaleString()} per person</span>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Quick Info Cards */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <AnimatedElement delay={0} className="bg-accent/10 p-6 rounded-lg border border-accent/20">
              <div className="flex items-center gap-3 mb-3">
                <Calendar className="w-6 h-6 text-accent" />
                <h3 className="font-heading font-bold text-primary">Duration</h3>
              </div>
              <p className="text-sm text-gray-700">{duration}</p>
            </AnimatedElement>

            <AnimatedElement delay={100} className="bg-accent/10 p-6 rounded-lg border border-accent/20">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-6 h-6 text-accent" />
                <h3 className="font-heading font-bold text-primary">Departure</h3>
              </div>
              <p className="text-sm text-gray-700">{departure}</p>
            </AnimatedElement>

            <AnimatedElement delay={200} className="bg-accent/10 p-6 rounded-lg border border-accent/20">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-6 h-6 text-accent" />
                <h3 className="font-heading font-bold text-primary">Group Size</h3>
              </div>
              <p className="text-sm text-gray-700">2-20 persons</p>
            </AnimatedElement>

            <AnimatedElement delay={300} className="bg-accent/10 p-6 rounded-lg border border-accent/20">
              <div className="flex items-center gap-3 mb-3">
                <IndianRupee className="w-6 h-6 text-accent" />
                <h3 className="font-heading font-bold text-primary">Cost</h3>
              </div>
              <p className="text-sm text-gray-700 font-bold">₹{packageCost.toLocaleString()}</p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Itinerary Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatedElement className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">
              Day-by-Day Itinerary
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the spiritual journey through the four sacred Dhams of the Himalayas
            </p>
          </AnimatedElement>

          <div className="space-y-8">
            {itinerary.map((day, index) => (
              <AnimatedElement key={day.day} delay={index * 100} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  {/* Day Number */}
                  <div className="bg-accent text-white p-6 md:p-8 flex flex-col items-center justify-center min-w-[120px]">
                    <div className="text-4xl font-heading font-bold">Day {day.day}</div>
                    <div className="text-sm mt-2 text-center">{day.meals}</div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-6 md:p-8">
                    <h3 className="text-xl font-heading font-bold text-primary mb-3 uppercase tracking-wide">
                      {day.title}
                    </h3>
                    <p className="text-gray-700 mb-4 leading-relaxed">
                      {day.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {day.highlights.map((highlight, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-semibold">
                          <CheckCircle className="w-3 h-3" />
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Inclusions */}
            <AnimatedElement>
              <h3 className="text-2xl font-heading font-bold text-primary mb-8 uppercase tracking-wide">
                What's Included
              </h3>
              <div className="space-y-4">
                {inclusions.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedElement>

            {/* Exclusions */}
            <AnimatedElement delay={100}>
              <h3 className="text-2xl font-heading font-bold text-primary mb-8 uppercase tracking-wide">
                What's Not Included
              </h3>
              <div className="space-y-4">
                {exclusions.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatedElement className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">
              Spiritual Highlights
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Kedarnath Temple',
                desc: 'One of the twelve Jyotirlingas dedicated to Lord Shiva',
                icon: '🏔️'
              },
              {
                title: 'Badrinath Temple',
                desc: 'Sacred shrine dedicated to Lord Vishnu in the Himalayas',
                icon: '⛩️'
              },
              {
                title: 'Spiritual Guidance',
                desc: 'Expert guides to explain the significance of each site',
                icon: '🙏'
              },
              {
                title: 'Sacred Rituals',
                desc: 'Participate in daily Aarti and spiritual ceremonies',
                icon: '✨'
              }
            ].map((highlight, index) => (
              <AnimatedElement key={index} delay={index * 100} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{highlight.icon}</div>
                <h4 className="font-heading font-bold text-primary mb-2 uppercase tracking-wide text-sm">
                  {highlight.title}
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {highlight.desc}
                </p>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6 uppercase tracking-wide">
              Ready for Your Spiritual Journey?
            </h2>
            <p className="text-lg mb-8 text-white/90">
              Book your Chardham Yatra package today and experience the divine blessings of the four sacred Dhams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-accent hover:bg-accent/90 text-white font-heading font-bold tracking-wider py-6 px-8 rounded-lg transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2">
                Book Now <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 font-heading font-bold tracking-wider py-6 px-8 rounded-lg transition-all">
                Get More Info
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Package Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <AnimatedElement className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-primary mb-4 uppercase tracking-wide">
              Package Details
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedElement delay={0} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="font-heading font-bold text-primary mb-4 uppercase tracking-wide text-lg">Accommodation</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• 3-star hotels in each location</li>
                <li>• Private rooms with attached bathrooms</li>
                <li>• Hot water facilities</li>
                <li>• WiFi availability</li>
              </ul>
            </AnimatedElement>

            <AnimatedElement delay={100} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="font-heading font-bold text-primary mb-4 uppercase tracking-wide text-lg">Meals</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Vegetarian meals throughout</li>
                <li>• Traditional Indian cuisine</li>
                <li>• Breakfast, lunch & dinner</li>
                <li>• Special dietary options available</li>
              </ul>
            </AnimatedElement>

            <AnimatedElement delay={200} className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <h3 className="font-heading font-bold text-primary mb-4 uppercase tracking-wide text-lg">Transportation</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Air-conditioned vehicles</li>
                <li>• Experienced drivers</li>
                <li>• All transfers included</li>
                <li>• Comfortable journey</li>
              </ul>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
