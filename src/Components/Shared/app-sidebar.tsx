import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { adminRoutes } from "@/Routes/admin.route";
import { AllImages } from "@/assets/AllImages";
import useUserData from "@/hooks/useUserData";

export function AppSidebar() {
  const user = useUserData();
  const userData = user ?? {
    userId: "",
    fullName: "Admin",
    email: "admin@gifted.com",
    role: "admin",
    profileImage: AllImages.profile,
    phone: "",
  };

  return (
    <Sidebar collapsible={"icon"} variant={"sidebar"}>
      <SidebarHeader className="overflow-hidden">
        <div className="flex items-start justify-center w-fit mx-auto">
          <img src={AllImages.logo} alt="Gifted" className="w-20" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {adminRoutes?.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t border-border">
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
