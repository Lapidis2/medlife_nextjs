'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ShoppingCart, Menu, X, Heart, LogIn, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavbarProps {
  cartCount: number
  wishlistCount: number
}

export function Navbar({ cartCount, wishlistCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrollToId, setScrollToId] = useState<string | null>(null)
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Shop', id: 'shop' },
    { label: 'Categories', id: 'categories' },
  ]
const handleNavClick = (id: string) => {
  if (pathname !== '/') {
    setScrollToId(id) 
    router.push('/')   
  } else {
    const section = document.getElementById(id)
    section?.scrollIntoView({ behavior: 'smooth' })
  }
  setIsOpen(false)
}


useEffect(() => {
  if (scrollToId) {
    const section = document.getElementById(scrollToId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setScrollToId(null)
    }
  }
}, [scrollToId, pathname])


  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <span className="font-bold text-xl text-green-600 hidden sm:inline">MedLife</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-foreground hover:text-green-600 transition-colors text-sm font-medium flex items-center gap-2"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wishlist */}
            <Link href="/wishlist">
              <motion.button
                className="relative p-2 hover:bg-green-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Heart className="w-6 h-6 text-green-600" />
                {wishlistCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {wishlistCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <motion.button
                className="relative p-2 hover:bg-green-50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ShoppingCart className="w-6 h-6 text-green-600" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.button>
            </Link>

            {/* Login */}
            <Link href="/auth/login" className="hidden sm:flex items-center gap-2">
              <motion.button
                className="items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <LogIn className="w-4 h-4" />
                Login
              </motion.button>
            </Link>

            {/* Sign Up */}
            <Link href="/auth/signup" className="hidden sm:flex items-center gap-2">
              <motion.button
                className="items-center gap-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors font-medium text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </motion.button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-green-50 rounded-lg transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 border-t border-border"
          >
            {/* Mobile nav items */}
            <div className="flex flex-col gap-2 px-4 py-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full text-left px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Wishlist / Login / Sign Up */}
            <div className="px-4 py-2 flex flex-col gap-2">
              <Link href="/wishlist" className="w-full">
                <button className="w-full px-4 py-2 text-green-600 border border-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4" />
                  Wishlist
                </button>
              </Link>
              <Link href="/auth/login" className="w-full">
                <button className="w-full px-4 py-2 text-green-600 border border-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2">
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              </Link>
              <Link href="/auth/signup" className="w-full">
                <button className="w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}
