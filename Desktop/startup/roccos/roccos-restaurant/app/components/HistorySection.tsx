import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Utensils, Heart, Home } from "lucide-react";
import { RestaurantInfo } from "@/lib/types";

const HistorySection = ({ restaurant }: { restaurant: RestaurantInfo }) => {
  // Gallery images with enhanced configuration
  const galleryImages = [
    {
      src: "/images/roccos-frente.png",
      size: "large",
      rotation: "rotate-1"
    },
    {
      src: "/images/salon-desde-entrada.webp",
      size: "medium",
      rotation: "-rotate-2"
    },
    {
      src: "/images/salon-desde-el-vip.webp",
      size: "small",
      rotation: "rotate-1"
    },
    {
      src: "/images/thomi-mozo.webp",
      size: "medium",
      rotation: "-rotate-1"
    },
    {
      src: "/images/roccos-garden-fuente.webp",
      size: "large",
      rotation: "rotate-2"
    },
    {
      src: "/images/zoe.webp",
      size: "medium",
      rotation: "-rotate-1"
    },
    {
      src: "/images/numas.webp",
      size: "small",
      rotation: "rotate-1"
    },
    {
      src: "/images/roccos-caja.webp",
      size: "medium",
      rotation: "rotate-2"
    },
    {
      src: "/images/cumpleañito.webp",
      size: "small",
      rotation: "-rotate-1"
    },
    {
      src: "/images/abues-lindos.webp",
      size: "large",
      rotation: "-rotate-2"
    },
    {
      src: "/images/cuadros-salon.webp",
      size: "large",
      rotation: "rotate-1"
    },
    {
      src: "/images/davo-jefe.webp",
      size: "large",
      rotation: "rotate-1"
    },
    {
      src: "/images/detalle-luz.webp",
      size: "large",
      rotation: "rotate-1"
    },
    
  ];

  // Generate random string lengths for visual variation
  const [stringLengths, setStringLengths] = useState<number[]>([]);
  
  useEffect(() => {
    // Generate random string lengths between 20-40px
    setStringLengths(galleryImages.map(() => Math.floor(Math.random() * 20) + 20));
  }, []);

  return (
    <>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-24 relative overflow-hidden bg-[#FAF4E1]"
      >
        <div className="max-w-6xl mx-auto relative z-10 px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-outfit font-extrabold text-5xl md:text-6xl lg:text-7xl text-[#A82531]  mb-16 text-center"
          >
            Nuestra Historia
          </motion.h2>
          <div className="items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-16"
            >
              <p className="font-outfit text-xl text-center md:text-2xl text-gray-800  leading-relaxed">
                {restaurant.history}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Three Icons Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="pb-12 relative overflow-hidden bg-[#FAF4E1]"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* SABOR CON HISTORIA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#E6C163] hover:border-[#A82531] transition-all duration-300"
            >
              <div className="w-20 h-20 bg-[#A82531] text-[#E6C163] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-[#E6C163]">
                <Utensils className="w-10 h-10" />
              </div>
              <h3 className="font-outfit font-semibold text-2xl text-[#A82531]  mb-4 text-center">
                Sabor con Historia
              </h3>
              <p className="font-outfit text-gray-600 text-center">
                Cocinamos recetas de nuestra familia que han cruzado generaciones. Cada plato es parte de un legado.
              </p>
            </motion.div>

            {/* COCINA CON ALMA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#E6C163] hover:border-[#A82531] transition-all duration-300"
            >
              <div className="w-20 h-20 bg-[#A82531] text-[#E6C163] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-[#E6C163]">
                <Heart className="w-10 h-10" />
              </div>
              <h3 className="font-outfit font-semibold text-2xl text-[#A82531] mb-4 text-center">
                Cocina con Alma
              </h3>
              <p className="font-outfit text-gray-600 text-center">
                No solo cocinamos comida: cocinamos recuerdos, emociones y momentos que quedan en el corazón.
              </p>
            </motion.div>

            {/* HOGAR GASTRONÓMICO */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-2xl p-6 shadow-xl border-2 border-[#E6C163] hover:border-[#A82531] transition-all duration-300"
            >
              <div className="w-20 h-20 bg-[#A82531] text-[#E6C163] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border-2 border-[#E6C163]">
                <Home className="w-10 h-10" />
              </div>
              <h3 className="font-outfit font-semibold text-2xl text-[#A82531]  mb-4 text-center">
                Hogar Gastronómico
              </h3>
              <p className="font-outfit text-gray-600 text-center">
                Rocco's es más que un restaurante. Es un lugar donde te sentís en casa, con sabores que abrazan.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>
      
      {/* Gallery Section with enhanced visuals */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="w-full py-20 mt-16 relative overflow-hidden bg-[#A82531]"
      >
        
        {/* Gallery Title */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-outfit font-bold text-5xl md:text-6xl lg:text-7xl text-[#FAF4E1]"
          >
            Galería :)
          </motion.h2>
        </div>
        
        {/* Simple Gallery Grid */}
        <div className="max-w-[1400px] mx-auto px-4 relative">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative inline-block w-full break-inside-avoid mb-4"
              >
                {/* Marco del cuadro simplificado */}
                <div className={`bg-[#FAF4E1] p-3 rounded-sm shadow-md ${img.rotation}`}>
                  <div className="border-[6px] border-[#E6C163] overflow-hidden rounded-sm">
                    <img
                      src={img.src}
                      alt={`Rocco's memories ${index + 1}`}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default HistorySection;