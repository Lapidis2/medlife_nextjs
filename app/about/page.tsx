"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle, Users, Truck, Shield } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutPage() {
  const features = [
    {
      icon: Shield,
      title: "100% Safe & Verified",
      description: "All products are verified by licensed pharmacists",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your medicines delivered within 24-48 hours",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "24/7 customer support from qualified healthcare professionals",
    },
    {
      icon: CheckCircle,
      title: "Quality Assured",
      description: "Only authentic and high-quality pharmaceutical products",
    },
  ]

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
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">About MedLife</h1>
          <p className="text-xl text-muted-foreground">Your trusted partner in healthcare</p>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
          <motion.div variants={itemVariants} className="bg-green-50 rounded-2xl p-8 border border-green-100">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              MedLife is committed to making healthcare more accessible and affordable for everyone. We believe that
              quality medicines should be available at your fingertips, delivered with care and professionalism. Our
              platform connects you with licensed pharmacists and authentic pharmaceutical products.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-green-50 rounded-2xl p-8 border border-green-100">
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div key={index} variants={itemVariants} className="flex gap-4">
                    <div className="shrink-0">
                      <Icon className="w-6 h-6 text-green-600 mt-1" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                      <p className="text-muted-foreground text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-linear-to-r from-green-500 to-green-600 rounded-2xl p-8 text-white"
          >
            <h2 className="text-2xl font-bold mb-4">Get Started Today</h2>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of customers who trust MedLife for their pharmaceutical needs.
            </p>
            <Link
              href="/auth/signup"
              className="inline-block px-8 py-3 bg-white text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
            >
              Create Your Account
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
