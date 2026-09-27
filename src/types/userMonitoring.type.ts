import { IMeta } from "./common.type";

export type UserVerificationStatus = "VERIFIED ID" | "UNVERIFIED";
export type UserAccountStatus = "ACTIVE" | "UNDER REVIEW" | "SUSPENDED" | "BANNED";

export interface IUserMonitoringItem {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  isVerifiedDonor: boolean;
  role: string;
  location: string;
  giftsGiven: number;
  giftsReceived: number;
  verificationStatus: UserVerificationStatus;
  accountStatus: UserAccountStatus;
  joinedDate?: string;
  recentActivity?: string;
  communityBadges?: string[];
}

export interface IGetUserMonitoringResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IUserMonitoringItem[];
    meta: IMeta;
  };
}

export interface IGetUserMonitoringDetailResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUserMonitoringItem;
}

export interface IIssueWarningPayload {
  reason: string;
  category?: string;
  notifyUser?: boolean;
}

export interface ISuspendUserPayload {
  reason?: string;
  durationDays?: number;
}
