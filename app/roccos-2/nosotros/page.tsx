"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { getRestaurantById } from "@/data/restaurants"
import Timeline from "@/components/timeline"
import { roccos2TimelineEvents } from "@/data/timeline"
import { Coffee, Utensils, Sparkles, Heart } from "lucide-react"

export default function Roccos2Nosotros() {
  const [loaded, setLoaded] = useState(false)
  const restaurant = getRestaurantById("roccos-2")

  useEffect(() => {
    setLoaded(true)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] overflow-hidden">
        <Image src="/placeholder.svg?height=800&width=1600" alt="Rocco's 2.0 Concepto" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/30 z-10"></div>
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={loaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-yellow-400 text-gray-800 px-6 py-2 rounded-full text-sm font-medium mb-6"
          >
            Próximamente abierto
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-sans text-4xl md:text-6xl font-bold mb-4"
          >
            Nuestro Concepto
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-2xl"
          >
            Una nueva experiencia gastronómica en Dolores
          </motion.p>
        </div>
      </section>

      {/* Intro Section */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <h2 className="font-sans text-3xl md:text-4xl font-bold text-gray-800 mb-6">Quiénes Somos</h2>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>
              <p className="text-gray-600 mb-6">{restaurant.history}</p>
              <p className="text-gray-600">
                Rocco's 2.0 nace como una evolución natural de nuestra marca, adaptándonos a las nuevas tendencias
                gastronómicas sin perder la esencia que nos caracteriza: la calidad y el servicio.
              </p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl order-1 md:order-2"
            >
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Concepto Rocco's 2.0"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Valores Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-16 px-4 bg-gray-800 text-white"
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 variants={itemVariants} className="font-sans text-3xl md:text-4xl font-bold mb-12">
            Nuestros Valores
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white text-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8" />
              </div>
              <h3 className="font-sans text-xl font-bold mb-3">Calidad</h3>
              <p className="text-gray-600">
                Seleccionamos los mejores granos de café y los ingredientes más frescos para cada una de nuestras
                creaciones.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white text-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="w-8 h-8" />
              </div>
              <h3 className="font-sans text-xl font-bold mb-3">Innovación</h3>
              <p className="text-gray-600">
                Nos mantenemos al día con las últimas tendencias gastronómicas para ofrecerte experiencias únicas y
                sorprendentes.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white text-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-sans text-xl font-bold mb-3">Diseño</h3>
              <p className="text-gray-600">
                Creamos espacios estéticos y funcionales donde cada detalle está pensado para mejorar tu experiencia.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white text-gray-800 rounded-lg p-6 shadow-lg"
            >
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="font-sans text-xl font-bold mb-3">Pasión</h3>
              <p className="text-gray-600">
                Amamos lo que hacemos y eso se refleja en cada producto que servimos y en la atención que brindamos.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="font-sans text-3xl md:text-4xl font-bold text-gray-800 mb-4"
          >
            Nuestro Camino
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            El recorrido que nos ha llevado hasta aquí y hacia dónde vamos
          </motion.p>
        </div>

        <Timeline events={roccos2TimelineEvents} variant="modern" />
      </section>

      {/* Vision Section */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible" className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants} className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Visión Rocco's 2.0"
                fill
                className="object-cover"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <h2 className="font-sans text-3xl md:text-4xl font-bold text-gray-800 mb-6">Nuestra Visión</h2>
              <p className="text-gray-600 mb-4">
                En Rocco's 2.0 aspiramos a redefinir la experiencia gastronómica en Dolores, combinando la tradición que
                nos caracteriza con un enfoque moderno e innovador.
              </p>
              <p className="text-gray-600 mb-4">
                Queremos ser más que un lugar para comer: buscamos crear un espacio donde la comunidad se reúna, donde
                el café de especialidad y la comida de calidad sean el punto de partida para momentos memorables.
              </p>
              <p className="text-gray-600">
                Nuestro objetivo es convertirnos en un referente gastronómico en la región, manteniendo siempre el
                espíritu familiar y el compromiso con la calidad que ha caracterizado a la marca Rocco's desde sus
                inicios.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2 variants={itemVariants} className="font-sans text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Nuestro Equipo
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 max-w-2xl mx-auto mb-12">
            Conoce a las personas que están dando vida a este nuevo proyecto
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Ana Rocco - Directora Creativa"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-sans text-xl font-bold text-gray-800 mb-1">Ana Rocco</h3>
                <p className="text-gray-500 italic mb-3">Directora Creativa</p>
                <p className="text-gray-600">
                  Nieta del fundador, Ana trae una visión fresca y contemporánea al legado familiar, liderando este
                  nuevo concepto.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Martín Suárez - Barista Jefe"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-sans text-xl font-bold text-gray-800 mb-1">Martín Suárez</h3>
                <p className="text-gray-500 italic mb-3">Barista Jefe</p>
                <p className="text-gray-600">
                  Con certificaciones internacionales, Martín es el responsable de nuestra selección de cafés de
                  especialidad.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm"
            >
              <div className="relative h-64">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Laura Méndez - Chef Ejecutiva"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-sans text-xl font-bold text-gray-800 mb-1">Laura Méndez</h3>
                <p className="text-gray-500 italic mb-3">Chef Ejecutiva</p>
                <p className="text-gray-600">
                  Especialista en cocina de autor, Laura ha diseñado un menú que combina sabores tradicionales con
                  técnicas modernas.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  )
}
