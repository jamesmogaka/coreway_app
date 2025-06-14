import type { FC, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ShippingInfo } from "./types";

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const ShippingForm: FC<ShippingFormProps> = ({ shippingInfo, onChange }) => (
  <div className="space-y-6">
    <h2 className="text-xl font-semibold">Shipping Information</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name</Label>
        <Input
          id="firstName"
          name="firstName"
          value={shippingInfo.firstName}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name</Label>
        <Input
          id="lastName"
          name="lastName"
          value={shippingInfo.lastName}
          onChange={onChange}
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
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="county">County</Label>
        <Input id="county" name="county" value={shippingInfo.county} onChange={onChange} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="subcounty">Sub-county</Label>
        <Input id="subcounty" name="subcounty" value={shippingInfo.subcounty} onChange={onChange} required />
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="ward">Ward</Label>
        <Input id="ward" name="ward" value={shippingInfo.ward} onChange={onChange} required />
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="streetAddress">Street Address</Label>
        <Input id="streetAddress" name="streetAddress" value={shippingInfo.streetAddress} onChange={onChange} required />
      </div>
      <div className="md:col-span-2 space-y-2">
        <Label htmlFor="phoneNumber">Phone Number</Label>
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
                className="flex-1 ml-2"
                required
            />
        </div>
      </div>
    </div>
  </div>
);
