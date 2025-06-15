import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { Toaster } from "./components/ui/toaster";
import "swiper/swiper-bundle.css";

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<AuthProvider>
			<App />
			<Toaster />
		</AuthProvider>
	</React.StrictMode>
);
