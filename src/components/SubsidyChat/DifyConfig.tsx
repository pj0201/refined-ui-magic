
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
        max-height: 80vh !important;
        bottom: 5rem !important;
        right: 1rem !important;
        transform: none !important;
        margin-bottom: 0 !important;
        z-index: 1000 !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        border-radius: 0.5rem !important;
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
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
      }
      @media (max-width: 640px) {
        #dify-chatbot-bubble-window {
          width: calc(100vw - 2rem) !important;
          height: 70vh !important;
          max-height: 70vh !important;
          bottom: 5rem !important;
          right: 1rem !important;
          left: auto !important;
        }
      }
    `;
    document.head.appendChild(difyChatbotStyle);

    // 追加：定期的に調整を実行する（Difyのスクリプトが非同期でDOM変更するため）
    const adjustInterval = setInterval(() => {
      const difyChatbotWindow = document.getElementById('dify-chatbot-bubble-window');
      const closeButton = difyChatbotWindow?.querySelector('.dify-chatbot-window-close-btn');
      
      if (difyChatbotWindow) {
        // 閉じるボタンの位置とスタイルを確実に適用
        if (closeButton) {
          (closeButton as HTMLElement).style.zIndex = '9999';
          (closeButton as HTMLElement).style.display = 'flex';
          (closeButton as HTMLElement).style.visibility = 'visible';
          (closeButton as HTMLElement).style.opacity = '1';
          (closeButton as HTMLElement).style.position = 'absolute';
          (closeButton as HTMLElement).style.top = '10px';
          (closeButton as HTMLElement).style.right = '10px';
        }
      }
    }, 500);

    // クリーンアップ関数
    return () => {
      clearInterval(adjustInterval);
      document.head.removeChild(difyChatbotConfig);
      document.body.removeChild(difyChatbotScript);
      document.head.removeChild(difyChatbotStyle);
    };
  }, []);

  return null;
};
