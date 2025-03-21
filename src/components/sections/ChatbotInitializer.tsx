
import { useChatbotInitializer } from "../SubsidyChat/hooks/useChatbotInitializer";
import { useEffect } from "react";
import { checkAllChatbotErrors } from "../SubsidyChat/utils/errorHandling";
import { toast } from "sonner";

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
      
      // DifyのURLやトークンが変更された可能性を確認するために、
      // APIの可用性を定期的にチェック
      const intervalCheck = setInterval(() => {
        // Fetch APIを使用して簡単なConnectivity Check
        fetch('https://api.dify.ai/health', { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors',
        })
        .then(response => {
          if (!response.ok) {
            console.error(`Dify API Health Check failed with status: ${response.status}`);
            throw new Error('Dify API connection failed');
          }
          return response.json();
        })
        .then(data => {
          console.log("Dify API Health Check successful:", data);
        })
        .catch(error => {
          console.error("Dify API Health Check error:", error);
          // エラー時にはコンソールにのみ出力し、ユーザーには表示しない
        });
      }, 60000); // 1分ごとにチェック
      
      return () => {
        clearTimeout(timer);
        clearInterval(intervalCheck);
      };
    }
  }, [chatbotState.isDifyLoaded, chatbotState.isShoukiboLoaded, chatbotState.isShorikikaLoaded]);
  
  // このコンポーネントは何も表示しない
  return null;
};

// ChatbotInitializerフックからのエクスポート
export { useChatbotInitializer };
