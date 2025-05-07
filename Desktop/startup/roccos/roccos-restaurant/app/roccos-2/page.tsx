"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Clock, MapPin, Phone, Coffee, Utensils, Heart, Wifi, Cake } from "lucide-react"
import { getRestaurantById } from "@/data/restaurants"

export default function Roccos2Home() {
  const [loaded, setLoaded] = useState(false)
  const restaurant = getRestaurantById("roccos-2")
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Frases aleatorias para el café
  const [coffeeQuote, setCoffeeQuote] = useState("")
  const coffeeQuotes = [
    "El café es un abrazo en una taza",
    "La vida comienza después del café",
    "Primero el café, luego el mundo",
    "Mantén la calma y toma un café",
    "Hoy va a ser un buen día, comienza con café",
    "Un día sin café es como... No, no tengo idea, nunca lo he intentado",
    "El café: porque adultar es difícil",
    "Detrás de cada persona exitosa hay una cantidad sustancial de café",
  ]

  useEffect(() => {
    setLoaded(true)
    // Seleccionar una frase aleatoria
    const randomIndex = Math.floor(Math.random() * coffeeQuotes.length)
    setCoffeeQuote(coffeeQuotes[randomIndex])
  }, [])

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Hero Section - Starbucks Style */}
      <section ref={heroRef} className="relative h-[90vh] overflow-hidden">
        {/* Background with subtle texture */}
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gray-900">
            <div
              className="absolute inset-0 opacity-10 bg-repeat"
              style={{ backgroundImage: "url('/images/textures/coffee-pattern.svg')" }}
            ></div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-6 w-32 h-32 relative mx-auto"
            >
              <Image
                src="/images/roccos-2.0-logo-sin-letras.webp"
                alt="Rocco's 2.0 Logo"
                fill
                className="object-contain"
              />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-outfit text-4xl md:text-6xl font-bold mb-4 text-white"
            >
              Rocco&apos;s 2.0
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={loaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-full text-sm font-medium mb-4 inline-block"
            >
              Próximamente abierto
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-manrope text-xl md:text-2xl mb-2 text-white"
            >
              Fast Food & Coffee
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-manrope text-lg md:text-xl mb-8 max-w-2xl mx-auto text-white/90"
            >
              Un café, un momento, un Rocco&apos;s 2.0
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/roccos-2/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-yellow-400 text-gray-800 dark:bg-yellow-500 dark:text-gray-900 font-outfit text-lg py-3 px-8 rounded-md flex items-center font-medium"
                >
                  Ver Menú <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
              <Link href="/roccos-2/ubicacion">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm border border-white/30 text-white font-outfit text-lg py-3 px-8 rounded-md"
                >
                  Ubicación
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Character - Subtle on the side */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={loaded ? { opacity: 0.9, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.7 }}
            className="absolute bottom-0 right-0 md:right-[5%] z-0 w-[200px] h-[300px] md:w-[350px] md:h-[500px]"
          >
            <Image src="/images/character-roccos-2.0.webp" alt="Rocco's 2.0 Barista" fill className="object-contain" />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-outfit text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center"
          >
            La experiencia Rocco&apos;s 2.0
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-manrope text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 text-center"
          >
            Descubre todo lo que tenemos para ofrecerte
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-[#1E3A29] dark:bg-[#0D1F16] text-white rounded-full flex items-center justify-center mb-6 mx-auto">
                <Coffee className="w-8 h-8" />
              </div>
              <h3 className="font-outfit text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Café de especialidad
              </h3>
              <p className="font-manrope text-gray-600 dark:text-gray-300 text-center">
                Seleccionamos y tostamos los mejores granos para ofrecerte una experiencia única en cada taza.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-[#1E3A29] dark:bg-[#0D1F16] text-white rounded-full flex items-center justify-center mb-6 mx-auto">
                <Cake className="w-8 h-8" />
              </div>
              <h3 className="font-outfit text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Postres únicos
              </h3>
              <p className="font-manrope text-gray-600 dark:text-gray-300 text-center">
                Nuestros postres artesanales son el complemento perfecto para tu café o para llevar a casa.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-sm"
            >
              <div className="w-16 h-16 bg-[#1E3A29] dark:bg-[#0D1F16] text-white rounded-full flex items-center justify-center mb-6 mx-auto">
                <Wifi className="w-8 h-8" />
              </div>
              <h3 className="font-outfit text-xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Ambiente con WiFi & Enfoque
              </h3>
              <p className="font-manrope text-gray-600 dark:text-gray-300 text-center">
                Un espacio diseñado para trabajar, estudiar o simplemente relajarte con WiFi de alta velocidad.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coffee Quote Generator */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800 relative">
        <div
          className="absolute inset-0 opacity-5 bg-repeat"
          style={{ backgroundImage: "url('/images/textures/coffee-pattern.svg')" }}
        ></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-white dark:bg-gray-700 rounded-2xl shadow-xl p-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-6 w-20 h-20 mx-auto"
            >
              <Image
                src="/images/roccos-2.0-logo-sin-letras.webp"
                alt="Rocco's 2.0 Logo"
                fill
                className="object-contain"
              />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-outfit text-2xl font-bold text-gray-800 dark:text-white mb-4"
            >
              Tu frase para hoy
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-[#1E3A29] dark:bg-[#0D1F16] text-white p-6 rounded-lg mb-6"
            >
              <p className="font-manrope text-xl italic">"{coffeeQuote}"</p>
            </motion.div>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              onClick={() => {
                const randomIndex = Math.floor(Math.random() * coffeeQuotes.length)
                setCoffeeQuote(coffeeQuotes[randomIndex])
              }}
              className="bg-yellow-400 dark:bg-yellow-500 text-gray-800 dark:text-gray-900 font-outfit py-2 px-6 rounded-md hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors"
            >
              Nueva frase
            </motion.button>
          </div>
        </div>
      </section>

      {/* Historia y Branding */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 bg-white dark:bg-gray-900 relative"
      >
        <div
          className="absolute inset-0 opacity-5 bg-repeat"
          style={{ backgroundImage: "url('/images/textures/coffee-pattern.svg')" }}
        ></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-outfit text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center"
          >
            Un Nuevo Concepto
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="order-2 md:order-1"
            >
              <p className="font-manrope text-gray-600 dark:text-gray-300 mb-6">{restaurant.history}</p>
              <p className="font-manrope text-gray-600 dark:text-gray-300 mb-6">
                Hemos creado un espacio donde la calidad del café, la frescura de los ingredientes y el diseño
                minimalista se combinan para ofrecerte una experiencia única. Cada detalle ha sido cuidadosamente
                pensado para brindarte momentos especiales.
              </p>
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-400 dark:bg-yellow-500 text-gray-800 dark:text-gray-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Coffee className="w-6 h-6" />
                  </div>
                  <h3 className="font-outfit font-medium text-lg dark:text-gray-200">Café</h3>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-400 dark:bg-yellow-500 text-gray-800 dark:text-gray-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <h3 className="font-outfit font-medium text-lg dark:text-gray-200">Gourmet</h3>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-400 dark:bg-yellow-500 text-gray-800 dark:text-gray-900 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h3 className="font-outfit font-medium text-lg dark:text-gray-200">Pasión</h3>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl order-1 md:order-2"
            >
              <div className="absolute inset-0 bg-[#1E3A29]/10 dark:bg-[#1E3A29]/20 z-10"></div>
              <Image
                src="/images/character-roccos-2.0.webp"
                alt="Concepto de Rocco's 2.0"
                fill
                className="object-contain bg-white dark:bg-gray-800 p-4 z-0"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-800 relative">
        <div
          className="absolute inset-0 opacity-5 bg-repeat"
          style={{ backgroundImage: "url('/images/textures/coffee-pattern.svg')" }}
        ></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 md:order-1"
            >
              <h2 className="font-outfit text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
                Un nuevo concepto
              </h2>
              <p className="font-manrope text-gray-600 dark:text-gray-300 mb-6">{restaurant.description}</p>
              <p className="font-manrope text-gray-600 dark:text-gray-300 mb-8">
                Diseñado para quienes buscan un ambiente contemporáneo y minimalista, con productos de alta calidad y
                atención personalizada.
              </p>
              <div className="flex flex-col space-y-3 mb-8 text-gray-600 dark:text-gray-300">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#1E3A29] dark:text-yellow-500" />
                  <span>{restaurant.address}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 text-[#1E3A29] dark:text-yellow-500" />
                  <span>WhatsApp: {restaurant.whatsapp}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#1E3A29] dark:text-yellow-500" />
                  <span>{restaurant.hours}</span>
                </div>
              </div>
              <Link href="/roccos-2/nosotros">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#1E3A29] text-white dark:bg-[#0D1F16] font-outfit text-lg py-3 px-8 rounded-md flex items-center font-medium"
                >
                  Conoce más <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl order-1 md:order-2"
            >
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Interior de Rocco's 2.0"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
