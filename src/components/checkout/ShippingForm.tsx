import type { FC, ChangeEvent, FocusEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ShippingInfo } from "./types";

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: FocusEvent<HTMLInputElement>) => void;
  errors: Partial<Record<keyof ShippingInfo, string>>;
  touched: Partial<Record<keyof ShippingInfo, boolean>>;
}

export const ShippingForm: FC<ShippingFormProps> = ({ shippingInfo, onChange, onBlur, errors, touched }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">Shipping Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name <span className="text-red-500">*</span></Label>
        <Input
          id="firstName"
          name="firstName"
          value={shippingInfo.firstName}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {errors.firstName && touched.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name <span className="text-red-500">*</span></Label>
        <Input
          id="lastName"
          name="lastName"
          value={shippingInfo.lastName}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {errors.lastName && touched.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={shippingInfo.email}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
        {errors.email && touched.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="county">County <span className="text-red-500">*</span></Label>
        <Input id="county" name="county" value={shippingInfo.county} onChange={onChange} onBlur={onBlur} required />
        {errors.county && touched.county && <p className="text-sm text-red-500">{errors.county}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="subcounty">Sub-county <span className="text-red-500">*</span></Label>
        <Input id="subcounty" name="subcounty" value={shippingInfo.subcounty} onChange={onChange} onBlur={onBlur} required />
        {errors.subcounty && touched.subcounty && <p className="text-sm text-red-500">{errors.subcounty}</p>}
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="ward">Ward <span className="text-red-500">*</span></Label>
        <Input id="ward" name="ward" value={shippingInfo.ward} onChange={onChange} onBlur={onBlur} required />
        {errors.ward && touched.ward && <p className="text-sm text-red-500">{errors.ward}</p>}
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="streetAddress">Street Address <span className="text-red-500">*</span></Label>
        <Input id="streetAddress" name="streetAddress" value={shippingInfo.streetAddress} onChange={onChange} onBlur={onBlur} required />
        {errors.streetAddress && touched.streetAddress && <p className="text-sm text-red-500">{errors.streetAddress}</p>}
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="phoneNumber">Phone Number <span className="text-red-500">*</span></Label>
        <div className="flex">
            <Input
                id="areaCode"
                name="areaCode"
                value={shippingInfo.areaCode}
                className="w-24 bg-muted"
                readOnly
            />
            <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={shippingInfo.phoneNumber}
                onChange={onChange}
                onBlur={onBlur}
                className="flex-1 ml-2"
                required
            />
        </div>
        {errors.phoneNumber && touched.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
      </div>
    </div>
  </div>
);
