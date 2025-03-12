
import { useEffect } from "react";

/**
 * 補助金チャットボットコンポーネント - 軽量化バージョン
 */
export const SubsidyChatbot = () => {
  useEffect(() => {
    // 既に存在する場合は追加しない
    if (document.getElementById('dify-chat-config')) {
      return;
    }

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
    document.body.appendChild(mainScript);

    // スタイルを追加
    const style = document.createElement('style');
    style.id = 'dify-chat-styles';
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
        bottom: 8rem !important;
        right: 1rem !important;
        z-index: 99995 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        max-height: 80vh !important;
        max-width: calc(100vw - 32px) !important;
        bottom: 2rem !important;
        right: 1rem !important;
      }
      @media (max-width: 640px) {
        #dify-chatbot-bubble-window {
          width: calc(100vw - 2rem) !important;
          height: 70vh !important;
        }
      }
    `;
    document.head.appendChild(style);

    // ラベルを追加
    const label = document.createElement('div');
    label.innerHTML = `
      <div style="position: fixed; bottom: 12rem; right: 1rem; background-color: rgba(255,255,255,0.9); padding: 0.375rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); z-index: 99994; display: flex; flex-direction: column; align-items: center; text-align: center; border: 1px solid rgba(226,232,240,0.8);">
        <span>小規模持続化補助金</span>
        <span>の質問はコチラ</span>
      </div>
    `;
    document.body.appendChild(label);

    // クリーンアップ関数
    return () => {
      document.getElementById('dify-chat-config')?.remove();
      document.getElementById('yXBz3rzpDBhMgYcB')?.remove();
      document.getElementById('dify-chat-styles')?.remove();
      label.remove();
    };
  }, []);

  return null;
};
