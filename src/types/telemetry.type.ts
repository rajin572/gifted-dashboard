export interface ITelemetryStats {
  totalNeighborGifts: number;
  neighborGiftsTrend: string;
  availableGiftsCount: number;
  claimedGiftsCount: number;
  communityMembers: number;
  membersVerifiedRate: string;
  activeInAustinNode: number;
  applicantNeedsVetted: number;
  needsVettedRate: string;
  averageApplicantsPerListing: number;
  liveBroadcastsOnAir: number;
  watchingCount: number;
  liveBroadcastsSubtext: string;
}

export type ActivityItemStatus = "AVAILABLE" | "CLAIMED";

export interface IActivityStreamItem {
  _id: string;
  title: string;
  donorName: string;
  donorLocation: string;
  status: ActivityItemStatus;
  applicantStoriesCount: number;
  image: string;
  createdAt?: string;
}

export interface ITrustSafetyMetric {
  overallScore: number;
  freeRuleCompliance: number;
  identityVerifiedDonors: number;
  noShowDisputeResolution: number;
  pendingFlagsCount: number;
}

export interface ITelemetryOverviewData {
  stats: ITelemetryStats;
  activityStream: IActivityStreamItem[];
  trustSafetyIndex: ITrustSafetyMetric;
}

export interface IGetTelemetryOverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: ITelemetryOverviewData;
}
