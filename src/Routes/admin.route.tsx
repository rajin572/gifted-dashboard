import UserManagementPage from "@/pages/UserManagement/UserManagementPage";
import OverviewPage from "@/pages/Overview/Overview";

import {
  LayoutDashboard,
  Users,
} from "lucide-react";

export const adminRoutes = [
  {
    title: "",
    items: [
      {
        title: "Dashboard",
        url: "overview",
        icon: LayoutDashboard,
        element: <OverviewPage />,
      },
      {
        title: "User Management",
        url: "user-management",
        icon: Users,
        element: <UserManagementPage />,
      },
    ],
  },
];
