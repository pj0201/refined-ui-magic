
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
      className="bg-white rounded-lg shadow-xl fixed"
      style={{ 
        width: '350px',
        maxWidth: 'calc(100vw - 2rem)',
        height: '500px',
        maxHeight: '80vh',
        bottom: style.bottom || '2rem', 
        right: style.right || '2rem', 
        zIndex: 1001,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'fixed', // Changed to valid Position type
        ...style
      }}
    >
      {/* ヘッダー */}
      <div className="flex items-center justify-between p-3 border-b bg-white">
        <h3 className="font-bold text-lg">省力化投資補助金相談Bot</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="ml-auto h-8 w-8"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* メッセージエリア - スクロール可能 */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-3 py-2">
          <ChatMessages messages={messages} />
        </div>
      </div>

      {/* 入力エリア - 下部に固定 */}
      <div className="border-t bg-white p-3 mt-auto">
        <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};
