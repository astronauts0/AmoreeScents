import React from "react";
import { Rating } from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { EffectFade, Navigation, Autoplay } from "swiper/modules";
import UserReviewsFeedback from "./UserReviewsFeedback";

const ReviewCard = ({ review }) => {
  return (
    <div className="masonry_item mb-4 bg-white shadow_black_1 rounded-lg overflow-hidden">
      {review?.images.length > 0 &&
        (review?.images.length > 1 ? (
          <div className="w-full overflow-hidden">
            <Swiper
              effect={"fade"}
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
        <div className="flex items-center justify-between mt-4">
          <Rating
            value={review?.rating}
            readOnly
            size="medium"
            precision={1}
            icon={<FavoriteIcon fontSize="medium" />}
            emptyIcon={<FavoriteBorderIcon fontSize="medium" />}
          />
          <span className="text-sm obviously text-gray-500">
            {review?.createdAt.slice(0, 10)}
          </span>
        </div>
        <h1 className="font-bold my-2 satoshi_medium">{review?.reviewTitle}</h1>
        <p className="text-gray-600 text-sm mt-2 neue_machina_regular">
          {review?.comment}
        </p>
        <UserReviewsFeedback rating={review?.rating} user={review?.name} />
      </div>
    </div>
  );
};

export default ReviewCard;
