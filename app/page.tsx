"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CategoriesSection } from "@/components/categories-section"
import { FeaturedProducts } from "@/components/featured-products"
import { Footer } from "@/components/footer"
import { CartProvider, useCart } from "@/components/cart-context"
import { useWishlist } from "@/components/wishlist-context"
import type { Product } from "@/lib/types"
import productsData from "@/lib/products.json"

function PageContent() {
  const { cartCount } = useCart()
  const { wishlistItems } = useWishlist()
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading products
    setProducts(productsData)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto mb-4" />
          <p className="text-foreground font-semibold">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cartCount} wishlistCount={wishlistItems.length} />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts products={products} />
      <Footer />
    </div>
  )
}

export default function Home() {
  return (
    <CartProvider>
      <PageContent />
    </CartProvider>
  )
}
