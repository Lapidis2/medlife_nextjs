"use client"

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Careers", "Blog", "Press"],
    },
    {
      title: "Support",
      links: ["Contact Us", "FAQ", "Shipping Info", "Returns"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
  ]

  return (
    <footer className="bg-neutral-900 text-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2 items-center justify-center flex ">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-linear-to-br from-accent to-primary rounded-full ">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-xl">MedLife</span>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner for quality medicines and wellness products delivered with care.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                <span>+250 785934003</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                <span>support@MedLife.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400 hover:text-primary transition-colors">
                <MapPin className="w-4 h-4" />
                <span>123 Health Street, Medical City</span>
              </div>
            </div>
          </div>

          {/* Links */}
       
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} MedLife. All rights reserved. Your health is our priority.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 bg-gray-800 hover:bg-primary rounded-full transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
