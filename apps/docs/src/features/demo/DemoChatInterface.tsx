import PageLayout from "@/components/PageLayout";
import ChatInterface from "@/lyfe-shared/chat-interface";
import React from "react";

const DemoChatInterface: React.FC = () => {
  return (
    <PageLayout
      breadcrumbs={[{ name: "Chat Interface", path: "/chat-interface" }]}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl">Chat Interface</h1>
        <p>
          The Chat Interface is a components template that allows you to create
          a chat interface for your application.
        </p>
        <code>pnpm dlx lyfe-cli add chat-interface</code>
      </div>
      <div className="my-10 border border-gray-200 rounded-lg ">
        <ChatInterface>
          <ChatInterface.SessionPanel className="border-r-1 border-gray-300"></ChatInterface.SessionPanel>
          <ChatInterface.ChatPanel>
            
          </ChatInterface.ChatPanel>
          <ChatInterface.InstantQueriesPanel></ChatInterface.InstantQueriesPanel>
        </ChatInterface>
      </div>
    </PageLayout>
  );
};

export default DemoChatInterface;
