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
    <h2 className="text-xl font-semibold text-[#F5F5F5]">Shipping Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="firstName" className="text-[#F5F5F5]">First Name <span className="text-red-400">*</span></Label>
        <Input
          id="firstName"
          name="firstName"
          value={shippingInfo.firstName}
          onChange={onChange}
          onBlur={onBlur}
          required
          className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500"
        />
        {errors.firstName && touched.firstName && <p className="text-sm text-red-400">{errors.firstName}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName" className="text-[#F5F5F5]">Last Name <span className="text-red-400">*</span></Label>
        <Input
          id="lastName"
          name="lastName"
          value={shippingInfo.lastName}
          onChange={onChange}
          onBlur={onBlur}
          required
          className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500"
        />
        {errors.lastName && touched.lastName && <p className="text-sm text-red-400">{errors.lastName}</p>}
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="email" className="text-[#F5F5F5]">Email <span className="text-red-400">*</span></Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={shippingInfo.email}
          onChange={onChange}
          onBlur={onBlur}
          required
          className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500"
        />
        {errors.email && touched.email && <p className="text-sm text-red-400">{errors.email}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="county" className="text-[#F5F5F5]">County <span className="text-red-400">*</span></Label>
        <Input id="county" name="county" value={shippingInfo.county} onChange={onChange} onBlur={onBlur} required className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500" />
        {errors.county && touched.county && <p className="text-sm text-red-400">{errors.county}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="subcounty" className="text-[#F5F5F5]">Sub-county <span className="text-red-400">*</span></Label>
        <Input id="subcounty" name="subcounty" value={shippingInfo.subcounty} onChange={onChange} onBlur={onBlur} required className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500" />
        {errors.subcounty && touched.subcounty && <p className="text-sm text-red-400">{errors.subcounty}</p>}
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="ward" className="text-[#F5F5F5]">Ward <span className="text-red-400">*</span></Label>
        <Input id="ward" name="ward" value={shippingInfo.ward} onChange={onChange} onBlur={onBlur} required className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500" />
        {errors.ward && touched.ward && <p className="text-sm text-red-400">{errors.ward}</p>}
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="streetAddress" className="text-[#F5F5F5]">Street Address <span className="text-red-400">*</span></Label>
        <Input id="streetAddress" name="streetAddress" value={shippingInfo.streetAddress} onChange={onChange} onBlur={onBlur} required className="bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500" />
        {errors.streetAddress && touched.streetAddress && <p className="text-sm text-red-400">{errors.streetAddress}</p>}
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="phoneNumber" className="text-[#F5F5F5]">Phone Number <span className="text-red-400">*</span></Label>
        <div className="flex">
            <Input
                id="areaCode"
                name="areaCode"
                value={shippingInfo.areaCode}
                className="w-24 bg-[#a0e1db] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A]"
                readOnly
            />
            <Input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={shippingInfo.phoneNumber}
                onChange={onChange}
                onBlur={onBlur}
                className="flex-1 ml-2 bg-[#90D1CA] text-[#3A3A3A] border-transparent focus:ring-2 focus:ring-[#FFD59A] placeholder:text-gray-500"
                required
            />
        </div>
        {errors.phoneNumber && touched.phoneNumber && <p className="text-sm text-red-400">{errors.phoneNumber}</p>}
      </div>
    </div>
  </div>
);
