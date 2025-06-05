import PageLayout from "@/components/PageLayout";
import Markdown from "@/components/ReactMarkdown";
import React from "react";

const Installation: React.FC = () => {
  const content = `# Installation Guide

Welcome to the installation guide for Lyfe AI Agent Template. This guide will help you get started with setting up your development environment and installing the template.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)
- **Git** (latest version)
- A code editor (VS Code recommended)

## ⚡ Quick Start

The fastest way to get started is using our CLI tool:

\`\`\`bash
pnpm dlx lyfe-cli init <project-name>
\`\`\`

Follow the interactive prompts to:
1. Choose your project name
2. Select your preferred framework (Next.js or Vite)

### Start Development Server

\`\`\`bash
pnpm run dev
\`\`\`

### Build for Production

\`\`\`bash
pnpm run build
\`\`\`

## 📝 Next Steps

After installation:

1. Review the [Architecture](/architecture) guide
2. Explore the [Components](/components) library
3. Read our [Coding Guidelines](/guidelines)

## 🆘 Need Help?

If you encounter any issues:

- Check our [GitHub Issues](https://github.com/your-org/lyfe/issues)
- Join our [Discord Community](https://discord.gg/your-server)
- Review the [Troubleshooting Guide](/troubleshooting)

---

Ready to start building? Head to the [Architecture](/architecture) guide to learn about the project structure!`;

  return (
    <PageLayout breadcrumbs={[{ name: "Installation", path: "/installation" }]}>
      <div className="container relative">
        <div className="mx-auto flex max-w-[980px] flex-col items-start gap-2 py-8 md:flex-row md:justify-between md:gap-12 lg:py-12 xl:py-24">
          <Markdown content={content} />
        </div>
      </div>
    </PageLayout>
  );
};

export default Installation;
