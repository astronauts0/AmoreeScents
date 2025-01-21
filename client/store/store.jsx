"use client";
import { applyMiddleware, legacy_createStore as createStore } from "redux";
import rootReducer from "./reducers/root/rootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { isBrowser } from "@/config/Variables";

const initialState = {
  cart: {
    cartItems:
      isBrowser && localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    shippingInfo:
      isBrowser && localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
  },
};

const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
