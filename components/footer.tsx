"use client"

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"
import { motion } from "framer-motion"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Facebook, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Instagram, href: "#" },
  ]

  return (
     <footer className="bg-neutral-900 text-white relative">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
       
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-accent to-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-2xl text-white">MedLife</span>
            </div>
            <p className="text-gray-400 max-w-xs">
              Your trusted partner for quality medicines and wellness products delivered with care.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start gap-3 text-gray-400">
            <div className="flex items-center gap-3 hover:text-primary transition-colors">
              <Phone className="w-5 h-5" />
              <span>+250 785934003</span>
            </div>
            <div className="flex items-center gap-3 hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
              <span>support@MedLife.com</span>
            </div>
            <div className="flex items-center gap-3 hover:text-primary transition-colors">
              <MapPin className="w-5 h-5" />
              <span>123 Health Street, Medical City</span>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-4">
            <span className="text-white font-semibold">Follow us</span>
            <div className="flex gap-4">
              {socialLinks.map(function ({ icon: Icon, href,  }, idx) {
                return (
                  <motion.a
                    key={idx}
                    href={href}
              
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-gray-800 hover:bg-primary rounded-full transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                )
              })}
            </div>
          </div>
        </div>


        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>© {currentYear} MedLife. All rights reserved. Your health is our priority.</p>
          <p>Designed with ❤️ for your wellness.</p>
        </div>
      </div>
    </footer>
  )
}
