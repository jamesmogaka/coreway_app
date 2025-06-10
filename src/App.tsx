import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
	AboutPage,
	ContactPage,
	Footer,
	Header,
	HomePage,
	PredispositionsPage,
	PrinciplesPage,
	ShopPage,
	ToolkitPage,
	TrainingPage,
	ValueModal,
	type Value,
} from "./components";

function App() {
	const [modalData, setModalData] = useState<{ name: string; value: Value; } | null>(null);

	const handleValueClick = (name: string, value: Value) => {
		setModalData({ name, value });
	};

	const handleCloseModal = () => {
		setModalData(null);
	};

	return (
		<Router>
			<div className="bg-gray-50">
				<Header />
				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/about" element={<AboutPage />} />
						<Route path="/toolkit" element={<ToolkitPage onValueClick={handleValueClick} />} />
						<Route path="/training" element={<TrainingPage />} />
						<Route path="/shop" element={<ShopPage />} />
						<Route path="/principles" element={<PrinciplesPage />} />
						<Route path="/predispositions" element={<PredispositionsPage />} />
						<Route path="/contact" element={<ContactPage />} />
					</Routes>
				</main>
				<Footer />
			</div>
			<ValueModal
				isOpen={!!modalData}
				onClose={handleCloseModal}
				data={modalData}
			/>
		</Router>
	);
}

export default App;
