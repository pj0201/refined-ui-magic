
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
    
    // 小規模持続化補助金ラベルを確実に作成
    const createSmallSubsidyLabel = () => {
      let label = document.querySelector('.small-subsidy-label');
      if (!label) {
        console.log("Creating small subsidy label");
        label = document.createElement('div');
        label.className = 'small-subsidy-label chatbot-label';
        label.innerHTML = `
          <span>小規模持続化補助金</span>
          <span>の質問はコチラ</span>
        `;
        label.setAttribute('style', `
          position: fixed !important;
          bottom: 15rem !important;
          right: 1rem !important;
          z-index: 1000 !important;
          background-color: rgba(255, 255, 255, 0.9) !important;
          padding: 0.375rem 0.75rem !important;
          border-radius: 9999px !important;
          font-size: 0.75rem !important;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
          backdrop-filter: blur(4px) !important;
          display: flex !important;
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          border: 1px solid rgba(226, 232, 240, 0.8) !important;
        `);
        document.body.appendChild(label);
      }
    };
    
    // DOMに直接アクセスしてチャットボタンの表示を確認
    const checkDifyButton = () => {
      // チャットボタンがなければ自分で作成
      let difyButton = document.getElementById('dify-chatbot-bubble-button');
      if (!difyButton) {
        console.log("Dify button not found, creating a new one");
        difyButton = document.createElement('button');
        difyButton.id = 'dify-chatbot-bubble-button';
        difyButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
        difyButton.onclick = (e) => {
          e.stopPropagation();
          console.log("Manual Dify button clicked");
          const chatWindow = document.getElementById('dify-chatbot-bubble-window');
          if (chatWindow) {
            chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
          }
        };
        document.body.appendChild(difyButton);
      }
      
      if (difyButton) {
        difyButton.style.cssText = `
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          z-index: 9995 !important;
          position: fixed !important;
          bottom: 11rem !important;
          right: 1rem !important;
          width: 48px !important;
          height: 48px !important;
          border-radius: 50% !important;
          background-color: #1C64F2 !important;
          cursor: pointer !important;
          color: white !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          border: none !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        `;
        console.log("Dify button visibility enforced from SubsidyChatbot");
      }
      
      // ラベルも作成
      createSmallSubsidyLabel();
    };
    
    // 初期チェックを実行
    setTimeout(checkDifyButton, 500);
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
