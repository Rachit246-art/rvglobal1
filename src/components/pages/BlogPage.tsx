import { useState, useEffect, useRef } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { BlogArticles } from '@/entities';
import { Search, Calendar, User, Tag } from 'lucide-react';
import { format } from 'date-fns';

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

export default function BlogPage() {
  const [articles, setArticles] = useState<BlogArticles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getAll<BlogArticles>('blogarticles');
      setArticles(data.items);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['all', ...Array.from(new Set(articles.map(a => a.category).filter(Boolean)))];

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

      {/* Hero Section */}
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-accent/20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(83,180,230,0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }} />
        </div>
        
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
                              <span className="font-paragraph">{formatDate(article.publishDate)}</span>
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
                <Button className="bg-white text-primary hover:bg-gray-100 font-paragraph font-medium px-8 py-6 whitespace-nowrap">
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
