import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { ProductsTable } from "../../components/admin/ProductsTable";
import { OrdersTable } from "../../components/admin/OrdersTable";
import { useProducts } from "../../hooks/useProducts";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "../../lib/supabase";
import type { Product, Order, OrderStatus } from "../../types/admin";
import type { Product as SupabaseProduct } from "../../types/product";

export function AdminDashboard() {
  const { products, loading, error, refetch } = useProducts();
  const navigate = useNavigate();

  const handleEdit = (product: Product) => {
    // Navigate to edit product page with the product ID
    navigate(`/admin/products/edit/${product.product}`);
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
    // Navigate to add new product page
    navigate('/admin/products/new');
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
