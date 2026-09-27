import { ITelemetryStats } from "@/types";
import { BookOpen, Users, ClipboardList, Radio, ArrowUpRight } from "lucide-react";

interface TelemetryStatCardsProps {
  stats: ITelemetryStats;
}

const TelemetryStatCards = ({ stats }: TelemetryStatCardsProps) => {
  const cards = [
    {
      title: "Total Neighbor Gifts",
      value: stats.totalNeighborGifts,
      trend: stats.neighborGiftsTrend,
      trendColor: "text-[#ff4c05]",
      subtext: `${stats.availableGiftsCount} Available • ${stats.claimedGiftsCount} Claimed`,
      icon: BookOpen,
      iconBg: "bg-orange-50 text-[#ff4c05]",
    },
    {
      title: "Community Members",
      value: stats.communityMembers,
      trend: stats.membersVerifiedRate,
      trendColor: "text-[#3b82f6]",
      subtext: `${stats.activeInAustinNode} Active in Austin Node`,
      icon: Users,
      iconBg: "bg-blue-50 text-[#3b82f6]",
    },
    {
      title: "Applicant Needs Vetted",
      value: stats.applicantNeedsVetted,
      trend: stats.needsVettedRate,
      trendColor: "text-[#ff4c05]",
      subtext: `Average ${stats.averageApplicantsPerListing.toFixed(1)} applicants per listing`,
      icon: ClipboardList,
      iconBg: "bg-orange-50 text-[#ff4c05]",
    },
    {
      title: "Live Broadcasts On Air",
      value: stats.liveBroadcastsOnAir,
      trend: `${stats.watchingCount} Watching`,
      trendColor: "text-[#ff4c05]",
      subtext: stats.liveBroadcastsSubtext,
      icon: Radio,
      iconBg: "bg-orange-50 text-[#ff4c05]",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <div
            key={i}
            className="bg-white rounded-2xl border border-border p-5 shadow-xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-normal text-gray-500">{card.title}</span>
              <div className={`size-8 rounded-lg ${card.iconBg} flex items-center justify-center shrink-0`}>
                <Icon className="size-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-3xl font-bold text-base-color tracking-tight">
                {card.value}
              </div>
              <div className={`text-xs font-semibold mt-1 flex items-center gap-0.5 ${card.trendColor}`}>
                <ArrowUpRight className="size-3.5" />
                <span>{card.trend}</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{card.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TelemetryStatCards;
