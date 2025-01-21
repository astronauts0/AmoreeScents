import request from "../Api/Api";

import { PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, CLEAR_ERRORS } from "../constants/productConstants";


export const getProductsDetails = (id) => async (dispatch) => {
    
    try {
        
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        
        const { data } = await request(`/product_by_id/${id}`);

        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.response.data.message });
    }

};

//% Clearing Errors
export const clearErrors = () => async (dispatch) => dispatch({ type: CLEAR_ERRORS });
