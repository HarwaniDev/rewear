'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { 
  Upload, 
  Camera, 
  X, 
  Plus, 
  ArrowRight, 
  Image as ImageIcon, 
  Tag, 
  Shirt, 
  Ruler, 
  Star, 
  MapPin, 
  Info, 
  CheckCircle, 
  AlertCircle
} from 'lucide-react';

const CreateItem = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    subcategory: '',
    brand: '',
    size: '',
    condition: '',
    color: '',
    material: '',
    tags: '',
    swapPreferences: '',
    location: '',
    meetupOptions: []
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const categories = [
    { value: 'tops', label: 'Tops', subcategories: ['T-Shirts', 'Blouses', 'Sweaters', 'Hoodies', 'Tank Tops'] },
    { value: 'bottoms', label: 'Bottoms', subcategories: ['Jeans', 'Trousers', 'Shorts', 'Skirts', 'Leggings'] },
    { value: 'dresses', label: 'Dresses', subcategories: ['Casual', 'Formal', 'Maxi', 'Mini', 'Midi'] },
    { value: 'outerwear', label: 'Outerwear', subcategories: ['Jackets', 'Coats', 'Blazers', 'Cardigans', 'Vests'] },
    { value: 'footwear', label: 'Footwear', subcategories: ['Sneakers', 'Boots', 'Heels', 'Flats', 'Sandals'] },
    { value: 'accessories', label: 'Accessories', subcategories: ['Bags', 'Jewelry', 'Scarves', 'Belts', 'Hats'] },
    { value: 'activewear', label: 'Activewear', subcategories: ['Sports Bras', 'Leggings', 'Shorts', 'Tops', 'Shoes'] }
  ];

  const sizes = {
    clothing: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    footwear: ['5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12'],
    accessories: ['One Size', 'Small', 'Medium', 'Large']
  };

  const conditions = [
    { value: 'new', label: 'New with Tags', description: 'Brand new, never worn' },
    { value: 'like-new', label: 'Like New', description: 'Excellent condition, worn once or twice' },
    { value: 'excellent', label: 'Excellent', description: 'Very good condition, minimal wear' },
    { value: 'good', label: 'Good', description: 'Good condition, some signs of wear' },
    { value: 'fair', label: 'Fair', description: 'Noticeable wear but still functional' }
  ];

  const meetupOptions = [
    'Public place meetup',
    'Coffee shop exchange',
    'Mall meetup',
    'University campus',
    'Shipping/Mail exchange',
    'Contactless pickup'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            if (newImages.length === files.length) {
              setUploadedImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleMeetupOptionChange = (option: string) => {
    setFormData(prev => ({
      ...prev,
      meetupOptions: prev.meetupOptions.includes(option)
        ? prev.meetupOptions.filter(o => o !== option)
        : [...prev.meetupOptions, option]
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: {[key: string]: string} = {};

    if (step === 1) {
      if (uploadedImages.length === 0) {
        newErrors.images = 'Please upload at least one image';
      }
    } else if (step === 2) {
      if (!formData.title.trim()) {
        newErrors.title = 'Title is required';
      }
      if (!formData.description.trim()) {
        newErrors.description = 'Description is required';
      }
      if (!formData.category) {
        newErrors.category = 'Category is required';
      }
      if (!formData.brand.trim()) {
        newErrors.brand = 'Brand is required';
      }
    } else if (step === 3) {
      if (!formData.size) {
        newErrors.size = 'Size is required';
      }
      if (!formData.condition) {
        newErrors.condition = 'Condition is required';
      }
      if (!formData.color.trim()) {
        newErrors.color = 'Color is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      console.log('Item created:', formData);
      // Here you would submit to your API
    }
  };

  const getSelectedCategory = () => {
    return categories.find(cat => cat.value === formData.category);
  };

  const getSizeOptions = () => {
    if (formData.category === 'footwear') return sizes.footwear;
    if (formData.category === 'accessories') return sizes.accessories;
    return sizes.clothing;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">

      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-[#140b38]">List Your Item</h1>
            <span className="text-[#140b38]/70">Step {currentStep} of 4</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-[#140b38] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
          {/* Step 1: Photos */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <Camera className="w-16 h-16 text-[#140b38] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#140b38] mb-2">Add Photos</h2>
                <p className="text-[#140b38]/70">Upload clear, well-lit photos of your item (max 5)</p>
              </div>

              {/* Image Upload Area */}
              <div className="border-2 border-dashed border-[#140b38]/30 rounded-2xl p-8 text-center hover:border-[#140b38]/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 text-[#140b38]/60 mx-auto mb-4" />
                  <p className="text-[#140b38] font-semibold mb-2">Click to upload photos</p>
                  <p className="text-[#140b38]/70 text-sm">PNG, JPG up to 10MB each</p>
                </label>
              </div>

              {/* Uploaded Images */}
              {uploadedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Upload ${index + 1}`}
                        className="w-full h-32 object-cover rounded-xl"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {errors.images && (
                <p className="text-red-600 text-sm">{errors.images}</p>
              )}
            </div>
          )}

          {/* Step 2: Basic Info */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <Shirt className="w-16 h-16 text-[#140b38] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#140b38] mb-2">Basic Information</h2>
                <p className="text-[#140b38]/70">Tell us about your item</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    Item Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Vintage Denim Jacket"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent ${
                      errors.category ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
                </div>

                {/* Subcategory */}
                {formData.category && (
                  <div>
                    <label className="block text-sm font-semibold text-[#140b38] mb-2">
                      Subcategory
                    </label>
                    <select
                      name="subcategory"
                      value={formData.subcategory}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                    >
                      <option value="">Select subcategory</option>
                      {getSelectedCategory()?.subcategories.map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Brand */}
                <div>
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent ${
                      errors.brand ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Levi's, Zara, H&M"
                  />
                  {errors.brand && <p className="mt-1 text-sm text-red-600">{errors.brand}</p>}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe your item in detail..."
                  />
                  {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Details */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <Ruler className="w-16 h-16 text-[#140b38] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#140b38] mb-2">Item Details</h2>
                <p className="text-[#140b38]/70">Provide specific details about your item</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Size */}
                <div>
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    Size *
                  </label>
                  <select
                    name="size"
                    value={formData.size}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent ${
                      errors.size ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select size</option>
                    {getSizeOptions().map(size => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                  {errors.size && <p className="mt-1 text-sm text-red-600">{errors.size}</p>}
                </div>

                {/* Color */}
                <div>
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    Color *
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent ${
                      errors.color ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., Blue, Red, Black"
                  />
                  {errors.color && <p className="mt-1 text-sm text-red-600">{errors.color}</p>}
                </div>

                {/* Material */}
                <div>
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    Material
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                    placeholder="e.g., Cotton, Polyester, Wool"
                  />
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    Condition *
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent ${
                      errors.condition ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select condition</option>
                    {conditions.map(condition => (
                      <option key={condition.value} value={condition.value}>
                        {condition.label}
                      </option>
                    ))}
                  </select>
                  {errors.condition && <p className="mt-1 text-sm text-red-600">{errors.condition}</p>}
                </div>

                {/* Tags */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                    placeholder="e.g., vintage, casual, summer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Swap Preferences */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center">
                <Star className="w-16 h-16 text-[#140b38] mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-[#140b38] mb-2">Swap Preferences</h2>
                <p className="text-[#140b38]/70">Set your exchange preferences</p>
              </div>

              <div className="space-y-6">
                {/* Swap Preferences */}
                <div>
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    What are you looking for?
                  </label>
                  <textarea
                    name="swapPreferences"
                    value={formData.swapPreferences}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                    placeholder="Describe what you'd like to swap for..."
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#140b38]/40" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#140b38] focus:border-transparent"
                      placeholder="City, State"
                    />
                  </div>
                </div>

                {/* Meetup Options */}
                <div>
                  <label className="block text-sm font-semibold text-[#140b38] mb-2">
                    Preferred Exchange Methods
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {meetupOptions.map(option => (
                      <label key={option} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-xl hover:border-[#140b38]/50 transition-colors cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.meetupOptions.includes(option)}
                          onChange={() => handleMeetupOptionChange(option)}
                          className="w-4 h-4 text-[#140b38] border-gray-300 rounded focus:ring-[#140b38]"
                        />
                        <span className="text-[#140b38]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-[#140b38] text-[#140b38] rounded-xl hover:bg-[#140b38] hover:text-white transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-[#140b38] text-white rounded-xl hover:bg-[#1a0f42] transition-colors font-semibold flex items-center space-x-2"
              >
                <span>Next</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-[#140b38] text-white rounded-xl hover:bg-[#1a0f42] transition-colors font-semibold flex items-center space-x-2"
              >
                <span>List Item</span>
                <CheckCircle className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateItem;