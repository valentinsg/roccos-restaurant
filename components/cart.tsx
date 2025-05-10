"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X, Plus, Minus, Send } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

type CartProps = {
  variant: "classic" | "modern"
}

export default function Cart({ variant }: CartProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  // Close cart when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest(".cart-container") && !target.closest(".cart-button")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  const cartStyles = {
    classic: {
      button: "bg-[#A82531] text-[#FAF4E1] hover:bg-[#8A1D27]",
      container: "bg-white border border-gray-200 text-gray-800",
      header: "bg-[#A82531] text-[#FAF4E1]",
      item: "border-b border-gray-200",
      itemName: "font-serif",
      price: "font-serif text-[#A82531]",
      checkout: "bg-[#A82531] text-[#FAF4E1] hover:bg-[#8A1D27]",
      quantityButton: "border border-gray-300 hover:bg-gray-100",
    },
    modern: {
      button: "bg-yellow-400 text-gray-800 hover:bg-yellow-500",
      container: "bg-white shadow-lg text-gray-800",
      header: "bg-gray-800 text-white",
      item: "border-b border-gray-100",
      itemName: "font-sans font-medium",
      price: "font-sans font-bold text-gray-800",
      checkout: "bg-yellow-400 text-gray-800 hover:bg-yellow-500",
      quantityButton: "border border-gray-200 hover:bg-gray-50",
    },
  }

  const styles = variant === "classic" ? cartStyles.classic : cartStyles.modern

  const sendToWhatsApp = () => {
    if (cart.length === 0) return

    const phoneNumber = variant === "classic" ? "2245401066" : "2245470853"
    const restaurantName = variant === "classic" ? "Rocco's Pizza and Restaurante" : "Rocco's 2.0"

    let message = `Hola! Quiero hacer un pedido en ${restaurantName}:\n\n`

    cart.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} (${item.price.toFixed(2)} c/u)\n`
    })

    message += `\nTotal: ${totalPrice.toFixed(2)}`

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Close cart and clear items after sending
    setIsOpen(false)
    clearCart()
  }

  // Animaciones mejoradas
  const cartVariants = {
    hidden: { opacity: 0, x: 300, transition: { duration: 0.3 } },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        mass: 1,
      },
    },
    exit: {
      opacity: 0,
      x: 300,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1, rotate: 5, transition: { duration: 0.2 } },
    tap: { scale: 0.9, rotate: 0, transition: { duration: 0.2 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    exit: {
      opacity: 0,
      x: -100,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <div className="relative z-40">
      {/* Cart Button */}
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        className={`${styles.button} cart-button fixed bottom-6 right-6 p-3 rounded-full shadow-lg flex items-center justify-center`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="h-6 w-6" />
        <AnimatePresence>
          {totalItems > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 bg-white text-gray-800 text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-current"
            >
              {totalItems}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Cart Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black pointer-events-none"
            />

            {/* Cart */}
            <motion.div
              variants={cartVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`${styles.container} cart-container fixed top-0 right-0 h-full w-full sm:w-96 shadow-xl overflow-hidden flex flex-col`}
            >
              {/* Header */}
              <div className={`${styles.header} p-4 flex justify-between items-center`}>
                <h2 className="text-xl font-bold flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Tu Pedido ({totalItems})
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full hover:bg-opacity-20 hover:bg-black transition-colors"
                >
                  <X className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-center py-8 text-gray-500"
                  >
                    Tu carrito está vacío
                  </motion.div>
                ) : (
                  <ul className="space-y-4">
                    <AnimatePresence>
                      {cart.map((item, index) => (
                        <motion.li
                          key={item.id}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          layout
                          className={`${styles.item} py-3`}
                        >
                          <div className="flex justify-between mb-2">
                            <span className={`${styles.itemName} text-lg`}>{item.name}</span>
                            <motion.button
                              whileHover={{ scale: 1.1, color: "#ef4444" }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => item.id && removeFromCart(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </motion.button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => item.id && updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className={`${styles.quantityButton} rounded-full p-1`}
                              >
                                <Minus className="h-4 w-4" />
                              </motion.button>
                              <span>{item.quantity}</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => item.id && updateQuantity(item.id, item.quantity + 1)}
                                className={`${styles.quantityButton} rounded-full p-1`}
                              >
                                <Plus className="h-4 w-4" />
                              </motion.button>
                            </div>
                            <span className={styles.price}>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                )}
              </div>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-4 border-t border-gray-200"
              >
                <div className="flex justify-between mb-4">
                  <span className="font-bold">Total:</span>
                  <span className={`${styles.price} text-xl`}>${totalPrice.toFixed(2)}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={sendToWhatsApp}
                  disabled={cart.length === 0}
                  className={`${styles.checkout} w-full py-3 rounded-md font-bold flex items-center justify-center ${
                    cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <Send className="h-5 w-5 mr-2" />
                  Enviar pedido por WhatsApp
                </motion.button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
