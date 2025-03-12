
import { useEffect } from "react";
import { setupDifyChat, monitorChatbotState } from "./services/difySetup";

export const DifyConfig = () => {
  useEffect(() => {
    // 初期化を一度だけ実行
    setupDifyChat();
    
    // 監視機能の開始
    const { interval, timeout } = monitorChatbotState();

    // クリーンアップ
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      
      // 既存のDify関連要素を削除
      ['dify-chat-config', 'yXBz3rzpDBhMgYcB', 'dify-chat-styles', 'dify-chatbot-container'].forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          element.remove();
        }
      });
    };
  }, []);

  return null;
};
