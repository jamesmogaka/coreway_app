import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ShippingInfo, PaymentInfo } from "./types";

interface ReviewOrderProps {
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  onEdit: (step: number) => void;
}

export const ReviewOrder: FC<ReviewOrderProps> = ({ shippingInfo, paymentInfo, onEdit }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">Review Your Order</h2>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Shipping Information</CardTitle>
        <Button variant="link" onClick={() => onEdit(0)}>
          Edit
        </Button>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>{`${shippingInfo.firstName} ${shippingInfo.lastName}`}</p>
        <p>{shippingInfo.streetAddress}</p>
        <p>{`${shippingInfo.subcounty}, ${shippingInfo.ward}`}</p>
        <p>{shippingInfo.county}</p>
        <p>{shippingInfo.email}</p>
        <p>{shippingInfo.phoneNumber}</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Payment Information</CardTitle>
        <Button variant="link" onClick={() => onEdit(1)}>
          Edit
        </Button>
      </CardHeader>
      <CardContent>
        {
          paymentInfo.paymentMethod === 'visa' ? (
            <p>Card ending in {paymentInfo.cardNumber?.slice(-4)}</p>
          ) : (
            <p>M-PESA: {paymentInfo.mpesaPhoneNumber}</p>
          )
        }
      </CardContent>
    </Card>
  </div>
);
