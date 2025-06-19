import type { FC, ChangeEvent, FocusEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { PaymentInfo } from "./types";

interface PaymentFormProps {
  paymentInfo: PaymentInfo;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onPaymentMethodChange: (method: 'visa' | 'mpesa') => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  errors: {
    paymentMethod?: string;
    cardName?: string;
    cardNumber?: string;
    expiryDate?: string;
    cvv?: string;
    mpesaPhoneNumber?: string;
  };
  touched: {
    paymentMethod?: boolean;
    cardName?: boolean;
    cardNumber?: boolean;
    expiryDate?: boolean;
    cvv?: boolean;
    mpesaPhoneNumber?: boolean;
  };
}

export const PaymentForm: FC<PaymentFormProps> = ({ paymentInfo, onInputChange, onPaymentMethodChange, onBlur, errors, touched }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold text-[#F5F5F5]">Payment Details</h2>
    <RadioGroup
      value={paymentInfo.paymentMethod}
      onValueChange={onPaymentMethodChange}
      className="space-y-4"
    >
      <fieldset className="space-y-4 rounded-lg border border-[#90D1CA] p-4">
        <legend className="-ml-1 px-1 text-sm font-medium flex items-center text-[#F5F5F5]">
          <RadioGroupItem value="visa" id="visa" className="mr-2 border-[#F5F5F5] text-[#FFD59A] focus:ring-[#FFD59A]" />
          <Label htmlFor="visa">Visa</Label>
        </legend>
        {paymentInfo.paymentMethod === 'visa' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="cardName" className="text-[#F5F5F5]">Name on Card</Label>
              <Input
                id="cardName"
                name="cardName"
                value={paymentInfo.paymentMethod === 'visa' ? paymentInfo.cardName : ''}
                onChange={onInputChange}
                onBlur={onBlur}
                required
                className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500"
              />
              {'cardName' in paymentInfo && errors.cardName && touched.cardName && (
                <p className="text-sm text-red-400">{errors.cardName}</p>
              )}
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="cardNumber" className="text-[#F5F5F5]">Card Number</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                value={paymentInfo.paymentMethod === 'visa' ? paymentInfo.cardNumber : ''}
                onChange={onInputChange}
                onBlur={onBlur}
                required
                className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500"
              />
              {'cardNumber' in paymentInfo && errors.cardNumber && touched.cardNumber && (
                <p className="text-sm text-red-400">{errors.cardNumber}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiryDate" className="text-[#F5F5F5]">Expiry Date</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentInfo.paymentMethod === 'visa' ? paymentInfo.expiryDate : ''}
                onChange={onInputChange}
                onBlur={onBlur}
                required
                className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500"
              />
              {'expiryDate' in paymentInfo && errors.expiryDate && touched.expiryDate && (
                <p className="text-sm text-red-400">{errors.expiryDate}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv" className="text-[#F5F5F5]">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                value={paymentInfo.paymentMethod === 'visa' ? paymentInfo.cvv : ''}
                onChange={onInputChange}
                onBlur={onBlur}
                required
                className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500"
              />
              {'cvv' in paymentInfo && errors.cvv && touched.cvv && (
                <p className="text-sm text-red-400">{errors.cvv}</p>
              )}
            </div>
          </div>
        )}
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-[#90D1CA] p-4">
        <legend className="-ml-1 px-1 text-sm font-medium flex items-center text-[#F5F5F5]">
          <RadioGroupItem value="mpesa" id="mpesa" className="mr-2 border-[#F5F5F5] text-[#FFD59A] focus:ring-[#FFD59A]" />
          <Label htmlFor="mpesa">M-PESA</Label>
        </legend>
        {paymentInfo.paymentMethod === 'mpesa' && (
          <div className="pt-4">
            <Label htmlFor="mpesaPhoneNumber" className="text-[#F5F5F5]">Phone Number</Label>
            <Input
              id="mpesaPhoneNumber"
              name="mpesaPhoneNumber"
              value={paymentInfo.paymentMethod === 'mpesa' ? paymentInfo.mpesaPhoneNumber : ''}
              onChange={onInputChange}
              onBlur={onBlur}
              required
              className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500"
            />
            {'mpesaPhoneNumber' in paymentInfo && errors.mpesaPhoneNumber && touched.mpesaPhoneNumber && (
              <p className="text-sm text-red-400">{errors.mpesaPhoneNumber}</p>
            )}
          </div>
        )}
      </fieldset>
    </RadioGroup>
  </div>
);
