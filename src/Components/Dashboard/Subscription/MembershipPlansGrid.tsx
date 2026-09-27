import { useState } from "react";
import { Check, X, Plus, ArrowRight } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { IMembershipPlan } from "@/types";

interface MembershipPlansGridProps {
  plans: IMembershipPlan[];
  onSavePlan?: (planId: string) => void;
  onSaveAllPlans?: () => void;
}

export default function MembershipPlansGrid({
  plans: initialPlans,
  onSavePlan,
  onSaveAllPlans,
}: MembershipPlansGridProps) {
  const [plans, setPlans] = useState<IMembershipPlan[]>(initialPlans);
  const [newPerkInputs, setNewPerkInputs] = useState<Record<string, string>>({});

  const handleRemovePerk = (planId: string, perkIndex: number) => {
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          const updated = [...plan.entitlements];
          updated.splice(perkIndex, 1);
          return { ...plan, entitlements: updated };
        }
        return plan;
      })
    );
  };

  const handleAddPerk = (planId: string) => {
    const text = newPerkInputs[planId]?.trim();
    if (!text) return;
    setPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          return { ...plan, entitlements: [...plan.entitlements, text] };
        }
        return plan;
      })
    );
    setNewPerkInputs((prev) => ({ ...prev, [planId]: "" }));
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff4c05]" />
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              1. Membership Plans & Claim Quotas
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Live subscription tiers configured for recipient checkouts. Adjust monthly/annual fees, monthly claim submission allowances, trial windows, and highlighted feature perks.
          </p>
        </div>
        <Button
          type="button"
          onClick={onSaveAllPlans}
          className="bg-[#ff4c05] hover:bg-[#e04304] text-white text-xs h-9 font-semibold cursor-pointer shrink-0 self-start sm:self-auto"
        >
          Save All Plans
        </Button>
      </div>

      {/* Grid of 3 Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map((plan) => {
          const isPlus = plan.id === "plus";

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-2xl border p-5.5 flex flex-col justify-between transition-all ${
                isPlus
                  ? "border-[#ff4c05]/60 shadow-sm ring-1 ring-[#ff4c05]/30 relative"
                  : "border-border shadow-2xs hover:shadow-xs"
              }`}
            >
              <div>
                {/* Header & Badges */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-800 bg-gray-100 px-2.5 py-1 rounded-md">
                    {plan.name}
                  </span>
                  {plan.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isPlus
                          ? "bg-orange-50 text-[#ff4c05] border-orange-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      }`}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div className="mt-4">
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                    Description
                  </div>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed min-h-[38px]">
                    {plan.description}
                  </p>
                </div>

                {/* Pricing & Claims Boxes */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-3">
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      Monthly Fee
                    </div>
                    <div className="text-base font-bold text-gray-900 mt-0.5">
                      $ {plan.monthlyFee === 0 ? "0" : plan.monthlyFee.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-3">
                    <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      Monthly Claims
                    </div>
                    <div className="text-base font-bold text-orange-600 mt-0.5">
                      {plan.monthlyClaims}{" "}
                      <span className="text-xs font-normal text-gray-500">/mo</span>
                    </div>
                  </div>
                </div>

                {/* Feature Entitlements */}
                <div className="mt-5">
                  <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                    Feature Entitlements
                  </div>
                  <div className="space-y-2">
                    {plan.entitlements.map((perk, perkIdx) => (
                      <div
                        key={perkIdx}
                        className="flex items-center justify-between text-xs bg-gray-50/60 hover:bg-gray-50 border border-gray-100/80 rounded-lg px-2.5 py-1.5 transition-colors group"
                      >
                        <div className="flex items-center gap-2 text-gray-700 font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span className="line-clamp-1">{perk}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemovePerk(plan.id, perkIdx)}
                          className="text-gray-400 hover:text-gray-700 p-0.5 transition-colors cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}

                    {/* Add Feature Perk Input */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <input
                        type="text"
                        placeholder="Add feature perk..."
                        value={newPerkInputs[plan.id] || ""}
                        onChange={(e) =>
                          setNewPerkInputs((prev) => ({
                            ...prev,
                            [plan.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddPerk(plan.id);
                          }
                        }}
                        className="flex-1 bg-white border border-gray-200 rounded-lg px-2.5 py-1 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-hidden focus:border-[#ff4c05]"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddPerk(plan.id)}
                        className="w-7 h-7 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-3.5 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[11px] font-mono text-gray-400 uppercase">
                  Tier: {plan.id.toUpperCase()}
                </span>
                <button
                  type="button"
                  onClick={() => onSavePlan?.(plan.id)}
                  className="inline-flex items-center gap-1 font-semibold text-[#ff4c05] hover:text-[#e04304] transition-colors cursor-pointer"
                >
                  <span>Save Tier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
