'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { 
  Users, 
  ShoppingBag, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit3, 
  Trash2, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Settings, 
  BarChart3, 
  PieChart, 
  Activity, 
  Calendar, 
  Clock, 
  Star, 
  Flag, 
  Database
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock admin data
  const adminStats = {
    totalUsers: 10247,
    activeUsers: 1834,
    totalItems: 25891,
    pendingItems: 156,
    totalSwaps: 8934,
    reportsToday: 12,
    revenue: 45678,
    growthRate: 12.5
  };

  // Mock pending items for approval
  const pendingItems = [
    {
      id: 1,
      title: "Vintage Leather Jacket",
      user: "Sarah Martinez",
      userAvatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
      category: "Outerwear",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      submittedDate: "2024-01-20",
      status: "pending",
      reason: "Quality check required"
    },
    {
      id: 2,
      title: "Designer Evening Dress",
      user: "Emma Wilson",
      userAvatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200&h=200",
      category: "Dresses",
      image: "https://images.pexels.com/photos/985635/pexels-photo-985635.jpeg?auto=compress&cs=tinysrgb&w=400&h=400",
      submittedDate: "2024-01-19",
      status: "pending",
      reason: "Authenticity verification"
    }
  ];

  // Mock user reports
  const userReports = [
    {
      id: 1,
      reportedUser: "John Doe",
      reportedBy: "Jane Smith",
      reason: "Inappropriate item description",
      date: "2024-01-20",
      status: "pending",
      severity: "medium"
    },
    {
      id: 2,
      reportedUser: "Mike Johnson",
      reportedBy: "Lisa Brown",
      reason: "Failed to complete swap",
      date: "2024-01-19",
      status: "investigating",
      severity: "high"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'users', label: 'User Management', icon: <Users className="w-4 h-4" /> },
    { id: 'items', label: 'Item Approval', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'reports', label: 'Reports', icon: <Flag className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <PieChart className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'investigating': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-2 border border-gray-100 sticky top-32">
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
                  <h1 className="text-3xl font-bold text-[#140b38] mb-2">Admin Dashboard</h1>
                  <p className="text-[#140b38]/70">Monitor and manage the ReWear platform</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-2xl font-bold text-[#140b38]">{adminStats.totalUsers.toLocaleString()}</span>
                    </div>
                    <h3 className="font-semibold text-[#140b38] mb-1">Total Users</h3>
                    <p className="text-[#140b38]/70 text-sm">{adminStats.activeUsers.toLocaleString()} active today</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-2xl font-bold text-[#140b38]">{adminStats.totalItems.toLocaleString()}</span>
                    </div>
                    <h3 className="font-semibold text-[#140b38] mb-1">Total Items</h3>
                    <p className="text-[#140b38]/70 text-sm">{adminStats.pendingItems} pending approval</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-2xl font-bold text-[#140b38]">{adminStats.totalSwaps.toLocaleString()}</span>
                    </div>
                    <h3 className="font-semibold text-[#140b38] mb-1">Total Swaps</h3>
                    <p className="text-[#140b38]/70 text-sm">+{adminStats.growthRate}% this month</p>
                  </div>

                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                        <AlertTriangle className="w-6 h-6 text-red-600" />
                      </div>
                      <span className="text-2xl font-bold text-[#140b38]">{adminStats.reportsToday}</span>
                    </div>
                    <h3 className="font-semibold text-[#140b38] mb-1">Reports Today</h3>
                    <p className="text-[#140b38]/70 text-sm">Requires attention</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
                  <h2 className="text-xl font-bold text-[#140b38] mb-6">Recent Platform Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[#140b38] font-medium">New user registration spike</p>
                        <p className="text-[#140b38]/70 text-sm">156 new users in the last 24 hours</p>
                      </div>
                      <span className="text-sm text-[#140b38]/60">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-2xl">
                      <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Clock className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[#140b38] font-medium">Items pending approval</p>
                        <p className="text-[#140b38]/70 text-sm">12 items waiting for quality review</p>
                      </div>
                      <span className="text-sm text-[#140b38]/60">4 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Item Approval Tab */}
            {activeTab === 'items' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold text-[#140b38]">Item Approval</h2>
                    <p className="text-[#140b38]/70">Review and approve pending items</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent">
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  {pendingItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-lg font-bold text-[#140b38]">{item.title}</h3>
                              <p className="text-[#140b38]/70">by {item.user}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                          <div className="flex items-center space-x-4 mb-4">
                            <span className="text-sm text-[#140b38]/70">Category: {item.category}</span>
                            <span className="text-sm text-[#140b38]/70">Submitted: {item.submittedDate}</span>
                          </div>
                          <p className="text-sm text-[#140b38]/70 mb-4">{item.reason}</p>
                          <div className="flex space-x-3">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">
                              Approve
                            </button>
                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold">
                              Reject
                            </button>
                            <button className="bg-[#140b38] text-white px-4 py-2 rounded-lg hover:bg-[#1a0f42] transition-colors text-sm font-semibold">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reports Tab */}
            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#140b38]">User Reports</h2>
                  <p className="text-[#140b38]/70">Review and handle user reports</p>
                </div>

                <div className="space-y-4">
                  {userReports.map((report) => (
                    <div key={report.id} className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-[#140b38]">Report #{report.id}</h3>
                          <p className="text-[#140b38]/70">Reported User: {report.reportedUser}</p>
                          <p className="text-[#140b38]/70">Reported By: {report.reportedBy}</p>
                        </div>
                        <div className="flex space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor(report.severity)}`}>
                            {report.severity}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(report.status)}`}>
                            {report.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-[#140b38] mb-4">{report.reason}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[#140b38]/70">{report.date}</span>
                        <div className="flex space-x-3">
                          <button className="bg-[#140b38] text-white px-4 py-2 rounded-lg hover:bg-[#1a0f42] transition-colors text-sm font-semibold">
                            Investigate
                          </button>
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold">
                            Resolve
                          </button>
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold">
                            Escalate
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Other tabs would be implemented similarly */}
            {activeTab === 'users' && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 text-center">
                <Database className="w-16 h-16 text-[#140b38]/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#140b38] mb-2">User Management</h3>
                <p className="text-[#140b38]/70">User management features coming soon...</p>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 text-center">
                <BarChart3 className="w-16 h-16 text-[#140b38]/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#140b38] mb-2">Analytics Dashboard</h3>
                <p className="text-[#140b38]/70">Advanced analytics coming soon...</p>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 text-center">
                <Settings className="w-16 h-16 text-[#140b38]/40 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#140b38] mb-2">Platform Settings</h3>
                <p className="text-[#140b38]/70">System configuration coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;