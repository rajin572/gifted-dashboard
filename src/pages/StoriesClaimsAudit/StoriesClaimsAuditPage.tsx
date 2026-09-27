import { useState } from "react";
import StoryAuditCard from "@/Components/Dashboard/StoriesClaimsAudit/StoryAuditCard";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseFilterSelect, {
  FilterOption,
} from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import { STORIES_CLAIMS_AUDIT_DESIGN_DATA } from "@/data/storiesClaimsAuditDesignData";
import { IStoryClaimsAuditItem, StoryAuditStatus } from "@/types";
// import {
//   useDeleteStoryClaimMutation,
//   useGetStoriesClaimsAuditQuery,
//   useUpdateStoryClaimStatusMutation,
// } from "@/redux/features/storiesClaimsAudit/storiesClaimsAuditApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

const STATUS_OPTIONS: FilterOption[] = [
  { value: "all", label: "All Gift Stories (7)" },
  { value: "PENDING", label: "Pending Stories" },
  { value: "SHORTLISTED", label: "Shortlisted Stories" },
];

const StoriesClaimsAuditPage = () => {
  const [status, setStatus] = useState("all");
  const [selectedStory, setSelectedStory] =
    useState<IStoryClaimsAuditItem | null>(null);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  // TODO: wire to useGetStoriesClaimsAuditQuery once the endpoint exists.
  // const { data, isFetching } = useGetStoriesClaimsAuditQuery(
  //   {
  //     page: 1,
  //     limit: 10,
  //     status: status === "all" ? undefined : status,
  //   },
  //   { refetchOnMountOrArgChange: true },
  // );
  // const stories = data?.data?.data ?? STORIES_CLAIMS_AUDIT_DESIGN_DATA;
  const stories = STORIES_CLAIMS_AUDIT_DESIGN_DATA;

  // const [updateStoryClaimStatus] = useUpdateStoryClaimStatusMutation();
  const handleStatusChange = async (
    story: IStoryClaimsAuditItem,
    nextStatus: StoryAuditStatus,
  ) => {
    // const res = await tryCatchWrapper(
    //   updateStoryClaimStatus,
    //   { params: { id: story._id }, body: { status: nextStatus } },
    //   { toastLoadingMessage: "Updating story status..." },
    // );
    // if (res?.success) {
    //   setSelectedStory(null);
    // }
    void story;
    void nextStatus;
  };

  // const [deleteStoryClaim] = useDeleteStoryClaimMutation();
  const handleRemove = async (story: IStoryClaimsAuditItem) => {
    // const res = await tryCatchWrapper(
    //   deleteStoryClaim,
    //   { params: { id: story._id } },
    //   { toastLoadingMessage: "Removing story..." },
    // );
    // if (res?.success) {
    //   setIsRemoveOpen(false);
    //   setSelectedStory(null);
    // }
    void story;
    setIsRemoveOpen(false);
    setSelectedStory(null);
  };

  return (
    <PageWraper
      className="w-full py-7 sm:py-7 [&>div:first-child]:mb-0"
      title="Applicant Stories & Needs Pipeline"
      description="Monitor applicant statements, audit AI urgency need analysis, check community votes, and prevent fraudulent claims."
      actions={
        <ReuseFilterSelect
          options={STATUS_OPTIONS}
          value={status}
          onChange={setStatus}
          placeholder="All Gift Stories (7)"
          className="w-full sm:w-[260px]"
          triggerClassName="h-10 w-full rounded-xl border border-border bg-primary-color px-5 text-xs font-semibold text-base-color shadow-none hover:bg-primary-color"
        />
      }
    >
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {stories.map((story) => (
          <StoryAuditCard
            key={story._id}
            story={story}
            onShortlist={(currentStory) =>
              handleStatusChange(currentStory, "SHORTLISTED")
            }
            onReturnToPending={(currentStory) =>
              handleStatusChange(currentStory, "PENDING")
            }
            onRemove={(currentStory) => {
              setSelectedStory(currentStory);
              setIsRemoveOpen(true);
            }}
          />
        ))}
      </div>

      <ConfirmModal<IStoryClaimsAuditItem>
        open={isRemoveOpen}
        onCancel={() => {
          setIsRemoveOpen(false);
          setSelectedStory(null);
        }}
        currentRecord={selectedStory}
        onConfirm={handleRemove}
        title="Remove applicant story"
        description={`Remove ${selectedStory?.applicantName ?? "this applicant"}'s story from the claims audit queue?`}
        confirmText="Remove Story"
        cancelText="Keep Story"
        variant="danger"
        iconPreset="delete"
      />
    </PageWraper>
  );
};

export default StoriesClaimsAuditPage;
