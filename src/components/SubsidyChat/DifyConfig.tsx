
import { useEffect } from "react";

export const DifyConfig = () => {
  useEffect(() => {
    // Dify chatbotのスクリプトを追加
    const difyChatbotConfig = document.createElement('script');
    difyChatbotConfig.textContent = `window.difyChatbotConfig = { token: 'yXBz3rzpDBhMgYcB' }`;
    document.head.appendChild(difyChatbotConfig);

    const difyChatbotScript = document.createElement('script');
    difyChatbotScript.src = 'https://udify.app/embed.min.js';
    difyChatbotScript.id = 'yXBz3rzpDBhMgYcB';
    difyChatbotScript.defer = true;
    document.body.appendChild(difyChatbotScript);

    // Dify chatbotのスタイル設定 - !important を使って確実に適用
    const difyChatbotStyle = document.createElement('style');
    difyChatbotStyle.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
        bottom: 11rem !important;
        right: 1rem !important;
        z-index: 1000 !important;
      }
      #dify-chatbot-bubble-window {
        width: 350px !important;
        height: 500px !important;
        max-height: calc(100vh - 120px) !important;
        bottom: 5rem !important;
        right: 1rem !important;
        transform: none !important;
        margin-bottom: 0 !important;
        z-index: 1000 !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
      }
      #dify-chatbot-bubble-window .dify-chatbot-window-content {
        flex: 1 !important;
        overflow: auto !important;
        display: flex !important;
        flex-direction: column !important;
      }
      #dify-chatbot-bubble-window .dify-chatbot-window-header {
        position: relative !important;
        z-index: 1010 !important;
      }
      #dify-chatbot-bubble-window .dify-chatbot-window-footer {
        position: sticky !important;
        bottom: 0 !important;
        background-color: white !important;
        padding: 12px !important;
        z-index: 1010 !important;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1) !important;
        margin-top: auto !important;
      }
      #dify-chatbot-bubble-window .dify-chatbot-window-close-btn {
        z-index: 1020 !important;
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      @media (max-width: 640px) {
        #dify-chatbot-bubble-window {
          width: calc(100vw - 2rem) !important;
          height: 500px !important;
          max-height: calc(100vh - 120px) !important;
          bottom: 5rem !important;
          right: 1rem !important;
          left: auto !important;
        }
      }
    `;
    document.head.appendChild(difyChatbotStyle);

    // クリーンアップ関数
    return () => {
      document.head.removeChild(difyChatbotConfig);
      document.body.removeChild(difyChatbotScript);
      document.head.removeChild(difyChatbotStyle);
    };
  }, []);

  return null;
};
