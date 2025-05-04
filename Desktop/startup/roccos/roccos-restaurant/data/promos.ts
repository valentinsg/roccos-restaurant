import type { Promo } from "@/lib/types"
import { products } from "./products"

// Función para encontrar un producto por su ID
const findProductById = (id: string) => {
  const product = products.find(p => p.id === id)
  if (!product) {
    throw new Error(`Producto con ID ${id} no encontrado`)
  }
  return product
}

// Función para calcular el precio original total
const calculateOriginalPrice = (productIds: string[]) => {
  return productIds.reduce((total, id) => {
    const product = findProductById(id)
    return total + product.price
  }, 0)
}

export const promos: Promo[] = [
  // Promociones de Rocco's clásico
  {
    id: "promo-1",
    name: "Promo Pizza Familiar",
    description: "Pizza familiar de muzzarella + 6 empanadas + gaseosa de 1.5L",
    products: [
      findProductById("pizza-1"),
      // Empanadas y gaseosa (asumiendo que existen estos productos en products.ts)
    ],
    price: 5000,
    originalPrice: 6500, // Precio original calculado de los productos individuales
    image: "/placeholder.svg?height=300&width=300",
    availability: {
      daysOfWeek: [1, 2, 3, 4, 5], // Lunes a viernes
      startTime: "18:00",
      endTime: "23:00",
      isActive: true,
    },
    categoryId: "promos",
    sucursal: "roccos",
  },
  {
    id: "promo-2",
    name: "Promo Parrillada Completa",
    description: "Parrillada para 2 personas + ensalada mixta + botella de vino Malbec",
    products: [
      findProductById("parrilla-3"),
      findProductById("bebida-2"),
      // Ensalada (asumiendo que existe en products.ts)
    ],
    price: 10500,
    originalPrice: 13500,
    image: "/placeholder.svg?height=300&width=300",
    availability: {
      daysOfWeek: [4, 5, 6], // Jueves, viernes y sábado
      isActive: true,
    },
    categoryId: "promos",
    sucursal: "roccos",
  },
  {
    id: "promo-3",
    name: "Promo Pastas",
    description: "2 porciones de pastas a elección + 2 bebidas + postre para compartir",
    products: [
      findProductById("pasta-1"),
      findProductById("pasta-2"),
      findProductById("postre-1"),
      // Bebidas (asumiendo que existen en products.ts)
    ],
    price: 7200,
    originalPrice: 8900,
    image: "/placeholder.svg?height=300&width=300",
    availability: {
      daysOfWeek: [0, 2, 3], // Domingo, martes y miércoles
      isActive: true,
    },
    categoryId: "promos",
    sucursal: "roccos",
  },
  
  // Promociones de Rocco's 2.0
  {
    id: "promo-4",
    name: "Promo Desayuno Completo",
    description: "Yogur con granola + café a elección + tostadas de aguacate",
    products: [
      findProductById("desayuno-2"),
      findProductById("cafe-1"),
      findProductById("desayuno-1"),
    ],
    price: 3200,
    originalPrice: 4000,
    image: "/placeholder.svg?height=300&width=300",
    availability: {
      daysOfWeek: [0, 1, 2, 3, 4, 5, 6], // Todos los días
      startTime: "08:00",
      endTime: "12:00", // Solo en horario de desayuno
      isActive: true,
    },
    categoryId: "promos",
    sucursal: "roccos-2",
  },
  {
    id: "promo-5",
    name: "Promo Burger + Batido",
    description: "Hamburguesa clásica + batido a elección + porción de papas fritas",
    products: [
      findProductById("hamburguesa-1"),
      findProductById("batido-1"),
      // Papas fritas (asumiendo que existe en products.ts)
    ],
    price: 3800,
    originalPrice: 4500,
    image: "/placeholder.svg?height=300&width=300",
    availability: {
      daysOfWeek: [1, 2, 3, 4, 5], // Lunes a viernes
      isActive: true,
    },
    categoryId: "promos",
    sucursal: "roccos-2",
  },
]

// Función para verificar si una promo está activa en este momento
export function isPromoActive(promo: Promo): boolean {
  if (!promo.availability.isActive) return false
  
  const now = new Date()
  const currentDay = now.getDay() // 0-6, domingo a sábado
  
  // Verificar día
  if (promo.availability.daysOfWeek && !promo.availability.daysOfWeek.includes(currentDay)) {
    return false
  }
  
  // Verificar hora
  if (promo.availability.startTime && promo.availability.endTime) {
    const currentHours = now.getHours()
    const currentMinutes = now.getMinutes()
    const currentTimeStr = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`
    
    if (currentTimeStr < promo.availability.startTime || currentTimeStr > promo.availability.endTime) {
      return false
    }
  }
  
  return true
}

// Función para obtener promociones activas
export function getActivePromos(sucursal: "roccos" | "roccos-2"): Promo[] {
  return promos
    .filter(promo => promo.sucursal === sucursal && isPromoActive(promo))
    .map(promo => ({
      ...promo,
      // Crear un producto a partir de la promo
      products: [
        {
          ...promo,
          id: `product-${promo.id}`,
          price: promo.price,
          isPromo: true,
          promoDetails: promo.description,
          originalPrice: promo.originalPrice,
          categoryId: "promos",
        },
        ...promo.products
      ]
    }))
}

// Convertir promociones a productos
export function promosToProducts(sucursal: "roccos" | "roccos-2") {
  return promos
    .filter(promo => promo.sucursal === sucursal)
    .map(promo => ({
      id: `product-${promo.id}`,
      name: promo.name,
      description: promo.description,
      price: promo.price,
      image: promo.image,
      categoryId: "promos",
      sucursal: promo.sucursal,
      isPromo: true,
      promoDetails: `Ahorro: $${(promo.originalPrice - promo.price).toFixed(2)}`,
      originalPrice: promo.originalPrice,
    }))
} 