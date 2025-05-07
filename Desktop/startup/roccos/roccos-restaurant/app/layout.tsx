import type React from "react"
import type { Metadata } from "next"
import {
  DM_Serif_Display,
  Inter,
  Playfair_Display,
  Poppins,
  Outfit,
  Manrope,
  Lora,
  Crimson_Text,
} from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/hooks/use-cart"
import { NotificationProvider } from "@/components/notification"
import { ProductProvider } from '@/lib/context/ProductContext'
import { CategoryProvider } from '@/lib/context/CategoryContext'

// Fuentes para Rocco's clásico
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif",
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
})

const crimsonText = Crimson_Text({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-crimson",
})

// Fuentes para Rocco's 2.0
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

// Fuente común
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Rocco's Restaurante - Dolores, Buenos Aires",
  description: "Rocco's Pizza and Restaurante y Rocco's 2.0 - Fast Food & Coffee en Dolores, Buenos Aires",
  keywords: "restaurante, pizza, café, Dolores, Buenos Aires, comida italiana, fast food, coffee",
  authors: [{ name: "Rocco's" }],
  openGraph: {
    title: "Rocco's Restaurante - Dolores, Buenos Aires",
    description: "Tradición, parrilla y las mejores pizzas de Dolores",
    url: "https://roccos.com.ar",
    siteName: "Rocco's Restaurante",
    locale: "es_AR",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${dmSerif.variable} ${outfit.variable} ${manrope.variable} ${lora.variable} ${crimsonText.variable}`}
      >
        <ThemeProvider attribute="class">
          <NotificationProvider>
            <CartProvider>
              <ProductProvider>
                <CategoryProvider>
                  {children}
                </CategoryProvider>
              </ProductProvider>
            </CartProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'