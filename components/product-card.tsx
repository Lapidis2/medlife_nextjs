"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ShoppingCart, Star } from "lucide-react"
import type { Product } from "@/lib/types"
import { useCart } from "./cart-context"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()
  const router = useRouter()
  const [toastMessage, setToastMessage] = useState("")

  const handleAddToCart = () => {
    addToCart(product)
    setToastMessage(`${product.name} added to cart!`)
    setTimeout(() => setToastMessage(""), 2000)
  }

  return (
    <>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-border group"
      >
        <Link href={`/products/${product.id}`} className="block">
          {/* Image Container */}
          <div className="relative h-64 bg-muted overflow-hidden cursor-pointer">
            <Image
              src={product.image }
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Content */}
          <div className="p-5">
            {/* Category Badge */}
            <div className="mb-3">
              <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2">{product.name}</h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                {product.rating} ({product.reviews})
              </span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
            </div>

            {!product.inStock && <p className="text-xs text-red-500 font-semibold">Out of Stock</p>}
          </div>
        </Link>

        <div className="px-5 pb-5">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault()
              handleAddToCart()
            }}
            disabled={!product.inStock}
            className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all ${
              product.inStock
                ? "bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </motion.button>
        </div>
      </motion.div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-4 right-4 bg-primary text-white px-4 py-3 rounded-lg shadow-lg z-50"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
