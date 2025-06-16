import type { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "./CartItem";
import type { CartItemProps } from "./types";

interface OrderSummaryProps {
  cartItems: CartItemProps[];
  subtotal: number;
  shippingFee: number;
}

export const OrderSummary: FC<OrderSummaryProps> = ({ cartItems, subtotal, shippingFee }) => (
  <Card className="bg-[#129990] border-none rounded-lg shadow-lg p-6">
    <CardHeader>
      <CardTitle className="text-[#F5F5F5]">Order Summary</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4 text-[#F5F5F5]">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Separator className="bg-[#90D1CA]" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>KSh.{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>KSh.{shippingFee.toFixed(2)}</span>
        </div>
        <Separator className="bg-[#90D1CA]" />
        <div className="flex justify-between font-semibold text-lg text-[#FFD59A]">
          <span>Total</span>
          <span>KSh.{(subtotal + shippingFee).toFixed(2)}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);
