import { IMeta } from "./common.type";

export interface ISubscriptionOverviewStats {
  activeSubscribers: number;
  plusSubscribers: number;
  premiumSubscribers: number;
  subscriptionMrr: number;
  mrrTrajectoryPercentage: number;
  claimsAllowanceUsedPercentage: number;
  avgClaimsPerMemberMonth: number;
  promoRedemptions: number;
  activeCampaignsCount: number;
}

export interface IMembershipPlan {
  id: string;
  name: string;
  badge?: string;
  description: string;
  monthlyFee: number;
  monthlyClaims: number;
  entitlements: string[];
}

export type SubscriberTier = "FREE" | "PLUS" | "PREMIUM";
export type SubscriptionStatus = "FREE" | "ACTIVE" | "TRIAL" | "PAST DUE" | "CANCELED";
export type PaymentHealth = "None" | "Valid" | "Past Due" | "Trial" | "Canceled";

export interface ISubscriberAccountItem {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  tier: SubscriberTier;
  status: SubscriptionStatus;
  claimsUsed: number;
  claimsLimit: number;
  renewalDateText: string;
  paymentHealth: PaymentHealth;
}

export interface IGetSubscriptionOverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    stats: ISubscriptionOverviewStats;
    plans: IMembershipPlan[];
  };
}

export interface IGetSubscribersResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: ISubscriberAccountItem[];
    meta: IMeta;
  };
}
