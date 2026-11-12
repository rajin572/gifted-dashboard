import { useState } from "react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import RevenueStatCards from "@/Components/Dashboard/Revenue/RevenueStatCards";
import MrrTrajectoryCadenceCard from "@/Components/Dashboard/Revenue/MrrTrajectoryCadenceCard";
import TierContributionCard from "@/Components/Dashboard/Revenue/TierContributionCard";
import RecentGatewaySettlementsTable from "@/Components/Dashboard/Revenue/RecentGatewaySettlementsTable";
import ExportStatementModal from "@/Components/Dashboard/Revenue/ExportStatementModal";
import SpinLoader from "@/Components/ui/CustomUi/SpinLoader";
import { Download } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { useGetRevenueAnalyticsQuery } from "@/redux/features/revenue/revenueApi";

export default function RevenuePage() {
  const [timeframe, setTimeframe] = useState<"30D" | "90D" | "12M">("30D");
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isFetching } = useGetRevenueAnalyticsQuery(
    { timeframe, page: currentPage, limit },
    { refetchOnMountOrArgChange: true }
  );

  const analytics = data?.data;
  const settlementsTotal = analytics?.recentGatewaySettlements.meta.total ?? 0;

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
          <div className="inline-flex items-center bg-gray-100/90 rounded-lg p-1 border border-gray-200/60 text-xs font-semibold">
            {(["30D", "90D", "12M"] as const).map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => {
                  setTimeframe(tf);
                  setCurrentPage(1);
                }}
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
      {isFetching ? (
        <div className="py-24 flex justify-center items-center">
          <SpinLoader />
        </div>
      ) : !analytics ? (
        <div className="py-10 text-center text-secondbase-color text-sm">
          No data found.
        </div>
      ) : (
        <div className="space-y-6">
          <RevenueStatCards kpis={analytics.kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MrrTrajectoryCadenceCard
                data={analytics.cadenceTrajectory}
                tiers={analytics.tierContribution.tiers}
              />
            </div>
            <div className="lg:col-span-1">
              <TierContributionCard data={analytics.tierContribution} />
            </div>
          </div>

          <RecentGatewaySettlementsTable
            data={analytics.recentGatewaySettlements.data}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
            total={settlementsTotal}
          />
        </div>
      )}

      <ExportStatementModal
        open={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </PageWraper>
  );
}
