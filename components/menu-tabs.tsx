"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Product } from "@/lib/types"
import ProductCard from "./product-card"

type MenuTabsProps = {
  products: Product[] 
  hideAddButton?: boolean
}

export default function MenuTabs({ products, hideAddButton = false }: MenuTabsProps) {
  // Obtener categorías únicas de los productos
  const categories = Array.from(new Set(products.map(p => p.category)))
  const [activeCategory, setActiveCategory] = useState<string>(categories[0] || "")

  const filteredProducts = products.filter((product) => product.category === activeCategory)

  return (
    <div className="bg-[#FAF4E1] min-h-screen">
      {/* Category Tabs - Scrollable horizontal menu */}
      <div className="sticky top-0 z-20 bg-inherit pt-2 pb-1 px-1">
        <div className="bg-white shadow-sm rounded-full py-1 px-2 flex mx-auto max-w-5xl overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`px-3 py-1 sm:px-4 sm:py-2 mx-1 my-1 whitespace-nowrap rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                activeCategory === category 
                  ? "font-outfit text-white bg-[#A82531] shadow-md" 
                  : "font-outfit text-gray-600 hover:text-[#A82531]"
              }`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Descripción de la categoría */}
      <div className="text-center py-2 sm:py-3 px-3">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-gray-600 font-outfit italic text-sm sm:text-base"
          >
            {products.find(product => product.category === activeCategory)?.description || ''}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Products Grid - Responsive columns */}
      <div className="p-2 sm:p-4 px-2 sm:px-6 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className={`relative ${product.isAvailable === false ? "opacity-50 grayscale" : ""}`}
              >
                <ProductCard 
                  product={product} 
                  variant="classic" 
                  hideAddButton={hideAddButton} 
                />
                {product.isAvailable === false && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <div className="bg-black bg-opacity-50 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-outfit text-xs sm:text-sm">
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
            className="text-center py-8 sm:py-16 px-2 sm:px-4"
          >
            <div className="max-w-sm mx-auto">
              <p className="text-gray-500 font-outfit mb-3 sm:mb-4 text-sm sm:text-base">No hay productos en esta categoría.</p>
              <button 
                onClick={() => setActiveCategory(categories[0] || '')}
                className="font-outfit text-gray-600 hover:text-[#A82531] px-3 py-1 sm:px-4 sm:py-2 rounded-full border border-current text-xs sm:text-sm"
              >
                Ver {categories[0] || 'otros productos'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}