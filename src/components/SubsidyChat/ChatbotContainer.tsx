
import { Button } from "@/components/ui/button";
import { HelpCircle, X } from "lucide-react";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Message } from "./types";
import { CSSProperties } from "react";

interface ChatbotContainerProps {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  onToggle: () => void;
  onSendMessage: (message: string) => void;
  style?: CSSProperties;
  className?: string;
}

export const ChatbotContainer = ({
  isOpen,
  messages,
  isLoading,
  onToggle,
  onSendMessage,
  style = {},
  className = "",
}: ChatbotContainerProps) => {
  if (!isOpen) {
    return (
      <Button
        onClick={onToggle}
        className={`rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700 fixed ${className}`}
        style={{ ...style, zIndex: 1000 }}
      >
        <HelpCircle className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <div 
      className="bg-white rounded-lg shadow-xl flex flex-col fixed"
      style={{ 
        width: '350px',
        maxWidth: 'calc(100vw - 2rem)',
        bottom: '5rem', 
        right: '1rem', 
        zIndex: 1000,
        height: '500px',
        maxHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b relative">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-lg">省力化投資補助金相談Bot</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="z-50 absolute top-3 right-3"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <ChatMessages messages={messages} />
      </div>

      {/* Input */}
      <div className="border-t bg-white p-3 sticky bottom-0 mt-auto">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};
