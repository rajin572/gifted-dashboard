import { useState } from "react";
import { Radio } from "lucide-react";
import LiveStreamCard from "@/Components/Dashboard/LiveStreamWatch/LiveStreamCard";
import LiveStreamViewerModal from "@/Components/Dashboard/LiveStreamWatch/LiveStreamViewerModal";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import { LIVE_STREAM_WATCH_DESIGN_DATA } from "@/data/liveStreamWatchDesignData";
import { ILiveStreamWatchItem } from "@/types";
// import {
//   useGetLiveStreamsQuery,
//   useTerminateLiveStreamMutation,
// } from "@/redux/features/liveStreamWatch/liveStreamWatchApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

const LiveStreamWatchPage = () => {
  const [selectedStream, setSelectedStream] =
    useState<ILiveStreamWatchItem | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isTerminateOpen, setIsTerminateOpen] = useState(false);

  // TODO: wire to useGetLiveStreamsQuery once the endpoint exists.
  // const { data, isFetching } = useGetLiveStreamsQuery(
  //   { page: 1, limit: 10, status: "LIVE" },
  //   { refetchOnMountOrArgChange: true },
  // );
  // const streams = data?.data?.data ?? LIVE_STREAM_WATCH_DESIGN_DATA;
  const streams = LIVE_STREAM_WATCH_DESIGN_DATA;

  // const [terminateLiveStream] = useTerminateLiveStreamMutation();
  const handleTerminate = async (stream: ILiveStreamWatchItem) => {
    // const res = await tryCatchWrapper(
    //   terminateLiveStream,
    //   { params: { id: stream._id } },
    //   { toastLoadingMessage: "Terminating live stream..." },
    // );
    // if (res?.success) {
    //   setIsTerminateOpen(false);
    //   setSelectedStream(null);
    // }
    void stream;
    setIsTerminateOpen(false);
    setSelectedStream(null);
  };

  return (
    <PageWraper
      className="w-full py-7 sm:py-7 [&>div:first-child]:mb-0"
      title="Live Stream Broadcast Supervision"
      description="Real-time monitoring of community member giveaway streams, viewer participation, and stream termination controls."
      actions={
        <div className="inline-flex h-9 items-center gap-2 rounded-full border border-error/30 bg-error/5 px-4 text-xs font-semibold text-error">
          <Radio className="size-3.5 fill-error" />
          {streams.length} Community Broadcasts Active
        </div>
      }
    >
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {streams.map((stream) => (
          <LiveStreamCard
            key={stream._id}
            stream={stream}
            onWatch={(currentStream) => {
              setSelectedStream(currentStream);
              setIsViewerOpen(true);
            }}
            onTerminate={(currentStream) => {
              setSelectedStream(currentStream);
              setIsTerminateOpen(true);
            }}
          />
        ))}
      </div>

      <LiveStreamViewerModal
        open={isViewerOpen}
        onClose={() => {
          setIsViewerOpen(false);
          setSelectedStream(null);
        }}
        stream={selectedStream}
      />

      <ConfirmModal<ILiveStreamWatchItem>
        open={isTerminateOpen}
        onCancel={() => {
          setIsTerminateOpen(false);
          setSelectedStream(null);
        }}
        currentRecord={selectedStream}
        onConfirm={handleTerminate}
        title="Terminate live stream"
        description={`End “${selectedStream?.title ?? "this broadcast"}” for all current viewers?`}
        confirmText="Terminate Stream"
        cancelText="Keep Watching"
        variant="danger"
        iconPreset="cancel"
      />
    </PageWraper>
  );
};

export default LiveStreamWatchPage;
