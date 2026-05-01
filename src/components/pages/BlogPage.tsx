import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Search, Calendar, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

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

export default function BlogPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setArticles([
      { 
        _id: '1', 
        title: 'The Future of Private Jet Travel: What to Expect in the Next Decade', 
        mainImage: '/assets/aircraft/generic_jet.jpg', 
        content: 'Private jet travel is constantly evolving, driven by technological advancements, sustainability initiatives, and changing passenger demands. This article explores emerging trends such as electric aircraft, AI-powered personalized services...', 
        author: 'Amelia Earhart', 
        publishDate: 'March 15, 2024', 
        category: 'Private Jet' 
      },
      { 
        _id: '2', 
        title: 'Navigating Global Supply Chains: The Critical Role of Air Cargo in Modern...', 
        mainImage: '/assets/services/cargo_charter.jpg', 
        content: 'In an increasingly interconnected world, efficient global supply chains are paramount. Air cargo plays a pivotal role, offering speed and reliability unmatched by other transportation methods. This article delves into how...', 
        author: 'John Cargo', 
        publishDate: 'February 28, 2024', 
        category: 'Cargo' 
      },
      { 
        _id: '3', 
        title: 'Top 5 Exclusive Destinations Accessible Only by Private Charter', 
        mainImage: '/assets/destinations/maldives.jpg', 
        content: 'Dreaming of an escape to a truly unique and secluded paradise? Private charter flights open up a world of possibilities, granting access to destinations that commercial airlines simply cannot reach. This article unveils...', 
        author: 'Sarah Voyager', 
        publishDate: 'March 01, 2024', 
        category: 'Destinations' 
      },
      { 
        _id: '4', 
        title: 'Understanding Private Jet Charters: A First-Timer\'s Comprehensive Guide', 
        mainImage: '/assets/blog/blog_1.jpg', 
        content: 'Considering your first private jet charter but unsure where to start? This comprehensive guide demystifies the process, offering essential insights for new clients. We cover everything from understanding different...', 
        author: 'David Pilot', 
        publishDate: 'January 20, 2024', 
        category: 'Private Jet' 
      },
      { 
        _id: '5', 
        title: 'Emergency Air Cargo: When Speed and Reliability Are Non-Negotiable', 
        mainImage: '/assets/services/cargo_charter.jpg', 
        content: 'In critical situations, every second counts. Emergency air cargo services provide a lifeline for industries and individuals alike, ensuring urgent shipments reach their destination with unparalleled speed and...', 
        author: 'Emily Swift', 
        publishDate: 'February 10, 2024', 
        category: 'Cargo' 
      },
      { 
        _id: '6', 
        title: 'Beyond the Runway: Unique Experiences at Remote Airfields Worldwide', 
        mainImage: '/assets/destinations/london.jpg', 
        content: 'While major international airports serve as global hubs, a world of adventure awaits at smaller, more remote airfields. This article takes you on a journey to some of the most unique and picturesque airstrips...', 
        author: 'Mark Explorer', 
        publishDate: 'March 05, 2024', 
        category: 'Destinations' 
      },
    ]);
    setIsLoading(false);
  };

  const categories = ['all', 'Private Jet', 'Cargo', 'Destinations'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date | string | undefined) => {
    if (!date) return '';
    try {
      return format(new Date(date), 'MMMM dd, yyyy');
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Image Carousel */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/20">
        <div className="absolute inset-0 w-full h-full">
          <ImageCarousel images={[
            '/assets/aircraft/generic_jet.jpg',
            '/assets/backgrounds/jet_bg_1.jpg',
            '/assets/services/cargo_charter.jpg'
          ]} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6">
            Aviation Insights & News
          </h1>
          <p className="text-lg md:text-xl font-paragraph text-white/90 max-w-3xl mx-auto mb-8">
            Stay informed with the latest trends, tips, and stories from the world of private aviation
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-6 text-lg font-paragraph bg-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category 
                    ? 'bg-accent text-white' 
                    : 'bg-gray-100 text-primary hover:bg-gray-200'
                } font-paragraph font-medium capitalize`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="min-h-[500px]">
            {isLoading ? null : filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => (
                  <AnimatedElement key={article._id} className={`delay-${(index % 3) * 100}`}>
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
                      {article.mainImage && (
                        <div className="relative h-56 overflow-hidden">
                          <Image 
                            src={article.mainImage} 
                            alt={article.title || 'Blog article'} 
                            className="w-full h-full object-cover"
                            width={400}
                          />
                          {article.category && (
                            <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-paragraph font-medium uppercase">
                              {article.category}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                          {article.author && (
                            <div className="flex items-center">
                              <User className="w-4 h-4 mr-1 text-accent" />
                              <span className="font-paragraph">{article.author}</span>
                            </div>
                          )}
                          {article.publishDate && (
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1 text-accent" />
                              <span className="font-paragraph">{article.publishDate}</span>
                            </div>
                          )}
                        </div>

                        <h3 className="text-xl font-heading font-bold text-primary mb-3 line-clamp-2">
                          {article.title}
                        </h3>

                        <p className="font-paragraph text-gray-600 mb-4 line-clamp-4 flex-1">
                          {article.content}
                        </p>

                        <Button 
                          variant="outline" 
                          className="w-full border-accent text-accent hover:bg-accent hover:text-white transition-colors mt-auto"
                        >
                          Read Full Article
                        </Button>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-gray-500 text-lg">
                  {searchTerm || selectedCategory !== 'all'
                    ? 'No articles found matching your criteria.' 
                    : 'No articles available at the moment.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-br from-primary to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedElement>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                Stay Updated
              </h2>
              <p className="text-lg font-paragraph text-white/90 mb-8">
                Subscribe to our newsletter for the latest aviation insights and charter tips
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 py-6 font-paragraph bg-white"
                />
                <Button className="bg-white text-primary hover:bg-gray-100 font-heading font-bold uppercase tracking-wider px-8 py-6 whitespace-nowrap rounded-none">
                  Subscribe
                </Button>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
