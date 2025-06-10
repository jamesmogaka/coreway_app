import { useState } from "react";
import * as react from "react";

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
	const [activePage, setActivePage] = useState<string>("home");
	const [modalData, setModalData] = useState<{
		name: string;
		value: Value;
	} | null>(null);

	const handlePageChange = (pageId: string) => {
		setActivePage(pageId);
	};

	const handleValueClick = (name: string, value: Value) => {
		setModalData({ name, value });
	};

	const handleCloseModal = () => {
		setModalData(null);
	};

	const renderPage = () => {
		switch (activePage) {
			case "home":
				return <HomePage onPageChange={handlePageChange} />;
			case "about":
				return <AboutPage />;
			case "toolkit":
				return <ToolkitPage onValueClick={handleValueClick} />;
			case "training":
				return <TrainingPage />;
			case "shop":
				return <ShopPage />;
			case "principles":
				return <PrinciplesPage />;
			case "predispositions":
				return <PredispositionsPage />;
			case "contact":
				return <ContactPage />;
			default:
				return <HomePage onPageChange={handlePageChange} />;
		}
	};

	const GlobalStyles: react.FC = () => (
		<style>{`
            body { font-family: 'Inter', sans-serif; }
            .hero-bg { background-image: url('https://placehold.co/1920x1080/dbeafe/4f46e5?text=Happy+Family'); background-size: cover; background-position: center; }
            .nav-link { @apply px-3 py-2 text-gray-700 hover:text-blue-600 rounded-md text-sm font-medium transition-colors duration-300; }
            .nav-link.active { @apply text-blue-600 font-bold; }
            .fade-in { animation: fadeIn 0.6s ease-in-out; }
            @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
            .predisposition-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; border: 3px solid transparent; cursor: pointer; }
            .predisposition-card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
            .active-card { border-color: #3b82f6; transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
            .description-panel { overflow: hidden; transition: max-height 0.5s ease-out, opacity 0.5s ease-out; max-height: 0; opacity: 0; }
            .description-panel.show { max-height: 500px; opacity: 1; }
            .description-content { @apply p-6 bg-white rounded-b-lg shadow-inner; }
            .value-item-list div { @apply bg-white p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 text-gray-900 font-semibold hover:bg-blue-50 hover:ring-2 hover:ring-blue-400 hover:scale-105 hover:shadow-xl hover:text-blue-600; }
        `}</style>
	);

	return (
		<div className="bg-gray-50">
			<GlobalStyles />
			<Header activePage={activePage} onPageChange={handlePageChange} />
			<main>{renderPage()}</main>
			<Footer onPageChange={handlePageChange} />
			<ValueModal
				isOpen={!!modalData}
				onClose={handleCloseModal}
				data={modalData}
			/>
		</div>
	);
}

export default App;
