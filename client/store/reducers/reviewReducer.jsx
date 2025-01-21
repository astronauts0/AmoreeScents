import {
    NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_RESET, NEW_REVIEW_FAIL, CLEAR_ERRORS,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_RESET,
    DELETE_REVIEW_FAIL,
} from "../constants/productConstants";

export const newReviewReducer = (state = {}, { type, payload }) => {

    switch (type) {

        case NEW_REVIEW_REQUEST:

            return {
                ...state,
                loading: true,
            }

        case NEW_REVIEW_SUCCESS:

            return {
                loading: false,
                success: payload,
            }

        case NEW_REVIEW_RESET:

            return {
                ...state,
                success: false,
            }

        case NEW_REVIEW_FAIL:

            return {
                ...state,
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

export const productReviewsReducer = (state = { reviews: [] }, { type, payload }) => {

    switch (type) {

        case ALL_REVIEW_REQUEST:

            return {
                ...state,
                loading: true,
            }

        case ALL_REVIEW_SUCCESS:

            return {
                ...state,
                loading: false,
                reviews: payload,
            }

        case ALL_REVIEW_FAIL:

            return {
                ...state,
                loading: false,
                error: payload,
            }

        case CLEAR_ERRORS:

            return {
                ...state,
                error: null,
            }

        default:
            return state
    }

}

export const reviewReducer = (state = {}, { type, payload }) => {

    switch (type) {

        case DELETE_REVIEW_REQUEST:

            return {
                ...state,
                loading: true,
            }

        case DELETE_REVIEW_SUCCESS:

            return {
                ...state,
                loading: false,
                isDeleted: payload,
            }

        case DELETE_REVIEW_RESET:

            return {
                ...state,
                isDeleted: false,
            }

        case DELETE_REVIEW_FAIL:

            return {
                ...state,
                loading: false,
                error: payload,
            }

        case CLEAR_ERRORS:

            return {
                ...state,
                error: null,
            }

        default:
            return state
    }

}