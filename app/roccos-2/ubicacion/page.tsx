"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, MapPin, Phone, Facebook, Instagram, ExternalLink } from "lucide-react"
import { getRestaurantById } from "@/data/restaurants"

export default function Roccos2Ubicacion() {
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
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="min-h-screen bg-white">
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="font-outfit text-4xl font-bold text-[#0C2232] mb-4">Ubicación</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Visítanos pronto en nuestra nueva ubicación en el centro de Dolores.
            </p>
            <div className="inline-block bg-[#E55925] text-white px-4 py-1 rounded-full text-sm font-medium mt-4">
              Próximamente abierto
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div variants={itemVariants} className="order-2 md:order-1">
              <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
                <h2 className="font-outfit text-2xl font-bold text-[#0C2232] mb-6">Información de Contacto</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 mr-3 text-[#E55925] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-outfit text-lg font-medium mb-1">Dirección</h3>
                      <p className="text-gray-600">{restaurant.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 mr-3 text-[#E55925] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-outfit text-lg font-medium mb-1">Contacto</h3>
                      <p className="text-gray-600">WhatsApp: {restaurant.whatsapp}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 mr-3 text-[#E55925] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-outfit text-lg font-medium mb-1">Horarios (Próximamente)</h3>
                      <div className="text-gray-600">
                        <table className="min-w-full">
                          <tbody>
                            <tr className="border-b border-gray-100">
                              <td className="py-2 pr-4 font-medium">Lunes a Domingo:</td>
                              <td className="py-2">{restaurant.hours}</td>
                            </tr>
                          </tbody>
                        </table>
                        <p className="text-[#E55925] font-medium mt-2">
                          {restaurant.isOpen ? "Actualmente abierto" : "En preparación para apertura"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 mr-3 flex-shrink-0 mt-1 flex justify-center">
                      <Facebook className="w-5 h-5 text-[#E55925]" />
                    </div>
                    <div>
                      <h3 className="font-outfit text-lg font-medium mb-1">Redes Sociales</h3>
                      <div className="flex space-x-4">
                        <a
                          href={restaurant.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-[#0C2232] transition-colors"
                        >
                          <Facebook className="w-5 h-5 mr-1" />
                          <span>Facebook</span>
                        </a>
                        <a
                          href={restaurant.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-gray-600 hover:text-[#0C2232] transition-colors"
                        >
                          <Instagram className="w-5 h-5 mr-1" />
                          <span>Instagram</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="h-96 rounded-xl overflow-hidden shadow-md order-1 md:order-2"
            >
              <div className="relative w-full h-full">
                <iframe
                  src={restaurant.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación de Rocco's 2.0"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 bg-white rounded-xl shadow-sm p-8 border border-gray-100"
          >
            <h2 className="font-outfit text-2xl font-bold text-[#0C2232] mb-6">Cómo llegar</h2>
            <p className="text-gray-600 mb-4">
              Nuestra nueva ubicación está estratégicamente situada en el centro de Dolores, en una zona de fácil acceso
              y con mucho movimiento.
            </p>
            <p className="text-gray-600 mb-4">
              Estamos a pocas cuadras de la plaza principal, en una zona con amplio estacionamiento disponible.
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#E55925] hover:underline font-medium"
            >
              <ExternalLink className="w-4 h-4 mr-1" />
              Obtener indicaciones en Google Maps
            </a>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
