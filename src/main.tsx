import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import { ThemeProvider } from "./contexts/ThemeContext.tsx";
import { Toaster } from "./components/ui/toaster";
import "swiper/swiper-bundle.css";

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<AuthProvider>
				<CartProvider>
					<App />
				</CartProvider>
				<Toaster />
			</AuthProvider>
		</ThemeProvider>
	</React.StrictMode>
);
