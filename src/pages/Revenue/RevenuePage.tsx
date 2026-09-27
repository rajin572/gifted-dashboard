import PageWraper from "@/Components/ui/CustomUi/PageWraper";

const RevenuePage = () => {
  return (
    <PageWraper
      title="Revenue & Subscriptions"
      description="Platform subscription earnings, community sponsorships, and financial oversight."
    >
      <div className="bg-white rounded-xl border border-border p-8 text-center text-sm text-secondbase-color">
        Platform revenue metrics, subscription tiers, and monthly recurring revenue (MRR) tracking.
      </div>
    </PageWraper>
  );
};

export default RevenuePage;
