const sendToken = async (user, res) => {
  const token = await user.generateToken();

  const isProduction = process.env.NODE_ENV === "production";

  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE);

  const options = {
    maxAge: cookieExpireDays * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    path: "/",
  };

  res
    .status(200)
    .cookie("token", token, options)
    .json({ success: true, user, token });
};

module.exports = sendToken;
