import PageWraper from "@/Components/ui/CustomUi/PageWraper";

const TrustSafetyQueuePage = () => {
  return (
    <PageWraper
      title="Trust & Safety Queue"
      description="Inspect flagged items, report zero-resale violations, and resolve community disputes."
    >
      <div className="bg-white rounded-xl border border-border p-8 text-center text-sm text-secondbase-color">
        Trust & Safety resolution pipeline and reported flags review.
      </div>
    </PageWraper>
  );
};

export default TrustSafetyQueuePage;
