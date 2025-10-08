import PageLayout from "@/components/PageLayout";
import Markdown from "@/lyfe-shared/Markdown";
import React from "react";

const Introduction: React.FC = () => {
  const content = `# Introduction

Welcome to the **Lyfe AI Agent Template for Frontend** - a powerful and flexible template for building AI-powered applications. This template combines the best practices of modern web development.

## 🎯 What is Lyfe AI Agent Template?

Lyfe AI Agent Template is a comprehensive starter kit designed to accelerate the development of Lyzr's AI-powered applications. It provides:

- **Modern Tech Stack**: Built with React, TypeScript, and Tailwind CSS
- **Scalable Structure**: Feature-based organization for growing applications
- **Beautiful UI**: ShadCN components with customizable themes
- **Developer Experience**: Hot reloading, type safety, and modern tooling

## 🌟 Key Features

### 🎨 Modern UI Components
- Built with ShadCN UI for beautiful, accessible components
- Dark mode support out of the box
- Responsive design for all devices
- Customizable theme system

### 🏗️ Scalable Architecture
- Feature-based folder structure
- Modular component design
- Type-safe development
- Efficient state management

### 🛠️ Developer Experience
- Hot module replacement
- TypeScript for type safety
- ESLint and Prettier for code quality
- Comprehensive documentation

## 🎮 Getting Started

To start building with Lyfe AI Agent Template:

1. Choose your preferred setup:
   - **Next.js** for full-stack applications
   - **Vite** for frontend-only projects

2. Follow the installation guide in the next section

3. Explore the documentation to learn about:
   - Project structure
   - Component usage
   - AI integration
   - Best practices

## 📚 Documentation Structure

Our documentation is organized into several key sections:

- **Introduction** (You are here)
- **Installation** - Getting started guide
- **Architecture** - Project structure and design decisions
- **Guidelines** - Coding standards and best practices
- **Components** - UI component library (Coming Soon!)
- **Features** - AI agent implementation (Coming Soon!)

## 🎯 Use Cases

Lyfe AI Agent Template is perfect for:

- 🤖 AI-powered chatbots
- 💬 Conversational interfaces
- 🎯 Task automation systems
- 📊 Data analysis tools
- 🎮 Interactive AI applications

## 📈 Roadmap

We're constantly improving the template with:

- [ ] More pre-built components
- [ ] Enhanced documentation
- [ ] Performance optimizations
- [ ] New feature templates

## 🤝 Contributing

We welcome contributions! Check out our:

- [GitHub Repository](https://github.com/LyzrCore/lyfe)
- [GitHub Issues](https://github.com/LyzrCore/lyfe/issues)
---

Ready to start building? Head to the [Installation](/installation) guide to get started!`;

  return (
    <PageLayout breadcrumbs={[{ name: "Introduction", path: "/introduction" }]}>
      <div className="container relative">
        <div className="mx-auto flex max-w-[980px] flex-col items-start gap-2  md:flex-row md:justify-between md:gap-12 ">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </PageLayout>
  );
};

export default Introduction;
