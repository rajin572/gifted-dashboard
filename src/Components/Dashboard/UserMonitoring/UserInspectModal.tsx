import {
  AlertTriangle,
  CircleCheck,
  CircleMinus,
  UserRoundX,
  X,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import ReuseableModal from "@/Components/ui/CustomUi/ReuseableModal";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import { IUserMonitoringItem } from "@/types";
// import { useGetUserMonitoringDetailQuery } from "@/redux/features/userMonitoring/userMonitoringApi";

interface UserInspectModalProps {
  open: boolean;
  onClose: () => void;
  user: IUserMonitoringItem | null;
  onOpenIssueWarning?: (user: IUserMonitoringItem) => void;
  onOpenSuspendConfirm?: (user: IUserMonitoringItem) => void;
  onRevokeVerification?: (user: IUserMonitoringItem) => void;
}

const accountStatusLabels: Record<IUserMonitoringItem["accountStatus"], string> = {
  ACTIVE: "Active",
  "UNDER REVIEW": "Under Review",
  SUSPENDED: "Suspended",
  BANNED: "Banned",
};

const UserInspectModal = ({
  open,
  onClose,
  user,
  onOpenIssueWarning,
  onOpenSuspendConfirm,
  onRevokeVerification,
}: UserInspectModalProps) => {
  // TODO: wire to useGetUserMonitoringDetailQuery once the endpoint exists.
  // const { data, isFetching } = useGetUserMonitoringDetailQuery(user?._id ?? "", {
  //   skip: !open || !user?._id,
  //   refetchOnMountOrArgChange: true,
  // });
  // const currentUser = data?.data ?? user;
  const currentUser = user;

  if (!currentUser) return null;

  const badges = currentUser.communityBadges ?? [];

  return (
    <ReuseableModal
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      title=""
      accessibleTitle={`${currentUser.name} user details`}
      maxWidth="sm:max-w-[720px]"
      showXCloseButton={false}
      dialogClassName="gap-0 overflow-hidden rounded-2xl border border-border bg-primary-color p-0 shadow-2xl"
      contentClassName="max-h-[90vh] overflow-y-auto p-0 sm:p-0"
    >
      <div className="relative px-6 pb-5 pt-6">
        <Button
          type="button"
          variant="outline"
          size="icon-sm"
          onClick={onClose}
          aria-label="Close user details"
          className="absolute right-6 top-9 size-8 rounded-full border-border bg-primary-color text-base-color/35 shadow-none hover:bg-background-color hover:text-base-color focus-visible:border-border focus-visible:ring-1 focus-visible:ring-base-color/10 focus-visible:ring-offset-0"
        >
          <X className="size-4" />
        </Button>

        <div className="flex min-w-0 items-center gap-4 pr-12">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            onError={(event) => {
              event.currentTarget.src = "/images/dummyProfile.jpg";
            }}
            className="size-14 shrink-0 rounded-full border-2 border-primary-color object-cover shadow-md"
          />
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-lg font-bold leading-tight text-base-color">
                {currentUser.name}
              </h2>
              {currentUser.isVerifiedDonor && (
                <CircleCheck className="size-4 shrink-0 fill-coral-accent text-primary-color" />
              )}
            </div>
            <p className="mt-1 truncate text-xs text-base-color/40">
              {currentUser.email} <span aria-hidden="true">•</span> Joined{" "}
              {currentUser.joinedDate ?? "Jan 2024"}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="flex min-h-[72px] flex-col items-center justify-center rounded-xl border border-[#E0E0E0] bg-primary-color px-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-base-color/35">
              Account Status
            </p>
            <p className="mt-1 text-[22px] font-bold leading-none text-coral-accent">
              {accountStatusLabels[currentUser.accountStatus]}
            </p>
          </div>
          <div className="flex min-h-[72px] flex-col items-center justify-center rounded-xl border border-[#E0E0E0] bg-primary-color px-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-base-color/35">
              Gifts Given
            </p>
            <p className="mt-1 text-[22px] font-bold leading-none text-base-color">
              {currentUser.giftsGiven}
            </p>
          </div>
          <div className="flex min-h-[72px] flex-col items-center justify-center rounded-xl border border-[#E0E0E0] bg-primary-color px-3 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-base-color/35">
              Gifts Received
            </p>
            <p className="mt-1 text-[22px] font-bold leading-none text-base-color">
              {currentUser.giftsReceived}
            </p>
          </div>
        </div>

        <div className="mt-5 h-[72px] rounded-xl border border-border bg-primary-color px-4 py-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-base-color/35">
            Recent Community Activity
          </p>
          <p className="mt-2 truncate text-sm font-medium text-base-color/80">
            {currentUser.recentActivity ?? "No recent community activity."}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-base-color/35">
            Community Badges
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {badges.length > 0 ? (
              badges.map((badge) => (
                <Tag
                  key={badge}
                  className="rounded-lg border border-[#E0E0E0] bg-[#F9F9F9] px-3 py-2 text-[11px] font-semibold leading-none text-[#444444]"
                >
                  {badge}
                </Tag>
              ))
            ) : (
              <span className="text-xs text-base-color/40">No community badges.</span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 border-t border-border bg-background-color px-6 py-4 sm:grid-cols-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => onRevokeVerification?.(currentUser)}
          className="h-9 rounded-lg border-base-color/20 bg-primary-color px-3 text-xs font-semibold text-base-color/65 shadow-none hover:bg-background-color"
        >
          <UserRoundX className="size-3.5 text-coral-accent" />
          Revoke Verification
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenIssueWarning?.(currentUser)}
          className="h-9 rounded-lg border-warning-border bg-warning-surface px-3 text-xs font-semibold text-warning-foreground shadow-none hover:bg-warning-surface hover:text-warning-foreground"
        >
          <AlertTriangle className="size-3.5" />
          Issue Warning
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenSuspendConfirm?.(currentUser)}
          className="h-9 rounded-lg border-danger-border bg-danger-surface px-3 text-xs font-semibold text-danger-foreground shadow-none hover:bg-danger-surface hover:text-danger-foreground"
        >
          <CircleMinus className="size-3.5" />
          Suspend Account
        </Button>
      </div>
      <div className="h-4 bg-primary-color" />
    </ReuseableModal>
  );
};

export default UserInspectModal;
