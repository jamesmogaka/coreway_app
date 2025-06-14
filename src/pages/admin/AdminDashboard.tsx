import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ProductsTable } from "../../components/admin/ProductsTable";
import { OrdersTable } from "../../components/admin/OrdersTable";
import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import type { Product, Order, OrderStatus } from "../../types/admin";
import type { Product as SupabaseProduct } from "../../types/product";
import { ProductFormDialog } from "../../components/admin/ProductFormDialog";

const initialProductState: Omit<Product, 'id'> = {
  product: "",
  name: "",
  description: "",
  price: 0,
  stock: 0,
  image_url: ""
};

export function AdminDashboard() {
  const { products, loading, error, refetch } = useProducts();
  const navigate = useNavigate();
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Omit<Product, 'id'>>(initialProductState);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (product: Product) => {
    setCurrentProduct({
      product: product.product, // Include product ID for editing
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock: product.stock || 0,
      image_url: product.image_url || ""
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const { error } = await supabase
          .from('products')
          .delete()
          .eq('product', productId);
        
        if (error) throw error;
        
        toast.success('Product deleted successfully');
        refetch();
      } catch (err) {
        toast.error(`Error deleting product: ${(err as Error).message}`);
      }
    }
  };

  const handleAddNew = () => {
    setCurrentProduct(initialProductState);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? parseFloat(value) || 0 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Handle update - include product ID for updates
        const { product, ...updateData } = currentProduct;
        const { error } = await supabase
          .from('products')
          .update(updateData)
          .eq('product', product);
        
        if (error) throw error;
        toast.success('Product updated successfully');
      } else {
        // Handle create - exclude product ID as it's auto-generated
        const { product, ...newProduct } = currentProduct;
        const { error } = await supabase
          .from('products')
          .insert([newProduct]);
        
        if (error) throw error;
        toast.success('Product created successfully');
      }
      
      setIsDialogOpen(false);
      refetch();
    } catch (err) {
      toast.error(`Error ${isEditing ? 'updating' : 'creating'} product: ${(err as Error).message}`);
    }
  };
  
  // Navigate to users page
  const navigateToUsers = () => {
    navigate('/admin/users');
  };
  
  // Navigate to contacts page
  const navigateToContacts = () => {
    navigate('/admin/contacts');
  };

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    // Implement order status update logic here
    console.log(`Order ${orderId} status updated to ${status}`);
    toast.success(`Order ${orderId} status updated to ${status}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading products: {error.message}</div>;

  // Mock orders data - replace with actual data from your API
  const mockOrders: Order[] = [
    {
      id: '1',
      customerName: 'John Doe',
      items: [
        { name: 'Product 1', quantity: 1, price: 99.99 }
      ],
      date: '2023-06-14',
      status: 'pending',
      total: 99.99,
    },
    // Add more mock orders as needed
  ];

  // Map the products to match the expected Product type from admin.ts
  const mappedProducts: Product[] = (products || []).map((p: SupabaseProduct) => ({
    product: p.product, // This is the ID field
    name: p.name,
    description: p.description || '',
    price: p.price,
    stock: p.stock || 0,
    image_url: p.image_url || ""
  }));

  return (
    <div className="container mx-auto p-6">
      <ProductFormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        product={currentProduct}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
        isEditing={isEditing}
      />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Admin Dashboard</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => navigateToUsers()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Manage Users
          </button>
          <button
            onClick={() => navigateToContacts()}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            View Contact Submissions
          </button>
        </div>
      </div>

      <Tabs defaultValue="products" className="space-y-4">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <ProductsTable 
            products={mappedProducts} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddNew={handleAddNew}
          />
        </TabsContent>
        <TabsContent value="orders" className="mt-4">
          <OrdersTable 
            orders={mockOrders} 
            onStatusChange={handleStatusChange} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
