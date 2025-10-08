import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { cn } from "@/shadcn/lib/utils";
import { markdownStyles, markdownComponents } from "./MarkdownComponents";

interface MarkdownProps {
  children: string;
  className?: string;
}

const Markdown: React.FC<MarkdownProps> = ({ children, className }) => {
  // Preprocess the text to handle \n\n characters
  const processedText = children
    // Replace literal \n\n with actual double line breaks
    .replace(/\\n\\n/g, "\n\n")
    // Replace literal \n with actual line breaks
    .replace(/\\n/g, "\n");

  return (
    <div className={cn(markdownStyles.container, className)}>
      <ReactMarkdown
        components={markdownComponents}
        rehypePlugins={[rehypeRaw]}
        remarkPlugins={[remarkBreaks, remarkGfm]}
      >
        {processedText}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;
