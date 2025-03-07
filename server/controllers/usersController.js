const catchAsyncError = require("../middlewares/catchAsyncError");
const usersModel = require("../models/usersModel");
const ErrorHandler = require("../utils/error/errorHandler");
const cloudinary = require("cloudinary").v2;
const sendToken = require("../utils/functions/jwtToken");
const passwordRecoveryMail = require("../utils/mails/passwordRecoveryMail");
const crypto = require("crypto");
const welcomeMessageMail = require("../utils/mails/welcomeMessageMail");

//* register user
exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, phone, password } = req.body;

  if (!req.body) {
    return next(new ErrorHandler("Please Enter all fields", 400));
  }

  const userExist = await usersModel.findOne({ email });
  if (userExist) {
    return next(new ErrorHandler("Something went wrong Try Again", 400));
  }

  const user = await usersModel.create(req.body);

  if (!user) return next(new ErrorHandler("User Not Create", 404));

  await welcomeMessageMail({ name: user.name, email: user.email });

  sendToken(user, res);
});

//* login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return next(new ErrorHandler("Please Enter Email & Password", 404));

  const user = await usersModel.findOne({ email }).select("+password");

  if (!user) return next(new ErrorHandler("User Not Found", 404));

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched)
    return next(new ErrorHandler("Invalid Email or Password", 404));

  await welcomeMessageMail({ name: user.name, email: user.email });

  sendToken(user, res);
});

//* logout user
exports.logoutUser = catchAsyncError(async (req, res, next) => {
  const isProduction = process.env.NODE_ENV === "production";

  const options = {
    maxAge: 0,
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    path: "/",
  };

  return res.status(200).clearCookie("token", options).json({ success: true });
});

//* forget password
exports.forgetPassword = catchAsyncError(async (req, res, next) => {
  if (!req.body.email) return next(new ErrorHandler("Please Enter Email", 400));
  const user = await usersModel.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("Invalid Email", 404));

  //% Get ResetPassword Token
  const resetToken = await user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  // const resetPasswordUrl = `${req.protocol}://${req.get(
  //   "host"
  // )}/api/v1/password/reset/${resetToken}`;
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await passwordRecoveryMail({
      email: user.email,
      subject: `Amoree Scents Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Password recovery link is sent to ${user.email} successfully`,
    });
  } catch (error) {
    console.log(
      "🚀 ~ exports.forgetPassword=catchAsyncError ~ error:",
      error.message
    );
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});

// * reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  if (!req.body.password || !req.body.confirmPassword)
    return next(new ErrorHandler("Please fill all fields", 400));

  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await usersModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHandler(
        `Reset Password Token is invalid or has been expired. "Forget Password Again" `,
        404
      )
    );

  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHandler("Password does not match", 400));

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, res);
});

// * get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await usersModel.findById(req.user?._id.toString());

  if (!user) return next(new ErrorHandler("User Not Found", 404));

  res.status(200).json({ success: true, user });
});

//* user password update
exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await usersModel.findById(req.user.id).select("+password");

  if (
    !req.body.oldPassword ||
    !req.body.newPassword ||
    !req.body.confirmPassword
  )
    return next(new ErrorHandler("Please fill all fields", 400));

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched)
    return next(new ErrorHandler("Old Password Is Incorrect", 400));

  if (req.body.newPassword !== req.body.confirmPassword)
    return next(new ErrorHandler("Password does not match", 400));

  user.password = req.body.newPassword;
  await user.save();
  sendToken(user, res);
});

//* update user profile without password
exports.updateProfile = catchAsyncError(async (req, res, next) => {

  if (!req.body) return next(new ErrorHandler("Please fill all fields", 400));

  const user = await usersModel.findById(req.user.id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  const updatedUser = await usersModel.findByIdAndUpdate(
    req.user.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!updatedUser)
    return next(
      new ErrorHandler(
        `User not found with id ${req.user.id} or not updated`,
        404
      )
    );

  res.status(200).json({ success: true, user: updatedUser });
});
//# get all users for ~~Admin
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
  const users = await usersModel.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//# get users details for ~~Admin
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await usersModel.findById(req.params.id);

  if (!user)
    return next(
      new ErrorHandler(`User does not exist with this ${req.params.id} Id`, 404)
    );

  res.status(200).json({ success: true, user });
});

//# update user Profile or Role by ~~Admin
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const updatedUser = await usersModel.findByIdAndUpdate(
    req.params.id,
    newUserData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  if (!updatedUser)
    return next(new ErrorHandler("User Not update or not found", 404));

  res.status(200).json({ success: true, updatedUser });
});

//# delete user by ~~Admin
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await usersModel.findById(req.params.id);
  if (!user)
    return next(
      new ErrorHandler(`User does not exist with this ${req.params.id} Id`, 404)
    );

  await user.deleteOne();

  res.status(200).json({ success: true, message: "User deleted successfully" });
});
