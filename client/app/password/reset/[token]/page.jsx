import React from "react";
import ResetPassword from "@/modules/dynamics/ResetPassword";

export const dynamic = "force-dynamic";

const ResetPasswordToken = ({ params: { token } }) => {
  return <ResetPassword token={token} />;
};

export default ResetPasswordToken;