"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "@/lib/types"
import ProductCard from "./product-card"

type ModernMenuTabsProps = {
  products: Product[] 
  hideAddButton?: boolean
}

export default function ModernMenuTabs({ products, hideAddButton = false }: ModernMenuTabsProps) {
  // Obtener categorías únicas de los productos
  const categories = Array.from(new Set(products.map(p => p.category)))
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || "")

  const filteredProducts = products.filter((product) => product.category === activeCategory)

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto">
        {/* Category Tabs */}
        <div className="w-full flex justify-center pt-2 sm:pt-4 pb-2 px-2 sm:px-4">
          <div className="relative w-full max-w-6xl">
            <div className="overflow-x-auto pb-2 -mx-2 sm:mx-0 scrollbar-hide">
              <div className="inline-flex space-x-1 px-1 bg-gray-100 rounded-full py-1.5 min-w-max">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 whitespace-nowrap rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                      activeCategory === category 
                        ? "font-outfit text-white bg-[#E55925] shadow-md" 
                        : "font-outfit text-[#0C2232] hover:text-[#E55925] hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveCategory(category)}
                    whileHover={{ scale: activeCategory === category ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full px-2 sm:px-4 py-4 sm:py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 justify-items-center"
            >
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                  className={product.isAvailable === false ? "opacity-50 grayscale" : ""}
                >
                  <ProductCard 
                    product={product} 
                    variant="modern" 
                    hideAddButton={hideAddButton} 
                  />
                  {product.isAvailable === false && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                      <div className="bg-[#0C2232] bg-opacity-70 text-white px-4 py-2 rounded-lg font-outfit">
                        No disponible
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 sm:py-16 px-4 w-full"
            >
              <div className="max-w-sm mx-auto">
                <p className="text-[#0C2232] font-outfit mb-4 text-sm sm:text-base">No hay productos en esta categoría.</p>
                <button 
                  onClick={() => setActiveCategory(categories[0] || '')}
                  className="font-outfit text-[#0C2232] hover:text-[#E55925] px-4 py-2 text-sm sm:text-base rounded-full border border-current transition-colors hover:border-[#E55925]"
                >
                  Ver {categories[0] || 'otros productos'}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}