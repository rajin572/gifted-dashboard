import { useState } from "react";
import { CheckCircle2, MapPin, History, ShieldAlert, ShieldCheck, Ban, Trash2 } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import SpinLoader from "@/Components/ui/CustomUi/SpinLoader";
import { Button } from "@/Components/ui/button";
import UserInspectModal from "@/Components/Dashboard/UserMonitoring/UserInspectModal";
import IssueWarningModal from "@/Components/Dashboard/UserMonitoring/IssueWarningModal";
import { IUserSupervisionItem } from "@/types";
import {
  useGetUserSupervisionListQuery,
  useToggleBlockUserMutation,
  useDeleteUserMutation,
  useSuspendUserMutation,
  useRevokeVerificationMutation,
} from "@/redux/features/userMonitoring/userMonitoringApi";
import tryCatchWrapper from "@/utils/tryCatchWrapper";
import { getImageUrl } from "@/helpers/config/envConfig";
import {
  getAccountStatus,
  getInitials,
  getVerificationStatus,
  isVerifiedMember,
} from "@/utils/userMonitoring";

const ROLE_OPTIONS: FilterOption[] = [
  { label: "Members", value: "user" },
  { label: "Admins", value: "admin" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Statuses", value: "all" },
  { label: "Active", value: "ACTIVE" },
  { label: "Under Review", value: "UNDER REVIEW" },
  { label: "Suspended", value: "SUSPENDED" },
];

const UserManagementPage = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("user");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [selectedUser, setSelectedUser] = useState<IUserSupervisionItem | null>(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isSuspendConfirmOpen, setIsSuspendConfirmOpen] = useState(false);
  const [isBlockConfirmOpen, setIsBlockConfirmOpen] = useState(false);
  const [isRevokeConfirmOpen, setIsRevokeConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const { data, isFetching } = useGetUserSupervisionListQuery(
    {
      page: currentPage,
      limit,
      searchTerm: search.length > 0 ? search : undefined,
      role: roleFilter,
      status: statusFilter === "all" ? undefined : statusFilter,
    },
    { refetchOnMountOrArgChange: true }
  );

  const total = data?.data?.meta?.total ?? 0;

  const users = data?.data?.data ?? [];

  const [suspendUser] = useSuspendUserMutation();
  const handleConfirmSuspend = async () => {
    if (!selectedUser) return;
    const res = await tryCatchWrapper(
      suspendUser,
      { params: { id: selectedUser._id }, body: { reason: "Admin supervision suspension" } },
      { toastLoadingMessage: "Suspending account..." }
    );
    if (res?.success) {
      setIsSuspendConfirmOpen(false);
      setIsInspectOpen(false);
    }
  };

  const [toggleBlockUser] = useToggleBlockUserMutation();
  const handleConfirmToggleBlock = async () => {
    if (!selectedUser) return;
    const res = await tryCatchWrapper(
      toggleBlockUser,
      { params: { id: selectedUser._id } },
      { toastLoadingMessage: selectedUser.isBlocked ? "Unblocking member..." : "Blocking member..." }
    );
    if (res?.success) {
      setIsBlockConfirmOpen(false);
      setIsInspectOpen(false);
    }
  };

  const [deleteUser] = useDeleteUserMutation();
  const handleConfirmDelete = async () => {
    if (!selectedUser) return;
    const res = await tryCatchWrapper(
      deleteUser,
      { params: { id: selectedUser._id } },
      { toastLoadingMessage: "Deleting member..." }
    );
    if (res?.success) {
      setIsDeleteConfirmOpen(false);
      setIsInspectOpen(false);
    }
  };

  const [revokeVerification] = useRevokeVerificationMutation();
  const handleConfirmRevoke = async () => {
    if (!selectedUser) return;
    const res = await tryCatchWrapper(
      revokeVerification,
      { params: { id: selectedUser._id } },
      { toastLoadingMessage: "Revoking verification..." }
    );
    if (res?.success) {
      setIsRevokeConfirmOpen(false);
    }
  };

  const columns: Column<IUserSupervisionItem>[] = [
    {
      header: "MEMBER PROFILE",
      accessorKey: "fullName",
      render: (_, row) => {
        const avatarUrl = row.profileImage
          ? row.profileImage.startsWith("http")
            ? row.profileImage
            : `${getImageUrl()}${row.profileImage}`
          : undefined;

        return (
          <div className="flex items-center gap-3">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={row.fullName}
                className="size-9 rounded-full object-cover border border-border bg-gray-50 shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="size-9 rounded-full border border-border bg-gray-50 text-xs font-bold text-gray-700 flex items-center justify-center shrink-0">
                {getInitials(row.fullName)}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-semibold text-gray-900 text-sm">
                <span className="truncate">{row.fullName}</span>
                {isVerifiedMember(row) && (
                  <CheckCircle2 className="size-5 text-primary-color fill-[#FF5C5C] shrink-0" />
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">{row.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      header: "ROLE & LOCATION",
      accessorKey: "communityRole",
      render: (_, row) => (
        <div>
          <span className="text-xs font-semibold text-gray-800">{row.communityRole}</span>
          {row.neighborhoodLabel && (
            <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
              <MapPin className="size-3 text-[#FF5C5C] shrink-0" />
              <span>{row.neighborhoodLabel}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      header: "GIVE / RECEIVE",
      accessorKey: "giftGiven",
      render: (_, row) => (
        <div className="text-xs">
          <span className="font-bold text-gray-900">{row.giftGiven} given</span>
          <span className="text-gray-400 font-normal"> • {row.giftReceived} recv</span>
        </div>
      ),
    },
    {
      header: "VERIFICATION",
      accessorKey: "communityRole",
      render: (_, row) => {
        const verification = getVerificationStatus(row);
        const isVerified = verification === "VERIFIED ID";
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isVerified
                ? "border-emerald-300 text-emerald-600 bg-emerald-50/70"
                : "border-gray-200 text-gray-500 bg-gray-50"
            }`}
          >
            {verification}
          </span>
        );
      },
    },
    {
      header: "ACCOUNT STATUS",
      accessorKey: "accountStatus",
      render: (_, row) => {
        const status = getAccountStatus(row);
        const isReview = status === "UNDER REVIEW";
        const isSuspended = status === "SUSPENDED" || status === "BANNED";
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isReview
                ? "border-amber-300 text-amber-600 bg-amber-50/70"
                : isSuspended
                  ? "border-rose-300 text-rose-600 bg-rose-50/70"
                  : "border-emerald-300 text-emerald-600 bg-emerald-50/70"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "SUPERVISION ACTIONS",
      accessorKey: "_id",
      render: (_, row) => (
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedUser(row);
              setIsInspectOpen(true);
            }}
            className="h-7 px-3 text-xs font-medium border-[#FED7AA] text-[#FF5C5C] bg-[#FFF7ED] hover:bg-gray-50 rounded-lg shadow-2xs"
          >
            Inspect
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedUser(row);
              setIsInspectOpen(true);
            }}
            title="Activity History"
            className="size-7 p-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <History className="size-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedUser(row);
              setIsBlockConfirmOpen(true);
            }}
            title={row.isBlocked ? "Unblock Member" : "Block Member"}
            className={`size-7 p-0 rounded-lg ${
              row.isBlocked
                ? "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                : "text-gray-400 hover:text-rose-600 hover:bg-rose-50"
            }`}
          >
            {row.isBlocked ? <ShieldCheck className="size-3.5" /> : <Ban className="size-3.5" />}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedUser(row);
              setIsSuspendConfirmOpen(true);
            }}
            title="Suspend Member"
            className="size-7 p-0 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
          >
            <ShieldAlert className="size-3.5" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedUser(row);
              setIsDeleteConfirmOpen(true);
            }}
            title="Delete Member"
            className="size-7 p-0 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
          >
            <Trash2 className="size-3.5" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageWraper
      title={
        <div className="flex items-center gap-2.5">
          <span>Community Member & User Supervision</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border border-border text-gray-500 bg-gray-50">
            {total} Supervised Members
          </span>
        </div>
      }
      description="Live peer directory, reputation scores, zero-resale compliance monitoring."
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-border shadow-2xs">
          <ReuseSearchInput
            placeholder="Search members by name, email, or neighborhood..."
            setSearch={setSearch}
            setPage={setCurrentPage}
            className="w-full sm:w-96"
          />

          <div className="flex items-center gap-2.5">
            <ReuseFilterSelect
              options={ROLE_OPTIONS}
              value={roleFilter}
              onChange={(value) => {
                setRoleFilter(value);
                setCurrentPage(1);
              }}
              placeholder="Members"
            />
            <ReuseFilterSelect
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={(value) => {
                setStatusFilter(value);
                setCurrentPage(1);
              }}
              placeholder="All Statuses"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-border shadow-2xs overflow-hidden">
          {isFetching ? (
            <div className="py-20 flex justify-center">
              <SpinLoader />
            </div>
          ) : (
            <ReusableTable
              data={users}
              columns={columns}
              pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              limit={limit}
              total={total}
            />
          )}
        </div>
      </div>

      <UserInspectModal
        open={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
        user={selectedUser}
        onOpenIssueWarning={(user) => {
          setSelectedUser(user);
          setIsWarningOpen(true);
        }}
        onRevokeVerification={(user) => {
          setSelectedUser(user);
          setIsRevokeConfirmOpen(true);
        }}
      />

      <IssueWarningModal
        open={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
        user={selectedUser}
      />

      <ConfirmModal<IUserSupervisionItem>
        open={isSuspendConfirmOpen}
        onCancel={() => setIsSuspendConfirmOpen(false)}
        currentRecord={selectedUser}
        onConfirm={handleConfirmSuspend}
        title="Suspend Member Account"
        description={`Are you sure you want to suspend ${selectedUser?.fullName ?? "this member"}? They will be unable to list items or post recipient stories.`}
        confirmText="Suspend Account"
        cancelText="Cancel"
        variant="danger"
        iconPreset="delete"
      />

      <ConfirmModal<IUserSupervisionItem>
        open={isBlockConfirmOpen}
        onCancel={() => setIsBlockConfirmOpen(false)}
        currentRecord={selectedUser}
        onConfirm={handleConfirmToggleBlock}
        title={selectedUser?.isBlocked ? "Unblock Member Account" : "Block Member Account"}
        description={`Are you sure you want to ${selectedUser?.isBlocked ? "unblock" : "block"} ${selectedUser?.fullName ?? "this member"}?`}
        confirmText={selectedUser?.isBlocked ? "Unblock Account" : "Block Account"}
        cancelText="Cancel"
        variant={selectedUser?.isBlocked ? "success" : "danger"}
        iconPreset={selectedUser?.isBlocked ? "unblock" : "block"}
      />

      <ConfirmModal<IUserSupervisionItem>
        open={isDeleteConfirmOpen}
        onCancel={() => setIsDeleteConfirmOpen(false)}
        currentRecord={selectedUser}
        onConfirm={handleConfirmDelete}
        title="Delete Member Account"
        description={`Are you sure you want to delete ${selectedUser?.fullName ?? "this member"}? This action cannot be undone.`}
        confirmText="Delete Account"
        cancelText="Cancel"
        variant="danger"
        iconPreset="delete"
      />

      <ConfirmModal<IUserSupervisionItem>
        open={isRevokeConfirmOpen}
        onCancel={() => setIsRevokeConfirmOpen(false)}
        currentRecord={selectedUser}
        onConfirm={handleConfirmRevoke}
        title="Revoke Verified ID Status"
        description={`Are you sure you want to revoke verified donor identity for ${selectedUser?.fullName ?? "this member"}?`}
        confirmText="Revoke Verification"
        cancelText="Cancel"
        variant="danger"
      />
    </PageWraper>
  );
};

export default UserManagementPage;
