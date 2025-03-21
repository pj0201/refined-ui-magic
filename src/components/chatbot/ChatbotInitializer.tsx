
import { useChatbotInitializer } from "./hooks/useChatbotInitializer";

/**
 * チャットボット初期化コンポーネント
 * このコンポーネントはチャットボットの初期化と制御を担当します
 */
export const ChatbotInitializer: React.FC = () => {
  // 初期化ロジックをカスタムフックに抽出
  useChatbotInitializer();
  
  // このコンポーネントは何も表示しない
  return null;
};

// 後方互換性のためにエクスポート
export { useChatbotInitializer };
