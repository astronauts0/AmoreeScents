import React, { useState } from "react";
import { Rating } from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import UserReviewsFeedback from "./UserReviewsFeedback";
import Link from "next/link";
import ProductRating from "./ProductRating";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const ReviewCard = ({
  review,
  isProductMention = false,
  // no need to pass product arrays anymore
}) => {
  const [showFullReview, setShowFullReview] = useState(false);
  const maxLength = 180;
  const shouldTruncate = review?.comment?.length > maxLength;

  return (
    <div className="masonry_item mb-4 bg-white shadow_black_1 rounded-lg overflow-hidden">
      {/* Image Slider or Single Image */}
      {review?.images.length > 0 &&
        (review?.images.length > 1 ? (
          <div className="w-full overflow-hidden">
            <Swiper
              effect={"fade"}
              loop={true}
              navigation={true}
              grabCursor={true}
              slidesPerView={1}
              modules={[EffectFade, Navigation, Autoplay]}
              className="mySwiper"
            >
              {review?.images.map((image, i) => (
                <SwiperSlide key={i}>
                  <Image
                    width={400}
                    height={200}
                    className="object-cover h-full w-full"
                    alt="slider"
                    src={image?.url}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="w-full overflow-hidden">
            <Image
              width={400}
              height={200}
              className="object-cover h-full w-full"
              alt="slider"
              src={review?.images[0]?.url}
            />
          </div>
        ))}

      <div className="p-4">
        {/* User Information */}
        <div className="flex items-center gap-x-2.5">
          <Image
            src={review?.userImg}
            alt="Profile"
            width={55}
            height={55}
            className="object-cover rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-800 capitalize">
              {review?.name}
            </h3>
            {review?.user?.orders[0] && (
              <div className="flex items-center gap-x-1 mt-1">
                <VerifiedOutlinedIcon fontSize="small" />
                <span className="bg-black text-white px-1.5 py-0.5 neue_machina_regular text-xs">
                  Verified Purchase
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Rating and Title */}
        <div className="flex items-center justify-between mt-4">
          <ProductRating ratings={review?.rating} />
        </div>
        <h1 className="font-bold my-2 satoshi_medium">{review?.reviewTitle}</h1>

        {/* Review Comment */}
        <p className="text-gray-600 text-sm mt-2 neue_machina_regular">
          <span>
            {showFullReview || !shouldTruncate
              ? review?.comment
              : `${review?.comment.slice(0, maxLength)}... `}
          </span>
          {shouldTruncate && !showFullReview && (
            <span
              className="text-blue-500 underline text-sm"
              onClick={() => setShowFullReview(true)}
            >
              Show Full Review
            </span>
          )}
        </p>

        <UserReviewsFeedback rating={review?.rating} user={review?.name} />

        {/* Product Mention Section */}
        {isProductMention && review.productName && (
          <div className="satoshi_medium flex items-center gap-x-2.5 mt-5 pt-3 border-t border_color">
            <div className="relative size-14">
              <Image
                src={review.productImage?.url}
                fill
                alt="Product Image"
                className="w-full h-full object-contain"
              />
            </div>
            <Link
              href={`/product/${review.productSlug}`}
              className="underline underline-offset-2"
            >
              {review.productName}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
