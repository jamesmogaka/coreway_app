import { useState, useMemo, useCallback } from "react";
import type { FC, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Stepper } from "@/components/checkout/Stepper";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { ReviewOrder } from "@/components/checkout/ReviewOrder";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import type { ShippingInfo, PaymentInfo, CartItemProps } from "@/components/checkout/types";

const STEPS = ["Shipping Information", "Payment Details", "Review Order"] as const;

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
    const { name, value, type, checked } = e.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }, []);

  const handlePaymentInfoChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleEditStep = (step: number) => {
    setActiveStep(step);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <ShippingForm shippingInfo={shippingInfo} onChange={handleShippingInfoChange} />;
      case 1:
        return <PaymentForm paymentInfo={paymentInfo} onChange={handlePaymentInfoChange} />;
      case 2:
        return <ReviewOrder shippingInfo={shippingInfo} paymentInfo={paymentInfo} onEdit={handleEditStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
            </CardHeader>
            <CardContent>
              <Stepper steps={STEPS} activeStep={activeStep} />
              {renderStepContent()}
            </CardContent>
            <CardFooter className="flex justify-between">
              {activeStep > 0 ? (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              ) : (
                <div />
              )}
              <Button onClick={handleNext}>
                {activeStep === STEPS.length - 1 ? "Place Order" : "Next"}
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shippingFee={SHIPPING_FEE}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
