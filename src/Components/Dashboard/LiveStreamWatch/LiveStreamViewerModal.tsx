import { Play } from "lucide-react";
import { Button } from "@/Components/ui/button";
import ReusableModal from "@/Components/ui/CustomUi/ReuseableModal";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { ILiveStreamWatchItem } from "@/types";

interface LiveStreamViewerModalProps {
  open: boolean;
  onClose: () => void;
  stream: ILiveStreamWatchItem | null;
}

const LiveStreamViewerModal = ({
  open,
  onClose,
  stream,
}: LiveStreamViewerModalProps) => {
  if (!stream) return null;

  return (
    <ReusableModal
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) onClose();
      }}
      title=""
      maxWidth="sm:max-w-[760px]"
      showXCloseButton={false}
      dialogClassName="gap-0 overflow-hidden rounded-2xl border-border bg-primary-color p-0 shadow-2xl"
      contentClassName="max-h-[88vh] overflow-hidden p-0 sm:p-0"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-base-color">
        <img
          src={stream.thumbnail}
          alt={`${stream.title} live stream`}
          className="h-full w-full object-cover brightness-75"
        />
        <Tag
          theme="error"
          className="absolute left-4 top-4 rounded-md bg-error px-3 py-1.5 text-[11px] text-primary-color"
        >
          LIVE
        </Tag>
        <button
          type="button"
          aria-label="Play live stream"
          className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary-color/95 text-secondary-color shadow-xl transition-transform hover:scale-105"
        >
          <Play className="ml-1 size-5 fill-secondary-color" />
        </button>
      </div>

      <div className="flex items-center justify-between gap-5 px-5 py-4">
        <div className="min-w-0">
          <h2 className="truncate text-base font-bold text-base-color">
            {stream.title}
          </h2>
          <p className="mt-1 text-xs text-base-color/45">
            <span className="font-semibold text-base-color/60">
              {stream.viewers} viewers
            </span>{" "}
            <span aria-hidden="true">•</span> Hosted by {stream.host.name}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="h-9 shrink-0 rounded-lg border-border px-4 text-xs font-medium text-base-color/70"
        >
          Close Viewer
        </Button>
      </div>
    </ReusableModal>
  );
};

export default LiveStreamViewerModal;
