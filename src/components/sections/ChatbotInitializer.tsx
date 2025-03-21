
import { useChatbotInitializer } from "../SubsidyChat/hooks/useChatbotInitializer";

/**
 * チャットボット初期化コンポーネント
 * このコンポーネントはチャットボットの初期化と制御を担当します
 */
export const ChatbotInitializer: React.FC = () => {
  // カスタムフックを使用してチャットボットを初期化
  const chatbotState = useChatbotInitializer();
  
  // このコンポーネントは何も表示しない
  return null;
};

// ChatbotInitializerフックからのエクスポート
export { useChatbotInitializer };
