import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/services', label: 'Services' },
    { path: '/aircraft', label: 'Aircraft Guide' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/about', label: 'About Us' },
    { path: '/blog', label: 'Blog' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-heading font-bold text-primary">
              RV Global Aviation
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-sm font-medium transition-colors hover:text-accent ${
                  isActive(link.path) ? 'text-accent' : 'text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+1-800-000-0000" className="flex items-center text-primary hover:text-accent transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-paragraph text-sm font-medium">24/7 Support</span>
            </a>
            <Button 
              onClick={() => window.location.href = '/contact'}
              className="bg-accent hover:bg-accent/90 text-white font-paragraph font-medium"
            >
              Inquire Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-primary hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-paragraph text-base font-medium transition-colors hover:text-accent ${
                    isActive(link.path) ? 'text-accent' : 'text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.location.href = '/contact';
                }}
                className="bg-accent hover:bg-accent/90 text-white font-paragraph font-medium w-full"
              >
                Inquire Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
