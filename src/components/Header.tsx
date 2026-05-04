import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone, ChevronDown } from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        { label: 'Private Jet Charter', path: '/services/private-jet' },
        { label: 'Group Charter', path: '/services/group-charter' },
        { label: 'Cargo Charter', path: '/services/cargo-charter' },
        { label: 'Helicopter Charter', path: '/services/helicopter' },
      ]
    },
    { 
      label: 'Aircraft Guide', 
      path: '/aircraft',
      submenu: [
        { label: 'Fleet Overview', path: '/aircraft' },
        { label: 'Citation M2', path: '/aircraft/citation-m2' },
        { label: 'Phenom 300E', path: '/aircraft/phenom-300e' },
        { label: 'Challenger 350', path: '/aircraft/challenger-350' },
        { label: 'Gulfstream G650ER', path: '/aircraft/g650er' },
        { label: 'Global 7500', path: '/aircraft/global-7500' },
        { label: 'Bell 407GXi', path: '/aircraft/bell-407gxi' },
        { label: 'Pilatus PC-12 NGX', path: '/aircraft/pilatus-pc-12' },
        { label: 'Legacy 600', path: '/aircraft/legacy-600' },
        { label: 'Hawker 800XP', path: '/aircraft/hawker-800xp' },
        { label: 'Citation X+', path: '/aircraft/citation-x' },
        { label: 'King Air 350i', path: '/aircraft/king-air-350i' },
        { label: 'Airbus H145', path: '/aircraft/h145' },
      ]
    },
    { 
      label: 'Destinations', 
      path: '/destinations',
      submenu: [
        { label: 'Aspen', path: '/destinations/aspen' },
        { label: 'Maldives', path: '/destinations/maldives' },
        { label: 'St. Barts', path: '/destinations/st-barts' },
        { label: 'Mykonos', path: '/destinations/mykonos' },
        { label: 'Dubai', path: '/destinations/dubai' },
        { label: 'London', path: '/destinations/london' },
        { label: 'Paris', path: '/destinations/paris' },
        { label: 'Geneva', path: '/destinations/geneva' },
      ]
    },
    { 
      label: 'About Us', 
      path: '/about',
      submenu: [
        { label: 'Our Team', path: '/about#team' },
        { label: 'Our Story', path: '/about#story' },
      ]
    },
    { 
      label: 'Blog', 
      path: '/blog',
      submenu: [
        { label: 'Latest Articles', path: '/blog#articles' },
        { label: 'Travel Tips', path: '/blog#articles' },
      ]
    },
    { 
      label: 'Contact', 
      path: '/contact',
      submenu: null
    },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-0' : 'bg-white shadow-md py-2'}`}>
      <div className="container mx-auto px-4">
        <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-20' : 'h-24'}`}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <Image 
              src="/assets/logos/logo.png"
              alt="RV Global Aviation Logo"
              width={320}
              height={96}
              className="h-20 w-auto"
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

            </a>
            <Button 
              onClick={() => navigate('/contact')}
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
                    navigate('/contact');
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
