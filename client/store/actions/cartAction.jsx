import request from "../Api/Api";
import {
  ADD_TO_CART,
  REMOVE_ALL_ITEMS_TO_CART,
  REMOVE_TO_CART,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";

export const addItemsToCart =
  (id, variantId, color, qty) => async (dispatch, getState) => {
    const {
      data: { productDetails: product },
    } = await request(`/product_by_id/${id}`);

    const variant = product.variants.find(
      (variant) => variant._id === variantId
    );

    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: product._id,
        variantId: variant?._id,
        name: product.name,
        price: variant.price,
        stock: variant.stock,
        attributes: variant?.attributes,
        qty,
        color,
        slug: product.slug,
        image: product?.images[0]?.url,
      },
    });

    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeItemToCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_TO_CART, payload: id });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeAllItemsToCart = () => async (dispatch, getState) => {
  dispatch({ type: REMOVE_ALL_ITEMS_TO_CART });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_INFO, payload: data });
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
