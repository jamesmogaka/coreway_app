import type { FC, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { PaymentInfo } from "./types";

interface PaymentFormProps {
  paymentInfo: PaymentInfo;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPaymentMethodChange: (method: 'visa' | 'mpesa') => void;
}

export const PaymentForm: FC<PaymentFormProps> = ({ paymentInfo, onInputChange, onPaymentMethodChange }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">Payment Details</h2>
    <RadioGroup
      value={paymentInfo.paymentMethod}
      onValueChange={onPaymentMethodChange}
      className="space-y-4"
    >
      <fieldset className="space-y-4 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium flex items-center">
          <RadioGroupItem value="visa" id="visa" className="mr-2" />
          <Label htmlFor="visa">Visa</Label>
        </legend>
        {paymentInfo.paymentMethod === 'visa' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                name="cardName"
                value={paymentInfo.cardName}
                onChange={onInputChange}
                required
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.cardNumber}
                onChange={onInputChange}
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
                onChange={onInputChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                value={paymentInfo.cvv}
                onChange={onInputChange}
                required
              />
            </div>
          </div>
        )}
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border p-4">
        <legend className="-ml-1 px-1 text-sm font-medium flex items-center">
          <RadioGroupItem value="mpesa" id="mpesa" className="mr-2" />
          <Label htmlFor="mpesa">M-PESA</Label>
        </legend>
        {paymentInfo.paymentMethod === 'mpesa' && (
          <div className="pt-4">
            <Label htmlFor="mpesaPhoneNumber">Phone Number</Label>
            <Input
              id="mpesaPhoneNumber"
              name="mpesaPhoneNumber"
              value={paymentInfo.mpesaPhoneNumber}
              onChange={onInputChange}
              required
            />
          </div>
        )}
      </fieldset>
    </RadioGroup>
  </div>
);
