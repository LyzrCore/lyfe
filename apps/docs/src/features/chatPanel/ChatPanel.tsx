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
    return `${day} ${month}, ${year} ${hours}:${minutesStr} ${ampm}`;
  }, []);

  const initialMessages = React.useMemo<ChatPanelMessageType[]>(() => {
    return [
      {
        role: "user",
        message: "Hi, can you help me with invoice processing?",
        uid: 1,
        timestamp: formatDate(new Date("2025-10-06T10:00:00Z")),
      },
      {
        role: "assistant",
        message: "Sure! What do you need to know about invoice processing?",
        uid: 2,
        timestamp: formatDate(new Date("2025-10-06T10:01:00Z")),
      },
      {
        role: "user",
        message: "How do I get the complete list of invoices?",
        uid: 3,
        timestamp: formatDate(new Date("2025-10-06T10:02:00Z")),
      },
      {
        role: "assistant",
        message:
          "You can use the `/collections/get-all-data` endpoint to fetch all invoices along with clients and stats.",
        uid: 4,
        timestamp: formatDate(new Date("2025-10-06T10:03:00Z")),
      },
      {
        role: "user",
        message: "What other invoice-related APIs are available?",
        uid: 5,
        timestamp: formatDate(new Date("2025-10-06T10:04:00Z")),
      },
      {
        role: "assistant",
        message:
          "There are APIs for human review, escalation management, real-time processing, and client-specific invoice data.",
        uid: 6,
        timestamp: formatDate(new Date("2025-10-06T10:05:00Z")),
      },
      {
        role: "user",
        message: "Can you list the invoice features and flows?",
        uid: 7,
        timestamp: formatDate(new Date("2025-10-06T10:06:00Z")),
      },
      {
        role: "assistant",
        message:
          "Sure! Features include data ingestion, real-time monitoring, human review, escalation, error handling, and resolution workflows.",
        uid: 8,
        timestamp: formatDate(new Date("2025-10-06T10:07:00Z")),
      },
      {
        role: "user",
        message:
          "What label should I use for the active email processing UI panel?",
        uid: 9,
        timestamp: formatDate(new Date("2025-10-06T10:08:00Z")),
      },
      {
        role: "assistant",
        message:
          "A good UI label could be 'Active Email Processing' or 'Emails in Processing' for clarity and brevity.",
        uid: 10,
        timestamp: formatDate(new Date("2025-10-06T10:09:00Z")),
      },
      {
        role: "user",
        message:
          "I want to visualize escalation trends data. What chart type would you recommend?",
        uid: 11,
        timestamp: formatDate(new Date("2025-10-06T10:10:00Z")),
      },
      {
        role: "assistant",
        message:
          "A vertical bar (column) chart is ideal to compare the counts over the last 7 and 30 days and indicate the trend visually.",
        uid: 12,
        timestamp: formatDate(new Date("2025-10-06T10:11:00Z")),
      },
      {
        role: "user",
        message: "Can you create a 20-message chat array example?",
        uid: 13,
        timestamp: formatDate(new Date("2025-10-06T10:12:00Z")),
      },
      {
        role: "assistant",
        message:
          "Yes, here's an example including both user and assistant roles with timestamps and unique UIDs.",
        uid: 14,
        timestamp: formatDate(new Date("2025-10-06T10:13:00Z")),
      },
      {
        role: "user",
        message: "Thanks, that helps a lot!",
        uid: 15,
        timestamp: formatDate(new Date("2025-10-06T10:14:00Z")),
      },
      {
        role: "assistant",
        message: "You're welcome! Let me know if you need further assistance.",
        uid: 16,
        timestamp: formatDate(new Date("2025-10-06T10:15:00Z")),
      },
      {
        role: "user",
        message: "How do I submit a human review decision?",
        uid: 17,
        timestamp: formatDate(new Date("2025-10-06T10:16:00Z")),
      },
      {
        role: "assistant",
        message:
          "Use `POST /collections/submit-review` with your review details, comments, and corrections.",
        uid: 18,
        timestamp: formatDate(new Date("2025-10-06T10:17:00Z")),
      },
      {
        role: "user",
        message: "Great! And how to check real-time processing status?",
        uid: 19,
        timestamp: formatDate(new Date("2025-10-06T10:18:00Z")),
      },
      {
        role: "assistant",
        message:
          "Polling `GET /collections/processing-status` every few seconds gives live updates on processing jobs.",
        uid: 20,
        timestamp: formatDate(new Date("2025-10-06T10:19:00Z")),
      },
    ];
  }, [formatDate]);

  const [chatMessages, setChatMessages] =
    React.useState<ChatPanelMessageType[]>(initialMessages);
  const [isLoading, setIsLoading] = React.useState(false);
  const uidCounterRef = React.useRef(21);
  const streamingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleSendMessage = React.useCallback(
    (query: string) => {
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
      const fullMessage =
        "Thank you for your message! I'm a demo assistant. In a real implementation, I would process your query and provide a helpful response based on your input.";

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

        streamingTimeoutRef.current = streamInterval;
      }, 1000);
    },
    [isLoading, formatDate]
  );

  // Cleanup streaming timeout on unmount
  React.useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearInterval(streamingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="flex-1 min-h-0 max-h-[100vh] grid place-content-center">
      <div className="min-h-0 max-w-[700px] max-h-[800px] h-[800px]  overflow-auto border shadow-sm rounded-lg">
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
          ></ChatPanel.MessageArea>
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
              alert(`File deleted ${idx}`);
            }}
            onFileView={(idx) => {
              alert(`Viewing file ${idx}`);
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

export default ChatPanelPage;
