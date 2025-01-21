import request from '../Api/Api';

// Send OTP
export const sendOtp = (email) => async (dispatch) => {
    try {
        dispatch({ type: 'SEND_OTP_REQUEST' });

        const { data } = await request.post('/otp/send', { email });

        dispatch({
            type: 'SEND_OTP_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'SEND_OTP_FAIL',
            payload: error.response?.data?.message || 'Error sending OTP',
        });
    }
};

// Verify OTP
export const verifyOtp = (email, otp) => async (dispatch) => {
    try {
        dispatch({ type: 'VERIFY_OTP_REQUEST' });

        const { data } = await request.post('/otp/verify', { email, otp });

        dispatch({
            type: 'VERIFY_OTP_SUCCESS',
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: 'VERIFY_OTP_FAIL',
            payload: error.response?.data?.message || 'Error verifying OTP',
        });
    }
};

export const clearErrors = () => async (dispatch) => dispatch({ type: 'CLEAR_ERRORS' });