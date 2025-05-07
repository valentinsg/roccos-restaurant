"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Timeline from "@/components/timeline"
import { roccosTimelineEvents } from "@/data/timeline"
import { Users, Award, Clock, Heart } from "lucide-react"

export default function RoccosNosotros() {
  const [loaded, setLoaded] = useState(false)

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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen bg-[#FAF4E1]">

      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center">
            <span className="text-[#A82531] font-medium uppercase tracking-wider text-sm">Familia</span>
            <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-bold text-[#A82531] mt-2">Nuestra Historia</h1>
            <div className="w-24 h-1 bg-[#E6C163] mx-auto mt-6"></div>
            <p className="text-gray-600 max-w-4xl mx-auto font-outfit mt-6 font-outfit text-lg ">
              Más de 15 años de tradición y pasión por la gastronomía
            </p>
          </motion.div>
        </div>
      </div>

      {/* Intro Section */}
      <motion.section variants={containerVariants} initial="hidden" animate="visible" className="flex justify-center text-center items-center px-4 py-8">
        <div className="max-w-7xl">
          <div className="gap-16 items-center">
            <motion.div variants={itemVariants}>
              <p className="font-outfit text-gray-700 my-8 text-2xl leading-relaxed">
                Desde hace más de 15 años, Rocco's Pizza and Restaurante es el lugar elegido en Dolores para disfrutar la mejor comida para la familia.
                Nuestras pizzas artesanales, pastas caseras y parrilla se elaboran siempre con ingredientes frescos y de calidad.
                Todo comenzó en una cocina familiar, con harina en las manos y amor en las recetas.
              </p>

              <motion.div variants={itemVariants} className="relative h-[500px] my-6 rounded-2xl overflow-hidden border-4 border-[#E6C163]">
                <Image src="/images/roccos-caja.webp" alt="Familia Rocco" fill className="object-cover" />
              </motion.div>

              <p className="font-outfit text-gray-700 my-8 text-2xl leading-relaxed">
                En 2010, David Guevara abrió las puertas de Rocco's como una pequeña pizzería de barrio.
                Lo que empezó como un sueño casero, hoy es un referente gastronómico en Dolores, reconocido por su sabor auténtico y calidad.
                Nuestra cocina honra las raíces italo-argentinas de nuestra familia: nuestros platos llevan historia, tradición y amor.
                Nos mueve la pasión por compartir ese sabor que se transmite de generación en generación.
              </p>

              <motion.div variants={itemVariants} className="relative h-[500px] my-6 rounded-2xl overflow-hidden border-4 border-[#E6C163]">
                <Image src="/images/salon-desde-caja.webp" alt="Familia Rocco" fill className="object-cover" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-[#A82531]">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl text-[#FAF4E1] mb-6 font-outfit font-bold"
          >
            Trayectoria
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-[#E6C163] max-w-2xl mx-auto font-outfit"
          >
            Un recorrido por los momentos más importantes de nuestra historia
          </motion.p>
        </div>
        <div className="max-w-6xl bg-[#A82531] mx-auto">
          <Timeline events={roccosTimelineEvents} variant="classic" />
        </div>
      </section>

      {/* Valores Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="py-24 bg-[#FAF4E1] text-[#A82531] font-outfit"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl md:text-6xl mb-20 font-bold text-[#A82531]"
          >
            Nuestros Valores
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                transition: { duration: 0.3 } 
              }}
              className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-[#E6C163]/30 hover:border-[#E6C163] transition-all duration-300"
            >
              <div className="w-24 h-24 bg-[#E6C163]/10 text-[#A82531] rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-extrabold mb-6 text-[#A82531]">Familia</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Creemos en el valor de la familia y las tradiciones, tanto en nuestra cocina como en nuestro servicio.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                transition: { duration: 0.3 } 
              }}
              className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-[#E6C163]/30 hover:border-[#E6C163] transition-all duration-300"
            >
              <div className="w-24 h-24 bg-[#E6C163]/10 text-[#A82531] rounded-full flex items-center justify-center mx-auto mb-8">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-extrabold mb-6 text-[#A82531]">Calidad</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Seleccionamos los mejores ingredientes y mantenemos los más altos estándares en cada plato que servimos.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                transition: { duration: 0.3 } 
              }}
              className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-[#E6C163]/30 hover:border-[#E6C163] transition-all duration-300"
            >
              <div className="w-24 h-24 bg-[#E6C163]/10 text-[#A82531] rounded-full flex items-center justify-center mx-auto mb-8">
                <Clock className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-extrabold mb-6 text-[#A82531]">Tradición</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Honramos las recetas tradicionales que han pasado de generación en generación en nuestra familia.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ 
                y: -15, 
                scale: 1.02,
                transition: { duration: 0.3 } 
              }}
              className="bg-white rounded-2xl p-6 shadow-2xl border-2 border-[#E6C163]/30 hover:border-[#E6C163] transition-all duration-300"
            >
              <div className="w-24 h-24 bg-[#E6C163]/10 text-[#A82531] rounded-full flex items-center justify-center mx-auto mb-8">
                <Heart className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-extrabold mb-6 text-[#A82531]">Pasión</h3>
              <p className="text-lg leading-relaxed text-gray-700">
                Ponemos amor y dedicación en cada detalle, desde la preparación de nuestros platos hasta el servicio.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

    </motion.div>
  )
}
