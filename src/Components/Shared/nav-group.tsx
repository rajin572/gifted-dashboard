import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  type NavItem,
  type NavLink,
  type NavGroup as NavGroupProps,
} from "./types";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function NavGroup({ title, items }: NavGroupProps) {
  const href = useLocation().pathname;
  return (
    <SidebarGroup className="py-2">
      {title && (
        <SidebarGroupLabel className="text-[11px] font-semibold text-gray-400 tracking-wider uppercase px-2.5 py-1.5 h-auto">
          {title}
        </SidebarGroupLabel>
      )}
      <SidebarMenu className="gap-1 mt-0.5">
        {items.map((item) => {
          if (item.hideFromNav) return null;
          const key = `${item.title}-${item.url ?? ""}`;
          if (!item.items) {
            return <SidebarMenuLink key={key} item={item as NavLink} href={href} />;
          }
          return null;
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}

function SidebarMenuLink({ item, href }: { item: NavLink; href: string }) {
  const { setOpenMobile } = useSidebar();
  const isActive = checkIsActive(href, item);
  const urlStr = typeof item.url === "string" ? item.url : "";
  const targetUrl = urlStr.startsWith("/") ? urlStr : `/admin/${urlStr}`;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        isActive={isActive}
        tooltip={item.title}
        className={cn(
          "h-10 rounded-xl px-3 text-sm font-medium transition-colors cursor-pointer w-full justify-start",
          isActive
            ? "bg-[#ff4c05]! text-white! hover:bg-[#ff4c05]! hover:text-white!"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        )}
      >
        <Link to={targetUrl} onClick={() => setOpenMobile(false)} className="flex items-center gap-3">
          {item.icon && (
            <item.icon
              className={cn(
                "size-4.5 shrink-0",
                isActive ? "text-white" : "text-gray-500"
              )}
            />
          )}
          <span className="truncate">{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

function checkIsActive(href: string, item: NavItem, mainNav = false) {
  const itemUrl =
    typeof item.url === "string"
      ? item.url.startsWith("/")
        ? item.url
        : "/admin/" + item.url
      : "/admin";

  return (
    href === itemUrl ||
    href.split("?")[0] === itemUrl ||
    !!item?.items?.filter((i) => {
      const subItemUrl =
        typeof i.url === "string"
          ? i.url.startsWith("/")
            ? i.url
            : "/admin/" + i.url
          : "";
      return subItemUrl === href;
    }).length ||
    (mainNav &&
      href.split("/")[1] !== "" &&
      href.split("/")[1] === itemUrl.split("/")[1])
  );
}
