import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "../../components/ui/tabs";
import { ProductsTable } from "../../components/admin/ProductsTable";
import { OrdersTable } from "../../components/admin/OrdersTable";
import { BlogTable } from "../../components/admin/BlogTable";
import { useState, useEffect } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import type {
	Order,
	OrderStatus,
	FetchedOrder,
	ShippingAddress,
} from "../../types/admin";
import type {
	Product,
	Category,
	Value,
	ProductContent,
	ProductFeature,
} from "../../types/product";
import type { BlogPost } from "../../types/blog";
import { ProductFormDialog } from "../../components/admin/ProductFormDialog";
import { BlogFormDialog } from "../../components/admin/BlogFormDialog";
import { DeleteDialog } from "../../components/admin/DeleteDialog";

const initialProductState: Partial<Product> = {
	name: "",
	description: "",
	price: 0,
	stock: 0,
	image_url: "",
	category_id: "",
	contents: [],
	features: [],
	values: [],
};

const initialBlogPostState: Partial<BlogPost> = {
	title: "",
	content: "",
	summary: "",
	is_published: false,
};

export function AdminDashboard() {
	const { products, loading, error, refetch } = useProducts();
	const navigate = useNavigate();

	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [currentProduct, setCurrentProduct] =
		useState<Partial<Product>>(initialProductState);
	const [isEditing, setIsEditing] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [productToDelete, setProductToDelete] = useState<string | null>(null);
	const [productToDeleteName, setProductToDeleteName] = useState<string>("");

	// Blog state
	const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
	const [isBlogFormDialogOpen, setIsBlogFormDialogOpen] = useState(false);
	const [currentPost, setCurrentPost] =
		useState<Partial<BlogPost>>(initialBlogPostState);
	const [isEditingPost, setIsEditingPost] = useState(false);
	const [postToDelete, setPostToDelete] = useState<string | null>(null);
	const [postToDeleteName, setPostToDeleteName] = useState<string>("");
	const [isBlogDeleteDialogOpen, setIsBlogDeleteDialogOpen] = useState(false);

	// Orders state
	const [orders, setOrders] = useState<Order[]>([]);

	const [categories, setCategories] = useState<Category[]>([]);
	const [values, setValues] = useState<Value[]>([]);

	useEffect(() => {
		const fetchInitialData = async () => {
			const { data: categoriesData, error: categoriesError } =
				await supabase.from("categories").select("*");
			if (categoriesError) {
				toast.error("Failed to fetch categories");
			} else {
				setCategories(categoriesData);
			}

			const { data: valuesData, error: valuesError } = await supabase
				.from("values")
				.select("*");
			if (valuesError) {
				toast.error("Failed to fetch values");
			} else {
				setValues(valuesData);
			}

			const { data: blogData, error: blogError } = await supabase
				.from("blog_posts")
				.select("*");
			if (blogError) {
				toast.error("Failed to fetch blog posts");
			} else {
				setBlogPosts(blogData);
			}

			await fetchOrders();
		};
		fetchInitialData();
	}, []);

	const handleEdit = async (product: Product) => {
		const { data: contents, error: contentsError } = await supabase
			.from("product_contents")
			.select("*")
			.eq("product_id", product.product_id);
		const { data: features, error: featuresError } = await supabase
			.from("product_features")
			.select("*")
			.eq("product_id", product.product_id);
		const { data: productValues, error: valuesError } = await supabase
			.from("product_values")
			.select("value_id")
			.eq("product_id", product.product_id);

		if (contentsError || featuresError || valuesError) {
			toast.error("Failed to fetch product details.");
			return;
		}

		const selectedValueIds = productValues?.map(v => v.value_id) || [];
		const selectedValues = values.filter(v =>
			selectedValueIds.includes(v.id)
		);

		setCurrentProduct({
			...product,
			contents: contents || [],
			features: features || [],
			values: selectedValues,
		});
		setIsEditing(true);
		setIsDialogOpen(true);
	};

	const handleDeleteClick = (productId: string, productName: string) => {
		setProductToDelete(productId);
		setProductToDeleteName(productName);
		setDeleteDialogOpen(true);
	};

	const handleDelete = async () => {
		if (!productToDelete) return;

		try {
			const { error } = await supabase
				.from("products")
				.delete()
				.eq("product_id", productToDelete);

			if (error) throw error;

			toast.success("Product deleted successfully");
			setDeleteDialogOpen(false);
			refetch();
		} catch (err) {
			toast.error(`Error deleting product: ${(err as Error).message}`);
		} finally {
			setProductToDelete(null);
			setProductToDeleteName("");
		}
	};

	const handleAddNew = () => {
		setCurrentProduct(initialProductState);
		setIsEditing(false);
		setIsDialogOpen(true);
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setCurrentProduct(prev => ({
			...prev,
			[name]:
				name === "price" || name === "stock"
					? parseFloat(value) || 0
					: value,
		}));
	};

	const handleCategoryChange = (categoryId: string) => {
		setCurrentProduct(prev => ({ ...prev, category_id: categoryId }));
	};

	const handleValuesChange = (valueIds: string[]) => {
		const selectedValues = values.filter(v => valueIds.includes(v.id));
		setCurrentProduct(prev => ({ ...prev, values: selectedValues }));
	};

	const handleContentChange = (contents: ProductContent[]) => {
		setCurrentProduct(prev => ({ ...prev, contents }));
	};

	const handleFeatureChange = (features: ProductFeature[]) => {
		setCurrentProduct(prev => ({ ...prev, features }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!currentProduct) return;

		try {
			let productId = currentProduct.product_id;
			const { contents, features, values, ...productData } =
				currentProduct;

			if (isEditing) {
				const { error } = await supabase
					.from("products")
					.update(productData)
					.eq("product_id", productId);
				if (error) throw error;
				toast.success("Product updated successfully");
			} else {
				const { data, error } = await supabase
					.from("products")
					.insert([productData])
					.select("product_id")
					.single();
				if (error) throw error;
				productId = data.product_id;
				toast.success("Product created successfully");
			}

			if (!productId) throw new Error("Product ID not found");

			// Handle contents
			await supabase
				.from("product_contents")
				.delete()
				.eq("product_id", productId);
			if (contents && contents.length > 0) {
				const contentsToInsert = contents.map(c => ({
					...c,
					product_id: productId,
				}));
				await supabase
					.from("product_contents")
					.insert(contentsToInsert);
			}

			// Handle features
			await supabase
				.from("product_features")
				.delete()
				.eq("product_id", productId);
			if (features && features.length > 0) {
				const featuresToInsert = features.map(f => ({
					...f,
					product_id: productId,
				}));
				await supabase
					.from("product_features")
					.insert(featuresToInsert);
			}

			// Handle values
			await supabase
				.from("product_values")
				.delete()
				.eq("product_id", productId);
			if (values && values.length > 0) {
				const valuesToInsert = values.map(v => ({
					product_id: productId,
					value_id: v.id,
				}));
				await supabase.from("product_values").insert(valuesToInsert);
			}

			setIsDialogOpen(false);
			refetch();
		} catch (err) {
			toast.error(
				`Error ${isEditing ? "updating" : "creating"} product: ${
					(err as Error).message
				}`
			);
		}
	};

	const navigateToUsers = () => navigate("/admin/users");
	const navigateToContacts = () => navigate("/admin/contacts");

	const fetchOrders = async () => {
		const { data, error } = await supabase.from("orders").select(`
				*, 
				order_items (
					quantity,
					unit_price,
					products (name)
				)
			`);

		if (error) {
			toast.error("Failed to fetch orders");
			return;
		}

		const formattedOrders: Order[] = (data as FetchedOrder[]).map(
			(order: FetchedOrder) => {
				const shippingInfo: ShippingAddress = JSON.parse(
					order.delivery_address
				);
				const total = order.order_items.reduce(
					(sum, item) => sum + item.unit_price * item.quantity,
					0
				);
				return {
					id: order.id,
					shippingInfo: order.delivery_address,
					date: new Date(order.created_at).toLocaleDateString(),
					total,
					status: order.status,
					isPaid: order.is_paid,
					items: order.order_items.map(item => ({
						name: item.products?.name || "Unknown Product",
						quantity: item.quantity,
						price: item.unit_price,
					})),
					shippingAddress: shippingInfo,
				};
			}
		);
		setOrders(formattedOrders);
	};

	const handleStatusChange = async (orderId: string, status: OrderStatus) => {
		const { error } = await supabase
			.from("orders")
			.update({ status })
			.eq("id", orderId);

		if (error) {
			toast.error("Failed to update order status");
		} else {
			toast.success("Order status updated successfully");
			await fetchOrders(); // Refetch orders to show the update
		}
	};

	const refetchBlogPosts = async () => {
		const { data, error } = await supabase.from("blog_posts").select("*");
		if (error) {
			toast.error("Failed to refetch blog posts");
		} else {
			setBlogPosts(data);
		}
	};

	// Blog Handlers
	const handleAddNewPost = () => {
		setCurrentPost(initialBlogPostState);
		setIsEditingPost(false);
		setIsBlogFormDialogOpen(true);
	};

	const handleEditPost = (post: BlogPost) => {
		setCurrentPost(post);
		setIsEditingPost(true);
		setIsBlogFormDialogOpen(true);
	};

	const handleDeletePostClick = (postId: string, postTitle: string) => {
		setPostToDelete(postId);
		setPostToDeleteName(postTitle);
		setIsBlogDeleteDialogOpen(true);
	};

	const handleDeletePost = async () => {
		if (!postToDelete) return;

		try {
			const { error } = await supabase
				.from("blog_posts")
				.delete()
				.eq("id", postToDelete);

			if (error) throw error;

			toast.success("Blog post deleted successfully");
			setIsBlogDeleteDialogOpen(false);
			refetchBlogPosts();
		} catch (err) {
			toast.error(`Error deleting post: ${(err as Error).message}`);
		} finally {
			setPostToDelete(null);
			setPostToDeleteName("");
		}
	};

	const handleTogglePublish = async (post: BlogPost) => {
		try {
			const { error } = await supabase
				.from("blog_posts")
				.update({ is_published: !post.is_published })
				.eq("id", post.id);

			if (error) throw error;

			toast.success(
				`Post ${
					post.is_published ? "unpublished" : "published"
				} successfully`
			);
			refetchBlogPosts();
		} catch (err) {
			toast.error(
				`Error updating post status: ${(err as Error).message}`
			);
		}
	};

	const handleBlogInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		setCurrentPost(prev => ({ ...prev, [name]: value }));
	};

	const handlePublishChange = (is_published: boolean) => {
		setCurrentPost(prev => ({ ...prev, is_published }));
	};

	const handleBlogSubmit = async () => {
		if (!currentPost) return;

		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			toast.error("You must be logged in to create or update a post.");
			return;
		}

		try {
			const { title, summary, content, is_published } = currentPost;
			const postData = {
				title,
				summary,
				content,
				is_published,
				author_id: user.id,
			};

			if (isEditingPost && currentPost.id) {
				const { error } = await supabase
					.from("blog_posts")
					.update(postData)
					.eq("id", currentPost.id);
				if (error) throw error;
				toast.success("Post updated successfully");
			} else {
				const { error } = await supabase
					.from("blog_posts")
					.insert([postData]);
				if (error) throw error;
				toast.success("Post created successfully");
			}

			setIsBlogFormDialogOpen(false);
			refetchBlogPosts();
		} catch (err) {
			toast.error(
				`Error ${isEditingPost ? "updating" : "creating"} post: ${
					(err as Error).message
				}`
			);
		}
	};

	if (loading)
		return <div className="text-[#F5F5F5] text-center p-8">Loading...</div>;
	if (error)
		return (
			<div className="text-red-400 text-center p-8">
				Error loading products: {error.message}
			</div>
		);

	return (
		<div className="w-full">
			<ProductFormDialog
				open={isDialogOpen}
				onOpenChange={setIsDialogOpen}
				product={currentProduct}
				onSubmit={handleSubmit}
				onInputChange={handleInputChange}
				onCategoryChange={handleCategoryChange}
				onValuesChange={handleValuesChange}
				onContentChange={handleContentChange}
				onFeatureChange={handleFeatureChange}
				isEditing={isEditing}
				categories={categories}
				values={values}
			/>

			<DeleteDialog
				open={deleteDialogOpen}
				onOpenChange={setDeleteDialogOpen}
				onConfirm={handleDelete}
				itemName={productToDeleteName}
			/>

			<BlogFormDialog
				open={isBlogFormDialogOpen}
				onOpenChange={setIsBlogFormDialogOpen}
				post={currentPost}
				onSubmit={handleBlogSubmit}
				onInputChange={handleBlogInputChange}
				onPublishChange={handlePublishChange}
				isEditing={isEditingPost}
			/>

			<DeleteDialog
				open={isBlogDeleteDialogOpen}
				onOpenChange={setIsBlogDeleteDialogOpen}
				onConfirm={handleDeletePost}
				itemName={postToDeleteName}
			/>

			<div className="flex justify-between items-center mb-6">
				<h2 className="text-2xl font-bold text-[#FFD59A]">
					Recent Activity
				</h2>
				<div className="flex space-x-4">
					<button
						onClick={navigateToUsers}
						className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
						Manage Users
					</button>
					<button
						onClick={navigateToContacts}
						className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
						View Contact Submissions
					</button>
				</div>
			</div>

			<Tabs defaultValue="products" className="space-y-4">
				<TabsList className="bg-transparent p-0 mb-4 border-b border-white/20 rounded-none">
					<TabsTrigger value="products">Products</TabsTrigger>
					<TabsTrigger value="orders">Orders</TabsTrigger>
					<TabsTrigger value="blog">Blog</TabsTrigger>
				</TabsList>

				<TabsContent value="products">
					<ProductsTable
						products={products || []}
						onEdit={handleEdit}
						onDelete={handleDeleteClick}
						onAddNew={handleAddNew}
					/>
				</TabsContent>
				<TabsContent value="orders">
					<OrdersTable
						orders={orders}
						onStatusChange={handleStatusChange}
					/>
				</TabsContent>
				<TabsContent value="blog">
					<BlogTable
						posts={blogPosts}
						onEdit={handleEditPost}
						onDelete={handleDeletePostClick}
						onTogglePublish={handleTogglePublish}
						onAddNew={handleAddNewPost}
					/>
				</TabsContent>
			</Tabs>
		</div>
	);
}
