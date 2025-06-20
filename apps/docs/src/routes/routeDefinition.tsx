import Architecture from "@/features/architecture";
import Guidelines from "@/features/guidelines";
import Installation from "@/features/installation";
import Introduction from "@/features/introduction";
import {
  BadgeInfoIcon,
  Code,
  FileJson,
  Library,
  type LucideIcon,
} from "lucide-react";

export declare type RouteDefinitionType = {
  name: string;
  path: string;
  component: React.ReactNode;
  icon?: LucideIcon;
  children?: RouteDefinitionType[];
};

export const SidebarRoutesDefinition: RouteDefinitionType[] = [
  {
    name: "Introduction",
    path: "/introduction",
    component: <Introduction />,
    icon: BadgeInfoIcon,
  },
  {
    name: "Installation",
    path: "/installation",
    component: <Installation />,
    icon: Code,
  },
  {
    name: "Architecture",
    path: "/architecture",
    component: <Architecture />,
    icon: Library,
  },
  {
    name: "Guidelines",
    path: "/guidelines",
    component: <Guidelines />,
    icon: FileJson,
  },
];

export const RoutesDefinition: RouteDefinitionType[] = [
  ...SidebarRoutesDefinition,
];
