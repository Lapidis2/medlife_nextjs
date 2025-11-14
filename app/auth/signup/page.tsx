"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from '@/hooks/use-toast'


export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      setLoading(false)
    toast({
    title: "Registration successful",
    description: "Go to login",
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
            <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
            <p className="text-muted-foreground mt-2">Join MedLife for better health</p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="UserName"
                  className="w-full pl-10 pr-4 py-2.5 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-green-50"
                  required
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-green-600" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4 rounded border-green-300" required />
                <span className="text-sm text-muted-foreground">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </label>
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
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </motion.div>

            <motion.div variants={itemVariants} className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-semibold">
                Sign in
              </Link>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
