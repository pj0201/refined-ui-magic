
import { useState, useEffect } from "react";
import { DifyConfig } from "./DifyConfig";
import { ChatbotContainer } from "./ChatbotContainer";
import { Message } from "./types";
import { formatSubsidyResponse, isSubsidyRelatedQuestion } from "./utils";
import { generateSubsidyResponse } from "./api";
import { useToast } from "@/components/ui/use-toast";

export const SubsidyChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content: "補助金に関する質問をお気軽にどうぞ！\n\n【質問例】\n・補助金額はいくらですか？\n・申請期間はいつからですか？\n・どんな企業が対象ですか？",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // チャットボットの配置を調整するためのスタイル
  const styles = {
    smallSubsidyLabel: { bottom: "15rem", right: "1rem", zIndex: 1000 },
    smallSubsidyIcon: { bottom: "11rem", right: "1rem", zIndex: 1000 },
    investmentSubsidyLabel: { bottom: "7rem", right: "1rem", zIndex: 1000 }, 
    investmentSubsidyIcon: { bottom: "2rem", right: "1rem", zIndex: 1000 }
  };

  // Difyチャットボットのスタイルを調整するための効果
  useEffect(() => {
    const adjustDifyChat = () => {
      const difyChatWindow = document.getElementById('dify-chatbot-bubble-window');
      const closeButton = difyChatWindow?.querySelector('.dify-chatbot-window-close-btn');
      
      if (difyChatWindow) {
        difyChatWindow.style.maxHeight = '80vh';
        difyChatWindow.style.height = '500px';
        difyChatWindow.style.borderRadius = '0.5rem';
        
        if (closeButton) {
          (closeButton as HTMLElement).style.zIndex = '9999';
          (closeButton as HTMLElement).style.display = 'flex';
          (closeButton as HTMLElement).style.visibility = 'visible';
          (closeButton as HTMLElement).style.opacity = '1';
          (closeButton as HTMLElement).style.position = 'absolute';
          (closeButton as HTMLElement).style.top = '10px';
          (closeButton as HTMLElement).style.right = '10px';
        }
      }
    };
    
    // 定期的に調整を実行
    const interval = setInterval(adjustDifyChat, 1000);
    
    // DOMの変更を監視して調整を適用
    const observer = new MutationObserver(adjustDifyChat);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const handleSendMessage = async (message: string) => {
    if (isLoading) return;

    const userMessage = {
      type: "user" as const,
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (!isSubsidyRelatedQuestion(userMessage.content)) {
        // 一般的な質問への対応を改善
        const generalResponse = "申し訳ありません。具体的な補助金に関する情報についてお答えできます。例えば以下のような質問をお試しください：\n\n・補助金の申請要件は？\n・補助対象となる経費は？\n・補助率はどのくらいですか？";
        
        setMessages(prev => [...prev, {
          type: "bot",
          content: generalResponse,
          timestamp: new Date()
        }]);
        setIsLoading(false);
        return;
      }

      console.log('補助金関連の質問を処理します:', userMessage.content);
      const subsidyInfo = await generateSubsidyResponse(userMessage.content);
      console.log('生成された補助金情報:', subsidyInfo);
      
      const response = formatSubsidyResponse(subsidyInfo);
      
      setMessages(prev => [...prev, {
        type: "bot",
        content: response,
        timestamp: new Date()
      }]);
    } catch (error) {
      console.error('メッセージ処理中にエラーが発生:', error);
      setMessages(prev => [...prev, {
        type: "bot",
        content: "申し訳ございません。現在システムに問題が発生しています。時間をおいて再度お試しください。",
        timestamp: new Date()
      }]);
      
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
      {/* 小規模持続化補助金ラベル - 固定位置 */}
      <div 
        className="fixed z-50 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs flex flex-col items-center"
        style={styles.smallSubsidyLabel}
      >
        <span>小規模持続化補助金</span>
        <span>の質問はコチラ</span>
      </div>
      
      {/* 小規模持続化補助金アイコン（Dify） */}
      <DifyConfig />
      
      {/* 省力化投資補助金ラベル */}
      <div 
        className="fixed z-50 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs flex flex-col items-center"
        style={styles.investmentSubsidyLabel}
      >
        <span>省力化投資補助金</span>
        <span>一般形の質問はコチラ</span>
      </div>
      
      {/* 省力化投資補助金アイコン */}
      <ChatbotContainer
        isOpen={isOpen}
        messages={messages}
        isLoading={isLoading}
        onToggle={() => setIsOpen(!isOpen)}
        onSendMessage={handleSendMessage}
        style={styles.investmentSubsidyIcon}
        className="investment-subsidy-bot"
      />
    </div>
  );
};
