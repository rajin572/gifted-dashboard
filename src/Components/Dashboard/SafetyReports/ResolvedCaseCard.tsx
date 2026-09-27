import { IResolvedCaseItem } from "@/types";
import { Check } from "lucide-react";

interface ResolvedCaseCardProps {
  report: IResolvedCaseItem;
}

export default function ResolvedCaseCard({ report }: ResolvedCaseCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-border p-5.5 shadow-xs space-y-4">
      {/* Top Meta Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* Resolved Case Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Check className="w-3 h-3" />
            <span>RESOLVED CASE</span>
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
          <span className="text-gray-500 text-xs">{report.resolvedTime}</span>

          <span className="text-gray-300">•</span>

          {/* Location */}
          <span className="text-gray-500 text-xs">{report.location}</span>
        </div>

        {/* Status Pill Right */}
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-300 text-emerald-700 bg-emerald-50/50 text-[10px] font-bold uppercase tracking-wider self-start sm:self-auto">
          <Check className="w-3 h-3 text-emerald-600" />
          <span>{report.status}</span>
        </span>
      </div>

      {/* Target Title & Reason */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">
          {report.targetTitle}
        </h3>
        <p className="text-xs text-gray-600 mt-1 font-medium">
          <strong className="text-gray-800">Reason: </strong>
          {report.reason}
        </p>
      </div>

      {/* Incident Statement */}
      <div className="bg-gray-50/80 border border-gray-100 rounded-xl p-4 text-xs">
        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
          Incident Statement
        </div>
        <p className="text-gray-700 italic leading-relaxed">
          &ldquo;{report.statement}&rdquo;
        </p>
      </div>

      {/* Resolution Action Box */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3.5 text-xs text-emerald-800 flex items-start gap-2">
        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold text-emerald-900">Resolution Action: </strong>
          <span>{report.resolutionActionText}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 border-t border-gray-100 gap-2">
        <div>
          <span>Reporter: </span>
          <strong className="text-gray-800 font-semibold">{report.reporterName}</strong>
          <span className="text-gray-400"> ({report.reporterRole})</span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Closed by {report.closedBy}</span>
        </div>
      </div>
    </div>
  );
}
