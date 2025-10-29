import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shadcn/components/ui/sidebar";
import { EllipsisVertical, LogOut, LucideIcon } from "lucide-react";
import React from "react";

export type SidebarNavItemBaseProps = {
  classname: string;
  label: string;
};

export type SidebarLinkType = {
  name: string;
  icon: LucideIcon;
  path: string;
};

export type SidebarLinksProps = Partial<SidebarNavItemBaseProps> & {
  links: SidebarLinkType[];
};

export type SidebarItemType = {
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
  isActive?: boolean;
  cta?: React.ReactNode;
};

export type SidebarItemProps = Partial<SidebarNavItemBaseProps> & {
  items: SidebarItemType[];
};

export type SidebarLogoHeaderProps = {
  classname?: string;
  logo?: React.ReactNode;
  name: string;
  href?: string;
};

export const SidebarLogoHeader: React.FC<SidebarLogoHeaderProps> = ({
  classname,
  logo,
  name,
  href,
}) => {
  const Component = href ? "a" : "div";

  return (
    <SidebarHeader className={`${classname}`}>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            className="data-[slot=sidebar-menu-button]:!p-1.5"
          >
            <Component
              className={`${href ? "cursor-pointer" : ""}`}
              href={href}
              target="_blank"
            >
              {logo}
              <span className="text-base font-semibold">{name}</span>
            </Component>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};

export type SidebarUserProfileProps = {
  classname?: string;
  user: { name: string; email?: string; imgSrc?: string };
  onLogout?: () => void;
  additionalActions?: React.ReactNode;
};

export const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({
  classname,
  user,
  additionalActions,
  onLogout,
}) => {
  const { isMobile } = useSidebar();

  return (
    <SidebarFooter className={` ${classname}`}>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg grayscale">
                  <AvatarImage src={user?.imgSrc} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user?.name?.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
                <EllipsisVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user?.imgSrc} alt={user.name} />
                    <AvatarFallback className="rounded-lg">
                      {user?.name?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              {additionalActions && (
                <>
                  <DropdownMenuSeparator />
                  {additionalActions}
                </>
              )}
              {onLogout && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive" onClick={onLogout}>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export const SidebarLinks: React.FC<SidebarLinksProps> = ({
  label,
  classname,
  links,
}) => {
  return (
    <SidebarGroup className={classname}>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {links.map((item) => (
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

export const SidebarItems: React.FC<SidebarItemProps> = ({
  classname,
  label,
  items,
}) => {
  return (
    <SidebarGroup
      className={`group-data-[collapsible=icon]:hidden ${classname}`}
    >
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.label}>
            <SidebarMenuButton
              onClick={() => item?.onClick?.()}
              isActive={item?.isActive}
              className={`${item?.onClick ? "cursor-pointer" : ""} ${item?.isActive ? "" : ""} hover:scale-[1.03] transition-all duration-75`}
            >
              {item.icon && <item.icon />}
              <span>{item.label}</span>
            </SidebarMenuButton>
            {item?.cta}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
