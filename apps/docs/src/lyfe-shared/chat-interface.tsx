import React from "react";

// types
export declare type ChatInterfaceInterface = React.FC<ChatInterfaceProps> & {
  SessionPanel: React.FC<SessionPanelProps>;
  ChatPanel: React.FC<ChatPanelProps>;
  InstantQueriesPanel: React.FC<InstantQueriesPanelProps>;
};

export declare type ChatInterfaceProps = {
  children?: React.ReactNode;
  className?: string;
};

export declare type SessionPanelProps = {
  className?: string;
};

export declare type ChatPanelProps = {
  children?: React.ReactNode;
  className?: string;
};

export declare type ChatBarProps = {
  children?: React.ReactNode;
  className?: string;
};

export declare type InstantQueriesPanelProps = {
  children?: React.ReactNode;
  className?: string;
};

// components

const ChatInterface: ChatInterfaceInterface = ({ children, className }) => {
  return <div className={`flex flex-wrap ${className}`}>{children}</div>;
};

const SessionPanel: React.FC<SessionPanelProps> = ({ className }) => {
  return (
    <div className={`flex-1 min-w-[200px] shrink-0 ${className}`}>
      SessionPanel
    </div>
  );
};
ChatInterface.SessionPanel = SessionPanel;

const ChatPanel: React.FC<ChatPanelProps> = ({ className }) => {
  return <div className={`flex-4 shrink-1 ${className}`}>ChatPanel</div>;
};
ChatInterface.ChatPanel = ChatPanel;

const InstantQueriesPanel: React.FC<InstantQueriesPanelProps> = ({
  className,
}) => {
  return (
    <div className={`flex-1 min-w-[200px] shrink-0 ${className}`}>
      InstantQueriesPanel
    </div>
  );
};
ChatInterface.InstantQueriesPanel = InstantQueriesPanel;

export default ChatInterface;
