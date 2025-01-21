export const otpReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case 'SEND_OTP_REQUEST':
        case 'VERIFY_OTP_REQUEST':
            return { loading: true };
        case 'SEND_OTP_SUCCESS':
            return { loading: false, success: payload.success, message: payload.message };
        case 'VERIFY_OTP_SUCCESS':
            return { loading: false, isVerified: payload.success, message: payload.message };
        case 'SEND_OTP_FAIL':
        case 'VERIFY_OTP_FAIL':
            return { loading: false, error: payload };
        case 'CLEAR_ERRORS':
            return { ...state, error: null }
        default:
            return state;
    }
};