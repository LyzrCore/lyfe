import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shadcn/components/ui/breadcrumb";
import { SidebarTrigger } from "@/shadcn/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

export declare type BreadcrumbItem = {
  name: string;
  path: string;
};

export declare type PageHeaderProps = {
  breadcrumb?: BreadcrumbItem[];
};

const PageHeader: React.FC<PageHeaderProps> = ({ breadcrumb }) => {
  return (
    <header className="bg-white z-1 border-b-1 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 sticky top-0 ">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        {breadcrumb?.length && (
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb?.map((el, idx) => {
                return (
                  <>
                    {idx === breadcrumb?.length - 1 ? (
                      <BreadcrumbItem>
                        <BreadcrumbPage>{el?.name}</BreadcrumbPage>
                      </BreadcrumbItem>
                    ) : (
                      <>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href={el?.path}>
                            {el?.name}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                      </>
                    )}
                  </>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
