"use client";

import { RouteDefinitionType } from "@/routes/routeDefinition";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shadcn/components/ui/sidebar";
import React from "react";

export declare type NavMainProps = {
  items: RouteDefinitionType[];
  label?: string;
};

// TODO: Add collapsible
const NavMain: React.FC<NavMainProps> = ({ items, label }) => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label || "Platform"}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={item?.path === window.location.pathname}
              tooltip={item.name}
            >
              {item.icon && <item.icon />}
              <a href={item?.path}>
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavMain;
