import {
  ADD_TO_CART,
  REMOVE_ALL_ITEMS_TO_CART,
  REMOVE_TO_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  { type, payload }
) => {
  switch (type) {
    case ADD_TO_CART:
          
      const existingItem = state.cartItems.find(
        (item) => item.variantId === payload.variantId
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.variantId === existingItem.variantId ? payload : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, payload],
        };
      }

    case REMOVE_TO_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.variantId !== payload),
      };

    case REMOVE_ALL_ITEMS_TO_CART:
      return {
        ...state,
        cartItems: [],
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: payload,
      };

    default:
      return state;
  }
};
