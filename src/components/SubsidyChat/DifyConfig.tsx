
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
      console.log("Setting up Dify chat from DifyConfig...");
      setupDifyChat();
      
      // ボタンの表示を確認する追加のチェック
      setTimeout(() => {
        const difyButton = document.getElementById('dify-chatbot-bubble-button');
        if (difyButton) {
          console.log("Ensuring Dify button visibility after setup");
          difyButton.style.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 9995 !important;
            position: fixed !important;
            bottom: 11rem !important;
            right: 1rem !important;
            width: 48px !important;
            height: 48px !important;
            border-radius: 50% !important;
            background-color: #1C64F2 !important;
            cursor: pointer !important;
          `;
        } else {
          console.warn("Dify button not found after setup");
        }
      }, 1000);
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
