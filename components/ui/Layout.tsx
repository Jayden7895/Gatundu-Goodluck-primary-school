import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, School, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-amber-500 font-bold" : "text-slate-200 hover:text-white";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar */}
      <div className="bg-slate-900 text-slate-300 py-2 px-4 text-xs md:text-sm hidden md:flex justify-between items-center">
        <div className="flex space-x-4">
          <span className="flex items-center gap-1"><Phone size={14}/> +254 700 000 000</span>
          <span className="flex items-center gap-1"><Mail size={14}/> info@gatundugoodluck.ac.ke</span>
        </div>
        <div className="flex space-x-4">
            <Link to="/admin" className="flex items-center gap-1 hover:text-amber-400 transition-colors">
                <ShieldCheck size={14}/> Staff Portal
            </Link>
        </div>
      </div>

      {/* Navbar */}
      <header className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="bg-white p-2 rounded-full text-blue-900 group-hover:bg-amber-400 transition-colors">
                <School size={32} />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold uppercase tracking-wide">Gatundu Goodluck</h1>
                <span className="text-xs text-amber-400 font-medium tracking-wider">Strive for Excellence</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className={isActive('/')}>Home</Link>
              <Link to="/about" className={isActive('/about')}>About</Link>
              <Link to="/academics" className={isActive('/academics')}>Academics</Link>
              <Link to="/admissions" className={isActive('/admissions')}>Admissions</Link>
              <Link to="/gallery" className={isActive('/gallery')}>Gallery</Link>
              <Link to="/contact" className={isActive('/contact')}>Contact</Link>
            </nav>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-950 border-t border-blue-800">
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link to="/" className="block py-2 text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/about" className="block py-2 text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/academics" className="block py-2 text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Academics</Link>
              <Link to="/admissions" className="block py-2 text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Admissions</Link>
              <Link to="/gallery" className="block py-2 text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
              <Link to="/contact" className="block py-2 text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link to="/admin" className="block py-2 text-amber-400 font-medium mt-4" onClick={() => setIsMenuOpen(false)}>Staff Login</Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Gatundu Goodluck</h3>
            <p className="mb-4 text-sm leading-relaxed">
              Empowering the next generation with knowledge, character, and skills for a bright future.
            </p>
            <div className="flex space-x-3">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition cursor-pointer">F</div>
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition cursor-pointer">T</div>
              <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition cursor-pointer">I</div>
            </div>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-amber-400">About Us</Link></li>
              <li><Link to="/academics" className="hover:text-amber-400">Academic Calendar</Link></li>
              <li><Link to="/admissions" className="hover:text-amber-400">Apply Now</Link></li>
              <li><Link to="/news" className="hover:text-amber-400">Latest News</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-amber-500" />
                <span>Gatundu Town,<br/>Kiambu County, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-amber-500" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-amber-500" />
                <span>info@gatundugoodluck.ac.ke</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © 2024 Gatundu Goodluck Primary School. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};