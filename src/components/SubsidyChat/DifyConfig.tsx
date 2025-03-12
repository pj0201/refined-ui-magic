
import { useEffect } from "react";
import { setupDifyChat, monitorChatbotState } from "./services/difySetup";

// Window型を拡張してdifyChatbotConfigを含めるようにする
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
    // DOM読み込み完了後にセットアップを実行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupDifyChat);
    } else {
      setupDifyChat();
    }

    // チャットボットの状態を監視
    const { interval, timeout } = monitorChatbotState();

    // クリーンアップ
    return () => {
      document.removeEventListener('DOMContentLoaded', setupDifyChat);
      clearInterval(interval);
      clearTimeout(timeout);
      
      const configScript = document.getElementById('dify-chat-config');
      if (configScript) configScript.remove();
      
      const mainScript = document.getElementById('yXBz3rzpDBhMgYcB');
      if (mainScript) mainScript.remove();
      
      const styleElement = document.getElementById('dify-chat-styles');
      if (styleElement) styleElement.remove();
      
      const container = document.getElementById('dify-chatbot-container');
      if (container) container.remove();
      
      const labels = document.getElementById('dify-chat-labels');
      if (labels) labels.remove();
    };
  }, []);

  return null;
};
