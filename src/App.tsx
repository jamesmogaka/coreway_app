import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import type { Value } from "./pages/ToolkitPage";
import { TrainingPage } from "./pages/TrainingPage";
import { PrinciplesPage } from "./pages/PrinciplesPage";
import { ValueModal } from "./pages/ValueModal";
import { ContactPage } from "./pages/ContactPage";
import { PredispositionsPage } from "./pages/PredispositionsPage";
import { ShopLayout } from "./components/ShopLayout";
import { ToolkitPage } from "./pages/ToolkitPage";
import { AboutPage } from "./pages/AboutPage";
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

function AppContent() {
	const [modalData, setModalData] = useState<{
		name: string;
		value: Value;
	} | null>(null);

	const handleValueClick = (name: string, value: Value) => {
		setModalData({ name, value });
	};

	const handleCloseModal = () => {
		setModalData(null);
	};

	return (
		<Router>
			<div className="bg-gray-50 min-h-screen w-full flex flex-col">
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route
							path="/toolkit"
							element={
								<ToolkitPage onValueClick={handleValueClick} />
							}
						/>
						<Route path="/training" element={<TrainingPage />} />
						<Route path="/shop/*" element={<ShopLayout />} />
						<Route
							path="/principles"
							element={<PrinciplesPage />}
						/>
						<Route
							path="/predispositions"
							element={<PredispositionsPage />}
						/>
						<Route path="/contact" element={<ContactPage />} />
						<Route path="/auth" element={<Auth />} />
						
						{/* Admin Routes */}
						<Route
							path="/admin"
							element={
								<ProtectedRoute requireAdmin>
									<AdminLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Navigate to="dashboard" replace />} />
							<Route path="dashboard" element={<AdminDashboard />} />
							<Route path="users" element={<UsersPage />} />
							<Route path="contacts" element={<ContactsPage />} />
						</Route>

						{/* 404 - Catch all unmatched routes */}
						<Route path="*" element={<NotFoundPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
			<ValueModal
				isOpen={!!modalData}
				onClose={handleCloseModal}
				data={modalData}
			/>
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
