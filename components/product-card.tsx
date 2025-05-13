"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Sparkles, Tag } from "lucide-react"
import type { Product } from "@/lib/types"
import { useCart } from "@/hooks/use-cart"

type ProductCardProps = {
  product: Product
  variant: "classic" | "modern"
  hideAddButton?: boolean
}

const roccosStyles = {
  classic: {
    container: "bg-transperent rounded-xl p-2 sm:p-4 md:p-6 text-center transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2", 
    title: "font-outfit text-lg sm:text-xl text-[#A82531]", 
    description: "text-gray-600 font-outfit",
    price: "font-outfit text-lg sm:text-xl font-bold text-[#A82531]",
    originalPrice: "font-outfit text-gray-500 line-through text-xs sm:text-sm",
    discount: "bg-[#A82531] text-white text-xs font-outfit px-1 py-0.5 sm:px-2 sm:py-1 rounded-full",
    promoTag: "bg-yellow-400 text-[#A82531] font-outfit font-bold",
    button: "border border-[#A82531] text-[#A82531] font-outfit text-xs sm:text-sm rounded-full px-3 py-1 sm:px-4 sm:py-1 hover:bg-[#A82531] hover:text-[#FAF4E1] transition-all",
  },
  modern: {
    container: "bg-transperent rounded-xl p-2 sm:p-4 md:p-6 text-center transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2",
    title: "font-manrope text-lg sm:text-xl font-bold text-gray-800",
    description: "text-gray-500 font-manrope",
    price: "font-manrope text-lg sm:text-xl font-bold text-gray-800",
    originalPrice: "font-manrope text-gray-400 line-through text-xs sm:text-sm",
    discount: "bg-yellow-400 text-gray-800 text-xs font-manrope px-1 py-0.5 sm:px-2 sm:py-1 rounded-full",
    promoTag: "bg-yellow-400 text-gray-800 font-manrope font-bold",
    button: "border border-[#A82531] text-[#A82531] font-manrope text-xs sm:text-sm rounded-full px-3 py-1 sm:px-4 sm:py-1 hover:bg-[#A82531] hover:text-[#FAF4E1] transition-all",
  },
}

const roccos2Styles = {
  classic: {
    container: "bg-transperent rounded-xl p-2 sm:p-4 md:p-6 text-center transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2", 
    title: "font-outfit text-lg sm:text-xl text-[#E55925]", 
    description: "text-gray-600 font-outfit",
    price: "font-outfit text-lg sm:text-xl font-bold text-[#E55925]",
    originalPrice: "font-outfit text-gray-500 line-through text-xs sm:text-sm",
    discount: "bg-[#E55925] text-white text-xs font-outfit px-1 py-0.5 sm:px-2 sm:py-1 rounded-full",
    promoTag: "bg-yellow-400 text-[#E55925] font-outfit font-bold",
    button: "border border-[#E55925] text-[#E55925] font-outfit text-xs sm:text-sm rounded-full px-3 py-1 sm:px-4 sm:py-1 hover:bg-[#E55925] hover:text-white transition-all",
  },
  modern: {
    container: "bg-transperent rounded-xl p-2 sm:p-4 md:p-6 text-center transition-all duration-300 hover:-translate-y-1 sm:hover:-translate-y-2",
    title: "font-manrope text-lg sm:text-xl font-bold text-gray-800",
    description: "text-gray-500 font-manrope",
    price: "font-manrope text-lg sm:text-xl font-bold text-gray-800",
    originalPrice: "font-manrope text-gray-400 line-through text-xs sm:text-sm",
    discount: "bg-yellow-400 text-gray-800 text-xs font-manrope px-1 py-0.5 sm:px-2 sm:py-1 rounded-full",
    promoTag: "bg-yellow-400 text-gray-800 font-manrope font-bold",
    button: "border border-[#E55925] text-[#E55925] font-manrope text-xs sm:text-sm rounded-full px-3 py-1 sm:px-4 sm:py-1 hover:bg-[#E55925] hover:text-white transition-all",
  },
}

export default function ProductCard({ product, variant, hideAddButton = false }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  
  const isPromo = product.isPromo === true

  const getStyles = () => {
    const branchStyles = product.sucursal === "roccos-2" ? roccos2Styles : roccosStyles
    return variant === "classic" ? branchStyles.classic : branchStyles.modern
  }

  const styles = getStyles()
  
  // Calcular descuento en porcentaje si hay precio original
  const getDiscountPercentage = () => {
    if (!product.originalPrice) return null
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    return discount
  }
  
  const discountPercentage = getDiscountPercentage()

  return (
    <motion.div
      className={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Etiqueta de promo */}
      {isPromo && (
        <div className="absolute top-1 sm:top-2 right-1 sm:right-2 z-10">
          <div className={`${styles.promoTag} rounded-full px-2 py-0.5 sm:px-3 sm:py-1 flex items-center text-xs`}>
            <Sparkles className="w-3 h-3 mr-1" />
            PROMO
          </div>
        </div>
      )}
      
      {/* Badge de descuento */}
      {discountPercentage && (
        <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10">
          <div className={`${styles.discount} shadow-md flex items-center`}>
            <Tag className="w-2 h-2 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" />
            {discountPercentage}% OFF
          </div>
        </div>
      )}
      
      {/* Imagen del producto - Responsive sizing */}
      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto mb-2 sm:mb-4">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain rounded-full"
        />
      </div>

      {/* Nombre del producto */}
      <h3 className={`${styles.title} text-base sm:text-lg md:text-xl font-extrabold font-outfit mb-0.5 sm:mb-1 line-clamp-2`}>
        {product.name}
      </h3>

      {/* Descripción - Hide on very small screens, limit to 2 lines on mobile */}
      <p className={`${styles.description} text-xs sm:text-sm italic font-outfit mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3`}>
        {product.description}
      </p>

      {/* Precio y botón */}
      <div className="flex flex-col items-center gap-1 sm:gap-2">
        <div className="flex items-center gap-1 sm:gap-2 justify-center">
          <span className={styles.price}>
            ${product.price.toLocaleString()}
          </span>
          
          {product.originalPrice && (
            <span className={styles.originalPrice}>
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
        
        {product.promoDetails && (
          <p className="text-xs text-green-600 font-outfit hidden sm:block">{product.promoDetails}</p>
        )}
        
        {!hideAddButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className={styles.button}
          >
            Añadir
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}