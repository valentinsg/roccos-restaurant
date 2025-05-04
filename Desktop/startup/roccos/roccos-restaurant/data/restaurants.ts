import type { RestaurantInfo } from "@/lib/types"

export const restaurants: RestaurantInfo[] = [
  {
    id: "roccos",
    name: "Rocco's Pizza and Restaurante",
    shortName: "Rocco's",
    slogan: "Tradición, parrilla y las mejores pizzas de Dolores",
    address: "Olavarría 1199, Dolores, Buenos Aires",
    phone: "2245441330",
    whatsapp: "2245401066",
    hours: "11:30 a 15:30 y 20:00 a 00:30",
    isOpen: true,
    social: {
      facebook: "https://facebook.com/RoccosDelivery",
      instagram: "https://instagram.com/RoccosDelivery",
      tiktok: "https://tiktok.com/@RoccosDelivery",
    },
    variant: "classic",
    description:
      "Desde hace más de 15 años, Rocco's Pizza and Restaurante ha sido el lugar favorito de Dolores para disfrutar de la mejor comida tradicional argentina. Nuestras pizzas, pastas caseras y parrilla son preparadas con ingredientes frescos y de la más alta calidad.",
    history:
      "Todo comenzó en una cocina familiar, con harina en las manos y amor en cada receta. En 2010, David Guevara abrió las puertas de Rocco’s como una pequeña pizzería de barrio. Lo que empezó como un sueño casero, hoy es un referente gastronómico en Dolores, reconocido por su sabor auténtico y su calidez. Nuestra cocina honra las raíces italo-argentinas de la familia. Cada plato que servimos tiene historia, tradición y alma. Nos mueve la pasión por compartir ese sabor que se transmite de generación en generación. En Rocco’s no cocinamos solo comida. Cocinamos recuerdos.",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.5088559170984!2d-57.6789!3d-36.3132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE4JzQ3LjUiUyA1N8KwNDAnNDQuMCJX!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar",
  },
  {
    id: "roccos-2",
    name: "Rocco's 2.0 – Fast Food & Coffee",
    shortName: "Rocco's 2.0",
    slogan: "La experiencia moderna en café y comida rápida",
    address: "Rico 39, Dolores, Buenos Aires",
    whatsapp: "2245470853",
    hours: "08:00 a 14:00 y 17:00 a 23:30",
    isOpen: false,
    social: {
      facebook: "https://facebook.com/Roccos2.0",
      instagram: "https://instagram.com/Roccos2.0",
    },
    variant: "modern",
    description:
      "Rocco's 2.0 es nuestra nueva propuesta gastronómica en Dolores. Un espacio moderno donde podrás disfrutar de los mejores cafés de especialidad, desayunos gourmet, hamburguesas artesanales y mucho más.",
    history:
      "Nacido como una evolución natural de la marca Rocco's, este nuevo concepto busca traer a Dolores las últimas tendencias en café de especialidad y comida rápida gourmet. Diseñado para un público que busca experiencias gastronómicas contemporáneas en un ambiente relajado y estético.",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.6!2d-57.676!3d-36.315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzbCsDE4JzU0LjAiUyA1N8KwNDAnMzMuNiJX!5e0!3m2!1ses!2sar!4v1620000000000!5m2!1ses!2sar",
  },
]

export const getRestaurantById = (id: "roccos" | "roccos-2"): RestaurantInfo => {
  return restaurants.find((restaurant) => restaurant.id === id) || restaurants[0]
}
