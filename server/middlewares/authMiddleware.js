const usersModel = require("../models/usersModel");
const ErrorHandler = require("../utils/error/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");


exports.isAuthenticatedUser = catchAsyncError(

    async (req, res, next) => {

        const { token } = req.cookies;

        if (!token) return next(new ErrorHandler("Please Login!", 401));

        try {

            const decodedData = jwt.verify(token, process.env.JWT_SECRET);
            const user = await usersModel.findById(decodedData?.id);
            req.user = user;
            next();

        } catch (error) {
            console.log("🚀 ~ error:", error);
            return next(new ErrorHandler("Your Token has been Expired. Login again", 400));
        }
    }
);

exports.authorizedRole = (...roles) => (req, res, next) => {

    if (!roles.includes(req.user.role)) return next(new ErrorHandler(`  Role: ${req.user.role} is not allowed to access this resource`, 403));
    next();

}