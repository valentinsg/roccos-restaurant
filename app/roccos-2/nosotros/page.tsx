"use client"

import { motion } from "framer-motion"

export default function Roccos2Nosotros() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8"
      >
        <h1 className="font-manrope text-4xl md:text-6xl font-extrabold text-[#0C2232] mb-4">
          Estamos construyendo una historia...
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto font-manrope">
          Pronto te contaremos más sobre nuestro nuevo concepto gastronómico en Dolores.
        </p>
      </motion.div>
    </div>
  )
}