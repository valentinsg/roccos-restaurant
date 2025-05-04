"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { getAllProducts } from '@/lib/queries'
import type { Product } from '@/lib/types'

type ProductContextType = {
  products: Product[]
  loading: boolean
  error: string | null
  refreshProducts: () => Promise<void>
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const data = await getAllProducts()
      setProducts(data)
      setError(null)
    } catch (err) {
      setError('Error al cargar los productos')
      console.error('Error al cargar productos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const refreshProducts = async () => {
    await fetchProducts()
  }

  return (
    <ProductContext.Provider value={{ products, loading, error, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (context === undefined) {
    throw new Error('useProducts debe ser usado dentro de un ProductProvider')
  }
  return context
} 