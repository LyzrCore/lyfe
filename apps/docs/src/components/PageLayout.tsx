import React from "react";
import PageHeader, { BreadcrumbItem } from "./PageHeader";

export declare type PageLayoutProps = {
  children: React.ReactNode;
  title?: string;
  breadcrumbs?: BreadcrumbItem[];
};

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  breadcrumbs = [],
}) => {
  return (
    <div className="relative">
      <PageHeader breadcrumb={[{ name: "Lyfe", path: "#" }, ...breadcrumbs]} />
      <div className="px-6 py-6">
        {title && <h1 className="text-4xl font-bold">{title}</h1>}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
