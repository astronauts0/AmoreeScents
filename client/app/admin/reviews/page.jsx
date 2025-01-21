'use client'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, deleteReviews, getAllReviews } from "@/store/actions/newReviewAction";
import { DELETE_REVIEW_RESET } from "@/store/constants/productConstants";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "@/utils/Loader/Loader";
import { toast } from "react-toastify";
import Sidebar from "@/components/dashboard/Sidebar";
import MetaData from "@/utils/Meta/MetaData";
import ButtonTextIcon from "@/components/global/Buttons/ButtonTextIcon";
import isAuth from "@/Auth/isAuth";

const ProductReviews = () => {

    const dispatch = useDispatch();
 

    const { loading: deleteLoading, error: deleteError, isDeleted } = useSelector((state) => state.review);
    const { error, reviews, loading } = useSelector((state) => state.productReviews);

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) => {
        dispatch(deleteReviews(reviewId, productId));
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(getAllReviews(productId));
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
        }
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            toast.success("Review Deleted Successfully");
            dispatch({ type: DELETE_REVIEW_RESET });
        }
    }, [dispatch, toast, error, deleteError, isDeleted, productId]);

    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 210, flex: 0.5 },

        {
            field: "user",
            headerName: "User",
            minWidth: 180,
            flex: 0.6,
        },

        {
            field: "comment",
            headerName: "Comment",
            minWidth: 400,
            flex: 1,
        },

        {
            field: "rating",
            headerName: "Rating",
            type: "number",
            minWidth: 60,
            flex: 0.4,

            cellClassName: (params) => {
                return params.row.rating >= 3
                    ? "text_success"
                    : "text_error";
            },
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 80,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <button
                            onClick={() =>
                                deleteReviewHandler(params.row.id)
                            }
                        >
                            <i className="ri-delete-bin-7-line text-red-600 cursor-pointer text-xl"></i>
                        </button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name,
            });
        });

    if (deleteLoading) return <Loader />

    return (
      <>
        <MetaData title={`ALL REVIEWS - Admin`} />
        {loading ? (
          <Loader />
        ) : (
          <div className="flex">
            <Sidebar />
            <section className="flex justify-center flex-col items-center h-screen w-full mt-24">
              <div
                className={`bg-gray-200 shadow_black_1 w-full max-w-2xl rounded-lg py-6 flex justify-center items-center flex-col`}
              >
                <h1 className="text-3xl font-bold mb-4 text-center">
                  ALL REVIEWS {reviews && `(${reviews.length})`}
                </h1>
                <form onSubmit={productReviewsSubmitHandler}>
                  <input
                    onChange={(e) => setProductId(e.target.value)}
                    value={productId}
                    className="text-center outline-none bg-transparent border border_color rounded-full block size-60 px-3 py-2 mt-4"
                    type="text"
                    name="productId"
                    placeholder="Product Id"
                  />
                  {/* <div className='mt-10'>
                                    <ButtonTextIcon btnType='submit' Text='Send' customize="px-4 py-2 transition-all duration-1000 md:w-[60%] mx-auto hover:rounded-full" Icon={<i className="ri-send-plane-line text-lg"></i>} disabled={loading ? true : false || productId === "" ? true : false} />
                                </div> */}
                </form>
              </div>

              <div className="pt-20 pb-10">
                {reviews && reviews.length > 0 ? (
                  <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={7}
                    className="satoshi_medium h-screen"
                    data-lenis-prevent
                  />
                ) : (
                  <h1>No Reviews Found</h1>
                )}
              </div>
            </section>
          </div>
        )}
      </>
    );
};

export default isAuth(ProductReviews, true);