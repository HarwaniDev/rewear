'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { 
  Mail, 
  Camera, 
  Star, 
  Edit3, 
  Trash2, 
  Eye, 
  Heart, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar, 
  Filter, 
  Search, 
  Plus,
  User
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock user data
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
    joinDate: 'March 2024',
    pointsBalance: 1250,
    totalSwaps: 23,
    rating: 4.9,
    location: 'San Francisco, CA'
  };

  // Mock uploaded items
  const uploadedItems = [
    {
      id: 1,
      title: 'Vintage Denim Jacket',
      category: 'Outerwear',
      status: 'Available',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      uploadDate: '2024-01-15',
      views: 156,
      likes: 24,
      size: 'M'
    },
    {
      id: 2,
      title: 'Summer Floral Dress',
      category: 'Dresses',
      status: 'Swapped',
      image: 'https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      uploadDate: '2024-01-10',
      views: 203,
      likes: 31,
      size: 'S'
    },
    {
      id: 3,
      title: 'Classic White Sneakers',
      category: 'Footwear',
      status: 'Available',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      uploadDate: '2024-01-08',
      views: 142,
      likes: 18,
      size: '9'
    },
    {
      id: 4,
      title: 'Wool Winter Coat',
      category: 'Outerwear',
      status: 'Pending',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      uploadDate: '2024-01-05',
      views: 189,
      likes: 27,
      size: 'L'
    }
  ];

  // Mock swap requests
  const swapRequests = [
    {
      id: 1,
      type: 'incoming',
      fromUser: 'Emma Wilson',
      fromUserAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      requestedItem: 'Vintage Denim Jacket',
      offeredItem: 'Designer Handbag',
      offeredItemImage: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      date: '2024-01-20',
      status: 'pending'
    },
    {
      id: 2,
      type: 'outgoing',
      toUser: 'Mike Rodriguez',
      toUserAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      requestedItem: 'Leather Boots',
      offeredItem: 'Classic White Sneakers',
      offeredItemImage: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      date: '2024-01-18',
      status: 'pending'
    }
  ];

  // Mock completed swaps
  const completedSwaps = [
    {
      id: 1,
      swappedWith: 'Lisa Thompson',
      swappedWithAvatar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      myItem: 'Summer Floral Dress',
      theirItem: 'Vintage Blazer',
      date: '2024-01-12',
      rating: 5
    },
    {
      id: 2,
      swappedWith: 'Alex Chen',
      swappedWithAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      myItem: 'Casual Button Shirt',
      theirItem: 'Denim Jeans',
      date: '2024-01-05',
      rating: 4
    },
    {
      id: 3,
      swappedWith: 'Jordan Smith',
      swappedWithAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200',
      myItem: 'Winter Scarf',
      theirItem: 'Knit Sweater',
      date: '2023-12-28',
      rating: 5
    }
  ];

  const filteredItems = uploadedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || item.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200';
      case 'swapped': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="w-4 h-4" /> },
    { id: 'items', label: 'My Items', icon: <Star className="w-4 h-4" /> },
    { id: 'requests', label: 'Swap Requests', icon: <Clock className="w-4 h-4" /> },
    { id: 'history', label: 'Swap History', icon: <CheckCircle className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* User Profile Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 mb-8 border border-gray-100">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-20 h-20 rounded-2xl object-cover shadow-lg"
                  />
                  <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#140b38] rounded-xl flex items-center justify-center shadow-lg hover:bg-[#1a0f42] transition-colors">
                    <Camera className="w-4 h-4 text-white" />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-[#140b38] mb-1">{user.name}</h2>
                <p className="text-[#140b38]/70 text-sm mb-4">{user.email}</p>
                
                {/* Points Balance */}
                <div className="bg-gradient-to-r from-[#140b38] to-[#1a0f42] rounded-2xl p-4 mb-4">
                  <div className="text-white text-center">
                    <div className="text-2xl font-bold">{user.pointsBalance.toLocaleString()}</div>
                    <div className="text-white/80 text-sm">ReWear Points</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-[#140b38]">{user.totalSwaps}</div>
                    <div className="text-[#140b38]/70 text-xs">Total Swaps</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[#140b38] flex items-center justify-center">
                      {user.rating} <Star className="w-4 h-4 text-yellow-500 fill-current ml-1" />
                    </div>
                    <div className="text-[#140b38]/70 text-xs">Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-3xl shadow-xl p-2 border border-gray-100">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-[#140b38] text-white shadow-lg'
                        : 'text-[#140b38] hover:bg-[#140b38]/5'
                    }`}
                  >
                    {tab.icon}
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-3xl font-bold text-[#140b38] mb-2">Welcome back, {user.name.split(' ')[0]}!</h1>
                  <p className="text-[#140b38]/70">Here's what's happening with your ReWear account.</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <Star className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-2xl font-bold text-[#140b38]">{uploadedItems.length}</span>
                    </div>
                    <h3 className="font-semibold text-[#140b38] mb-1">Items Listed</h3>
                    <p className="text-[#140b38]/70 text-sm">Active listings</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-2xl font-bold text-[#140b38]">{swapRequests.length}</span>
                    </div>
                    <h3 className="font-semibold text-[#140b38] mb-1">Pending Requests</h3>
                    <p className="text-[#140b38]/70 text-sm">Awaiting response</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-2xl font-bold text-[#140b38]">{completedSwaps.length}</span>
                    </div>
                    <h3 className="font-semibold text-[#140b38] mb-1">Completed Swaps</h3>
                    <p className="text-[#140b38]/70 text-sm">This month</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-[#140b38] mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {completedSwaps.slice(0, 3).map((swap) => (
                      <div key={swap.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                        <img 
                          src={swap.swappedWithAvatar} 
                          alt={swap.swappedWith}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-[#140b38] font-medium">
                            Swapped <span className="font-bold">{swap.myItem}</span> with {swap.swappedWith}
                          </p>
                          <p className="text-[#140b38]/70 text-sm">{swap.date}</p>
                        </div>
                        <div className="flex">
                          {[...Array(swap.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* My Items Tab */}
            {activeTab === 'items' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-[#140b38] mb-2">My Items</h1>
                    <p className="text-[#140b38]/70">Manage your uploaded clothing items</p>
                  </div>
                  <button className="bg-[#140b38] text-white px-6 py-3 rounded-xl hover:bg-[#1a0f42] transition-colors font-semibold flex items-center space-x-2 shadow-lg">
                    <Plus className="w-5 h-5" />
                    <span>Add New Item</span>
                  </button>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#140b38]/40" />
                        <input
                          type="text"
                          placeholder="Search your items..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-[#140b38]/40" />
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                      >
                        <option value="all">All Status</option>
                        <option value="available">Available</option>
                        <option value="pending">Pending</option>
                        <option value="swapped">Swapped</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 flex space-x-2">
                          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                            <Edit3 className="w-4 h-4 text-[#140b38]" />
                          </button>
                          <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-[#140b38] text-lg">{item.title}</h3>
                          <span className="text-lg font-bold text-[#140b38] bg-[#140b38]/10 px-3 py-1 rounded-lg">
                            {item.size}
                          </span>
                        </div>
                        <p className="text-[#140b38]/70 text-sm mb-3">{item.category}</p>
                        
                        <div className="flex items-center justify-between text-sm text-[#140b38]/60 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{item.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{item.likes}</span>
                            </div>
                          </div>
                          <span>{item.uploadDate}</span>
                        </div>
                        
                        <button className="w-full bg-[#140b38] text-white py-2 rounded-xl hover:bg-[#1a0f42] transition-colors font-semibold">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Swap Requests Tab */}
            {activeTab === 'requests' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#140b38] mb-2">Swap Requests</h1>
                  <p className="text-[#140b38]/70">Manage incoming and outgoing swap requests</p>
                </div>

                {/* Incoming Requests */}
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <div className="flex items-center space-x-2 mb-6">
                    <ArrowDownLeft className="w-6 h-6 text-green-600" />
                    <h2 className="text-xl font-bold text-[#140b38]">Incoming Requests</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {swapRequests.filter(req => req.type === 'incoming').map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-2xl p-4 hover:border-[#140b38]/20 transition-colors">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={request.fromUserAvatar} 
                            alt={request.fromUser}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-[#140b38]">{request.fromUser}</p>
                            <p className="text-[#140b38]/70 text-sm">
                              Wants your <span className="font-medium">{request.requestedItem}</span>
                            </p>
                            <p className="text-[#140b38]/70 text-sm">
                              Offers: <span className="font-medium">{request.offeredItem}</span>
                            </p>
                          </div>
                          <img 
                            src={request.offeredItemImage} 
                            alt={request.offeredItem}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                          <div className="flex flex-col space-y-2">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">
                              Accept
                            </button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold">
                              Decline
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outgoing Requests */}
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <div className="flex items-center space-x-2 mb-6">
                    <ArrowUpRight className="w-6 h-6 text-blue-600" />
                    <h2 className="text-xl font-bold text-[#140b38]">Outgoing Requests</h2>
                  </div>
                  
                  <div className="space-y-4">
                    {swapRequests.filter(req => req.type === 'outgoing').map((request) => (
                      <div key={request.id} className="border border-gray-200 rounded-2xl p-4 hover:border-[#140b38]/20 transition-colors">
                        <div className="flex items-center space-x-4">
                          <img 
                            src={request.toUserAvatar} 
                            alt={request.toUser}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-[#140b38]">{request.toUser}</p>
                            <p className="text-[#140b38]/70 text-sm">
                              You want their <span className="font-medium">{request.requestedItem}</span>
                            </p>
                            <p className="text-[#140b38]/70 text-sm">
                              You offered: <span className="font-medium">{request.offeredItem}</span>
                            </p>
                          </div>
                          <img 
                            src={request.offeredItemImage} 
                            alt={request.offeredItem}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                          <div className="flex flex-col space-y-2">
                            <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-semibold text-center">
                              Pending
                            </span>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold">
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Swap History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-[#140b38] mb-2">Swap History</h1>
                  <p className="text-[#140b38]/70">Your completed clothing exchanges</p>
                </div>

                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="space-y-4">
                      {completedSwaps.map((swap) => (
                        <div key={swap.id} className="border border-gray-200 rounded-2xl p-6 hover:border-[#140b38]/20 transition-colors">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <img 
                                src={swap.swappedWithAvatar} 
                                alt={swap.swappedWith}
                                className="w-16 h-16 rounded-xl object-cover"
                              />
                              <div>
                                <h3 className="font-bold text-[#140b38] text-lg">{swap.swappedWith}</h3>
                                <div className="flex items-center space-x-1">
                                  {[...Array(swap.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                                  ))}
                                  <span className="text-[#140b38]/70 text-sm ml-2">({swap.rating}/5)</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 text-[#140b38]/70">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">{swap.date}</span>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                              <h4 className="font-semibold text-red-800 mb-2">You Gave</h4>
                              <p className="text-red-700">{swap.myItem}</p>
                            </div>
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                              <h4 className="font-semibold text-green-800 mb-2">You Received</h4>
                              <p className="text-green-700">{swap.theirItem}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;