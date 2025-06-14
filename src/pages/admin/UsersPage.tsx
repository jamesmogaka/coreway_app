import { useProducts } from "../../hooks/useProducts";

export function UsersPage() {
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="bg-white rounded-lg shadow p-6">
        <p>Users management content will go here.</p>
        <p className="mt-4">Currently, there are {products?.length || 0} products in the system.</p>
      </div>
    </div>
  );
}
