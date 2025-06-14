import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./contexts/useCart";
import type { Product } from "./types/product";
import { Button } from "./components/ui/button";
import { toast } from "sonner";

export const ProductDetail = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { products, getProductById, loading, error } = useProducts();
	const { addToCart } = useCart();
	const [product, setProduct] = useState<Product | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const handleAddToCart = () => {
		if (!product) return;
		
		if (product.stock <= 0) {
			toast.error("This product is out of stock");
			return;
		}

		addToCart(product, 1);
		toast.success(`${product.name} added to cart`);
	};

	useEffect(() => {
		const loadProduct = async () => {
			if (!id) {
				navigate("/shop");
				return;
			}

			setIsLoading(true);

			try {
				// Small delay to ensure products are loaded
				await new Promise(resolve => setTimeout(resolve, 100));

				const foundProduct = getProductById(id);
				if (foundProduct) {
					setProduct(foundProduct);
				} else if (!loading) {
					navigate("/not-found");
				}
			} catch (error) {
				console.error("Error loading product:", error);
				toast.error("Error loading product. Please try again.");
			} finally {
				setIsLoading(false);
			}
		};

		loadProduct();
	}, [id, products, loading, navigate, getProductById]);

	if (isLoading || loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
				<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
				<p className="text-gray-600">Loading product details...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="text-center py-12">
				<p className="text-red-500 mb-4">Error loading product</p>
				<Button
					onClick={() => window.location.reload()}
					className="bg-blue-600 hover:bg-blue-700 text-white">
					Retry
				</Button>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-bold text-gray-800 mb-2">
					Product Not Found
				</h2>
				<p className="text-gray-600 mb-6">
					The product you're looking for doesn't exist or has been
					removed.
				</p>
				<Button
					onClick={() => navigate("/shop")}
					className="bg-blue-600 hover:bg-blue-700 text-white">
					Back to Shop
				</Button>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
				{/* Product Image */}
				<div className="relative">
					<img
						src={product.image}
						alt={product.name}
						className="w-full h-auto rounded-lg shadow-lg"
					/>
				</div>

				{/* Product Info */}
				<div className="space-y-6">
					<h1 className="text-3xl font-bold text-gray-900">
						{product.name}
					</h1>

					<div className="flex items-center">
						<p className="text-2xl font-bold text-gray-900">
							KSh{product.price.toFixed(2)}
						</p>
						<span className="ml-4 px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">
							{product.stock > 0
								? `In Stock (${product.stock} available)`
								: "Out of Stock"}
						</span>
					</div>

					<div className="space-y-4">
						<h2 className="text-lg font-semibold text-gray-700">
							Product Details
						</h2>
						<p className="text-gray-600">{product.description}</p>
					</div>

					<div className="pt-4">
						<Button
							className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg"
							onClick={handleAddToCart}
							disabled={product.stock === 0}>
							{product.stock > 0 ? "Add to Cart" : "Out of Stock"}
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
