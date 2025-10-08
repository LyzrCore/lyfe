import PageLayout from "@/components/PageLayout";
import Markdown from "@/lyfe-shared/Markdown";
import React from "react";

const Architecture: React.FC = () => {
  const content = `# Template Architecture – Vite & Next.js

The Lyfe AI Agent Template comes in two variants to suit different development environments:

- **Vite-based SPA template** (for lightweight, blazing-fast frontend apps)
- **Next.js template** (for full-stack apps with SSR and API routing)

This document explains the folder structure, configuration differences, and rationale for each version.

## 📁 Common Directory Structure (Shared Across Vite & Next.js)

\`\`\`
lyfe/
├── package.json           # Root package.json with workspace config
├── components.json        # ShadCN component registry
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── src/
│   ├── components/          # Reusable UI components for the current project (base & shared)
│   │   |── button.tsx             # Project-specific UI components
│   ├── features/           # Domain-specific feature modules
│   │   ├── chat/          # Chat feature
│   │   │   ├── components/
│   │   │   │   ├── chat-window.tsx
│   │   │   │   ├── message-bubble.tsx
│   │   │   │   └── ...
│   │   │   ├── hooks/
│   │   │   │   ├── use-chat.ts
│   │   │   │   └── ...
│   │   │   ├── types/
│   │   │   │   ├── chat.types.ts
│   │   │   │   └── ...
│   │   │   └── index.ts
│   ├── hooks/               # Custom reusable logic
│   │   ├── use-theme.ts
│   │   ├── use-media-query.ts
│   │   └── ...
│   ├── lib/                 # Utilities
│   │   ├── api/            # API clients
│   │   │   ├── client.ts
│   │   │   └── endpoints.ts
│   │   ├── utils/          # Helper functions
│   │   │   ├── format.ts
│   │   │   ├── validation.ts
│   │   │   └── ...
│   │   └── constants/      # Constants and configs
│   │       ├── routes.ts
│   │       └── config.ts
│   ├── providers/           # Global context providers
│   │   ├── theme-provider.tsx
│   │   ├── auth-provider.tsx
│   │   └── ...
│   ├── types/               # Shared TypeScript types
│   │   ├── common.types.ts
│   │   ├── api.types.ts
│   │   └── ...
│   ├── styles/              # Tailwind/global stylesheets
│   │   ├── globals.css
│   │   └── variables.css
│   ├── shadcn/              # ShadCN UI component configurations
│   │   ├── hooks/             # Generated ShadCN hooks
│   │   ├── ui/             # Generated ShadCN components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   |── ...
│   │   └── lib/             # Lyfe template shared resources
│   └── public/                 # Static assets
│   │   ├── images/
│   │   ├── fonts/
│   │   └── favicon.ico
\`\`\`

✅ We use modular feature-based architecture with strong separation between reusable components, domain logic, and shared utilities. Each feature (agent, chat, auth) is self-contained with its own components, hooks, types, and utilities. The \`shadcn\` directory contains all ShadCN UI component configurations and generated components, while \`lyfe-shared\` houses reusable template resources that can be shared across different Lyfe applications.

## ⚙️ Vite Template-Specific Architecture

Vite is a fast frontend build tool used for pure SPA (Single Page Application) setups.

\`\`\`
src/
├── main.tsx          # Root entry point
├── App.tsx           # Root component with routes and layout
├── routes/
│   ├── routes.tsx
│   └── protected-routes.tsx
\`\`\`

### 🧩 Routing in Vite

- Uses react-router-dom
- Routes defined in pages/ using <Routes> and <Route>
- Shared layout (Sidebar, Topbar) is wrapped at the root (App.tsx)

Example:
\`\`\`tsx
// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/components/layout/app-layout'
import { Introduction } from '@/pages/introduction'

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Introduction />} />
          {/* more routes */}
        </Routes>
      </AppLayout>
    </Router>
  )
}
\`\`\`

## ⚙️ Next.js Template-Specific Architecture

The Next.js template is designed for SSR/SSG-based apps and includes full-stack capabilities.

There are two layout strategies depending on the Next.js version, but template support pages router only. Manually migrate to app router if you need it:
- ✅ pages/ directory (traditional)

\`\`\`
pages/
├── _app.tsx          # Root layout and provider composition
├── index.tsx         # Home (redirect or Intro page)
├── introduction.tsx  # Introduction page
└── agents/           # Nested routes (e.g., agents/index.tsx)
\`\`\`

## 📚 Summary: Key Differences Between Vite & Next.js Templates

| Feature | Vite Template | Next.js Template |
|---------|--------------|------------------|
| Routing | Manual via react-router-dom | File-based via pages/ |
| API Handling | Client-side only (fetch/Axios) | Full-stack with API routes (pages/api) |
| SSR/SSG | ❌ Not supported | ✅ Built-in support |
| Project Entry | main.tsx, App.tsx | pages/_app.tsx, pages/index.tsx |
| Deployment Target | Frontend (SPA) | Full-stack, Vercel/Node SSR |

## 🧱 Template Directory Responsibilities

| Directory | Role |
|-----------|------|
| components/ | All UI primitives and layouts based on ShadCN |
| features/ | Encapsulated domain logic (agents, auth, chat, etc.) |
| hooks/ | Shared or feature-specific React hooks |
| lib/ | Utility functions, constants, API wrappers |
| providers/ | Theme, query, and custom context providers |
| routes/ | (Vite only) Guards and routing helpers |
| pages/ | Page definitions for routing (Vite or Next.js) |
| styles/ | Tailwind CSS setup, globals, and custom styles |
| types/ | Shared types and interfaces used throughout |

## 🛠️ Tooling Configuration (Shared)

| Tool | Config File | Purpose |
|------|-------------|---------|
| Tailwind CSS | tailwind.config.ts | Utility CSS setup |
| ESLint | .eslintrc.js | Code quality and linting |
| Prettier | .prettierrc | Auto-formatting |
| TypeScript | tsconfig.json | Type system and path aliases |
| PostCSS | postcss.config.js | Tailwind plugin integration |
| Vite / Next | vite.config.ts / next.config.js | Project-specific build setup |

## 🧩 CLI Compatibility

Both templates support the lyfe CLI to scaffold and extend:

- \`lyfe-cli init\`: Initialize either Vite or Next.js app
- \`lyfe-cli add <template>\`: Copy component/template from registry into local project

## 📌 Recommendation

| Use Case | Recommended Template |
|----------|---------------------|
| Static frontend SPA | Vite Template |
| Full-stack AI agent (SSR, APIs) | Next.js Template |
| API integration, auth, SSR | Next.js Template |
| Prototyping with fast feedback | Vite Template |

Both templates follow the same architecture philosophy:
Feature-based + component-driven + clean separation of logic and view.

This makes it easy to maintain, scale, and reuse across projects.`;

  return (
    <PageLayout breadcrumbs={[{ name: "Architecture", path: "/architecture" }]}>
      <div className="container relative">
        <div className="mx-auto flex max-w-[980px] flex-col items-start gap-2  md:flex-row md:justify-between md:gap-12 ">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </PageLayout>
  );
};

export default Architecture;
