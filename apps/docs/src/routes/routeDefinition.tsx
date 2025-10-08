import Architecture from "@/features/architecture";
import ChatPanelDocs from "@/features/chatPanel";
import Guidelines from "@/features/guidelines";
import Installation from "@/features/installation";
import Introduction from "@/features/introduction";
import PPTGenService from "@/features/pptGenService";
import {
  BadgeInfoIcon,
  Code,
  FileJson,
  Library,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";

export declare type RouteDefinitionType = {
  name: string;
  path: string;
  component: React.ReactNode;
  icon?: LucideIcon;
  children?: RouteDefinitionType[];
};

export const PlatformRouteDefinition: RouteDefinitionType[] = [
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
  {
    name: "PPT Generation",
    path: "/ppt-generation",
    component: <PPTGenService />,
    icon: FileJson,
  },
];

export const ComponentRouteDefinition: RouteDefinitionType[] = [
  {
    name: "Chat Panel",
    path: "/chat-panel",
    component: <ChatPanelDocs />,
    icon: MessagesSquare,
  },
];

export const RoutesDefinition: RouteDefinitionType[] = [
  ...PlatformRouteDefinition,
  ...ComponentRouteDefinition,
];
