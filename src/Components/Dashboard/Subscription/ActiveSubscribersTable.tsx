import { useState } from "react";
import { ISubscriberAccountItem, SubscriberTier, SubscriptionStatus } from "@/types";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import { CheckCircle2, Search } from "lucide-react";
import { Button } from "@/Components/ui/button";

interface ActiveSubscribersTableProps {
  data: ISubscriberAccountItem[];
  onManage: (item: ISubscriberAccountItem) => void;
  onCompMonth?: (item: ISubscriberAccountItem) => void;
}

export default function ActiveSubscribersTable({
  data,
  onManage,
  onCompMonth,
}: ActiveSubscribersTableProps) {
  const [search, setSearch] = useState("");
  const [selectedTier, setSelectedTier] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  const tierBadges: Record<SubscriberTier, { label: string; className: string }> = {
    FREE: {
      label: "FREE",
      className: "border border-gray-300 text-gray-600 bg-gray-50",
    },
    PLUS: {
      label: "PLUS",
      className: "border border-[#ff4c05]/50 text-[#ff4c05] bg-orange-50/60",
    },
    PREMIUM: {
      label: "PREMIUM",
      className: "border border-amber-400 text-amber-700 bg-amber-50/60",
    },
  };

  const statusBadges: Record<SubscriptionStatus, { label: string; className: string }> = {
    FREE: {
      label: "FREE",
      className: "bg-gray-100 text-gray-600",
    },
    ACTIVE: {
      label: "ACTIVE",
      className: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    },
    TRIAL: {
      label: "TRIAL",
      className: "bg-amber-50 text-amber-700 border border-amber-200",
    },
    "PAST DUE": {
      label: "PAST DUE",
      className: "bg-rose-50 text-rose-600 border border-rose-200",
    },
    CANCELED: {
      label: "CANCELED",
      className: "bg-gray-100 text-gray-500",
    },
  };

  const columns: Column<ISubscriberAccountItem>[] = [
    {
      header: "RECIPIENT MEMBER",
      accessorKey: "name",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {row.avatar ? (
            <img
              src={row.avatar}
              alt={row.name}
              className="w-9 h-9 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-orange-100 text-[#ff4c05] font-bold text-xs flex items-center justify-center">
              {row.name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <div className="flex items-center gap-1.5 font-bold text-gray-900 text-xs sm:text-sm">
              <span>{row.name}</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-[11px] text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "TIER",
      accessorKey: "tier",
      render: (val: SubscriberTier) => {
        const badge = tierBadges[val] || tierBadges.FREE;
        return (
          <span
            className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider rounded uppercase ${badge.className}`}
          >
            {badge.label}
          </span>
        );
      },
    },
    {
      header: "STATUS",
      accessorKey: "status",
      render: (val: SubscriptionStatus) => {
        const badge = statusBadges[val] || statusBadges.FREE;
        return (
          <span
            className={`inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider rounded-md uppercase ${badge.className}`}
          >
            {badge.label}
          </span>
        );
      },
    },
    {
      header: "CLAIMS ALLOWANCE",
      accessorKey: "claimsUsed",
      render: (_, row) => {
        const percentage = Math.round((row.claimsUsed / row.claimsLimit) * 100);
        return (
          <div className="w-36">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-gray-900">
                {row.claimsUsed} <span className="font-normal text-gray-500">/ {row.claimsLimit} claims</span>
              </span>
              <span className="text-[11px] text-gray-500">{percentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                style={{ width: `${percentage}%` }}
                className={`h-full rounded-full ${
                  percentage >= 100 ? "bg-rose-500" : "bg-[#ff4c05]"
                }`}
              />
            </div>
          </div>
        );
      },
    },
    {
      header: "RENEWAL DATE",
      accessorKey: "renewalDateText",
      render: (val) => (
        <span className="text-xs text-gray-600 font-medium">{val}</span>
      ),
    },
    {
      header: "PAYMENT",
      accessorKey: "paymentHealth",
      render: (val) => {
        if (val === "Valid") {
          return <span className="text-xs font-bold text-emerald-600">Valid</span>;
        }
        if (val === "Past Due") {
          return <span className="text-xs font-bold text-rose-600">Past Due</span>;
        }
        return <span className="text-xs text-gray-500">{val}</span>;
      },
    },
    {
      header: "QUICK SUBSCRIPTION ACTIONS",
      accessorKey: "_id",
      render: (_, row) => (
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onCompMonth?.(row)}
            className="text-[11px] h-7 px-2.5 font-semibold text-emerald-600 border-emerald-300 hover:bg-emerald-50 cursor-pointer"
          >
            +1 Mo
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onManage(row)}
            className="text-[11px] h-7 px-2.5 font-semibold text-gray-700 border-gray-300 hover:bg-gray-100 cursor-pointer"
          >
            Manage
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              2. Active Subscribers Directory & Member Actions
            </h2>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Supervise recipient subscription accounts, review claim quota consumption, comp complimentary months, and adjust member plan tiers.
          </p>
        </div>
        <span className="text-xs text-gray-500 font-medium">
          Showing {data.length} of {data.length} accounts
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-xl border border-border p-3 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search subscribers by name, email, or neighborhood..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-lg text-gray-800 placeholder:text-gray-400 focus:outline-hidden focus:border-[#ff4c05]"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Tier Filters */}
          <div className="inline-flex items-center bg-gray-100/90 rounded-lg p-1 border border-gray-200/60 text-xs font-semibold">
            {["ALL", "FREE", "PLUS", "PREMIUM"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTier(t)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedTier === t
                    ? "bg-[#ff4c05] text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {t === "ALL" ? "All Tiers" : t}
              </button>
            ))}
          </div>

          {/* Status Filters */}
          <div className="inline-flex items-center bg-gray-100/90 rounded-lg p-1 border border-gray-200/60 text-xs font-semibold">
            {["ALL", "ACTIVE", "TRIAL", "PAST DUE", "CANCELED"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedStatus(s)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedStatus === s
                    ? "bg-gray-900 text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {s === "ALL" ? "All Statuses" : s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-border p-5 shadow-xs overflow-x-auto">
        <ReusableTable
          data={data}
          columns={columns}
          pagination={false}
          scroll={false}
        />
      </div>
    </div>
  );
}
