export interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingInfo {
  email: string;
  firstName: string;
  lastName: string;
  county: string;
  subcounty: string;
  ward: string;
  streetAddress: string;
  areaCode: string;
  phoneNumber: string;
  saveInfo: boolean;
}

// Base payment info with common fields
export type BasePaymentInfo = {
  paymentMethod: 'visa' | 'mpesa';
};

export type VisaPaymentInfo = BasePaymentInfo & {
  paymentMethod: 'visa';
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

export type MpesaPaymentInfo = BasePaymentInfo & {
  paymentMethod: 'mpesa';
  mpesaPhoneNumber: string;
};

export type PaymentInfo = VisaPaymentInfo | MpesaPaymentInfo;
