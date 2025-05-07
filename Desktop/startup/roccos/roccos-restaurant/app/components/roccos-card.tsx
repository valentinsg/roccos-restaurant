const RoccosCard = () => {
  const whatsappMessage = encodeURIComponent("¡Hola! Me gustaría hacer una reserva para la mesa VIP de Rocco's 🍕✨");
  const whatsappLink = `https://wa.me/+542245439331?text=${whatsappMessage}`;

  return (
    <div className="card">
      <div
        className="relative bg-[#A82531] w-[380px] sm:w-[400px] group transition-all duration-700 aspect-video flex items-center justify-center"
      >
        <div
          className="transition-all flex flex-col items-center py-5 justify-start duration-300 group-hover:duration-1000 bg-[#FAF4E1] w-full h-full absolute group-hover:-translate-y-28"
        >
          <p className="text-xl font-outfit sm:text-2xl font-bold text-[#A82531] font-playfair">
            Mesa VIP Rocco&apos;s
          </p>
          <p className="px-10 text-[12px] font-outfit sm:text-[12px] text-[#111111] font-lora mt-2">
            Te invitamos a vivir una experiencia gastronómica única.
          </p>
          <p className="font-outfit text-[12px] sm:text-[12px] text-[#111111]">
            Reservá tu mesa especial y disfrutá de un ambiente exclusivo.
          </p>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="font-outfit mt-4 bg-[#A82531] text-[#FFE566] px-4 py-2 rounded-lg text-[10px] sm:text-[12px] font-medium hover:bg-[#7B2D26] transition-colors duration-300 shadow-md hover:shadow-lg"
          >
            Reservar por WhatsApp
          </a>
        </div>
        <button
          className="seal bg-[#A82531] text-[#FFE566] w-12 aspect-square rounded-full z-40 text-[10px] flex items-center justify-center font-semibold [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)] group-hover:opacity-0 transition-all duration-1000 group-hover:scale-0 group-hover:rotate-180 border-4 border-[#8a1e28]"
        >
          <span className="rotate-45 font-outfit">VIP</span>
        </button>
        <div
          className="tp transition-all duration-1000 group-hover:duration-100 bg-[#A82531] absolute group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)] w-full h-full [clip-path:polygon(50%_50%,_100%_0,_0_0)]"
        ></div>
        <div
          className="lft transition-all duration-700 absolute w-full h-full bg-[#7B2D26] [clip-path:polygon(50%_50%,_0_0,_0_100%)]"
        ></div>
        <div
          className="rgt transition-all duration-700 absolute w-full h-full bg-[#A82531] [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]"
        ></div>
        <div
          className="btm transition-all duration-700 absolute w-full h-full bg-[#7B2D26] [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]"
        ></div>
      </div>
    </div>

  );
};

export default RoccosCard;