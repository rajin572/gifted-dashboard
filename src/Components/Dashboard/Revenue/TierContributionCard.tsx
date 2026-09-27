import { ITierContributionItem } from "@/types";

interface TierContributionCardProps {
  tiers: ITierContributionItem[];
}

export default function TierContributionCard({ tiers }: TierContributionCardProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-xs flex flex-col justify-between">
      <div>
        <h3 className="text-base font-bold text-gray-900">Tier Contribution</h3>
        <p className="text-xs text-gray-500 mt-1">
          Subscription revenue distributed by recipient tier
        </p>

        {/* Tier Items */}
        <div className="mt-5 space-y-6">
          {tiers.map((tier) => (
            <div key={tier.tierName} className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-bold text-gray-900">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: tier.colorHex }}
                  />
                  <span>{tier.tierName}</span>
                </div>
                <span className="font-bold text-gray-900">{tier.activeCount} active</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${tier.percentage}%`,
                    backgroundColor: tier.colorHex,
                  }}
                />
              </div>

              {/* Tier breakdown details */}
              <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium">
                <span>
                  ${tier.pricePerMonth.toFixed(2)}/mo • ${tier.monthlyTotal.toLocaleString()}/mo
                </span>
                <span>{tier.claimsPerMonth} claims/mo</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Guarantee Callout */}
      <div className="mt-6 bg-[#fffbeb] border border-[#fef3c7] rounded-xl p-3.5 text-xs leading-relaxed text-[#92400e]">
        <span className="font-bold text-[#78350f]">Community Guarantee: </span>
        15% of all subscription revenue is deposited into the Neighborhood Transit &
        Delivery Fund to transport heavy gifts to recipients without vehicles.
      </div>
    </div>
  );
}
