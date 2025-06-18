import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

const images = [
	"https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
	"https://images.unsplash.com/photo-1609220136736-443140cffec6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
	"https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
	"https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
	"https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80",
];

export const HeroCarousel: React.FC = () => {
	return (
		<Swiper
			modules={[Autoplay, EffectFade]}
			effect="fade"
			loop={true}
			autoplay={{
				delay: 5000,
				disableOnInteraction: false,
			}}
			className="w-full h-[60vh]">
			{images.map((src, index) => (
				<SwiperSlide key={index} className="w-full h-full">
					<img
						src={src}
						alt={`Carousel slide ${index + 1}`}
						width={500}
						height={600}
						className="rounded-2xl shadow-2xl w-full h-full object-cover"
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};
