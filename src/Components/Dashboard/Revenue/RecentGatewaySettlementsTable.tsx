import { IGatewaySettlementItem } from "@/types";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { ArrowRight } from "lucide-react";

interface RecentGatewaySettlementsTableProps {
  data: IGatewaySettlementItem[];
}

export default function RecentGatewaySettlementsTable({
  data,
}: RecentGatewaySettlementsTableProps) {
  const columns: Column<IGatewaySettlementItem>[] = [
    {
      header: "SUBSCRIBER",
      accessorKey: "subscriber",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          {row.subscriber.avatar ? (
            <img
              src={row.subscriber.avatar}
              alt={row.subscriber.name}
              className="w-9 h-9 rounded-full object-cover border border-gray-200"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-orange-100 text-[#ff4c05] font-bold text-xs flex items-center justify-center">
              {row.subscriber.name.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <div className="font-semibold text-gray-900 text-xs sm:text-sm">
              {row.subscriber.name}
            </div>
            <div className="text-[11px] text-gray-500">{row.subscriber.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "PLAN",
      accessorKey: "plan",
      render: (val) => {
        if (val === "PLUS") {
          return (
            <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider rounded border border-[#ff4c05]/40 text-[#ff4c05] bg-orange-50/50 uppercase">
              PLUS
            </span>
          );
        }
        return (
          <span className="inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider rounded border border-[#f59e0b]/40 text-[#b45309] bg-amber-50/50 uppercase">
            PREMIUM
          </span>
        );
      },
    },
    {
      header: "AMOUNT",
      accessorKey: "amount",
      render: (val) => (
        <span className="font-bold text-gray-900 text-xs sm:text-sm">
          ${Number(val).toFixed(2)}
        </span>
      ),
    },
    {
      header: "PROVIDER",
      accessorKey: "provider",
      render: (val) => <span className="text-xs text-gray-700 font-medium">{val}</span>,
    },
    {
      header: "STATUS",
      accessorKey: "status",
      render: (val) => {
        if (val === "Successful") {
          return (
            <Tag theme="success" className="text-[11px] font-medium px-2 py-0.5">
              Successful
            </Tag>
          );
        }
        if (val === "Pending") {
          return (
            <Tag theme="warning" className="text-[11px] font-medium px-2 py-0.5">
              Pending
            </Tag>
          );
        }
        return (
          <Tag theme="error" className="text-[11px] font-medium px-2 py-0.5">
            Failed
          </Tag>
        );
      },
    },
    {
      header: "TIMESTAMP",
      accessorKey: "timestamp",
      render: (val) => <span className="text-xs text-gray-500">{val}</span>,
    },
    {
      header: "INVOICE",
      accessorKey: "invoice",
      render: (val) => (
        <span className="text-xs font-mono text-gray-600 font-medium">{val}</span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-border p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2">
        <div>
          <h3 className="text-base font-bold text-gray-900">Recent Gateway Settlements</h3>
          <p className="text-xs text-gray-500 mt-0.5">
            Real-time payment transactions via Stripe, Apple IAP & Google Play
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#ff4c05] hover:text-[#e04304] transition-colors cursor-pointer"
        >
          <span>View Full Ledger & Invoices</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="mt-2 -mx-5 sm:mx-0 overflow-x-auto">
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
