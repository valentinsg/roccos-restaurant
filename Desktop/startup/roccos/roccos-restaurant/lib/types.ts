export interface Product {
  id?: string
  name: string
  description: string
  price: number
  image: string
  category: string
  categoryId: string
  sucursal?: "roccos" | "roccos-2"
  isPromo?: boolean
  promoDetails?: string
  originalPrice?: number
  isAvailable?: boolean
}

export interface Category {
  id?: string
  name: string
  description?: string
  sucursal?: "roccos" | "roccos-2"
}

export interface CartItem extends Product {
  quantity: number
}

export interface SocialLinks {
  facebook?: string
  instagram?: string
  tiktok?: string
}

export interface RestaurantInfo {
  id: "roccos" | "roccos-2"
  name: string
  shortName: string
  slogan: string
  address: string
  phone?: string
  whatsapp: string
  hours: string
  isOpen: boolean
  social: SocialLinks
  variant: "classic" | "modern"
  description: string
  history: string
  mapEmbedUrl: string
}

export interface Promo {
  id: string
  name: string
  description: string
  products: Product[]
  price: number
  originalPrice: number
  image: string
  availability: {
    daysOfWeek?: number[] // 0-6 (domingo-sábado)
    startTime?: string // formato "HH:MM"
    endTime?: string // formato "HH:MM"
    isActive: boolean
  }
  categoryId: string
  sucursal: "roccos" | "roccos-2"
}
