"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react"
import { getRestaurantById } from "@/data/restaurants"

export default function RoccosContacto() {
  const restaurant = getRestaurantById("roccos")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Simulación de envío de formulario
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    } catch (err) {
      setError("Hubo un error al enviar el formulario. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF4E1]  py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div className="text-center mb-12">
          <span className="text-[#A82531] font-medium uppercase tracking-wider text-sm">Haznos tu consulta</span>
          <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-bold text-[#A82531] mt-2">Contacto y Sugerencias</h1>
          <div className="w-24 h-1 bg-[#E6C163] mx-auto mt-6"></div>
          <p className="text-gray-600 max-w-4xl mx-auto font-outfit mt-6 font-outfit text-lg ">
            Estamos aquí para responder tus preguntas, recibir tus comentarios o ayudarte con reservas. No dudes en
            contactarnos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 ">
          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-[#A82531] rounded-xl shadow-lg p-8 border-2 border-[#E6C163] ">
              <h2 className="font-outfit text-2xl font-bold text-[#FAF4E1] mb-6">
                Envíanos un mensaje
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#A82531] text-[#FAF4E1]  p-4 rounded-md mb-6"
                >
                  <p className="font-outfit">¡Gracias por tu mensaje! Te responderemos a la brevedad posible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-outfit text-[#FAF4E1]  mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border-2 border-[#E6C163]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A82531] "
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-outfit text-[#FAF4E1]  mb-1">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border-2 border-[#E6C163]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A82531] "
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-outfit text-[#FAF4E1]  mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border-2 border-[#E6C163]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A82531] "
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-outfit text-[#FAF4E1]  mb-1">
                      Asunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border-2 border-[#E6C163]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A82531] "
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="reserva">Reserva</option>
                      <option value="consulta">Consulta general</option>
                      <option value="sugerencia">Sugerencia</option>
                      <option value="reclamo">Reclamo</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-outfit text-[#FAF4E1]  mb-1">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-[#FAF4E1] px-4 py-2 border-2 border-[#E6C163]/30 rounded-md focus:outline-none focus:ring-2 focus:ring-[#A82531] "
                    ></textarea>
                  </div>

                  {error && (
                    <div className="bg-red-50 text-red-800 p-4 rounded-md">
                      <p className="font-outfit">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" border-2 border-[#E6C163] text-[#FAF4E1] font-outfit font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center w-full disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar mensaje <Send className="ml-2 h-5 w-5 text-[#E6C163]" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-[#A82531] text-[#FAF4E1] rounded-xl shadow-lg p-8 h-full border-2 border-[#E6C163]">
              <h2 className="font-outfit text-2xl font-bold mb-8">Información de contacto</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 flex-shrink-0 mt-1 text-[#E6C163]" />
                  <div>
                    <h3 className="font-outfit text-lg font-bold mb-2">Dirección</h3>
                    <p className="font-outfit">{restaurant.address}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-[#E6C163] hover:underline font-outfit"
                    >
                      Ver en Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 flex-shrink-0 mt-1 text-[#E6C163]" />
                  <div>
                    <h3 className="font-outfit text-lg font-bold mb-2">Teléfonos</h3>
                    <p className="font-outfit">Fijo: {restaurant.phone}</p>
                    <p className="font-outfit">WhatsApp: {restaurant.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 mr-4 flex-shrink-0 mt-1 text-[#E6C163]" />
                  <div>
                    <h3 className="font-outfit text-lg font-bold mb-2">Correo electrónico</h3>
                    <p className="font-outfit">info@roccos.com.ar</p>
                    <p className="font-outfit">reservas@roccos.com.ar</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 mr-4 flex-shrink-0 mt-1 text-[#E6C163]" />
                  <div>
                    <h3 className="font-outfit text-lg font-bold mb-2">Horarios</h3>
                    <p className="font-outfit">Lunes a Domingo:</p>
                    <p className="font-outfit">{restaurant.hours}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 mr-4 flex-shrink-0 mt-1 flex justify-center">
                    <Facebook className="w-5 h-5 text-[#E6C163]" />
                  </div>
                  <div>
                    <h3 className="font-outfit text-lg font-bold mb-2">Redes sociales</h3>
                    <div className="space-y-2">
                      <a
                        href={restaurant.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#FAF4E1] hover:text-[#E6C163] transition-colors font-outfit"
                      >
                        <Facebook className="w-5 h-5 mr-2" />
                        <span>Facebook</span>
                      </a>
                      <a
                        href={restaurant.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-[#FAF4E1] hover:text-[#E6C163] transition-colors font-outfit"
                      >
                        <Instagram className="w-5 h-5 mr-2" />
                        <span>Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
