import { useState } from "react";
import { CheckCircle2, MapPin, History, ShieldAlert } from "lucide-react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import ReuseSearchInput from "@/Components/ui/CustomUi/ReuseForm/ReuseSearchInput";
import ReuseFilterSelect, { FilterOption } from "@/Components/ui/CustomUi/ReuseForm/ReuseFilterSelect";
import ReusableTable, { Column } from "@/Components/ui/CustomUi/ReuseableTable";
import ConfirmModal from "@/Components/ui/CustomUi/Modal/ConfirmModal";
import { Button } from "@/Components/ui/button";
import UserInspectModal from "@/Components/Dashboard/UserMonitoring/UserInspectModal";
import IssueWarningModal from "@/Components/Dashboard/UserMonitoring/IssueWarningModal";
import { IUserMonitoringItem } from "@/types";
// import {
//   useGetUserMonitoringListQuery,
//   useSuspendUserMutation,
//   useRevokeVerificationMutation,
// } from "@/redux/features/userMonitoring/userMonitoringApi";
// import tryCatchWrapper from "@/utils/tryCatchWrapper";

// TODO: wire to useGetUserMonitoringListQuery once the endpoint exists.
const DUMMY_USER_MONITORING_LIST: IUserMonitoringItem[] = [
  {
    _id: "usr-849201",
    name: "Sarah Jenkins",
    email: "sarah.jenkins.atx@gmail.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    isVerifiedDonor: true,
    role: "Community Leader",
    location: "South Congress",
    giftsGiven: 19,
    giftsReceived: 1,
    verificationStatus: "VERIFIED ID",
    accountStatus: "ACTIVE",
    joinedDate: "Jan 2024",
    recentActivity: 'Posted MacBook Air 13" for student giveaway (2 hrs ago)',
    communityBadges: ["Super Giver", "Verified ID", "Community Champion", "Fast Responder"],
  },
  {
    _id: "usr-849202",
    name: "Marcus Chen",
    email: "marcus.c@techcorp.io",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    isVerifiedDonor: true,
    role: "Verified Donor",
    location: "East Austin",
    giftsGiven: 19,
    giftsReceived: 1,
    verificationStatus: "VERIFIED ID",
    accountStatus: "ACTIVE",
    joinedDate: "January 2024",
    recentActivity: "Organic Baby Clothes Bundle (0-6m) • Claimed • 5 hours ago",
    communityBadges: ["Verified ID", "Fast Responder", "Generous Heart"],
  },
  {
    _id: "usr-849203",
    name: "Elena Rostova",
    email: "elena.rostova@gmail.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    isVerifiedDonor: true,
    role: "Community Leader",
    location: "Hyde Park",
    giftsGiven: 62,
    giftsReceived: 0,
    verificationStatus: "VERIFIED ID",
    accountStatus: "ACTIVE",
    joinedDate: "September 2023",
    recentActivity: "Stand Mixer & Baking Accessories • Available • 1 day ago",
    communityBadges: ["Super Giver", "Verified ID", "Top Donor 2024", "Community Champion"],
  },
  {
    _id: "usr-849204",
    name: "David Kim",
    email: "david.kim92@outlook.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    isVerifiedDonor: false,
    role: "Member",
    location: "Downtown",
    giftsGiven: 2,
    giftsReceived: 11,
    verificationStatus: "UNVERIFIED",
    accountStatus: "UNDER REVIEW",
    joinedDate: "March 2024",
    recentActivity: "Sonos One Gen 2 Smart Speaker • Applied for gift • 3 hours ago",
    communityBadges: ["Active Applicant"],
  },
  {
    _id: "usr-849205",
    name: "Jessica Taylor",
    email: "jess.taylor@design.co",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    isVerifiedDonor: true,
    role: "Verified Donor",
    location: "Mueller",
    giftsGiven: 31,
    giftsReceived: 4,
    verificationStatus: "VERIFIED ID",
    accountStatus: "ACTIVE",
    joinedDate: "December 2023",
    recentActivity: "Cuisinart Espresso Machine • Completed pickup • 2 days ago",
    communityBadges: ["Verified ID", "Super Giver", "Community Champion"],
  },
  {
    _id: "usr-849206",
    name: "Chloe Bennett",
    email: "chloe.b@student.utexas.edu",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80",
    isVerifiedDonor: false,
    role: "Member",
    location: "Zilker",
    giftsGiven: 0,
    giftsReceived: 0,
    verificationStatus: "UNVERIFIED",
    accountStatus: "ACTIVE",
    joinedDate: "May 2024",
    recentActivity: "Joined Austin Zilker Community Node • 1 week ago",
    communityBadges: ["New Neighbor"],
  },
];

const ROLE_OPTIONS: FilterOption[] = [
  { label: "All Roles", value: "all" },
  { label: "Community Leader", value: "Community Leader" },
  { label: "Verified Donor", value: "Verified Donor" },
  { label: "Member", value: "Member" },
  { label: "New Applicant", value: "New Applicant" },
];

const STATUS_OPTIONS: FilterOption[] = [
  { label: "All Statuses", value: "all" },
  { label: "Active", value: "ACTIVE" },
  { label: "Under Review", value: "UNDER REVIEW" },
  { label: "Suspended", value: "SUSPENDED" },
];

const UserManagementPage = () => {
  const [, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const [selectedUser, setSelectedUser] = useState<IUserMonitoringItem | null>(null);
  const [isInspectOpen, setIsInspectOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isSuspendConfirmOpen, setIsSuspendConfirmOpen] = useState(false);
  const [isRevokeConfirmOpen, setIsRevokeConfirmOpen] = useState(false);

  // const { data, isFetching } = useGetUserMonitoringListQuery(
  //   {
  //     page: currentPage,
  //     limit,
  //     searchParams: search.length > 0 ? search : undefined,
  //     role: roleFilter === "all" ? undefined : roleFilter,
  //     status: statusFilter === "all" ? undefined : statusFilter,
  //   },
  //   { refetchOnMountOrArgChange: true }
  // );
  // const users = data?.data?.data ?? DUMMY_USER_MONITORING_LIST;
  // const total = data?.data?.meta?.total ?? DUMMY_USER_MONITORING_LIST.length;
  const users = DUMMY_USER_MONITORING_LIST;
  const total = DUMMY_USER_MONITORING_LIST.length;

  // const [suspendUser] = useSuspendUserMutation();
  const handleConfirmSuspend = async () => {
    // if (!selectedUser) return;
    // const res = await tryCatchWrapper(
    //   suspendUser,
    //   { params: { id: selectedUser._id }, body: { reason: "Admin suspension" } },
    //   { toastLoadingMessage: "Suspending account..." }
    // );
    // if (res?.success) {
    //   setIsSuspendConfirmOpen(false);
    //   setIsInspectOpen(false);
    // }
    setIsSuspendConfirmOpen(false);
    setIsInspectOpen(false);
  };

  // const [revokeVerification] = useRevokeVerificationMutation();
  const handleConfirmRevoke = async () => {
    // if (!selectedUser) return;
    // const res = await tryCatchWrapper(
    //   revokeVerification,
    //   { params: { id: selectedUser._id } },
    //   { toastLoadingMessage: "Revoking verification..." }
    // );
    // if (res?.success) {
    //   setIsRevokeConfirmOpen(false);
    // }
    setIsRevokeConfirmOpen(false);
  };

  const columns: Column<IUserMonitoringItem>[] = [
    {
      header: "MEMBER PROFILE",
      accessorKey: "name",
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <img
            src={row.avatar}
            alt={row.name}
            className="size-9 rounded-full object-cover border border-border bg-gray-50 shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/dummyProfile.jpg";
            }}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-semibold text-gray-900 text-sm">
              <span className="truncate">{row.name}</span>
              {row.isVerifiedDonor && (
                <CheckCircle2 className="size-5 text-primary-color fill-[#FF5C5C] shrink-0" />
              )}
            </div>
            <p className="text-xs text-gray-500 truncate">{row.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "ROLE & LOCATION",
      accessorKey: "role",
      render: (_, row) => (
        <div>
          <span className="text-xs font-semibold text-gray-800">{row.role}</span>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
            <MapPin className="size-3 text-[#FF5C5C] shrink-0" />
            <span>{row.location}</span>
          </div>
        </div>
      ),
    },
    {
      header: "GIVE / RECEIVE",
      accessorKey: "giftsGiven",
      render: (_, row) => (
        <div className="text-xs">
          <span className="font-bold text-gray-900">{row.giftsGiven} given</span>
          <span className="text-gray-400 font-normal"> • {row.giftsReceived} recv</span>
        </div>
      ),
    },
    {
      header: "VERIFICATION",
      accessorKey: "verificationStatus",
      render: (_, row) => {
        const isVerified = row.verificationStatus === "VERIFIED ID";
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${isVerified
              ? "border-emerald-300 text-emerald-600 bg-emerald-50/70"
              : "border-gray-200 text-gray-500 bg-gray-50"
              }`}
          >
            {row.verificationStatus}
          </span>
        );
      },
    },
    {
      header: "ACCOUNT STATUS",
      accessorKey: "accountStatus",
      render: (_, row) => {
        const isReview = row.accountStatus === "UNDER REVIEW";
        const isSuspended = row.accountStatus === "SUSPENDED";
        return (
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${isReview
              ? "border-amber-300 text-amber-600 bg-amber-50/70"
              : isSuspended
                ? "border-rose-300 text-rose-600 bg-rose-50/70"
                : "border-emerald-300 text-emerald-600 bg-emerald-50/70"
              }`}
          >
            {row.accountStatus}
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
              setIsSuspendConfirmOpen(true);
            }}
            title="Suspend Member"
            className="size-7 p-0 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg"
          >
            <ShieldAlert className="size-3.5" />
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
        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-border shadow-2xs">
          <ReuseSearchInput
            placeholder="Search members by name, email, or Austin neighborhood..."
            setSearch={setSearch}
            setPage={setCurrentPage}
            className="w-full sm:w-96"
          />

          <div className="flex items-center gap-2.5">
            <ReuseFilterSelect
              options={ROLE_OPTIONS}
              value={roleFilter}
              onChange={setRoleFilter}
              placeholder="All Roles"
            />
            <ReuseFilterSelect
              options={STATUS_OPTIONS}
              value={statusFilter}
              onChange={setStatusFilter}
              placeholder="All Statuses"
            />
          </div>
        </div>

        {/* Supervision Members Table */}
        <div className="bg-white rounded-xl border border-border shadow-2xs overflow-hidden">
          <ReusableTable
            data={users}
            columns={columns}
            pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limit={limit}
            total={total}
          />
        </div>
      </div>

      {/* Inspect Dossier Modal */}
      <UserInspectModal
        open={isInspectOpen}
        onClose={() => setIsInspectOpen(false)}
        user={selectedUser}
        onOpenIssueWarning={(user) => {
          setSelectedUser(user);
          setIsWarningOpen(true);
        }}
        onOpenSuspendConfirm={(user) => {
          setSelectedUser(user);
          setIsSuspendConfirmOpen(true);
        }}
        onRevokeVerification={(user) => {
          setSelectedUser(user);
          setIsRevokeConfirmOpen(true);
        }}
      />

      {/* Issue Warning Modal */}
      <IssueWarningModal
        open={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
        user={selectedUser}
      />

      {/* Suspend Confirmation Modal */}
      <ConfirmModal<IUserMonitoringItem>
        open={isSuspendConfirmOpen}
        onCancel={() => setIsSuspendConfirmOpen(false)}
        currentRecord={selectedUser}
        onConfirm={handleConfirmSuspend}
        title="Suspend Member Account"
        description={`Are you sure you want to suspend ${selectedUser?.name ?? "this member"}? They will be unable to list items or post recipient stories.`}
        confirmText="Suspend Account"
        cancelText="Cancel"
        variant="danger"
        iconPreset="delete"
      />

      {/* Revoke Verification Confirmation Modal */}
      <ConfirmModal<IUserMonitoringItem>
        open={isRevokeConfirmOpen}
        onCancel={() => setIsRevokeConfirmOpen(false)}
        currentRecord={selectedUser}
        onConfirm={handleConfirmRevoke}
        title="Revoke Verified ID Status"
        description={`Are you sure you want to revoke verified donor identity for ${selectedUser?.name ?? "this member"}?`}
        confirmText="Revoke Verification"
        cancelText="Cancel"
        variant="danger"
      />
    </PageWraper>
  );
};

export default UserManagementPage;
