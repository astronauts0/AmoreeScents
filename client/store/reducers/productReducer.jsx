import {
    ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS, ADMIN_PRODUCT_REQUEST
    , ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, NEW_PRODUCT_REQUEST, NEW_PRODUCT_SUCCESS, NEW_PRODUCT_RESET, NEW_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_RESET, DELETE_PRODUCT_FAIL,
    UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_RESET, UPDATE_PRODUCT_FAIL,
} from "../constants/productConstants";

const initialState = {
    products: [],
};

export const productsReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:

            return {
                ...state,
                loading: true,
            }

        case ALL_PRODUCT_SUCCESS:

            const { products, productsCount, resultPerPage, filteredProductsCount } = payload
            return {
                loading: false,
                products: products,
                productsCount: productsCount,
                resultPerPage,
                filteredProductsCount
            }

        case ADMIN_PRODUCT_SUCCESS:

            return {
                loading: false,
                products: payload,
            }

        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:

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


export const productReducer = (state = {}, { type, payload }) => {

    switch (type) {

        case DELETE_PRODUCT_REQUEST:
        case UPDATE_PRODUCT_REQUEST:

            return {
                ...state,
                loading: true,
            }

        case DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: payload,
            }

        case UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: payload,
            }

        case DELETE_PRODUCT_FAIL:
        case UPDATE_PRODUCT_FAIL:

            return {
                ...state,
                loading: false,
                error: payload
            }

        case DELETE_PRODUCT_RESET:

            return {
                ...state,
                isDeleted: false,
            }

        case UPDATE_PRODUCT_RESET:

            return {
                ...state,
                isUpdated: false,
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

export const newProductReducer = (state = { product: {} }, { type, payload }) => {

    switch (type) {

        case NEW_PRODUCT_REQUEST:

            return {
                ...state,
                loading: true,
            }

        case NEW_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: payload.success,
                product: payload.product,
            }

        case NEW_PRODUCT_FAIL:

            return {
                ...state,
                loading: false,
                error: payload
            }

        case NEW_PRODUCT_RESET:

            return {
                ...state,
                success: false,
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