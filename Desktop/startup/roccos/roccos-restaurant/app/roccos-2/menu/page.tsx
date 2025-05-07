"use client"
import { motion } from "framer-motion"
import ModernMenuTabs from "@/components/modern-menu-tabs"
import { useProducts } from "@/lib/context/ProductContext"

export default function Roccos2Menu() {
  const { products, loading: productsLoading, error: productsError } = useProducts()

  const roccos2Products = products.filter((p) => p.sucursal === "roccos-2")

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
      className="min-h-screen bg-[#FAF4E1] pt-16 pb-24"
    >
      <div className="mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-[#A82531] font-medium uppercase tracking-wider text-sm font-outfit">Nuestra carta</span>
          <h1 className="font-outfit text-5xl font-extrabold text-[#A82531] mb-4">Nuestro Menú</h1>
          <div className="w-24 h-1 bg-[#E6C163] mx-auto mt-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto font-outfit mt-6 text-lg">
            Conoce nuestra variedad de platos y especialidades.
          </p>
        </div>

        <ModernMenuTabs products={roccos2Products} hideAddButton={true} />
      </div>
    </motion.div>
  )
}
