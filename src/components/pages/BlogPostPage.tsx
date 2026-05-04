import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, ChevronLeft, Share2, Clock, Bookmark, MessageCircle } from 'lucide-react';
import { blogArticles } from '@/lib/blog-data';
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

export default function BlogPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = blogArticles.find(a => a._id === id);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-3xl font-heading font-bold mb-4">Article Not Found</h1>
          <Button onClick={() => navigate('/blog')} className="bg-accent text-white">Back to Blog</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* Hero Section - Immersive & Premium */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src={article.mainImage || ''} 
            alt={article.title || ''} 
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 pb-16">
          <AnimatedElement className="max-w-4xl">
            <div className="inline-block bg-accent text-white px-4 py-1.5 rounded-full text-xs font-paragraph font-bold uppercase tracking-widest mb-6 shadow-lg">
              {article.category}
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-white mb-8 leading-tight">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-8 text-white/90 font-paragraph text-sm md:text-base">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center border border-accent/30 group-hover:bg-accent/40 transition-all">
                  <User className="w-5 h-5 text-accent" />
                </div>
                <span className="font-medium tracking-wide">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-accent" />
                <span>{article.publishDate as string}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" />
                <span>8 min read</span>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Breadcrumbs & Navigation */}
      <div className="bg-gray-50 border-b border-gray-100 py-4">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog')}
              className="hover:bg-gray-200 flex items-center gap-2 font-paragraph text-primary font-bold transition-all"
            >
              <ChevronLeft className="w-5 h-5 text-accent" />
              Back to Insights
            </Button>
            <div className="hidden md:flex items-center gap-4">
              <span className="text-xs font-paragraph text-gray-400 uppercase tracking-widest font-bold">Share:</span>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-gray-200 hover:text-accent hover:border-accent transition-all">
                  <Share2 className="w-3.5 h-3.5" />
                </Button>
                <Button variant="outline" size="icon" className="w-8 h-8 rounded-full border-gray-200 hover:text-accent hover:border-accent transition-all">
                  <Bookmark className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Wider & More Premium */}
      <section className="py-20 flex-1">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 max-w-7xl mx-auto">
            
            {/* Sidebar - Quick Info */}
            <aside className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-24 space-y-12">
                <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-heading font-bold text-primary mb-6 border-b border-accent/20 pb-2">Key Highlights</h3>
                  <ul className="space-y-4 font-paragraph text-sm text-gray-600 leading-relaxed">
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Future trends in luxury travel
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Technological advancements
                    </li>
                    <li className="flex gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      Exclusive destination access
                    </li>
                  </ul>
                </div>

                <div className="p-8 bg-primary text-white rounded-2xl shadow-xl">
                  <h3 className="text-xl font-heading font-bold mb-4">Request a Quote</h3>
                  <p className="font-paragraph text-sm text-white/80 mb-6">Experience the pinnacle of private aviation tailored to your schedule.</p>
                  <Button 
                    onClick={() => navigate('/contact')}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-heading font-bold py-6 rounded-none tracking-widest uppercase text-xs"
                  >
                    Inquire Now
                  </Button>
                </div>
              </div>
            </aside>

            {/* Article Body */}
            <main className="lg:w-3/4">
              <AnimatedElement>
                <div className="prose prose-xl max-w-none font-paragraph text-gray-800 leading-[1.8] tracking-normal">
                  {article.content?.split('\n').map((paragraph, index) => {
                    if (paragraph.trim() === '') return null;
                    
                    // Add a blockquote or image in the middle for visual interest
                    if (index === 2) {
                      return (
                        <div key={index} className="my-12 py-8 border-l-4 border-accent pl-8 bg-gray-50 italic text-2xl text-primary font-heading font-medium leading-relaxed">
                          "{paragraph.length > 100 ? paragraph.substring(0, 150) + '...' : paragraph}"
                        </div>
                      );
                    }

                    return (
                      <p key={index} className="mb-8 text-lg md:text-xl">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>

                {/* Tags & Footer */}
                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-accent" />
                    <span className="font-paragraph text-xs text-gray-400 uppercase tracking-widest font-bold">Category:</span>
                    <div className="flex gap-2">
                      <span className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-paragraph font-bold text-primary hover:bg-accent hover:text-white cursor-pointer transition-all uppercase tracking-tighter">
                        {article.category}
                      </span>
                      <span className="bg-gray-100 px-4 py-1.5 rounded-full text-xs font-paragraph font-bold text-primary hover:bg-accent hover:text-white cursor-pointer transition-all uppercase tracking-tighter">
                        Aviation
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <button className="flex items-center gap-2 font-paragraph text-sm text-gray-500 hover:text-accent transition-colors font-bold">
                      <MessageCircle className="w-5 h-5" />
                      12 Comments
                    </button>
                    <button className="flex items-center gap-2 font-paragraph text-sm text-gray-500 hover:text-accent transition-colors font-bold">
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  </div>
                </div>
              </AnimatedElement>
            </main>
          </div>
        </div>
      </section>

      {/* Next Article CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-20" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedElement>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-8 leading-tight">Elevate Your Travel Experience</h2>
              <p className="text-xl font-paragraph text-white/70 mb-12 max-w-2xl mx-auto">Discover the freedom and luxury of bespoke air travel. Our team is ready to curate your next journey.</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Button 
                  onClick={() => navigate('/contact')}
                  className="bg-accent text-white hover:bg-accent/90 px-12 py-8 rounded-none font-heading font-bold uppercase tracking-[0.2em] text-sm shadow-2xl"
                >
                  Consult an Expert
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/aircraft')}
                  className="border-white/30 text-white hover:bg-white hover:text-primary px-12 py-8 rounded-none font-heading font-bold uppercase tracking-[0.2em] text-sm transition-all"
                >
                  Explore Fleet
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
