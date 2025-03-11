
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
        height: 650px !important; /* 高さを増加 */
        min-height: 600px !important; /* 最小高さを増加 */
        max-height: 75vh !important; /* 画面の75%に制限 */
        bottom: 7rem !important; /* 位置を上に移動 */
        right: 1rem !important;
        transform: translateY(0) !important; /* 位置を強制調整 */
        margin-bottom: 1rem !important; /* 下部にマージンを追加 */
      }
      /* チャット領域の表示調整 */
      #dify-chatbot-bubble-window .dify-chatbot-window-content {
        height: calc(100% - 110px) !important; /* ヘッダーとフッターの高さを引いた高さ */
        overflow: auto !important;
      }
      /* 入力エリアが常に表示されるように */
      #dify-chatbot-bubble-window .dify-chatbot-window-footer {
        position: sticky !important;
        bottom: 0 !important;
        background-color: white !important;
        padding-bottom: 10px !important; /* 下部のパディングを追加 */
        z-index: 10 !important; /* 重なり順序を確保 */
      }
      /* iOSおよびモバイルデバイス向けの調整 */
      @supports (-webkit-overflow-scrolling: touch) {
        #dify-chatbot-bubble-window {
          height: 600px !important;
          min-height: 550px !important;
          max-height: 70vh !important;
          bottom: 9rem !important;
        }
      }
      /* 小さい画面での調整 */
      @media (max-height: 700px) {
        #dify-chatbot-bubble-window {
          height: 500px !important;
          min-height: 450px !important;
          max-height: 65vh !important;
          bottom: 9rem !important;
        }
        #dify-chatbot-bubble-button {
          bottom: 11rem !important;
        }
      }
      /* さらに小さい画面での調整 */
      @media (max-height: 500px) {
        #dify-chatbot-bubble-window {
          height: 350px !important;
          min-height: 300px !important;
          max-height: 60vh !important;
          bottom: 10rem !important;
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
