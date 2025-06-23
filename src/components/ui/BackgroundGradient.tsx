export const BackgroundGradient = () => (
	<div className="fixed inset-0 -z-10 pointer-events-none">
		{/* Main darkened linear gradient - stays dark */}
		<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-950 via-teal-900/95 to-cyan-950 opacity-100" />
		{/* Large radial highlight - more visible, less blur, more saturated */}
		<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110vw] h-[110vw] bg-gradient-radial from-teal-400/30 via-teal-700/0 to-transparent opacity-60 blur-2xl" />
		{/* Bottom right shadow - more visible, less blur, more cyan */}
		<div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-cyan-700/70 via-teal-900/70 to-transparent opacity-80 blur-xl" />
		{/* Accent radial - more defined, higher opacity, less blur */}
		<div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-radial from-cyan-400/40 via-transparent to-transparent opacity-50 blur" />
	</div>
);
