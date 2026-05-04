import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { Search, Calendar, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import { blogArticles } from '@/lib/blog-data';

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
  const navigate = useNavigate();
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setArticles(blogArticles);
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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section with Image Carousel */}
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/20">
        <div className="absolute inset-0 w-full h-full">
          <ImageCarousel images={[
            '/assets/aircraft/generic_jet.jpg',
            '/assets/backgrounds/jet_bg_1.jpg',
            '/assets/services/cargo_charter.jpg'
          ]} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-transparent" />
        
        <div className="relative z-10 container mx-auto px-6 py-32 text-center">
          <AnimatedElement>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-heading font-bold text-white mb-8 tracking-tight">
              Aviation Insights
            </h1>
            <p className="text-xl md:text-2xl font-paragraph text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              Stay ahead with the latest trends, expert tips, and exclusive stories from the world of bespoke private aviation.
            </p>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-accent transition-colors" />
                <Input
                  type="text"
                  placeholder="Search our knowledge base..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-16 py-8 text-xl font-paragraph bg-white/95 backdrop-blur-sm border-none shadow-2xl rounded-none focus-visible:ring-2 focus-visible:ring-accent"
                />
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-white border-b border-gray-100 sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category 
                    ? 'bg-accent text-white shadow-lg' 
                    : 'bg-gray-50 text-primary hover:bg-gray-100 border border-gray-200'
                } font-paragraph font-bold uppercase tracking-widest px-8 py-6 rounded-none transition-all`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section id="articles" className="py-32 bg-gray-50/50 scroll-mt-32">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
                          onClick={() => navigate(`/blog/${article._id}`)}
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
      <section id="subscribe" className="py-20 bg-gradient-to-br from-primary to-accent/20 scroll-mt-20">
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
