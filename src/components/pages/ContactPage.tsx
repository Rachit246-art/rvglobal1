import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { BaseCrudService } from '@/integrations';
import { ContactInquiries } from '@/entities';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    inquiryType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create<ContactInquiries>('contactinquiries', {
        _id: crypto.randomUUID(),
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        inquiryType: formData.inquiryType,
        message: formData.message,
        submissionDate: new Date().toISOString(),
      });

      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        inquiryType: '',
        message: '',
      });

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
            Contact Us
          </h1>
          <p className="text-lg md:text-xl font-paragraph text-white/90 max-w-3xl mx-auto">
            Our dedicated team is available 24/7 to assist you with your charter needs
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                icon: Phone,
                title: '24/7 Phone Support',
                content: '+1 (800) 000-0000',
                link: 'tel:+1-800-000-0000',
              },
              {
                icon: Mail,
                title: 'Email Us',
                content: 'info@rvglobalaviation.com',
                link: 'mailto:info@rvglobalaviation.com',
              },
              {
                icon: MapPin,
                title: 'Global Offices',
                content: '40+ locations worldwide',
                link: '/about',
              },
              {
                icon: Clock,
                title: 'Response Time',
                content: 'Within 1 hour',
                link: null,
              },
            ].map((item, index) => (
              <AnimatedElement key={index} className={`delay-${index * 100}`}>
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                  <item.icon className="w-10 h-10 mx-auto mb-4 text-accent" />
                  <h3 className="text-lg font-heading font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  {item.link ? (
                    <a 
                      href={item.link} 
                      className="font-paragraph text-gray-600 hover:text-accent transition-colors"
                    >
                      {item.content}
                    </a>
                  ) : (
                    <p className="font-paragraph text-gray-600">{item.content}</p>
                  )}
                </div>
              </AnimatedElement>
            ))}
          </div>

          {/* Contact Form */}
          <div className="max-w-4xl mx-auto">
            <AnimatedElement>
              <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
                <h2 className="text-3xl font-heading font-bold text-primary text-center mb-8">
                  Send Us a Message
                </h2>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <p className="font-paragraph text-green-800">
                      Thank you! Your inquiry has been submitted successfully. We&apos;ll get back to you shortly.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block font-paragraph font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        className="font-paragraph"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-paragraph font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="font-paragraph"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phoneNumber" className="block font-paragraph font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="font-paragraph"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiryType" className="block font-paragraph font-medium text-gray-700 mb-2">
                        Inquiry Type *
                      </label>
                      <select
                        id="inquiryType"
                        name="inquiryType"
                        required
                        value={formData.inquiryType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-paragraph focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <option value="">Select type</option>
                        <option value="Private Jet Charter">Private Jet Charter</option>
                        <option value="Group Charter">Group Charter</option>
                        <option value="Cargo Charter">Cargo Charter</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-paragraph font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="font-paragraph"
                      placeholder="Tell us about your charter requirements..."
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-paragraph font-medium py-6 text-lg"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                  </Button>
                </form>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Why Contact Us Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <AnimatedElement>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary text-center mb-12">
              Why Choose Us
            </h2>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Dedicated Account Managers',
                description: 'Personal service tailored to your needs',
              },
              {
                title: 'No Obligations',
                description: 'Free quotes with no commitment required',
              },
              {
                title: '30+ Years Experience',
                description: 'Industry-leading expertise and knowledge',
              },
              {
                title: 'Available 24/7',
                description: 'Round-the-clock support whenever you need us',
              },
            ].map((item, index) => (
              <AnimatedElement key={index} className={`delay-${index * 100}`}>
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-accent" />
                  </div>
                  <h3 className="text-lg font-heading font-bold text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="font-paragraph text-gray-600">
                    {item.description}
                  </p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
