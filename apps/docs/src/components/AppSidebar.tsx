import LyzrLogo from "@/lyfe-shared/LyzrLogo";
import {
  SidebarLinks,
  SidebarLinkType,
  SidebarLogoHeader,
  SidebarUserProfile,
} from "@/lyfe-shared/SidebarComponents";
import {
  ComponentRouteDefinition,
  PlatformRouteDefinition,
} from "@/routes/routeDefinition";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
} from "@/shadcn/components/ui/dropdown-menu";
import { Sidebar, SidebarContent } from "@/shadcn/components/ui/sidebar";
import { Sparkle } from "lucide-react";
import * as React from "react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarLogoHeader
        logo={<LyzrLogo width={32} height={32} />}
        name="Lyfe by lyzr.ai"
        href="https://www.lyzr.ai/"
      />
      <SidebarContent>
        <SidebarLinks links={PlatformRouteDefinition as SidebarLinkType[]} />
        <SidebarLinks
          links={ComponentRouteDefinition as SidebarLinkType[]}
          label="Components"
        />
        {/* <SidebarItems
          items={[
            {
              label: "Project 123",
              isActive: true,
              icon: FileIcon,
              onClick: () => alert("Clicked Project 123"),
            },
          ]}
        /> */}
      </SidebarContent>
      <SidebarUserProfile
        user={{ name: "Lyfe Support", email: "kanahaiya@lyzr.ai" }}
        onLogout={() => alert("You are not allowed to do so!! :)")}
        additionalActions={
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => alert("Coming Soon!")}>
              <Sparkle /> Request new feature
            </DropdownMenuItem>
          </DropdownMenuGroup>
        }
      />
    </Sidebar>
  );
}
