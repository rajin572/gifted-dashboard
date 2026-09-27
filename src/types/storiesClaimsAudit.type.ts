import { IMeta } from "./common.type";

export type StoryAuditStatus = "PENDING" | "SHORTLISTED";

export interface IStoryAuditGift {
  _id: string;
  title: string;
  image: string;
}

export interface IStoryClaimsAuditItem {
  _id: string;
  applicantName: string;
  applicantAvatar: string;
  isVerified: boolean;
  location: string;
  submittedAt: string;
  gift: IStoryAuditGift;
  headline: string;
  prompt: string;
  story: string;
  aiUrgencyScore: number;
  aiAssessment: string;
  peerVotes: number;
  status: StoryAuditStatus;
}

export interface IGetStoriesClaimsAuditResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IStoryClaimsAuditItem[];
    meta: IMeta;
  };
}

export interface ICreateStoryClaimPayload {
  applicantId: string;
  giftId: string;
  headline: string;
  story: string;
}

export interface IUpdateStoryClaimPayload {
  status: StoryAuditStatus;
}
