"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Pizza, Coffee } from "lucide-react"

export default function LandingPage() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(true)
  }, [])

  return (
    <div className="h-screen w-full overflow-hidden">
      <div className="relative h-full w-full flex flex-col md:flex-row">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/20 z-30" />

        {/* Rocco's Classic Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative h-1/2 md:h-full md:w-1/2 z-0"
        >
          <div className="absolute inset-0 bg-[#111111] z-0 " />

          <div className="relative h-full z-20 flex flex-col items-center justify-center px-8 py-14 text-[#FAF4E1]">
            <div className="w-full max-w-xl text-center mb-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={loaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-56 h-56 md:w-72 md:h-72 relative mx-auto mb-4 cursor-pointer"
                onClick={() => window.location.href = '/roccos'}
              >
                <Image src="/images/roccos-logo.webp" alt="Rocco's Logo" fill className="object-contain" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={loaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[#E6C163] font-lora text-lg md:text-xl mb-4"
              >
                Tradición, parrilla y las mejores pizzas de Dolores
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={loaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="w-full max-w-xs mx-auto"
              >
                <Link href="/roccos">
                  <motion.button
                    whileHover={{
                      backgroundColor: "#5a201c",
                      color: "#E6C163",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                    }}
                    whileTap={{
                      backgroundColor: "#84413B",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
                    }}
                    transition={{
                      duration: 0.3,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="bg-[#A82531] text-[#E6C163] font-outfit text-base py-3 px-5 rounded-lg flex items-center justify-center w-full shadow-md hover:shadow-lg active:shadow-sm"
                  >
                    <Pizza className="mr-2 h-4 w-4 text-[#E6C163]" />
                    Pedí una pizza
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Rocco's 2.0 Side */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="relative h-1/2 md:h-full md:w-1/2 z-20"
        >
          {/* Fondo elegante y profundo */}
          <div className="absolute inset-0 bg-[#111111] z-0" />

          <div className="relative h-full z-20 flex flex-col items-center justify-center px-8 py-14">
            <div className="w-full max-w-xl text-center mb-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={loaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-56 h-56 md:w-72 md:h-72 relative mx-auto mb-4 cursor-pointer rounded-full border-4 border-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                onClick={() => window.location.href = '/roccos-2'}
              >
                <Image
                  src="/images/roccos-2.0-logo.webp"
                  alt="Rocco's 2.0 Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={loaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-[#FAF4E1] font-outfit text-lg md:text-xl mb-4"
              >
                Café y comida rápida en el centro de Dolores
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={loaded ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full max-w-xs mx-auto"
              >
                <Link href="/roccos-2">
                  <motion.button
                    whileHover={{
                      backgroundColor: "#FF6B35",
                      color: "#FAF4E1",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
                    }}
                    whileTap={{
                      backgroundColor: "#FF6B35",
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
                    }}
                    transition={{
                      duration: 0.25,
                      ease: [0.4, 0, 0.2, 1]
                    }}
                    className="bg-[#E55925] text-[#FAF4E1] font-outfit text-base py-3 px-5 rounded-lg flex items-center justify-center w-full shadow-md hover:shadow-lg active:shadow-sm"
                  >
                    <Coffee className="mr-2 h-4 w-4 text-[#FAF4E1]" />
                    Quiero comida rápida
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 py-3 bg-black/30 backdrop-blur-sm z-30">
        <div className="container mx-auto px-4 text-center text-white text-sm">
          <p>Website creado por Val | @val.dev</p>
        </div>
      </footer>
    </div>
  )
}
