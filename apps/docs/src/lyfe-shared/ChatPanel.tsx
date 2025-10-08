import { Button } from "@/shadcn/components/ui/button";
import { SendIcon, XIcon } from "lucide-react";
import React from "react";
import { DotsLoader } from "./DotsLoader";
import LyzrLogo from "./LyzrLogo";
import Markdown from "./Markdown";

export type ChatPanelMessageType = {
  role: "assistant" | "user";
  message: string;
  uid: string | number;
  timestamp?: string;
};

export type ChatPanelProps = {
  className?: string;
  children: React.ReactNode;
};

export type MessagesProps = {
  className?: string;
  messageClassName?: string | ((message: ChatPanelMessageType) => string);
  messages?: ChatPanelMessageType[];
  overrideNoMessageDisplay?: React.ReactNode;
  emptyScreenLabel?: string;
  isLoading?: boolean;
  autoScrollToBottom?: boolean;
  children?: React.ReactNode;
};

export type HeaderProps = { className?: string; children: React.ReactNode };

export type MessageBarProps = {
  className?: string;
  onSendMessage: (query: string) => void;
  isDisabled?: boolean;
  placeholder?: string;
};

export type ChatPanelFileType = {
  label: string;
  type?: string;
  icon?: string;
};

export type FooterProps = {
  className?: string;
  children: React.ReactNode;
  files?: ChatPanelFileType[];
  onFileDelete?: (idx: number) => void;
  onFileView?: (idx: number) => void;
};

export type ChatPanelInterface = React.FC<ChatPanelProps> & {
  MessageArea: React.FC<MessagesProps>;
  Header: React.FC<HeaderProps>;
  MessageBar: React.FC<MessageBarProps>;
  Footer: React.FC<FooterProps>;
};

const ChatPanel: ChatPanelInterface = ({ className = "", children }) => {
  return (
    <div className={`flex flex-col min-h-0 h-full ${className}`}>
      {children}
    </div>
  );
};

const Header: React.FC<HeaderProps> = ({ className = "", children }) => {
  return <div className={`p-3 border-b ${className}`}>{children}</div>;
};
ChatPanel.Header = Header;

const Message: React.FC<ChatPanelMessageType & { className?: string }> = ({
  message,
  className = "",
  role,
  timestamp,
}) => {
  // Validate message content
  const safeMessage = message ?? "";

  return (
    <div
      className={`w-fit ${className} ${role === "assistant" ? "" : "self-end"} max-w-[90%] sm:max-w-[80%] md:max-w-[70%]`}
    >
      {role === "assistant" && <div></div>}
      <div
        className={`${role !== "assistant" ? "bg-gray-100  p-3" : "bg-white text-gray-700"} mb-1  rounded-md`}
      >
        <Markdown>{safeMessage}</Markdown>
      </div>
      {timestamp && (
        <p
          className={`${role === "assistant" ? "" : "text-right mt-[-0px]"} text-xs text-gray-500`}
        >
          {timestamp}
        </p>
      )}
    </div>
  );
};

const Messages: React.FC<MessagesProps> = ({
  className = "",
  messages,
  messageClassName,
  overrideNoMessageDisplay,
  emptyScreenLabel,
  autoScrollToBottom,
  isLoading,
  children,
}) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const userScrolledRef = React.useRef(false);

  const handleScrollToBottom = React.useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Track user scroll behavior
  const handleScroll = React.useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 10;
    userScrolledRef.current = !isAtBottom;
  }, []);

  React.useEffect(() => {
    // Only auto-scroll if enabled and user hasn't manually scrolled up
    if (autoScrollToBottom && !userScrolledRef.current) {
      handleScrollToBottom();
    }
  }, [autoScrollToBottom, handleScrollToBottom, messages]);

  return (
    <div
      ref={containerRef}
      className={`flex-1 min-h-0 overflow-auto flex flex-col gap-2 ${className}`}
      onScroll={handleScroll}
    >
      {messages?.length
        ? messages?.map((message) => (
            <Message
              key={message?.uid}
              {...message}
              className={
                typeof messageClassName === "string"
                  ? messageClassName
                  : messageClassName?.(message)
              }
            />
          ))
        : (overrideNoMessageDisplay ?? (
            <div className="grid place-content-center h-full text-2xl bg-gray-100 text-gray-700">
              {emptyScreenLabel ?? "No messages"}
            </div>
          ))}
      <div ref={scrollRef} />
      {isLoading && (
        <div className="flex items-center gap-2 mb-7">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <LyzrLogo width={20} height={20} className="text-white" />
          </div>
          <DotsLoader />
        </div>
      )}
      {children}
    </div>
  );
};
ChatPanel.MessageArea = Messages;

const MessageBar: React.FC<MessageBarProps> = ({
  className = "",
  placeholder,
  isDisabled,
  onSendMessage,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleMessageSend = React.useCallback(() => {
    if (isDisabled) return;

    const message = inputRef.current?.value?.trim();
    if (message) {
      onSendMessage(message);
      // Clear input after sending
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [isDisabled, onSendMessage]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleMessageSend();
      }
    },
    [handleMessageSend]
  );

  return (
    <div className={`${className} flex items-center gap-2 flex-1`}>
      <input
        ref={inputRef}
        className="flex-1 outline-none"
        placeholder={placeholder ?? "Type your query!"}
        disabled={isDisabled}
        onKeyDown={handleKeyDown}
        aria-label="Message input"
      />
      <Button
        variant="secondary"
        className="rounded-full cursor-pointer"
        disabled={isDisabled}
        onClick={handleMessageSend}
        aria-label="Send message"
      >
        <SendIcon />
      </Button>
    </div>
  );
};
ChatPanel.MessageBar = MessageBar;

const Footer: React.FC<FooterProps> = ({
  className = "",
  children,
  files,
  onFileDelete,
  onFileView,
}) => {
  return (
    <div className={`${className} px-3  w-full  mb-4 flex `}>
      <div
        className={`${files?.length ? "rounded-xl" : "rounded-full"} border w-full px-3 py-2 flex flex-col`}
      >
        <div>
          {!!files?.length && (
            <div className="flex gap-2 flex-nowrap min-w-0 overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {files.map((file, index) => (
                <div
                  key={file.label}
                  className="bg-gray-50 hover:bg-gray-200 p-2 rounded-md flex gap-1 cursor-pointer transition-all duration-300"
                  onClick={() => onFileView?.(index)}
                >
                  {file?.icon}
                  <p className="text-sm">
                    {file.label} <br />
                    <span className="text-xs text-gray-500">{file?.type}</span>
                  </p>
                  <XIcon
                    className="w-4 h-4 cursor-pointer ml-2 my-auto"
                    onClick={(e) => (
                      e?.stopPropagation(), onFileDelete?.(index)
                    )}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};
ChatPanel.Footer = Footer;

export default ChatPanel;
