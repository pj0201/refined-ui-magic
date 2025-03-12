
import { useState, useEffect } from "react";
import { DifyConfig } from "./DifyConfig";
import { ChatbotContainer } from "./ChatbotContainer";
import { Message } from "./types";
import { useToast } from "@/components/ui/use-toast";
import { CSSProperties } from "react";

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

  // マウント時に一度だけ実行するセットアップ
  useEffect(() => {
    console.log("SubsidyChatbot component mounted");
    
    // DOMに直接アクセスしてチャットボタンの表示を確認
    const checkDifyButton = () => {
      const difyButton = document.getElementById('dify-chatbot-bubble-button');
      if (difyButton) {
        difyButton.style.display = 'block';
        difyButton.style.visibility = 'visible';
        difyButton.style.opacity = '1';
        difyButton.style.zIndex = '1000';
        console.log("Dify button visibility enforced from SubsidyChatbot");
      }
    };
    
    // 初期チェックを実行
    setTimeout(checkDifyButton, 2000);
    
    // 定期的にチェック
    const interval = setInterval(checkDifyButton, 5000);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  // チャットボットトグル関数
  const handleToggle = () => {
    console.log("Toggle chatbot, current state:", isOpen, "changing to:", !isOpen);
    setIsOpen(!isOpen);
  };

  // Styles for positioning chatbots
  const styles: {
    smallSubsidyLabel: CSSProperties;
    investmentSubsidyLabel: CSSProperties;
    investmentSubsidyIcon: CSSProperties;
  } = {
    // Small subsidy chatbot (Dify)
    smallSubsidyLabel: { 
      bottom: "15rem", 
      right: "1rem", 
      zIndex: 1000,
      position: "fixed"
    },
    
    // Investment subsidy chatbot (custom)
    investmentSubsidyLabel: { 
      bottom: "7rem", 
      right: "1rem", 
      zIndex: 1000,
      position: "fixed"
    }, 
    investmentSubsidyIcon: { 
      bottom: "2rem", 
      right: "1rem", 
      zIndex: 9999,
      position: "fixed"
    }
  };

  // 省力化投資補助金チャットボット用のメッセージ処理関数
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
      // メッセージがDifyに送信され、Difyが自動的に回答を生成します
      // カスタムUIはそのまま使用する代わりに、"お問い合わせはDifyチャットボットをお使いください"と案内
      const botResponse = {
        type: "bot" as const,
        content: "このチャットボットでは省力化投資補助金（一般型）のご質問にお答えしています。小規模持続化補助金については、上のチャットボットをご利用ください。",
        timestamp: new Date()
      };
      
      // 少し遅延を入れて、より自然な会話フローを実現
      setTimeout(() => {
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
      }, 500);
      
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
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* 小規模持続化補助金ラベル */}
      <div 
        className="fixed z-[9990] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs flex flex-col items-center"
        style={styles.smallSubsidyLabel}
      >
        <span>小規模持続化補助金</span>
        <span>の質問はコチラ</span>
      </div>
      
      {/* 小規模持続化補助金アイコン（Dify） */}
      <DifyConfig />
      
      {/* 省力化投資補助金ラベル */}
      <div 
        className="fixed z-[9990] bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs flex flex-col items-center"
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
        onToggle={handleToggle}
        onSendMessage={handleSendMessage}
        style={styles.investmentSubsidyIcon}
        className="investment-subsidy-bot"
      />
    </div>
  );
};
