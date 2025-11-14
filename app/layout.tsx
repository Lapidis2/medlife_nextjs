import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { WishlistProvider } from "@/components/wishlist-context"

const _geistSans = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MedLife - Your Trusted Online Pharmacy",
  description:
    "Premium quality medicines, vitamins, and wellness products delivered to your door. Your trusted online pharmacy for all your healthcare needs.",
  keywords: "pharmacy, medicines, vitamins, skincare, wellness, online pharmacy",
  openGraph: {
    title: "MedLife - Your Trusted Online Pharmacy",
    description: "Premium quality medicines, vitamins, and wellness products delivered to your door.",
    url: "https://MedLife.com",
    siteName: "MedLife",
    images: [
      {
        url: "https://MedLife.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </body>
    </html>
  )
}
