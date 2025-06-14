import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import type { Product } from "../types/product";

export const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const getProductById = useCallback(
		async (id: string): Promise<Product | null> => {
			if (!id) return null;

			setLoading(true);
			try {
				const { data, error: supabaseError } = await supabase
					.from("products")
					.select("*")
					.eq("product", id)
					.single();

				if (supabaseError) {
					throw supabaseError;
				}

				return data;
			} catch (err) {
				console.error(`Error fetching product ${id}:`, err);
				setError(err as Error);
				return null;
			} finally {
				setLoading(false);
			}
		},
		[]
	);

	const fetchProducts = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const { data, error: supabaseError } = await supabase
				.from("products")
				.select("*");

			if (supabaseError) {
				throw supabaseError;
			}

			setProducts(data || []);
		} catch (err) {
			setError(err as Error);
			console.error("Error fetching products:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return {
		products,
		loading,
		error,
		refetch: fetchProducts,
		getProductById,
	};
};
