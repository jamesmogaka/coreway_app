import { useState, useMemo, useCallback } from "react";
import type { FC, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// Types
interface CartItemProps {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShippingInfo {
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

interface PaymentInfo {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const STEPS = ["Shipping Information", "Payment Details", "Review Order"] as const;

// Stepper component
const Stepper = ({ steps, activeStep }: { steps: readonly string[]; activeStep: number }) => (
  <div className="w-full mb-8">
    <div className="flex items-center">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div
            className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
              activeStep >= index
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {index + 1}
          </div>
          <div className="text-sm ml-2">{step}</div>
          {index < steps.length - 1 && (
            <div className="w-16 h-0.5 bg-muted mx-2"></div>
          )}
        </div>
      ))}
    </div>
  </div>
);

// CartItem component
const CartItem: FC<{ item: CartItemProps }> = ({ item }) => (
  <div className="flex items-center justify-between p-4 border rounded-lg">
    <div className="flex items-center space-x-4">
      <div className="w-16 h-16 rounded-md overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div>
        <h3 className="font-medium">{item.name}</h3>
        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
      </div>
    </div>
    <div className="font-medium">
      KSh.{(item.price * item.quantity).toFixed(2)}
    </div>
  </div>
);

// Main CheckoutPage component
const CheckoutPage: FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    email: "",
    firstName: "",
    lastName: "",
    county: "",
    subcounty: "",
    ward: "",
    streetAddress: "",
    areaCode: "+254",
    phoneNumber: "",
    saveInfo: false,
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Mock cart items - replace with your actual cart data
  const cartItems: CartItemProps[] = useMemo(() => [
    {
      id: 1,
      name: "Sample Product",
      price: 1999.99,
      quantity: 2,
      image: "https://via.placeholder.com/80",
    },
  ], []);

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const SHIPPING_FEE = 500; // Example shipping fee

  const handleNext = useCallback(() => {
    if (activeStep === STEPS.length - 1) {
      // Handle form submission
      console.log("Order submitted:", { shippingInfo, paymentInfo });
      navigate("/order-confirmation");
    } else {
      setActiveStep((prev) => prev + 1);
    }
  }, [activeStep, shippingInfo, paymentInfo, navigate]);

  const handleBack = useCallback(() => {
    setActiveStep((prev) => prev - 1);
  }, []);

  const handleShippingInfoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handlePaymentInfoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          <Stepper steps={STEPS} activeStep={activeStep} />

          {/* Step 1: Shipping Information */}
          {activeStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Shipping Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="county">County</Label>
                  <Input
                    id="county"
                    name="county"
                    value={shippingInfo.county}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subcounty">Sub-county</Label>
                  <Input
                    id="subcounty"
                    name="subcounty"
                    value={shippingInfo.subcounty}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ward">Ward</Label>
                  <Input
                    id="ward"
                    name="ward"
                    value={shippingInfo.ward}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="streetAddress">Street Address</Label>
                  <Input
                    id="streetAddress"
                    name="streetAddress"
                    value={shippingInfo.streetAddress}
                    onChange={handleShippingInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <div className="flex">
                    <Input
                      id="areaCode"
                      name="areaCode"
                      value={shippingInfo.areaCode}
                      onChange={handleShippingInfoChange}
                      className="w-20"
                      readOnly
                    />
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      value={shippingInfo.phoneNumber}
                      onChange={handleShippingInfoChange}
                      className="flex-1 ml-2"
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="saveInfo"
                    name="saveInfo"
                    checked={shippingInfo.saveInfo}
                    onCheckedChange={(checked) =>
                      setShippingInfo((prev) => ({
                        ...prev,
                        saveInfo: Boolean(checked),
                      }))
                    }
                  />
                  <Label htmlFor="saveInfo">Save this information for next time</Label>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment Details */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Payment Details</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={paymentInfo.cardName}
                    onChange={handlePaymentInfoChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handlePaymentInfoChange}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={handlePaymentInfoChange}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={paymentInfo.cvv}
                      onChange={handlePaymentInfoChange}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review Order */}
          {activeStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Review Your Order</h2>

              {/* Shipping Information Review */}
              <div className="space-y-4">
                <h3 className="font-medium">Shipping Information</h3>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
                  <p className="text-muted-foreground">{shippingInfo.streetAddress}</p>
                  <p className="text-muted-foreground">
                    {shippingInfo.ward}, {shippingInfo.subcounty}
                  </p>
                  <p className="text-muted-foreground">{shippingInfo.county}</p>
                  <p className="text-muted-foreground">{shippingInfo.phoneNumber}</p>
                  <p className="text-muted-foreground">{shippingInfo.email}</p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <h3 className="font-medium">Order Summary</h3>
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>KSh {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>KSh {SHIPPING_FEE.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>KSh 0.00</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>KSh {(subtotal + SHIPPING_FEE).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {activeStep === STEPS.length - 1 ? 'Place Order' : 'Next'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutPage;
