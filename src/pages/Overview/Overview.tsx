import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import { Button } from "@/Components/ui/button";
import { Download } from "lucide-react";
import TelemetryStatCards from "@/Components/Dashboard/Overview/TelemetryStatCards";
import LiveActivityStreamCard from "@/Components/Dashboard/Overview/LiveActivityStreamCard";
import TrustSafetyIndexCard from "@/Components/Dashboard/Overview/TrustSafetyIndexCard";
import { ITelemetryOverviewData } from "@/types";
// import {
//   useGetTelemetryOverviewQuery,
//   useDownloadTelemetryReportMutation,
// } from "@/redux/features/telemetry/telemetryApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: wire to useGetTelemetryOverviewQuery once the endpoint exists.
const DUMMY_TELEMETRY_OVERVIEW: ITelemetryOverviewData = {
  stats: {
    totalNeighborGifts: 1284,
    neighborGiftsTrend: "+12% from last week",
    availableGiftsCount: 842,
    claimedGiftsCount: 442,
    communityMembers: 4920,
    membersVerifiedRate: "89% Verified ID",
    activeInAustinNode: 1200,
    applicantNeedsVetted: 3110,
    needsVettedRate: "94% Needs Vetted",
    averageApplicantsPerListing: 3.8,
    liveBroadcastsOnAir: 4,
    watchingCount: 184,
    liveBroadcastsSubtext: "2 Givers Live • 2 Receivers",
  },
  activityStream: [
    {
      _id: "act-1",
      title: "Vintage Herman Miller Office Chair",
      donorName: "Sarah Jenkins",
      donorLocation: "South Congress",
      status: "AVAILABLE",
      applicantStoriesCount: 6,
      image: "https://images.unsplash.com/photo-1580481077195-c22ae224b7a1?w=150&auto=format&fit=crop&q=80",
    },
    {
      _id: "act-2",
      title: "Organic Baby Clothes Bundle (0-6m)",
      donorName: "Marcus Chen",
      donorLocation: "East Austin",
      status: "CLAIMED",
      applicantStoriesCount: 12,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=150&auto=format&fit=crop&q=80",
    },
    {
      _id: "act-3",
      title: "Stand Mixer & Baking Accessories",
      donorName: "Elena Rostova",
      donorLocation: "Hyde Park",
      status: "AVAILABLE",
      applicantStoriesCount: 4,
      image: "https://images.unsplash.com/photo-1594385208974-2e75f8d7bb48?w=150&auto=format&fit=crop&q=80",
    },
    {
      _id: "act-4",
      title: "Sonos One Gen 2 Smart Speaker",
      donorName: "David Kim",
      donorLocation: "Downtown",
      status: "AVAILABLE",
      applicantStoriesCount: 9,
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=150&auto=format&fit=crop&q=80",
    },
  ],
  trustSafetyIndex: {
    overallScore: 99.4,
    freeRuleCompliance: 99.8,
    identityVerifiedDonors: 94.2,
    noShowDisputeResolution: 98.5,
    pendingFlagsCount: 3,
  },
};

const OverviewPage = () => {
  // const { data } = useGetTelemetryOverviewQuery();
  // const overview = data?.data ?? DUMMY_TELEMETRY_OVERVIEW;
  const overview = DUMMY_TELEMETRY_OVERVIEW;

  // const [downloadReport] = useDownloadTelemetryReportMutation();
  const handleDownloadReport = async () => {
    // const res = await tryCatchWrapper(
    //   downloadReport,
    //   undefined,
    //   { toastLoadingMessage: "Generating telemetry report..." }
    // );
    // if (res?.success) {
    //   // handle download blob/file
    // }
  };

  return (
    <PageWraper
      title="Executive Telemetry & Community Health"
      description="Real-time platform activity, trust index, and peer gift supervision."
    >
      <div className="flex flex-col gap-6 -mt-2">
        {/* Top Header Action Bar */}
        <div className="flex justify-end items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadReport}
            className="h-9 px-3.5 text-xs font-semibold text-gray-700 bg-white border-border hover:bg-gray-50 shadow-2xs gap-2 rounded-lg"
          >
            <Download className="size-3.5" />
            <span>Download Telemetry Report</span>
          </Button>
        </div>

        {/* 4 Telemetry Stat Cards */}
        <TelemetryStatCards stats={overview.stats} />

        {/* Activity Stream and Trust & Safety Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          <div className="lg:col-span-2">
            <LiveActivityStreamCard items={overview.activityStream} />
          </div>
          <div className="lg:col-span-1">
            <TrustSafetyIndexCard metric={overview.trustSafetyIndex} />
          </div>
        </div>
      </div>
    </PageWraper>
  );
};

export default OverviewPage;
