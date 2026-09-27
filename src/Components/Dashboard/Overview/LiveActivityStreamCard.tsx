import { IActivityStreamItem } from "@/types";
import { Activity } from "lucide-react";

interface LiveActivityStreamCardProps {
  items: IActivityStreamItem[];
}

const LiveActivityStreamCard = ({ items }: LiveActivityStreamCardProps) => {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-xs flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/60">
        <div className="flex items-center gap-2">
          <Activity className="size-4.5 text-[#ff4c05]" />
          <h2 className="text-base font-semibold text-base-color">
            Live Platform Activity Stream
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Live Telemetry</span>
        </div>
      </div>

      {/* Stream Items List */}
      <div className="flex flex-col divide-y divide-border/60 flex-1">
        {items.map((item) => {
          const isClaimed = item.status === "CLAIMED";
          return (
            <div
              key={item._id}
              className="py-4 flex items-center justify-between gap-4 first:pt-4 last:pb-1"
            >
              {/* Left: Thumbnail & Info */}
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="size-12 rounded-xl object-cover border border-border shrink-0 bg-gray-50"
                  onError={(e) => {
                    // Fallback to dummy image if unavailable
                    (e.target as HTMLImageElement).src = "/images/dummyCover.jpg";
                  }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-base-color truncate leading-snug">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    Listed by{" "}
                    <span className="text-gray-700 font-medium">
                      {item.donorName}
                    </span>{" "}
                    • {item.donorLocation}
                  </p>
                </div>
              </div>

              {/* Right: Status Pill & Applicant Count */}
              <div className="flex flex-col items-end shrink-0">
                <span
                  className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${isClaimed
                      ? "border-amber-300 text-amber-600 bg-amber-50/70"
                      : "border-emerald-300 text-emerald-600 bg-emerald-50/70"
                    }`}
                >
                  {item.status}
                </span>
                <span className="text-[11px] text-gray-400 mt-1">
                  {item.applicantStoriesCount} Applicant Stories
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveActivityStreamCard;
