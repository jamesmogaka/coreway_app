import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Sidebar } from "./components/admin/Sidebar";
import { StatsCards } from "./components/admin/StatsCards";
import { ProductsTable } from "./components/admin/ProductsTable";
import { OrdersTable } from "./components/admin/OrdersTable";
import { ProductFormDialog } from "./components/admin/ProductFormDialog";
import { DeleteDialog } from "./components/admin/DeleteDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import type { Order, Product } from "./types/admin";
import { initialOrders } from "./types/admin";
import { useProducts } from "./hooks/useProducts";
import { supabase } from "./lib/supabase";

export function AdminDashboard() {
	const [activeTab, setActiveTab] = useState("products");
	const {
		products: supabaseProducts,
		loading,
		error,
		refetch,
	} = useProducts();
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		if (supabaseProducts) {
			const adminProducts = supabaseProducts.map(p => ({
				id: p.product,
				product: p.product,
				name: p.name,
				description: p.description,
				price: p.price,
				stock: p.stock,
				image_url: p.image_url || "",
			}));
			setProducts(adminProducts);
		}
	}, [supabaseProducts]);

	const [orders, setOrders] = useState<Order[]>(initialOrders);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(
		null
	);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [productToDelete, setProductToDelete] = useState<string | null>(null);

	// Form state
	const [formData, setFormData] = useState<Omit<Product, "id">>({
		product: "",
		name: "",
		description: "",
		price: 0,
		stock: 0,
		image_url: "",
	});

	// Handle form input changes
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]:
				name === "price" || name === "stock"
					? parseFloat(value) || 0
					: value,
		}));
	};

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Fields from the form
		const productData = {
			product: formData.product,
			name: formData.name,
			description: formData.description,
			price: formData.price,
			stock: formData.stock,
			image_url: formData.image_url,
		};

		if (selectedProduct) {
			// Update existing product - only update fields from the form
			const { error } = await supabase
				.from("products")
				.update(productData)
				.eq("product", selectedProduct.product);

			if (error) {
				toast.error(`Failed to update product: ${error.message}`);
			} else {
				toast.success("Product updated successfully");
				refetch();
			}
		} else {
			// Add new product - exclude the product ID as it's auto-generated
			const { product: _, ...newProductData } = productData;
			const { error } = await supabase
				.from("products")
				.insert([newProductData]);

			if (error) {
				toast.error(`Failed to add product: ${error.message}`);
			} else {
				toast.success("Product added successfully");
				refetch();
			}
		}

		// Reset form and close dialog
		setFormData({
			product: "",
			name: "",
			description: "",
			price: 0,
			stock: 0,
			image_url: "",
		});
		setSelectedProduct(null);
		setIsDialogOpen(false);
	};

	// Handle edit product
	const handleEdit = (product: Product) => {
		setSelectedProduct(product);
		setFormData({
			product: product.product,
			name: product.name,
			description: product.description,
			price: product.price,
			stock: product.stock,
			image_url: product.image_url,
		});
		setIsDialogOpen(true);
	};

	// Handle delete product
	const handleDelete = (productId: string) => {
		setProductToDelete(productId);
		setIsDeleteDialogOpen(true);
	};

	const confirmDelete = async () => {
		if (productToDelete) {
			const { error } = await supabase
				.from("products")
				.delete()
				.eq("product", productToDelete);

			if (error) {
				toast.error(`Failed to delete product: ${error.message}`);
			} else {
				toast.success("Product deleted successfully");
				refetch();
			}
			setIsDeleteDialogOpen(false);
			setProductToDelete(null);
		}
	};

	// Update order status
	const updateOrderStatus = (orderId: string, status: Order["status"]) => {
		setOrders(
			orders.map(order =>
				order.id === orderId ? { ...order, status } : order
			)
		);
		toast.success(`Order ${orderId} status updated to ${status}`);
	};

	// Calculate dashboard stats
	const totalProducts = products.length;
	const totalOrders = orders.length;
	const pendingOrders = orders.filter(
		order => order.status === "pending"
	).length;
	const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

	const onAddNew = () => {
		setSelectedProduct(null);
		setFormData({
			product: "",
			name: "",
			description: "",
			price: 0,
			stock: 0,
			image_url: "",
		});
		setIsDialogOpen(true);
	};

	return (
		<div className="flex min-h-screen bg-gray-100">
			<Sidebar />

			{/* Main Content */}
			<div className="flex-1 p-8">
				<div className="mb-8">
					<h1 className="text-2xl font-bold">Admin Dashboard</h1>
					<p className="text-gray-600">
						Welcome back! Here's what's happening with your store.
					</p>
				</div>

				<StatsCards
					totalProducts={totalProducts}
					totalOrders={totalOrders}
					pendingOrders={pendingOrders}
					totalRevenue={totalRevenue}
				/>

				<Tabs
					value={activeTab}
					onValueChange={setActiveTab}
					className="mt-8">
					<TabsList>
						<TabsTrigger value="products">Products</TabsTrigger>
						<TabsTrigger value="orders">Orders</TabsTrigger>
					</TabsList>
					<TabsContent value="products">
						{loading && <p>Loading products...</p>}
						{error && (
							<p className="text-red-500">{error.message}</p>
						)}
						{!loading && !error && (
							<ProductsTable
								products={products}
								onEdit={handleEdit}
								onDelete={handleDelete}
								onAddNew={onAddNew}
							/>
						)}
					</TabsContent>
					<TabsContent value="orders">
						<OrdersTable
							orders={orders}
							onStatusChange={updateOrderStatus}
						/>
					</TabsContent>
				</Tabs>
			</div>

			{/* Product Form Dialog */}
			<ProductFormDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				product={formData}
				onSubmit={handleSubmit}
				onInputChange={handleInputChange}
				isEditing={!!selectedProduct}
			/>

			{/* Delete Confirmation Dialog */}
			<DeleteDialog
				open={isDeleteDialogOpen}
				onOpenChange={setIsDeleteDialogOpen}
				onConfirm={confirmDelete}
				itemName={
					products.find(p => p.product === productToDelete)?.name ||
					"this product"
				}
			/>
		</div>
	);
}
