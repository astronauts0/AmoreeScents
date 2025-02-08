"use client";
import React, { useEffect } from "react";
import ReviewCard from "@/components/Products/ReviewCard";
import { getTotalReviews, clearErrors } from "@/store/actions/newReviewAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReviewsFilter from "@/components/reviews/ReviewsFilter";
import Loader from "@/utils/Loader/Loader";
import MetaData from "@/utils/Meta/MetaData";
import ProductRating from "@/components/Products/ProductRating";

const TotalReviews = () => {
  const dispatch = useDispatch();
  const { loading, reviews, error } = useSelector(
    (state) => state.productReviews
  );

  const allReviews =
    reviews?.flatMap((product) =>
      product.reviews.map((review) => ({
        ...review,
        productImage: product.productImage,
        productName: product.productName,
        productSlug: product.productSlug,
      }))
    ) || [];

  const totalRatings = allReviews.reduce(
    (sum, review) => sum + review.rating,
    0
  );

  const averageRating =
    allReviews.length > 0
      ? +(totalRatings / allReviews.length).toFixed(1)
      : 0.0;

  const ratingStats = [5, 4, 3, 2, 1].map((stars) => {
    const count = allReviews.filter((review) => review.rating === stars).length;
    const percentage = count ? (count / allReviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getTotalReviews());
  }, [dispatch, error]);

  return (
    <section className="w-full md:px-8 pt-28 pb-10">
      <MetaData title={"All Reviews"} />
      {loading ? (
        <Loader />
      ) : (
        <div>
          <h2 className="text-2xl text-center md:text-left font-bold mb-5">
            Customer Reviews
          </h2>
          {/* Ratings & Statistics Section */}
          <div className="flex items-center justify-center flex-col md:flex-row md:justify-between mb-8 pt-4 pb-8 satoshi_medium border-b border_color gap-y-6 md:gap-y-0">
            <div className="flex items-center gap-y-6 md:gap-y-0 justify-center flex-wrap">
              <div className="md:pr-10 text-center">
                <div className="text-2xl font-bold">{averageRating}</div>
                <div className="flex justify-center my-2 animate-pulse">
                  <ProductRating ratings={averageRating} />
                </div>
                <div className="font-bold">{allReviews.length} reviews</div>
              </div>

              <div className="md:border-l border_color md:pl-10">
                {ratingStats.map((stat) => (
                  <div key={stat.stars} className="flex items-center mb-2">
                    <div className="text-sm">{stat.stars} Star</div>
                    <div className="flex-1 h-4 mx-4 rounded-full bg-slate-200 w-40 overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${stat.percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-right">{stat.count}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* <ReviewsFilter /> */}
          </div>
          {/* Reviews Section */}
          {allReviews.length > 0 ? (
            <div className="masonry_grid">
              {allReviews.map((review, i) => (
                <ReviewCard key={i} review={review} isProductMention={true} />
              ))}
            </div>
          ) : (
            <p className="text-center mt-5 w-full">
              No reviews yet. Be the first to leave a review!
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default TotalReviews;
