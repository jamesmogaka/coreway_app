import { useContext } from "react";
import { CartContext } from "./cart-context";
import type { CartContextType } from "./cart-context.types";

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
