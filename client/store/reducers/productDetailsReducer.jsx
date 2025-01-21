import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, CLEAR_ERRORS } from "../constants/productConstants";

const initialState = {
    product: [],
};

export const productDetailsReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case PRODUCT_DETAILS_REQUEST:

            return {
                loading: true,
                ...state
            }

        case PRODUCT_DETAILS_SUCCESS:

            const { productDetails } = payload;
            return {
                loading: false,
                product: productDetails
            }

        case PRODUCT_DETAILS_FAIL:

            return {
                loading: false,
                error: payload
            }

        case CLEAR_ERRORS:

            return {
                ...state,
                error: null
            }

        default:
            return state
    }

}