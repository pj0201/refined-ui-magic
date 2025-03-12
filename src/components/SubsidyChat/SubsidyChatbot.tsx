
import { useEffect } from "react";

/**
 * 補助金チャットボットコンポーネント - 軽量化バージョン
 */
export const SubsidyChatbot = () => {
  useEffect(() => {
    // Difyのチャットボットを初期化する処理

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
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: fixed !important;
        width: 48px !important;
        height: 48px !important;
        padding: 0 !important;
        margin: 0 !important;
        border-radius: 50% !important;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
        cursor: pointer !important;
        border: none !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        max-height: 80vh !important;
        max-width: calc(100vw - 32px) !important;
        bottom: 2rem !important;
        right: 1rem !important;
        z-index: 99995 !important;
        display: flex !important;
        flex-direction: column !important;
        border-radius: 0.5rem !important;
        overflow: hidden !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
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
    label.id = 'dify-chatbot-label';
    label.innerHTML = `
      <div style="position: fixed; bottom: 12rem; right: 1rem; background-color: rgba(255,255,255,0.9); padding: 0.375rem 0.75rem; border-radius: 9999px; font-size: 0.75rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); z-index: 99994; display: flex; flex-direction: column; align-items: center; text-align: center; border: 1px solid rgba(226,232,240,0.8);">
        <span>小規模持続化補助金</span>
        <span>の質問はコチラ</span>
      </div>
    `;
    document.body.appendChild(label);

    // チャットボットの表示状態を確認するインターバル
    const checkInterval = setInterval(() => {
      const chatButton = document.getElementById('dify-chatbot-bubble-button');
      if (!chatButton) {
        // ボタンが存在しない場合、スクリプトを再読み込み
        document.body.appendChild(mainScript.cloneNode(true));
      }
    }, 5000);

    // クリーンアップ関数
    return () => {
      clearInterval(checkInterval);
      document.getElementById('dify-chat-config')?.remove();
      document.getElementById('yXBz3rzpDBhMgYcB')?.remove();
      document.getElementById('dify-chat-styles')?.remove();
      document.getElementById('dify-chatbot-label')?.remove();
    };
  }, []);

  return null;
};
