import { Eye, X } from "lucide-react";
import { Button } from "@/Components/ui/button";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { ILiveStreamWatchItem } from "@/types";

interface LiveStreamCardProps {
  stream: ILiveStreamWatchItem;
  onWatch: (stream: ILiveStreamWatchItem) => void;
  onTerminate: (stream: ILiveStreamWatchItem) => void;
}

const LiveStreamCard = ({ stream, onWatch, onTerminate }: LiveStreamCardProps) => {
  return (
    <article className="rounded-2xl border border-border bg-primary-color p-5 shadow-md shadow-base-color/8">
      <div className="flex items-start gap-3">
        <div className="relative shrink-0 overflow-hidden rounded-xl">
          <img
            src={stream.thumbnail}
            alt=""
            className="size-20 object-cover"
          />
          <Tag
            theme="error"
            className="absolute left-1.5 top-1.5 rounded-md bg-error px-2 py-1 text-[10px] leading-none text-primary-color"
          >
            LIVE
          </Tag>
        </div>

        <div className="min-w-0 flex-1 pt-1">
          <h2 className="truncate text-[15px] font-bold text-base-color">
            {stream.title}
          </h2>
          <p className="mt-1 truncate text-xs text-base-color/45">
            Host:{" "}
            <span className="font-semibold text-base-color/70">{stream.host.name}</span>{" "}
            ({stream.host.location})
          </p>
          <div className="mt-3 flex items-center gap-3">
            <Tag
              theme="success"
              className="bg-success/10 px-3 py-1 text-[11px] text-success"
            >
              {`${stream.viewers} Viewers`}
            </Tag>
            <span className="text-[11px] text-base-color/35">
              {stream.startedAtLabel}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex min-h-[76px] items-center justify-between gap-4 rounded-xl border border-border bg-background-color/70 px-4 py-2.5">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wide text-base-color/35">
            Featured item
          </p>
          <p className="truncate text-[13px] font-bold text-base-color">
            {stream.featuredItem.title}
          </p>
          <p className="mt-0.5 text-[11px] text-base-color/35">
            {stream.featuredItem.condition}
          </p>
        </div>
        {stream.featuredItem.isFree && (
          <Tag
            theme="orange"
            className="shrink-0 bg-secondary-color/7 px-3 py-1 text-[11px] text-secondary-color"
          >
            100% Free
          </Tag>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onWatch(stream)}
          className="h-9 rounded-lg bg-background-color px-4 text-xs font-semibold text-base-color hover:bg-background-color/80"
        >
          <Eye className="size-4 text-secondary-color" />
          Watch Stream
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onTerminate(stream)}
          className="h-9 rounded-lg border-error/30 bg-error/5 px-4 text-xs font-semibold text-error hover:bg-error/10 hover:text-error"
        >
          <X className="size-3.5" />
          Terminate Stream
        </Button>
      </div>
    </article>
  );
};

export default LiveStreamCard;
