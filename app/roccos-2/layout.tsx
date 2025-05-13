"use client"

import type React from "react"

import { CartProvider } from "@/hooks/use-cart"
import { NotificationProvider } from "@/components/notification"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { usePathname } from "next/navigation"
import Seo from "@/components/Seo"

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Rocco's 2.0 Fast Food & Coffee",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Calle San Martín 456",
    "addressLocality": "Dolores",
    "addressRegion": "Buenos Aires",
    "addressCountry": "AR"
  },
  "telephone": "+54 2245 65-4321",
  "servesCuisine": ["Fast Food", "Café", "Sandwiches"],
  "url": "https://www.roccosdolores.com/roccos-2",
  "image": "/images/roccos-2-logo.webp"
}

export default function Roccos2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current path to determine which nav item is active
  const pathname = usePathname()
  const currentPath = pathname.split("/").pop() || ""

  return ( 
    <>
    <Seo
      title="Rocco's 2.0 Fast Food & Coffee - Dolores, Buenos Aires"
      description="La nueva experiencia de fast food y café en Dolores. Hamburguesas, café y más."
      url="https://www.roccosdolores.com/roccos-2"
      image="/images/roccos-2-logo.webp"
      canonical="https://www.roccosdolores.com/roccos-2"
      restaurantSchema={restaurantSchema}
    />
    <CartProvider>
      <NotificationProvider>
        <div className="min-h-screen flex flex-col pt-16">
          <Navbar variant="modern" currentPath={currentPath} />
          <main className="flex-grow">{children}</main>
          <Footer variant="modern" />
        </div>
      </NotificationProvider>
    </CartProvider>
    </>
  )
}
