import { useState } from "react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import SafetyReportsStatCards from "@/Components/Dashboard/SafetyReports/SafetyReportsStatCards";
import PendingFlagCard from "@/Components/Dashboard/SafetyReports/PendingFlagCard";
import ResolvedCaseCard from "@/Components/Dashboard/SafetyReports/ResolvedCaseCard";
import ResolvePolicyModal from "@/Components/Dashboard/SafetyReports/ResolvePolicyModal";
import { Search, RotateCcw } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  ISafetyStats,
  IPendingReportItem,
  IResolvedCaseItem,
} from "@/types";
// import {
//   useGetSafetyOverviewQuery,
//   useGetSafetyReportsListQuery,
// } from "@/redux/features/safetyReports/safetyReportsApi";

const DUMMY_STATS: ISafetyStats = {
  pendingFlagsCount: 2,
  resolvedCasesCount: 1,
  allReportsCount: 3,
  safetyIndex: 99.4,
};

const DUMMY_PENDING: IPendingReportItem[] = [
  {
    _id: "rep_1",
    reportId: "rep_1",
    priority: "MEDIUM PRIORITY",
    category: "Gift",
    reportedTime: "1 hour ago",
    location: "East Austin, TX",
    status: "PENDING INVESTIGATION",
    targetTitle: "Target: Singer Heavy Duty Sewing Machine",
    violationTag: "Suspected Commercial Resale / Policy Charter Inquiry",
    statement:
      "Potential recipient messaged the donor asking if finished products made from the gifted machine could be sold on Etsy/Depop, and asked to bypass the story claim process. Reporter wants policy guidance on whether this complies with Gifted zero-resale charter.",
    reporterName: "Marcus V.",
    reporterRole: "Listing Donor",
  },
  {
    _id: "rep_2",
    reportId: "rep_2",
    priority: "HIGH PRIORITY",
    category: "Story",
    reportedTime: "3 hours ago",
    location: "West Campus / UT Austin",
    status: "PENDING INVESTIGATION",
    targetTitle: "Target: Application Story on Sony WH-1000XM5 Headphones",
    violationTag: "Duplicate Story Submission & Multi-Claim Farming",
    statement:
      'Applicant submitted verbatim copy-pasted story across 3 concurrent high-value audio listings within 10 minutes ("Need this urgently for my university audio lab finals"). Violates the Gifted authentic storytelling and fair-chance charter.',
    reporterName: "Hannah L.",
    reporterRole: "Listing Donor",
  },
];

const DUMMY_RESOLVED: IResolvedCaseItem[] = [
  {
    _id: "rep_3",
    reportId: "rep_3",
    category: "User",
    resolvedTime: "Yesterday",
    location: "South Congress, Austin, TX",
    status: "RESOLVED & CLOSED",
    targetTitle: "Target: Member Account: @quickflip_tx",
    reason: "Porch Pickup Ghosting / Repeated No-Show",
    statement:
      "Claimed an outdoor dining chair set and failed to arrive for contactless porch pickup for 4 consecutive days without replying to messages.",
    resolutionActionText:
      "Account placed on 14-day claim suspension; item restored to community pool.",
    reporterName: "Elena G.",
    reporterRole: "Donor",
    closedBy: "Platform Owner",
  },
];

export default function TrustSafetyQueuePage() {
  const [search, setSearch] = useState("");
  const [selectedReport, setSelectedReport] = useState<IPendingReportItem | null>(null);
  const [isResolveOpen, setIsResolveOpen] = useState(false);

  // TODO: wire to useGetSafetyOverviewQuery once the endpoint exists.
  // const { data: overviewData } = useGetSafetyOverviewQuery();
  // const stats = overviewData?.data?.stats ?? DUMMY_STATS;

  // TODO: wire to useGetSafetyReportsListQuery once the endpoint exists.
  // const { data: reportsData } = useGetSafetyReportsListQuery({ page: 1, limit: 10 });

  const stats = DUMMY_STATS;
  const pendingFlags = DUMMY_PENDING;
  const resolvedCases = DUMMY_RESOLVED;

  const handleResolve = (report: IPendingReportItem) => {
    setSelectedReport(report);
    setIsResolveOpen(true);
  };

  const handleDismiss = (_report: IPendingReportItem) => {
    // Dismiss action stub
  };

  return (
    <PageWraper
      preTitle={
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold tracking-wider uppercase bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-full border border-rose-200">
            • COMMUNITY SAFETY & TRUST
          </span>
          <span className="text-xs text-gray-500 font-medium px-2 py-0.5 rounded-md bg-gray-100">
            Austin Community Node
          </span>
          <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
            {stats.pendingFlagsCount} PENDING FLAGS
          </span>
        </div>
      }
      title="Community Safety & Dispute Moderation"
      description="Audit user-reported listings, porch pickup disputes, and zero-resale policy enforcement on a unified single-screen dashboard."
      actions={
        <Button
          type="button"
          variant="outline"
          className="text-xs h-9 gap-1.5 border-gray-300 font-semibold cursor-pointer hover:bg-gray-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Disputes</span>
        </Button>
      }
    >
      <div className="space-y-6">
        {/* 1. Stat Cards Row */}
        <SafetyReportsStatCards stats={stats} />

        {/* 2. Global Search Bar */}
        <div className="bg-white rounded-xl border border-border p-3 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search reports across pending & resolved cases by target, reporter, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-hidden focus:border-[#ff4c05]"
            />
          </div>
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">
            Displaying all {pendingFlags.length + resolvedCases.length} of {pendingFlags.length + resolvedCases.length} cases on one screen
          </span>
        </div>

        {/* 3. Section 1: Pending Flags */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff4c05]" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                Pending Flags ({pendingFlags.length})
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-[#ff4c05] px-2 py-0.5 rounded-full border border-orange-200">
                ACTION REQUIRED
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              Audit and enforce community charter
            </span>
          </div>

          <div className="space-y-4">
            {pendingFlags.map((report) => (
              <PendingFlagCard
                key={report._id}
                report={report}
                onResolve={handleResolve}
                onDismiss={handleDismiss}
              />
            ))}
          </div>
        </div>

        {/* 4. Section 2: Resolved Cases */}
        <div className="space-y-4 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h2 className="text-base sm:text-lg font-bold text-gray-900">
                Resolved Cases ({resolvedCases.length})
              </h2>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                ENFORCED & CLOSED
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              Historical incident audit log
            </span>
          </div>

          <div className="space-y-4">
            {resolvedCases.map((report) => (
              <ResolvedCaseCard key={report._id} report={report} />
            ))}
          </div>
        </div>
      </div>

      {/* Resolve Policy Modal */}
      <ResolvePolicyModal
        open={isResolveOpen}
        onClose={() => {
          setIsResolveOpen(false);
          setSelectedReport(null);
        }}
        report={selectedReport}
      />
    </PageWraper>
  );
}
