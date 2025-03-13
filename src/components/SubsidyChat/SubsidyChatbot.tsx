
import { useEffect } from "react";
import { useDocumentReady } from "./hooks/useDocumentReady";
import { DIFY_CONFIG } from "./utils/difyConfig";

/**
 * シンプルな補助金チャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  // 初期化関数
  const initializeChatbot = () => {
    console.log("Initializing simple Dify chatbot...");
    
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
        background-color: #1C64F2 !important;
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
    
    // スクリプトにIDを設定（トークンと同じ値）
    script.id = DIFY_CONFIG.token;
    
    document.head.appendChild(script);
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
