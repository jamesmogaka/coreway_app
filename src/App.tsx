import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import { TrainingPage } from "./pages/TrainingPage";
import { ContactPage } from "./pages/ContactPage";
import { ShopLayout } from "./components/ShopLayout";
import { ToolkitPage } from "./pages/ToolkitPage";
import { AboutDetailsPage } from "./pages/AboutDetailsPage";
import { HomePage } from "./pages/HomePage";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Auth } from "./pages/Auth";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "sonner";
import { AdminLayout } from "./layouts/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import UsersPage from "./pages/admin/Users";
import ContactsPage from "./pages/admin/ContactsPage";
import BlogManagementPage from "./pages/admin/BlogManagementPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import ProductsPage from "./pages/ProductsPage";
import Testimonials from "./pages/Testimonials";
import BlogListPage from "./pages/blog/BlogListPage";
import BlogDetailPage from "./pages/blog/BlogDetailPage";
import VdcParenting from "./pages/VDCParenting";
import { AboutPage } from "./pages/AboutPage";
import ProductsCarousel from "./components/Products";
import { useCart } from "./contexts/useCart";
import { CartSidebar } from "./components/CartSidebar";

function AppContent() {
	const {
		isCartOpen,
		closeCart,
		cartItems,
		removeFromCart,
		updateQuantity,
	} = useCart();
	return (
		<Router>
			<div className="min-h-screen w-full flex flex-col bg-transparent">
				<Header />
				<main>
					<Routes>
						<Route
							path="/"
							element={
								<>
									<HomePage />
									<AboutPage />
									<ToolkitPage />
									<ProductsCarousel />
									<TrainingPage />
									<Testimonials />
									<ContactPage />
								</>
							}
						/>
						<Route path="/shop/*" element={<ShopLayout />} />
						<Route path="/auth" element={<Auth />} />
						<Route path="/blog" element={<BlogListPage />} />
						<Route path="/blog/:id" element={<BlogDetailPage />} />
						<Route path="/products" element={<ProductsPage />} />
						<Route
							path="/vdc-parenting"
							element={<VdcParenting />}
						/>
						<Route
							path="/about-details"
							element={<AboutDetailsPage />}
						/>

						{/* Admin Routes */}
						<Route
							path="/admin"
							element={
								<ProtectedRoute requireAdmin>
									<AdminLayout />
								</ProtectedRoute>
							}>
							<Route
								index
								element={<Navigate to="dashboard" replace />}
							/>
							<Route
								path="dashboard"
								element={<AdminDashboard />}
							/>
							<Route path="users" element={<UsersPage />} />
							<Route path="contacts" element={<ContactsPage />} />
							<Route
								path="blog"
								element={<BlogManagementPage />}
							/>
						</Route>

						{/* 404 - Catch all unmatched routes */}
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
			<Toaster />
			<CartSidebar
				isOpen={isCartOpen}
				onClose={closeCart}
				cartItems={cartItems}
				onRemoveItem={removeFromCart}
				onQuantityChange={updateQuantity}
			/>
		</Router>
	);
}

function App() {
	return (
		<AuthProvider>
			<CartProvider>
				<AppContent />
			</CartProvider>
		</AuthProvider>
	);
}

export default App;
