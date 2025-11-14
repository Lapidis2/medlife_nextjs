"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingCart, Star, ArrowLeft, Heart, Share2 } from "lucide-react"
import { products } from "@/lib/products"
import { useCart } from "@/components/cart-context"
import { AnimatePresence } from "framer-motion"
import { useWishlist } from "@/components/wishlist-context"

interface ProductDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = await params
  const product = products.find((p) => p.id === Number.parseInt(id))

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link href="/products" className="text-primary hover:text-primary-dark font-semibold">
            Back to Products
          </Link>
        </div>
      </div>
    )
  }

  return <ProductDetailClient product={product} />
}

function ProductDetailClient({ product }: { product: (typeof products)[0] }) {
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [toastMessage, setToastMessage] = useState("")

  const handleWishlist = () => {
    if (isWishlisted(product.id)) {
      removeFromWishlist(product.id)
      setToastMessage("Removed from wishlist")
    } else {
      addToWishlist(product)
      setToastMessage("Added to wishlist!")
    }
    setTimeout(() => setToastMessage(""), 2000)
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    setToastMessage(`${quantity} x ${product.name} added to cart!`)
    setQuantity(1)
    setTimeout(() => setToastMessage(""), 2000)
  }

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full h-96 md:h-full min-h-96 bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>

          {/* Product Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            {/* Category */}
            <div className="mb-4">
              <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-4 py-1.5 rounded-full">
                {product.category.toUpperCase()}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg text-muted-foreground font-semibold">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-5xl font-bold text-primary mb-2">${product.price.toFixed(2)}</p>
              {product.inStock && <p className="text-lg text-green-600 font-semibold">In Stock</p>}
              {!product.inStock && <p className="text-lg text-red-600 font-semibold">Out of Stock</p>}
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{product.description}</p>

            {/* Additional Details */}
            <div className="grid grid-cols-2 gap-4 mb-8 pb-8 border-b border-border">
              <div>
                <p className="text-sm text-muted-foreground font-semibold mb-2">Category</p>
                <p className="text-base font-semibold text-foreground capitalize">{product.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-semibold mb-2">Product ID</p>
                <p className="text-base font-semibold text-foreground">#{product.id}</p>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4 mb-6">
              <div className="flex items-center border border-border rounded-lg overflow-hidden bg-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-primary hover:bg-gray-100 transition-colors"
                  disabled={!product.inStock}
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-0 bg-transparent font-bold text-lg focus:outline-none"
                  disabled={!product.inStock}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-primary hover:bg-gray-100 transition-colors"
                  disabled={!product.inStock}
                >
                  +
                </button>
              </div>

              <motion.button
                whileHover={{ scale: product.inStock ? 1.05 : 1 }}
                whileTap={{ scale: product.inStock ? 0.95 : 1 }}
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-bold text-lg transition-all ${
                  product.inStock
                    ? "bg-primary hover:bg-primary-dark text-white shadow-lg hover:shadow-xl cursor-pointer"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </motion.button>
            </div>

            {/* Wishlist and Share */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlist}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all border-2 ${
                  isWishlisted(product.id)
                    ? "bg-red-50 border-red-300 text-red-600"
                    : "bg-white border-border text-foreground hover:border-primary"
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? "fill-current" : ""}`} />
                {isWishlisted(product.id) ? "Wishlisted" : "Wishlist"}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center px-6 py-3 rounded-lg font-semibold border-2 border-border text-foreground hover:border-primary transition-all"
              >
                <Share2 className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Related Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 md:mt-20 pt-12 border-t border-border"
        >
          <h2 className="text-3xl font-bold text-foreground mb-8">Similar Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/products/${relatedProduct.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="bg-white border border-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer"
                  >
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-foreground mb-2 line-clamp-2">{relatedProduct.name}</h3>
                      <p className="text-2xl font-bold text-primary">${relatedProduct.price.toFixed(2)}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed bottom-4 right-4 bg-primary text-white px-6 py-4 rounded-lg shadow-lg z-50 font-semibold"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
