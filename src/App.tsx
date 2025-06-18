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
import { AboutPage } from "./pages/AboutPage";
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
import { NotFoundPage } from "./pages/NotFoundPage";
import ProductsPage from "./pages/Products";
// import Testimonials from "./pages/Testimonials";

function AppContent() {
	return (
		<Router>
			<div className="bg-gray-50 min-h-screen w-full flex flex-col">
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
									<ProductsPage />
									<TrainingPage />
									{/* <Testimonials /> */}
									<ContactPage />
								</>
							}
						/>
						<Route path="/shop/*" element={<ShopLayout />} />
						<Route path="/auth" element={<Auth />} />
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
						</Route>

						{/* 404 - Catch all unmatched routes */}
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
			<Toaster />
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
