import { Check, SlidersHorizontal, CheckCircle2 } from "lucide-react";
import { IOperationalSafeguards } from "@/types";

interface OperationalSafeguardsSectionProps {
    safeguards: IOperationalSafeguards;
    onChangeSafeguard?: (key: keyof IOperationalSafeguards, val: boolean) => void;
}

export default function OperationalSafeguardsSection({
    safeguards,
    onChangeSafeguard,
}: OperationalSafeguardsSectionProps) {
    return (
        <div id="section-safeguards" className="bg-white rounded-2xl border border-border p-5.5 shadow-2xs space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-indigo-600 shrink-0" />
                <h2 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
                    Operational Safety Safeguards
                </h2>
            </div>

            <p className="text-xs text-gray-500 -mt-2">
                Automated compliance toggles enforced in real time at time of gift listing and recipient claim.
            </p>

            {/* 3-column Safeguard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                {/* Safeguard 1 */}
                <div
                    onClick={() =>
                        onChangeSafeguard?.(
                            "requireAntiResalePledge",
                            !safeguards.requireAntiResalePledge
                        )
                    }
                    className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 flex items-center justify-between gap-3 shadow-2xs cursor-pointer transition-all"
                >
                    <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                            Require Anti-Resale Pledge
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                            Applicants must acknowledge $0 resale penalty before claim submission
                        </p>
                    </div>
                    <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all ${safeguards.requireAntiResalePledge
                                ? "bg-[#ff4c05] border-[#ff4c05] text-white shadow-2xs"
                                : "border-gray-300 bg-white"
                            }`}
                    >
                        {safeguards.requireAntiResalePledge && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                </div>

                {/* Safeguard 2 */}
                <div
                    onClick={() =>
                        onChangeSafeguard?.(
                            "allowCommunityLiveStreams",
                            !safeguards.allowCommunityLiveStreams
                        )
                    }
                    className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 flex items-center justify-between gap-3 shadow-2xs cursor-pointer transition-all"
                >
                    <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                            Allow Community Live Streams
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                            Verified community donors can host real-time unboxing and gifting rooms
                        </p>
                    </div>
                    <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all ${safeguards.allowCommunityLiveStreams
                                ? "bg-[#ff4c05] border-[#ff4c05] text-white shadow-2xs"
                                : "border-gray-300 bg-white"
                            }`}
                    >
                        {safeguards.allowCommunityLiveStreams && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                </div>

                {/* Safeguard 3 */}
                <div
                    onClick={() =>
                        onChangeSafeguard?.(
                            "aiStoryUrgencyAssistance",
                            !safeguards.aiStoryUrgencyAssistance
                        )
                    }
                    className="bg-white border border-gray-200/90 hover:border-gray-300 rounded-xl p-4 flex items-center justify-between gap-3 shadow-2xs cursor-pointer transition-all"
                >
                    <div>
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 leading-tight">
                            AI Story Urgency Assistance
                        </h4>
                        <p className="text-[11px] text-gray-500 mt-1 leading-snug">
                            Evaluate applicant stories with Gemini AI to score genuine livelihood need
                        </p>
                    </div>
                    <div
                        className={`w-5 h-5 rounded flex items-center justify-center shrink-0 border transition-all ${safeguards.aiStoryUrgencyAssistance
                                ? "bg-[#ff4c05] border-[#ff4c05] text-white shadow-2xs"
                                : "border-gray-300 bg-white"
                            }`}
                    >
                        {safeguards.aiStoryUrgencyAssistance && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                </div>
            </div>

            {/* Persistence Callout Banner */}
            <div className="bg-emerald-50/70 border border-emerald-200/90 rounded-xl p-3.5 text-xs text-emerald-800 flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                    All Active Categories, Community Guidelines, and Privacy Policy modifications are instantly persisted and synchronized across the Austin Metro Node.
                </span>
            </div>
        </div>
    );
}

