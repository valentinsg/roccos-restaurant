"use client"

import type React from "react"

import { CartProvider } from "@/hooks/use-cart"
import { NotificationProvider } from "@/components/notification"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import { usePathname } from "next/navigation"
import Seo from "@/components/Seo"

// Get the current path to determine which nav item is active


const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Rocco's Restaurante",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Av. Buenos Aires 123",
    "addressLocality": "Dolores",
    "addressRegion": "Buenos Aires",
    "addressCountry": "AR"
  },
  "telephone": "+54 2245401066",
  "servesCuisine": ["Italiana", "Pizza", "Parrilla"],
  "url": "https://www.roccosdolores.com",
  "image": "/public/images/roccos-logo.webp"
}

export default function RoccosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const currentPath = pathname.split("/").pop() || ""

  return (
    <>
      <Seo
        title="Rocco's Restaurante - Dolores, Buenos Aires"
        description="Tradición, parrilla y las mejores pizzas de Dolores. Vení a disfrutar en familia o con amigos."
        url="https://www.roccosdolores.com/roccos"
        image="/public/images/roccos-logo.webp"
        canonical="https://www.roccosdolores.com/roccos"
        restaurantSchema={restaurantSchema}
      />
      <CartProvider>
        <NotificationProvider>
          <div className="min-h-screen flex flex-col pt-16">
            <Navbar variant="classic" currentPath={currentPath} />
            <main className="flex-grow">{children}</main>
            <Footer variant="classic" />
            <Cart variant="classic" />
          </div>
        </NotificationProvider>
      </CartProvider>
    </>
  )
}
