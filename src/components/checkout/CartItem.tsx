import type { FC } from "react";
import type { CartItemProps } from "./types";

export const CartItem: FC<{ item: CartItemProps }> = ({ item }) => (
  <div className="flex items-center justify-between p-4 bg-[#0d827d] rounded-lg">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 rounded-md overflow-hidden bg-[#90D1CA]">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-medium text-[#F5F5F5]">{item.name}</h3>
        <p className="text-sm text-[#c2eae7]">Qty: {item.quantity}</p>
      </div>
    </div>
    <div className="font-medium text-[#FFD59A]">
      KSh.{(item.price * item.quantity).toFixed(2)}
    </div>
  </div>
);
