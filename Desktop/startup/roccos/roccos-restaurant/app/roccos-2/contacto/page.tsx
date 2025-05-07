"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send, MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react"
import { getRestaurantById } from "@/data/restaurants"

export default function Roccos2Contacto() {
  const restaurant = getRestaurantById("roccos-2")
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    newsletter: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
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
        newsletter: false,
      })
    } catch (err) {
      setError("Hubo un error al enviar el formulario. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-roccos2-heading text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center"
        >
          Contacto
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-roccos2-body text-gray-600 dark:text-gray-300 mb-12 text-center max-w-2xl mx-auto"
        >
          Estamos ansiosos por escucharte. Envíanos tus preguntas, sugerencias o comentarios sobre nuestra próxima
          apertura.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Formulario de contacto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 p-8">
              <h2 className="font-roccos2-heading text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Envíanos un mensaje
              </h2>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-4 rounded-md mb-6"
                >
                  <p className="font-roccos2-body">¡Gracias por tu mensaje! Te responderemos a la brevedad posible.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block font-roccos2-body text-gray-700 dark:text-gray-300 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-roccos2-body text-gray-700 dark:text-gray-300 mb-1">
                      Correo electrónico *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-roccos2-body text-gray-700 dark:text-gray-300 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-roccos2-body text-gray-700 dark:text-gray-300 mb-1">
                      Asunto *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="info">Información general</option>
                      <option value="colaboracion">Propuesta de colaboración</option>
                      <option value="sugerencia">Sugerencia</option>
                      <option value="empleo">Oportunidades de empleo</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-roccos2-body text-gray-700 dark:text-gray-300 mb-1">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-yellow-500 dark:bg-gray-700 dark:text-white"
                    ></textarea>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      name="newsletter"
                      checked={formState.newsletter}
                      onChange={handleChange}
                      className="h-4 w-4 text-yellow-400 focus:ring-yellow-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="newsletter"
                      className="ml-2 block font-roccos2-body text-gray-700 dark:text-gray-300"
                    >
                      Quiero recibir novedades sobre la apertura y promociones
                    </label>
                  </div>

                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-200 p-4 rounded-md">
                      <p className="font-roccos2-body">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-yellow-400 dark:bg-yellow-500 text-gray-800 dark:text-gray-900 font-roccos2-heading font-medium py-3 px-6 rounded-md hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors flex items-center justify-center w-full disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        Enviar mensaje <Send className="ml-2 h-5 w-5" />
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
            <div className="bg-gray-800 dark:bg-gray-800 text-white rounded-lg shadow-md p-8 h-full">
              <h2 className="font-roccos2-heading text-2xl font-bold mb-8">Información de contacto</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 mr-4 flex-shrink-0 mt-1 text-yellow-400" />
                  <div>
                    <h3 className="font-roccos2-heading text-lg font-medium mb-2">Dirección</h3>
                    <p className="font-roccos2-body">{restaurant.address}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-yellow-400 hover:underline font-roccos2-body"
                    >
                      Ver en Google Maps
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="w-6 h-6 mr-4 flex-shrink-0 mt-1 text-yellow-400" />
                  <div>
                    <h3 className="font-roccos2-heading text-lg font-medium mb-2">Contacto</h3>
                    <p className="font-roccos2-body">WhatsApp: {restaurant.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="w-6 h-6 mr-4 flex-shrink-0 mt-1 text-yellow-400" />
                  <div>
                    <h3 className="font-roccos2-heading text-lg font-medium mb-2">Correo electrónico</h3>
                    <p className="font-roccos2-body">info@roccos2.com.ar</p>
                    <p className="font-roccos2-body">hola@roccos2.com.ar</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="w-6 h-6 mr-4 flex-shrink-0 mt-1 text-yellow-400" />
                  <div>
                    <h3 className="font-roccos2-heading text-lg font-medium mb-2">Horarios (Próximamente)</h3>
                    <p className="font-roccos2-body">Lunes a Domingo:</p>
                    <p className="font-roccos2-body">{restaurant.hours}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 mr-4 flex-shrink-0 mt-1 flex justify-center">
                    <Facebook className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-roccos2-heading text-lg font-medium mb-2">Redes sociales</h3>
                    <div className="space-y-2">
                      <a
                        href={restaurant.social.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-white hover:text-yellow-400 transition-colors font-roccos2-body"
                      >
                        <Facebook className="w-5 h-5 mr-2" />
                        <span>Facebook</span>
                      </a>
                      <a
                        href={restaurant.social.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-white hover:text-yellow-400 transition-colors font-roccos2-body"
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
