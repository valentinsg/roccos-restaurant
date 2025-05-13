"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Clock, MapPin, Phone, Coffee, Heart, ChevronLeft, ChevronRight, FileText } from "lucide-react"
import { getRestaurantById } from "@/data/restaurants"
import { useProducts } from "@/lib/context/ProductContext"

export default function Roccos2Home() {
  const [loaded, setLoaded] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const restaurant = getRestaurantById("roccos-2")
  const heroRef = useRef<HTMLDivElement>(null)
  const { products, loading: productsLoading, error: productsError } = useProducts()


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

  const carouselImages = [
    "/images/roccos_2_0_front.webp",
    "/images/roccos_2_0_front.webp",
    "/images/roccos_2_0_front.webp",
  ]

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % carouselImages.length)
  }

  const prevImage = () => {
    setActiveImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  useEffect(() => {
    setLoaded(true)
    // Seleccionar una frase aleatoria
    const randomIndex = Math.floor(Math.random() * coffeeQuotes.length)
    setCoffeeQuote(coffeeQuotes[randomIndex])
  }, [])

  return (
    <div className="bg-roccos-secondary min-h-screen">
      {/* Hero Section - Starbucks Style */}
      <section ref={heroRef} className="relative h-[90vh] overflow-hidden">
        {/* Background con textura mejorada */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[#0C2232]">
            {/* Textura mejorada con overlay y blend mode */}
            <div
              className="absolute inset-0 opacity-80 bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/textures/blue_wall_background.webp')",
                backgroundSize: "cover",
                filter: "contrast(1.1) brightness(0.9)"
              }}
            ></div>
            {/* Overlay con gradiente para mejorar profundidad */}
            <div
              className="absolute inset-0 bg-gradient-to-b from-roccos-blue-dark/30 to-roccos-blue-dark/10 mix-blend-overlay"
            ></div>
            {/* Sutil viñeta para dar más profundidad */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 opacity-50"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
          <div className="max-w-5xl mx-auto text-center">
            {/* Logo principal mejorado */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 bg-[#151515] w-72 h-72 relative mx-auto drop-shadow-[0_0_20px_rgba(0,0,0,0.6)] rounded-full border-2 border-white/90 shadow-[0_0_15px_rgba(0,0,0,0.7)]"
            >
              <Image
                src="/images/roccos-2.0-logo.webp"
                alt="Rocco's 2.0 Logo"
                fill
                priority
                className="object-contain p-1"
              />
            </motion.div>

            {/* Título principal */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-3xl md:text-7xl font-manrope font-extrabold mb-4 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            >
              Fast Food & Coffee
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="text-lg md:text-2xl font-manrope mb-12 max-w-2xl mx-auto text-white drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)]"
            >
              Un café, un momento, un Rocco&apos;s 2.0
            </motion.p>

            {/* Botones de acción */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <Link href="/roccos-2/menu">
                <motion.button
                  whileHover={{ scale: 1.01, boxShadow: "0 5px 15px rgba(229, 89, 37, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer transition-all bg-[#E55925] text-white font-outfit text-lg px-8 py-3 rounded-lg border-[#c44016] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] flex items-center gap-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                  Menú
                </motion.button>
              </Link>
              <Link href="/roccos-2/ubicacion">
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="cursor-pointer transition-all bg-white/20 backdrop-blur-md text-white font-outfit text-lg px-8 py-3 rounded-lg border-[#E55925] border-b-[4px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] flex items-center gap-2 shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Ubicación
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* Logos laterales redimensionados y reposicionados */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={loaded ? { opacity: 0.9, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="absolute bottom-24 left-6 md:left-12 z-0 w-[100px] h-[150px] md:w-[140px] md:h-[180px]"
          >
            <Image
              src="/images/take_away_logo.webp"
              alt="Take Away Logo"
              width={140}
              height={180}
              className="w-full h-full object-contain drop-shadow-[0_5px_24px_rgba(0,0,0,0.7)]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={loaded ? { opacity: 0.9, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            className="absolute bottom-24 right-6 md:right-12 z-0 w-[100px] h-[150px] md:w-[140px] md:h-[180px]"
          >
            <Image
              src="/images/brandsen-39-sign.webp"
              alt="Brandsen 39 Sign"
              width={140}
              height={180}
              className="w-full h-full object-contain drop-shadow-[0_5px_24px_rgba(0,0,0,0.7)]"
            />
          </motion.div>
        </div>


        {/* Elemento de transición con gradiente para fundirse suavemente con la siguiente sección */}
        <div className="absolute bottom-0 left-0 right-0 h-32 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-full drop-shadow-[0_0_35px_rgba(0,0,0,0.7)]" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gradientTransition" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0C2232" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#0C2232" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              fill="url(#gradientTransition)"
              d="M0,64L80,69.3C160,75,320,85,480,90.7C640,96,800,96,960,80C1120,64,1280,32,1360,16L1440,0L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Productos Destacados Section con transición mejorada */}
      <section id="productos-destacados" className="py-24 px-4 bg-[#0C2232] relative">
        {/* Sombra superior para mejorar la fusión con la sección anterior */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#0C2232] to-transparent z-0"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-manrope text-center font-extrabold text-white mb-2"
          >
            Nuestros Destacados
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white text-xl font-manrope italic text-center"
          >
            Lo más popular de nuestro menú.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1 }}
            className="w-24 h-1 bg-[#E55925] mx-auto mt-6 mb-10 rounded-full"
          ></motion.div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {productsLoading ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full border-b-2 border-white h-5 w-5"></div>
              </div>
            ) : productsError ? (
              <div className="text-center text-2xl text-white font-manrope">
                <p>Error cargando productos</p>
                <button
                  className="mt-4 px-4 py-2 bg-[#E55925] rounded-full text-white font-manrope"
                  onClick={() => window.location.reload()}
                >
                  Intentar de nuevo
                </button>
              </div>
            ) : (
              products
                .filter(product => product.star && product.sucursal === "roccos-2")
                .map((product, idx) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.15 }}
                    className="text-center group"
                  >
                    <div className="relative h-64 w-full flex justify-center items-center">
                      <motion.img
                        src={product.image}
                        alt={product.name}
                        className="h-64 object-contain drop-shadow-xl transition-all duration-300"
                        whileHover={{
                          scale: 1.08,
                          filter: "drop-shadow(0px 3px 20px rgba(230,193,99,0.8))"
                        }}
                      />
                    </div>

                    <h3 className="mt-4 text-2xl font-extrabold font-manrope text-[#E55925]">
                      {product.name}
                    </h3>
                    <p className="text-md text-white font-manrope mt-2 mb-3 px-2">{product.description}</p>

                    <motion.div
                      className="text-3xl text-white font-extrabold font-manrope"
                      initial={{ scale: 1 }}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      ${product.price}
                    </motion.div>
                  </motion.div>
                ))
            )}
          </div>
        </div>
      </section>

      {/* Historia y Branding */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F5 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-10 bg-repeat"
          style={{
            backgroundImage: "url('/images/textures/coffee-pattern.svg')",
            backgroundSize: '200px',
            animation: 'patternMove 20s linear infinite'
          }}
        ></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-manrope text-4xl md:text-6xl font-extrabold text-[#1A3E5A] mb-12 text-center"
          >
            Un Nuevo Concepto
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="order-2 md:order-1"
            >
              <p className="font-manrope text-[#1A3E5A]/90 text-lg mb-8 leading-relaxed">{restaurant.history}</p>
              <p className="font-manrope text-[#1A3E5A]/90 text-lg mb-8 leading-relaxed">
                Hemos creado un espacio donde la <span className="text-[#E55925] font-bold">calidad excepcional</span> del café, la frescura de los ingredientes y el diseño
                minimalista se combinan para ofrecerte una experiencia única. Cada detalle ha sido cuidadosamente
                pensado para brindarte momentos especiales.
              </p>
              <div className="grid grid-cols-3 gap-8 mt-12">
                <motion.div
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-white backdrop-blur-sm text-[#E55925] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/70 transition-all duration-300 border-2 border-[#E55925]/30">
                    <Coffee className="w-8 h-8 group-hover:text-[#E55925]" />
                  </div>
                  <h3 className="font-manrope font-medium text-xl text-[#1A3E5A]">Café <span className="text-[#E55925]">Premium</span></h3>
                </motion.div>
                <motion.div
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-white backdrop-blur-sm text-[#E55925] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/70 transition-all duration-300 border-2 border-[#E55925]/30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-hamburger-icon lucide-hamburger w-8 h-8 group-hover:text-[#E55925]">
                      <path d="M12 16H4a2 2 0 1 1 0-4h16a2 2 0 1 1 0 4h-4.25" /><path d="M5 12a2 2 0 0 1-2-2 9 7 0 0 1 18 0 2 2 0 0 1-2 2" />
                      <path d="M5 16a2 2 0 0 0-2 2 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 2 2 0 0 0-2-2q0 0 0 0" />
                      <path d="m6.67 12 6.13 4.6a2 2 0 0 0 2.8-.4l3.15-4.2" />
                    </svg>
                  </div>
                  <h3 className="font-manrope font-medium text-xl text-[#1A3E5A]">Comida <span className="text-[#E55925]">Gourmet</span></h3>
                </motion.div>
                <motion.div
                  className="text-center group"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-white backdrop-blur-sm text-[#E55925] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/70 transition-all duration-300 border-2 border-[#E55925]/30">
                    <Heart className="w-8 h-8 group-hover:text-[#E55925]" />
                  </div>
                  <h3 className="font-manrope font-medium text-xl text-[#1A3E5A]">Pasión <span className="text-[#E55925]">Artesanal</span></h3>
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2 group"
            >
              {/* Overlay con gradiente mejorado */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40 z-10"></div>

              {/* Contenedor principal del carrusel */}
              <div className="relative h-full">
                {carouselImages.slice(0, 3).map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{
                      opacity: index === activeImage ? 1 : 0,
                      scale: index === activeImage ? 1 : 1.1,
                      zIndex: index === activeImage ? 1 : 0
                    }}
                    transition={{
                      duration: 0.7,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={image}
                      alt={`Roccos 2 Interior ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transform transition-transform duration-700 group-hover:scale-105"
                      priority={index === 0}
                    />
                  </motion.div>
                ))}

                {/* Texto descriptivo con fondo mejorado */}
                <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 via-black/50 to-transparent backdrop-blur-sm">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-white font-manrope text-3xl font-bold mb-3"
                  >
                    Nuestro Espacio
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white/90 text-lg font-manrope"
                  >
                    Un lugar diseñado para tu comodidad y disfrute
                  </motion.p>
                </div>
              </div>

              {/* Controles de navegación mejorados */}
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.5)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveImage((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50 shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.5)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveImage((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/50 shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>

              {/* Indicadores de navegación mejorados */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 bg-black/30 backdrop-blur-md px-6 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
                {carouselImages.slice(0, 3).map((_, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === activeImage
                      ? 'bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                      : 'bg-white/50 hover:bg-white/80'
                      }`}
                    onClick={() => setActiveImage(index)}
                    aria-label={`Ir a imagen ${index + 1}`}
                  />
                ))}
              </div>

              {/* Efecto de brillo al hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Sección de Descarga del Menú */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-4 sm:px-6 md:px-8 flex items-center justify-center overflow-hidden shadow-lg"
        style={{
          backgroundImage: "url('/images/textures/background-fachero-2.0.webp')",
          backgroundSize: "250px",
          backgroundRepeat: "repeat",
        }}
      >
        {/* Carta flotante */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 border-[#E55925] border-4 max-w-4xl w-full bg-[#0C2232]/90 backdrop-blur-md rounded-2xl shadow-2xl shadow-black/80 px-6 sm:px-8 md:px-10 py-10 md:py-14 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-manrope font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4 sm:mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            Obtené el menú completo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="font-outfit text-base sm:text-lg md:text-xl text-white/90 leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto"
          >
            Descargá nuestra carta para conocer el corazón de Rocco's completo y tenerla siempre a la mano.
          </motion.p>

          {/* Botón elegante */}
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            href="/pdfs/roccos-menu.pdf"
            download
            className="inline-block"
          >
            <button className="relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-white font-bold font-outfit uppercase tracking-wide border-2 border-[#E55925] rounded-xl overflow-hidden transition-all duration-300 hover:bg-[#E55925] hover:text-white shadow-lg shadow-black/30 backdrop-blur-md bg-white/10">
              <FileText className="mr-2 h-5 w-5" />
              Descargar Menú
            </button>
          </motion.a>
        </motion.div>
      </motion.section>
      {/* Sección de Testimonios */}
      {/* <section className="py-20 px-4 bg-[#0C2232] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-5 bg-repeat"
          style={{
            backgroundImage: "url('/images/textures/coffee-pattern.svg')",
            backgroundSize: '150px',
          }}
        ></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-manrope text-4xl md:text-5xl font-extrabold text-white mb-12 text-center"
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                text: "El mejor café que he probado en la ciudad. El ambiente es perfecto para trabajar o reunirse con amigos. ¡Volveré pronto!",
                rating: 5,
                image: "/images/testimonials/person-1.jpg"
              },
              {
                name: "Carlos Rodríguez",
                text: "Las hamburguesas son increíbles y el servicio es excelente. El personal siempre está atento y amable. Mi lugar favorito para almorzar.",
                rating: 5,
                image: "/images/testimonials/person-2.jpg"
              },
              {
                name: "Laura Martínez",
                text: "Un espacio moderno con un toque acogedor. Los postres son deliciosos y el café tiene un sabor único. Recomendado al 100%.",
                rating: 5,
                image: "/images/testimonials/person-3.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                className="bg-white p-6 rounded-xl shadow-lg border-2 border-[#E55925] hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-[#E55925]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-manrope font-bold text-lg text-[#1A3E5A]">{testimonial.name}</h3>
                    <div className="flex">
                      {Array(testimonial.rating).fill(0).map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#E55925]" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 font-outfit leading-relaxed">{testimonial.text}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 text-center"
          >
            <Link href="/roccos-2/opiniones">
            <button className="relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-white font-bold font-outfit uppercase tracking-wide border-2 border-[#E55925] rounded-xl overflow-hidden transition-all duration-300 hover:bg-[#E55925] hover:text-white shadow-lg shadow-black/30 backdrop-blur-md bg-white/10">
                Ver más opiniones <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section> */}

      {/* Info Section */}
      <section className="py-20 px-4 bg-white relative">
        <div
          className="absolute inset-0 opacity-5 bg-repeat"
          style={{ backgroundImage: "url('/images/textures/coffee-pattern.svg')" }}
        ></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <h2 className="font-manrope text-3xl md:text-4xl font-extrabold text-[#0C2232] mb-6">
                Un nuevo concepto
              </h2>
              <p className="font-manrope text-[#0C2232] mb-6 leading-relaxed">{restaurant.description}</p>
              <p className="font-manrope text-[#0C2232] mb-8 leading-relaxed">
                Diseñado para quienes buscan un ambiente contemporáneo y minimalista, con productos de alta calidad y
                atención personalizada.
              </p>
              <div className="flex flex-col space-y-4 mb-10 text-[#0C2232]">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-[#E55925]" />
                  <a
                    href="https://maps.google.com/?q=Brandsen+39,+Dolores,+Buenos+Aires"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-manrope hover:text-[#E55925] transition-colors duration-300"
                  >
                    Brandsen 39, Dolores
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 mr-3 text-[#E55925]" />
                  <span className="font-manrope">WhatsApp: {restaurant.whatsapp}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-6 h-6 mr-3 text-[#E55925]" />
                  <span className="font-manrope">{restaurant.hours}</span>
                </div>
              </div>
              <Link href="/roccos-2/nosotros">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#E55925] hover:bg-[#d14e1f] text-white font-manrope text-lg py-3 px-8 rounded-md flex items-center font-medium transition-colors duration-300 shadow-lg"
                >
                  Conoce más <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-80 md:h-[450px] rounded-xl overflow-hidden shadow-2xl order-1 md:order-2"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.5726856896483!2d-57.68040672392344!3d-36.31507887210083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x959a1b6c3b4a9c8d%3A0x4c1b08c65c8c2e6e!2sBrandsen%2039%2C%20Dolores%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1699123456789!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/30 to-transparent"></div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
