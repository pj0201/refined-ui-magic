
import { useChatbotInitializer } from "../SubsidyChat/hooks/useChatbotInitializer";
import { useEffect } from "react";
import { checkAllChatbotErrors } from "../SubsidyChat/utils/errorHandling";

/**
 * チャットボット初期化コンポーネント
 * このコンポーネントはチャットボットの初期化と制御を担当します
 */
export const ChatbotInitializer: React.FC = () => {
  // カスタムフックを使用してチャットボットを初期化
  const chatbotState = useChatbotInitializer();
  
  // チャットボット初期化後のエラーチェック
  useEffect(() => {
    if (chatbotState.isDifyLoaded || chatbotState.isShoukiboLoaded || chatbotState.isShorikikaLoaded) {
      console.log("チャットボットが読み込まれたため、エラーチェックを実行します");
      
      // 遅延してエラーチェックを実行（iframeの読み込み完了を待つ）
      const timer = setTimeout(() => {
        checkAllChatbotErrors();
      }, 3000);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [chatbotState.isDifyLoaded, chatbotState.isShoukiboLoaded, chatbotState.isShorikikaLoaded]);
  
  // このコンポーネントは何も表示しない
  return null;
};

// ChatbotInitializerフックからのエクスポート
export { useChatbotInitializer };
