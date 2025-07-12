'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { Recycle, Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Signin successful:', formData);
      // Here you would typically redirect to dashboard
    } catch (error) {
      console.error('Signin failed:', error);
      setErrors({ general: 'Invalid email or password. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!forgotEmail.trim() || !/\S+@\S+\.\S+/.test(forgotEmail)) {
      setErrors({ forgot: 'Please enter a valid email address' });
      return;
    }

    setIsLoading(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Password reset email sent to:', forgotEmail);
      setShowForgotPassword(false);
      setForgotEmail('');
      // Show success message
    } catch (error) {
      console.error('Password reset failed:', error);
      setErrors({ forgot: 'Failed to send reset email. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-32">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-[#140b38] rounded-2xl flex items-center justify-center shadow-xl">
                <Recycle className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold text-[#140b38]">ReWear</span>
            </Link>
            
            <h2 className="text-3xl font-bold text-[#140b38] mb-2">
              Reset Password
            </h2>
            <p className="text-[#140b38]/70 text-lg">
              Enter your email to receive a password reset link
            </p>
          </div>

          {/* Forgot Password Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            <form onSubmit={handleForgotPassword} className="space-y-6">
              <div>
                <label htmlFor="forgotEmail" className="block text-sm font-semibold text-[#140b38] mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-[#140b38]/40" />
                  </div>
                  <input
                    id="forgotEmail"
                    name="forgotEmail"
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent transition-colors text-[#140b38] placeholder-[#140b38]/40 ${
                      errors.forgot ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.forgot && (
                  <p className="mt-2 text-sm text-red-600">{errors.forgot}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#140b38] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#1a0f42] focus:ring-2 focus:ring-[#140b38] focus:ring-offset-2 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button 
                onClick={() => setShowForgotPassword(false)}
                className="text-[#140b38] font-semibold hover:underline transition-colors"
              >
                Back to Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-[#140b38] rounded-2xl flex items-center justify-center shadow-xl">
              <Recycle className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#140b38]">ReWear</span>
          </Link>
          
          <h2 className="text-3xl font-bold text-[#140b38] mb-2">
            Welcome Back
          </h2>
          <p className="text-[#140b38]/70 text-lg">
            Sign in to continue your sustainable fashion journey
          </p>
        </div>

        {/* Signin Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-sm text-red-600">{errors.general}</p>
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#140b38] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#140b38]/40" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent transition-colors text-[#140b38] placeholder-[#140b38]/40 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#140b38] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#140b38]/40" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full pl-12 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent transition-colors text-[#140b38] placeholder-[#140b38]/40 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#140b38]/40 hover:text-[#140b38] transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#140b38]/40 hover:text-[#140b38] transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => setShowForgotPassword(true)}
                className="text-sm text-[#140b38] hover:underline transition-colors"
              >
                Forgot your password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#140b38] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#1a0f42] focus:ring-2 focus:ring-[#140b38] focus:ring-offset-2 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-[#140b38]/70">
              Don't have an account?{' '}
              <Link 
                href="/signup" 
                className="text-[#140b38] font-semibold hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-sm text-[#140b38]/60">
          Need help? Contact our{' '}
          <a href="#" className="text-[#140b38] hover:underline">support team</a>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Signin;