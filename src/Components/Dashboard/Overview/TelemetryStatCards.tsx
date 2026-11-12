import { ITelemetryKpis } from "@/types";
import { BookOpen, Users, ClipboardList, Radio, ArrowUpRight } from "lucide-react";

interface TelemetryStatCardsProps {
  kpis: ITelemetryKpis;
}

const TelemetryStatCards = ({ kpis }: TelemetryStatCardsProps) => {
  const cards = [
    {
      title: "Total Neighbor Gifts",
      value: kpis.neighborGifts.total,
      trend: kpis.neighborGifts.weekGrowth,
      trendColor: "text-[#ff4c05]",
      subtext: kpis.neighborGifts.breakdownText,
      icon: BookOpen,
      iconBg: "bg-orange-50 text-[#ff4c05]",
    },
    {
      title: "Community Members",
      value: kpis.communityMembers.total,
      trend: kpis.communityMembers.verifiedPercentage,
      trendColor: "text-[#3b82f6]",
      subtext: kpis.communityMembers.footerText,
      icon: Users,
      iconBg: "bg-blue-50 text-[#3b82f6]",
    },
    {
      title: "Applicant Needs Vetted",
      value: kpis.applicantNeedsVetted.total,
      trend: kpis.applicantNeedsVetted.freeRuleRate,
      trendColor: "text-[#ff4c05]",
      subtext: kpis.applicantNeedsVetted.footerText,
      icon: ClipboardList,
      iconBg: "bg-orange-50 text-[#ff4c05]",
    },
    {
      title: "Live Broadcasts On Air",
      value: kpis.liveBroadcasts.total,
      trend: kpis.liveBroadcasts.watchingText,
      trendColor: "text-[#ff4c05]",
      subtext: kpis.liveBroadcasts.footerText,
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
