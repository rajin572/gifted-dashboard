import {
  Check,
  CircleCheck,
  Heart,
  RotateCcw,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { IStoryClaimsAuditItem } from "@/types";

interface StoryAuditCardProps {
  story: IStoryClaimsAuditItem;
  onShortlist: (story: IStoryClaimsAuditItem) => void;
  onReturnToPending: (story: IStoryClaimsAuditItem) => void;
  onRemove: (story: IStoryClaimsAuditItem) => void;
}

const StoryAuditCard = ({
  story,
  onShortlist,
  onReturnToPending,
  onRemove,
}: StoryAuditCardProps) => {
  const isShortlisted = story.status === "SHORTLISTED";

  return (
    <article className="flex min-h-[402px] flex-col rounded-2xl border border-border bg-primary-color px-5 py-5 shadow-xs">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={story.applicantAvatar}
            alt={story.applicantName}
            className="size-11 shrink-0 rounded-full border-2 border-secondary-color/40 object-cover"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h2 className="truncate text-sm font-bold text-base-color">
                {story.applicantName}
              </h2>
              {story.isVerified && (
                <CircleCheck className="size-4 shrink-0 fill-success text-primary-color" />
              )}
            </div>
            <p className="mt-0.5 truncate text-[11px] text-base-color/45">
              {story.location} <span aria-hidden="true">•</span> {story.submittedAt}
            </p>
          </div>
        </div>

        <Tag
          theme={isShortlisted ? "orange" : "blue"}
          className={
            isShortlisted
              ? "border border-secondary-color/45 bg-secondary-color/5 px-2.5 py-1 text-[10px] uppercase tracking-wide text-secondary-color"
              : "border border-border bg-background-color px-2.5 py-1 text-[10px] uppercase tracking-wide text-base-color/45"
          }
        >
          {story.status}
        </Tag>
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-background-color/70 p-2.5">
        <img
          src={story.gift.image}
          alt={story.gift.title}
          className="size-10 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wide text-base-color/35">
            Applying for:
          </p>
          <p className="truncate text-[13px] font-bold text-base-color">
            {story.gift.title}
          </p>
        </div>
      </div>

      <p className="mt-3 min-h-5 text-sm font-bold text-secondary-color">
        {story.headline}
      </p>

      <div className="mt-2 min-h-[47px] rounded-xl border border-border bg-background-color/65 px-4 py-3">
        <p className="line-clamp-2 text-[13px] italic leading-5 text-base-color/65">
          “{story.story}”
        </p>
      </div>

      <div className="mt-3 flex min-h-[56px] items-start gap-3 rounded-xl border border-success/35 bg-success/7 px-3 py-2 text-success">
        <Sparkles className="mt-0.5 size-4 shrink-0" />
        <p className="text-xs leading-5">
          <span className="font-bold">AI Urgency Score ({story.aiUrgencyScore}%):</span>{" "}
          {story.aiAssessment}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-b border-border py-3 text-xs">
        <span className="inline-flex items-center gap-1 font-semibold text-secondary-color">
          <Heart className="size-3.5 fill-secondary-color" />
          {story.peerVotes} Peer Votes
        </span>
        <span className="text-base-color/40">
          <span aria-hidden="true">◴</span> Status: {story.status.toLowerCase()}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3">
        {isShortlisted ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onReturnToPending(story)}
            className="h-8 rounded-lg border-border bg-primary-color px-3 text-xs font-semibold text-base-color/70"
          >
            <RotateCcw className="size-3.5" />
            Return to Pending
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onShortlist(story)}
            className="h-8 rounded-lg border-success/35 bg-success/7 px-3 text-xs font-semibold text-success hover:bg-success/10 hover:text-success"
          >
            <Check className="size-3.5" />
            Shortlist Story
          </Button>
        )}

        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => onRemove(story)}
          className="h-8 rounded-lg bg-background-color px-3 text-xs font-semibold text-base-color/35 hover:text-error"
        >
          <Trash2 className="size-3.5" />
          Remove
        </Button>
      </div>
    </article>
  );
};

export default StoryAuditCard;
