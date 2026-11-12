import { ITelemetryTrustSafetyIndex } from "@/types";
import { ShieldCheck, Flag } from "lucide-react";
import { Link } from "react-router-dom";

interface TrustSafetyIndexCardProps {
  metric: ITelemetryTrustSafetyIndex;
}

const toPercent = (value: string | number): number =>
  typeof value === "number" ? value : parseFloat(value) || 0;

const TrustSafetyIndexCard = ({ metric }: TrustSafetyIndexCardProps) => {
  const indicators = [
    {
      label: "100% Free Rule Compliance",
      value: metric.freeRuleCompliance,
    },
    {
      label: "Identity Verified Donors",
      value: metric.identityVerifiedDonors,
    },
    {
      label: "No-Show Dispute Resolution",
      value: metric.disputeResolution,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-border p-5 shadow-xs flex flex-col justify-between h-full">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="size-4" />
            </div>
            <h2 className="text-base font-semibold text-base-color">
              Trust & Safety Index
            </h2>
          </div>
          <span className="text-xl font-bold text-emerald-600">
            {metric.overallScore}
          </span>
        </div>
        <p className="text-xs text-gray-500 mt-2 mb-6 leading-relaxed">
          {metric.subtitle}
        </p>
        <div className="flex flex-col gap-4">
          {indicators.map((ind, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-gray-700">{ind.label}</span>
                <span className="font-semibold text-emerald-600">{ind.value}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${toPercent(ind.value)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-8 text-center border-t border-border/40 mt-6">
        <Link
          to="/admin/trust-safety-queue"
          className="inline-flex items-center gap-2 text-xs font-semibold text-rose-500 hover:text-rose-600 hover:underline transition-colors"
        >
          <Flag className="size-3.5 fill-rose-500" />
          <span>{metric.pendingFlagsText}</span>
        </Link>
      </div>
    </div>
  );
};

export default TrustSafetyIndexCard;
