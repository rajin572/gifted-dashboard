import { ITierContributionData, ITierDetail } from "@/types";

interface TierContributionCardProps {
  data: ITierContributionData;
}

export default function TierContributionCard({ data }: TierContributionCardProps) {
  const tiers: { tier: ITierDetail; colorHex: string }[] = [];
  if (data.tiers.plus) tiers.push({ tier: data.tiers.plus, colorHex: "#ff4c05" });
  if (data.tiers.premium) tiers.push({ tier: data.tiers.premium, colorHex: "#f59e0b" });

  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-gray-900">Tier Contribution</h3>
        <p className="text-xs text-gray-500 mt-1">
          Subscription revenue distributed by recipient tier
        </p>

        <div className="mt-5 space-y-6">
          {tiers.map(({ tier, colorHex }) => (
            <div key={tier.name} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-gray-900">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: colorHex }}
                  />
                  <span>{tier.name}</span>
                </div>
                <span className="font-bold text-gray-900">{tier.activeSubscribers} active</span>
              </div>

              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${tier.percentage}%`,
                    backgroundColor: colorHex,
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <span>
                  ${tier.monthlyPrice.toFixed(2)}/mo • ${tier.monthlyRevenue.toLocaleString()}/mo
                </span>
                <span>{tier.claimsBadge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-3.5 text-xs leading-relaxed text-[#92400e]">
        <span className="font-bold text-[#78350f]">Community Guarantee: </span>
        {data.communityGuarantee.statement}
      </div>
    </div>
  );
}
