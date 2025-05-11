"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

type FAQItem = {
  question: string
  answer: string
}

export default function Roccos2FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const faqItems: FAQItem[] = [
    {
      question: "¿Cuáles son los horarios de atención?",
      answer:
        "Nuestro horario de atención es de 10:00 a 15:00 y de 19:00 a 01:00, de miércoles a lunes. Los martes permanecemos cerrados. Los feriados mantenemos el mismo horario, pero te recomendamos reservar con anticipación.",
    },
    {
      question: "¿Hacen delivery?",
      answer:
        "Sí, contamos con servicio de delivery propio en toda la ciudad de Dolores. Puedes hacer tu pedido por WhatsApp al 2245401066 o a través de nuestra página web en la sección 'Pedido'.",
    },
    {
      question: "¿Se puede reservar mesa?",
      answer:
        "Sí, aceptamos reservas para grupos de cualquier tamaño. Te recomendamos hacer tu reserva con al menos 24 horas de anticipación, especialmente para fines de semana y feriados. Puedes reservar llamando al 2245441330 o a través de nuestra sección de contacto.",
    },
    {
      question: "¿Tienen opciones vegetarianas?",
      answer:
        "Sí, contamos con varias opciones vegetarianas en nuestro menú, incluyendo pizzas, pastas y ensaladas. Todas están claramente identificadas en nuestra carta. Si tienes alguna restricción alimentaria específica, no dudes en consultarnos.",
    },
    {
      question: "¿Aceptan tarjetas de crédito y débito?",
      answer:
        "Sí, aceptamos todas las tarjetas de crédito y débito, incluyendo Visa, Mastercard, American Express y Cabal. También aceptamos pagos en efectivo y transferencias bancarias.",
    },
    {
      question: "¿Tienen estacionamiento?",
      answer:
        "No contamos con estacionamiento propio, pero hay amplio espacio para estacionar en la calle frente al local y en las calles aledañas. Los fines de semana recomendamos llegar con tiempo para encontrar lugar.",
    },
    {
      question: "¿Qué medidas de seguridad e higiene implementan?",
      answer:
        "Seguimos estrictamente los protocolos de seguridad e higiene establecidos por la autoridad sanitaria. Nuestros empleados están capacitados para manejar y preparar los alimentos de manera segura y higiénica.",
    },
  ]

    return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-manrope font-bold text-4xl text-[#0C2232] mb-6 text-center"
        >
          Preguntas Frecuentes
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-manrope text-lg text-[#0C2232] mb-12 text-center"
        >
          Todo lo que necesitas saber sobre Rocco's 2.0 antes de nuestra apertura
        </motion.p>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm border border-[#0C2232] overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none text-[#0C2232]"
              >
                <span className="font-manrope font-medium text-lg">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-[#0C2232]" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-[#0C2232]" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 border-t border-[#0C2232]">
                      <p className="font-manrope text-lg text-[#0C2232]">{item.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="font-manrope text-lg text-[#0C2232] mb-4">
            ¿Tienes más preguntas sobre nuestra próxima apertura?
          </p>
          <a
            href="/roccos-2/contacto"
            className="inline-block bg-[#0C2232] text-white font-manrope font-medium py-3 px-8 rounded-md hover:bg-[#0C2232] transition-colors"
          >
            Contáctanos
          </a>
        </motion.div>
      </div>
    </div>
  )
}