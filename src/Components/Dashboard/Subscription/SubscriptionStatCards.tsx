import { User, DollarSign, Layers, Percent } from "lucide-react";
import { ISubscriptionOverviewStats } from "@/types";

interface SubscriptionStatCardsProps {
  stats: ISubscriptionOverviewStats;
}

export default function SubscriptionStatCards({ stats }: SubscriptionStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Active Subscribers */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Active Subscribers
          </span>
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#ff4c05]">
            <User className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900 tracking-tight">
            {stats.activeSubscribers}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-orange-600">
            <span>
              {stats.plusSubscribers} Plus • {stats.premiumSubscribers} Premium
            </span>
          </div>
        </div>
      </div>

      {/* 2. Subscription MRR */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Subscription MRR
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900 tracking-tight">
            ${stats.subscriptionMrr.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-600">
            <span>↗ +{stats.mrrTrajectoryPercentage}% trajectory this cycle</span>
          </div>
        </div>
      </div>

      {/* 3. Claims Allowance Used */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Claims Allowance Used
          </span>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900 tracking-tight">
            {stats.claimsAllowanceUsedPercentage}%
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-gray-500">
            <span>Average {stats.avgClaimsPerMemberMonth} claims / member / month</span>
          </div>
        </div>
      </div>

      {/* 4. Promo Redemptions */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Promo Redemptions
          </span>
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900 tracking-tight">
            {stats.promoRedemptions}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-amber-700">
            <span>Across {stats.activeCampaignsCount} active coupon campaigns</span>
          </div>
        </div>
      </div>
    </div>
  );
}
