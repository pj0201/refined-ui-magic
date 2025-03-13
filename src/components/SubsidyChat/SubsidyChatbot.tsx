
import { useEffect } from "react";
import { cleanup } from "./utils/chatbotInitializer";
import { clearCheckInterval } from "./utils/elementChecker";
import { useChatbotInitializer } from "./hooks/useChatbotInitializer";
import { useElementMonitor } from "./hooks/useElementMonitor";

/**
 * 補助金チャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  // チャットボットの初期化ロジックをカスタムフックで管理
  const { isLoaded, initializeChatbot } = useChatbotInitializer();
  
  // チャットボット要素のモニタリングをカスタムフックで管理
  const elementMonitor = useElementMonitor(isLoaded);
  
  // Difyチャットの状態を定期チェック
  elementMonitor.checkDifyStatus(initializeChatbot);
  
  // グローバルなクリーンアップ処理
  useEffect(() => {
    return () => {
      console.log("Cleaning up subsidy chatbot");
      cleanup();
    };
  }, []);

  // コンポーネントは何も描画しない (チャットUI要素は動的に生成される)
  return null;
};
