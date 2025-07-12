"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Camera, Eye } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export default function ListItemPage() {
  const [images, setImages] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    category: "",
    size: "",
    condition: "",
    description: "",
    originalPrice: "",
    swapPreference: "",
  })

  const previousListings = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      image: "/placeholder.svg?height=150&width=150",
      status: "Available",
      points: 45,
    },
    {
      id: 2,
      title: "Black Leather Boots",
      image: "/placeholder.svg?height=150&width=150",
      status: "Swapped",
      points: 55,
    },
    {
      id: 3,
      title: "Wool Sweater",
      image: "/placeholder.svg?height=150&width=150",
      status: "Available",
      points: 25,
    },
    {
      id: 4,
      title: "Summer Dress",
      image: "/placeholder.svg?height=150&width=150",
      status: "Pending",
      points: 35,
    },
  ]

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages].slice(0, 6)) // Max 6 images
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", { formData, images })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">List Your Item</h1>
            <p className="text-gray-600">Share your pre-loved clothing with the ReWear community</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle>Item Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Image Upload */}
                    <div className="space-y-4">
                      <Label>Photos (Up to 6)</Label>
                      <div className="grid grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative group">
                            <Image
                              src={image || "/placeholder.svg"}
                              alt={`Upload ${index + 1}`}
                              width={150}
                              height={150}
                              className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                            />
                            <Button
                              type="button"
                              size="sm"
                              variant="destructive"
                              className="absolute top-2 right-2 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeImage(index)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}

                        {images.length < 6 && (
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors">
                            <Camera className="w-8 h-8 text-gray-400 mb-2" />
                            <span className="text-sm text-gray-500">Add Photo</span>
                            <input
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                          </label>
                        )}
                      </div>
                    </div>

                    {/* Basic Information */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Item Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Vintage Denim Jacket"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="brand">Brand *</Label>
                        <Input
                          id="brand"
                          placeholder="e.g., Levi's, Zara, H&M"
                          value={formData.brand}
                          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Category *</Label>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tops">Tops & Shirts</SelectItem>
                            <SelectItem value="dresses">Dresses</SelectItem>
                            <SelectItem value="pants">Jeans & Pants</SelectItem>
                            <SelectItem value="jackets">Jackets & Coats</SelectItem>
                            <SelectItem value="shoes">Shoes</SelectItem>
                            <SelectItem value="accessories">Accessories</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Size *</Label>
                        <Select
                          value={formData.size}
                          onValueChange={(value) => setFormData({ ...formData, size: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="xs">XS</SelectItem>
                            <SelectItem value="s">S</SelectItem>
                            <SelectItem value="m">M</SelectItem>
                            <SelectItem value="l">L</SelectItem>
                            <SelectItem value="xl">XL</SelectItem>
                            <SelectItem value="xxl">XXL</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Condition *</Label>
                        <Select
                          value={formData.condition}
                          onValueChange={(value) => setFormData({ ...formData, condition: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select condition" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New with tags</SelectItem>
                            <SelectItem value="like-new">Like new</SelectItem>
                            <SelectItem value="excellent">Excellent</SelectItem>
                            <SelectItem value="very-good">Very good</SelectItem>
                            <SelectItem value="good">Good</SelectItem>
                            <SelectItem value="fair">Fair</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the item, its fit, any flaws, styling suggestions..."
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="originalPrice">Original Price (Optional)</Label>
                        <Input
                          id="originalPrice"
                          type="number"
                          placeholder="0"
                          value={formData.originalPrice}
                          onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Swap Preference</Label>
                        <Select
                          value={formData.swapPreference}
                          onValueChange={(value) => setFormData({ ...formData, swapPreference: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="What would you like?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">Open to anything</SelectItem>
                            <SelectItem value="similar">Similar category</SelectItem>
                            <SelectItem value="specific">Specific items only</SelectItem>
                            <SelectItem value="points">Points only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-6">
                      <Button type="submit" className="bg-black hover:bg-gray-800 flex-1">
                        <Upload className="w-4 h-4 mr-2" />
                        List Item
                      </Button>
                      <Button type="button" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Listing Tips */}
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Listing Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm text-gray-600">
                    <h4 className="font-medium text-black mb-1">Great photos get more swaps</h4>
                    <p>Use natural lighting and show the item from multiple angles</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <h4 className="font-medium text-black mb-1">Be honest about condition</h4>
                    <p>Accurate descriptions build trust in the community</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <h4 className="font-medium text-black mb-1">Include measurements</h4>
                    <p>Help others determine if the item will fit them</p>
                  </div>
                </CardContent>
              </Card>

              {/* Previous Listings */}
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="text-lg">Your Recent Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {previousListings.map((item) => (
                      <div key={item.id} className="relative group">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          width={150}
                          height={150}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <Badge
                          size="sm"
                          className={`absolute top-1 left-1 text-xs ${
                            item.status === "Available"
                              ? "bg-green-500"
                              : item.status === "Swapped"
                                ? "bg-gray-500"
                                : "bg-yellow-500"
                          }`}
                        >
                          {item.status}
                        </Badge>
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                          {item.points}pts
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
