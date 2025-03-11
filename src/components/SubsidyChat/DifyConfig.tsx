
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
        /* 小規模持続化補助金アイコンの配置位置 - 固定位置 */
        bottom: 11rem !important;
        right: 1rem !important;
        z-index: 1000 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 80vh !important; /* 画面の高さに対する割合で設定 */
        min-height: 500px !important;
        max-height: 700px !important;
        bottom: 70px !important; /* 下部の位置を固定値に変更 */
        right: 1rem !important;
        transform: none !important; /* transformをnoneに設定 */
        margin-bottom: 10px !important;
        z-index: 1000 !important;
        display: flex !important;
        flex-direction: column !important;
      }
      /* チャット領域の表示調整 - flex-growを使用 */
      #dify-chatbot-bubble-window .dify-chatbot-window-content {
        flex-grow: 1 !important;
        overflow: auto !important;
        display: flex !important;
        flex-direction: column !important;
      }
      /* 入力エリアを固定表示 */
      #dify-chatbot-bubble-window .dify-chatbot-window-footer {
        position: sticky !important;
        bottom: 0 !important;
        background-color: white !important;
        padding: 15px !important;
        z-index: 1010 !important;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1) !important;
      }
      /* モバイル向け調整 */
      @media (max-width: 640px) {
        #dify-chatbot-bubble-window {
          width: 90vw !important;
          height: 70vh !important;
          min-height: 400px !important;
          max-height: 600px !important;
          bottom: 70px !important;
          right: 5vw !important;
          left: 5vw !important;
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
