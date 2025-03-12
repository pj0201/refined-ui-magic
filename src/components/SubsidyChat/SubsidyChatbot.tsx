
import { useEffect, useState, useRef } from "react";

/**
 * 補助金チャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const checkIntervalRef = useRef<number | null>(null);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 5;

  useEffect(() => {
    // 即時実行
    initializeChatbot();

    // クリーンアップ
    return () => {
      cleanup();
    };
  }, []);

  const initializeChatbot = () => {
    console.log("Initializing subsidy chatbot...");
    
    // 既存の要素をクリーンアップ
    cleanup();
    
    // 設定スクリプトを追加
    const configScript = document.createElement('script');
    configScript.id = 'dify-chat-config';
    configScript.textContent = `
      window.difyChatbotConfig = { 
        token: 'yXBz3rzpDBhMgYcB'
      };
    `;
    document.head.appendChild(configScript);

    // メインスクリプトを追加
    const mainScript = document.createElement('script');
    mainScript.id = 'yXBz3rzpDBhMgYcB';
    mainScript.src = 'https://udify.app/embed.min.js';
    mainScript.defer = true;
    mainScript.async = true;
    
    mainScript.onload = () => {
      console.log("Dify script loaded successfully");
      setIsLoaded(true);
      addChatbotElements();
    };
    
    mainScript.onerror = () => {
      console.error("Failed to load Dify script");
      attemptCountRef.current++;
      if (attemptCountRef.current < MAX_ATTEMPTS) {
        setTimeout(initializeChatbot, 2000);
      }
    };
    
    document.body.appendChild(mainScript);
  };

  const addChatbotElements = () => {
    // スタイルを追加
    const style = document.createElement('style');
    style.id = 'dify-custom-styles';
    style.textContent = `
      #dify-chatbot-bubble-button {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        width: 60px !important;
        height: 60px !important;
        border-radius: 50% !important;
        background-color: #1C64F2 !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
        border: none !important;
        cursor: pointer !important;
        z-index: 99999 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      #dify-chatbot-label {
        position: fixed !important;
        bottom: 90px !important;
        right: 20px !important;
        background-color: white !important;
        padding: 8px 16px !important;
        border-radius: 20px !important;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
        z-index: 99999 !important;
        font-size: 14px !important;
        white-space: nowrap !important;
        display: block !important;
      }

      #dify-chatbot-bubble-window {
        position: fixed !important;
        bottom: 100px !important;
        right: 20px !important;
        width: 380px !important;
        height: 600px !important;
        max-height: 80vh !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        z-index: 99999 !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);

    // カスタムボタンを追加
    const button = document.createElement('button');
    button.id = 'dify-chatbot-bubble-button';
    button.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
    document.body.appendChild(button);

    // ラベルを追加
    const label = document.createElement('div');
    label.id = 'dify-chatbot-label';
    label.textContent = '小規模持続化補助金の質問はコチラ';
    document.body.appendChild(label);

    // 要素の存在を定期的にチェック
    startElementCheck();
  };

  const startElementCheck = () => {
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }

    checkIntervalRef.current = window.setInterval(() => {
      const button = document.getElementById('dify-chatbot-bubble-button');
      const label = document.getElementById('dify-chatbot-label');

      if (!button || !label) {
        console.log("Chatbot elements missing, restoring...");
        addChatbotElements();
      }
    }, 2000);
  };

  const cleanup = () => {
    // 既存の要素を削除
    ['dify-chat-config', 'yXBz3rzpDBhMgYcB', 'dify-custom-styles', 'dify-chatbot-bubble-button', 'dify-chatbot-label'].forEach(id => {
      document.getElementById(id)?.remove();
    });

    // インターバルをクリア
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
  };

  return null;
};
