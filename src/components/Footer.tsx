import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#475569] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <h3 className="text-2xl font-heading font-bold tracking-tight">RV Global Aviation</h3>
            <p className="font-paragraph text-sm text-white/70 leading-relaxed max-w-xs">
              Level 11, Prestige Trade Tower, No. 46 Palace Road, Sampangi Rama Nagar, Bangalore, Karnataka 560001, India
            </p>
            <div className="flex space-x-5">
              <a href="#" className="text-white hover:text-[#58A9E1] transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-[#58A9E1] transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-[#58A9E1] transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-[#58A9E1] transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-heading font-bold mb-6 tracking-wide">Services</h4>
            <ul className="space-y-4 font-paragraph text-sm text-white/70">
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Private Jet Charter
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Group Aircraft Charter
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-colors">
                  Cargo Aircraft Charter
                </Link>
              </li>
              <li>
                <Link to="/aircraft" className="hover:text-white transition-colors">
                  Aircraft Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-heading font-bold mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-4 font-paragraph text-sm text-white/70">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-xl font-heading font-bold mb-6 tracking-wide">Contact Us</h4>
            <ul className="space-y-5 font-paragraph text-sm text-white/70">
              <li className="flex items-center gap-3">
                <div className="text-[#58A9E1] flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <a href="mailto:info@rvglobalaviation.com" className="hover:text-white transition-colors">
                  info@rvglobalaviation.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="text-[#58A9E1] flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <p>40+ offices across 6 continents</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center">
          <p className="font-paragraph text-xs text-white/40 tracking-wider">
            © 2026 RV Global Aviation. All rights reserved. | Made with ❤️ by Regortz
          </p>
        </div>
      </div>
    </footer>
  );
}
