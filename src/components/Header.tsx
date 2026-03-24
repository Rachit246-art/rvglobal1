import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { 
      label: 'Home', 
      path: '/',
      submenu: null
    },
    { 
      label: 'Services', 
      path: '/services',
      submenu: [
        { label: 'Private Jet Charter', path: '/services' },
        { label: 'Group Charter', path: '/services' },
        { label: 'Cargo Charter', path: '/services' },
      ]
    },
    { 
      label: 'Aircraft Guide', 
      path: '/aircraft',
      submenu: [
        { label: 'Fleet Overview', path: '/aircraft' },
        { label: 'Aircraft Specifications', path: '/aircraft' },
      ]
    },
    { 
      label: 'Destinations', 
      path: '/destinations',
      submenu: [
        { label: 'Popular Routes', path: '/destinations' },
        { label: 'Global Coverage', path: '/destinations' },
      ]
    },
    { 
      label: 'About Us', 
      path: '/about',
      submenu: [
        { label: 'Our Team', path: '/about' },
        { label: 'Our Story', path: '/about' },
      ]
    },
    { 
      label: 'Blog', 
      path: '/blog',
      submenu: [
        { label: 'Latest Articles', path: '/blog' },
        { label: 'Travel Tips', path: '/blog' },
      ]
    },
    { 
      label: 'Contact', 
      path: '/contact',
      submenu: null
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <Image 
              src="https://static.wixstatic.com/media/41cdae_1f09fcd3e3464507a99a3ff665a1cde5~mv2.jpeg"
              alt="RV Global Aviation Logo"
              width={50}
              height={50}
              className="h-12 w-auto"
            />

          </Link>

          {/* Desktop Navigation with Dropdowns */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.path}
                  className={`font-paragraph text-sm font-medium transition-colors px-3 py-2 rounded-md flex items-center gap-1 hover:text-accent ${
                    isActive(item.path) ? 'text-accent' : 'text-primary'
                  }`}
                >
                  {item.label}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>
                
                {/* Dropdown Menu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.label}
                        to={subitem.path}
                        className="block px-4 py-2 font-paragraph text-sm text-primary hover:text-accent hover:bg-gray-50 transition-colors"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+91-8904886662" className="flex items-center text-primary hover:text-accent transition-colors">
              <Phone className="w-4 h-4 mr-2" />
              <span className="font-paragraph text-sm font-medium">+91 8904886662</span>
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
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => setOpenDropdown(openDropdown === item.label ? null : item.label)}
                    className={`w-full text-left font-paragraph text-base font-medium transition-colors px-3 py-2 rounded-md flex items-center justify-between hover:text-accent ${
                      isActive(item.path) ? 'text-accent' : 'text-primary'
                    }`}
                  >
                    <Link to={item.path} onClick={() => setMobileMenuOpen(false)}>
                      {item.label}
                    </Link>
                    {item.submenu && (
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform ${openDropdown === item.label ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>
                  
                  {/* Mobile Dropdown */}
                  {item.submenu && openDropdown === item.label && (
                    <div className="bg-gray-50 rounded-md ml-4 mt-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.label}
                          to={subitem.path}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            setOpenDropdown(null);
                          }}
                          className="block px-4 py-2 font-paragraph text-sm text-primary hover:text-accent transition-colors"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <a href="tel:+91-8904886662" className="flex items-center text-primary hover:text-accent transition-colors px-3 py-2 mb-4">
                  <Phone className="w-4 h-4 mr-2" />
                  <span className="font-paragraph text-sm font-medium">+91 8904886662</span>
                </a>
                <Button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.location.href = '/contact';
                  }}
                  className="bg-accent hover:bg-accent/90 text-white font-paragraph font-medium w-full"
                >
                  Inquire Now
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
