"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Edit, Eye, Heart, Star, Package, TrendingUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DashboardPage() {
  const userStats = {
    totalListings: 12,
    totalPurchases: 8,
    pointsEarned: 340,
    pointsSpent: 180,
    rating: 4.8,
    joinDate: "March 2024",
  }

  const myListings = [
    {
      id: 1,
      title: "Vintage Denim Jacket",
      brand: "Levi's",
      size: "M",
      condition: "Excellent",
      points: 45,
      image: "/placeholder.svg?height=200&width=200",
      status: "Available",
      views: 23,
      likes: 5,
    },
    {
      id: 2,
      title: "Black Leather Boots",
      brand: "Dr. Martens",
      size: "8",
      condition: "Good",
      points: 55,
      image: "/placeholder.svg?height=200&width=200",
      status: "Pending",
      views: 18,
      likes: 3,
    },
    {
      id: 3,
      title: "Wool Sweater",
      brand: "H&M",
      size: "L",
      condition: "Very Good",
      points: 25,
      image: "/placeholder.svg?height=200&width=200",
      status: "Available",
      views: 31,
      likes: 8,
    },
    {
      id: 4,
      title: "Summer Dress",
      brand: "Zara",
      size: "S",
      condition: "Like New",
      points: 35,
      image: "/placeholder.svg?height=200&width=200",
      status: "Swapped",
      views: 42,
      likes: 12,
    },
  ]

  const myPurchases = [
    {
      id: 1,
      title: "Floral Midi Dress",
      brand: "Mango",
      size: "M",
      points: 40,
      image: "/placeholder.svg?height=200&width=200",
      seller: "Emma K.",
      date: "2024-01-15",
      status: "Delivered",
    },
    {
      id: 2,
      title: "Denim Jeans",
      brand: "Uniqlo",
      size: "30",
      points: 30,
      image: "/placeholder.svg?height=200&width=200",
      seller: "Alex R.",
      date: "2024-01-10",
      status: "In Transit",
    },
    {
      id: 3,
      title: "White Sneakers",
      brand: "Adidas",
      size: "9",
      points: 50,
      image: "/placeholder.svg?height=200&width=200",
      seller: "Maya P.",
      date: "2024-01-05",
      status: "Delivered",
    },
    {
      id: 4,
      title: "Cardigan",
      brand: "COS",
      size: "S",
      points: 35,
      image: "/placeholder.svg?height=200&width=200",
      seller: "Sarah M.",
      date: "2023-12-28",
      status: "Delivered",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback className="text-2xl">JD</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">John Doe</h1>
                  <p className="text-gray-600">Sustainable fashion enthusiast • Member since {userStats.joinDate}</p>
                </div>
                <Button className="bg-black hover:bg-gray-800 mt-4 md:mt-0">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">{userStats.totalListings}</div>
                  <div className="text-sm text-gray-600">Listings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">{userStats.totalPurchases}</div>
                  <div className="text-sm text-gray-600">Purchases</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{userStats.pointsEarned}</div>
                  <div className="text-sm text-gray-600">Points Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{userStats.pointsSpent}</div>
                  <div className="text-sm text-gray-600">Points Spent</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-2xl font-bold text-black">{userStats.rating}</span>
                  </div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {userStats.pointsEarned - userStats.pointsSpent}
                  </div>
                  <div className="text-sm text-gray-600">Available Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <Plus className="w-12 h-12 mx-auto mb-4 text-black" />
              <h3 className="font-semibold mb-2">List New Item</h3>
              <p className="text-sm text-gray-600 mb-4">Add clothing items to your collection</p>
              <Button className="bg-black hover:bg-gray-800" asChild>
                <Link href="/list-item">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-black" />
              <h3 className="font-semibold mb-2">Browse Items</h3>
              <p className="text-sm text-gray-600 mb-4">Discover new pieces from the community</p>
              <Button variant="outline" asChild>
                <Link href="/browse">Explore Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-0 shadow-sm">
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-black" />
              <h3 className="font-semibold mb-2">View Analytics</h3>
              <p className="text-sm text-gray-600 mb-4">Track your swapping performance</p>
              <Button variant="outline">View Stats</Button>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Listings and Purchases */}
        <Tabs defaultValue="listings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200">
            <TabsTrigger value="listings" className="data-[state=active]:bg-black data-[state=active]:text-white">
              My Listings ({myListings.length})
            </TabsTrigger>
            <TabsTrigger value="purchases" className="data-[state=active]:bg-black data-[state=active]:text-white">
              My Purchases ({myPurchases.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listings">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {myListings.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge
                        className={`absolute top-3 left-3 ${
                          item.status === "Available"
                            ? "bg-green-500"
                            : item.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-gray-500"
                        }`}
                      >
                        {item.status}
                      </Badge>
                      <div className="absolute top-3 right-3 flex gap-2">
                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/80">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="secondary" className="w-8 h-8 p-0 bg-white/80">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                        <div className="text-lg font-bold">{item.points} pts</div>
                      </div>
                      <p className="text-xs text-gray-600 mb-3">
                        {item.brand} • Size {item.size} • {item.condition}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-600">
                        <div className="flex items-center space-x-3">
                          <span className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {item.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {item.likes}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="purchases">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {myPurchases.map((item) => (
                <Card key={item.id} className="group hover:shadow-lg transition-shadow border-0 shadow-sm">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge
                        className={`absolute top-3 left-3 ${
                          item.status === "Delivered"
                            ? "bg-green-500"
                            : item.status === "In Transit"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-sm">{item.title}</h3>
                        <div className="text-lg font-bold">{item.points} pts</div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        {item.brand} • Size {item.size}
                      </p>
                      <p className="text-xs text-gray-600 mb-2">from {item.seller}</p>
                      <p className="text-xs text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
