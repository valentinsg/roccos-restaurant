import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export const formatPrice = (price: number) => {
  return price.toFixed(2)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
