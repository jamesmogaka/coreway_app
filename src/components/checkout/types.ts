export interface CartItemProps {
  id: number;
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

export interface PaymentInfo {
  paymentMethod: 'visa' | 'mpesa';
  cardName?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  mpesaPhoneNumber?: string;
}
