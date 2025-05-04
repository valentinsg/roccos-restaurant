"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import Image from "next/image"

type FAQItem = {
  question: string
  answer: string
}

export default function RoccosFAQ() {
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
      question: "¿Tienen menú para niños?",
      answer:
        "Sí, contamos con un menú especial para los más pequeños, también opciones como milanesa con puré o papas fritas, hamburguesas, etc. Todas las opciones incluyen una bebida y postre.",
    },
    {
      question: "¿Qué medidas de seguridad e higiene implementan?",
      answer:
        "Seguimos estrictos protocolos de higiene y seguridad alimentaria. Realizamos limpieza y desinfección constante de todas las áreas, y nuestras cocinas cumplen con todas las normativas sanitarias vigentes.",
    },
  ]

  return (
    <motion.div initial="hidden" animate="visible" className="min-h-screen bg-[#FAF4E1]">

      <div className="max-w-5xl mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center mb-16"
        >
          <span className="text-[#A82531] font-medium uppercase tracking-wider text-sm">FAQ</span>
          <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl font-bold text-[#A82531] mt-2">
            Preguntas Frecuentes
          </h1>
          <div className="w-24 h-1 bg-[#E6C163] mx-auto mt-6"></div>
          <p className="text-gray-600 max-w-4xl mx-auto font-outfit mt-6 font-outfit text-lg ">
            Encuentra respuestas a las preguntas más comunes sobre Rocco's Pizza and Restaurante
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[#E6C163]/30 hover:shadow-xl transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none hover:bg-[#FAF4E1]/30 transition-colors"
              >
                <span className="font-outfit text-xl font-bold text-[#A82531]">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-6 w-6 text-[#A82531]" />
                ) : (
                  <ChevronDown className="h-6 w-6 text-[#A82531]" />
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
                    <div className="px-8 py-6 border-t-2 border-[#E6C163]/30">
                      <p className="font-outfit text-lg text-[#111111]/90 leading-relaxed">{item.answer}</p>
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
          className="mt-16 text-center"
        >
          <p className="font-outfit text-xl text-[#111111]/90 mb-6">
            ¿No encontraste la respuesta que buscabas?
          </p>
          <a
            href="/roccos/contacto"
            className="inline-block bg-[#A82531] text-[#FAF4E1] font-outfit font-semibold text-lg py-4 px-10 rounded-lg hover:bg-[#7B2D26] transition-colors shadow-lg hover:shadow-xl"
          >
            Contáctanos
          </a>
        </motion.div>
      </div>
    </motion.div>
  )
}
