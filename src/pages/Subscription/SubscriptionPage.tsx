import { useState } from "react";
import PageWraper from "@/Components/ui/CustomUi/PageWraper";
import SubscriptionStatCards from "@/Components/Dashboard/Subscription/SubscriptionStatCards";
import MembershipPlansGrid from "@/Components/Dashboard/Subscription/MembershipPlansGrid";
import ActiveSubscribersTable from "@/Components/Dashboard/Subscription/ActiveSubscribersTable";
import ManageSubscriberModal from "@/Components/Dashboard/Subscription/ManageSubscriberModal";
import { Button } from "@/Components/ui/button";
import {
  ISubscriptionOverviewStats,
  IMembershipPlan,
  ISubscriberAccountItem,
} from "@/types";
// import {
//   useGetSubscriptionOverviewQuery,
//   useGetSubscribersListQuery,
// } from "@/redux/features/subscription/subscriptionApi";

const DUMMY_STATS: ISubscriptionOverviewStats = {
  activeSubscribers: 610,
  plusSubscribers: 262,
  premiumSubscribers: 82,
  subscriptionMrr: 4357,
  mrrTrajectoryPercentage: 14.2,
  claimsAllowanceUsedPercentage: 76.4,
  avgClaimsPerMemberMonth: 6.8,
  promoRedemptions: 265,
  activeCampaignsCount: 3,
};

const DUMMY_PLANS: IMembershipPlan[] = [
  {
    id: "free",
    name: "GIFTED FREE",
    description: "Full access to give & receive. Community giving will always remain 100% free for everyone.",
    monthlyFee: 0,
    monthlyClaims: 3,
    entitlements: [
      "3 story claim submissions per month",
      "Standard community matching & voting",
      "Direct messaging with donors & neighbors",
      "Basic search & primary category filters",
      "Community pickup coordination",
    ],
  },
  {
    id: "plus",
    name: "GIFTED PLUS",
    badge: "Most Popular",
    description: "For active community members who need higher claim frequency, instant alerts, and advanced filters.",
    monthlyFee: 9.99,
    monthlyClaims: 10,
    entitlements: [
      "Everything included in Free",
      "10 story claim submissions per month",
      "Instant push alerts for newly listed gifts",
      "Advanced filters (distance, condition, pickup time)",
      "Unlimited saved searches with keyword triggers",
    ],
  },
  {
    id: "premium",
    name: "GIFTED PREMIUM",
    badge: "Top Tier",
    description: "For power recipients & community advocates seeking maximum opportunities and higher-value gift categories.",
    monthlyFee: 19.99,
    monthlyClaims: 25,
    entitlements: [
      "Everything included in Plus",
      "25 story claim submissions per month",
      "Priority notifications before standard feed release",
      "Eligibility for High-Value & Sponsored categories",
      "Early access to select premium partner donations",
    ],
  },
];

const DUMMY_SUBSCRIBERS: ISubscriberAccountItem[] = [
  {
    _id: "sub_1",
    name: "Sarah Jenkins",
    email: "sarah.jenkins.austin@gmail.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    tier: "FREE",
    status: "FREE",
    claimsUsed: 1,
    claimsLimit: 3,
    renewalDateText: "N/A (Free Tier)",
    paymentHealth: "None",
  },
  {
    _id: "sub_2",
    name: "Marcus Vance",
    email: "marcus.vance.music@gmail.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    tier: "PREMIUM",
    status: "PAST DUE",
    claimsUsed: 14,
    claimsLimit: 25,
    renewalDateText: "2026-10-14 (Past Due)",
    paymentHealth: "Past Due",
  },
  {
    _id: "sub_3",
    name: "Maya Rodriguez",
    email: "maya.rodriguez.ut@edu.org",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100",
    tier: "PLUS",
    status: "ACTIVE",
    claimsUsed: 6,
    claimsLimit: 10,
    renewalDateText: "2026-10-18",
    paymentHealth: "Valid",
  },
  {
    _id: "sub_4",
    name: "David Chen",
    email: "david.chen.outreach@gmail.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
    tier: "PLUS",
    status: "ACTIVE",
    claimsUsed: 4,
    claimsLimit: 10,
    renewalDateText: "2026-10-05",
    paymentHealth: "Valid",
  },
  {
    _id: "sub_5",
    name: "Elena Morales",
    email: "elena.morales.design@gmail.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100",
    tier: "PREMIUM",
    status: "TRIAL",
    claimsUsed: 8,
    claimsLimit: 25,
    renewalDateText: "Trial ends 2026-09-28",
    paymentHealth: "Trial",
  },
  {
    _id: "sub_6",
    name: "Jordan Taylor",
    email: "jordan.r.taylor.flagged@gmail.com",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100",
    tier: "FREE",
    status: "FREE",
    claimsUsed: 3,
    claimsLimit: 3,
    renewalDateText: "N/A (Free Tier)",
    paymentHealth: "None",
  },
  {
    _id: "sub_7",
    name: "Leo Nguyen",
    email: "leo.nguyen.austin@gmail.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100",
    tier: "PLUS",
    status: "CANCELED",
    claimsUsed: 2,
    claimsLimit: 10,
    renewalDateText: "Ends 2026-09-30",
    paymentHealth: "Canceled",
  },
  {
    _id: "sub_8",
    name: "Hannah Thorne",
    email: "hannah.thorne@gmail.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100",
    tier: "PREMIUM",
    status: "ACTIVE",
    claimsUsed: 11,
    claimsLimit: 25,
    renewalDateText: "2026-10-21",
    paymentHealth: "Valid",
  },
];

export default function SubscriptionPage() {
  const [selectedSubscriber, setSelectedSubscriber] = useState<ISubscriberAccountItem | null>(null);
  const [isManageOpen, setIsManageOpen] = useState(false);

  // TODO: wire to useGetSubscriptionOverviewQuery once the endpoint exists.
  // const { data: overviewData } = useGetSubscriptionOverviewQuery();
  // const stats = overviewData?.data?.stats ?? DUMMY_STATS;
  // const plans = overviewData?.data?.plans ?? DUMMY_PLANS;

  // TODO: wire to useGetSubscribersListQuery once the endpoint exists.
  // const { data: subscribersData } = useGetSubscribersListQuery({ page: 1, limit: 10 });
  // const subscribers = subscribersData?.data?.data ?? DUMMY_SUBSCRIBERS;

  const stats = DUMMY_STATS;
  const plans = DUMMY_PLANS;
  const subscribers = DUMMY_SUBSCRIBERS;

  const handleOpenManage = (subscriber: ISubscriberAccountItem) => {
    setSelectedSubscriber(subscriber);
    setIsManageOpen(true);
  };

  return (
    <PageWraper
      preTitle={
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold tracking-wider uppercase bg-orange-50 text-[#ff4c05] px-2.5 py-0.5 rounded-full border border-orange-100">
            SUBSCRIPTION OPERATIONS
          </span>
          <span className="text-xs text-gray-500 font-medium">
            All-In-One Recipient Center
          </span>
        </div>
      }
      title="Subscription Management & Tier Architecture"
      description="Supervise active member accounts, configure tier pricing & claim quotas, govern feature entitlements, and run promotional coupon campaigns — all consolidated onto this single management console."
      actions={
        <Button
          type="button"
          className="bg-[#ff4c05] hover:bg-[#e04304] text-white text-xs sm:text-sm font-semibold h-10 px-5 cursor-pointer shadow-xs"
        >
          Publish Plans Live
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stat Cards */}
        <SubscriptionStatCards stats={stats} />

        {/* Section Quick Jump Navigator */}
        <div className="flex items-center gap-3 overflow-x-auto py-1 text-xs">
          <span className="text-[11px] font-bold text-gray-400 tracking-wider uppercase shrink-0">
            SECTIONS ON THIS SCREEN:
          </span>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-900 font-semibold border border-gray-200 shrink-0 cursor-pointer"
          >
            1. Plans & Pricing
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg bg-white text-gray-600 hover:text-gray-900 font-medium border border-gray-200 shrink-0 cursor-pointer"
          >
            2. Active Subscribers Directory ({subscribers.length})
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg bg-white text-gray-600 hover:text-gray-900 font-medium border border-gray-200 shrink-0 cursor-pointer"
          >
            3. Tier Entitlements Matrix
          </button>
          <button
            type="button"
            className="px-3 py-1.5 rounded-lg bg-white text-gray-600 hover:text-gray-900 font-medium border border-gray-200 shrink-0 cursor-pointer"
          >
            4. Promos & Trial Codes (3)
          </button>
        </div>

        {/* Section 1: Membership Plans */}
        <MembershipPlansGrid plans={plans} />

        {/* Section 2: Active Subscribers Directory */}
        <ActiveSubscribersTable
          data={subscribers}
          onManage={handleOpenManage}
        />
      </div>

      {/* Manage Subscriber Modal */}
      <ManageSubscriberModal
        open={isManageOpen}
        onClose={() => {
          setIsManageOpen(false);
          setSelectedSubscriber(null);
        }}
        subscriber={selectedSubscriber}
      />
    </PageWraper>
  );
}
