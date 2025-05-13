import { sanity } from './sanity'

export async function getAllProducts() {
  const query = `*[_type == "product"] {
    "id": _id,
    name,
    description,
    price,
    "category": category->name,
    "categoryId": category._ref,
    "image": image.asset->url,
    sucursal,
    isAvailable,
    isPromo,
    promoDetails,
    originalPrice,
    star,
    dailySpecial
  } | order(name asc)`
  try {
    return await sanity.fetch(query)
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export async function getCategories() {
  const query = `*[_type == "category"] {
    "id": _id,
    name,
    description,
    "image": image.asset->url,
    order,
    sucursal
  } | order(order asc)`
  try {
    return await sanity.fetch(query)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
