'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Shirt, 
  Users, 
  Recycle, 
  Star,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
  Eye,
  ShoppingBag,
  Search,
  Bell,
  User
} from 'lucide-react';

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      size: "M",
      category: "Outerwear",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200",
      rating: 4.8,
      likes: 24,
      views: 156,
      owner: "Sarah M.",
      condition: "Excellent"
    },
    {
      id: 2,
      title: "Summer Floral Dress",
      size: "S",
      category: "Dresses",
      image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200",
      rating: 4.9,
      likes: 31,
      views: 203,
      owner: "Emma K.",
      condition: "Like New"
    },
    {
      id: 3,
      title: "Classic White Sneakers",
      size: "9",
      category: "Footwear",
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200",
      rating: 4.7,
      likes: 18,
      views: 142,
      owner: "Mike R.",
      condition: "Good"
    },
    {
      id: 4,
      title: "Wool Winter Coat",
      size: "L",
      category: "Outerwear",
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200",
      rating: 4.6,
      likes: 27,
      views: 189,
      owner: "Lisa T.",
      condition: "Very Good"
    },
    {
      id: 5,
      title: "Casual Button Shirt",
      size: "M",
      category: "Shirts",
      image: "https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg?auto=compress&cs=tinysrgb&w=1600&h=1200",
      rating: 4.5,
      likes: 15,
      views: 98,
      owner: "Alex P.",
      condition: "Good"
    }
  ];

  const steps = [
    {
      number: 1,
      title: "List Your Items",
      description: "Upload photos and details of clothing you want to exchange",
      icon: <ShoppingBag className="w-8 h-8" />
    },
    {
      number: 2,
      title: "Browse & Connect",
      description: "Discover items you love and connect with other members",
      icon: <Users className="w-8 h-8" />
    },
    {
      number: 3,
      title: "Swap & Enjoy",
      description: "Exchange items or use points to get what you want",
      icon: <Recycle className="w-8 h-8" />
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredItems.length]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Enhanced Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-xl' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18 lg:h-20">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Link href="/" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-[#140b38] to-[#1a0f42] rounded-xl lg:rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-110 transition-all duration-300 hover:rotate-3">
                  <Recycle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-white" />
                </Link>
                <div className="absolute -top-0.5 -right-0.5 lg:-top-1 lg:-right-1 w-2 h-2 lg:w-4 lg:h-4 bg-white rounded-full animate-pulse"></div>
              </div>
              <div>
                <Link href="/" className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#140b38]">
                  ReWear
                </Link>
                <div className="text-xs sm:text-xs lg:text-xs text-[#140b38]/70 font-medium tracking-wider hidden sm:block">SUSTAINABLE FASHION</div>
              </div>
            </div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              <div className="flex items-center space-x-4 xl:space-x-6">
                <Link href="/browse" className="group flex items-center space-x-2 text-[#140b38] hover:text-[#140b38]/80 transition-all duration-300 font-medium relative">
                  <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:inline">Browse Items</span>
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#140b38] group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link href="/community" className="group flex items-center space-x-2 text-[#140b38] hover:text-[#140b38]/80 transition-all duration-300 font-medium relative">
                  <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:inline">Community</span>
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#140b38] group-hover:w-full transition-all duration-300"></div>
                </Link>
                <Link href="/dashboard" className="group flex items-center space-x-2 text-[#140b38] hover:text-[#140b38]/80 transition-all duration-300 font-medium relative">
                  <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:inline">Dashboard</span>
                  <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#140b38] group-hover:w-full transition-all duration-300"></div>
                </Link>
              </div>
              
                {/* Authentication Section */}
                <div className="flex items-center space-x-4 xl:space-x-6">
                  <Link 
                    href="/signin"
                    className="text-[#140b38] hover:text-[#140b38]/80 transition-colors font-medium"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/signup"
                    className="text-[#140b38] hover:text-[#140b38]/80 transition-colors font-medium"
                  >
                    Sign Up
                  </Link>
                  
                  {/* Bell Icon - Moved to Right */}
                  <button className="relative p-2 text-[#140b38] hover:text-[#140b38]/80 transition-colors">
                    <Bell className="w-5 h-5" />
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white border border-[#140b38] rounded-full animate-pulse"></div>
                  </button>
                </div>
            </nav>

            {/* Enhanced Mobile Menu Button */}
            <button
              className="lg:hidden relative p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 bg-[#140b38] rounded-lg flex items-center justify-center shadow-lg">
                {isMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-white" />}
              </div>
            </button>
          </div>

          {/* Enhanced Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-2xl">
              <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-3 sm:space-y-4">
                <Link href="/browse" className="flex items-center space-x-3 text-[#140b38] hover:text-[#140b38]/80 transition-colors font-medium py-2">
                  <Search className="w-5 h-5" />
                  <span>Browse Items</span>
                </Link>
                <Link href="/community" className="flex items-center space-x-3 text-[#140b38] hover:text-[#140b38]/80 transition-colors font-medium py-2">
                  <Users className="w-5 h-5" />
                  <span>Community</span>
                </Link>
                <Link href="/dashboard" className="flex items-center space-x-3 text-[#140b38] hover:text-[#140b38]/80 transition-colors font-medium py-2">
                  <User className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                
                {/* Mobile Authentication */}
                <div className="space-y-3 border-t border-[#140b38]/10 pt-4">
                  <Link 
                    href="/signin"
                    className="w-full border border-[#140b38] text-[#140b38] px-4 sm:px-6 py-3 rounded-xl font-semibold text-sm sm:text-base hover:bg-[#140b38] hover:text-white transition-colors block text-center"
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/signup"
                    className="w-full bg-[#140b38] text-white px-4 sm:px-6 py-3 rounded-xl font-semibold shadow-lg text-sm sm:text-base hover:bg-[#1a0f42] transition-colors block text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Enhanced Hero Section with 4K Images */}
      <section className="relative bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden pt-16 sm:pt-18 lg:pt-20">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        {/* Enhanced Floating Animation Objects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
          <div className="animate-float-slow absolute top-20 sm:top-32 left-4 sm:left-10 opacity-30 sm:opacity-40 z-20">
            <Shirt className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-[#140b38] transform rotate-12" />
          </div>
          <div className="animate-float-medium absolute top-32 sm:top-48 right-4 sm:right-20 opacity-30 sm:opacity-40 z-20">
            <Shirt className="w-10 h-10 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-[#140b38] transform -rotate-12" />
          </div>
          <div className="animate-float-fast absolute bottom-20 sm:bottom-40 left-1/4 opacity-30 sm:opacity-40 z-20">
            <Shirt className="w-12 h-12 sm:w-16 sm:h-16 lg:w-18 lg:h-18 text-[#140b38] transform rotate-45" />
          </div>
          <div className="animate-float-slow absolute top-40 sm:top-60 right-1/3 opacity-20 sm:opacity-30 z-20">
            <Recycle className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 text-[#140b38] transform rotate-12" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            {/* Enhanced Left Content */}
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-2 bg-[#140b38]/10 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-[#140b38]/20 mb-4 sm:mb-6 lg:mb-8">
                <div className="w-2 h-2 bg-[#140b38] rounded-full animate-pulse"></div>
                <span className="text-xs sm:text-sm font-medium text-[#140b38]">10,000+ Active Members</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#140b38] mb-4 sm:mb-6 lg:mb-8 leading-tight">
                Sustainable Fashion
                <span className="block text-white bg-[#140b38] px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl inline-block mt-2 sm:mt-4">
                  Starts Here
                </span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#140b38]/70 mb-6 sm:mb-8 lg:mb-12 leading-relaxed">
                Join our community of conscious fashion lovers. Exchange clothing, reduce waste, 
                and discover your next favorite piece while making a positive impact on the planet.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <button className="group bg-[#140b38] text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl hover:bg-[#1a0f42] transition-all duration-300 font-bold text-base sm:text-lg lg:text-xl flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105">
                  Start Swapping
                  <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                </button>
                <Link href="/browse" className="border-2 sm:border-3 border-[#140b38] text-[#140b38] px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl hover:bg-[#140b38] hover:text-white transition-all duration-300 font-bold text-base sm:text-lg lg:text-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-center">
                  Browse Items
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 lg:space-x-8 mt-6 sm:mt-8 lg:mt-12">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#140b38] rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#140b38]/80 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#140b38]/60 rounded-full border-2 border-white"></div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-[#140b38]/70">Trusted by 10K+ users</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-[#140b38] fill-current" />
                  ))}
                  <span className="text-xs sm:text-sm font-medium text-[#140b38]/70 ml-2">4.9/5 rating</span>
                </div>
              </div>
            </div>

            {/* Enhanced Right Image with 4K Quality */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.pexels.com/photos/5710082/pexels-photo-5710082.jpeg?auto=compress&cs=tinysrgb&w=2000&h=1500" 
                  alt="Sustainable Fashion Community"
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-2xl sm:rounded-3xl shadow-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140b38]/30 via-transparent to-transparent rounded-2xl sm:rounded-3xl"></div>
                
                {/* Overlay Content */}
                <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8">
                  <div className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#140b38] mb-1 sm:mb-2">Latest Exchange</h3>
                    <p className="text-[#140b38]/70 text-xs sm:text-sm">Sarah just swapped a vintage jacket for designer boots!</p>
                    <div className="flex items-center space-x-2 mt-3">
                      <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#140b38] rounded-full"></div>
                      <span className="text-xs font-medium text-[#140b38]">Successful Exchange</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Floating Stats Cards */}
              <div className="absolute -top-3 sm:-top-4 lg:-top-6 -left-3 sm:-left-4 lg:-left-6 bg-white/95 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-2xl animate-bounce-slow border border-[#140b38]/20 z-30">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#140b38]">10K+</div>
                  <div className="text-xs sm:text-sm text-[#140b38]/70 font-medium">Happy Users</div>
                </div>
              </div>
              <div className="absolute -bottom-3 sm:-bottom-4 lg:-bottom-6 -right-3 sm:-right-4 lg:-right-6 bg-white/95 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-2xl animate-bounce-slow border border-[#140b38]/20 z-30" style={{ animationDelay: '1s' }}>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#140b38]">50K+</div>
                  <div className="text-xs sm:text-sm text-[#140b38]/70 font-medium">Items Swapped</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Featured Items Carousel with 4K Images */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-[#140b38]/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-4 sm:mb-6">
              <Star className="w-5 h-5 text-[#140b38]" />
              <span className="text-xs sm:text-sm font-semibold text-[#140b38]">FEATURED COLLECTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#140b38] mb-4 sm:mb-6">
              Trending Items
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#140b38]/70 max-w-3xl mx-auto px-4">
              Discover amazing pieces from our community members. Each item tells a story and finds a new home.
            </p>
          </div>

          {/* Enhanced Featured Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16">
            {featuredItems.slice(0, 3).map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-3xl transition-all duration-700 overflow-hidden border border-gray-100 hover:border-[#140b38]/20 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:rotate-1">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 sm:h-64 lg:h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 sm:top-4 lg:top-6 left-3 sm:left-4 lg:left-6">
                    <span className="bg-[#140b38] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-3 sm:top-4 lg:top-6 right-3 sm:right-4 lg:right-6">
                    <button className="bg-white/90 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-xl hover:bg-white transition-all duration-300 hover:scale-110">
                      <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Quick Action Buttons */}
                  <div className="absolute bottom-3 sm:bottom-4 lg:bottom-6 left-3 sm:left-4 lg:left-6 right-3 sm:right-4 lg:right-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex space-x-3">
                      <button className="flex-1 bg-white/90 backdrop-blur-sm text-[#140b38] py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-white transition-colors">
                        Quick View
                      </button>
                      <button className="flex-1 bg-[#140b38] text-white py-2 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold hover:bg-[#1a0f42] transition-colors">
                        Swap Now
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#140b38] group-hover:text-[#140b38]/80 transition-colors mb-2">
                      {item.title}
                    </h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-[#140b38]/70">Size</span>
                        <span className="text-lg font-bold text-[#140b38] bg-[#140b38]/10 px-3 py-1 rounded-lg min-w-[40px] text-center">
                          {item.size}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-[#140b38] fill-current" />
                      <span className="text-sm sm:text-base font-semibold">{item.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#140b38]/60">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base font-medium">{item.likes}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#140b38]/60">
                      <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-sm sm:text-base font-medium">{item.views}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4 sm:mb-6">
                    <div>
                      <p className="text-sm sm:text-base text-[#140b38]/70">Owner: <span className="font-semibold text-[#140b38]">{item.owner}</span></p>
                      <p className="text-sm sm:text-base text-[#140b38]/70">Condition: <span className="font-semibold text-[#140b38]">{item.condition}</span></p>
                    </div>
                  </div>

                  <button className="w-full bg-[#140b38] text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl hover:bg-[#1a0f42] transition-all duration-300 font-bold text-sm sm:text-base lg:text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced How it Works */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-[#140b38]/20 mb-4 sm:mb-6">
              <Recycle className="w-5 h-5 text-[#140b38]" />
              <span className="text-xs sm:text-sm font-semibold text-[#140b38]">HOW IT WORKS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#140b38] mb-4 sm:mb-6">
              Simple Steps to
              <span className="block text-white bg-[#140b38] px-4 sm:px-6 py-2 sm:py-3 rounded-2xl sm:rounded-3xl inline-block mt-2 sm:mt-4 shadow-xl">
                Start Swapping
              </span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#140b38]/70 max-w-3xl mx-auto px-4">
              Join thousands of users making fashion more sustainable. Start your journey in just three simple steps.
            </p>
          </div>

          <div className="relative">
            {/* Connecting Lines */}
            <div className="hidden lg:block absolute top-12 sm:top-16 left-0 right-0 z-0">
              <div className="max-w-5xl mx-auto px-4">
                <div className="flex items-center justify-center">
                  <div className="flex-1 max-w-xs"></div>
                  <div className="w-16 sm:w-20 lg:w-24 h-1 bg-[#140b38]/30 rounded-full mx-4 sm:mx-6 lg:mx-8"></div>
                  <div className="flex-1 max-w-xs"></div>
                  <div className="w-16 sm:w-20 lg:w-24 h-1 bg-[#140b38]/30 rounded-full mx-4 sm:mx-6 lg:mx-8"></div>
                  <div className="flex-1 max-w-xs"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 relative z-10 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={step.number} className="text-center group relative flex flex-col items-center">
                <div className="relative mb-6 sm:mb-8 lg:mb-10">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-[#140b38] rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl group-hover:shadow-3xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 transform relative z-20">
                    <div className="text-white">
                      {step.icon}
                    </div>
                  </div>
                  <div className="absolute -top-2 sm:-top-3 lg:-top-4 -right-2 sm:-right-3 lg:-right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 bg-white border-2 sm:border-3 border-[#140b38] rounded-xl sm:rounded-2xl flex items-center justify-center text-[#140b38] font-bold text-sm sm:text-base lg:text-xl shadow-xl z-30">
                    {step.number}
                  </div>
                </div>
                <div className="max-w-sm">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#140b38] mb-3 sm:mb-4 group-hover:text-[#140b38]/80 transition-colors">
                  {step.title}
                </h3>
                  <p className="text-[#140b38]/70 leading-relaxed text-sm sm:text-base lg:text-lg text-center px-2">
                  {step.description}
                </p>
                </div>
              </div>
            ))}
            </div>
          </div>

          <div className="text-center mt-12 sm:mt-16 lg:mt-20">
            <button className="bg-[#140b38] text-white px-8 sm:px-10 lg:px-12 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl hover:bg-[#1a0f42] transition-all duration-300 font-bold text-base sm:text-lg lg:text-xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 hover:scale-105 relative z-10">
              Get Started Today
            </button>
          </div>
        </div>
      </section>

      {/* Enhanced Community Stats with 4K Images */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-[#140b38]/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8">
                <Users className="w-5 h-5 text-[#140b38]" />
                <span className="text-xs sm:text-sm font-semibold text-[#140b38]">COMMUNITY IMPACT</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#140b38] mb-6 sm:mb-8">
                Join Our Growing
                <Link href="/community" className="block text-[#140b38] hover:text-[#140b38]/80 transition-colors font-medium py-2">
                  Community
                </Link>
              </h2>
              
              <p className="text-base sm:text-lg md:text-xl text-[#140b38]/70 mb-8 sm:mb-10 lg:mb-12 leading-relaxed">
                Be part of a movement that's changing how we think about fashion. 
                Together, we're creating a more sustainable future, one swap at a time.
              </p>
              
              <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                <div className="text-center p-4 sm:p-6 lg:p-8 bg-[#140b38]/5 rounded-2xl sm:rounded-3xl border border-[#140b38]/10 hover:border-[#140b38]/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#140b38] mb-2 sm:mb-3">10,000+</div>
                  <div className="text-xs sm:text-sm lg:text-base text-[#140b38]/70 font-medium">Active Members</div>
                </div>
                <div className="text-center p-4 sm:p-6 lg:p-8 bg-[#140b38]/5 rounded-2xl sm:rounded-3xl border border-[#140b38]/10 hover:border-[#140b38]/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#140b38] mb-2 sm:mb-3">50,000+</div>
                  <div className="text-xs sm:text-sm lg:text-base text-[#140b38]/70 font-medium">Items Exchanged</div>
                </div>
                <div className="text-center p-4 sm:p-6 lg:p-8 bg-[#140b38]/5 rounded-2xl sm:rounded-3xl border border-[#140b38]/10 hover:border-[#140b38]/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#140b38] mb-2 sm:mb-3">25 Tons</div>
                  <div className="text-xs sm:text-sm lg:text-base text-[#140b38]/70 font-medium">Waste Prevented</div>
                </div>
                <div className="text-center p-4 sm:p-6 lg:p-8 bg-[#140b38]/5 rounded-2xl sm:rounded-3xl border border-[#140b38]/10 hover:border-[#140b38]/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#140b38] mb-2 sm:mb-3">98%</div>
                  <div className="text-xs sm:text-sm lg:text-base text-[#140b38]/70 font-medium">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/5710083/pexels-photo-5710083.jpeg?auto=compress&cs=tinysrgb&w=2000&h=1500" 
                alt="Community Members"
                className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-2xl sm:rounded-3xl shadow-3xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140b38]/30 via-transparent to-transparent rounded-2xl sm:rounded-3xl"></div>
              
              {/* Community Highlight Overlay */}
              <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 right-4 sm:right-6 lg:right-8">
                <div className="bg-white/90 backdrop-blur-sm p-3 sm:p-4 lg:p-6 rounded-xl sm:rounded-2xl shadow-xl">
                  <h3 className="text-sm sm:text-base lg:text-lg font-bold text-[#140b38] mb-1 sm:mb-2">Community Highlight</h3>
                  <p className="text-[#140b38]/70 text-xs sm:text-sm">This month: 2,500 successful swaps and counting!</p>
                  <div className="flex items-center space-x-2 mt-3">
                    <div className="w-4 h-4 sm:w-6 sm:h-6 bg-[#140b38] rounded-full"></div>
                    <span className="text-xs font-medium text-[#140b38]">Growing Community</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-[#140b38] text-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-16">
            {/* Enhanced Logo and Description */}
            <div className="sm:col-span-2 lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6 sm:mb-8">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl">
                  <Recycle className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-[#140b38]" />
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-bold">ReWear</span>
                  <div className="text-xs text-white/70 font-medium tracking-wider hidden sm:block">SUSTAINABLE FASHION</div>
                </div>
              </div>
              <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-md mb-6 sm:mb-8">
                Building a sustainable future through community-driven clothing exchange. 
                Join thousands of users making fashion more circular and environmentally friendly.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-white hover:text-[#140b38] transition-all duration-300 hover:scale-110">
                  <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-white hover:text-[#140b38] transition-all duration-300 hover:scale-110">
                  <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
                <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center hover:bg-white hover:text-[#140b38] transition-all duration-300 hover:scale-110">
                  <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Quick Links</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li><a href="#" className="text-sm sm:text-base text-white/70 hover:text-white transition-colors hover:translate-x-1 transform duration-300 inline-block">About Us</a></li>
                <li><a href="#" className="text-sm sm:text-base text-white/70 hover:text-white transition-colors hover:translate-x-1 transform duration-300 inline-block">Browse Items</a></li>
                <li><a href="#" className="text-sm sm:text-base text-white/70 hover:text-white transition-colors hover:translate-x-1 transform duration-300 inline-block">List an Item</a></li>
                <li><a href="#" className="text-sm sm:text-base text-white/70 hover:text-white transition-colors hover:translate-x-1 transform duration-300 inline-block">Community</a></li>
                <li><a href="#" className="text-sm sm:text-base text-white/70 hover:text-white transition-colors hover:translate-x-1 transform duration-300 inline-block">Support</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-8">Contact</h3>
              <ul className="space-y-3 sm:space-y-4">
                <li className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
                  <span className="text-sm sm:text-base text-white/70">hello@rewear.com</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
                  <span className="text-sm sm:text-base text-white/70">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white flex-shrink-0" />
                  <span className="text-sm sm:text-base text-white/70">San Francisco, CA</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Enhanced Bottom Bar */}
          <div className="border-t border-white/20 pt-6 sm:pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm sm:text-base text-white/60 text-center md:text-left">
              © 2025 ReWear. All rights reserved. Made with ❤️ for sustainable fashion.
            </p>
            <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 lg:space-x-8">
              <a href="#" className="text-sm sm:text-base text-white/60 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-sm sm:text-base text-white/60 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm sm:text-base text-white/60 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;