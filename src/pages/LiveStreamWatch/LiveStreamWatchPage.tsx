import PageWraper from "@/Components/ui/CustomUi/PageWraper";

const LiveStreamWatchPage = () => {
  return (
    <PageWraper
      title="Live Stream Watch"
      description="Monitor active community broadcasts, peer interactions, and live chat supervision."
    >
      <div className="bg-white rounded-xl border border-border p-8 text-center text-sm text-secondbase-color">
        Active live broadcast feeds and automated moderation alerts.
      </div>
    </PageWraper>
  );
};

export default LiveStreamWatchPage;
