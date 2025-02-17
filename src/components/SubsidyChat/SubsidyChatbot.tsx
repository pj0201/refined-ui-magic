
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message } from "./types";
import { formatSubsidyResponse, isSubsidyRelatedQuestion } from "./utils";
import { useToast } from "@/components/ui/use-toast";

export const SubsidyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "補助金に関する質問をお気軽にどうぞ！",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = {
      type: "user" as const,
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!isSubsidyRelatedQuestion(userMessage.content)) {
        setMessages(prev => [...prev, {
          type: "bot",
          content: "申し訳ございません。私は補助金についての質問しかお答えできないのです。",
          timestamp: new Date()
        }]);
        return;
      }

      // TODO: ここにデジタル庁APIとの連携を実装
      // 実装までのモック応答
      const mockResponse = {
        name: "ものづくり補助金",
        description: "中小企業・小規模事業者の革新的なものづくりやサービスの開発を支援する制度です。",
        requirements: [
          "中小企業・小規模事業者であること",
          "革新的な事業計画を有すること",
          "一定の経営基盤を有すること"
        ],
        period: {
          start: "2024年4月1日",
          end: "2024年5月31日"
        },
        amount: "最大1,000万円",
        adoptionRate: "約40％",
        url: "https://www.meti.go.jp/..."
      };

      const response = formatSubsidyResponse(mockResponse);
      
      setMessages(prev => [...prev, {
        type: "bot",
        content: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('Error processing message:', error);
      toast({
        title: "エラーが発生しました",
        description: "しばらく待ってから再度お試しください。",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <div className="flex flex-col items-end gap-2">
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs">
            補助金のご質問はコチラ
          </div>
          <Button
            onClick={() => setIsOpen(true)}
            className="rounded-full w-12 h-12 shadow-lg bg-blue-600 hover:bg-blue-700"
          >
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-2rem)] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-bold text-lg">補助金相談Bot</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  message.type === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 whitespace-pre-wrap",
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  )}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="メッセージを入力..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" disabled={!input.trim() || isLoading}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
