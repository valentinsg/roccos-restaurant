"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ArrowRight, Clock, MapPin, Phone, Star, FileText } from "lucide-react"
import { getRestaurantById } from "@/data/restaurants"
import RoccosCard from "@/app/components/roccos-card"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay } from "swiper/modules"
import "swiper/css"
import HistorySection from "../components/HistorySection"
import { useProducts } from "@/lib/context/ProductContext"
import { useCart } from "@/hooks/use-cart"

export default function RoccosHome() {
  const [loaded, setLoaded] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const restaurant = getRestaurantById("roccos")
  const heroRef = useRef<HTMLDivElement>(null)
  const { products, loading: productsLoading, error: productsError } = useProducts()
  const { addToCart } = useCart()

  // Configuración personalizada para cada imagen
  const backgroundImages = [
    {
      url: '/images/roccos-frente.png',
      initialScale: 1.15,
      position: 'center 25%',
      contrast: 1.35,
      brightness: 1,
      opacity: 0.1,
    },
    {
      url: '/images/roccos-vip.png',
      initialScale: 1.2,
      position: 'center 40%',
      contrast: 1.4,
      brightness: 0.9,
      opacity: 0.1,
    },
    {
      url: '/images/pizzas-inicio.jpg',
      initialScale: 1.1,
      position: 'center 60%',
      contrast: 1.1,
      brightness: 1,
      opacity: 0.1,
    },
    {
      url: '/images/roccos-sillones.png',
      initialScale: 1.18,
      position: 'center 60%',
      contrast: 1.35,
      brightness: 0.95,
      opacity: 0.1,
    },
    {
      url: '/images/asado-inicio.jpg',
      initialScale: 1.12,
      position: 'center 75%',
      contrast: 1.4,
      brightness: 0.9,
      opacity: 0.1,
    },
  ]

  useEffect(() => {
    setLoaded(true)
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Datos de reseñas
  const reviews = [
    {
      id: 1,
      name: "María González",
      rating: 5,
      text: "La mejor pizza de Dolores sin dudas. El ambiente familiar y la atención de primera. Siempre volvemos con mi familia.",
      date: "15/03/2024",
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      rating: 5,
      text: "Excelente parrilla y pastas caseras. Se nota la tradición y el cariño en cada plato. Muy recomendable.",
      date: "02/04/2024",
    },
    {
      id: 3,
      name: "Laura Martínez",
      rating: 4,
      text: "Muy buena relación calidad-precio. Las porciones son abundantes y la comida deliciosa. Volveré pronto.",
      date: "20/04/2024",
    },
  ]

  interface PlatoDelDia {
    name: string;
    descripcion: string;
    precio: string;
    imagen: string;
  }

  const platoDelDia: PlatoDelDia = {
    name: "Lasaña de la Nonna",
    descripcion: "Capas de pasta fresca, carne estofada y mucho amor. Servida con pan de ajo artesanal y bebida incluida.",
    precio: "$4.800",
    imagen: "/images/platos/lasagna-dia.webp",
  };

  return (
    <div className="bg-[#FAF4E1] min-h-screen">
      {/* Hero Section with Diagonal */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        {/* Background Base */}
        <div className="absolute inset-0 bg-[#111111]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{
                scale: backgroundImages[currentImageIndex].initialScale,
                opacity: backgroundImages[currentImageIndex].opacity
              }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                scale: { duration: 5, ease: "easeOut" },
                opacity: { duration: 0.5, ease: "easeInOut" }
              }}
              className="absolute inset-0 bg-cover bg-no-repeat"
              style={{
                backgroundImage: `url(${backgroundImages[currentImageIndex].url})`,
                backgroundPosition: backgroundImages[currentImageIndex].position,
                filter: `contrast(${backgroundImages[currentImageIndex].contrast}) brightness(${backgroundImages[currentImageIndex].brightness})`
              }}
            />
          </AnimatePresence>
          {/* Overlay gradiente para mejorar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent" />
        </div>

        {/* Diagonal Overlay - Estático */}
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            {/* Fondo principal */}
            <div className="absolute inset-0 bg-[#111111] bg-opacity-60" />

            {/* Overlay diagonal */}
            <div className="absolute inset-0 bg-[#FAF4E1] clip-path-diagonal-inverse" />
          </div>
        </div>

        {/* Character */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="absolute bottom-[16%] right-[8%] z-20 h-[40vh] md:h-[50vh] aspect-[3/4] max-h-[600px] min-h-[250px]"
        >
          <Image
            src="/images/character-roccos.webp"
            alt="Rocco's Chef"
            fill
            className="object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.2)] scale-x-[-1]"
            priority
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-30 pt-12 sm:pt-16 md:mt-6 flex flex-col items-center justify-center">
          <div className="w-full px-4 sm:px-4 md:px-12 lg:px-16 ml-[5%] sm:ml-[10%] md:ml-[15%]">
            <div className="max-w-xl">
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-48 lg:h-48 relative mb-2 sm:mb-4"
              >
                <Image
                  src="/images/roccos-logo-sin-letras.webp"
                  alt="Rocco's Logo"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                className="font-outfit font-bold text-shadow-lg text-xl xs:text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-2 sm:mb-4 md:mb-6 text-[#E6C163] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
              >
                Rocco&apos;s Pizza <br className="hidden sm:block" /> and Restaurante
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="font-outfit text-sm xs:text-base sm:text-lg md:text-xl mb-4 sm:mb-6 md:mb-8 text-[#FAF4E1] drop-shadow-lg"
              >
                Una experiencia gastronómica que conecta familia, sabor y momentos en un ambiente cálido. <br className="hidden xs:block" />
                Las mejores pizzas de Dolores, buena parrilla y smashed burgers.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={loaded ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                className="flex flex-col xs:flex-row gap-3 sm:gap-6"
              >
                <Link href="/roccos/nosotros" className="group w-full xs:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(168,37,49,0.4)" }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full bg-[#A82531] text-[#E6C163] font-outfit text-sm xs:text-base sm:text-lg md:text-xl py-2 xs:py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-xl flex items-center justify-center overflow-hidden group-hover:shadow-[0_8px_30px_rgba(168,37,49,0.4)] transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center">
                      Conocé nuestra historia <ArrowRight className="ml-2 xs:ml-3 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-2" />
                    </span>
                    <div className="absolute inset-0 bg-[#E6C163] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                    <span className="absolute inset-0 bg-gradient-to-r from-[#A82531] to-[#8a1e28] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.button>
                </Link>
                <Link href="/roccos/pedido" className="group w-full xs:w-auto">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(230,193,99,0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="relative w-full border-2 border-[#E6C163] text-[#E6C163] font-outfit text-sm xs:text-base sm:text-lg md:text-xl py-2 xs:py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-xl flex items-center justify-center overflow-hidden group-hover:shadow-[0_8px_30px_rgba(230,193,99,0.3)] transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center">
                      Hacer Pedido <ArrowRight className="ml-2 xs:ml-3 w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-2" />
                    </span>
                    <div className="absolute inset-0 bg-[#E6C163] transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Platos estrella */}
      <section className="py-16 sm:py-20 md:py-28 lg:py-32 px-4">
        <div className="max-w-6xl mx-auto text-center mb-10 sm:mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-outfit font-extrabold text-[#A82531] mb-2"
          >
            Nuestros Platos Estrella
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#5E4B42] text-sm xs:text-base sm:text-lg md:text-xl font-outfit italic"
          >
            Clásicos irresistibles que definen el sabor de Rocco's.
          </motion.p>
        </div>

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
              .filter((product) => product.star && product.sucursal === "roccos")
              .map((product, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="text-center group"
                >

                  <div className="relative h-48 sm:h-56 md:h-64 w-full flex justify-center items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-48 sm:h-56 md:h-64 object-contain drop-shadow-xl group-hover:scale-105 group-hover:drop-shadow-[0px_3px_20px_rgba(230,193,99,0.8)] transition-all duration-300"
                    />
                  </div>

                  <h3 className="mt-3 md:mt-4 text-xl sm:text-2xl font-bold font-outfit text-[#A82531]">
                    {product.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-outfit mt-1 sm:mt-2 mb-2 sm:mb-3 px-2">{product.description}</p>

                  {/* Precio destacado arriba */}
                  <div className="text-xl sm:text-2xl text-[#A82531] font-extrabold font-outfit">
                    ${product.price}
                  </div>
                  <button onClick={() => addToCart(product)} className="mt-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[#A82531] border-2 border-[#A82531] font-outfit text-sm sm:text-base hover:bg-[#A82531] hover:text-white transition-colors duration-300">
                    Añadir al pedido
                  </button>
                </motion.div>
              ))
          )}
        </div>
      </section>

      {/* Categorías */}
      <section className="py-8 sm:py-10 md:py-12 w-full text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={loaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          className="text-2xl sm:text-3xl md:text-4xl font-outfit font-extrabold text-[#A82531]"
        >
          ¿Qué ofrecemos?
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full mt-4 sm:mt-6 md:mt-8 shadow-lg py-4 sm:py-6 bg-[#8A1D27] shadow-black/40 shadow-xl"
        >
          <Swiper
            modules={[Autoplay]}
            slidesPerView={6}
            loop={true}
            speed={5000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              waitForTransition: true
            }}
            freeMode={true}
            grabCursor={true}
            breakpoints={{
              320: {
                slidesPerView: 2.5,
                spaceBetween: 8
              },
              480: {
                slidesPerView: 3,
                spaceBetween: 10
              },
              640: {
                slidesPerView: 3.5,
                spaceBetween: 15
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 30
              }
            }}
          >
            {[
              { name: "Parrilladas", image: "/images/vacio.webp" },
              { name: "Pizzas", image: "/images/pizza-roccos.webp" },
              { name: "Pastas", image: "/images/fideos-tuco.webp" },
              { name: "Empanadas", image: "/images/empanada-carne.webp" },
              { name: "Platos Elaborados", image: "/images/lomo-con-papas-espanolas.webp" },
              { name: "Minutas", image: "/images/sanguche-milanesa-completo.webp" },
              { name: "Menú Vegetariano", image: "/images/pizza-vegetariana.webp" },
              { name: "Bebidas", image: "/images/coca-cola-500.webp" },
              { name: "Postres", image: "/images/brownie-con-helado.webp" },
              { name: "Tapeos", image: "/images/papas-antares.webp" },
              { name: "Picadas", image: "/images/picada-completa.webp" },
              { name: "Ensaladas", image: "/images/ensalada-remolacha-huevo-tomate.webp" },
              { name: "Mariscos", image: "/images/casata-de-mariscos.webp" },
              { name: "Smashed Burgers", image: "images/hamburugesa-cebolla-pepinillo.webp" },
            ].map((item, i) => (
              <SwiperSlide key={i} className="flex justify-center">
                <motion.a
                  href={`/roccos/pedidos`}
                  className="w-[80px] sm:w-[100px] bg-transparent transition-all duration-300 group flex flex-col items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain mb-1 drop-shadow-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                  <motion.span
                    className="position absolute bottom-0 font-outfit font-bold text-xs sm:text-sm md:text-base text-[#FAF4E1] group-hover:text-[#E6C163] transition-colors duration-300 ease-in-out tracking-wide"
                    whileHover={{ y: -2 }}
                  >
                    {item.name}
                  </motion.span>
                </motion.a>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </section>

      {/* Plato del día */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pt-16 sm:pt-24 md:pt-36 lg:pt-48 bg-[#FAF4E1]"
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6 px-4">
          {/* Columna izquierda: HOY PLATO DEL DÍA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/1 text-[#A82531] font-outfit font-extrabold leading-[0.9] text-left"
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-1 sm:mb-2 text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
            >
              ¡HOY!
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-1 sm:mb-2 text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
            >
              PLATO
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]"
            >
              DEL DÍA
            </motion.p>
          </motion.div>

          {/* Columna derecha: plato del día */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full bg-[transparent] p-2 sm:p-4 gap-2 sm:gap-4 items-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="inline-block bg-[#A82531] text-[#FAF4E1] px-3 sm:px-4 md:px-6 py-1 sm:py-1.5 md:py-2 rounded-full font-outfit font-medium text-sm sm:text-base md:text-lg"
            >
              {platoDelDia.precio}
            </motion.span>
            <motion.img
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              src={platoDelDia.imagen}
              alt={platoDelDia.name}
              className="w-full md:w-2/3 lg:w-1/2 h-40 sm:h-48 md:h-56 lg:h-64 object-cover shadow-md"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-4 sm:mt-6 md:mt-10 text-left"
            >
              <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#A82531] font-outfit mb-2 sm:mb-3">
                {platoDelDia.name}
              </h3>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-outfit font-medium leading-[1.3] text-[#5E4B42]">
                {platoDelDia.descripcion}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Nota inferior */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="my-20 text-lg text-[#5E4B42] font-outfit italic text-center"
      >
        Disponible solo al mediodía. ¡Hasta agotar stock!
      </motion.p>

      {/* Sección de Descarga del Menú */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative py-24 px-4 sm:px-6 md:px-8 flex items-center justify-center overflow-hidden shadow-lg"
        style={{
          backgroundImage: "url('/images/textures/background-fachero.webp')",
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
          className="relative z-10 border-[#A82531] border-4 max-w-4xl w-full bg-[#FAF4E1] backdrop-blur-md rounded-2xl shadow-2xl shadow-black/80 px-6 sm:px-8 md:px-10 py-10 md:py-14 text-center"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="font-outfit font-extrabold text-3xl sm:text-4xl md:text-5xl text-[#A82531] mb-4 sm:mb-6 drop-shadow"
          >
            Obtené el menú completo
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="font-outfit text-base sm:text-lg md:text-xl text-[#A82531]/90 leading-relaxed mb-8 md:mb-10 max-w-xl mx-auto"
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
            <button className="relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-[#A82531] font-bold font-outfit uppercase tracking-wide border-2 border-[#A82531] rounded-xl overflow-hidden transition-all duration-300 hover:bg-[#A82531] hover:text-[#FAF4E1]">
              <FileText className="mr-2 h-5 w-5" />
              Descargar Menú
            </button>
          </motion.a>
        </motion.div>
      </motion.section>

      {/* Historia y Branding */}
      <HistorySection restaurant={restaurant} />

      {/* Reseñas Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 md:px-8 bg-[#FAF4E1] text-gray-800 relative overflow-hidden">
        {/* Fondo sutil */}
        <div className="absolute inset-0 opacity-5"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="text-[#A82531] font-medium uppercase tracking-wider text-sm">Nuestros Clientes</span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-outfit text-6xl sm:text-4xl md:text-6xl font-bold text-[#A82531] mt-2"
            >
              Reseñas destacadas
            </motion.h2>
            <div className="w-24 h-1 bg-[#E6C163] mx-auto mt-6"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 ">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white border border-[#A82531] rounded-xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative transition-all duration-300"
              >
                {/* Comillas decorativas */}
                <div className="absolute top-6 right-6 text-[#E6C163] opacity-20 text-6xl font-serif">
                  &ldquo;
                </div>

                <div className="flex items-center mb-4">
                  {/* Icono de usuario o inicial */}
                  <div className="w-12 h-12 rounded-full bg-[#A82531] text-white flex items-center justify-center font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-outfit text-lg font-semibold text-gray-800">{review.name}</p>
                    <p className="text-sm text-gray-500">{review.date}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "text-[#E6C163] fill-[#E6C163]" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <p className="font-outfit text-gray-700 mb-4 relative z-10">"{review.text}"</p>

                {/* Tag decorativo */}
                <div className="inline-block bg-[#FAF4E1] py-1 px-3 rounded-full text-sm text-[#A82531] font-medium">
                  Cliente verificado
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <Link href="/roccos/contacto">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 text-[#A82531] font-bold font-outfit uppercase tracking-wide border-2 border-[#A82531] rounded-xl overflow-hidden transition-all duration-300 hover:bg-[#A82531] hover:text-[#FAF4E1]"
              >
                Déjanos tu opinión <ArrowRight className="ml-2 w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* VIP Reservation Section */}
      <section className="py-24 sm:py-24 px-4 sm:px-6 md:px-8 bg-gradient-to-r from-[#0E0E0E] to-[#1A1914] relative overflow-hidden">
        {/* Fondo sutil con textura VIP */}
        <div className="absolute inset-0">
          {/* Textura elegante dorada */}
          <div className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/textures/gold-pattern.png')",
              backgroundSize: "300px",
              backgroundRepeat: "repeat",
              opacity: 0.03
            }}>
          </div>

          {/* Efectos de luz premium */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37] rounded-full opacity-[0.02] blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#A82531] rounded-full opacity-[0.02] blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center mb-12 sm:mb-16"
          >
            <span className="text-[#111111] font-medium mb-2 text-sm font-outfit tracking-widest bg-gradient-to-r from-[#D4AF37] to-[#E6C163] px-4 py-1 rounded-full shadow-sm">EXPERIENCIA EXCLUSIVA</span>
            <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#D4AF37] to-[#F5E7A3] mb-4 sm:mb-6">
              Reservá tu Mesa VIP
            </h2>
            <p className="font-outfit text-base sm:text-lg text-[#FAF4E1]/90 max-w-2xl">
              Disfrutá de una experiencia única en nuestro espacio exclusivo.
              Ambiente íntimo, atención personalizada y la mejor comodidad para vos.
            </p>
          </motion.div>

          {/* Contenedor flexible para la tarjeta y botones */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Tarjeta de Reserva - A la izquierda en desktop */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-3/5 flex justify-center mb-12 sm:mb-16 lg:mb-0"
            >
              <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl">
                {/* Efecto premium para la tarjeta */}
                <RoccosCard />
              </div>
            </motion.div>

            {/* Información de Contacto y Botón de WhatsApp - A la derecha en desktop */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:w-2/5 flex flex-col items-center lg:items-start"
            >
              <div className="bg-gradient-to-br from-[#191919] to-[#0E0E0E] backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-[#D4AF37]/20 shadow-xl mb-8 w-full max-w-md">
                <h3 className="text-[#D4AF37] font-outfit font-bold text-2xl mb-4">Reservá fácilmente</h3>
                <p className="font-outfit text-[#FAF4E1]/80 mb-6">
                  Contamos con atención personalizada para brindarte la mejor experiencia gastronómica. Reservá con anticipación para asegurar tu mesa VIP.
                </p>

                {/* Opción de teléfono */}
                <div className="flex items-center mb-6 p-3 rounded-lg bg-[#0A0A0A] border border-[#D4AF37]/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#A82531]/30 to-[#A82531]/10 flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm font-outfit text-[#FAF4E1]/60 mb-1">Llámanos al</p>
                    <a
                      href="tel:+542245439331"
                      className="text-[#D4AF37] font-outfit text-lg font-medium hover:underline"
                    >
                      (2245) 43-9331
                    </a>
                  </div>
                </div>

                {/* Botón grande de WhatsApp */}
                <a
                  href="https://wa.me/542245439331?text=Hola,%20quiero%20reservar%20una%20mesa%20VIP%20en%20Rocco's"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 15px rgba(27, 197, 105, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full font-outfit py-4 px-6 bg-gradient-to-r from-[#1EA952] to-[#25D366] hover:from-[#1b9247] hover:to-[#1fb959] text-white rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 text-lg font-medium"
                  >
                    <svg
                      className="w-6 h-6 mr-3"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375c-.99-1.576-1.516-3.391-1.516-5.26 0-5.445 4.455-9.885 9.942-9.885 2.654 0 5.145 1.035 7.021 2.91 1.875 1.859 2.909 4.35 2.909 6.99-.004 5.444-4.46 9.885-9.935 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.334.101 11.893c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652c1.746.943 3.71 1.444 5.71 1.447h.006c6.585 0 11.946-5.336 11.949-11.896 0-3.176-1.24-6.165-3.495-8.411" />
                    </svg>
                    Reservar por WhatsApp
                  </motion.button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-28 px-6 sm:px-6 md:px-6 bg-[#FAF4E1] relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center">

            {/* Texto Izquierdo */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-4 sm:p-6"
            >
              <h2 className="font-outfit text-5xl sm:text-4xl md:text-5xl font-bold text-[#A82531]  mb-6">
                Encontranos en Dolores
              </h2>
              <p className="font-outfit text-xl text-[#4A3E36] mb-6">
                Somos el corazón gastronómico de Dolores. Tradición, sabor y pasión por los detalles en cada plato.
              </p>
              <p className="font-outfit text-xl text-[#4A3E36] mb-10">
                Te invitamos a vivir una experiencia única en un ambiente cálido, familiar y lleno de historia.
              </p>

              <div className="flex flex-col space-y-4 mb-10 text-[#4A3E36] ">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-[#A82531]" />
                  <span className="font-outfit text-base sm:text-xl">
                    Olavarría 1199, Dolores, Provincia de Buenos Aires, Argentina
                  </span>
                </div>
                <div className="flex items-center flex-wrap">
                  <Phone className="w-5 h-5 mr-2 text-[#A82531]" />
                  <span className="font-outfit text-base sm:text-xl">
                    Tel: 2245 441330 | WhatsApp: 2245 401066
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-[#A82531]" />
                  <span className="font-outfit text-base sm:text-xl">
                    11:30 a 15:30 y 20:00 a 00:30
                  </span>
                </div>
              </div>

              <Link href="/roccos/nosotros">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="relative inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 mt-6 text-[#A82531] font-bold font-outfit uppercase tracking-wide border-2 border-[#A82531] rounded-xl overflow-hidden transition-all duration-300  hover:text-[#FAF4E1] hover:bg-[#A82531]"
                >
                  Conocé nuestra historia <ArrowRight className="ml-2 w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Mapa o imagen derecha */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative h-full rounded-xl overflow-hidden shadow-xl"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.1796815046276!2d-57.680024423879826!3d-36.31185700000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bd1f189d6f5a23%3A0x84e3d93cfabf7112!2sOlavarria%201199%2C%20B7100DVO%20Dolores%2C%20Provincia%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2sar!4v1713986954003!5m2!1ses-419!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  )
}
