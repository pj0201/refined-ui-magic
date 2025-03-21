
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
      // APIの可用性を定期的にチェック - ただしCORSエラーを避けるために特別なチェック方法を使用
      const intervalCheck = setInterval(() => {
        // スクリプトベースでのチェック - window.difyChatbotが存在するかどうか
        if (window.difyChatbot) {
          console.log("Difyチャットボットが利用可能です");
        } else {
          console.warn("Difyチャットボットが見つかりません - 再初期化が必要かもしれません");
          // ここでは直接再初期化せず、問題を検出するだけ
        }
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
