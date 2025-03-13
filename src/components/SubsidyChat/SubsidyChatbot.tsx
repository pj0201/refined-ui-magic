
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
  
  // デバッグ情報
  useEffect(() => {
    console.log(`SubsidyChatbot: チャットボットのロード状態: ${isLoaded ? '完了' : '未完了'}`);
    
    // ライフサイクルログ
    return () => {
      console.log("SubsidyChatbot: コンポーネントがアンマウントされました");
      cleanup();
    };
  }, [isLoaded]);
  
  // 開発モードではブラウザ更新を監視
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("SubsidyChatbot: ページが再表示されました。チャットボット要素を確認します。");
        if (!document.getElementById('chatbot-elements-container')) {
          console.log("SubsidyChatbot: チャットボット要素が見つかりません。再初期化します。");
          initializeChatbot();
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      console.log("Cleaning up subsidy chatbot");
      cleanup();
    };
  }, [initializeChatbot]);

  // コンポーネントは何も描画しない (チャットUI要素は動的に生成される)
  return null;
};
