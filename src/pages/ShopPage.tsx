import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CartContext } from "../contexts/cart-context";
import type { Product } from "../types/product";

export const ShopPage: React.FC = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const cartContext = useContext(CartContext);
	if (!cartContext) {
		throw new Error("CartContext must be used within a CartProvider");
	}
	const { addToCart } = cartContext;

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			setLoading(true);
			const { data, error } = await supabase.from("products").select("*");

			if (error) throw error;
			// Map the data to match the Product type
			const formattedProducts = (data || []).map(
				dbProduct =>
					({
						product: dbProduct.product,
						image_url: dbProduct.image_url,
						name: dbProduct.name,
						description: dbProduct.description,
						price: dbProduct.price,
						stock: dbProduct.stock || 0,
					} as Product)
			);
			setProducts(formattedProducts);
		} catch (err) {
			setError("Failed to fetch products");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	if (loading) return <div className="text-center py-12">Loading...</div>;
	if (error)
		return <div className="text-center text-red-500 py-12">{error}</div>;

	return (
		<div className="fade-in" id="shop">
			<section className="py-20">
				<div className="container mx-auto px-6">
					<h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
						Shop Our Toolkit & Accessories
					</h1>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
						{products.map(product => (
							<Link
								to={`/shop/product/${product.product}`}
								key={product.product}
								className="block h-full">
								<Card className="overflow-hidden h-full flex flex-col">
									<CardHeader className="p-0">
										<img
											src={product.image_url}
											alt={product.name}
											className="w-full h-56 object-cover"
										/>
									</CardHeader>
									<CardContent className="p-6 flex-grow">
										<CardTitle className="text-xl mb-2">
											{product.name}
										</CardTitle>
										<CardDescription className="text-gray-600 mb-4 line-clamp-3">
											{product.description}
										</CardDescription>
									</CardContent>
									<CardFooter className="flex justify-between items-center p-6 pt-0 mt-auto">
										<span className="text-2xl font-bold text-primary">
											KSh.{product.price.toFixed(2)}
										</span>
										<Button
											className="rounded-full"
											onClick={e => {
												e.preventDefault();
												e.stopPropagation();
												addToCart(product);
											}}
											onMouseDown={e =>
												e.stopPropagation()
											}>
											Add to Cart
										</Button>
									</CardFooter>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};
