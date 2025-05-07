"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Plus, Sparkles, Tag } from "lucide-react"
import type { Product } from "@/lib/types"
import { useCart } from "@/hooks/use-cart"

type ProductCardProps = {
  product: Product
  variant: "classic" | "modern"
  hideAddButton?: boolean
}

export default function ProductCard({ product, variant, hideAddButton = false }: ProductCardProps) {
  const { addToCart } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  
  const isPromo = product.isPromo === true

  const cardStyles = {
    classic: {
      container: "bg-transperent rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-2", 
      title: "font-outfit text-xl text-[#A82531]", 
      description: "text-gray-600 font-outfit",
      price: "font-outfit text-xl font-bold text-[#A82531]",
      originalPrice: "font-outfit text-gray-500 line-through text-sm",
      discount: "bg-[#A82531] text-white text-xs font-outfit px-2 py-1 rounded-full",
      promoTag: "bg-yellow-400 text-[#A82531] font-outfit font-bold",
      button: "border border-[#A82531] text-[#A82531] font-outfit text-sm rounded-full px-4 py-1 hover:bg-[#A82531] hover:text-[#FAF4E1] transition-all",
    },
    modern: {
      container: "bg-transperent rounded-xl p-6 text-center transition-all duration-300 hover:-translate-y-2",
      title: "font-outfit text-xl font-bold text-gray-800",
      description: "text-gray-500 font-outfit",
      price: "font-outfit text-xl font-bold text-gray-800",
      originalPrice: "font-outfit text-gray-400 line-through text-sm",
      discount: "bg-yellow-400 text-gray-800 text-xs font-outfit px-2 py-1 rounded-full",
      promoTag: "bg-yellow-400 text-gray-800 font-outfit font-bold",
      button: "border border-[#A82531] text-[#A82531] font-outfit text-sm rounded-full px-4 py-1 hover:bg-[#A82531] hover:text-[#FAF4E1] transition-all",
    },
  }

  const styles = variant === "classic" ? cardStyles.classic : cardStyles.modern
  
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
        <div className="absolute top-2 right-2 z-10">
          <div className={`${styles.promoTag} rounded-full px-3 py-1 flex items-center text-xs`}>
            <Sparkles className="w-3 h-3 mr-1" />
            PROMO
          </div>
        </div>
      )}
      
      {/* Badge de descuento */}
      {discountPercentage && (
        <div className="absolute top-4 left-4 z-10">
          <div className={`${styles.discount} shadow-md flex items-center`}>
            <Tag className="w-3 h-3 mr-1" />
            {discountPercentage}% OFF
          </div>
        </div>
      )}
      
      {/* Imagen del producto */}
      <div className="relative w-40 h-40 mx-auto mb-4">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain rounded-full"
        />
      </div>

      {/* Nombre del producto */}
      <h3 className={`${styles.title} text-xl font-extrabold font-outfit mb-1`}>
        {product.name}
      </h3>

      {/* Descripción */}
      <p className={`${styles.description} text-sm italic font-outfit mb-4`}>
        {product.description}
      </p>

      {/* Precio y botón */}
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2 justify-center">
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
          <p className="text-xs text-green-600 font-outfit">{product.promoDetails}</p>
        )}
        
        {!hideAddButton && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => addToCart(product)}
            className={styles.button}
          >
            Añadir al pedido
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}