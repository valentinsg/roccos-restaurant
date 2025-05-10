import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone } from "lucide-react"

type FooterProps = {
  variant: "classic" | "modern"
}

export default function Footer({ variant }: FooterProps) {
  const year = new Date().getFullYear()
  const basePath = variant === "classic" ? "/roccos" : "/roccos-2"

  const footerClasses = {
    classic: {
      container: "bg-[#111111] text-[#E6C163]",
      title: "font-outfit text-2xl font-bold tracking-wide mb-3",
      link: "text-[#E6C163] hover:text-[#FAF4E1] transition-colors",
      icon: "text-[#E6C163] hover:text-[#FAF4E1] transition-colors",
      copyright: "text-[#E6C163]/70",
    },
    modern: {
      container: "bg-[#0C2232] text-white",
      title: "font-outfit text-2xl font-bold tracking-wide mb-3",
      link: "text-[#E55925] hover:text-[#E55925] transition-colors",
      icon: "text-[#E55925] hover:text-[#E55925] transition-colors",
      copyright: "text-[#E55925]/70",
    },
  }

  const styles = variant === "classic" ? footerClasses.classic : footerClasses.modern

  const contactInfo = {
    classic: {
      name: "Rocco's Pizza and Restaurante",
      address: "Olavarría 1199, Dolores, Buenos Aires",
      phone: "2245441330",
      whatsapp: "2245401066",
      hours: "11:30 a 15:30 y 20:00 a 00:30",
      social: {
        facebook: "https://facebook.com/RoccosDelivery",
        instagram: "https://instagram.com/RoccosDelivery",
      },
    },
    modern: {
      name: "Rocco's 2.0 – Fast Food & Coffee",
      address: "Rico 39, Dolores, Buenos Aires",
      whatsapp: "2245470853",
      hours: "08:00 a 14:00 y 17:00 a 23:30",
      social: {
        facebook: "https://facebook.com/Roccos2.0",
        instagram: "https://instagram.com/Roccos2.0",
      },
    },
  }

  const info = variant === "classic" ? contactInfo.classic : contactInfo.modern
  const logoSrc =
    variant === "classic" ? "/images/roccos-logo.webp" : "/images/roccos-2.0-logo-sin-letras.webp"
  const fontFamily = "font-outfit"

  return (
    <footer className={`${styles.container} py-12`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo y descripción */}
          <div className="text-center md:text-left">
            <div className="mb-6 w-24 h-24 relative mx-auto md:mx-0">
              <Image src={logoSrc} alt={`${info.name} Logo`} fill className="object-contain" />
            </div>
            <p className={`${fontFamily} text-base opacity-90 leading-relaxed`}>
              {variant === "classic"
                ? "Tradición, parrilla y las mejores pizzas de Dolores."
                : "La experiencia moderna en café y comida rápida."}
            </p>
          </div>

          {/* Contacto */}
          <div className="text-center md:text-left">
            <h3 className={styles.title}>Contacto</h3>
            <div className={`space-y-3 ${fontFamily} text-base`}>
              <p className="flex items-center justify-center md:justify-start">
                <MapPin className={`w-5 h-5 mr-2 ${styles.icon}`} />
                {info.address}
              </p>
              {variant === "classic" && (
                <p className="flex items-center justify-center md:justify-start">
                  <Phone className={`w-5 h-5 mr-2 ${styles.icon}`} />
                  Tel: 2245401066
                </p>
              )}
              <p className="flex items-center justify-center md:justify-start">
                <Phone className={`w-5 h-5 mr-2 ${styles.icon}`} />
                WhatsApp: {info.whatsapp}
              </p>
              <p className="text-sm opacity-80">Horarios: {info.hours}</p>
            </div>
          </div>

          {/* Enlaces rápidos */}
          <div className="text-center md:text-left">
            <h3 className={styles.title}>Enlaces rápidos</h3>
            <ul className={`space-y-2 ${fontFamily} text-base`}>
              <li>
                <Link href={`${basePath}/pedido`} className={styles.link}>
                  Pedir
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/nosotros`} className={styles.link}>
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href={`${basePath}/contacto`} className={styles.link}>
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-[#E6C163]/20 text-center">
          <p className={`${fontFamily} text-sm ${styles.copyright}`}>
            © {year} {info.name}. Todos los derechos reservados.
          </p>
          <p className={`${fontFamily} text-sm mt-2 ${styles.copyright}`}>Website creado por Valen | @valensanchez.g</p>
        </div>
      </div>
    </footer>
  )
}
