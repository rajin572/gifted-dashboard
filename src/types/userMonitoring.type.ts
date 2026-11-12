import { IMeta } from "./common.type";

export type UserAccountStatus = "ACTIVE" | "UNDER REVIEW" | "SUSPENDED" | "BANNED" | string;

export interface IUserSupervisionItem {
  _id: string;
  fullName: string;
  email: string;
  profileImage?: string;
  phone?: string;
  role: string;
  communityRole: string;
  neighborhoodLabel: string;
  giftGiven: number;
  giftReceived: number;
  formattedGiveReceive: string;
  totalStreamsHosted: number;
  totalStoriesClaimed: number;
  communityTrustScore: number;
  accountStatus: UserAccountStatus;
  isBlocked: boolean;
  isSuspended: boolean;
  suspendedUntil?: string | null;
  hasCompletedProfile: boolean;
  lastActiveAt?: string | null;
  createdAt: string;
}

export interface IUserSupervisionSummary {
  totalSupervisedMembers: number;
  totalActive: number;
  totalUnderReview: number;
  totalSuspended: number;
  totalBlocked: number;
}

export interface IGetUserSupervisionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    summary: IUserSupervisionSummary;
    meta: IMeta;
    data: IUserSupervisionItem[];
  };
}

export interface IUserInspectUser {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  profileImage?: string;
  role: string;
  neighborhoodLabel?: string;
  communityTrustScore?: number;
  giftGiven?: number;
  giftReceived?: number;
  totalStreamsHosted?: number;
  totalStoriesClaimed?: number;
  isBlocked?: boolean;
  isSuspended?: boolean;
  suspendedUntil?: string | null;
  hasCompletedProfile?: boolean;
  lastActiveAt?: string | null;
  createdAt?: string;
}

export interface IUserInspectStats {
  totalGifts: number;
  totalClaims: number;
  totalStreams: number;
}

export interface IUserInspectGift {
  _id: string;
  title: string;
  images: string[];
  coverImageIndex: number;
  condition: string;
  category: string;
  claimState: string;
  sportLite?: boolean;
  createdAt: string;
}

export interface IUserInspectAuditLog {
  _id: string;
  action: string;
  performedBy: {
    _id: string;
    email: string;
    role: string;
    fullName: string;
  } | null;
  performedByRole: string;
  metadata?: {
    action?: string;
    reason?: string;
  };
  createdAt: string;
}

export interface IUserInspectionData {
  user: IUserInspectUser;
  stats: IUserInspectStats;
  recentGifts: IUserInspectGift[];
  recentClaims: unknown[];
  recentStreams: unknown[];
  auditLogs: IUserInspectAuditLog[];
}

export interface IGetUserInspectionResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IUserInspectionData;
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
