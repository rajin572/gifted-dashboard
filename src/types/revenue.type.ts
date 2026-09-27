import { IMeta } from "./common.type";

export interface IRevenueOverviewStats {
  mrr: number;
  mrrChangePercentage: number;
  arr: number;
  paidRecipients: number;
  communitySharePercentage: number;
  arpu: number;
}

export interface IMrrCadenceBar {
  weekLabel: string;
  plusAmount: number;
  premiumAmount: number;
  totalAmount: number;
  growth: number;
  isSelected?: boolean;
}

export interface IMrrCadenceData {
  inspectingPeriod: string;
  periodMrr: number;
  periodGrowth: number;
  subscribers: {
    plus: number;
    premium: number;
  };
  transitFund15: number;
  bars: IMrrCadenceBar[];
  cadenceAvg: number;
  highest: number;
  conversionRate: number;
  billingChurn: number;
}

export interface ITierContributionItem {
  tierName: "Gifted Plus" | "Gifted Premium";
  badge: "PLUS" | "PREMIUM";
  colorHex: string;
  activeCount: number;
  pricePerMonth: number;
  monthlyTotal: number;
  claimsPerMonth: number;
  percentage: number;
}

export interface IGatewaySettlementItem {
  _id: string;
  subscriber: {
    name: string;
    email: string;
    avatar?: string;
  };
  plan: "PLUS" | "PREMIUM";
  amount: number;
  provider: "Stripe" | "Apple IAP" | "Google Play";
  status: "Successful" | "Pending" | "Failed";
  timestamp: string;
  invoice: string;
}

export interface IGetRevenueOverviewResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    stats: IRevenueOverviewStats;
    cadence: IMrrCadenceData;
    tiers: ITierContributionItem[];
  };
}

export interface IGetGatewaySettlementsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    data: IGatewaySettlementItem[];
    meta: IMeta;
  };
}
