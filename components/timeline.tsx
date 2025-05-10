"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

export interface TimelineEvent {
  year: string
  title: string
  description: string
  images?: string[]
}

interface TimelineProps {
  events: TimelineEvent[]
  variant: "classic" | "modern"
}

export default function Timeline({ events, variant }: TimelineProps) {
  const [activeImages, setActiveImages] = useState<{ [key: number]: number }>({})

  // Función para cambiar a la siguiente imagen
  const nextImage = (eventIndex: number, totalImages: number) => {
    setActiveImages(prev => ({
      ...prev,
      [eventIndex]: ((prev[eventIndex] || 0) + 1) % totalImages
    }))
  }

  // Efecto para el autoplay de las imágenes
  useEffect(() => {
    const interval = setInterval(() => {
      events.forEach((event, index) => {
        if (event.images && event.images.length > 1) {
          nextImage(index, event.images.length)
        }
      })
    }, 4000) // Cambiar imagen cada 4 segundos

    return () => clearInterval(interval)
  }, [events])

  const handleImageChange = (eventIndex: number, imageIndex: number) => {
    setActiveImages(prev => ({
      ...prev,
      [eventIndex]: imageIndex
    }))
  }

  const timelineStyles = {
    classic: {
      container: "bg-[#A82531]",
      line: "bg-[#E6C163]",
      dot: "bg-[#A82531] border-[#E6C163]",
      card: "bg-white border border-[#E6C163]/50 shadow-lg hover:shadow-xl transition-shadow duration-300",
      year: "bg-[#A82531] text-[#FAF4E1] font-outfit",
      title: "text-[#A82531] font-outfit font-bold",
      description: "text-[#111111]/90 font-outfit",
    },
    modern: {
      container: "bg-white",
      line: "bg-[#E55925]",
      dot: "bg-[#E55925] border-[#1A3E5A]",
      card: "bg-white border-2 border-[#E55925]/20 shadow-lg hover:shadow-xl transition-shadow duration-300",
      year: "bg-[#E55925] text-white font-manrope",
      title: "text-[#0C2232] font-manrope font-bold",
      description: "text-[#0C2232]/80 font-outfit",
    },
  }

  const styles = variant === "classic" ? timelineStyles.classic : timelineStyles.modern

  // Componente para los botones de navegación de imágenes
  const ImageNavigationButtons = ({ event, index }: { event: TimelineEvent, index: number }) => {
    if (!event.images || event.images.length <= 1) return null;
    
    return (
      <>
        <button 
          onClick={() => nextImage(index, event.images!.length)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
        <button 
          onClick={() => handleImageChange(index, (activeImages[index] - 1 + event.images!.length) % event.images!.length)}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 bg-black/50 px-4 py-2 rounded-full">
          {event.images.map((_, dotIndex) => (
            <button
              key={dotIndex}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                dotIndex === (activeImages[index] || 0)
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/80'
              }`}
              onClick={() => handleImageChange(index, dotIndex)}
            />
          ))}
        </div>
      </>
    );
  };

  // Componente para la tarjeta de contenido
  const EventCard = ({ event, styles }: { event: TimelineEvent, styles: any }) => (
    <div className={`${styles.card} rounded-xl p-6 h-full flex flex-col justify-center`}>
      <div className={`${styles.year} w-fit px-4 py-1.5 rounded-full text-md font-semibold mb-4`}>
        {event.year}
      </div>
      <h3 className={`${styles.title} text-3xl mb-4`}>{event.title}</h3>
      <p className={`${styles.description} text-xl leading-relaxed`}>{event.description}</p>
    </div>
  );

  // Componente para la galería de imágenes
  const ImageGallery = ({ event, index, isInView }: { event: TimelineEvent, index: number, isInView: boolean }) => {
    if (!event.images || event.images.length === 0) return null;
    
    const backgroundImage = variant === "modern" 
      ? 'url(/images/textures/coffee-pattern.svg)' 
      : 'url(/images/textures/background-fachero.webp)';
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative h-full w-4/5 mx-auto rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <div className="relative h-full w-full" style={{ backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          {event.images.map((image, imgIndex) => (
            <Image
              key={imgIndex}
              src={image || "/placeholder.svg?height=300&width=400"}
              alt={`${event.title} - Imagen ${imgIndex + 1}`}
              fill
              className={`hover:scale-105 transition-transform duration-300 object-contain ${
                imgIndex === (activeImages[index] || 0) ? 'opacity-100' : 'opacity-0 absolute'
              }`}
            />
          ))}
        </div>
        <ImageNavigationButtons event={event} index={index} />
      </motion.div>
    );
  };

  return (
    <div className={`${styles.container} py-16`}>
      <div className="max-w-6xl mx-auto px-4 relative">
        {/* Línea vertical central */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 h-full w-1 ${styles.line}`}></div>

        {/* Eventos de la línea de tiempo */}
        {events.map((event, index) => {
          const isEven = index % 2 === 0
          const containerRef = useRef(null)
          const [isInView, setIsInView] = useState(false)

          useEffect(() => {
            const observer = new IntersectionObserver(
              ([entry]) => {
                setIsInView(entry.isIntersecting)
              },
              {
                rootMargin: "0px",
                threshold: 0.3,
              },
            )

            if (containerRef.current) {
              observer.observe(containerRef.current)
            }

            return () => {
              if (containerRef.current) {
                observer.unobserve(containerRef.current)
              }
            }
          }, [])

          return (
            <div key={index} className="relative z-10" ref={containerRef}>
              <motion.div
                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 }}
                className={`flex items-center mb-20 ${isEven ? "flex-row h-80" : "flex-row-reverse h-80"} md:flex-row-reverse`}
              >
                {/* Contenido del evento */}
                <div className={`w-full md:w-1/2 h-full ${isEven ? "md:px-4 md:text-right" : "md:px-4"} z-20 relative`}>
                  <EventCard event={event} styles={styles} />
                </div>

                {/* Punto en la línea de tiempo */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className={`w-6 h-6 rounded-full border-4 ${styles.dot} shadow-lg`}
                  ></motion.div>
                </div>

                {/* Imagen */}
                <div
                  className={`hidden h-full md:block md:w-1/2 ${isEven ? "md:px-4" : "md:px-4"} z-20 relative flex items-center justify-center`}
                >
                  <ImageGallery event={event} index={index} isInView={isInView} />
                </div>
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
