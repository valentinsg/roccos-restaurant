"use client"

import type React from "react"

import { CartProvider } from "@/hooks/use-cart"
import { NotificationProvider } from "@/components/notification"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import Cart from "@/components/cart"
import { usePathname } from "next/navigation"

export default function RoccosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Get the current path to determine which nav item is active
  const pathname = usePathname()
  const currentPath = pathname.split("/").pop() || ""

  return (
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
  )
}
