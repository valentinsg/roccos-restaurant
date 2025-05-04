"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { getCategories } from '@/lib/queries'

type Category = {
  _id: string
  name: string
  description: string
  image: string
  order: number
  sucursal: "roccos" | "roccos-2"
}

type CategoryContextType = {
  categories: Category[]
  loading: boolean
  error: string | null
  refreshCategories: () => Promise<void>
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await getCategories()
      setCategories(data)
      setError(null)
    } catch (err) {
      setError('Error al cargar las categorías')
      console.error('Error al cargar categorías:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const refreshCategories = async () => {
    await fetchCategories()
  }

  return (
    <CategoryContext.Provider value={{ categories, loading, error, refreshCategories }}>
      {children}
    </CategoryContext.Provider>
  )
}

export function useCategories() {
  const context = useContext(CategoryContext)
  if (context === undefined) {
    throw new Error('useCategories debe ser usado dentro de un CategoryProvider')
  }
  return context
} 