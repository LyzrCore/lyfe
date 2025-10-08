import PageLayout from "@/components/PageLayout";
import Markdown from "@/lyfe-shared/Markdown";
import React from "react";
import ChatPanelPage from "./ChatPanel";

const ChatPanelDocs: React.FC = () => {
  const content = `# ChatPanel Component

A comprehensive, feature-rich chat interface component designed for AI-powered applications. Built with React and TypeScript, it provides a complete chat experience with message display, input handling, file attachments, and real-time streaming capabilities.

## 🎯 Live Preview

Experience the ChatPanel component in action with a fully functional demo:

---`;
  const content2 = `## 💻 Code Preview

Here's the code used in the live preview above:

\`\`\`tsx
import React from "react";
import ChatPanel, { ChatPanelMessageType } from "@/lyfe-shared/ChatPanel";
import { Button } from "@/shadcn/components/ui/button";

const ChatPanelPage: React.FC = () => {
  // Helper to format date as "20 June, 2024 10:34 AM"
  const formatDate = React.useCallback((date: Date) => {
    const day = date.getUTCDate();
    const month = date.toLocaleString("en-US", {
      month: "long",
      timeZone: "UTC",
    });
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return \`\${day} \${month}, \${year} \${hours}:\${minutesStr} \${ampm}\`;
  }, []);

  const [chatMessages, setChatMessages] = React.useState<ChatPanelMessageType[]>(initialMessages);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendMessage = React.useCallback((query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery || isLoading) return;

    // Add user message
    const userMessage: ChatPanelMessageType = {
      role: "user",
      message: trimmedQuery,
      uid: uidCounterRef.current++,
      timestamp: formatDate(new Date()),
    };

    setChatMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate assistant response with streaming effect
    const fullMessage = "Thank you for your message! I'm a demo assistant. In a real implementation, I would process your query and provide a helpful response based on your input.";

    const assistantUid = uidCounterRef.current++;
    const timestamp = formatDate(new Date());

    // Wait 1 second before starting to stream
    setTimeout(() => {
      setIsLoading(false);

      // Add empty assistant message
      const assistantMessage: ChatPanelMessageType = {
        role: "assistant",
        message: "",
        uid: assistantUid,
        timestamp: timestamp,
      };
      setChatMessages((prev) => [...prev, assistantMessage]);

      // Stream the message character by character
      let currentIndex = 0;
      const streamInterval = setInterval(() => {
        currentIndex++;

        if (currentIndex <= fullMessage.length) {
          const partialMessage = fullMessage.substring(0, currentIndex);
          setChatMessages((prev) =>
            prev.map((msg) =>
              msg.uid === assistantUid
                ? { ...msg, message: partialMessage }
                : msg
            )
          );
        } else {
          clearInterval(streamInterval);
        }
      }, 30); // 30ms per character for smooth streaming
    }, 1000);
  }, [isLoading, formatDate]);

  return (
    <div className="flex-1 min-h-0 max-h-[100vh] grid place-content-center">
      <div className="min-h-0 max-w-[700px] max-h-[800px] h-[800px] overflow-auto border shadow-sm rounded-lg">
        <ChatPanel>
          <ChatPanel.Header className="flex items-center justify-between">
            <h1>Lyzr AI Studio</h1>
            <Button variant={"default"} size="sm">
              New Chat
            </Button>
          </ChatPanel.Header>
          
          <ChatPanel.MessageArea
            messages={chatMessages}
            className="px-4"
            emptyScreenLabel="No messages found"
            autoScrollToBottom
            isLoading={isLoading}
          />
          
          <ChatPanel.Footer
            files={[
              {
                label: "invoice_data.csv",
                type: "csv",
                icon: "📄",
              },
              {
                label: "report.pdf",
                type: "pdf",
                icon: "📕",
              },
              {
                label: "summary.xlsx",
                type: "excel",
                icon: "📊",
              },
            ]}
            onFileDelete={(idx) => {
              alert(\`File deleted \${idx}\`);
            }}
            onFileView={(idx) => {
              alert(\`Viewing file \${idx}\`);
            }}
          >
            <ChatPanel.MessageBar
              onSendMessage={handleSendMessage}
              placeholder="Ask me anything!"
              isDisabled={isLoading}
            />
          </ChatPanel.Footer>
        </ChatPanel>
      </div>
    </div>
  );
};
\`\`\`

## 📦 Installation

### Using Lyfe CLI (Recommended)

The easiest way to add ChatPanel to your project is using the Lyfe CLI:

\`\`\`bash
# Using pnpm (recommended)
pnpm dlx lyfe-cli add chat-panel

# Using npm
npx lyfe-cli add chat-panel

# Using yarn
yarn dlx lyfe-cli add chat-panel
\`\`\`

This command will:
- Install the ChatPanel component and its dependencies
- Add the necessary TypeScript types
- Set up the required UI components (Button, etc.)
- Create example usage files

### Manual Installation

If you prefer manual installation:

\`\`\`bash
# Install dependencies
pnpm add lucide-react

# Copy the component files
# (Copy ChatPanel.tsx, DotsLoader.tsx, LyzrLogo.tsx, Markdown.tsx to your project)
\`\`\`

## 🏗️ Component Architecture

The ChatPanel is built using the **Compound Component Pattern**, which provides a flexible and composable API. This pattern allows you to combine multiple sub-components to create a complete chat interface.

### Compound Component Structure

\`\`\`tsx
<ChatPanel>
  <ChatPanel.Header>...</ChatPanel.Header>
  <ChatPanel.MessageArea>...</ChatPanel.MessageArea>
  <ChatPanel.Footer>
    <ChatPanel.MessageBar />
  </ChatPanel.Footer>
</ChatPanel>
\`\`\`

### Sub-Components

#### 1. **ChatPanel** (Main Container)
- **Purpose**: Root container that provides the layout structure
- **Props**: 
  - \`className?: string\` - Additional CSS classes
  - \`children: React.ReactNode\` - Child components

#### 2. **ChatPanel.Header**
- **Purpose**: Header section for title, actions, and branding
- **Props**:
  - \`className?: string\` - Additional CSS classes
  - \`children: React.ReactNode\` - Header content

#### 3. **ChatPanel.MessageArea**
- **Purpose**: Scrollable container for displaying chat messages
- **Props**:
  - \`messages?: ChatPanelMessageType[]\` - Array of messages to display
  - \`className?: string\` - Additional CSS classes
  - \`messageClassName?: string | ((message: ChatPanelMessageType) => string)\` - Custom message styling
  - \`isLoading?: boolean\` - Shows loading indicator
  - \`autoScrollToBottom?: boolean\` - Auto-scroll to latest message
  - \`emptyScreenLabel?: string\` - Text shown when no messages
  - \`overrideNoMessageDisplay?: React.ReactNode\` - Custom empty state

#### 4. **ChatPanel.MessageBar**
- **Purpose**: Input field with send functionality
- **Props**:
  - \`onSendMessage: (query: string) => void\` - Callback when message is sent
  - \`isDisabled?: boolean\` - Disable input and send button
  - \`placeholder?: string\` - Input placeholder text
  - \`className?: string\` - Additional CSS classes

#### 5. **ChatPanel.Footer**
- **Purpose**: Footer container for message input and file attachments
- **Props**:
  - \`files?: ChatPanelFileType[]\` - Array of attached files
  - \`onFileDelete?: (idx: number) => void\` - Callback when file is deleted
  - \`onFileView?: (idx: number) => void\` - Callback when file is viewed
  - \`className?: string\` - Additional CSS classes
  - \`children: React.ReactNode\` - Footer content (usually MessageBar)

### Type Definitions

\`\`\`typescript
export type ChatPanelMessageType = {
  role: "assistant" | "user";
  message: string;
  uid: string | number;
  timestamp?: string;
};

export type ChatPanelFileType = {
  label: string;
  type?: string;
  icon?: string;
};
\`\`\`

### Benefits of Compound Pattern

1. **Flexibility**: Mix and match components as needed
2. **Composability**: Easy to customize layout and behavior
3. **Reusability**: Sub-components can be used independently
4. **Maintainability**: Clear separation of concerns
5. **Type Safety**: Full TypeScript support with proper prop types

### Usage Examples

#### Basic Chat
\`\`\`tsx
<ChatPanel>
  <ChatPanel.Header>
    <h2>Simple Chat</h2>
  </ChatPanel.Header>
  <ChatPanel.MessageArea messages={messages} />
  <ChatPanel.Footer>
    <ChatPanel.MessageBar onSendMessage={handleSend} />
  </ChatPanel.Footer>
</ChatPanel>
\`\`\`

#### Chat with Files
\`\`\`tsx
<ChatPanel>
  <ChatPanel.Header>
    <h2>Chat with Attachments</h2>
  </ChatPanel.Header>
  <ChatPanel.MessageArea messages={messages} />
  <ChatPanel.Footer
    files={files}
    onFileDelete={handleFileDelete}
    onFileView={handleFileView}
  >
    <ChatPanel.MessageBar onSendMessage={handleSend} />
  </ChatPanel.Footer>
</ChatPanel>
\`\`\`

#### Custom Styled Chat
\`\`\`tsx
<ChatPanel className="max-w-4xl mx-auto">
  <ChatPanel.Header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
    <h2>Custom Styled Chat</h2>
  </ChatPanel.Header>
  <ChatPanel.MessageArea 
    messages={messages}
    className="bg-gray-50"
    messageClassName={(msg) => msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-white'}
  />
  <ChatPanel.Footer className="bg-white border-t">
    <ChatPanel.MessageBar 
      onSendMessage={handleSend}
      className="bg-gray-100 rounded-full"
    />
  </ChatPanel.Footer>
</ChatPanel>
\`\`\`

---

Ready to build amazing chat experiences? The ChatPanel component provides everything you need for modern, interactive chat interfaces!`;

  return (
    <PageLayout breadcrumbs={[{ name: "ChatPanel", path: "/chat-panel" }]}>
      <div className="container relative">
        <div className="mx-auto flex max-w-[980px] flex-col items-start gap-2  md:flex-row md:justify-between md:gap-12 ">
          <div className="w-full">
            <Markdown>{content}</Markdown>

            {/* Live Preview Section */}
            <div className="my-12 p-8 bg-gray-50 rounded-lg border">
              <h2 className="text-2xl font-bold mb-6 text-center">
                🎯 Interactive Preview
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Experience the ChatPanel component with real-time messaging,
                file attachments, and all features in action.
              </p>
              <ChatPanelPage />
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  💡 Try sending a message to see the component in action! File
                  attachments are clickable and the interface is fully
                  interactive.
                </p>
              </div>
            </div>
            <Markdown>{content2}</Markdown>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ChatPanelDocs;
