
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
      content: "省力化投資補助金について質問をお気軽にどうぞ！\n\n【質問例】\n・補助金額はいくらですか？\n・申請期間はいつからですか？\n・どんな企業が対象ですか？",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Styles for positioning chatbots
  const styles = {
    // Small subsidy chatbot (Dify)
    smallSubsidyLabel: { 
      bottom: "15rem", 
      right: "1rem", 
      zIndex: 1000 
    },
    
    // Investment subsidy chatbot (custom)
    investmentSubsidyLabel: { 
      bottom: "7rem", 
      right: "1rem", 
      zIndex: 1000 
    }, 
    investmentSubsidyIcon: { 
      bottom: "2rem", 
      right: "1rem", 
      zIndex: 1000 
    }
  };

  // 通常のチャットボット表示を管理するための関数
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
      // Difyを使用しますが、UIは既存のものを使用します
      console.log('省力化投資補助金の質問を処理:', userMessage.content);
      
      // 元々はここでAPIリクエストを送信していましたが、
      // 実際にはDifyが裏側で処理するため、ダミーレスポンスを生成
      const subsidyInfo = await generateSubsidyResponse(userMessage.content);
      console.log('生成された回答:', subsidyInfo);
      
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
      {/* 小規模持続化補助金ラベル */}
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
