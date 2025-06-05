# Lyfe Vite Template

A modern Vite template featuring a hybrid architecture that combines feature-based organization with component-driven development enabling scalable development and modular organization. Built with TypeScript, Tailwind CSS, and a curated set of powerful tools.

## 🏗️ Project Architecture

```
src/
├── components/          # Shared, reusable UI components
│   ├── ui/             # Primitive components (button, input, etc.)
│   ├── layout/         # App shell components (navbar, sidebar)
│   └── shared/         # Reusable widgets (avatar, user menu, etc.)
├── features/           # Feature-based domain folders
│   ├── auth/          # Auth logic (api, hooks, components)
│   └── agents/        # Agent listing or interactions
├── lib/               # Utility functions and constants
├── providers/         # App-wide providers (query, zustand, theme)
├── routes/            # React Router route definitions and guards
├── store/            # Global state management
├── assets/           # Static assets (images, fonts, etc.)
└── styles/           # Tailwind and global CSS
```

### Architecture Overview

- **Feature Folders**: Each feature encapsulates its own `components/`, `api.ts`, `hooks/`, and `store.ts`
- **Shared Components**: Reusable UI components in `components/` are available across features
- **Global Providers**: App-wide providers (ReactQueryProvider, ZustandStoreProvider) wrap the application
- **Routing**: React Router for declarative routing with route guards and lazy loading

## 🚀 Features

- ⚡️ Vite for lightning-fast development
- 🔥 React 19 with TypeScript
- 🎨 Tailwind CSS with shadcn/ui components
- 📦 PNPM as package manager
- 🎯 ESLint + Prettier for code quality
- 🔄 React Query for data fetching
- 🎭 Radix UI primitives
- 🎮 State management with Zustand
- 🛣️ React Router for routing
- 🚀 Hot Module Replacement (HMR)

## 📦 Setup Instructions

### 1. Using the Template

```bash
# Create a new project using the template
pnpm dlx lyfe-cli init <project-name>

# Select vite as your project template
# Navigate to project directory
cd <project-name>

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### 2. Manual Setup

```bash
# Clone the repository
git clone <clone url>
cd <repo>

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🧱 Code Guidelines

### Feature Organization
- Keep feature-specific logic inside respective `features/` folders
- Each feature should be self-contained with its own components, API calls, and state management
- Use `lib/` for shared utilities and constants

### Component Development
- All UI components should be reusable and responsive
- Follow consistent naming conventions:
  - kebab-case for files
  - PascalCase for components
- Use shadcn/ui components as building blocks
- Use `pnpm lyfe-cli add <component/template-name>` for additional components or template built as shareable.

### State Management (Zustand)
- Lightweight, scalable state management per feature
- Feature-specific stores live in `features/<feature>/store.ts`
- Global state managed through providers in `store/`

### API Handling (React Query)
- All API calls use `@tanstack/react-query`
- Query setup provided in `ReactQueryProvider`
- API logic co-located in feature folders (`features/<feature>/api.ts`)

### Routing (React Router)
- Route definitions in `routes/` directory
- Implement route guards for protected routes
- Use lazy loading for route components
- Keep route-specific components in feature folders

### UI System
- Tailwind CSS for utility-first styling
- shadcn/ui for accessible, reusable components
- Extensible through Tailwind configuration

## 🛠️ Available Scripts

- `pnpm dev` - Start development server with HMR
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

## 📚 Key Dependencies

- **Build Tool**: Vite
- **UI Library**: React 19
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Routing**: React Router
- **UI Components**: shadcn/ui + Radix UI
- **Development**: TypeScript, ESLint, Prettier

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration
- `postcss.config.js` - PostCSS configuration
- `components.json` - shadcn/ui configuration

## 📝 License

This project is private and proprietary.

## 🤝 Contributing

This is a private template. Please contact the maintainers for contribution guidelines.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You can start editing the page by modifying `src/App.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about the technologies used in this template, take a look at the following resources:

- [Vite Documentation](https://vitejs.dev/guide/) - learn about Vite features and API
- [React Router Documentation](https://reactrouter.com/) - learn about React Router
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS
- [shadcn/ui Documentation](https://ui.shadcn.com/) - learn about shadcn/ui components
