import PageWraper from "@/Components/ui/CustomUi/PageWraper";

const StoriesClaimsAuditPage = () => {
  return (
    <PageWraper
      title="Stories & Claims Audit"
      description="Review applicant recipient stories, zero-resale declarations, and claim history."
    >
      <div className="bg-white rounded-xl border border-border p-8 text-center text-sm text-secondbase-color">
        Recipient story moderation and claim verification queue.
      </div>
    </PageWraper>
  );
};

export default StoriesClaimsAuditPage;
