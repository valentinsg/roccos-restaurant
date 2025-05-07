"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { CartItem, Product } from "@/lib/types"
import { useNotification } from "@/components/notification"

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  lastAction: {
    type: 'add' | 'remove' | 'update' | 'clear'
    product?: Product
    quantity?: number
  } | null
  clearLastAction: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

function CartProviderBase({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [lastAction, setLastAction] = useState<CartContextType['lastAction']>(null)

  const clearLastAction = useCallback(() => {
    setLastAction(null)
  }, [])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
      }
    }
  }, [])

  // Update localStorage and calculate totals when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))

    const items = cart.reduce((sum, item) => sum + item.quantity, 0)
    const price = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

    setTotalItems(items)
    setTotalPrice(price)
  }, [cart])

  const addToCart = useCallback((product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        return prevCart.map((item) => 
          (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
    setLastAction({ type: 'add', product })
  }, [])

  const removeFromCart = useCallback((productId: string) => {
    const itemToRemove = cart.find(item => item.id === productId)
    if (itemToRemove) {
      setLastAction({ type: 'remove', product: itemToRemove })
    }
    setCart(prevCart => prevCart.filter((item) => item.id !== productId))
  }, [cart])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    
    const itemToUpdate = cart.find(item => item.id === productId)
    if (itemToUpdate) {
      setCart(prevCart => prevCart.map((item) => 
        (item.id === productId ? { ...item, quantity } : item)
      ))
      
      if (quantity > itemToUpdate.quantity) {
        setLastAction({ type: 'update', product: itemToUpdate, quantity })
      }
    }
  }, [cart, removeFromCart])

  const clearCart = useCallback(() => {
    setLastAction({ type: 'clear' })
    setCart([])
  }, [])

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        lastAction,
        clearLastAction,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

function CartNotifications() {
  const { lastAction, cart, clearLastAction } = useCart()
  const { showNotification } = useNotification()

  useEffect(() => {
    if (!lastAction) return

    let message = ''
    switch (lastAction.type) {
      case 'add':
        if (lastAction.product) {
          const existingItem = cart.find(item => item.id === lastAction.product?.id)
          message = existingItem 
            ? `${lastAction.product.name} (x${existingItem.quantity}) agregado al pedido`
            : `${lastAction.product.name} agregado al pedido`
          showNotification("success", message)
        }
        break
      case 'remove':
        if (lastAction.product) {
          message = `${lastAction.product.name} eliminado del pedido`
          showNotification("info", message)
        }
        break
      case 'update':
        if (lastAction.product && lastAction.quantity) {
          message = `${lastAction.product.name}: cantidad actualizada a ${lastAction.quantity}`
          showNotification("info", message)
        }
        break
      case 'clear':
        message = "Se ha vaciado el pedido"
        showNotification("info", message)
        break
    }

    // Limpiar la última acción después de mostrar la notificación
    clearLastAction()
  }, [lastAction, cart, showNotification, clearLastAction])

  return null
}

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <CartProviderBase>
      {children}
      <CartNotifications />
    </CartProviderBase>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}