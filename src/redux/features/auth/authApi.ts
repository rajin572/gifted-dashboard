import {
  IChangePasswordResponse,
  IForgotPasswordResponse,
  ILoginResponse,
  IMyProfileResponse,
  IResendOtpResponse,
  IResetPasswordResponse,
  IUpdateProfileResponse,
  IVerifyOtpResponse,
} from "@/types";
import { baseApi } from "../../api/baseApi";
import { tagTypes } from "../../tagTypes";

const auth_url = "/auth";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<ILoginResponse, { body: { email: string; password: string } }>({
      query: (req) => ({
        url: `${auth_url}/login`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    forgetPassword: build.mutation<IForgotPasswordResponse, { body: { email: string } }>({
      query: (req) => ({
        url: `${auth_url}/forgot-password-otpByEmail`,
        method: "POST",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    resendForgetOTP: build.mutation<IResendOtpResponse, { body?: { purpose?: string } } | void>({
      query: (req) => ({
        url: `/otp/resend-email-otp`,
        method: "PATCH",
        body: req?.body,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    forgetOtpVerify: build.mutation<IVerifyOtpResponse, { body: { otp: string } }>({
      query: (req) => ({
        url: `${auth_url}/forgot-password-otp-match`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    resetPassword: build.mutation<
      IResetPasswordResponse,
      { body: { newPassword: string; confirmPassword: string } }
    >({
      query: (req) => ({
        url: `${auth_url}/reset-password`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    changePassword: build.mutation<
      IChangePasswordResponse,
      { body: { oldPassword: string; newPassword: string } }
    >({
      query: (req) => ({
        url: `${auth_url}/change-password`,
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    getMyProfile: build.query<IMyProfileResponse, void>({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.auth],
    }),
    updateMyProfile: build.mutation<IUpdateProfileResponse, { body: FormData | Record<string, unknown> }>({
      query: (req) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body: req.body,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResendForgetOTPMutation,
  useForgetOtpVerifyMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} = authApi;

export default authApi;
