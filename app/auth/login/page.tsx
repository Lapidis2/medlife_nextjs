"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from '@/hooks/use-toast'


export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
 setTimeout(() => {
  setLoading(false)

  toast({
    title: "Login successful",
    description: "Welcome back!",
    duration: 2000,
  })
}, 1500)

  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-50 pt-20 pb-12 px-4">
      <div className="max-w-md mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-lg p-8 border border-green-100"
        >
          <motion.div variants={itemVariants} className="text-center mb-8">
            <div className="w-12 h-12 bg-linear-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your MedLife account</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-green-600 hover:text-green-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-green-600 hover:text-green-700 font-semibold">
                Create one
              </Link>
            </motion.div>
          </form>

          <motion.div variants={itemVariants} className="mt-8 pt-6 border-t border-green-100">
          <button className="w-full py-2.5 px-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors font-medium text-foreground flex items-center justify-center gap-2">
  <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
    <path fill="currentColor" d="M12.545,10.639v3.57h5.338c-0.3,1.577-1.54,2.846-3.272,3.41c-0.993,0.424-2.05,0.476-3.066,0.15c-0.744-0.24-1.432-0.648-1.977-1.193c-1.088-1.088-1.764-2.546-1.764-4.167c0-1.621,0.676-3.079,1.764-4.167c0.545-0.545,1.233-0.953,1.977-1.193c1.016-0.326,2.073-0.274,3.066,0.15c0.744,0.318,1.405,0.837,1.868,1.453h2.746c-0.779-2.106-2.89-3.604-5.336-3.604C6.755,3.471,4.5,5.726,4.5,8.507c0,2.781,2.255,5.036,5.045,5.036c1.869,0,3.516-1.053,4.377-2.59c0.424-0.748,0.708-1.59,0.708-2.503H12.545z" />
  </svg>
  Continue with Google
</button>

          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
