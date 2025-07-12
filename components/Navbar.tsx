'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Recycle, 
  Search, 
  Users, 
  User, 
  Plus, 
  Shield, 
  Bell, 
  Menu, 
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { href: '/browse', label: 'Browse Items', icon: <Search className="w-4 h-4 group-hover:scale-110 transition-transform" /> },
    { href: '/community', label: 'Community', icon: <Users className="w-4 h-4 group-hover:scale-110 transition-transform" /> },
    { href: '/dashboard', label: 'Dashboard', icon: <User className="w-4 h-4 group-hover:scale-110 transition-transform" /> },
    { href: '/list-item', label: 'Create Item', icon: <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" /> },
    { href: '/admin', label: 'Admin', icon: <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" /> }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled || pathname !== '/'
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#140b38] to-[#1a0f42] rounded-xl lg:rounded-2xl flex items-center justify-center shadow-xl">
              <Recycle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" />
            </div>
            <div>
              <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#140b38]">ReWear</span>
              <div className="text-xs text-[#140b38]/70 font-medium tracking-wider hidden sm:block">SUSTAINABLE FASHION</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-4 xl:space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`group flex items-center space-x-2 text-[#140b38] hover:text-[#140b38]/80 transition-all duration-300 font-medium relative ${
                    isActive(link.href) ? 'text-[#140b38]' : ''
                  }`}
                >
                  {link.icon}
                  <span className="hidden xl:inline">{link.label}</span>
                  <div className={`absolute -bottom-2 left-0 h-0.5 bg-[#140b38] transition-all duration-300 ${
                    isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></div>
                </Link>
              ))}
            </div>
            
            {/* Authentication Section */}
            <div className="flex items-center space-x-4 xl:space-x-6">
              <Link 
                href="/login"
                className="text-[#140b38] hover:text-[#140b38]/80 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link 
                href="/register"
                className="text-[#140b38] hover:text-[#140b38]/80 transition-colors font-medium"
              >
                Sign Up
              </Link>
              
              {/* Bell Icon */}
              <button className="relative p-2 text-[#140b38] hover:text-[#140b38]/80 transition-colors">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></div>
              </button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-8 h-8 bg-[#140b38] rounded-lg flex items-center justify-center">
              {isMobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-3">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className={`flex items-center space-x-3 text-[#140b38] hover:text-[#140b38]/80 transition-colors font-medium py-2 ${
                    isActive(link.href) ? 'bg-[#140b38]/5 px-3 rounded-lg' : ''
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              
              {/* Mobile Authentication */}
              <div className="space-y-3 border-t border-[#140b38]/10 pt-4">
                <Link 
                  href="/login"
                  className="w-full border border-[#140b38] text-[#140b38] px-4 sm:px-6 py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#140b38] hover:text-white transition-colors block text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  className="w-full bg-[#140b38] text-white px-4 sm:px-6 py-3 rounded-xl font-semibold shadow-lg text-sm sm:text-base hover:bg-[#1a0f42] transition-colors block text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;