import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Recycle, Users, Heart, Leaf, Star, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function ReWearLanding() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <Recycle className="w-4 h-4 text-white" />
            </div>
            <span className="text-2xl font-bold">ReWear</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/browse" className="text-sm font-medium hover:text-gray-600 transition-colors">
              Browse
            </Link>
            <Link href="/list-item" className="text-sm font-medium hover:text-gray-600 transition-colors">
              List Item
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-gray-600 transition-colors">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button size="sm" className="bg-black hover:bg-gray-800" asChild>
              <Link href="/register">Join Now</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-xs font-medium">
                  SUSTAINABLE FASHION 2025
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  ReWear
                  <span className="block text-gray-600">Community</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-md">
                  Transform your wardrobe sustainably. Exchange unused clothing through direct swaps or our point-based
                  system. Join the movement to reduce textile waste.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8" asChild>
                  <Link href="/register">Start Exchanging</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/browse">Learn More</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm text-gray-600">Active Members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">200K+</div>
                  <div className="text-sm text-gray-600">Items Exchanged</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">85%</div>
                  <div className="text-sm text-gray-600">Waste Reduced</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src="/placeholder.svg?height=300&width=250"
                        alt="Sustainable fashion"
                        width={250}
                        height={300}
                        className="w-full h-64 object-cover"
                      />
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src="/placeholder.svg?height=200&width=250"
                        alt="Clothing exchange"
                        width={250}
                        height={200}
                        className="w-full h-40 object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-4 pt-8">
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src="/placeholder.svg?height=250&width=250"
                        alt="Community fashion"
                        width={250}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                    </CardContent>
                  </Card>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src="/placeholder.svg?height=180&width=250"
                        alt="Eco-friendly wardrobe"
                        width={250}
                        height={180}
                        className="w-full h-36 object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="absolute bottom-8 -left-4 bg-white rounded-full p-3 shadow-lg">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Scrolling banner */}
        <div className="bg-black text-white py-4 overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            <span className="text-lg font-medium mx-8">SUSTAINABLE FASHION</span>
            <span className="mx-4">•</span>
            <span className="text-lg font-medium mx-8">REDUCE WASTE</span>
            <span className="mx-4">•</span>
            <span className="text-lg font-medium mx-8">COMMUNITY EXCHANGE</span>
            <span className="mx-4">•</span>
            <span className="text-lg font-medium mx-8">ECO-FRIENDLY</span>
            <span className="mx-4">•</span>
            <span className="text-lg font-medium mx-8">SUSTAINABLE FASHION</span>
            <span className="mx-4">•</span>
            <span className="text-lg font-medium mx-8">REDUCE WASTE</span>
            <span className="mx-4">•</span>
            <span className="text-lg font-medium mx-8">COMMUNITY EXCHANGE</span>
            <span className="mx-4">•</span>
            <span className="text-lg font-medium mx-8">ECO-FRIENDLY</span>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How ReWear Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Simple steps to transform your wardrobe sustainably and connect with our community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-semibold">Upload Your Items</h3>
                <p className="text-gray-600">
                  Take photos of clothing you no longer wear and list them on our platform with detailed descriptions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-semibold">Browse & Exchange</h3>
                <p className="text-gray-600">
                  Discover items from other members and propose direct swaps or use points to claim items you love.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 border-0 shadow-sm">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                  <span className="text-white font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-semibold">Refresh Your Style</h3>
                <p className="text-gray-600">
                  Receive your new-to-you items and enjoy a refreshed wardrobe while reducing environmental impact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold mb-4">Why Choose ReWear?</h2>
                <p className="text-lg text-gray-600">
                  Join a community committed to sustainable fashion and circular economy principles.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Environmental Impact</h3>
                    <p className="text-gray-600">
                      Reduce textile waste and carbon footprint by giving clothes a second life.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Community Driven</h3>
                    <p className="text-gray-600">
                      Connect with like-minded individuals who share your values for sustainability.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Quality Assured</h3>
                    <p className="text-gray-600">
                      All items are reviewed and verified to ensure quality and authenticity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src="/placeholder.svg?height=200&width=200"
                      alt="Sustainable wardrobe"
                      width={200}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src="/placeholder.svg?height=150&width=200"
                      alt="Fashion exchange"
                      width={200}
                      height={150}
                      className="w-full h-36 object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4 pt-8">
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src="/placeholder.svg?height=180&width=200"
                      alt="Community fashion"
                      width={200}
                      height={180}
                      className="w-full h-44 object-cover"
                    />
                  </CardContent>
                </Card>
                <Card className="overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      src="/placeholder.svg?height=160&width=200"
                      alt="Eco-friendly style"
                      width={200}
                      height={160}
                      className="w-full h-40 object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section id="community" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Join Our Growing Community</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Be part of the sustainable fashion revolution with thousands of conscious consumers
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-gray-300">Active Members</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200K+</div>
              <div className="text-gray-300">Items Exchanged</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15M+</div>
              <div className="text-gray-300">CO₂ Saved (kg)</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Wardrobe?</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join ReWear today and start your sustainable fashion journey. Exchange, discover, and make a positive
              impact on the environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white px-8" asChild>
                <Link href="/register">Get Started Free</Link>
              </Button>
              <Button variant="outline" size="lg">
                Download App
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <Recycle className="w-4 h-4 text-black" />
                </div>
                <span className="text-2xl font-bold">ReWear</span>
              </div>
              <p className="text-gray-400">Transforming fashion through community-driven sustainable exchanges.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Browse Items
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    List Items
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Point System
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Member Stories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Sustainability Tips
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2025 ReWear. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Instagram
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
