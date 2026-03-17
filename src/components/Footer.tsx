import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4">aircharterserviceusa.com</h3>
            <p className="font-paragraph text-sm text-white/80 mb-4">
              Leading the way in private aircraft charter with over 35,000 flights per year and global coverage across 40+ offices.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-accent transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-accent transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Services</h4>
            <ul className="space-y-2 font-paragraph text-sm">
              <li>
                <Link to="/services" className="text-white/80 hover:text-accent transition-colors">
                  Private Jet Charter
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-accent transition-colors">
                  Group Aircraft Charter
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/80 hover:text-accent transition-colors">
                  Cargo Aircraft Charter
                </Link>
              </li>
              <li>
                <Link to="/aircraft" className="text-white/80 hover:text-accent transition-colors">
                  Aircraft Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-paragraph text-sm">
              <li>
                <Link to="/about" className="text-white/80 hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-white/80 hover:text-accent transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-heading font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 font-paragraph text-sm">
              <li className="flex items-start">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0 text-accent" />
                <div>
                  <p className="text-white/80">24/7 Support</p>
                  <a href="tel:+1-800-000-0000" className="text-white hover:text-accent transition-colors">
                    +1 (800) 000-0000
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0 text-accent" />
                <a href="mailto:info@aircharterserviceusa.com" className="text-white/80 hover:text-accent transition-colors">
                  info@aircharterserviceusa.com
                </a>
              </li>
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 flex-shrink-0 text-accent" />
                <p className="text-white/80">40+ offices across 6 continents</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="font-paragraph text-sm text-white/80">
            © 2026 aircharterserviceusa.com. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
