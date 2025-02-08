import request from "../Api/Api";
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  CLEAR_ERRORS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDERS_DETAILS_REQUEST,
  ORDERS_DETAILS_SUCCESS,
  ORDERS_DETAILS_FAIL,
  ALL_ORDERS_REQUEST,
  ALL_ORDERS_SUCCESS,
  ALL_ORDERS_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  PER_PRODUCT_ORDERS_REQUEST,
  PER_PRODUCT_ORDERS_SUCCESS,
  PER_PRODUCT_ORDERS_FAIL,
} from "../constants/orderConstants";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const { data } = await request.post("/order/new", order);

    dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: MY_ORDERS_REQUEST });

    const { data } = await request("/orders/me");

    dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({ type: MY_ORDERS_FAIL, payload: error?.response?.data?.message });
  }
};

export const perProductOrders = () => async (dispatch) => {
  try {
    dispatch({ type: PER_PRODUCT_ORDERS_REQUEST });

    const { data } = await request("/per_product_orders");

    dispatch({
      type: PER_PRODUCT_ORDERS_SUCCESS,
      payload: data.totalProductOrders,
    });
  } catch (error) {
    dispatch({
      type: PER_PRODUCT_ORDERS_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

// # admin
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_ORDERS_REQUEST });

    const { data } = await request("/admin/orders");

    dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: ALL_ORDERS_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ORDER_REQUEST });

    const { data } = await request.delete(`/admin/order/${id}`);

    dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_ORDER_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const updateOrder =
  (id, { status, payment }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ORDER_REQUEST });

      const { data } = await request.put(`/admin/order/${id}`, {
        status,
        payment,
      });

      dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_ORDER_FAIL,
        payload: error?.response?.data?.message,
      });
    }
  };

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDERS_DETAILS_REQUEST });

    const { data } = await request(`/order/${id}`);

    dispatch({ type: ORDERS_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: ORDERS_DETAILS_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const clearErrors = () => async (dispatch) =>
  dispatch({ type: CLEAR_ERRORS });
