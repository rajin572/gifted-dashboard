import { DollarSign, TrendingUp, Users, CreditCard } from "lucide-react";
import { IRevenueKpis } from "@/types";

interface RevenueStatCardsProps {
  kpis: IRevenueKpis;
}

export default function RevenueStatCards({ kpis }: RevenueStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
            {kpis.mrr.formatted}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-600">
            <span>{kpis.mrr.growth}</span>
          </div>
        </div>
      </div>

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
            {kpis.arr.formatted}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-emerald-600">
            <span>↗ {kpis.arr.subText}</span>
          </div>
        </div>
      </div>

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
            {kpis.paidRecipients.count}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-gray-500">
            <span>{kpis.paidRecipients.percentageOfCommunity}</span>
          </div>
        </div>
      </div>

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
            {kpis.arpu.formatted}
          </div>
          <div className="mt-1 flex items-center text-xs font-medium text-amber-700">
            <span>{kpis.arpu.subText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
