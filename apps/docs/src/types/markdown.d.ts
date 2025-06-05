/* eslint-disable @typescript-eslint/no-explicit-any */
declare module 'react-markdown' {
  import { ComponentType, ReactNode } from 'react';
  
  export interface Components {
    h1?: ComponentType<{ children: ReactNode }>;
    h2?: ComponentType<{ children: ReactNode }>;
    h3?: ComponentType<{ children: ReactNode }>;
    h4?: ComponentType<{ children: ReactNode }>;
    h5?: ComponentType<{ children: ReactNode }>;
    h6?: ComponentType<{ children: ReactNode }>;
    p?: ComponentType<{ children: ReactNode }>;
    a?: ComponentType<{ href?: string; children: ReactNode }>;
    ul?: ComponentType<{ children: ReactNode }>;
    ol?: ComponentType<{ children: ReactNode }>;
    li?: ComponentType<{ children: ReactNode }>;
    blockquote?: ComponentType<{ children: ReactNode }>;
    code?: ComponentType<{ children: ReactNode; className?: string }>;
    pre?: ComponentType<{ children: ReactNode }>;
    table?: ComponentType<{ children: ReactNode }>;
    thead?: ComponentType<{ children: ReactNode }>;
    tbody?: ComponentType<{ children: ReactNode }>;
    tr?: ComponentType<{ children: ReactNode }>;
    th?: ComponentType<{ children: ReactNode }>;
    td?: ComponentType<{ children: ReactNode }>;
  }

  export interface ReactMarkdownOptions {
    children: string;
    components?: Components;
    remarkPlugins?: any[];
    rehypePlugins?: any[];
  }

  const ReactMarkdown: ComponentType<ReactMarkdownOptions>;
  export default ReactMarkdown;
}

declare module 'remark-gfm' {
  const remarkGfm: any;
  export default remarkGfm;
}

declare module 'rehype-highlight' {
  const rehypeHighlight: any;
  export default rehypeHighlight;
}

declare module 'rehype-slug' {
  const rehypeSlug: any;
  export default rehypeSlug;
}

declare module 'rehype-autolink-headings' {
  const rehypeAutolinkHeadings: any;
  export default rehypeAutolinkHeadings;
} 