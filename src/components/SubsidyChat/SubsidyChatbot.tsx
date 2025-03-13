
import { useEffect } from "react";
import { DIFY_CONFIG } from "./utils/difyConfig";

/**
 * シンプルな補助金チャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  // 初期化関数
  useEffect(() => {
    console.log("Initializing Dify chatbot...");
    
    // 設定スクリプトを追加
    const configScript = document.createElement('script');
    configScript.id = 'dify-config';
    configScript.textContent = `
      window.difyChatbotConfig = {
        token: "${DIFY_CONFIG.token}"
      };
    `;
    document.head.appendChild(configScript);
    
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
    
    // Difyのスクリプトを追加
    const script = document.createElement('script');
    script.id = 'dify-script';
    script.src = 'https://udify.app/embed.min.js';
    script.defer = true;
    script.async = true;
    
    document.head.appendChild(script);

    // クリーンアップ
    return () => {
      console.log("Cleaning up subsidy chatbot");
      const scriptEl = document.getElementById('dify-script');
      if (scriptEl) scriptEl.remove();
      
      const styleEl = document.getElementById('dify-style');
      if (styleEl) styleEl.remove();
      
      const configEl = document.getElementById('dify-config');
      if (configEl) configEl.remove();
    };
  }, []);

  return null;
};
