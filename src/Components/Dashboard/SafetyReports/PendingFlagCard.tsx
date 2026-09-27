import { IPendingReportItem } from "@/types";
import { AlertTriangle, Check } from "lucide-react";
import { Button } from "@/Components/ui/button";

interface PendingFlagCardProps {
  report: IPendingReportItem;
  onResolve: (report: IPendingReportItem) => void;
  onDismiss: (report: IPendingReportItem) => void;
}

export default function PendingFlagCard({
  report,
  onResolve,
  onDismiss,
}: PendingFlagCardProps) {
  const isHighPriority = report.priority === "HIGH PRIORITY";

  return (
    <div className="bg-white rounded-2xl border border-border p-5.5 shadow-xs space-y-4 hover:shadow-sm transition-all">
      {/* Top Meta Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Priority Badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] border ${
              isHighPriority
                ? "bg-rose-50 text-rose-600 border-rose-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isHighPriority ? "bg-rose-600" : "bg-amber-500"
              }`}
            />
            {report.priority}
          </span>

          {/* Category Pill */}
          <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold text-[11px]">
            {report.category}
          </span>

          {/* Report ID */}
          <span className="text-gray-400 font-mono text-[11px]">
            ID: {report.reportId}
          </span>

          <span className="text-gray-300">•</span>

          {/* Time */}
          <span className="text-gray-500 text-xs">{report.reportedTime}</span>

          <span className="text-gray-300">•</span>

          {/* Location */}
          <span className="text-gray-500 text-xs">{report.location}</span>
        </div>

        {/* Status Pill Right */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-amber-300 text-amber-700 bg-amber-50/50 text-[10px] font-bold uppercase tracking-wider self-start sm:self-auto">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          {report.status}
        </span>
      </div>

      {/* Target Title */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
          {report.targetTitle}
        </h3>
        {/* Violation Tag */}
        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>{report.violationTag}</span>
        </div>
      </div>

      {/* Reported Statement Box */}
      <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 text-xs">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
          Reported Statement & Incident Telemetry
        </div>
        <p className="text-gray-700 italic leading-relaxed">
          &ldquo;{report.statement}&rdquo;
        </p>
      </div>

      {/* Footer Controls */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          <span>Filed by: </span>
          <strong className="text-gray-800 font-semibold">{report.reporterName}</strong>
          <span className="text-gray-400"> ({report.reporterRole})</span>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-auto">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onDismiss(report)}
            className="text-xs h-8 text-gray-700 border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            Dismiss (No Violation)
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={() => onResolve(report)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 gap-1.5 font-semibold cursor-pointer shadow-xs"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Resolve & Enforce Policy</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
