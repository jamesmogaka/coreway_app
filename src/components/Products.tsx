import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HashLink } from "react-router-hash-link";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../contexts/useCart";
import { Swiper, SwiperSlide, type SwiperRef } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/swiper-bundle.css";
import type { Product } from "../types/product";

const ProductCard: React.FC<{ product: Product; isBack?: boolean }> = ({
	product,
	isBack = false,
}) => {
	const { addToCart } = useCart();

	const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		addToCart(product);
	};

	return (
	<div
		className={`absolute inset-0 w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col group ${isBack ? "rotate-y-180" : ""}`}
		style={{
			backfaceVisibility: "hidden",
			WebkitBackfaceVisibility: "hidden",
		}}>
		<div className="relative h-48 w-full overflow-hidden">
			<img
				src={product.image_url}
				alt={product.name}
				className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
			/>
			<div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
		</div>
		<div className="p-4 flex flex-col flex-1">
			<h3 className="font-bold text-xl mb-2 text-gray-800 dark:text-white truncate">
				{product.name}
			</h3>
			<p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1 overflow-hidden relative">
				<span className="line-clamp-3">{product.description}</span>
			</p>
			<div className="flex justify-between items-center mt-auto">
				<span className="text-teal-600 dark:text-teal-400 font-extrabold text-2xl">
					KSh {product.price.toLocaleString()}
				</span>
				{product.stock > 0 ? (
					<HoverBorderGradient
						containerClassName="rounded-full"
						as="button"
						className="bg-white dark:bg-black text-black dark:text-white flex items-center space-x-2 px-4 py-2"
						onClick={handleAddToCart}>
						<ShoppingCart className="h-5 w-5" />
						<span>Add to Cart</span>
					</HoverBorderGradient>
				) : (
					<Button
						disabled
						className="rounded-full bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed flex items-center space-x-2 px-4 py-2">
						<span>Out of stock</span>
					</Button>
				)}
			</div>
		</div>
	</div>
	);
};

const FlipCard: React.FC<{
	frontProduct: Product;
	backProduct: Product;
	isFlipped: boolean;
	index: number;
}> = ({ frontProduct, backProduct, isFlipped, index }) => {
	return (
		<motion.div
			className="relative w-full h-full"
			style={{ transformStyle: "preserve-3d" }}
			animate={{ rotateY: isFlipped ? 180 : 0 }}
			transition={{
				ease: "easeIn",
				duration: 0.5,
				delay: index * 0.1,
			}}>
			<ProductCard product={frontProduct} isBack={false} />
			<ProductCard product={backProduct} isBack={true} />
		</motion.div>
	);
};

const ProductsCarousel: React.FC = () => {
	const { products, loading, error } = useProducts();
	const [selected_category, set_selected_category] = useState<string | null>(null);
	const [previous_category, set_previous_category] = useState<string | null>(null);
	const [is_flipped, set_is_flipped] = useState(false);
	const [is_transitioning, set_is_transitioning] = useState(false);
	const [is_hovering, set_is_hovering] = useState(false);
	const swiper_ref = useRef<SwiperRef | null>(null);

	const categories = useMemo(() => {
		const category_list = products
			.map(p => p.category)
			.filter(c => c && c.id && c.name) as { id: string; name: string }[];
		const unique: { id: string; name: string }[] = [];
		category_list.forEach(cat => {
			if (!unique.some(u => u.id === cat.id)) {
				unique.push(cat);
			}
		});
		return unique;
	}, [products]);

	useEffect(() => {
		if (!selected_category && categories.length > 0) {
			const firstId = categories[0].id;
			set_selected_category(firstId);
			set_previous_category(firstId);
		}
	}, [categories, selected_category]);

	const current_products = useMemo(() => {
		if (!selected_category) return [];
		return products.filter(
			p => p.category && p.category.id === selected_category
		);
	}, [products, selected_category]);

	const previous_products = useMemo(() => {
		if (!previous_category) return [];
		return products.filter(
			p => p.category && p.category.id === previous_category
		);
	}, [products, previous_category]);

	const maxProducts = useMemo(() => {
		const categoryCounts = categories.map(
			cat => products.filter(p => p.category && p.category.id === cat.id).length
		);
		return Math.max(0, ...categoryCounts);
	}, [categories, products]);

	const card_pairs = useMemo(() => {
		const placeholderTemplate: Omit<Product, "product_id"> = {
			name: "No Product",
			description: "This spot is awaiting a new discovery!",
			price: 0,
			image_url: "https://via.placeholder.com/150",
			category: { id: "none", name: "None" },
			stock: 0,
			age_range: "",
		};

		const frontFaceProducts = !is_flipped ? current_products : previous_products;
		const backFaceProducts = is_flipped ? current_products : previous_products;

		const pairs = [];
		for (let i = 0; i < maxProducts; i++) {
			pairs.push({
				front: frontFaceProducts[i] || { ...placeholderTemplate, product_id: `ph-front-${i}` },
				back: backFaceProducts[i] || { ...placeholderTemplate, product_id: `ph-back-${i}` },
			});
		}
		return pairs;
	}, [current_products, previous_products, is_flipped, maxProducts]);

	const handle_category_change = useCallback(
		(new_category: string) => {
			if (is_transitioning || new_category === selected_category) return;

			set_is_transitioning(true);
			set_previous_category(selected_category);
			set_selected_category(new_category);
			set_is_flipped(prev => !prev);

			const flip_duration = 500 + (maxProducts > 0 ? maxProducts - 1 : 0) * 100;

			setTimeout(() => {
				set_is_transitioning(false);
			}, flip_duration);
		},
		[selected_category, is_transitioning, maxProducts]
	);

	useEffect(() => {
		if (is_transitioning || categories.length <= 1 || is_hovering) {
			return;
		}

		const timer = setInterval(() => {
			const current_index = categories.findIndex(cat => cat.id === selected_category);
			const next_index = (current_index + 1) % categories.length;
			const next_category_id = categories[next_index].id;
			handle_category_change(next_category_id);
		}, 7000);

		return () => clearInterval(timer);
	}, [
		categories,
		selected_category,
		is_transitioning,
		handle_category_change,
		is_hovering,
	]);

	if (loading) return <div>Loading products...</div>;
	if (error) return <div>Error: {(error as Error).message}</div>;
	if (products.length === 0) return <div>No products found.</div>;
	if (!selected_category) {
		return <div>Initializing products...</div>;
	}

	return (
		<div className="w-full max-w-6xl mx-auto py-8">
			<div className="flex flex-col items-center mb-4">
				<Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 mb-4">
					Products
				</Badge>
				<h2 className="mt-2 text-5xl font-extrabold text-center tracking-tight text-yellow-50 relative mb-2">
					Products we offer
					<span className="block mx-auto mt-2 h-1 w-16 rounded bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 opacity-80"></span>
				</h2>
			</div>

			<div className="relative">
				<Swiper
					ref={swiper_ref}
					modules={[Navigation, Pagination]}
					navigation
					pagination={{ clickable: true }}
					speed={500}
					allowTouchMove={true}
					spaceBetween={24}
					slidesPerView={"auto"}
					breakpoints={{
						320: { slidesPerView: 1 },
						640: { slidesPerView: 2 },
						1024: { slidesPerView: 3 },
					}}
					className="product-swiper">
					{card_pairs.map((pair, index) => {
						const isVisible = index < current_products.length;

						return (
							<SwiperSlide key={`slide-${index}`}>
								<motion.div
									onMouseEnter={() => set_is_hovering(true)}
									onMouseLeave={() => set_is_hovering(false)}
									className="h-[28rem]"
									style={{ perspective: "1000px" }}
									animate={{ opacity: isVisible ? 1 : 0 }}
									transition={{ duration: 0.3 }}>
									<FlipCard
										frontProduct={pair.front}
										backProduct={pair.back}
										isFlipped={is_flipped}
										index={index}
									/>
								</motion.div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</div>

			<div className="flex justify-center mt-4">
				{categories.map(cat => (
					<button
						key={cat.id}
						className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 focus:outline-none border border-gray-300 transform hover:scale-110 ${
							selected_category === cat.id
								? "bg-white shadow-lg"
								: "bg-gray-400 hover:bg-gray-300"
						}`}
						style={{ cursor: "pointer" }}
						aria-label={`Go to category ${cat.name}`}
						onClick={() => handle_category_change(cat.id)}
						disabled={is_transitioning}
					/>
				))}
			</div>

			<div className="flex justify-center mt-10">
				<HashLink to="/products#">
					<Button
						size="lg"
						className="text-white font-semibold px-8 py-3 rounded-lg shadow-lg text-lg flex items-center justify-center gap-2 transition-all duration-200 border-2 border-yellow-50 hover:shadow-xl transform hover:scale-105"
						style={{
							background:
								"linear-gradient(to right, #14b8a6 0%, #14b8a6cc 40%, #14b8a644 60%, transparent 100%)",
						}}>
						View Products
						<span className="ml-2 flex items-center">
							<ArrowRight className="w-5 h-5" />
						</span>
					</Button>
				</HashLink>
			</div>
            <style>{`
                .rotate-y-180 {
                    transform: rotateY(180deg);
                }
            `}</style>
		</div>
	);
};

export default ProductsCarousel;
