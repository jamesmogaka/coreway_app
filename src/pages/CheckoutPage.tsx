import { useState, useMemo, useCallback, useEffect } from "react";
import type { FC, ChangeEvent, FocusEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

import { Stepper } from "@/components/checkout/Stepper";
import { useCart } from "@/contexts/useCart";
import type {
	CartItemProps,
	PaymentInfo,
	ShippingInfo,
	VisaPaymentInfo,
	MpesaPaymentInfo,
} from "@/components/checkout/types";
import {
	shippingSchema,
	paymentSchema,
} from "@/components/checkout/validation";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { ReviewOrder } from "@/components/checkout/ReviewOrder";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { createOrder } from "@/lib/orders";

const STEPS = [
	"Shipping Information",
	"Payment Details",
	"Review Order",
] as const;

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

	const [shippingErrors, setShippingErrors] = useState<
		Partial<Record<keyof ShippingInfo, string>>
	>({});
	const [isShippingFormValid, setIsShippingFormValid] = useState(false);
	const [touched, setTouched] = useState<
		Partial<Record<keyof ShippingInfo, boolean>>
	>({});

	const [paymentErrors, setPaymentErrors] = useState<
		Partial<Record<keyof PaymentInfo, string>>
	>({});
	const [isPaymentFormValid, setIsPaymentFormValid] = useState(false);
	const [paymentTouched, setPaymentTouched] = useState<
		Partial<Record<keyof PaymentInfo, boolean>>
	>({});

	// Initialize with Visa payment info by default
	const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
		paymentMethod: "visa",
		cardName: "",
		cardNumber: "",
		expiryDate: "",
		cvv: "",
	} as VisaPaymentInfo);

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
				const field = error.path[0] as keyof PaymentInfo;
				// Only set error if the field exists on the current payment method
				if (field in paymentInfo) {
					errors[field] = error.message;
				}
			}
			setPaymentErrors(errors);
		} else {
			setPaymentErrors({});
		}
	}, [paymentInfo]);

	const handleBlur = useCallback(
		(e: FocusEvent<HTMLInputElement>) => {
			const { name } = e.target;
			if (Object.keys(shippingInfo).includes(name)) {
				setTouched(prev => ({ ...prev, [name]: true }));
			} else if (Object.keys(paymentInfo).includes(name)) {
				setPaymentTouched(prev => ({ ...prev, [name]: true }));
			}
		},
		[shippingInfo, paymentInfo]
	);

	const { cartItems: contextCartItems, cartTotal, clearCart } = useCart();
	const [isLoading, setIsLoading] = useState(false);

	const cartItems: CartItemProps[] = useMemo(
		() =>
			contextCartItems.map(item => ({
				id: item.id,
				name: item.name,
				price: item.product.price,
				quantity: item.quantity,
				image: item.product.image_url,
			})),
		[contextCartItems]
	);

	const subtotal = cartTotal;

	const SHIPPING_FEE = 500;

	const handleNext = useCallback(async () => {
		if (activeStep === STEPS.length - 1) {
			setIsLoading(true);
			try {
				const result = await createOrder(
					shippingInfo,
					paymentInfo,
					cartItems,
					cartTotal,
					SHIPPING_FEE
				);

				if (result.success) {
					clearCart();
					toast.success("Order placed successfully!");
					navigate("/shop");
				} else {
					console.error("Error placing order:", result.error);
					alert("Failed to place order. Please try again.");
				}
			} catch (error) {
				console.error(
					"An unexpected error occurred while placing your order:",
					error
				);
				alert(
					"An unexpected error occurred while placing your order. Please try again."
				);
			} finally {
				setIsLoading(false);
			}
		} else {
			setActiveStep(prev => prev + 1);
		}
	}, [
		activeStep,
		shippingInfo,
		paymentInfo,
		cartItems,
		cartTotal,
		navigate,
		clearCart,
	]);

	const handleBack = useCallback(() => {
		setActiveStep(prev => prev - 1);
	}, []);

	const handleShippingInfoChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { name, value, type, checked } = e.target;
			setShippingInfo(prev => ({
				...prev,
				[name]: type === "checkbox" ? checked : value,
			}));
		},
		[]
	);

	const handlePaymentInfoChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;

			setPaymentInfo(prev => {
				if (prev.paymentMethod === "visa") {
					return {
						...(prev as VisaPaymentInfo),
						[name]: value,
					};
				} else {
					return {
						...(prev as MpesaPaymentInfo),
						[name]: value,
					};
				}
			});
		},
		[]
	);

	const handlePaymentMethodChange = useCallback(
		(method: "visa" | "mpesa") => {
			if (method === "visa") {
				setPaymentInfo({
					paymentMethod: "visa",
					cardName: "",
					cardNumber: "",
					expiryDate: "",
					cvv: "",
				});
			} else {
				setPaymentInfo({
					paymentMethod: "mpesa",
					mpesaPhoneNumber: "",
				});
			}
		},
		[]
	);

	const handleEditStep = (step: number) => {
		setActiveStep(step);
	};

	const renderStepContent = () => {
		switch (activeStep) {
			case 0:
				return (
					<ShippingForm
						shippingInfo={shippingInfo}
						onChange={handleShippingInfoChange}
						onBlur={handleBlur}
						errors={shippingErrors}
						touched={touched}
					/>
				);
			case 1:
				return (
					<PaymentForm
						paymentInfo={paymentInfo}
						onInputChange={handlePaymentInfoChange}
						onPaymentMethodChange={handlePaymentMethodChange}
						onBlur={handleBlur}
						errors={paymentErrors}
						touched={paymentTouched}
					/>
				);
			case 2:
				return (
					<ReviewOrder
						shippingInfo={shippingInfo}
						paymentInfo={paymentInfo}
						onEdit={handleEditStep}
					/>
				);
			default:
				return null;
		}
	};

	return (
		<div className="bg-[#096B68] min-h-screen py-8">
			<div className="container mx-auto px-4">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
					<div className="lg:col-span-2">
						<Card className="bg-[#129990] border-none rounded-lg shadow-lg p-6">
							<CardHeader>
								<CardTitle className="text-[#F5F5F5]">
									Checkout
								</CardTitle>
							</CardHeader>
							<CardContent>
								<Stepper
									steps={STEPS}
									activeStep={activeStep}
								/>
								{renderStepContent()}
							</CardContent>
							<CardFooter className="flex justify-between mt-6">
								{activeStep > 0 ? (
									<Button
										variant="outline"
										onClick={handleBack}
										className="bg-transparent border-[#90D1CA] text-[#F5F5F5] hover:bg-[#90D1CA] hover:text-[#3A3A3A]">
										Back
									</Button>
								) : (
									<div />
								)}
								<Button
									onClick={handleNext}
									disabled={
										(activeStep === 0 &&
											!isShippingFormValid) ||
										(activeStep === 1 &&
											!isPaymentFormValid) ||
										isLoading
									}
									className="bg-[#FFD59A] text-[#3A3A3A] hover:bg-[#FFAD60] disabled:bg-gray-500 disabled:cursor-not-allowed">
									{isLoading
										? "Placing Order..."
										: activeStep === STEPS.length - 1
										? "Place Order"
										: "Next"}
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
		</div>
	);
};

export default CheckoutPage;
