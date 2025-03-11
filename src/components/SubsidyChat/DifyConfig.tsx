
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
    // 即時実行
    setupDifyChat();
    
    // チャットボットの状態を監視
    const { interval, timeout } = monitorChatbotState();

    // クリーンアップ
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      
      // DOM要素を削除
      ['dify-chat-config', 'yXBz3rzpDBhMgYcB', 'dify-chat-styles', 'dify-chatbot-container'].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.remove();
      });
      
      console.log('Dify chat cleaned up');
    };
  }, []);

  return null;
};

