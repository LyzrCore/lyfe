import React from "react";

export declare type SidebarLayoutProps = {
  children?: React.ReactNode;
};

export declare type SidebarLayoutInterface = React.FC<SidebarLayoutProps> & {};

const DashboardLayout: SidebarLayoutInterface = ({ children }) => {
  return <div>{children}</div>;
};

export default DashboardLayout;
