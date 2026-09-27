import PageWraper from "@/Components/ui/CustomUi/PageWraper";

const ComplianceExportPage = () => {
  return (
    <PageWraper
      title="Compliance Export"
      description="Export platform supervision telemetry, audit logs, and donor tax-free exemption records."
    >
      <div className="bg-white rounded-xl border border-border p-8 text-center text-sm text-secondbase-color">
        Audit log downloads and regulatory compliance reporting.
      </div>
    </PageWraper>
  );
};

export default ComplianceExportPage;
