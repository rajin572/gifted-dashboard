import { useState } from "react";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import AuthLayout from "@/Components/Shared/AuthLayout";
import { Button } from "@/Components/ui/button";
import { useForgetOtpVerifyMutation, useResendForgetOTPMutation } from "@/redux/features/auth/authApi";
import tryCatchWrapper from "@/utils/tryCatchWrapper";

const OTPVerify = () => {
  const router = useNavigate();
  const [otp, setOtp] = useState("");

  const forgottenEmail =
    (Cookies.get("gifted-mainforgetEmail")
      ? JSON.parse(Cookies.get("gifted-mainforgetEmail") as string)
      : null) ?? "admin@gifted.com";

  const [otpMatch] = useForgetOtpVerifyMutation();
  const [resendOtp] = useResendForgetOTPMutation();

  const handleOTPSubmit = async () => {
    if (otp.length === 6) {
      const res = await tryCatchWrapper(
        otpMatch,
        { body: { otp } },
        { toastLoadingMessage: "Verifying OTP..." }
      );
      if (res?.success && res?.data) {
        Cookies.remove("gifted-mainforgetToken");
        Cookies.remove("gifted-mainforgetEmail");
        Cookies.set("gifted-mainforgetOtpMatchToken", res.data, {
          path: "/",
          expires: 1,
        });
        setOtp("");
        router("/update-password");
      }
    }
  };

  const handleResendOtp = async () => {
    await tryCatchWrapper(
      resendOtp,
      undefined,
      { toastLoadingMessage: "Resending OTP..." }
    );
  };

  return (
    <AuthLayout
      subtitle="Reset your password"
      cardTitle="Enter OTP Code"
      cardDescription="Enter the 6-digit code sent to your email"
    >
      <div className="text-center">
        <p className="text-sm text-gray-500">We sent a 6-digit code to:</p>
        <p className="text-sm font-bold text-base-color mt-1">{forgottenEmail}</p>
      </div>

      <div className="mt-5">
        <p className="text-sm font-medium text-base-color text-center mb-3">Enter OTP Code</p>
        <div className="flex justify-center">
          <OTPInput
            inputStyle="!w-[42px] h-[48px] sm:!w-[48px] sm:!h-[52px] text-lg !bg-primary-color border !border-base-color/30 rounded-lg !mr-2 last:!mr-0 !text-base-color text-center"
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} required />}
          />
        </div>
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">
        Didn't receive the code?{" "}
        <span
          onClick={handleResendOtp}
          className="text-secondary-color font-semibold cursor-pointer hover:underline"
        >
          Resend OTP
        </span>
      </p>

      <Button
        onClick={handleOTPSubmit}
        variant="secondary"
        className="w-full mt-5"
        type="button"
        disabled={otp.length !== 6}
      >
        Verify OTP
      </Button>

      <Link
        to="/forgot-password"
        className="flex items-center justify-center text-sm font-medium text-base-color hover:text-secondary-color transition-colors mt-4"
      >
        Change Email
      </Link>
    </AuthLayout>
  );
};

export default OTPVerify;
