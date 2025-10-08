import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { cn } from "@/shadcn/lib/utils";

// Extracted styling variables for markdown components with reduced spacing
export const markdownStyles = {
  container: "prose prose-gray max-w-none dark:prose-invert",
  heading: {
    h1: "scroll-m-20 text-xl font-extrabold tracking-tight  mb-4",
    h2: "scroll-m-20 border-b pb-2 text-lg font-semibold tracking-tight first:mt-0 mb-3",
    h3: "scroll-m-20 text-base font-semibold tracking-tight mb-3",
    h4: "scroll-m-20 text-sm font-semibold tracking-tight mb-2",
    h5: "scroll-m-20 text-xs font-semibold tracking-tight mb-2",
    h6: "scroll-m-20 text-xs font-semibold tracking-tight mb-2",
  },
  paragraph: "leading-7 [&:not(:first-child)]:mt-3 mb-3 text-sm",
  list: {
    ul: "my-3 ml-6 list-disc [&>li]:mt-1 text-sm",
    ol: "my-3 ml-6 list-decimal [&>li]:mt-1 text-sm",
  },
  listItem: "leading-6 mb-1",
  blockquote: "mt-3 mb-3 border-l-2 pl-4 italic text-sm",
  code: {
    inline:
      "relative rounded bg-gray-200 mx-3 px-[0.3rem] py-[0.2rem] font-mono text-xs font-semibold",
    block:
      "relative w-full rounded-lg  p-4 font-mono text-xs my-3 overflow-x-auto whitespace-pre-wrap break-words",
  },
  pre: "relative w-full rounded-lg bg-muted p-4 font-mono text-xs my-3 overflow-x-auto whitespace-pre-wrap break-words",
  table: "w-full overflow-y-auto my-3",
  tableHeader:
    "border px-3 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
  tableCell:
    "border px-3 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
  tableRow: "[&>td]:align-baseline",
  link: "font-medium text-primary underline underline-offset-4 text-sm",
  strong: "font-semibold",
  emphasis: "italic",
  horizontalRule: "my-3 border-t",
  image: "rounded-lg border my-3",
  video: "rounded-lg border my-3",
  iframe: "rounded-lg border my-3",
} as const;

// Markdown Components
export const markdownComponents = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className={cn(markdownStyles.heading.h1, className)} {...props} />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className={cn(markdownStyles.heading.h2, className)} {...props} />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className={cn(markdownStyles.heading.h3, className)} {...props} />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className={cn(markdownStyles.heading.h4, className)} {...props} />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className={cn(markdownStyles.heading.h5, className)} {...props} />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className={cn(markdownStyles.heading.h6, className)} {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn(markdownStyles.paragraph, className)} {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn(markdownStyles.list.ul, className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn(markdownStyles.list.ol, className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className={cn(markdownStyles.listItem, className)} {...props} />
  ),
  blockquote: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className={cn(markdownStyles.blockquote, className)}
      {...props}
    />
  ),
  code: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    const isInline = typeof children === "string" && !children.includes("\n");
    if (isInline) {
      return (
        <code className={cn(markdownStyles.code.inline, className)} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={cn(markdownStyles.code.block, className)} {...props}>
        {children}
      </code>
    );
  },
  pre: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLPreElement>) => {
    // Check if this is a code block with language specification
    const child = React.Children.only(children) as React.ReactElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const codeString = (child?.props as any)?.children || "";
    const language =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (child?.props as any)?.className?.replace("language-", "") || "";

    if (language) {
      return (
        <div className="my-3">
          <SyntaxHighlighter
            language={language}
            // style={{ backgroundColor: "red" }}
            customStyle={{
              margin: 0,
              borderRadius: "0.5rem",
              fontSize: "0.75rem",
              lineHeight: "1.5",
              overflow: "auto",
              maxWidth: "100%",
            }}
            wrapLongLines={true}
            showLineNumbers={false}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      );
    }

    return (
      <div className="my-3 overflow-x-auto">
        <pre className={cn(markdownStyles.pre, className)} {...props}>
          {children}
        </pre>
      </div>
    );
  },
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <table className={cn(markdownStyles.table, className)} {...props} />
  ),
  thead: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <thead className={cn(className)} {...props} />
  ),
  tbody: ({
    className,
    ...props
  }: React.HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody className={cn(className)} {...props} />
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className={cn(markdownStyles.tableRow, className)} {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className={cn(markdownStyles.tableHeader, className)} {...props} />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className={cn(markdownStyles.tableCell, className)} {...props} />
  ),
  a: ({
    className,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a className={cn(markdownStyles.link, className)} {...props} />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <strong className={cn(markdownStyles.strong, className)} {...props} />
  ),
  em: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <em className={cn(markdownStyles.emphasis, className)} {...props} />
  ),
  hr: ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className={cn(markdownStyles.horizontalRule, className)} {...props} />
  ),
  img: ({ className, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img className={cn(markdownStyles.image, className)} {...props} />
  ),
};
