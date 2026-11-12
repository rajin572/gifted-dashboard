export interface INeighborGiftsKpi {
  total: number;
  weekGrowth: string;
  availableCount: number;
  claimedCount: number;
  breakdownText: string;
}

export interface ICommunityMembersKpi {
  total: number;
  verifiedPercentage: string;
  activeCount: number;
  footerText: string;
}

export interface IApplicantNeedsVettedKpi {
  total: number;
  freeRuleRate: string;
  averagePerListing: number;
  footerText: string;
}

export interface ILiveBroadcastsKpi {
  total: number;
  totalWatching: number;
  watchingText: string;
  footerText: string;
}

export interface ITelemetryKpis {
  neighborGifts: INeighborGiftsKpi;
  communityMembers: ICommunityMembersKpi;
  applicantNeedsVetted: IApplicantNeedsVettedKpi;
  liveBroadcasts: ILiveBroadcastsKpi;
}

export interface ITelemetryHost {
  id: string;
  fullName: string;
  email: string;
  neighborhoodLabel: string;
}

export type ActivityClaimState = "AVAILABLE" | "CLAIMED" | string;

export interface ITelemetryLiveActivityItem {
  id: string;
  title: string;
  coverImage: string;
  claimState: ActivityClaimState;
  host: ITelemetryHost;
  donorSubtitle: string;
  storyClaimCount: number;
  storyBadgeText: string;
  pickUpPreference?: string;
  timeRemaining?: string;
  createdAt: string;
}

export interface ITelemetryTrustSafetyIndex {
  overallScore: string | number;
  overallPercentage: number;
  freeRuleCompliance: string | number;
  identityVerifiedDonors: string | number;
  disputeResolution: string | number;
  pendingFlagsCount: number;
  pendingFlagsText?: string;
  subtitle?: string;
}

export interface ITelemetryData {
  kpis: ITelemetryKpis;
  liveActivityStream: ITelemetryLiveActivityItem[];
  trustSafetyIndex: ITelemetryTrustSafetyIndex;
  totalUsers: number;
  newUsersToday: number;
  activeLiveStreams: number;
  totalGiftsGiven: number;
  totalClaimsSubmitted: number;
  revenueThisMonthInCents: number;
  openModerationFlags: number;
  recentActivity: unknown[];
}

export interface IGetTelemetryOverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ITelemetryData;
}
