import { combineReducers } from "redux";
import { newProductReducer, productReducer, productsReducer } from "../productReducer";
import { productDetailsReducer } from "../productDetailsReducer";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer } from "../userReducer";
import { cartReducer } from "../cartReducer";
import { allOrdersReducer, createOrderReducer, myOrdersReducer, orderReducer, orderDetailsReducer, perProductOrdersReducer } from "../orderReducer";
import { newReviewReducer, productReviewsReducer, reviewReducer } from "../reviewReducer";
import { otpReducer } from "../otpReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgetPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: createOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  perProductOrders: perProductOrdersReducer,
  order: orderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  review: reviewReducer,
  otp: otpReducer,
});

export default rootReducer;