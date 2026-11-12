import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import { Button } from "@/Components/ui/button";
import { Download } from "lucide-react";
import TelemetryStatCards from "@/Components/Dashboard/Overview/TelemetryStatCards";
import LiveActivityStreamCard from "@/Components/Dashboard/Overview/LiveActivityStreamCard";
import TrustSafetyIndexCard from "@/Components/Dashboard/Overview/TrustSafetyIndexCard";
import SpinLoader from "@/Components/ui/CustomUi/SpinLoader";
import { useGetTelemetryOverviewQuery } from "@/redux/features/telemetry/telemetryApi";

const OverviewPage = () => {
  const { data, isFetching } = useGetTelemetryOverviewQuery();
  const telemetryData = data?.data;

  return (
    <PageWraper
      title="Executive Telemetry & Community Health"
      description="Real-time platform activity, trust index, and peer gift supervision."
    >
      {isFetching ? (
        <div className="py-24 flex justify-center items-center">
          <SpinLoader />
        </div>
      ) : !telemetryData ? (
        <div className="py-10 text-center text-secondbase-color text-sm">
          No data found.
        </div>
      ) : (
        <div className="flex flex-col gap-6 -mt-2">
          <div className="flex justify-end items-center">
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-3.5 text-xs font-semibold text-gray-700 bg-white border-border hover:bg-gray-50 shadow-2xs gap-2 rounded-lg"
            >
              <Download className="size-3.5" />
              <span>Download Telemetry Report</span>
            </Button>
          </div>

          <TelemetryStatCards kpis={telemetryData.kpis} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            <div className="lg:col-span-2">
              <LiveActivityStreamCard items={telemetryData.liveActivityStream} />
            </div>
            <div className="lg:col-span-1">
              <TrustSafetyIndexCard metric={telemetryData.trustSafetyIndex} />
            </div>
          </div>
        </div>
      )}
    </PageWraper>
  );
};

export default OverviewPage;
