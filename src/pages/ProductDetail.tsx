import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../contexts/useCart";
import type { Product } from "../types/product";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  const handleAddToCart = useCallback(() => {
    if (!product) return;

    if (product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  }, [product, addToCart]);

  const handleRetry = useCallback(() => window.location.reload(), []);
  const handleBackToShop = useCallback(() => navigate("/shop"), [navigate]);
  const showDescription = useCallback(() => setActiveTab("description"), []);
  const showReviews = useCallback(() => setActiveTab("reviews"), []);

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        navigate("/shop");
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const productData = await getProductById(id);
        if (productData === null) {
          throw new Error("Product not found");
        }
        setProduct(productData);
      } catch (err) {
        console.error("Error loading product:", err);
        const error = err as Error;
        setError(error);
        toast.error(
          error.message || "Error loading product. Please try again."
        );
        navigate("/shop");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id, getProductById, navigate]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 bg-[#096B68]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFFBDE]"></div>
        <p className="text-[#FFFBDE]">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-[#096B68]">
        <p className="text-red-400 mb-4">Error: {error.message}</p>
        <Button
          onClick={handleRetry}
          className="bg-[#FFD59A] text-[#3A3A3A] hover:bg-[#FFAD60]"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-12 bg-[#096B68]">
        <h2 className="text-2xl md:text-4xl font-bold text-[#FFFBDE] mb-4">
          Product Not Found
        </h2>
        <p className="text-base md:text-xl text-[#90D1CA] mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={handleBackToShop}
          className="bg-[#FFD59A] text-[#3A3A3A] hover:bg-[#FFAD60]"
        >
          Back to Shop
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-[#096B68] min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#129990] rounded-lg shadow-lg p-8 md:grid md:grid-cols-2 md:gap-8">
          {/* Product Image */}
          <div className="rounded-lg overflow-hidden">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
              />
            )}
          </div>

          {/* Product Info */}
          <div className="mt-8 md:mt-0">
            <h1 className="text-3xl md:text-5xl font-bold text-[#FFFBDE]">
              {product.name}
            </h1>

            <div className="mt-4">
              <p className="text-2xl md:text-4xl font-bold text-[#FFD59A]">
                KSh{product.price.toFixed(2)}
              </p>
            </div>

            <div className="mt-6">
              <span
                className={`px-3 py-1 text-sm rounded-full ${
                  product.stock > 0
                    ? "bg-green-200 text-green-900"
                    : "bg-red-200 text-red-900"
                }`}
              >
                {product.stock > 0
                  ? `In Stock (${product.stock} available)`
                  : "Out of Stock"}
              </span>
              {product.stock <= 5 && product.stock > 0 && (
                <p className="text-sm text-amber-400 mt-2">
                  Only {product.stock} left in stock!
                </p>
              )}
            </div>

            <div className="mt-8">
              <Button
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="w-full bg-[#FFD59A] text-[#3A3A3A] font-bold py-3 rounded-lg shadow-md hover:bg-[#FFAD60] transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? "Buy Now" : "Out of Stock"}
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="border-b border-[#90D1CA]">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={showDescription}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 ${activeTab === "description" ? "border-[#FFD59A] text-[#FFFBDE]" : "border-transparent text-[#90D1CA] hover:text-[#FFFBDE] hover:border-[#FFD59A]"}`}
              >
                Description
              </button>
              <button
                onClick={showReviews}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg transition-colors duration-300 ${activeTab === "reviews" ? "border-[#FFD59A] text-[#FFFBDE]" : "border-transparent text-[#90D1CA] hover:text-[#FFFBDE] hover:border-[#FFD59A]"}`}
              >
                Reviews
              </button>
            </nav>
          </div>
          <div className="py-8">
            {activeTab === "description" && (
              <p className="text-base md:text-xl">{product.description}</p>
            )}
            {activeTab === "reviews" && (
              <div>
                <h3 className="text-2xl md:text-4xl font-bold text-[#FFFBDE] mb-4">
                  Customer Reviews
                </h3>
                <p className="text-[#90D1CA]">No reviews yet.</p>
                {/* Future implementation for reviews can go here */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

