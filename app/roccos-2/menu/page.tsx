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
      className="min-h-screen bg-white pt-16 pb-16 md:pb-24"
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-8 md:mb-12 px-4">
          <span className="text-[#E55925] font-medium uppercase tracking-wider text-xs sm:text-sm font-outfit">Nuestra carta</span>
          <h1 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0C2232] mb-3 sm:mb-4">Nuestro Menú</h1>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#E55925] mx-auto mt-4 sm:mt-5 md:mt-6"></div>
          <p className="text-gray-600 max-w-3xl mx-auto font-outfit mt-4 sm:mt-5 md:mt-6 text-base sm:text-lg">
            Conoce nuestra variedad de platos y especialidades.
          </p>
        </div>

        <div className="px-2 sm:px-4">
          <ModernMenuTabs products={roccos2Products} hideAddButton={true} />
        </div>
      </div>
    </motion.div>
  )
}
