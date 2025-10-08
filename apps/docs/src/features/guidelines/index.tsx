import PageLayout from "@/components/PageLayout";
import Markdown from "@/lyfe-shared/Markdown";
import React from "react";

const Guidelines: React.FC = () => {
  const content = `# Coding Guidelines

Welcome to the coding guidelines for Lyfe AI Agent Template. These guidelines ensure consistent, maintainable, and high-quality code across the project.

## 📁 Folder and File Conventions

### Directory Structure

\`\`\`
feature/
├── components/           # Feature-specific components
│   ├── index.ts         # Public exports
│   └── Component.tsx    # Component implementation
├── hooks/               # Custom hooks
│   ├── index.ts         # Public exports
│   └── useHook.ts       # Hook implementation
├── types/               # TypeScript types
│   └── index.ts         # Type definitions
├── utils/               # Utility functions
│   └── index.ts         # Helper functions
└── index.ts             # Feature public API
\`\`\`

### Naming Conventions

- **Files**: PascalCase for components, camelCase for others
  - \`Button.tsx\` for components
  - \`useAuth.ts\` for hooks
  - \`formatDate.ts\` for utilities

- **Components**: PascalCase
  - \`Button\`, \`UserProfile\`, \`ChatMessage\`

- **Hooks**: camelCase with 'use' prefix
  - \`useAuth\`, \`useChat\`, \`useTheme\`

- **Types/Interfaces**: PascalCase
  - \`UserProfile\`, \`ChatMessage\`, \`ApiResponse\`

## 🧩 Component Structure

### 1. Component Organization

\`\`\`typescript
// Button.tsx
import { cn } from "@/lib/utils"
import { ButtonProps } from "./types"

export const Button = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "base-styles",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
\`\`\`

### 2. Props Interface

\`\`\`typescript
// types.ts
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
}
\`\`\`

### 3. Component Documentation

\`\`\`typescript
/**
 * Button component for user interactions
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 */
export const Button = ({ ... }) => { ... }
\`\`\`

## 🎣 Hooks and Logic

### 1. Custom Hooks

\`\`\`typescript
// useAuth.ts
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Auth logic
  }, [])

  return {
    user,
    loading,
    login: async () => { ... },
    logout: async () => { ... }
  }
}
\`\`\`

### 2. Data Fetching

\`\`\`typescript
// useUsers.ts
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users')
      return response.json()
    }
  })
}
\`\`\`

## 📦 State Management

### 1. Local State

- Use \`useState\` for simple state
- Use \`useReducer\` for complex state
- Keep state as close as possible to where it's used

### 2. Global State

\`\`\`typescript
// store.ts
interface AppState {
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme })
}))
\`\`\`

## 🌐 API and Server Communication

### 1. API Client

\`\`\`typescript
// api/client.ts
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const apiClient = {
  get: <T>(url: string) => api.get<T>(url),
  post: <T>(url: string, data: unknown) => api.post<T>(url, data),
  // ... other methods
}
\`\`\`

### 2. API Hooks

\`\`\`typescript
// hooks/useApi.ts
export const useApi = <T>(url: string) => {
  return useQuery({
    queryKey: [url],
    queryFn: () => apiClient.get<T>(url)
  })
}
\`\`\`

## 📘 TypeScript Best Practices

### 1. Type Definitions

\`\`\`typescript
// types.ts
export type UserRole = 'admin' | 'user' | 'guest'

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  createdAt: Date
}

export type UserResponse = ApiResponse<User>
\`\`\`

### 2. Type Guards

\`\`\`typescript
// utils/typeGuards.ts
export const isUser = (value: unknown): value is User => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'email' in value
  )
}
\`\`\`

## 📋 Summary Checklist

### Code Quality
- [ ] Follows naming conventions
- [ ] Properly typed with TypeScript
- [ ] Includes error handling
- [ ] Has appropriate tests
- [ ] Follows accessibility guidelines

### Performance
- [ ] Implements proper memoization
- [ ] Uses code splitting
- [ ] Optimizes images and assets
- [ ] Implements proper caching

### Documentation
- [ ] Includes JSDoc comments
- [ ] Has README.md
- [ ] Documents props and types
- [ ] Includes usage examples

### Testing
- [ ] Unit tests for utilities
- [ ] Component tests
- [ ] Integration tests
- [ ] E2E tests where needed

---

Ready to start coding? Head to the [Components](/components) section to explore our UI library!`;

  return (
    <PageLayout breadcrumbs={[{ name: "Guidelines", path: "/guidelines" }]}>
      <div className="container relative">
        <div className="mx-auto flex max-w-[980px] flex-col items-start gap-2  md:flex-row md:justify-between md:gap-12 ">
          <Markdown>{content}</Markdown>
        </div>
      </div>
    </PageLayout>
  );
};

export default Guidelines;
