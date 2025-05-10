"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Menu, X, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

type NavbarProps = {
  variant: "classic" | "modern"
  currentPath: string
}

const navLinks = {
  classic: [
    { name: "Inicio", path: "" },
    { name: "Menú", path: "menu" },
    { name: "Pedido", path: "pedido" },
    { name: "Ubicación", path: "ubicacion" },
    { name: "Nosotros", path: "nosotros" },
    { name: "FAQ", path: "faq" },
    { name: "Contacto", path: "contacto" },
  ],
  modern: [
    { name: "Inicio", path: "" },
    { name: "Menú", path: "menu" },
    { name: "Ubicación", path: "ubicacion" },
    { name: "Nosotros", path: "nosotros" },
    { name: "FAQ", path: "faq" },
    { name: "Contacto", path: "contacto" },
  ]
}

export default function Navbar({ variant, currentPath }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const basePath = variant === "classic" ? "/roccos" : "/roccos-2"

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark")

  const navbarClasses = {
    classic: {
      container: `bg-[#101111] dark:bg-[#0A0A0A] text-[#E6C163] ${scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.1)]" : ""}`,
      logo: "font-outfit",
      link: "font-outfit hover:text-[#E6C163] transition-all duration-300",
      activeLink: "font-outfit text-[#E6C163] font-bold border-b-2 border-[#E6C163]",
      mobileMenu: "bg-[#111111] dark:bg-[#0A0A0A] text-[#FAF4E1] backdrop-blur-lg bg-opacity-95",
    },
    modern: {
      container: `bg-[#0C2232] text-white  ${scrolled ? "shadow-[0_4px_30px_rgba(0,0,0,0.5)]" : ""}`,
      logo: "font-outfit font-bold",
      link: "font-outfit hover:text-[#E55925] dark:hover:text-[#E55925] transition-all duration-300",
      activeLink: "font-outfit text-[#E55925] dark:text-[#E55925] border-b-2 border-[#E55925] dark:border-[#E55925]",
      mobileMenu: "bg-white dark:bg-[#0C2232] text-[#0C2232] dark:text-white backdrop-blur-lg bg-opacity-95",
    },
  }

  const styles = variant === "classic" ? navbarClasses.classic : navbarClasses.modern
  const logoSrc =
    variant === "classic" ? "/images/roccos-logo-sin-letras.webp" : "/images/roccos-2.0-logo-sin-letras.webp"

  if (!mounted) return null
  return (
    <nav className={`${styles.container} fixed top-0 left-0 right-0 z-50 transition-all duration-300`}>
      <div className="max-w-7xl mx-auto sm:px-6 ">
        <div className="flex justify-between h-24 items-center">
          <div className="flex-shrink-0">
            <Link href={basePath} className="flex items-center">
              <div className="h-20 w-20 relative">
                <Image
                  src={logoSrc || "/placeholder.svg"}
                  alt={variant === "classic" ? "Rocco's Logo" : "Rocco's 2.0 Logo"}
                  fill
                  className="object-contain p-2"
                />
              </div>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks[variant].map((link) => {
              const isActive = currentPath === link.path
              const fullPath = `${basePath}${link.path ? `/${link.path}` : ""}`

              return (
                <Link key={link.name} href={fullPath} className={`text-lg ${isActive ? styles.activeLink : styles.link}`}>
                  {link.name}
                </Link>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-opacity-20 hover:bg-black dark:hover:bg-white dark:hover:bg-opacity-20 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className={`${styles.mobileMenu} md:hidden`}
        >
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {navLinks[variant].map((link) => {
              const isActive = currentPath === link.path
              const fullPath = `${basePath}${link.path ? `/${link.path}` : ""}`

              return (
                <Link
                  key={link.name}
                  href={fullPath}
                  className={`block px-3 py-3 rounded-md text-lg ${isActive ? styles.activeLink : styles.link}`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>
        </motion.div>
      )}
    </nav>
  )
}
