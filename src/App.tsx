import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import type { Value } from "./ToolkitPage";
import { TrainingPage } from "./TrainingPage";
import { PrinciplesPage } from "./PrinciplesPage";
import { ValueModal } from "./ValueModal";
import { ContactPage } from "./ContactPage";
import { PredispositionsPage } from "./PredispositionsPage";
import { ShopLayout } from "./components/ShopLayout";
import { ToolkitPage } from "./ToolkitPage";
import { AboutPage } from "./AboutPage";
import { HomePage } from "./HomePage";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Auth } from "./Auth";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "sonner";

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
		<CartProvider>
			<AppContent />
		</CartProvider>
	);
}

export default App;
