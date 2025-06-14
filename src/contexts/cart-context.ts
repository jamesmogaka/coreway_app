import { createContext } from "react";
import type { CartContextType } from "./cart-context.types";

export const CartContext = createContext<CartContextType | undefined>(undefined);
