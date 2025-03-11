
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
        style={style}
      >
        <HelpCircle className="w-5 h-5" />
      </Button>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-4rem)] flex flex-col fixed"
         style={{ bottom: '4rem', right: '1rem', zIndex: 100 }}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-lg">省力化投資補助金相談Bot</h3>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <ChatMessages messages={messages} />

      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
    </div>
  );
};
