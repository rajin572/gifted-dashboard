import { ICadenceTrajectory, ITierContributionData } from "@/types";

interface MrrTrajectoryCadenceCardProps {
  data: ICadenceTrajectory;
  tiers: ITierContributionData["tiers"];
}

const formatAmount = (value: number) =>
  value >= 1000 ? `$${(value / 1000).toFixed(1)}k` : `$${Math.round(value)}`;

export default function MrrTrajectoryCadenceCard({ data, tiers }: MrrTrajectoryCadenceCardProps) {
  const bars = data.chartData;
  const maxBarValue = Math.max(1, ...bars.map((bar) => bar.totalAmount));
  const axisTicks = [maxBarValue, (maxBarValue * 2) / 3, maxBarValue / 3, 0];
  const inspecting = data.inspectingPeriod.periodLabel;
  const hasSelected = bars.some((bar) => inspecting.includes(bar.label));

  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">
              Recurring MRR Trajectory & Cadence
            </h3>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              {data.timeframe} View
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
            {tiers.plus && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff4c05]" />
                <span>Plus (${tiers.plus.monthlyPrice})</span>
              </div>
            )}
            {tiers.premium && (
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                <span>Premium (${tiers.premium.monthlyPrice})</span>
              </div>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{data.cadenceDescription}</p>

        <div className="mt-4 bg-gray-50/80 border border-gray-100 rounded-xl p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Inspecting Period
            </div>
            <div className="font-bold text-gray-900 mt-0.5">{inspecting}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Period MRR
            </div>
            <div className="font-bold text-emerald-600 mt-0.5">
              {data.inspectingPeriod.periodMRR}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Subscribers
            </div>
            <div className="font-bold text-orange-600 mt-0.5">
              {data.inspectingPeriod.subscribersText}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              15% Transit Fund
            </div>
            <div className="font-bold text-gray-900 mt-0.5">
              {data.inspectingPeriod.transitFund}
            </div>
          </div>
        </div>

        <div className="mt-6 relative pt-4 pb-2">
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-400">
            {axisTicks.map((tick, idx) => (
              <div
                key={idx}
                className={`border-b pb-0.5 ${idx === axisTicks.length - 1 ? "border-gray-200" : "border-dashed border-gray-100"}`}
              >
                {formatAmount(tick)}
              </div>
            ))}
          </div>

          <div className="relative h-44 flex items-end justify-around px-8 z-10">
            {bars.map((bar, idx) => {
              const maxBarHeight = 110;
              const barHeightPx =
                bar.totalAmount > 0
                  ? Math.max(Math.round((bar.totalAmount / maxBarValue) * maxBarHeight), 8)
                  : 4;
              const plusHeightPx = bar.totalAmount > 0 ? Math.round((bar.plusAmount / bar.totalAmount) * barHeightPx) : 0;
              const premiumHeightPx = bar.totalAmount > 0 ? barHeightPx - plusHeightPx : 0;
              const isSelected = hasSelected ? inspecting.includes(bar.label) : idx === bars.length - 1;

              return (
                <div key={idx} className="flex flex-col items-center justify-end h-full group w-12 sm:w-14">
                  <div
                    className={`text-[11px] font-bold mb-1.5 px-1.5 py-0.5 rounded transition-all ${
                      isSelected
                        ? "bg-gray-900 text-white shadow-xs"
                        : "text-gray-700 bg-gray-100"
                    }`}
                  >
                    {formatAmount(bar.totalAmount)}
                  </div>

                  <div
                    style={{ height: `${barHeightPx}px` }}
                    className={`w-full flex flex-col justify-end rounded-t-md overflow-hidden bg-gray-100 transition-all duration-300 ${
                      isSelected
                        ? "ring-2 ring-[#ff4c05] ring-offset-2 shadow-md"
                        : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    <div
                      style={{ height: `${premiumHeightPx}px` }}
                      className="w-full bg-[#f59e0b]"
                      title={`Premium: $${bar.premiumAmount}`}
                    />
                    <div
                      style={{ height: `${plusHeightPx}px` }}
                      className="w-full bg-[#ff4c05]"
                      title={`Plus: $${bar.plusAmount}`}
                    />
                  </div>

                  <div className="text-center mt-2">
                    <div className="text-[11px] font-medium text-gray-600 whitespace-nowrap">
                      {bar.label}
                    </div>
                    <div className="text-[10px] font-semibold text-emerald-600">
                      {bar.growthRate}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
        <div className="flex items-center gap-1.5 font-medium text-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Cadence Performance:</span>
          <span className="font-bold text-gray-900">{data.cadencePerformance.averagePerPeriod}</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
          <span>
            Highest: <strong className="text-gray-900">{data.cadencePerformance.highest}</strong>
          </span>
          <span>
            Conversion: <strong className="text-emerald-600">{data.cadencePerformance.conversionRate}</strong>
          </span>
          <span>
            Billing Churn: <strong className="text-gray-900">{data.cadencePerformance.billingChurn}</strong>
          </span>
        </div>
      </div>
    </div>
  );
}
