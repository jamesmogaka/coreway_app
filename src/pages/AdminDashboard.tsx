import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Sidebar } from "../components/admin/Sidebar";
import { StatsCards } from "../components/admin/StatsCards";
import { ProductsTable } from "../components/admin/ProductsTable";
import { OrdersTable } from "../components/admin/OrdersTable";
import { ProductFormDialog } from "../components/admin/ProductFormDialog";
import { DeleteDialog } from "../components/admin/DeleteDialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import type { Order, Product } from "../types/admin";
import { initialOrders } from "../types/admin";
import { useProducts } from "../hooks/useProducts";
import { supabase } from "../lib/supabase";

const initialFormData: Omit<Product, "id"> = {
  product: "",
  name: "",
  description: "",
  price: 0,
  stock: 0,
  image_url: "",
};

export function AdminDashboard() {
  // UI State
  const [activeTab, setActiveTab] = useState("products");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Data State
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Product, "id">>(initialFormData);

  // Fetching products
  const { products: supabaseProducts = [], loading, error, refetch } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (supabaseProducts) {
      const adminProducts = supabaseProducts.map((p) => ({
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

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedProduct) {
        const { error } = await supabase.from("products").update(formData).eq("product", selectedProduct.product);
        if (error) throw error;
        toast.success("Product updated successfully");
      } else {
        const { error } = await supabase.from("products").insert([formData]);
        if (error) throw error;
        toast.success("Product added successfully");
      }
      refetch();
      setIsDialogOpen(false);
      setSelectedProduct(null);
      setFormData(initialFormData);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData(product);
    setIsDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    setProductToDelete(productId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      const { error } = await supabase.from("products").delete().eq("product", productToDelete);
      if (error) throw error;
      toast.success("Product deleted successfully");
      refetch();
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const updateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status } : order)));
    toast.success(`Order ${orderId} status updated to ${status}`);
  };

  const onAddNew = () => {
    setSelectedProduct(null);
    setFormData(initialFormData);
    setIsDialogOpen(true);
  };

  // Derived State & Calculations
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((order) => order.status === "pending").length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const contentHeight = 'calc(100vh - 4rem)';

  if (error) {
    return <div className="p-6">Error loading products: {error.message}</div>;
  }

  return (
    <div className="flex bg-gray-100" style={{ height: contentHeight }}>
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">Welcome! Here's your shop's summary.</p>

          <StatsCards
            totalProducts={totalProducts}
            totalOrders={totalOrders}
            pendingOrders={pendingOrders}
            totalRevenue={totalRevenue}
          />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="mt-4">
              {loading ? (
                <p>Loading products...</p>
              ) : (
                <ProductsTable
                  products={products}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onAddNew={onAddNew}
                />
              )}
            </TabsContent>
            <TabsContent value="orders" className="mt-4">
              <OrdersTable orders={orders} onStatusChange={updateOrderStatus} />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <ProductFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={formData}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        isEditing={!!selectedProduct}
      />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
        itemName={products.find((p) => p.product === productToDelete)?.name || "this item"}
      />
    </div>
  );
}
