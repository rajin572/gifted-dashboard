import { DollarSign, TrendingUp, Users, CreditCard } from "lucide-react";
import { IRevenueOverviewStats } from "@/types";

interface RevenueStatCardsProps {
  stats: IRevenueOverviewStats;
}

export default function RevenueStatCards({ stats }: RevenueStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Monthly Recurring (MRR) */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Monthly Recurring (MRR)
          </span>
          <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-[#ff4c05]">
            <DollarSign className="w-4 h-4 font-bold" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900 tracking-tight">
            ${stats.mrr.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-600">
            <span>↗ +{stats.mrrChangePercentage}% from last month</span>
          </div>
        </div>
      </div>

      {/* 2. Annual Run Rate (ARR) */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Annual Run Rate (ARR)
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900 tracking-tight">
            ${stats.arr.toLocaleString()}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-600">
            <span>↗ Projected run rate</span>
          </div>
        </div>
      </div>

      {/* 3. Paid Recipients */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Paid Recipients
          </span>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Users className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900 tracking-tight">
            {stats.paidRecipients}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-gray-500">
            <span>{stats.communitySharePercentage}% of total community</span>
          </div>
        </div>
      </div>

      {/* 4. Avg Revenue / User (ARPU) */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Avg Revenue / User (ARPU)
          </span>
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <CreditCard className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-2xl font-bold text-gray-900 tracking-tight">
            ${stats.arpu.toFixed(2)}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-amber-700">
            <span>Blended Plus & Premium</span>
          </div>
        </div>
      </div>
    </div>
  );
}
