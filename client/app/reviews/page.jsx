import React from "react";
import TotalReviews from "@/components/reviews/TotalReviews";

export const metadata = {
  title: "Customer Reviews - Trusted Feedback & Ratings || Amoree Scents",
  description:
    "Read genuine customer reviews and ratings to understand why our customers trust and love our premium products. Discover real feedback that speaks for itself.",
  keywords:
    "amoree, amoree scents, customer reviews, genuine feedback, product ratings, trusted reviews, premium products, customer testimonials",
  author: "Amorée Scents Team",
  robots: "index, follow",
};

const allReviews = () => {
  return <TotalReviews />;
};

export default allReviews;
