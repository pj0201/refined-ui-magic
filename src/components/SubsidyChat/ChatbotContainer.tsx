
import { Button } from "@/components/ui/button";
import { HelpCircle, X } from "lucide-react";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import { Message } from "./types";

interface ChatbotContainerProps {
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  onToggle: () => void;
  onSendMessage: (message: string) => void;
}

export const ChatbotContainer = ({
  isOpen,
  messages,
  isLoading,
  onToggle,
  onSendMessage,
}: ChatbotContainerProps) => {
  if (!isOpen) {
    return (
      <div className="flex flex-col items-end gap-6">
        {/* 省力化投資補助金ラベル - 位置調整 */}
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs flex flex-col items-center">
          <span>省力化投資補助金</span>
          <span>一般形の質問はコチラ</span>
        </div>
        <Button
          onClick={onToggle}
          className="rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700"
        >
          <HelpCircle className="w-5 h-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-2rem)] flex flex-col">
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
