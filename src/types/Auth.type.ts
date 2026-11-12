export interface IUserPhone {
  code: string;
  number: string;
  fullNumber: string;
}

export interface IJwtPayload {
  userId: string;
  role: string;
  fullName: string;
  profileImage: string | null;
  email: string;
  phone?: IUserPhone | string;
  isVerifiedByAdmin?: boolean;
  iat?: number;
  exp?: number;
}

export interface IAuthUser {
  _id: string;
  email: string;
  role: string;
  fullName: string;
  gender?: string;
  phone?: IUserPhone | string;
  profileImage?: string;
  isPhoneVerified?: boolean;
  isBlocked?: boolean;
  isVerifiedByAdmin?: boolean;
  hasCompletedProfile?: boolean;
  isCompleteNidInfo?: boolean;
  isDeleted?: boolean;
  passwordChangedAt?: string;
  loginWth?: string;
  fcmToken?: string | null;
  lastActiveAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  subscriptionTier?: string;
  activeSubscription?: unknown;
  stripeCustomerId?: string | null;
  subscriptionExpiresAt?: string | null;
  isSuspended?: boolean;
  suspendedUntil?: string | null;
  totalGiftsGiven?: number;
  totalStreamsHosted?: number;
  giftGiven?: number;
  giftReceived?: number;
  liveTouch?: number;
  neighborhoodLabel?: string;
  communityTrustScore?: number;
  agreedToRules?: boolean;
  agreedToRulesAt?: string | null;
  totalStoriesClaimed?: number;
  totalGiftsReceived?: number;
  about?: string;
  yearsOfExperience?: number;
}

export interface ILoginResponseData {
  user: IAuthUser;
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ILoginResponseData;
}

export interface IForgotPasswordResponseData {
  forgetToken: string;
}

export interface IForgotPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IForgotPasswordResponseData;
}

export interface IVerifyOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: string;
}

export interface IResendOtpResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    message: string;
  };
}

export interface IResetPasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: IAuthUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IChangePasswordResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    user: IAuthUser;
    accessToken: string;
    refreshToken: string;
  };
}

export interface IMyProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IAuthUser;
}

export interface IUpdateProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IAuthUser;
}

export interface IRefreshTokenResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken?: string;
  };
}
