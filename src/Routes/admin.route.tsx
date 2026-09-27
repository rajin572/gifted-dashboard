import OverviewPage from "@/pages/Overview/Overview";
import UserManagementPage from "@/pages/UserManagement/UserManagementPage";
import ListingsMonitoringPage from "@/pages/ListingsMonitoring/ListingsMonitoringPage";
import StoriesClaimsAuditPage from "@/pages/StoriesClaimsAudit/StoriesClaimsAuditPage";
import LiveStreamWatchPage from "@/pages/LiveStreamWatch/LiveStreamWatchPage";
import RevenuePage from "@/pages/Revenue/RevenuePage";
import SubscriptionPage from "@/pages/Subscription/SubscriptionPage";
import TrustSafetyQueuePage from "@/pages/TrustSafetyQueue/TrustSafetyQueuePage";
import PlatformPoliciesPage from "@/pages/PlatformPolicies/PlatformPoliciesPage";
import ComplianceExportPage from "@/pages/ComplianceExport/ComplianceExportPage";

import {
  BarChart2,
  User,
  Gift,
  FileText,
  Radio,
  DollarSign,
  CreditCard,
  Shield,
  Download,
} from "lucide-react";

export const adminRoutes = [
  {
    title: "SUPERVISION MODULES",
    items: [
      {
        title: "Telemetry Overview",
        url: "overview",
        icon: BarChart2,
        element: <OverviewPage />,
      },
      {
        title: "User Monitoring",
        url: "user-monitoring",
        icon: User,
        element: <UserManagementPage />,
      },
      {
        title: "Listings Monitoring",
        url: "listings-monitoring",
        icon: Gift,
        element: <ListingsMonitoringPage />,
      },
      {
        title: "Stories & Claims Audit",
        url: "stories-claims-audit",
        icon: FileText,
        element: <StoriesClaimsAuditPage />,
      },
      {
        title: "Live Stream Watch",
        url: "live-stream-watch",
        icon: Radio,
        element: <LiveStreamWatchPage />,
      },
    ],
  },
  {
    title: "REVENUE & SUBSCRIPTION",
    items: [
      {
        title: "Revenue",
        url: "revenue",
        icon: DollarSign,
        element: <RevenuePage />,
      },
      {
        title: "Subscription",
        url: "subscription",
        icon: CreditCard,
        element: <SubscriptionPage />,
      },
    ],
  },
  {
    title: "GOVERNANCE & RULES",
    items: [
      {
        title: "Safety & Reports Queue",
        url: "safety-reports-queue",
        icon: Shield,
        element: <TrustSafetyQueuePage />,
      },
      {
        title: "Platform Policies",
        url: "platform-policies",
        icon: FileText,
        element: <PlatformPoliciesPage />,
      },
      {
        title: "Compliance Export",
        url: "compliance-export",
        icon: Download,
        element: <ComplianceExportPage />,
      },
      // Backwards-compatibility aliases (hidden from sidebar)
      {
        title: "Trust & Safety Queue",
        url: "trust-safety-queue",
        icon: Shield,
        hideFromNav: true,
        element: <TrustSafetyQueuePage />,
      },
      {
        title: "User Management",
        url: "user-management",
        icon: User,
        hideFromNav: true,
        element: <UserManagementPage />,
      },
    ],
  },
];
