"use client"

import { motion } from "framer-motion"
import { Pill, Leaf, Heart, Sparkles, Zap, Flower2 } from "lucide-react"

const categories = [
  { icon: Pill, label: "Pain Relief", color: "from-red-400 to-red-600" },
  { icon: Leaf, label: "Vitamins", color: "from-green-400 to-green-600" },
  { icon: Heart, label: "Wellness", color: "from-pink-400 to-pink-600" },
  { icon: Sparkles, label: "Skincare", color: "from-purple-400 to-purple-600" },
  { icon: Zap, label: "Energy", color: "from-yellow-400 to-yellow-600" },
  { icon: Flower2, label: "Natural", color: "from-teal-400 to-teal-600" },
]

export function CategoriesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
    hover: {
      y: -8,
      transition: { duration: 0.3 },
    },
  }

  return (
    <section id="categories" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-muted">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Browse by Category</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you need from our comprehensive selection of health and wellness products
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <motion.button
                key={category.label}
                variants={cardVariants}
                whileHover="hover"
                className="group relative overflow-hidden rounded-2xl p-8 text-left transition-all"
              >
                {/* Gradient Background */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`}
                />

                {/* Card Content */}
                <div className="relative z-10">
                  <div
                    className={`bg-linear-to-br ${category.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{category.label}</h3>
                  <p className="text-muted-foreground text-sm">Explore our curated selection</p>
                </div>

                {/* Border */}
                <div
                  className={`absolute inset-0 border-2 border-transparent bg-linear-to-br ${category.color} bg-clip-border rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                />
              </motion.button>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
