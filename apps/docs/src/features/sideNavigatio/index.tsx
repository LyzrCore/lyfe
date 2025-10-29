import PageLayout from "@/components/PageLayout";
import Markdown from "@/lyfe-shared/Markdown";
import React from "react";

const SideNavigationPage: React.FC = () => {
  const content = `# Sidebar Components

A collection of pre-built, customizable sidebar components.
---`;

  const content2 = `## 💻 Code Preview

Here's the code used in the live preview above:

\`\`\`tsx
<Sidebar collapsible="icon" {...props}>
      <SidebarLogoHeader
        logo={<LyzrLogo width={32} height={32} />}
        name="Lyfe by lyzr.ai"
        href="https://www.lyzr.ai/"
      />
      <SidebarContent>
        <SidebarLinks links={PlatformRouteDefinition as SidebarLinkType[]} />
        <SidebarLinks
          links={ComponentRouteDefinition as SidebarLinkType[]}
          label="Components"
        />
        {/* <SidebarItems
          items={[
            {
              label: "Project 123",
              isActive: true,
              icon: FileIcon,
              onClick: () => alert("Clicked Project 123"),
            },
          ]}
        /> */}
      </SidebarContent>
      <SidebarUserProfile
        user={{ name: "Lyfe Support", email: "kanahaiya@lyzr.ai" }}
        onLogout={() => alert("You are not allowed to do so!! :)")}
        additionalActions={
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => alert("Coming Soon!")}>
              <Sparkle /> Request new feature
            </DropdownMenuItem>
          </DropdownMenuGroup>
        }
      />
    </Sidebar>
\`\`\`

## 📦 Installation

### Using Lyfe CLI (Recommended)

The easiest way to add Sidebar Components to your project is using the Lyfe CLI:

\`\`\`bash
# Using pnpm (recommended)
pnpm dlx lyfe-cli add sidebar-components

# Using npm
npx lyfe-cli add sidebar-components

# Using yarn
yarn dlx lyfe-cli add sidebar-components
\`\`\`

This command will:
- Install the Sidebar Components and their dependencies (lucide-react, Radix UI primitives)
- Add the necessary TypeScript types
- Set up the required UI components (Avatar, DropdownMenu, Sidebar, etc.)
\`\`\`

## 🏗️ Component Architecture

The Sidebar Components are built as **standalone, composable components** that can be used independently or together to create a complete sidebar experience.

### Available Components

#### 1. **SidebarLogoHeader**

A header component for displaying your application logo and name at the top of the sidebar.

**Props**:
\`\`\`typescript
type SidebarLogoHeaderProps = {
  classname?: string;      // Additional CSS classes
  logo?: React.ReactNode;  // Logo element (icon/image)
  name: string;            // Application name
  href?: string;           // Optional link URL
};
\`\`\`

**Features**:
- Optional logo/branding
- Clickable link support
- Seamless integration with Sidebar structure
- Responsive design

**Example**:
\`\`\`tsx
<SidebarLogoHeader
  classname="border-b"
  logo={<YourLogoIcon />}
  name="My App"
  href="/"
/>
\`\`\`

#### 2. **SidebarUserProfile**

A comprehensive user profile component for the sidebar footer with avatar, user information, and dropdown menu.

**Props**:
\`\`\`typescript
type SidebarUserProfileProps = {
  classname?: string;
  user: {
    name: string;      // User's full name
    email?: string;    // User's email
    imgSrc?: string;   // Profile image URL
  };
  onLogout?: () => void;              // Logout handler
  additionalActions?: React.ReactNode; // Custom action items
};
\`\`\`

**Features**:
- User avatar with fallback to initials
- Dropdown menu with user info
- Logout functionality
- Support for custom action items
- Mobile-responsive positioning
- Accessible dropdown menu

**Example**:
\`\`\`tsx
<SidebarUserProfile
  user={{
    name: "John Doe",
    email: "john@example.com",
    imgSrc: "https://example.com/avatar.jpg",
  }}
  onLogout={() => console.log("Logged out")}
  additionalActions={<YourCustomActions />}
/>
\`\`\`

#### 3. **SidebarLinks**

A navigation component for displaying link items in the sidebar.

**Props**:
\`\`\`typescript
type SidebarLinksProps = {
  label?: string;              // Group label
  classname?: string;          // Additional CSS classes
  links: SidebarLinkType[];   // Array of link items
};

type SidebarLinkType = {
  name: string;         // Link text
  icon: LucideIcon;     // Icon component from lucide-react
  path: string;         // Link URL
};
\`\`\`

**Features**:
- Icon support from lucide-react
- Active state highlighting based on current pathname
- Optional group label
- Tooltip support for icon-only mode

**Example**:
\`\`\`tsx
<SidebarLinks
  label="Navigation"
  links={[
    { name: "Home", icon: Home, path: "/" },
    { name: "Projects", icon: FolderOpen, path: "/projects" },
  ]}
/>
\`\`\`

#### 4. **SidebarItems**

A flexible component for displaying action items with click handlers.

**Props**:
\`\`\`typescript
type SidebarItemProps = {
  classname?: string;          // Additional CSS classes
  label?: string;              // Group label
  items: SidebarItemType[];   // Array of items
};

type SidebarItemType = {
  label: string;              // Item text
  icon?: LucideIcon;          // Optional icon
  onClick?: () => void;       // Click handler
  isActive?: boolean;         // Active state
  cta?: React.ReactNode;      // Custom call-to-action element
};
\`\`\`

**Features**:
- Click event handlers
- Active state support
- Icon support
- Custom CTA elements
- Smooth hover animations
- Supports both interactive and display-only items

**Example**:
\`\`\`tsx
<SidebarItems
  label="Quick Actions"
  items={[
    { label: "New Project", icon: Plus, onClick: () => createProject() },
    { label: "Settings", icon: Settings, onClick: () => openSettings(), isActive: true },
  ]}
/>
\`\`\`

### Benefits

1. **Modularity**: Use components independently or together
2. **Flexibility**: Mix and match to create custom sidebar layouts
3. **Type Safety**: Full TypeScript support with proper prop types
4. **Accessibility**: Built on Radix UI for keyboard navigation and screen readers
5. **Customization**: Extensive styling options via className props
6. **Mobile Responsive**: Adaptive behavior for different screen sizes

### Usage Examples

#### Basic Sidebar with Navigation

\`\`\`tsx
<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarLogoHeader name="My App" />
      <SidebarLinks links={navLinks} />
    </SidebarContent>
    <SidebarUserProfile user={user} onLogout={handleLogout} />
  </Sidebar>
</SidebarProvider>
\`\`\`

#### Sidebar with Actions

\`\`\`tsx
<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      <SidebarLogoHeader logo={<Logo />} name="Dashboard" />
      <SidebarLinks label="Navigation" links={menuItems} />
      <SidebarItems label="Actions" items={actionItems} />
    </SidebarContent>
    <SidebarUserProfile user={user} />
  </Sidebar>
</SidebarProvider>
\`\`\`

#### Custom Styled Sidebar

\`\`\`tsx
<SidebarProvider>
  <Sidebar className="w-80 bg-gradient-to-b from-blue-50 to-white">
    <SidebarContent className="p-4">
      <SidebarLogoHeader 
        classname="mb-8 border-b-2 border-blue-200" 
        logo={<Logo />} 
        name="Enterprise App" 
      />
      <SidebarLinks 
        label="Main Menu" 
        links={navigation}
        classname="space-y-2"
      />
    </SidebarContent>
    <SidebarUserProfile
      classname="border-t-2 border-gray-200"
      user={user}
      onLogout={handleLogout}
    />
  </Sidebar>
</SidebarProvider>
\`\`\`

---`;

  return (
    <PageLayout
      breadcrumbs={[
        { name: "Sidebar Components", path: "/sidebar-components" },
      ]}
    >
      <div className="container relative">
        <div className="mx-auto flex max-w-[980px] flex-col items-start gap-2 md:flex-row md:justify-between md:gap-12">
          <div className="w-full">
            <Markdown>{content}</Markdown>
            <Markdown>{content2}</Markdown>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default SideNavigationPage;
