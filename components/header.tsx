"use client"

import { Button } from "@/components/ui/button"
import { Recycle, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <Recycle className="w-4 h-4 text-white" />
          </div>
          <span className="text-2xl font-bold">ReWear</span>
        </Link>

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
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            <Link href="/browse" className="block py-2 text-sm font-medium hover:text-gray-600">
              Browse
            </Link>
            <Link href="/list-item" className="block py-2 text-sm font-medium hover:text-gray-600">
              List Item
            </Link>
            <Link href="/dashboard" className="block py-2 text-sm font-medium hover:text-gray-600">
              Dashboard
            </Link>
            <Link href="/about" className="block py-2 text-sm font-medium hover:text-gray-600">
              About
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
