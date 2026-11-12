import { IMeta } from "./common.type";

export interface IRevenueKpiMrr {
  amount: number;
  formatted: string;
  growth: string;
}

export interface IRevenueKpiArr {
  amount: number;
  formatted: string;
  subText: string;
}

export interface IRevenueKpiPaidRecipients {
  count: number;
  percentageOfCommunity: string;
}

export interface IRevenueKpiArpu {
  amount: number;
  formatted: string;
  subText: string;
}

export interface IRevenueKpis {
  mrr: IRevenueKpiMrr;
  arr: IRevenueKpiArr;
  paidRecipients: IRevenueKpiPaidRecipients;
  arpu: IRevenueKpiArpu;
}

export interface ICadenceInspectingPeriod {
  periodLabel: string;
  periodMRR: string;
  subscribersText: string;
  transitFund: string;
}

export interface ICadenceChartItem {
  label: string;
  periodStart: string;
  periodEnd: string;
  plusAmount: number;
  premiumAmount: number;
  totalAmount: number;
  subscribers: {
    plus: number;
    premium: number;
    total: number;
  };
  growthRate: string;
  transitFundAmount: number;
}

export interface ICadencePerformance {
  averagePerPeriod: string;
  highest: string;
  conversionRate: string;
  billingChurn: string;
}

export interface ICadenceTrajectory {
  timeframe: string;
  cadenceDescription: string;
  inspectingPeriod: ICadenceInspectingPeriod;
  chartData: ICadenceChartItem[];
  cadencePerformance: ICadencePerformance;
}

export interface ITierDetail {
  name: string;
  tierKey: string;
  monthlyPrice: number;
  activeSubscribers: number;
  monthlyRevenue: number;
  formattedMonthly: string;
  claimsPerMonth: number;
  claimsBadge: string;
  percentage: number;
}

export interface ICommunityGuarantee {
  transitFundPercentage: number;
  transitFundAmount: number;
  formattedTransitFund: string;
  statement: string;
}

export interface ITierContributionData {
  tiers: {
    plus?: ITierDetail;
    premium?: ITierDetail;
  };
  communityGuarantee: ICommunityGuarantee;
}

export interface IGatewaySettlementSubscriber {
  id: string;
  fullName: string;
  email: string;
  profileImage: string;
}

export interface IGatewaySettlementItemData {
  id: string;
  subscriber: IGatewaySettlementSubscriber;
  plan: string;
  amount: string;
  amountInCents: number;
  provider: string;
  status: string;
  timestamp: string;
  invoice: string;
}

export interface IRecentGatewaySettlementsData {
  data: IGatewaySettlementItemData[];
  meta: IMeta;
}

export interface IRevenueTimeSeriesItem {
  date: string;
  amountInCents: number;
  transactionCount: number;
}

export interface IRevenueAnalyticsData {
  kpis: IRevenueKpis;
  cadenceTrajectory: ICadenceTrajectory;
  tierContribution: ITierContributionData;
  recentGatewaySettlements: IRecentGatewaySettlementsData;
  totalRevenueInCents: number;
  recurringMonthlyInCents: number;
  activeSubscribersByTier: {
    free: number;
    premium: number;
    pro: number;
  };
  churnRatePercentage: number;
  timeSeries: IRevenueTimeSeriesItem[];
}

export interface IGetRevenueAnalyticsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: IRevenueAnalyticsData;
}

export interface IRevenueAnalyticsArgs {
  timeframe?: string;
  page?: number;
  limit?: number;
}
