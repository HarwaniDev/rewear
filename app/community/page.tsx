'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { 
  Users, 
  Star, 
  Heart, 
  Eye, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Award, 
  TrendingUp, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  ShoppingBag, 
  Coins, 
  CheckCircle, 
  Clock, 
  ArrowUpRight,
  Camera,
  Share2,
  ThumbsUp,
  MessageSquare,
} from 'lucide-react';

const Community = () => {
  const [activeTab, setActiveTab] = useState('members');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('all');

  // Mock community members data
  const communityMembers = [
    {
      id: 1,
      name: "Sarah Martinez",
      username: "sarah_style",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      location: "San Francisco, CA",
      joinDate: "March 2024",
      rating: 4.9,
      totalItems: 24,
      completedSwaps: 18,
      points: 1250,
      badges: ["Top Swapper", "Eco Warrior", "Community Helper"],
      bio: "Passionate about sustainable fashion and helping others find their perfect style!",
      recentActivity: "Swapped a vintage jacket 2 hours ago",
      isOnline: true,
      followers: 156,
      following: 89
    },
    {
      id: 2,
      name: "Emma Wilson",
      username: "emma_eco",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      location: "New York, NY",
      joinDate: "February 2024",
      rating: 4.8,
      totalItems: 31,
      completedSwaps: 25,
      points: 1680,
      badges: ["Style Icon", "Verified Member"],
      bio: "Fashion lover sharing beautiful pieces with the community 💚",
      recentActivity: "Listed 3 new items today",
      isOnline: false,
      followers: 203,
      following: 124
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      username: "mike_threads",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      location: "Los Angeles, CA",
      joinDate: "January 2024",
      rating: 4.7,
      totalItems: 19,
      completedSwaps: 14,
      points: 890,
      badges: ["Rising Star"],
      bio: "Streetwear enthusiast building a sustainable wardrobe",
      recentActivity: "Received 5-star rating 1 day ago",
      isOnline: true,
      followers: 98,
      following: 67
    },
    {
      id: 4,
      name: "Lisa Thompson",
      username: "lisa_vintage",
      avatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      location: "Chicago, IL",
      joinDate: "December 2023",
      rating: 4.9,
      totalItems: 42,
      completedSwaps: 35,
      points: 2150,
      badges: ["Vintage Expert", "Top Contributor", "Community Leader"],
      bio: "Vintage collector sharing timeless pieces with fellow fashion lovers",
      recentActivity: "Helped 3 members find perfect items",
      isOnline: false,
      followers: 324,
      following: 156
    },
    {
      id: 5,
      name: "Alex Chen",
      username: "alex_minimal",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      location: "Seattle, WA",
      joinDate: "April 2024",
      rating: 4.6,
      totalItems: 16,
      completedSwaps: 11,
      points: 650,
      badges: ["Minimalist", "New Member"],
      bio: "Minimalist approach to fashion - quality over quantity",
      recentActivity: "Joined the community 2 weeks ago",
      isOnline: true,
      followers: 45,
      following: 23
    },
    {
      id: 6,
      name: "Jordan Smith",
      username: "jordan_boho",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      location: "Austin, TX",
      joinDate: "March 2024",
      rating: 4.8,
      totalItems: 28,
      completedSwaps: 22,
      points: 1340,
      badges: ["Boho Queen", "Style Influencer"],
      bio: "Bohemian style lover spreading good vibes through fashion",
      recentActivity: "Shared styling tips in the forum",
      isOnline: false,
      followers: 187,
      following: 134
    }
  ];

  // Mock recent activity data
  const recentActivity = [
    {
      id: 1,
      type: "swap",
      user: "Sarah Martinez",
      userAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
      action: "completed a swap",
      item: "Vintage Denim Jacket",
      itemImage: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
      time: "2 hours ago",
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      type: "listing",
      user: "Emma Wilson",
      userAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
      action: "listed a new item",
      item: "Designer Evening Gown",
      itemImage: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
      time: "4 hours ago",
      likes: 18,
      comments: 7
    },
    {
      id: 3,
      type: "achievement",
      user: "Lisa Thompson",
      userAvatar: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
      action: "earned the badge",
      item: "Community Leader",
      time: "1 day ago",
      likes: 25,
      comments: 8
    },
    {
      id: 4,
      type: "review",
      user: "Mike Rodriguez",
      userAvatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
      action: "received a 5-star review",
      item: "Casual Button Shirt",
      itemImage: "https://images.pexels.com/photos/769732/pexels-photo-769732.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
      time: "1 day ago",
      likes: 8,
      comments: 2
    },
    {
      id: 5,
      type: "milestone",
      user: "Jordan Smith",
      userAvatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
      action: "reached 20 successful swaps",
      time: "2 days ago",
      likes: 15,
      comments: 5
    }
  ];

  // Mock community stats
  const communityStats = {
    totalMembers: 10247,
    activeToday: 1834,
    totalSwaps: 52891,
    itemsShared: 89456,
    co2Saved: "125 tons",
    topLocation: "San Francisco"
  };

  const locations = ['All Locations', 'San Francisco, CA', 'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Seattle, WA', 'Austin, TX'];

  const filteredMembers = communityMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.bio.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === 'all' || filterLocation === 'All Locations' || member.location === filterLocation;
    return matchesSearch && matchesLocation;
  });

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Top Swapper': return 'bg-purple-100 text-purple-800';
      case 'Eco Warrior': return 'bg-green-100 text-green-800';
      case 'Community Helper': return 'bg-blue-100 text-blue-800';
      case 'Style Icon': return 'bg-pink-100 text-pink-800';
      case 'Verified Member': return 'bg-indigo-100 text-indigo-800';
      case 'Rising Star': return 'bg-yellow-100 text-yellow-800';
      case 'Vintage Expert': return 'bg-amber-100 text-amber-800';
      case 'Top Contributor': return 'bg-red-100 text-red-800';
      case 'Community Leader': return 'bg-emerald-100 text-emerald-800';
      case 'Minimalist': return 'bg-gray-100 text-gray-800';
      case 'New Member': return 'bg-cyan-100 text-cyan-800';
      case 'Boho Queen': return 'bg-rose-100 text-rose-800';
      case 'Style Influencer': return 'bg-violet-100 text-violet-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'swap': return <ArrowUpRight className="w-5 h-5 text-green-600" />;
      case 'listing': return <Camera className="w-5 h-5 text-blue-600" />;
      case 'achievement': return <Award className="w-5 h-5 text-yellow-600" />;
      case 'review': return <Star className="w-5 h-5 text-purple-600" />;
      case 'milestone': return <TrendingUp className="w-5 h-5 text-indigo-600" />;
      default: return <MessageCircle className="w-5 h-5 text-gray-600" />;
    }
  };

  const tabs = [
    { id: 'members', label: 'Community Members', icon: <Users className="w-4 h-4" />, count: communityMembers.length },
    { id: 'activity', label: 'Recent Activity', icon: <Clock className="w-4 h-4" />, count: recentActivity.length },
    { id: 'leaderboard', label: 'Top Contributors', icon: <Award className="w-4 h-4" />, count: 10 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        {/* Community Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-[#140b38] rounded-2xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#140b38]">ReWear Community</h1>
              <p className="text-[#140b38]/70">Connect with fellow sustainable fashion enthusiasts</p>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold text-[#140b38] mb-1">{communityStats.totalMembers.toLocaleString()}</div>
              <div className="text-xs text-[#140b38]/70">Total Members</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold text-[#140b38] mb-1">{communityStats.activeToday.toLocaleString()}</div>
              <div className="text-xs text-[#140b38]/70">Active Today</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold text-[#140b38] mb-1">{communityStats.totalSwaps.toLocaleString()}</div>
              <div className="text-xs text-[#140b38]/70">Total Swaps</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold text-[#140b38] mb-1">{communityStats.itemsShared.toLocaleString()}</div>
              <div className="text-xs text-[#140b38]/70">Items Shared</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold text-[#140b38] mb-1">{communityStats.co2Saved}</div>
              <div className="text-xs text-[#140b38]/70">CO₂ Saved</div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-gray-100 text-center">
              <div className="text-2xl font-bold text-[#140b38] mb-1">98%</div>
              <div className="text-xs text-[#140b38]/70">Satisfaction</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-2 border border-gray-100 sticky top-32">
              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-[#140b38] text-white shadow-lg'
                        : 'text-[#140b38] hover:bg-[#140b38]/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {tab.icon}
                      <span className="font-medium">{tab.label}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      activeTab === tab.id 
                        ? 'bg-white/20 text-white' 
                        : 'bg-[#140b38]/10 text-[#140b38]'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Community Members Tab */}
            {activeTab === 'members' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-2xl font-bold text-[#140b38]">Community Members</h2>
                  <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#140b38]/40" />
                      <input
                        type="text"
                        placeholder="Search members..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                      />
                    </div>
                    
                    {/* Location Filter */}
                    <select
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                    >
                      {locations.map(location => (
                        <option key={location} value={location === 'All Locations' ? 'all' : location}>
                          {location}
                        </option>
                      ))}
                    </select>

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
                  </div>
                </div>

                {/* Members Grid/List */}
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6' 
                    : 'space-y-4'
                }>
                  {filteredMembers.map((member) => (
                    <div
                      key={member.id}
                      className={`bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-[#140b38]/20 transform hover:-translate-y-1 ${
                        viewMode === 'list' ? 'flex items-center p-6' : 'p-6'
                      }`}
                    >
                      <div className={`${viewMode === 'list' ? 'flex items-center space-x-6 w-full' : 'text-center'}`}>
                        {/* Avatar and Online Status */}
                        <div className={`relative ${viewMode === 'list' ? '' : 'mb-4'}`}>
                          <img 
                            src={member.avatar} 
                            alt={member.name}
                            className={`rounded-2xl object-cover ${viewMode === 'list' ? 'w-16 h-16' : 'w-20 h-20 mx-auto'}`}
                          />
                          {member.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>

                        <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                          {/* Name and Username */}
                          <h3 className={`font-bold text-[#140b38] ${viewMode === 'list' ? 'text-lg mb-1' : 'text-xl mb-2'}`}>
                            {member.name}
                          </h3>
                          <p className={`text-[#140b38]/70 ${viewMode === 'list' ? 'text-sm mb-2' : 'mb-3'}`}>
                            @{member.username}
                          </p>

                          {/* Location */}
                          <div className={`flex items-center space-x-1 text-[#140b38]/60 ${viewMode === 'list' ? 'mb-2' : 'mb-4 justify-center'}`}>
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{member.location}</span>
                          </div>

                          {/* Stats */}
                          <div className={`grid grid-cols-3 gap-4 ${viewMode === 'list' ? 'mb-3' : 'mb-4'}`}>
                            <div className="text-center">
                              <div className="text-lg font-bold text-[#140b38]">{member.totalItems}</div>
                              <div className="text-xs text-[#140b38]/70">Items</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-[#140b38]">{member.completedSwaps}</div>
                              <div className="text-xs text-[#140b38]/70">Swaps</div>
                            </div>
                            <div className="text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-lg font-bold text-[#140b38]">{member.rating}</span>
                              </div>
                              <div className="text-xs text-[#140b38]/70">Rating</div>
                            </div>
                          </div>

                          {/* Bio */}
                          {viewMode === 'grid' && (
                            <p className="text-[#140b38]/70 text-sm mb-4 line-clamp-2">
                              {member.bio}
                            </p>
                          )}

                          {/* Badges */}
                          <div className={`flex flex-wrap gap-2 ${viewMode === 'list' ? 'mb-3' : 'mb-4'}`}>
                            {member.badges.slice(0, viewMode === 'list' ? 2 : 3).map((badge, index) => (
                              <span 
                                key={index}
                                className={`px-2 py-1 rounded-full text-xs font-semibold ${getBadgeColor(badge)}`}
                              >
                                {badge}
                              </span>
                            ))}
                            {member.badges.length > (viewMode === 'list' ? 2 : 3) && (
                              <span className="text-[#140b38]/60 text-xs">
                                +{member.badges.length - (viewMode === 'list' ? 2 : 3)} more
                              </span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className={`flex space-x-2 ${viewMode === 'list' ? '' : 'justify-center'}`}>
                            <button className="flex-1 bg-[#140b38] text-white py-2 px-4 rounded-xl hover:bg-[#1a0f42] transition-colors font-semibold text-sm">
                              View Profile
                            </button>
                            <button className="bg-[#140b38]/10 text-[#140b38] p-2 rounded-xl hover:bg-[#140b38]/20 transition-colors">
                              <MessageCircle className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity Tab */}
            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#140b38]">Recent Community Activity</h2>
                
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:border-[#140b38]/20 transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        {/* User Avatar */}
                        <img 
                          src={activity.userAvatar} 
                          alt={activity.user}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            {getActivityIcon(activity.type)}
                            <span className="font-bold text-[#140b38]">{activity.user}</span>
                            <span className="text-[#140b38]/70">{activity.action}</span>
                            {activity.item && (
                              <span className="font-semibold text-[#140b38]">{activity.item}</span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-[#140b38]/60">{activity.time}</span>
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-[#140b38]/60 hover:text-red-500 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                <span className="text-sm">{activity.likes}</span>
                              </button>
                              <button className="flex items-center space-x-1 text-[#140b38]/60 hover:text-blue-500 transition-colors">
                                <MessageSquare className="w-4 h-4" />
                                <span className="text-sm">{activity.comments}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Item Image */}
                        {activity.itemImage && (
                          <img 
                            src={activity.itemImage} 
                            alt={activity.item}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Leaderboard Tab */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[#140b38]">Top Contributors</h2>
                
                <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="p-6">
                    <div className="space-y-4">
                      {communityMembers
                        .sort((a, b) => b.points - a.points)
                        .slice(0, 10)
                        .map((member, index) => (
                        <div key={member.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                          {/* Rank */}
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-yellow-500 text-white' :
                            index === 1 ? 'bg-gray-400 text-white' :
                            index === 2 ? 'bg-amber-600 text-white' :
                            'bg-[#140b38]/10 text-[#140b38]'
                          }`}>
                            {index + 1}
                          </div>
                          
                          {/* Avatar */}
                          <img 
                            src={member.avatar} 
                            alt={member.name}
                            className="w-12 h-12 rounded-xl object-cover"
                          />
                          
                          {/* Info */}
                          <div className="flex-1">
                            <h4 className="font-bold text-[#140b38]">{member.name}</h4>
                            <p className="text-sm text-[#140b38]/70">{member.completedSwaps} swaps completed</p>
                          </div>
                          
                          {/* Points */}
                          <div className="text-right">
                            <div className="flex items-center space-x-1">
                              <Coins className="w-5 h-5 text-yellow-500" />
                              <span className="font-bold text-[#140b38]">{member.points}</span>
                            </div>
                            <p className="text-sm text-[#140b38]/70">points</p>
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

export default Community;