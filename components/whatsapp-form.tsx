"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { useCart } from "@/hooks/use-cart"

type WhatsAppFormProps = {
  variant: "classic" | "modern"
}

type FormData = {
  name: string
  phone: string
  address: string
  notes: string
  pickup: boolean
  paymentMethod: "efectivo" | "transferencia" | "tarjeta"
}

export default function WhatsAppForm({ variant }: WhatsAppFormProps) {
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    address: "",
    notes: "",
    pickup: false,
    paymentMethod: "efectivo",
  })
  const [finalPrice, setFinalPrice] = useState(totalPrice)

  useEffect(() => {
    // Actualizar precio final con el costo de envío si corresponde
    if (!formData.pickup) {
      setFinalPrice(totalPrice + 2000)
    } else {
      setFinalPrice(totalPrice)
    }
  }, [totalPrice, formData.pickup])


  const formStyles = {
    classic: {
      container: "bg-white w-full border border-gray-200 rounded-lg shadow-md",
      title: "font-outfit text-2xl text-[#7B2D26]",
      label: "font-outfit text-gray-700",
      input: "border-gray-300 focus:border-[#7B2D26] border-1 focus:ring-[#7B2D26] font-outfit",
      button: "bg-[#7B2D26] text-[#FAF4E1] hover:bg-[#5a201c] font-outfit",
      radio: "text-[#7B2D26] focus:ring-[#7B2D26] ",
    },
    modern: {
      container: "bg-white rounded-xl shadow-sm",
      title: "font-outfit text-2xl font-bold text-gray-800",
      label: "font-outfit text-gray-700",
      input: "border-gray-200 focus:border-yellow-400 focus:ring-yellow-400 font-outfit",
      button: "bg-yellow-400 text-gray-800 hover:bg-yellow-500 font-outfit",
      radio: "text-yellow-400 focus:ring-yellow-400",
    },
  }

  const styles = variant === "classic" ? formStyles.classic : formStyles.modern

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      // Si pickup cambia a true, y el método de pago era tarjeta, restablecer a efectivo
      let newPaymentMethod = formData.paymentMethod;
      if (name === "pickup" && !checked && formData.paymentMethod === "tarjeta") {
        newPaymentMethod = "efectivo";
      }

      setFormData({
        ...formData,
        [name]: checked,
        paymentMethod: newPaymentMethod
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  const sendToWhatsApp = (e: React.FormEvent) => {
    e.preventDefault()

    if (cart.length === 0) return

    const phoneNumber = variant === "classic" ? "2245401066" : "2245470853"
    const restaurantName = variant === "classic" ? "Rocco's Pizza and Restaurante" : "Rocco's 2.0"

    let message = `Hola! Quiero hacer un pedido en ${restaurantName}:\n\n`

    // Add customer info
    message += `Nombre: ${formData.name}\n`
    message += `Teléfono: ${formData.phone}\n`
    message += formData.pickup ? "Retiro en local\n" : `Dirección de entrega: ${formData.address}\n`
    message += `Método de pago: ${formData.paymentMethod}\n\n`

    // Add order items
    message += "PEDIDO:\n"
    cart.forEach((item) => {
      message += `- ${item.quantity}x ${item.name} ($${item.price.toFixed(2)} c/u)\n`
    })

    // Agregar costo de envío si corresponde
    if (!formData.pickup) {
      message += `\nSubtotal: $${totalPrice.toFixed(2)}`
      message += `\nEnvío: $2000.00`
    }

    message += `\nTotal: $${finalPrice.toFixed(2)}`

    // Add notes if any
    if (formData.notes) {
      message += `\n\nNotas: ${formData.notes}`
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className={`${styles.container} p-6 h-min `}>
      <h2 className={`${styles.title} mb-6 text-center`}>Finalizar Pedido</h2>

      <form onSubmit={sendToWhatsApp} className="space-y-6">
        <div>
          <label htmlFor="name" className={`${styles.label} block mb-2`}>
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full rounded-md font-outfit text-[#A82531] border-2 border-[#A82531] focus:border-[#A82531] focus:ring-[#A82531] bg-white p-2`}
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label htmlFor="phone" className={`${styles.label} block mb-2`}>
            Teléfono
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className={`w-full rounded-md font-outfit text-[#A82531] border-2 border-[#A82531] focus:border-[#A82531] focus:ring-[#A82531] bg-white p-2`}
            placeholder="Tu número de teléfono"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="pickup"
            name="pickup"
            checked={formData.pickup}
            onChange={handleChange}
            className={`${styles.radio} mr-2 border-1 border-[#A82531]`}
          />
          <label htmlFor="pickup" className={"font-outfit text-[#111111]"}>
            Retiro en local
          </label>
        </div>

        {!formData.pickup && (
          <div>
            <label htmlFor="address" className={`${styles.label} font-outfit block mb-2`}>
              Dirección de entrega
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required={!formData.pickup}
              className={`w-full rounded-md font-outfit text-[#A82531] border-2 border-[#A82531] focus:border-[#A82531] focus:ring-[#A82531] bg-white p-2`}
              placeholder="Tu dirección completa"
            />
          </div>
        )}

        <div>
          <label htmlFor="paymentMethod" className={`${styles.label} block mb-2`}>
            Método de pago
          </label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
            className={`w-full rounded-md font-outfit text-[#111111] border-2 border-[#A82531] focus:border-[#A82531] focus:ring-[#A82531] bg-white p-2`}
          >
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
            {formData.pickup && <option value="tarjeta">Tarjeta (en local)</option>}
          </select>
        </div>

        <div>
          <label htmlFor="notes" className={`${styles.label} block mb-2`}>
            Notas adicionales (opcional)
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className={`w-full rounded-md font-outfit text-[#A82531] border-2 border-[#A82531] focus:border-[#A82531] focus:ring-[#A82531] bg-white p-2`}
            placeholder="Instrucciones especiales, alergias, etc."
          />
        </div>

        {!formData.pickup && (
          <div className="py-2 px-3 bg-yellow-50 border font-outfit text-[#A82531] border-yellow-200 rounded-md text-sm">
            <p className={`font-medium`}>Costo de envío: $2000</p>
          </div>
        )}

        {/* Resumen del carrito */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6 sticky top-0 z-10">
          <h3 className="font-outfit text-lg text-[#A82531] font-semibold mb-4">Resumen del Pedido</h3>
          <div className="space-y-2">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                      onClick={() => {
                        if (item.id && item.quantity > 1) {
                          updateQuantity(item.id, item.quantity - 1);
                        } else if (item.id) {
                          removeFromCart(item.id);
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="font-outfit text-gray-700 min-w-[80px]">
                      {item.quantity}x {item.name}
                    </span>
                    <button
                      type="button"
                      className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-sm"
                      onClick={() => item.id && updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <span className="font-outfit text-[#A82531] font-semibold">
                  ${item.price.toFixed(2)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between items-center">
              <span className="font-outfit text-gray-700">Subtotal:</span>
              <span className="font-outfit text-[#A82531] font-semibold">
                ${totalPrice.toFixed(2)}
              </span>
            </div>
            {!formData.pickup && (
              <div className="flex justify-between items-center">
                <span className="font-outfit text-gray-700">Envío:</span>
                <span className="font-outfit text-[#A82531] font-semibold">$2000.00</span>
              </div>
            )}
            <div className="border-t border-gray-200 my-2"></div>
            <div className="flex justify-between items-center font-semibold">
              <span className="font-outfit text-gray-700">Total:</span>
              <span className="font-outfit text-[#A82531] font-bold">
                ${finalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={cart.length === 0}
          className={`font-outfit text-[#FAF4E1] border-[#111111] focus:border-[#111111] focus:ring-[#111111] bg-[#A82531] p-2 rounded-md w-full py-3 rounded-md font-bold flex items-center justify-center ${cart.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
        >
          <Send className="h-5 w-5 mr-2" />
          Enviar pedido por WhatsApp
        </motion.button>
      </form>
    </div>
  )
}