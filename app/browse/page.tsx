'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { 
  Filter, 
  Grid3X3, 
  List, 
  SlidersHorizontal,
  Star,
  Heart,
  Eye,
  Coins,
  X,
  ChevronDown,
  ArrowUpDown,
  Search
} from 'lucide-react';

const BrowseItems = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({
    category: '',
    type: '',
    size: '',
    condition: '',
    tags: '',
    pointsRange: [0, 500]
  });

  // Mock items data
  const allItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      description: "Classic vintage denim jacket in excellent condition",
      category: "Outerwear",
      type: "Unisex",
      size: "M",
      condition: "Excellent",
      tags: ["Vintage", "Denim", "Classic"],
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      points: 150,
      likes: 24,
      views: 156,
      dateAdded: "2024-01-15",
      uploader: "Sarah M.",
      status: "Available"
    },
    {
      id: 2,
      title: "Summer Floral Dress",
      description: "Beautiful floral dress perfect for summer",
      category: "Dresses",
      type: "Women",
      size: "S",
      condition: "Like New",
      tags: ["Floral", "Summer", "Casual"],
      image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      points: 120,
      likes: 31,
      views: 203,
      dateAdded: "2024-01-14",
      uploader: "Emma K.",
      status: "Available"
    },
    {
      id: 3,
      title: "Classic White Sneakers",
      description: "Clean white sneakers in great condition",
      category: "Footwear",
      type: "Unisex",
      size: "9",
      condition: "Good",
      tags: ["Sneakers", "White", "Classic"],
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      points: 80,
      likes: 18,
      views: 142,
      dateAdded: "2024-01-13",
      uploader: "Mike R.",
      status: "Available"
    },
    {
      id: 4,
      title: "Wool Winter Coat",
      description: "Warm wool coat for winter weather",
      category: "Outerwear",
      type: "Women",
      size: "L",
      condition: "Very Good",
      tags: ["Wool", "Winter", "Warm"],
      image: "https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      points: 200,
      likes: 27,
      views: 189,
      dateAdded: "2024-01-12",
      uploader: "Lisa T.",
      status: "Available"
    },
    {
      id: 5,
      title: "Casual Button Shirt",
      description: "Comfortable casual shirt for everyday wear",
      category: "Tops",
      type: "Men",
      size: "M",
      condition: "Good",
      tags: ["Casual", "Button", "Everyday"],
      image: "https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      points: 60,
      likes: 15,
      views: 98,
      dateAdded: "2024-01-11",
      uploader: "Alex P.",
      status: "Available"
    },
    {
      id: 6,
      title: "Designer Handbag",
      description: "Elegant designer handbag in pristine condition",
      category: "Accessories",
      type: "Women",
      size: "One Size",
      condition: "New",
      tags: ["Designer", "Handbag", "Luxury"],
      image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      points: 300,
      likes: 42,
      views: 267,
      dateAdded: "2024-01-10",
      uploader: "Grace L.",
      status: "Available"
    },
    {
      id: 7,
      title: "Athletic Running Shoes",
      description: "High-performance running shoes",
      category: "Footwear",
      type: "Unisex",
      size: "10",
      condition: "Like New",
      tags: ["Athletic", "Running", "Performance"],
      image: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      points: 110,
      likes: 22,
      views: 134,
      dateAdded: "2024-01-09",
      uploader: "Jordan S.",
      status: "Available"
    },
    {
      id: 8,
      title: "Knit Sweater",
      description: "Cozy knit sweater for cold days",
      category: "Tops",
      type: "Women",
      size: "S",
      condition: "Excellent",
      tags: ["Knit", "Sweater", "Cozy"],
      image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      points: 90,
      likes: 19,
      views: 112,
      dateAdded: "2024-01-08",
      uploader: "Maya C.",
      status: "Available"
    }
  ];

  const categories = ['All', 'Tops', 'Bottoms', 'Dresses', 'Outerwear', 'Footwear', 'Accessories', 'Activewear'];
  const types = ['All', 'Women', 'Men', 'Kids', 'Unisex'];
  const sizes = ['All', 'XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', '6', '7', '8', '9', '10', '11', '12', 'One Size'];
  const conditions = ['All', 'New', 'Like New', 'Excellent', 'Very Good', 'Good', 'Fair'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'popular', label: 'Most Popular' },
    { value: 'points-low', label: 'Points: Low to High' },
    { value: 'points-high', label: 'Points: High to Low' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  // Filter and sort items
  const filteredItems = allItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !filters.category || filters.category === 'All' || item.category === filters.category;
    const matchesType = !filters.type || filters.type === 'All' || item.type === filters.type;
    const matchesSize = !filters.size || filters.size === 'All' || item.size === filters.size;
    const matchesCondition = !filters.condition || filters.condition === 'All' || item.condition === filters.condition;
    const matchesPoints = item.points >= filters.pointsRange[0] && item.points <= filters.pointsRange[1];
    
    return matchesSearch && matchesCategory && matchesType && matchesSize && matchesCondition && matchesPoints;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      case 'oldest':
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      case 'popular':
        return (b.likes + b.views) - (a.likes + a.views);
      case 'points-low':
        return a.points - b.points;
      case 'points-high':
        return b.points - a.points;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      type: '',
      size: '',
      condition: '',
      tags: '',
      pointsRange: [0, 500]
    });
    setSearchTerm('');
  };

  const getConditionColor = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'like new': return 'bg-blue-100 text-blue-800';
      case 'excellent': return 'bg-purple-100 text-purple-800';
      case 'very good': return 'bg-indigo-100 text-indigo-800';
      case 'good': return 'bg-yellow-100 text-yellow-800';
      case 'fair': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-[#140b38] flex items-center space-x-2">
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </h2>
                <button
                  onClick={clearFilters}
                  className="text-sm text-[#140b38]/70 hover:text-[#140b38] transition-colors"
                >
                  Clear All
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#140b38] mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#140b38]/40" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search items..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#140b38] mb-2">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Type Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#140b38] mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                >
                  {types.map(type => (
                    <option key={type} value={type === 'All' ? '' : type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#140b38] mb-2">Size</label>
                <select
                  value={filters.size}
                  onChange={(e) => handleFilterChange('size', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                >
                  {sizes.map(size => (
                    <option key={size} value={size === 'All' ? '' : size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>

              {/* Condition Filter */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#140b38] mb-2">Condition</label>
                <select
                  value={filters.condition}
                  onChange={(e) => handleFilterChange('condition', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                >
                  {conditions.map(condition => (
                    <option key={condition} value={condition === 'All' ? '' : condition}>
                      {condition}
                    </option>
                  ))}
                </select>
              </div>

              {/* Points Range */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-[#140b38] mb-2">
                  Points Range: {filters.pointsRange[0]} - {filters.pointsRange[1]}
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.pointsRange[1]}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      pointsRange: [prev.pointsRange[0], parseInt(e.target.value)]
                    }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-[#140b38]/70">
                    <span>0 pts</span>
                    <span>500+ pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header Controls */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#140b38] mb-2">Browse Items</h1>
                  <p className="text-[#140b38]/70">
                    {sortedItems.length} {sortedItems.length === 1 ? 'item' : 'items'} available
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort Dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                    >
                      {sortOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ArrowUpDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#140b38]/60 pointer-events-none" />
                  </div>

                  {/* View Mode Toggle */}
                  <div className="flex bg-gray-100 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-[#140b38] text-white' 
                          : 'text-[#140b38]/60 hover:text-[#140b38]'
                      }`}
                    >
                      <Grid3X3 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-[#140b38] text-white' 
                          : 'text-[#140b38]/60 hover:text-[#140b38]'
                      }`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden bg-[#140b38] text-white p-2 rounded-xl"
                  >
                    <SlidersHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Items Grid/List */}
            {sortedItems.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center border border-gray-100">
                <div className="w-20 h-20 bg-[#140b38]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-[#140b38]/60" />
                </div>
                <h3 className="text-xl font-bold text-[#140b38] mb-2">No items found</h3>
                <p className="text-[#140b38]/70 mb-6">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="bg-[#140b38] text-white px-6 py-3 rounded-xl hover:bg-[#1a0f42] transition-colors font-semibold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'space-y-6'
              }>
                {sortedItems.map((item) => (
                  <Link
                    key={item.id}
                    href={`/item/${item.id}`}
                    className={`group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#140b38]/20 transform hover:-translate-y-1 ${
                      viewMode === 'list' ? 'flex' : ''
                    }`}
                  >
                    <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                          viewMode === 'list' ? 'w-full h-full' : 'w-full h-48 sm:h-64'
                        }`}
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getConditionColor(item.condition)}`}>
                          {item.condition}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                        </button>
                      </div>
                    </div>
                    
                    <div className={`p-4 sm:p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-bold text-[#140b38] text-lg group-hover:text-[#140b38]/80 transition-colors mb-1">
                            {item.title}
                          </h3>
                          <p className="text-[#140b38]/70 text-sm">{item.category} • {item.type}</p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-[#140b38] font-bold">
                            <Coins className="w-4 h-4" />
                            <span>{item.points}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-[#140b38]/70">Size</span>
                          <span className="text-lg font-bold text-[#140b38] bg-[#140b38]/10 px-3 py-1 rounded-lg">
                            {item.size}
                          </span>
                        </div>
                        <span className="text-sm text-[#140b38]/70">by {item.uploader}</span>
                      </div>

                      {viewMode === 'list' && (
                        <p className="text-[#140b38]/70 text-sm mb-4 line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm text-[#140b38]/60">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{item.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{item.views}</span>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                          {item.status}
                        </span>
                      </div>

                      {/* Tags */}
                      {item.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index}
                              className="bg-[#140b38]/10 text-[#140b38] px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                          {item.tags.length > 3 && (
                            <span className="text-[#140b38]/60 text-xs">
                              +{item.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseItems;