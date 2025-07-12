"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Package,
  ShoppingBag,
  Search,
  Filter,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
  AlertCircle,
  Eye,
} from "lucide-react"
import { useState } from "react"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("users")

  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-01-15",
      status: "Active",
      listings: 12,
      purchases: 8,
      rating: 4.8,
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-01-10",
      status: "Active",
      listings: 6,
      purchases: 15,
      rating: 4.9,
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2024-01-05",
      status: "Suspended",
      listings: 3,
      purchases: 2,
      rating: 3.2,
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      email: "alex.r@email.com",
      avatar: "/placeholder.svg?height=40&width=40",
      joinDate: "2023-12-28",
      status: "Active",
      listings: 18,
      purchases: 22,
      rating: 4.7,
    },
  ]

  const orders = [
    {
      id: "ORD-001",
      buyer: "Sarah Johnson",
      seller: "Mike Chen",
      item: "Vintage Denim Jacket",
      points: 45,
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: "ORD-002",
      buyer: "Emma Wilson",
      seller: "Alex Rodriguez",
      item: "Black Leather Boots",
      points: 55,
      status: "In Transit",
      date: "2024-01-14",
    },
    {
      id: "ORD-003",
      buyer: "Mike Chen",
      seller: "Sarah Johnson",
      item: "Wool Sweater",
      points: 25,
      status: "Pending",
      date: "2024-01-13",
    },
    {
      id: "ORD-004",
      buyer: "Alex Rodriguez",
      seller: "Emma Wilson",
      item: "Summer Dress",
      points: 35,
      status: "Disputed",
      date: "2024-01-12",
    },
  ]

  const listings = [
    {
      id: "LST-001",
      title: "Vintage Denim Jacket",
      seller: "Sarah Johnson",
      category: "Jackets",
      points: 45,
      status: "Active",
      views: 23,
      likes: 5,
      date: "2024-01-15",
    },
    {
      id: "LST-002",
      title: "Black Leather Boots",
      seller: "Mike Chen",
      category: "Shoes",
      points: 55,
      status: "Pending Review",
      views: 18,
      likes: 3,
      date: "2024-01-14",
    },
    {
      id: "LST-003",
      title: "Wool Sweater",
      seller: "Emma Wilson",
      category: "Tops",
      points: 25,
      status: "Flagged",
      views: 31,
      likes: 8,
      date: "2024-01-13",
    },
    {
      id: "LST-004",
      title: "Summer Dress",
      seller: "Alex Rodriguez",
      category: "Dresses",
      points: 35,
      status: "Active",
      views: 42,
      likes: 12,
      date: "2024-01-12",
    },
  ]

  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalListings: 3456,
    pendingListings: 23,
    totalOrders: 2134,
    disputedOrders: 5,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, orders, and listings across the ReWear platform</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <Package className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">{stats.totalListings}</div>
              <div className="text-sm text-gray-600">Total Listings</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <div className="text-2xl font-bold">{stats.pendingListings}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-0">
            <CardContent className="p-6 text-center">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <div className="text-2xl font-bold">{stats.disputedOrders}</div>
              <div className="text-sm text-gray-600">Disputes</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200">
            <TabsTrigger value="users" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Manage Users
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Manage Orders
            </TabsTrigger>
            <TabsTrigger value="listings" className="data-[state=active]:bg-black data-[state=active]:text-white">
              Manage Listings
            </TabsTrigger>
          </TabsList>

          {/* Users Management */}
          <TabsContent value="users">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search users..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold">{user.name}</h3>
                            <Badge variant={user.status === "Active" ? "default" : "destructive"}>{user.status}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                            <span>Joined: {user.joinDate}</span>
                            <span>Listings: {user.listings}</span>
                            <span>Purchases: {user.purchases}</span>
                            <span>Rating: {user.rating}/5</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Ban className="w-4 h-4 mr-1" />
                          Suspend
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Management */}
          <TabsContent value="orders">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Order Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search orders..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold">{order.id}</h3>
                          <Badge
                            variant={
                              order.status === "Completed"
                                ? "default"
                                : order.status === "In Transit"
                                  ? "secondary"
                                  : order.status === "Disputed"
                                    ? "destructive"
                                    : "outline"
                            }
                          >
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{order.item}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Buyer: {order.buyer}</span>
                          <span>Seller: {order.seller}</span>
                          <span>Points: {order.points}</span>
                          <span>Date: {order.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Update
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Listings Management */}
          <TabsContent value="listings">
            <Card className="shadow-sm border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Listing Management</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search listings..." className="pl-10 w-64" />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {listings.map((listing) => (
                    <div key={listing.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <h3 className="font-semibold">{listing.title}</h3>
                          <Badge
                            variant={
                              listing.status === "Active"
                                ? "default"
                                : listing.status === "Flagged"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {listing.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">by {listing.seller}</p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Category: {listing.category}</span>
                          <span>Points: {listing.points}</span>
                          <span>Views: {listing.views}</span>
                          <span>Likes: {listing.likes}</span>
                          <span>Date: {listing.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
