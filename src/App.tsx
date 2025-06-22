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

function AppContent() {
	const { isCartOpen, closeCart, cartItems, removeFromCart, updateQuantity } =
		useCart();
	return (
		<Router>
			<div className="min-h-screen w-full flex flex-col bg-transparent relative">
				{/* Complicated teal gradient background */}
				<div className="fixed inset-0 -z-10 pointer-events-none">
					{/* Main darkened linear gradient - stays dark */}
					<div className="absolute inset-0 w-full h-full bg-gradient-to-br from-teal-950 via-teal-900/95 to-cyan-950 opacity-100" />
					{/* Large radial highlight - more visible, less blur, more saturated */}
					<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110vw] h-[110vw] bg-gradient-radial from-teal-400/30 via-teal-700/0 to-transparent opacity-60 blur-2xl" />
					{/* Bottom right shadow - more visible, less blur, more cyan */}
					<div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-gradient-to-tl from-cyan-700/70 via-teal-900/70 to-transparent opacity-80 blur-xl" />
					{/* Accent radial - more defined, higher opacity, less blur */}
					<div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-gradient-radial from-cyan-400/40 via-transparent to-transparent opacity-50 blur" />
				</div>
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
