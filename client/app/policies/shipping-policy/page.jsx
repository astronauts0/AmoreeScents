import React from "react";

export const metadata = {
  title: "Shipping Policy || Amorée Scents",
  description:
    "Pakistan's No. 1 Scents brand Amorée - Learn more about our shipping policy, delivery charges, and timings.",
  keywords: [
    "Amorée Scents",
    "Shipping Policy",
    "Delivery",
    "Pakistan Scents Brand",
    "Amorée Delivery Details",
  ],
  author: "Amorée Scents Team",
};

const ShippingPolicy = () => {
  return (
    <div className=" min-h-screen pt-32">
      <div className="md:max-w-4xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 uppercase">
          shipping POLICY
        </h1>

        <div className="satoshi_medium">
          <ol className="list-decimal list-inside space-y-4 leading-relaxed">
            <li>
              Deliveries within Lahore are completed in <mark>2-3 days.</mark>
            </li>
            <li>
              Deliveries to other cities take about <mark>3-5 days.</mark>
            </li>
            <li>
              Delivery <mark>charges are Rs. 200,</mark> with free delivery for
              orders <mark>above 3000.</mark> 
            </li>
            <li>
              Please place your order promptly to receive your product as soon
              as possible.
            </li>
            <li>
              For any queries, call us at{" "}
              <span className="obviously">
                {process.env.NEXT_PUBLIC_MOBILE_FOR_QUERIES}
              </span>{" "}
              or leave a voice note.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
