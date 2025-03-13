
import { useEffect } from "react";
import { useDocumentReady } from "./hooks/useDocumentReady";
import { DIFY_CONFIG } from "./utils/difyConfig";

/**
 * シンプルな補助金チャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  // 初期化関数
  const initializeChatbot = () => {
    console.log("Initializing Dify chatbot from SubsidyChatbot component...");
    
    // 既存のスクリプトとスタイルを削除
    const existingScript = document.getElementById('dify-script');
    if (existingScript) existingScript.remove();
    
    const existingStyle = document.getElementById('dify-style');
    if (existingStyle) existingStyle.remove();
    
    // スタイルを追加
    const style = document.createElement('style');
    style.id = 'dify-style';
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #8B5CF6 !important; /* より目立つ紫色 */
        opacity: 0 !important; /* ボタンを非表示にする */
        pointer-events: none !important; /* クリックできないようにする */
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        max-height: 80vh !important;
        position: fixed !important;
        bottom: auto !important;
        top: 50px !important;
        right: 20px !important;
        z-index: 2147483647 !important;
      }
      @media (max-height: 700px) {
        #dify-chatbot-bubble-window {
          top: 20px !important;
          height: calc(100vh - 100px) !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    // 設定スクリプトを追加
    const configScript = document.createElement('script');
    configScript.id = 'dify-config';
    configScript.textContent = `
      window.difyChatbotConfig = {
        token: "${DIFY_CONFIG.token}"
      };
    `;
    document.head.appendChild(configScript);
    
    // Difyのスクリプトを追加
    const script = document.createElement('script');
    script.id = 'dify-script';
    script.src = 'https://udify.app/embed.min.js';
    script.defer = true;
    script.async = true;
    script.id = DIFY_CONFIG.token; // スクリプトIDをトークンに設定
    
    document.head.appendChild(script);

    // スクリプトのロードが完了したらチャットウィンドウを非表示にする
    script.onload = () => {
      console.log("Dify script loaded, hiding chat window");
      setTimeout(() => {
        const chatWindow = document.getElementById('dify-chatbot-bubble-window');
        if (chatWindow) {
          chatWindow.style.display = 'none';
        }
      }, 100);
    };
  };
  
  // ドキュメントの準備完了を検知
  useDocumentReady(initializeChatbot);
  
  // クリーンアップ
  useEffect(() => {
    return () => {
      console.log("Cleaning up subsidy chatbot");
      const script = document.getElementById('dify-script');
      if (script) script.remove();
      
      const style = document.getElementById('dify-style');
      if (style) style.remove();
      
      const configScript = document.getElementById('dify-config');
      if (configScript) configScript.remove();
    };
  }, []);

  return null;
};
