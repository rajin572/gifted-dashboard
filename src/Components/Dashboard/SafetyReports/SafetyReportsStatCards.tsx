import { Clock, CheckCircle2, Archive, Shield } from "lucide-react";
import { ISafetyStats } from "@/types";

interface SafetyReportsStatCardsProps {
  stats: ISafetyStats;
}

export default function SafetyReportsStatCards({ stats }: SafetyReportsStatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Pending Flags */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Pending Flags
          </span>
          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              {stats.pendingFlagsCount}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#ff4c05] px-2 py-0.5 rounded-full border border-orange-200">
              Action Required
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Neighbor reports awaiting owner review & resolution
          </div>
        </div>
      </div>

      {/* 2. Resolved Cases */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Resolved Cases
          </span>
          <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              {stats.resolvedCasesCount}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              Enforced
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Cases investigated and resolved with policy enforcement
          </div>
        </div>
      </div>

      {/* 3. All Reports */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            All Reports
          </span>
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-600">
            <Archive className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              {stats.allReportsCount}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full border border-gray-200">
              Austin Node
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Cumulative total incident history for community node
          </div>
        </div>
      </div>

      {/* 4. Safety Index */}
      <div className="bg-white rounded-xl border border-border p-4.5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Safety Index
          </span>
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Shield className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              {stats.safetyIndex}%
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200">
              Compliant
            </span>
          </div>
          <div className="mt-1 text-xs text-gray-500">
            Zero-commercial exploitation rule adherence
          </div>
        </div>
      </div>
    </div>
  );
}
