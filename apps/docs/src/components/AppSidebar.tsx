import {
  ComponentRouteDefinition,
  PlatformRouteDefinition,
} from "@/routes/routeDefinition";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shadcn/components/ui/sidebar";
import * as React from "react";
import NavMain from "./NavMain";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <img src="/image.png" alt="lyzr.ai" className="!size-5" />
                <span className="text-base font-semibold">Lyfe by lyzr.ai</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={PlatformRouteDefinition} />
        <NavMain items={ComponentRouteDefinition} label="Components" />
        <NavMain items={[]} label="Templates" />
        <NavMain items={[]} label="Services" />
      </SidebarContent>
    </Sidebar>
  );
}
