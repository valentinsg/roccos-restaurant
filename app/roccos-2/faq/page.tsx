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
      question: "¿Cuándo abrirá Rocco's 2.0?",
      answer:
        "Estamos trabajando arduamente para abrir nuestras puertas muy pronto. Aunque no tenemos una fecha exacta, estimamos que será en los próximos meses. Te invitamos a seguirnos en nuestras redes sociales para estar al tanto de todas las novedades y la fecha oficial de apertura.",
    },
    {
      question: "¿Qué tipo de café servirán?",
      answer:
        "En Rocco's 2.0 serviremos café de especialidad de diferentes orígenes, tostado por expertos. Contaremos con métodos de preparación variados como espresso, filtrado, cold brew y más. Nuestro equipo de baristas está altamente capacitado para ofrecerte la mejor experiencia de café.",
    },
    {
      question: "¿Cuáles serán los horarios de atención?",
      answer:
        "Nuestro horario de atención será de 08:00 a 14:00 y de 17:00 a 23:30, de lunes a domingo. Esto nos permitirá atenderte tanto para desayunos como para meriendas y cenas.",
    },
    {
      question: "¿Tendrán opciones vegetarianas y veganas?",
      answer:
        "Sí, nuestro menú incluirá una amplia variedad de opciones vegetarianas y veganas. Creemos en la inclusión y queremos que todos puedan disfrutar de nuestra propuesta gastronómica, independientemente de sus preferencias alimentarias.",
    },
    {
      question: "¿Dónde estará ubicado Rocco's 2.0?",
      answer:
        "Estaremos ubicados en Rico 39, en el centro de Dolores, Buenos Aires. Es una ubicación estratégica de fácil acceso y con mucho movimiento.",
    },
    {
      question: "¿Tendrán servicio de delivery?",
      answer:
        "Sí, contaremos con servicio de delivery propio para toda la ciudad de Dolores. Podrás hacer tu pedido a través de WhatsApp o nuestra página web, y te lo llevaremos a donde estés.",
    },
    {
      question: "¿Se podrá trabajar o estudiar en el local?",
      answer:
        "¡Absolutamente! Hemos diseñado espacios específicos con enchufes y WiFi de alta velocidad para quienes quieran trabajar o estudiar mientras disfrutan de un buen café. Nuestro ambiente será tranquilo y acogedor, perfecto para la concentración.",
    },
    {
      question: "¿Qué métodos de pago aceptarán?",
      answer:
        "Aceptaremos todos los métodos de pago: efectivo, tarjetas de crédito y débito, transferencias bancarias y billeteras virtuales como Mercado Pago.",
    },
    {
      question: "¿Tendrán eventos o noches temáticas?",
      answer:
        "Sí, planeamos organizar eventos como catas de café, noches de música en vivo, talleres de barismo y más. Queremos que Rocco's 2.0 sea un espacio cultural además de gastronómico.",
    },
    {
      question: "¿Cómo puedo estar al tanto de las novedades?",
      answer:
        "La mejor manera de mantenerte informado es siguiéndonos en nuestras redes sociales: Instagram y Facebook como @Roccos2.0. También puedes suscribirte a nuestro newsletter en la página de contacto.",
    },
  ]

  return (
    <div className="min-h-screen bg-white  py-16">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-roccos2-heading text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center"
        >
          Preguntas Frecuentes
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-roccos2-body text-gray-600 dark:text-gray-300 mb-12 text-center"
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
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
              >
                <span className="font-roccos2-heading font-medium text-lg text-gray-800 dark:text-white">
                  {item.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-yellow-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-yellow-500" />
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
                    <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                      <p className="font-roccos2-body text-gray-600 dark:text-gray-300">{item.answer}</p>
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
          <p className="font-roccos2-body text-gray-600 dark:text-gray-300 mb-4">
            ¿Tienes más preguntas sobre nuestra próxima apertura?
          </p>
          <a
            href="/roccos-2/contacto"
            className="inline-block bg-yellow-400 dark:bg-yellow-500 text-gray-800 dark:text-gray-900 font-roccos2-heading font-medium py-3 px-8 rounded-md hover:bg-yellow-500 dark:hover:bg-yellow-600 transition-colors"
          >
            Contáctanos
          </a>
        </motion.div>
      </div>
    </div>
  )
}
