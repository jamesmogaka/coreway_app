import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import { lazy, Suspense } from "react";

// Lazy-loaded pages & layouts for code splitting
const TrainingPage = lazy(() =>
	import("./pages/TrainingPage").then(m => ({ default: m.TrainingPage }))
);
const ContactPage = lazy(() =>
	import("./pages/ContactPage").then(m => ({ default: m.ContactPage }))
);
const ShopLayout = lazy(() =>
	import("./components/ShopLayout").then(m => ({ default: m.ShopLayout }))
);
const ToolkitPage = lazy(() =>
	import("./pages/ToolkitPage").then(m => ({ default: m.ToolkitPage }))
);
const AboutDetailsPage = lazy(() =>
	import("./pages/AboutDetailsPage").then(m => ({
		default: m.AboutDetailsPage,
	}))
);
const HomePage = lazy(() =>
	import("./pages/HomePage").then(m => ({ default: m.HomePage }))
);
const Auth = lazy(() =>
	import("./pages/Auth").then(m => ({ default: m.Auth }))
);
const AdminLayout = lazy(() =>
	import("./layouts/AdminLayout").then(m => ({ default: m.AdminLayout }))
);
const AdminDashboard = lazy(() =>
	import("./pages/admin/AdminDashboard").then(m => ({
		default: m.AdminDashboard,
	}))
);
const UsersPage = lazy(() => import("./pages/admin/Users"));
const ContactsPage = lazy(() => import("./pages/admin/ContactsPage"));
const BlogManagementPage = lazy(
	() => import("./pages/admin/BlogManagementPage")
);
const NotFoundPage = lazy(() =>
	import("./pages/NotFoundPage").then(m => ({ default: m.NotFoundPage }))
);
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const BlogListPage = lazy(() => import("./pages/blog/BlogListPage"));
const BlogDetailPage = lazy(() => import("./pages/blog/BlogDetailPage"));
const VdcParenting = lazy(() => import("./pages/VDCParenting"));
const AboutPage = lazy(() =>
	import("./pages/AboutPage").then(m => ({ default: m.AboutPage }))
);
const ProductsCarousel = lazy(() => import("./components/Products"));

import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "sonner";
import { useCart } from "./contexts/useCart";
import { HeroSkeleton } from "@/components/skeletons/HeroSkeleton";
import { CartSidebar } from "./components/CartSidebar";
import { BackgroundGradient } from "./components/ui/BackgroundGradient";

function AppContent() {
	const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity } =
		useCart();
	return (
		<Router>
			<div className="min-h-screen w-full flex flex-col bg-transparent relative">
				<BackgroundGradient />
				<Header />
				<main className="flex-grow">
					<Suspense
						fallback={
							<div className="flex justify-center py-10">
								Loading...
							</div>
						}>
						<Routes>
							<Route
								path="/"
								element={
									<Suspense fallback={<HeroSkeleton />}>
										<>
											<HomePage />
											<AboutPage />
											<ToolkitPage />
											<ProductsCarousel />
											<TrainingPage />
											<Testimonials />
											<ContactPage />
										</>
									</Suspense>
								}
							/>
							<Route path="/shop/*" element={<ShopLayout />} />
							<Route path="/auth" element={<Auth />} />
							<Route path="/blog" element={<BlogListPage />} />
							<Route
								path="/blog/:id"
								element={<BlogDetailPage />}
							/>
							<Route
								path="/products"
								element={<ProductsPage />}
							/>
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
									element={
										<Navigate to="dashboard" replace />
									}
								/>
								<Route
									path="dashboard"
									element={<AdminDashboard />}
								/>
								<Route path="users" element={<UsersPage />} />
								<Route
									path="contacts"
									element={<ContactsPage />}
								/>
								<Route
									path="blog"
									element={<BlogManagementPage />}
								/>
							</Route>

							{/* 404 - Catch all unmatched routes */}
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</Suspense>
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
