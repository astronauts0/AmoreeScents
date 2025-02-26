import ShipInfo from "@/components/shipping/ShipInfo";
import React from "react";

export const metadata = {
  title: "Shipping Policy || Amoree Scents",
  description:
    "Learn more about our shipping policy, delivery charges, and timings.",
  keywords: [
    "Amoree Scents",
    "Shipping Policy",
    "Delivery",
    "Pakistan Scents Brand",
    "Amorée Delivery Details",
  ],
  author: "Amorée Scents Team",
  robots: "index, follow",
};

const ShippingPolicy = () => {
  return (
    <div className=" min-h-screen pt-32">
      <div className="md:max-w-4xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 uppercase">
          SHIPPING POLICY
        </h1>

        <div className="satoshi_medium">
          <ShipInfo />
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
