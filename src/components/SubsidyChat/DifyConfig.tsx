
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

    // Dify chatbotのスタイル設定
    const difyChatbotStyle = document.createElement('style');
    difyChatbotStyle.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
        /* 小規模持続化補助金アイコンの配置位置 - ラベルのすぐ下に */
        bottom: 11rem !important;
        right: 1rem !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: auto !important; /* 自動調整に変更 */
        max-height: 80vh !important; /* 画面の80%を超えないように制限 */
        bottom: 6rem !important; /* 入力欄が必ず見えるように下部に余白を確保 */
        right: 1rem !important;
        transform: translateY(0) !important; /* 位置を強制調整 */
      }
      /* iOSおよびモバイルデバイス向けの調整 */
      @supports (-webkit-overflow-scrolling: touch) {
        #dify-chatbot-bubble-window {
          max-height: 70vh !important;
          bottom: 8rem !important;
        }
      }
      /* 小さい画面での調整 */
      @media (max-height: 600px) {
        #dify-chatbot-bubble-window {
          max-height: 60vh !important;
          bottom: 8rem !important;
        }
        #dify-chatbot-bubble-button {
          bottom: 11rem !important; /* 固定位置 */
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
