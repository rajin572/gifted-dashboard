import { useState } from "react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import RevenueStatCards from "@/Components/Dashboard/Revenue/RevenueStatCards";
import MrrTrajectoryCadenceCard from "@/Components/Dashboard/Revenue/MrrTrajectoryCadenceCard";
import TierContributionCard from "@/Components/Dashboard/Revenue/TierContributionCard";
import RecentGatewaySettlementsTable from "@/Components/Dashboard/Revenue/RecentGatewaySettlementsTable";
import ExportStatementModal from "@/Components/Dashboard/Revenue/ExportStatementModal";
import { Download } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  IRevenueOverviewStats,
  IMrrCadenceData,
  ITierContributionItem,
  IGatewaySettlementItem,
} from "@/types";
// import {
//   useGetRevenueOverviewQuery,
//   useGetGatewaySettlementsQuery,
// } from "@/redux/features/revenue/revenueApi";

const DUMMY_STATS: IRevenueOverviewStats = {
  mrr: 7994,
  mrrChangePercentage: 14.2,
  arr: 95928,
  paidRecipients: 614,
  communitySharePercentage: 17.8,
  arpu: 13.02,
};

const DUMMY_CADENCE: IMrrCadenceData = {
  inspectingPeriod: "Week 3 (Sep 08 - 14)",
  periodMrr: 2210,
  periodGrowth: 11.6,
  subscribers: {
    plus: 147,
    premium: 53,
  },
  transitFund15: 332,
  bars: [
    { weekLabel: "Aug 25–31", plusAmount: 1100, premiumAmount: 600, totalAmount: 1700, growth: 8.2 },
    { weekLabel: "Sep 01–07", plusAmount: 1300, premiumAmount: 700, totalAmount: 2000, growth: 13.8 },
    { weekLabel: "Sep 08–14", plusAmount: 1450, premiumAmount: 760, totalAmount: 2210, growth: 11.6, isSelected: true },
    { weekLabel: "Sep 15–21", plusAmount: 1650, premiumAmount: 850, totalAmount: 2500, growth: 12.7 },
    { weekLabel: "Sep 22–28", plusAmount: 1850, premiumAmount: 940, totalAmount: 2790, growth: 12.0 },
  ],
  cadenceAvg: 2242,
  highest: 2790,
  conversionRate: 17.8,
  billingChurn: 1.8,
};

const DUMMY_TIERS: ITierContributionItem[] = [
  {
    tierName: "Gifted Plus",
    badge: "PLUS",
    colorHex: "#ff4c05",
    activeCount: 428,
    pricePerMonth: 9.99,
    monthlyTotal: 4276,
    claimsPerMonth: 10,
    percentage: 65,
  },
  {
    tierName: "Gifted Premium",
    badge: "PREMIUM",
    colorHex: "#f59e0b",
    activeCount: 186,
    pricePerMonth: 19.99,
    monthlyTotal: 3718,
    claimsPerMonth: 25,
    percentage: 35,
  },
];

const DUMMY_SETTLEMENTS: IGatewaySettlementItem[] = [
  {
    _id: "settle_1",
    subscriber: {
      name: "Maya Rodriguez",
      email: "maya.rodriguez@utexas.edu",
    },
    plan: "PLUS",
    amount: 9.99,
    provider: "Stripe",
    status: "Successful",
    timestamp: "2026-09-16 14:22",
    invoice: "INV-2026-0891",
  },
  {
    _id: "settle_2",
    subscriber: {
      name: "David Chen",
      email: "david.chen.vet@gmail.com",
    },
    plan: "PREMIUM",
    amount: 19.99,
    provider: "Apple IAP",
    status: "Successful",
    timestamp: "2026-09-15 09:15",
    invoice: "INV-2026-0884",
  },
];

export default function RevenuePage() {
  const [timeframe, setTimeframe] = useState<"30D" | "90D" | "12M">("30D");
  const [isExportOpen, setIsExportOpen] = useState(false);

  // TODO: wire to useGetRevenueOverviewQuery once the endpoint exists.
  // const { data: overviewData } = useGetRevenueOverviewQuery({ timeframe });
  // const stats = overviewData?.data?.stats ?? DUMMY_STATS;
  // const cadence = overviewData?.data?.cadence ?? DUMMY_CADENCE;
  // const tiers = overviewData?.data?.tiers ?? DUMMY_TIERS;

  // TODO: wire to useGetGatewaySettlementsQuery once the endpoint exists.
  // const { data: settlementsData } = useGetGatewaySettlementsQuery({ page: 1, limit: 10 });
  // const settlements = settlementsData?.data?.data ?? DUMMY_SETTLEMENTS;

  const stats = DUMMY_STATS;
  const cadence = DUMMY_CADENCE;
  const tiers = DUMMY_TIERS;
  const settlements = DUMMY_SETTLEMENTS;

  return (
    <PageWraper
      preTitle={
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-wider uppercase bg-orange-50 text-[#ff4c05] px-2.5 py-0.5 rounded-full border border-orange-100">
            APP REVENUE
          </span>
          <span className="text-xs text-gray-500 font-medium">
            Financial Telemetry & Settlement Engine
          </span>
        </div>
      }
      title="App Revenue & Financial Overview"
      description="Monitor real-time application earnings, recurring subscription metrics, gateway settlements, and the 15% community delivery fund allocation."
      actions={
        <div className="flex items-center gap-3">
          {/* Timeframe pill toggle */}
          <div className="inline-flex items-center bg-gray-100/90 rounded-lg p-1 border border-gray-200/60 text-xs font-semibold">
            {(["30D", "90D", "12M"] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  timeframe === tf
                    ? "bg-[#ff4c05] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Export Statement button */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsExportOpen(true)}
            className="text-xs h-9 gap-1.5 border-gray-300 font-semibold cursor-pointer hover:bg-gray-50"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Statement</span>
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* 1. Stat Cards Row */}
        <RevenueStatCards stats={stats} />

        {/* 2. Trajectory + Tier Contribution Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MrrTrajectoryCadenceCard data={cadence} />
          </div>
          <div className="lg:col-span-1">
            <TierContributionCard tiers={tiers} />
          </div>
        </div>

        {/* 3. Recent Gateway Settlements Table */}
        <RecentGatewaySettlementsTable data={settlements} />
      </div>

      {/* Export Statement Modal */}
      <ExportStatementModal
        open={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </PageWraper>
  );
}
