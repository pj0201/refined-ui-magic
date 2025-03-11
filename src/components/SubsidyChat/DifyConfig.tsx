
import { useEffect } from "react";
import { setupDifyChat, monitorChatbotState } from "./services/difySetup";

declare global {
  interface Window {
    difyChatbotConfig?: {
      token: string;
      containerID?: string;
    };
  }
}

export const DifyConfig = () => {
  useEffect(() => {
    console.log("DifyConfig component mounted, initializing chat...");
    
    // 現在のDifyの状態をクリア
    const cleanupExistingElements = () => {
      // 既存のDify関連要素を削除
      ['dify-chat-config', 'yXBz3rzpDBhMgYcB', 'dify-chat-styles', 'dify-chatbot-container'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          console.log(`Removing existing element: ${id}`);
          element.remove();
        }
      });
    };
    
    // 初期化前にクリーンアップ
    cleanupExistingElements();
    
    // 即時実行
    setTimeout(() => {
      setupDifyChat();
      console.log("Dify chat setup called from DifyConfig");
    }, 100);
    
    // チャットボットの状態を監視
    const { interval, timeout } = monitorChatbotState();

    // クリーンアップ
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      
      // DOM要素を削除
      cleanupExistingElements();
      
      console.log('Dify chat cleaned up');
    };
  }, []);

  return null;
};
