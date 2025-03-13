
import { useEffect, useRef } from "react";
import { cleanup } from "./utils/chatbotInitializer";
import { useChatbotInitializer } from "./hooks/useChatbotInitializer";
import { useElementMonitor } from "./hooks/useElementMonitor";

/**
 * 補助金チャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  // チャットボットの初期化ロジックをカスタムフックで管理
  const { isLoaded, isError, initializeChatbot } = useChatbotInitializer();
  
  // チャットボット要素のモニタリングをカスタムフックで管理
  const elementMonitor = useElementMonitor(isLoaded);
  
  // Difyチャットの状態を定期チェック
  elementMonitor.checkDifyStatus(initializeChatbot);
  
  // デバッグ情報と状態監視
  useEffect(() => {
    console.log(`SubsidyChatbot: チャットボットのロード状態: ${isLoaded ? '完了' : '未完了'}, エラー状態: ${isError ? 'エラー' : '正常'}`);
    
    // ライフサイクルログ
    return () => {
      console.log("SubsidyChatbot: コンポーネントがアンマウントされました");
      cleanup();
    };
  }, [isLoaded, isError]);
  
  // ページの完全な読み込み完了を監視
  useEffect(() => {
    const handleLoad = () => {
      console.log("ページが完全に読み込まれました。チャットボットの状態を確認します。");
      
      // 既にロードされているか確認
      if (!isLoaded && !document.getElementById('chatbot-elements-container')) {
        console.log("ページ読み込み完了後、チャットボットが初期化されていません。初期化を実行します。");
        setTimeout(initializeChatbot, 500);
      }
    };
    
    // ページ読み込み完了イベントを監視
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [isLoaded, initializeChatbot]);

  // コンポーネントは何も描画しない (チャットUI要素は動的に生成される)
  return null;
};
