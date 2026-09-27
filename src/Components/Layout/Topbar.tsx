import { SidebarTrigger } from "../ui/sidebar";
import { useRef, useState } from "react";
import { AlertTriangle, Bell, ClipboardCheck, CreditCard, Download } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AllImages } from "@/assets/AllImages";

// TODO: replace with real notifications API data once the endpoint exists.
const notifications = [
  {
    title: "New verification pending",
    body: "Owner verification document submitted for review.",
    time: "2 minutes ago",
    icon: ClipboardCheck,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Dispute opened",
    body: "Booking #12345 — customer complaint filed.",
    time: "1 hour ago",
    icon: AlertTriangle,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
  },
  {
    title: "Payment failed",
    body: "Transaction #45785 requires attention.",
    time: "3 hours ago",
    icon: CreditCard,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
];

const Topbar = () => {
  const [notifOpen, setNotifOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNotif = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setNotifOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setNotifOpen(false), 150);
  };

  return (
    <div className="flex items-center justify-between w-full z-50 px-2">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
      </div>

      <div className="flex items-center gap-4">
        {/* Export Audit Button matching Figma design */}
        <Button
          variant="outline"
          size="sm"
          className="h-9 px-3 gap-2 rounded-lg text-xs font-medium text-base-color border-border hover:bg-muted cursor-pointer"
          onClick={() => {
            // TODO: wire to exportAudit mutation once endpoint exists
          }}
        >
          <Download className="size-3.5 text-gray-500" />
          <span>Export Audit</span>
        </Button>

        {/* Notifications */}
        <div
          className="relative"
          onMouseEnter={openNotif}
          onMouseLeave={scheduleClose}
        >
          <button
            type="button"
            className="relative p-2 rounded-full bg-white border border-border shadow-xs hover:bg-muted transition-colors cursor-pointer"
          >
            <Bell className="size-4 text-base-color" />
            <span className="absolute -top-1 -right-1 size-4 bg-red-500 rounded-full text-[10px] text-white font-bold flex items-center justify-center">
              {notifications.length}
            </span>
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 sm:w-80 bg-popover text-popover-foreground rounded-lg border border-border shadow-md z-50">
              <div className="px-4 py-3">
                <p className="font-bold text-base-color text-base">Notifications</p>
                <p className="text-xs text-secondbase-color">{notifications.length} unread</p>
              </div>
              <div className="h-px bg-border" />
              <div className="max-h-[30vh] overflow-y-auto">
                {notifications.map((n, i) => {
                  const Icon = n.icon;
                  return (
                    <div key={i} className="flex gap-3 px-4 py-3 hover:bg-muted/50 transition-colors">
                      <div className={`size-8 rounded-full ${n.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                        <Icon className={`size-4 ${n.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-base-color leading-snug">{n.title}</p>
                        <p className="text-xs text-secondbase-color mt-0.5 leading-snug">{n.body}</p>
                        <p className="text-[10px] text-secondbase-color mt-1">{n.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Platform Owner Profile matching Figma design */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-border">
          <Avatar className="size-9 rounded-full border border-border">
            <AvatarImage src={AllImages.profile} alt="Platform Owner" />
            <AvatarFallback className="text-xs">PO</AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col text-left">
            <span className="text-sm font-semibold text-base-color leading-tight">Platform Owner</span>
            <span className="text-[11px] text-gray-500 leading-tight">Monitoring & Governance</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
