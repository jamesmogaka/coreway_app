import aboutPattern from "@/assets/patterns/about-pattern.svg";

export const SidebarGradient = () => (
  <div className="absolute inset-0 -z-10 pointer-events-none">
    <img
      src={aboutPattern}
      alt="decorative pattern"
      className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay pointer-events-none select-none"
    />
    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-700/80 via-teal-600/60 to-cyan-700/40 opacity-100" />
    <div className="absolute top-[-10%] left-[60%] w-[38vw] h-[38vw] bg-gradient-radial from-orange-400/20 via-transparent to-transparent opacity-40 blur-2xl rotate-12" />
    <div className="absolute bottom-[-18%] right-[-10%] w-[54vw] h-[54vw] bg-gradient-radial from-cyan-300/20 via-transparent to-transparent opacity-30 blur-2xl" />
  </div>
);
