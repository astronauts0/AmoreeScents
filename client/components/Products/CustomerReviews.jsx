"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Rating } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { newReview } from "@/store/actions/newReviewAction";
import ButtonTextIcon from "../global/Buttons/ButtonTextIcon";
import { NEW_REVIEW_RESET } from "@/store/constants/productConstants";
import { clearErrors } from "@/store/actions/productDetailsAction";
import { toast } from "react-toastify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReviewCard from "./ReviewCard";
import { useRouter } from "next/navigation";
import Loader from "@/utils/Loader/Loader";
import ProductRating from "@/components/Products/ProductRating";
import Compressor from "compressorjs";

const CustomerReviews = ({ reviews, productId, ratings }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const formattedRating = Number(ratings).toFixed(1);

  const { isAuthenticated, error: authError } = useSelector(
    (state) => state.user
  );

  const {
    loading,
    success,
    error: reviewError,
  } = useSelector((state) => state.newReview);

  const [reviewData, setReviewData] = useState({
    rating: 0,
    reviewTitle: "",
    comment: "",
  });
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [compressProgress, setCompressProgress] = useState(0);

  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  const ratingStats = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviews.filter((review) => review.rating === stars).length;
    const percentage = count ? (count / reviews.length) * 100 : 0;
    return { stars, count, percentage };
  });

  const reviewChangeHandler = async (e) => {
    if (e.target.name === "reviewImages") {
      let files = Array.from(e.target.files);

      if (files.length > 3) {
        toast.error("You can upload a maximum of 3 images");
        files = files.slice(0, 3);
      }

      setImagesPreview([]);
      setImages([]);
      setCompressProgress(5);

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          await new Promise((resolve, reject) => {
            new Compressor(file, {
              quality: 0.5,
              mimeType: "image/webp",
              success(result) {
                setCompressProgress(20);
                const reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onloadend = () => {
                  setCompressProgress(40);
                  setImagesPreview((old) => [...old, reader.result]);
                  setImages((old) => [...old, reader.result]);
                  resolve();
                  setCompressProgress(70);
                };
              },
              error(err) {
                console.error("Error compressing image:", err);
                toast.error("Upload Failed. Try Again!");
                reject(err);
              },
            });
          });
        } catch (error) {
          console.error("Compression error:", error);
        }
      }
      setCompressProgress(100);
    } else {
      setReviewData({ ...reviewData, [e.target.name]: e.target.value });
    }
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error(authError);
      dispatch(clearErrors());
      router.push("/login");
      return;
    }

    if (reviewData.rating === 0) {
      toast.error("Please give us hearts.");
      return;
    }

    if (compressProgress>=5 && compressProgress < 100) {
      toast.error("🚀 Image upload in progress. Please wait...");
      return;
    }

    dispatch(newReview({ ...reviewData, images, productId }));
    setIsReviewFormOpen(false);
  };

  useEffect(() => {
    if (reviewError) {
      toast.error(reviewError);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success(
        "Review Submitted Successfully. You can see it after few minutes."
      );
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, reviewError, success]);

  return (
    <div className="w-full md:px-5">
      <h2 className="text-2xl text-center md:text-left font-bold mb-5">
        Customer Reviews
      </h2>

      <div className="flex items-center justify-center flex-col md:flex-row md:justify-between mb-8 pt-4 pb-8 satoshi_medium border-b border_color gap-y-6 md:gap-y-0">
        <div className="flex items-center gap-y-6 md:gap-y-0 justify-center flex-wrap">
          <div className="md:pr-10 text-center">
            <div className="text-2xl font-bold">{formattedRating}</div>
            <div className="flex justify-center my-2 animate-pulse">
              <ProductRating ratings={ratings} />
            </div>
            <div className="font-bold">{reviews.length} reviews</div>
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

        <div>
          {loading ? (
            <Loader height="h-auto" />
          ) : (
            <div onClick={() => setIsReviewFormOpen(true)}>
              <ButtonTextIcon
                Text="Write a review"
                customize="w-full px-4 py-2 hover:rounded-full"
                Icon={<i className="ri-pencil-line text-xl animate-ping"></i>}
              />
            </div>
          )}
        </div>
      </div>

      {reviews && reviews[0] ? (
        <div className="masonry_grid">
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      ) : (
        <p className="text-center mt-5 w-full">
          No reviews yet. Be the first to leave a review!
        </p>
      )}

      {isReviewFormOpen && (
        <div className="fixed inset-0 bg-black backdrop-blur-lg bg-opacity-50 h-screen flex items-center justify-center z-50">
          <div
            data-lenis-prevent
            className="bg-white h-[80vh] overflow-auto rounded-lg p-8 max-w-md w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">Write a Review</h2>
              <button
                onClick={() => setIsReviewFormOpen(false)}
                className="text-black"
              >
                <i className="ri-close-line text-4xl"></i>
              </button>
            </div>
            <form onSubmit={reviewSubmitHandler}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rating
                </label>
                <div className="flex">
                  <Rating
                    name="rating"
                    precision={1}
                    value={reviewData.rating}
                    onChange={reviewChangeHandler}
                    icon={<FavoriteIcon fontSize="large" />}
                    emptyIcon={<FavoriteBorderIcon fontSize="large" />}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="reviewTitle"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Review Title
                </label>
                <input
                  name="reviewTitle"
                  value={reviewData.reviewTitle}
                  onChange={reviewChangeHandler}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="comment"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Review Description
                </label>
                <textarea
                  name="comment"
                  value={reviewData.comment}
                  onChange={reviewChangeHandler}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                ></textarea>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="reviewImages"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Add Images
                </label>
                <input
                  type="file"
                  name="reviewImages"
                  accept="image/*"
                  onChange={reviewChangeHandler}
                  multiple
                  className="text-center outline-none bg-transparent border border_color block w-full px-3 py-2 mt-4"
                />

                {imagesPreview && (
                  <div className="flex w-full overflow-hidden items-center gap-3 py-3">
                    {imagesPreview.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt="Review Preview"
                        width={50}
                        height={50}
                      />
                    ))}
                  </div>
                )}

                {compressProgress > 0 && compressProgress <= 100 && (
                  <div className="w-full bg-green-200 rounded-full">
                    <div
                      className="bg-green-400 text-xs font-medium text-green-100 text-center p-0.5 leading-none rounded-full"
                      style={{ width: `${compressProgress}%` }}
                    >
                      {compressProgress.toFixed(0)}%
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
