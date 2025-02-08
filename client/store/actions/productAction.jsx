import request from "../Api/Api";

import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  CLEAR_ERRORS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
} from "../constants/productConstants";

export const getProducts =
  (keyword = "", currentPage = 1, price = [0, 40000], category, ratings = 0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCT_REQUEST });

      let URL = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

      if (category) {
        URL = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
      }

      const { data } = await request(URL);

      dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

// #admin products
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST });

    const { data } = await request("/admin/products");

    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: ADMIN_PRODUCT_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// #admin create product
export const createProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_PRODUCT_REQUEST });

    const { data } = await request.post("/admin/product/new", productData);

    dispatch({ type: NEW_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_PRODUCT_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// #admin delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PRODUCT_REQUEST });

    const { data } = await request.delete(`/admin/product/${id}`);

    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCT_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// #admin update product
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const { data } = await request.put(`/admin/product/${id}`, productData);

    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

//% Clearing Errors
export const clearErrors = () => async (dispatch) =>
  dispatch({ type: CLEAR_ERRORS });
