import type { FC, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { PaymentInfo } from "./types";

interface PaymentFormProps {
  paymentInfo: PaymentInfo;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PaymentForm: FC<PaymentFormProps> = ({ paymentInfo, onChange }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">Payment Details</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="cardName">Name on Card</Label>
        <Input
          id="cardName"
          name="cardName"
          value={paymentInfo.cardName}
          onChange={onChange}
          required
        />
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="cardNumber">Card Number</Label>
        <Input
          id="cardNumber"
          name="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expiryDate">Expiry Date</Label>
        <Input
          id="expiryDate"
          name="expiryDate"
          placeholder="MM/YY"
          value={paymentInfo.expiryDate}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cvv">CVV</Label>
        <Input
          id="cvv"
          name="cvv"
          value={paymentInfo.cvv}
          onChange={onChange}
          required
        />
      </div>
    </div>
  </div>
);
