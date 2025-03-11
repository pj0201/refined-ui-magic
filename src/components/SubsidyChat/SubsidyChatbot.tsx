
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

  // レスポンシブな位置設定のためのスタイル
  const [styles, setStyles] = useState({
    smallSubsidyLabel: { bottom: "calc(40vh)", right: "1rem" },
    smallSubsidyIcon: { bottom: "calc(34vh)", right: "1rem" }, // 吹き出しの真下に配置
    investmentSubsidyLabel: { bottom: "calc(20vh)", right: "1rem" },
    investmentSubsidyIcon: { bottom: "calc(14vh)", right: "1rem" } // 位置を固定
  });

  // 画面サイズに基づいて位置を調整
  useEffect(() => {
    const updatePositions = () => {
      const viewportHeight = window.innerHeight;
      
      // 小規模持続化補助金ラベル - 位置固定
      const smallSubsidyLabelBottom = Math.min(Math.max(viewportHeight * 0.4, 12 * 16), 16 * 16);
      
      // 小規模持続化補助金アイコン - ラベルの真下に配置（オフセットを6remから9remに増加）
      const smallSubsidyIconBottom = smallSubsidyLabelBottom - (9 * 16);
      
      // 省力化投資補助金ラベル - 位置固定
      const investmentSubsidyLabelBottom = Math.min(Math.max(viewportHeight * 0.2, 6 * 16), 8 * 16);
      
      // 省力化投資補助金アイコン - ラベルの真下に配置（オフセットを固定）
      const investmentSubsidyIconBottom = investmentSubsidyLabelBottom - (6 * 16);

      setStyles({
        smallSubsidyLabel: { bottom: `${smallSubsidyLabelBottom / 16}rem`, right: "1rem" },
        smallSubsidyIcon: { bottom: `${smallSubsidyIconBottom / 16}rem`, right: "1rem" },
        investmentSubsidyLabel: { bottom: `${investmentSubsidyLabelBottom / 16}rem`, right: "1rem" },
        investmentSubsidyIcon: { bottom: `${investmentSubsidyIconBottom / 16}rem`, right: "1rem" }
      });
    };

    // 初期化時と画面サイズ変更時に位置を調整
    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
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
      {/* 小規模持続化補助金ラベル */}
      <div 
        className="fixed z-50 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs flex flex-col items-center"
        style={styles.smallSubsidyLabel}
      >
        <span>小規模持続化補助金</span>
        <span>の質問はコチラ</span>
      </div>
      
      {/* 省力化投資補助金ラベル */}
      <div 
        className="fixed z-50 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md text-xs flex flex-col items-center"
        style={styles.investmentSubsidyLabel}
      >
        <span>省力化投資補助金</span>
        <span>一般形の質問はコチラ</span>
      </div>
      
      <DifyConfig />
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
