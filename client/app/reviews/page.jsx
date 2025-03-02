import React from "react";
import TotalReviews from "@/components/reviews/TotalReviews";

export const metadata = {
  title: "Customer Reviews - Trusted Feedback & Ratings || Amoree Scents",
  description:
    "Read genuine customer reviews and ratings to understand why our customers trust and love our premium products. Discover real feedback that speaks for itself.",
  keywords:
    "amoree, amoreescents, amoreescents reviews, amoree reviews, amoree scents reviews, amoree scents, customer reviews, genuine feedback, product ratings, trusted reviews, premium products, customer testimonials",
  openGraph: {
    title: "Customer Reviews - Trusted Feedback & Ratings || Amoree Scents",
    description:
      "Read genuine customer reviews and ratings to understand why our customers trust and love our premium products. Discover real feedback that speaks for itself.",
    url: process.env.NEXT_PUBLIC_FRONTEND_URL,
    image:
      "https://res.cloudinary.com/ddrd0vxzq/image/upload/v1737568469/socials_preview_x94t9l.gif",
    type: "website",
    locale: "en_US",
  },
  author: "Amoree Scents Team",
  robots: "index, follow",
};

const allReviews = () => {
  return <TotalReviews />;
};

export default allReviews;
