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
  UPDATE_ORDER_RESET,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_RESET,
  DELETE_ORDER_FAIL,
  PER_PRODUCT_ORDERS_REQUEST,
  PER_PRODUCT_ORDERS_SUCCESS,
  PER_PRODUCT_ORDERS_FAIL,
} from "../constants/orderConstants";

export const createOrderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_ORDER_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case CREATE_ORDER_SUCCESS:
      return {
        loading: false,
        order: payload,
      };

    case CREATE_ORDER_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case MY_ORDERS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case MY_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: payload,
      };

    case MY_ORDERS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const perProductOrdersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PER_PRODUCT_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case PER_PRODUCT_ORDERS_SUCCESS:
      return {
        loading: false,
        totalProductOrders: payload,
      };

    case PER_PRODUCT_ORDERS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

//# Admin
export const allOrdersReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case ALL_ORDERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ALL_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: payload,
      };

    case ALL_ORDERS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const orderReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload.success,
        message: payload.message,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: payload,
      };

    case UPDATE_ORDER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case DELETE_ORDER_RESET:
      return {
        ...state,
        isDeleted: false,
      };

    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { order: {} },
  { type, payload }
) => {
  switch (type) {
    case ORDERS_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case ORDERS_DETAILS_SUCCESS:
      return {
        loading: false,
        order: payload,
      };

    case ORDERS_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
