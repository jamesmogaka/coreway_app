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
  <Card>
    <CardHeader>
      <CardTitle>Order Summary</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <Separator />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>KSh.{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>KSh.{shippingFee.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>KSh.{(subtotal + shippingFee).toFixed(2)}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);
