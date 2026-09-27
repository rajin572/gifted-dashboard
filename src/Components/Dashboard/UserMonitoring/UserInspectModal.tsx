import ReuseableModal from "@/Components/ui/CustomUi/ReuseableModal";
import { Button } from "@/Components/ui/button";
import { IUserMonitoringItem } from "@/types";
import { CheckCircle2, ShieldCheck, History, AlertTriangle, ShieldAlert } from "lucide-react";
// import {
//   useGetUserMonitoringDetailQuery,
//   useRevokeVerificationMutation,
// } from "@/redux/features/userMonitoring/userMonitoringApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

interface UserInspectModalProps {
  open: boolean;
  onClose: () => void;
  user: IUserMonitoringItem | null;
  onOpenIssueWarning?: (user: IUserMonitoringItem) => void;
  onOpenSuspendConfirm?: (user: IUserMonitoringItem) => void;
  onRevokeVerification?: (user: IUserMonitoringItem) => void;
}

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

  const badges = currentUser.communityBadges ?? [
    "Super Giver",
    "Verified ID",
    "Community Champion",
    "Fast Responder",
  ];

  const handleRevoke = async () => {
    if (onRevokeVerification) {
      onRevokeVerification(currentUser);
    }
  };

  const handleWarning = () => {
    if (onOpenIssueWarning) {
      onOpenIssueWarning(currentUser);
    }
  };

  const handleSuspend = () => {
    if (onOpenSuspendConfirm) {
      onOpenSuspendConfirm(currentUser);
    }
  };

  return (
    <ReuseableModal
      open={open}
      onOpenChange={(isOpen) => !isOpen && onClose()}
      title={`Supervision Dossier: ${currentUser.name}`}
      description={`Platform identifier: USR-${currentUser._id.slice(-6).toUpperCase()} • Joined ${currentUser.joinedDate || "November 2023"}`}
      maxWidth="sm:max-w-2xl"
    >
      <div className="flex flex-col gap-5 pt-2">
        {/* Top 3 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {/* Card 1 */}
          <div className="bg-gray-50/80 rounded-xl p-3.5 border border-border/70 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              TOTAL GIVEN
            </span>
            <div className="mt-2">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                {currentUser.giftsGiven}
              </span>
              <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                {currentUser.location} Node
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-50/80 rounded-xl p-3.5 border border-border/70 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              COMMUNITY TRUST
            </span>
            <div className="mt-2">
              <span className="text-2xl font-bold text-emerald-600 tracking-tight">
                99.8%
              </span>
              <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium mt-0.5">
                <CheckCircle2 className="size-3" />
                <span>0 Resale Disputes</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-50/80 rounded-xl p-3.5 border border-border/70 flex flex-col justify-between">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              STORY ENGAGEMENT
            </span>
            <div className="mt-2">
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                412
              </span>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Hearts & Thank Yous
              </p>
            </div>
          </div>
        </div>

        {/* Recent Platform Activity */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            RECENT PLATFORM ACTIVITY
          </span>
          <div className="rounded-xl border border-border bg-white p-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-orange-50 text-[#ff4c05] flex items-center justify-center shrink-0">
                <History className="size-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 leading-snug">
                  {currentUser.recentActivity?.split("•")[0]?.trim() || "Vintage Herman Miller Office Chair"}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Completed • Picked up by David Kim • 2 hours ago
                </p>
              </div>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border border-emerald-300 text-emerald-600 bg-emerald-50/70">
              Completed
            </span>
          </div>
        </div>

        {/* Community Badges */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
            COMMUNITY BADGES
          </span>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, idx) => {
              const colorStyles = [
                "bg-orange-50 text-[#ff4c05] border-orange-200",
                "bg-emerald-50 text-emerald-600 border-emerald-200",
                "bg-blue-50 text-blue-600 border-blue-200",
                "bg-purple-50 text-purple-600 border-purple-200",
              ];
              const style = colorStyles[idx % colorStyles.length];
              return (
                <span
                  key={badge}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border ${style}`}
                >
                  {badge}
                </span>
              );
            })}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRevoke}
              className="text-xs h-8 text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              <ShieldCheck className="size-3.5 mr-1 text-gray-500" />
              Revoke Verification
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleWarning}
              className="text-xs h-8 text-amber-700 border-amber-300 bg-amber-50/50 hover:bg-amber-100/50"
            >
              <AlertTriangle className="size-3.5 mr-1 text-amber-600" />
              Issue Warning
            </Button>
          </div>

          <div className="w-full sm:w-auto flex justify-end">
            <Button
              type="button"
              size="sm"
              onClick={handleSuspend}
              className="text-xs h-8 bg-rose-600 hover:bg-rose-700 text-white font-medium shadow-xs"
            >
              <ShieldAlert className="size-3.5 mr-1" />
              Suspend Account
            </Button>
          </div>
        </div>
      </div>
    </ReuseableModal>
  );
};

export default UserInspectModal;
