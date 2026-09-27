import { IMrrCadenceData } from "@/types";

interface MrrTrajectoryCadenceCardProps {
  data: IMrrCadenceData;
}

export default function MrrTrajectoryCadenceCard({ data }: MrrTrajectoryCadenceCardProps) {
  // Max amount for bar scaling, e.g. 3000
  const maxBarValue = 3000;

  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-xs flex flex-col justify-between">
      {/* Header */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-gray-900">
              Recurring MRR Trajectory & Cadence
            </h3>
            <span className="text-[10px] font-semibold uppercase tracking-wider bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              30D View
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium text-gray-600">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff4c05]" />
              <span>Plus ($9.99)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
              <span>Premium ($19.99)</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Weekly subscriber revenue run-rate across the past 30 days
        </p>

        {/* Cadence Telemetry Box */}
        <div className="mt-4 bg-gray-50/80 border border-gray-100 rounded-xl p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Inspecting Period
            </div>
            <div className="font-bold text-gray-900 mt-0.5">{data.inspectingPeriod}</div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Period MRR
            </div>
            <div className="font-bold text-emerald-600 mt-0.5">
              ${data.periodMrr.toLocaleString()}{" "}
              <span className="text-[11px]">+{data.periodGrowth}%</span>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              Subscribers
            </div>
            <div className="font-bold text-orange-600 mt-0.5">
              {data.subscribers.plus} Plus • {data.subscribers.premium} Prem
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              15% Transit Fund
            </div>
            <div className="font-bold text-gray-900 mt-0.5">
              ${data.transitFund15.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Chart Visualization */}
        <div className="mt-6 relative pt-4 pb-2">
          {/* Y Axis reference lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-400">
            <div className="border-b border-dashed border-gray-100 pb-0.5">$3k</div>
            <div className="border-b border-dashed border-gray-100 pb-0.5">$2k</div>
            <div className="border-b border-dashed border-gray-100 pb-0.5">$1k</div>
            <div className="border-b border-gray-200 pb-0.5">$0k</div>
          </div>

          {/* Bars */}
          <div className="relative h-44 flex items-end justify-around px-8 z-10">
            {data.bars.map((bar, idx) => {
              const maxBarHeight = 110;
              const barHeightPx = Math.max(Math.round((bar.totalAmount / maxBarValue) * maxBarHeight), 20);
              const plusHeightPx = Math.round((bar.plusAmount / bar.totalAmount) * barHeightPx);
              const premiumHeightPx = barHeightPx - plusHeightPx;

              return (
                <div key={idx} className="flex flex-col items-center justify-end h-full group w-12 sm:w-14">
                  {/* Amount Badge */}
                  <div
                    className={`text-[11px] font-bold mb-1.5 px-1.5 py-0.5 rounded transition-all ${
                      bar.isSelected
                        ? "bg-gray-900 text-white shadow-xs"
                        : "text-gray-700 bg-gray-100"
                    }`}
                  >
                    ${(bar.totalAmount / 1000).toFixed(1)}k
                  </div>

                  {/* Stacked Bar Container */}
                  <div
                    style={{ height: `${barHeightPx}px` }}
                    className={`w-full flex flex-col justify-end rounded-t-md overflow-hidden transition-all duration-300 ${
                      bar.isSelected
                        ? "ring-2 ring-[#ff4c05] ring-offset-2 shadow-md"
                        : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    {/* Top chunk: Premium */}
                    <div
                      style={{ height: `${premiumHeightPx}px` }}
                      className="w-full bg-[#f59e0b]"
                      title={`Premium: $${bar.premiumAmount}`}
                    />
                    {/* Bottom chunk: Plus */}
                    <div
                      style={{ height: `${plusHeightPx}px` }}
                      className="w-full bg-[#ff4c05]"
                      title={`Plus: $${bar.plusAmount}`}
                    />
                  </div>

                  {/* Label & Growth */}
                  <div className="text-center mt-2">
                    <div className="text-[11px] font-medium text-gray-600 whitespace-nowrap">
                      {bar.weekLabel}
                    </div>
                    <div className="text-[10px] font-semibold text-emerald-600">
                      +{bar.growth}%
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Metrics */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
        <div className="flex items-center gap-1.5 font-medium text-gray-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Cadence Performance:</span>
          <span className="font-bold text-gray-900">${data.cadenceAvg.toLocaleString()} avg / period</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-[11px]">
          <span>Highest: <strong className="text-gray-900">${data.highest.toLocaleString()}</strong></span>
          <span>Conversion: <strong className="text-emerald-600">{data.conversionRate}% paid</strong></span>
          <span>Billing Churn: <strong className="text-gray-900">{data.billingChurn}%</strong></span>
        </div>
      </div>
    </div>
  );
}
