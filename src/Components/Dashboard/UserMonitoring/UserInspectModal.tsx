import {
  AlertTriangle,
  CircleCheck,
  UserRoundX,
  X,
} from "lucide-react";
import { Button } from "@/Components/ui/button";
import ReuseableModal from "@/Components/ui/CustomUi/ReuseableModal";
import Tag from "@/Components/ui/CustomUi/ReuseTag";
import SpinLoader from "@/Components/ui/CustomUi/SpinLoader";
import { IUserSupervisionItem } from "@/types";
import { useGetUserInspectionQuery } from "@/redux/features/userMonitoring/userMonitoringApi";
import { formatDate } from "@/utils/dateFormet";
import { getImageUrl } from "@/helpers/config/envConfig";
import { getAccountStatus, getInitials, isVerifiedMember } from "@/utils/userMonitoring";

interface UserInspectModalProps {
  open: boolean;
  onClose: () => void;
  user: IUserSupervisionItem | null;
  onOpenIssueWarning?: (user: IUserSupervisionItem) => void;
  onRevokeVerification?: (user: IUserSupervisionItem) => void;
}

const accountStatusLabels: Record<string, string> = {
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
  onRevokeVerification,
}: UserInspectModalProps) => {
  const { data, isFetching } = useGetUserInspectionQuery(user?._id ?? "", {
    skip: !open || !user?._id,
    refetchOnMountOrArgChange: true,
  });

  if (!user) return null;

  const inspectUser = data?.data?.user;

  const userName = inspectUser?.fullName ?? user.fullName;
  const userEmail = inspectUser?.email ?? user.email;
  const rawAvatar = inspectUser?.profileImage ?? user.profileImage;
  const userAvatar = rawAvatar
    ? rawAvatar.startsWith("http")
      ? rawAvatar
      : `${getImageUrl()}${rawAvatar}`
    : undefined;

  const giftsGiven = inspectUser?.giftGiven ?? user.giftGiven;
  const giftsReceived = inspectUser?.giftReceived ?? user.giftReceived;
  const joinedDate = formatDate(inspectUser?.createdAt ?? user.createdAt);

  const accountStatus = getAccountStatus({
    accountStatus: user.accountStatus,
    isBlocked: inspectUser?.isBlocked ?? user.isBlocked,
    isSuspended: inspectUser?.isSuspended ?? user.isSuspended,
  });

  const badges = [user.communityRole, ...(user.isBlocked ? ["Blocked"] : [])];
  const recentGifts = data?.data?.recentGifts ?? [];
  const auditLogs = (data?.data?.auditLogs ?? []).slice(0, 5);

  return (
    <ReuseableModal
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      title=""
      accessibleTitle={`${userName} user details`}
      maxWidth="sm:max-w-[720px]"
      showXCloseButton={false}
      dialogClassName="gap-0 overflow-hidden rounded-2xl border border-border bg-primary-color p-0 shadow-2xl"
      contentClassName="max-h-[90vh] overflow-y-auto p-0 sm:p-0"
    >
      {isFetching ? (
        <div className="py-24 flex justify-center items-center">
          <SpinLoader />
        </div>
      ) : (
        <>
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
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                  className="size-14 shrink-0 rounded-full border-2 border-primary-color object-cover shadow-md"
                />
              ) : (
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-primary-color bg-background-color text-base font-bold text-base-color shadow-md">
                  {getInitials(userName)}
                </div>
              )}
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="truncate text-lg font-bold leading-tight text-base-color">
                    {userName}
                  </h2>
                  {isVerifiedMember(user) && (
                    <CircleCheck className="size-4 shrink-0 fill-coral-accent text-primary-color" />
                  )}
                </div>
                <p className="mt-1 truncate text-xs text-base-color/40">
                  {userEmail} <span aria-hidden="true">•</span> Joined {joinedDate}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="flex min-h-[72px] flex-col items-center justify-center rounded-xl border border-[#E0E0E0] bg-primary-color px-3 text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-base-color/35">
                  Account Status
                </p>
                <p className="mt-1 text-[22px] font-bold leading-none text-coral-accent">
                  {accountStatusLabels[accountStatus] ?? accountStatus}
                </p>
              </div>
              <div className="flex min-h-[72px] flex-col items-center justify-center rounded-xl border border-[#E0E0E0] bg-primary-color px-3 text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-base-color/35">
                  Gifts Given
                </p>
                <p className="mt-1 text-[22px] font-bold leading-none text-base-color">
                  {giftsGiven}
                </p>
              </div>
              <div className="flex min-h-[72px] flex-col items-center justify-center rounded-xl border border-[#E0E0E0] bg-primary-color px-3 text-center">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-base-color/35">
                  Gifts Received
                </p>
                <p className="mt-1 text-[22px] font-bold leading-none text-base-color">
                  {giftsReceived}
                </p>
              </div>
            </div>

            <div className="mt-5 h-[72px] rounded-xl border border-border bg-primary-color px-4 py-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-base-color/35">
                Recent Community Activity
              </p>
              <p className="mt-2 truncate text-sm font-medium text-base-color/80">
                {`${user.formattedGiveReceive} • Trust Score: ${user.communityTrustScore}`}
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

            {recentGifts.length > 0 && (
              <div className="mt-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-base-color/35">
                  Recent Gifts
                </p>
                <div className="mt-2.5 flex flex-col gap-2">
                  {recentGifts.map((gift) => {
                    const cover = gift.images?.[gift.coverImageIndex] ?? gift.images?.[0];
                    return (
                      <div
                        key={gift._id}
                        className="flex items-center gap-3 rounded-xl border border-border bg-primary-color p-2"
                      >
                        {cover ? (
                          <img
                            src={cover.startsWith("http") ? cover : `${getImageUrl()}${cover}`}
                            alt={gift.title}
                            className="size-10 shrink-0 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="size-10 shrink-0 rounded-lg bg-background-color" />
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-base-color">{gift.title}</p>
                          <p className="truncate text-[11px] capitalize text-base-color/40">
                            {gift.category} • {formatDate(gift.createdAt)}
                          </p>
                        </div>
                        <Tag theme={gift.claimState === "available" ? "success" : "blue"} className="capitalize">
                          {gift.claimState}
                        </Tag>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {auditLogs.length > 0 && (
              <div className="mt-4">
                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-base-color/35">
                  Audit Log
                </p>
                <div className="mt-2.5 flex flex-col gap-2">
                  {auditLogs.map((log) => (
                    <div
                      key={log._id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-primary-color px-3 py-2"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold text-base-color">
                          {log.action.replace(/_/g, " ")}
                        </p>
                        <p className="truncate text-[11px] text-base-color/40">
                          {[log.metadata?.reason, `by ${log.performedBy?.fullName ?? log.performedByRole}`]
                            .filter(Boolean)
                            .join(" • ")}
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] text-base-color/40">
                        {formatDate(log.createdAt)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 border-t border-border bg-background-color px-6 py-4 sm:grid-cols-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onRevokeVerification?.(user)}
              className="h-9 rounded-lg border-base-color/20 bg-primary-color px-3 text-xs font-semibold text-base-color/65 shadow-none hover:bg-background-color"
            >
              <UserRoundX className="size-3.5 text-coral-accent" />
              Revoke Verification
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenIssueWarning?.(user)}
              className="h-9 rounded-lg border-warning-border bg-warning-surface px-3 text-xs font-semibold text-warning-foreground shadow-none hover:bg-warning-surface hover:text-warning-foreground"
            >
              <AlertTriangle className="size-3.5" />
              Issue Warning
            </Button>
          </div>
          <div className="h-4 bg-primary-color" />
        </>
      )}
    </ReuseableModal>
  );
};

export default UserInspectModal;
