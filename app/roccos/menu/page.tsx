"use client"

import { motion } from "framer-motion"
import MenuTabs from "@/components/menu-tabs"
import { useProducts } from "@/lib/context/ProductContext"

export default function RoccosMenu() {
  const { products, loading: productsLoading, error: productsError } = useProducts()

  const roccosProducts = products.filter((p) => p.sucursal === "roccos")

  if (productsLoading) {
    return <p className="text-center py-10 font-outfit">Cargando menú...</p>
  }

  if (productsError) {
    return <p className="text-center text-red-500 py-10 font-outfit">Error cargando datos</p>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FAF4E1]"
    >
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <span className="text-[#A82531] font-medium uppercase tracking-wider text-sm font-outfit">Nuestra carta</span>
            <h1 className="font-outfit text-5xl font-extrabold text-[#A82531] mb-4">Nuestro Menú</h1>
            <div className="w-24 h-1 bg-[#E6C163] mx-auto mt-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto font-outfit mt-6 text-lg">
              Conoce nuestra variedad de platos y especialidades.
            </p>
          </div>

          <MenuTabs products={roccosProducts} hideAddButton={true} />
        </div>
      </div>
    </motion.div>
  )
}
