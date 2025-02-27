import React from "react";

export const metadata = {
  title: "Refund Policy || Amoree Scents",
  description:
    "Learn about Amoree Scents' refund and exchange policy. Easy returns within 14 days for unused products.",
  keywords: [
    "Amoree Scents",
    "Refund Policy",
    "Exchange Policy",
    "Fragrance Returns",
    "Return and Exchange",
  ],
  author: "Amoree Scents Team",
  robots: "index, follow",
};

const RefundPolicy = () => {
  return (
    <div className=" min-h-screen pt-32 pb-10">
      <div className="md:max-w-4xl mx-auto px-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 uppercase">
          REFUND POLICY
        </h1>

        <div className="satoshi_medium">
          <ol className="list-decimal list-inside space-y-4 leading-relaxed">
            <li>
              We guarantee satisfaction with every purchase. If you're not
              pleased with a product, feel free to return it, kindly WhatsApp us
              at{" "}
              <span className="obviously">
                {process.env.NEXT_PUBLIC_MOBILE_FOR_QUERIES}
              </span>
              .
            </li>
            <li>
              Our return and exchange policy extends for a generous{" "}
              <mark>14 days</mark> from the date of order delivery.
            </li>
            <li>
              To qualify for an exchange, products should be mostly unused, with
              at least <mark>90% of the content remaining</mark>.
            </li>
            <li>
              We process all return and exchange requests promptly, typically
              within <mark>3 to 5 working days</mark>.
            </li>
            <li>
              Please note, delivery charges for the original order are
              non-refundable.
            </li>
            <li>
              Customers are responsible for any delivery charges incurred for
              exchanging products.
            </li>
            <li>
              In cases of <mark>damage or leakage</mark>, we will cover all
              delivery charges related to the return and exchange.
            </li>
          </ol>

          <ul className="mt-10 space-y-2 border-t border_color p-4">
            <li>
              {" "}
              <span className="attila tracking-wide">Address:</span> Raiwind
              Road, Sher Shah, Lahore, Pakistan
            </li>
            <li>
              <span className="attila tracking-wide">WhatsApp Us:</span>{" "}
              <span className="obviously">
                {process.env.NEXT_PUBLIC_MOBILE_FOR_QUERIES}
              </span>
            </li>
            <li>
              <span className="attila tracking-wide">Customer Support:</span>
              <a
                href="mailto:amoréescents@gmail.com"
                className="text-blue-500 hover:underline"
              >
                {" "}
                amoreescents@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
