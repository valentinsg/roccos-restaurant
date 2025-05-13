"use client"

import { motion } from "framer-motion"
import MenuTabs from "@/components/menu-tabs"
import WhatsAppForm from "@/components/whatsapp-form"
import { useProducts } from "@/lib/context/ProductContext"

export default function RoccosPedido() {
  const { products, loading: productsLoading, error: productsError } = useProducts()

  // Filtrar productos por sucursal
  const roccosProducts = products.filter((p) => p.sucursal === "roccos")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
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
          <motion.div variants={itemVariants} className="text-center mb-8">
            <span className="text-[#A82531] font-medium uppercase tracking-wider text-sm">Nuestra carta</span>

            <h1 className="font-outfit text-6xl font-extrabold text-[#A82531] mb-4">Hacer un Pedido</h1>
            <div className="w-24 h-1 bg-[#E6C163] mx-auto mt-6"></div>

            <p className="text-gray-600 max-w-4xl mx-auto font-outfit mt-6 font-outfit text-lg">
              Selecciona los productos que deseas y completa el formulario para enviarnos tu pedido por WhatsApp.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <MenuTabs products={roccosProducts} />
            </div>
            <div className="lg:col-span-1 lg:sticky lg:top-24 self-start">
              <WhatsAppForm variant="classic" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
