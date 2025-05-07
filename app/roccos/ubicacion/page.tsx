"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Clock, MapPin, Phone, Facebook, Instagram, Globe, ExternalLink } from "lucide-react"
import { getRestaurantById } from "@/data/restaurants"
import { isBusinessOpen, getBusinessHours } from "@/utils/businessHours"

export default function RoccosUbicacion() {
  const [loaded, setLoaded] = useState(false)
  const [openStatus, setOpenStatus] = useState({ isOpen: false, nextOpeningInfo: '' })
  const restaurant = getRestaurantById("roccos")
  const businessHours = getBusinessHours()

  useEffect(() => {
    setLoaded(true)
    // Actualizar el estado inicial
    setOpenStatus(isBusinessOpen())

    // Actualizar cada minuto
    const interval = setInterval(() => {
      setOpenStatus(isBusinessOpen())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const formatDayHours = (hours: any[]) => {
    if (!hours || hours.length === 0) return "Cerrado";
    return hours.map(range => 
      `${range.start}hs - ${range.end}hs`
    ).join(", ");
  };

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
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <span className="text-[#A82531] font-medium uppercase tracking-wider text-sm">Nuestra Ubicación</span>
            <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-bold text-[#A82531] mt-2">Encuéntranos</h1>
            <div className="w-24 h-1 bg-[#E6C163] mx-auto mt-6"></div>
            <p className="text-gray-600 max-w-4xl mx-auto font-outfit mt-6 font-outfit text-lg ">
              En el corazón de Dolores, donde la tradición se encuentra con la innovación culinaria.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-[#A82531]/10">
                <h2 className="font-outfit text-3xl font-extrabold text-[#A82531] mb-6">Información de Contacto</h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 mr-3 text-[#A82531] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-outfit text-xl font-bold mb-1 text-[#A82531]">Dirección</h3>
                      <p className="text-[#111111]/80 font-outfit">{restaurant.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 mr-3 text-[#A82531] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-outfit text-xl font-bold mb-1 text-[#A82531]">Teléfonos</h3>
                      <p className="text-[#111111]/80 font-outfit">Fijo: {restaurant.phone}</p>
                      <p className="text-[#111111]/80 font-outfit">WhatsApp: {restaurant.whatsapp}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="w-6 h-6 mr-3 text-[#A82531] flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-outfit text-xl font-bold mb-1 text-[#A82531]">Horarios</h3>
                      <div className="text-[#111111]/80">
                        <table className="min-w-full">
                          <tbody>
                            {Object.entries(businessHours).map(([day, schedule]) => (
                              <tr key={day} className="border-b border-[#A82531]/10">
                                <td className="py-2 pr-4 font-medium font-outfit">
                                  {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'][parseInt(day)]}:
                                </td>
                                <td className="py-2 font-outfit">
                                  {formatDayHours(schedule.hours)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <p className={`font-medium font-outfit mt-4 ${openStatus.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                          {openStatus.isOpen ? "Abierto actualmente" : "Cerrado"} - {openStatus.nextOpeningInfo}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-6 h-6 mr-3 flex-shrink-0 mt-1 flex justify-center">
                      <Globe className="w-5 h-5 text-[#A82531]" />
                    </div>
                    <div>
                      <h3 className="font-outfit text-xl font-bold mb-4 text-[#A82531]">Redes Sociales</h3>
                      <div className="flex space-x-4">
                        <a
                          href={restaurant.social.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-[#1877F2] font-outfit hover:text-[#1877F2]/80 transition-colors"
                        >
                          <Facebook className="w-5 h-5 mr-1" />
                          <span>Facebook</span>
                        </a>
                        <a
                          href={restaurant.social.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center font-outfit text-[#E4405F] hover:text-[#E4405F]/80 transition-colors"
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

          <motion.div variants={itemVariants} className="mt-12 bg-white rounded-2xl shadow-xl p-8 border-2 border-[#A82531]/10">
            <h2 className="font-outfit text-2xl font-bold text-[#A82531] mb-6">Cómo llegar</h2>
            <p className="text-[#111111]/80 mb-4 font-outfit">
              Estamos ubicados en una zona céntrica de Dolores, a pocas cuadras de la plaza principal. Puedes llegar
              fácilmente en auto o caminando desde cualquier punto de la ciudad.
            </p>
            <p className="text-[#111111]/80 mb-4 font-outfit">
              Si vienes desde fuera de Dolores, toma la Ruta 2 y sigue las indicaciones hacia el centro de la ciudad.
              Contamos con estacionamiento en la zona.
            </p>
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurant.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-[#A82531] hover:text-[#E6C163]/80 transition-colors font-outfit font-semibold"
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
