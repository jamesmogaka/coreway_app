import { useState, useMemo, useCallback, useEffect } from "react";
import type { FC, ChangeEvent, FocusEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { Stepper } from "@/components/checkout/Stepper";
import type { CartItemProps, PaymentInfo, ShippingInfo } from "@/components/checkout/types";
import { shippingSchema, paymentSchema } from '@/components/checkout/validation';
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { ReviewOrder } from "@/components/checkout/ReviewOrder";
import { OrderSummary } from "@/components/checkout/OrderSummary";

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

  const [shippingErrors, setShippingErrors] = useState<Partial<Record<keyof ShippingInfo, string>>>({});
  const [isShippingFormValid, setIsShippingFormValid] = useState(false);
  const [touched, setTouched] = useState<Partial<Record<keyof ShippingInfo, boolean>>>({});

  const [paymentErrors, setPaymentErrors] = useState<Partial<Record<keyof PaymentInfo, string>>>({});
  const [isPaymentFormValid, setIsPaymentFormValid] = useState(false);
  const [paymentTouched, setPaymentTouched] = useState<Partial<Record<keyof PaymentInfo, boolean>>>({});

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentMethod: 'visa',
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    mpesaPhoneNumber: "",
  });

  useEffect(() => {
    const result = shippingSchema.safeParse(shippingInfo);
    setIsShippingFormValid(result.success);
    if (!result.success) {
      const errors: Partial<Record<keyof ShippingInfo, string>> = {};
      for (const error of result.error.errors) {
        errors[error.path[0] as keyof ShippingInfo] = error.message;
      }
      setShippingErrors(errors);
    } else {
      setShippingErrors({});
    }
  }, [shippingInfo]);

  useEffect(() => {
    const result = paymentSchema.safeParse(paymentInfo);
    setIsPaymentFormValid(result.success);
    if (!result.success) {
      const errors: Partial<Record<keyof PaymentInfo, string>> = {};
      for (const error of result.error.errors) {
        errors[error.path[0] as keyof PaymentInfo] = error.message;
      }
      setPaymentErrors(errors);
    } else {
      setPaymentErrors({});
    }
  }, [paymentInfo]);

  const handleBlur = useCallback((e: FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    if (Object.keys(shippingInfo).includes(name)) {
      setTouched((prev) => ({ ...prev, [name]: true }));
    } else if (Object.keys(paymentInfo).includes(name)) {
      setPaymentTouched((prev) => ({ ...prev, [name]: true }));
    }
  }, [shippingInfo, paymentInfo]);

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

  const handlePaymentMethodChange = useCallback((method: 'visa' | 'mpesa') => {
    setPaymentInfo((prev) => ({ ...prev, paymentMethod: method }));
  }, []);

  const handleEditStep = (step: number) => {
    setActiveStep(step);
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return <ShippingForm shippingInfo={shippingInfo} onChange={handleShippingInfoChange} onBlur={handleBlur} errors={shippingErrors} touched={touched} />;
      case 1:
        return <PaymentForm paymentInfo={paymentInfo} onInputChange={handlePaymentInfoChange} onPaymentMethodChange={handlePaymentMethodChange} onBlur={handleBlur} errors={paymentErrors} touched={paymentTouched} />;
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
              <Button onClick={handleNext} disabled={(activeStep === 0 && !isShippingFormValid) || (activeStep === 1 && !isPaymentFormValid)}>
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
