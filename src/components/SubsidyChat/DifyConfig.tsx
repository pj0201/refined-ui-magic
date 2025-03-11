
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
        /* 小規模持続化補助金ラベルの下に配置（オフセットを増加） */
        bottom: calc(min(31vh, 11rem)) !important;
        right: 1rem !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        max-height: 70vh !important;
        bottom: 4rem !important;
        right: 1rem !important;
      }
      /* 小さい画面での調整 */
      @media (max-height: 600px) {
        #dify-chatbot-bubble-button {
          bottom: 7rem !important; /* 位置を上方に調整 */
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
