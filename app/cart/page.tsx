"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ShoppingBag, Trash2, ArrowLeft, Plus, Minus } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/components/cart-context"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  if (cart.length === 0) {
    return (
      <>
        <Navbar cartCount={cartCount} wishlistCount={0} />
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Looks like you haven't added any products yet. Start shopping to add items to your cart.
            </p>
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar cartCount={cartCount} wishlistCount={0} />
      <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <Link href="#shop" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark mb-6">
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
            <h1 className="text-4xl font-bold text-foreground">Shopping Cart</h1>
            <p className="text-muted-foreground mt-2">
              You have {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="bg-card border border-border rounded-lg p-6 flex gap-6"
                  >
                    {/* Product Info */}
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-1">{item.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
                      <p className="text-2xl font-bold text-primary">${item.price.toFixed(2)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end justify-between">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-muted rounded-lg transition-colors text-destructive"
                      >
                        <Trash2 className="w-5 h-5" />
                      </motion.button>

                      {/* Quantity Selector */}
                      <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-primary transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>

                      {/* Item Total */}
                      <p className="text-lg font-bold text-foreground">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

                {/* Summary Details */}
                <div className="space-y-3 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-foreground">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="flex justify-between text-foreground">
                    <span>Tax</span>
                    <span>${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-primary">${(cartTotal * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Proceed to Checkout
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => clearCart()}
                    className="w-full bg-muted hover:bg-muted text-foreground font-semibold py-3 rounded-lg transition-colors border border-border"
                  >
                    Clear Cart
                  </motion.button>
                </div>

                {/* Info */}
                <p className="text-xs text-muted-foreground text-center mt-6">
                  Free shipping on orders over $50. 30-day money-back guarantee.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
