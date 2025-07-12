"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Heart, Star, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function BrowsePage() {
  const categories = [
    { name: "Dresses", count: 245, image: "/placeholder.svg?height=200&width=300" },
    { name: "Tops & Shirts", count: 189, image: "/placeholder.svg?height=200&width=300" },
    { name: "Jeans & Pants", count: 156, image: "/placeholder.svg?height=200&width=300" },
    { name: "Jackets", count: 98, image: "/placeholder.svg?height=200&width=300" },
    { name: "Shoes", count: 134, image: "/placeholder.svg?height=200&width=300" },
    { name: "Accessories", count: 87, image: "/placeholder.svg?height=200&width=300" },
  ]

  const featuredItems = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      brand: "Levi's",
      size: "M",
      condition: "Excellent",
      points: 45,
      image: "/placeholder.svg?height=300&width=250",
      user: "Sarah M.",
      rating: 4.9,
    },
    {
      id: 2,
      title: "Floral Summer Dress",
      brand: "Zara",
      size: "S",
      condition: "Like New",
      points: 35,
      image: "/placeholder.svg?height=300&width=250",
      user: "Emma K.",
      rating: 4.8,
    },
    {
      id: 3,
      title: "Black Leather Boots",
      brand: "Dr. Martens",
      size: "8",
      condition: "Good",
      points: 55,
      image: "/placeholder.svg?height=300&width=250",
      user: "Alex R.",
      rating: 4.7,
    },
    {
      id: 4,
      title: "Wool Sweater",
      brand: "H&M",
      size: "L",
      condition: "Very Good",
      points: 25,
      image: "/placeholder.svg?height=300&width=250",
      user: "Maya P.",
      rating: 4.9,
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Discover Sustainable Fashion</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse thousands of pre-loved clothing items from our community. Find your next favorite piece while
              making a positive impact.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for items, brands, or categories..."
                className="pl-12 pr-4 py-3 text-lg border-2 border-gray-200 focus:border-black"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black hover:bg-gray-800">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-black">2,450+</div>
              <div className="text-gray-600">Items Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black">850+</div>
              <div className="text-gray-600">Active Swappers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-black">95%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Shop by Category</h2>
            <Button variant="outline">
              View All Categories
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                    <p className="text-xs text-gray-600">{category.count} items</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Items</h2>
            <Button variant="outline">
              View All Items
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item) => (
              <Card
                key={item.id}
                className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={250}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Badge className="absolute top-3 left-3 bg-black text-white">{item.condition}</Badge>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{item.title}</h3>
                      <div className="text-lg font-bold">{item.points} pts</div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                      {item.brand} • Size {item.size}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">{item.rating}</span>
                      </div>
                      <span className="text-xs text-gray-600">by {item.user}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-black text-white rounded-3xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Swapping?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join our community of conscious fashion lovers. List your items and start discovering amazing pieces
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/list-item">List Your First Item</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                Learn How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
