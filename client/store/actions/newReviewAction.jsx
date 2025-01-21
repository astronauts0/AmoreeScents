import request from "../Api/Api";

import {
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  CLEAR_ERRORS,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
} from "../constants/productConstants";

export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST });
    const { data } = await request.put("/review", reviewData);
    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.response.data.message });
  }
};

export const getAllReviews = (id) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST });

    const { data } = await request(`/reviews?id=${id}`);
    dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({ type: ALL_REVIEW_FAIL, payload: error.response.data.message });
  }
};

export const deleteReviews = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST });

    const { data } = await request.delete(
      `/reviews?id=${reviewId}&productId=${productId}`
    );
    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//% Clearing Errors
export const clearErrors = () => async (dispatch) =>
  dispatch({ type: CLEAR_ERRORS });
