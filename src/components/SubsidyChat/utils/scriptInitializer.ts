
import { createScriptTag, createStyleTag, removeElement } from './domUtils';
import { getChatbotStyles } from '../styles/chatbotStyles';
import '../types/dify.d.ts';

/**
 * Difyスクリプトの初期化
 */
export const initializeDifyScripts = (
  onSuccess: () => void, 
  onError: (error: Event | Error) => void
): void => {
  console.log("Initializing Dify scripts");
  
  // 既存の要素をクリーンアップ
  cleanup();
  
  // スタイルを追加
  const style = createStyleTag('dify-custom-styles', getChatbotStyles());
  document.head.appendChild(style);
  
  // Difyの設定スクリプト
  const configScript = createScriptTag(
    'dify-chat-config',
    `window.__DIFY_CHAT_CONFIG__ = {
      apiEndpoint: "https://udify.app",
      publicApiKey: "app-KDYnIQfxqkXo7a89jFOplm4c",
      features: {
        text_to_speech: { enabled: false }
      }
    };`
  );
  document.head.appendChild(configScript);
  
  // Difyスクリプトを読み込み
  const mainScript = createScriptTag(
    'yXBz3rzpDBhMgYcB',
    null,
    "https://udify.app/js/web-client-chat.js",
    true,
    true
  );
  
  // 正常にロードされた場合
  mainScript.onload = (): void => {
    console.log("Difyスクリプトが正常にロードされました");
    
    // window.DifyChat が実際に存在するか確認
    if (window.DifyChat) {
      console.log("DifyChat オブジェクトが利用可能です:", Object.keys(window.DifyChat));
      onSuccess();
    } else {
      console.error("スクリプトはロードされましたが、DifyChat オブジェクトが見つかりません");
      onError(new Error("DifyChat オブジェクトが見つかりません"));
    }
  };
  
  // エラーが発生した場合
  mainScript.onerror = (error: Event): void => {
    console.error("Difyスクリプトのロードエラー:", error);
    onError(error);
  };
  
  // タイムアウト設定 - より短いタイムアウト
  const timeoutId = setTimeout(() => {
    console.error("スクリプトロードがタイムアウトしました");
    mainScript.remove(); // 未完了のスクリプトタグを削除
    onError(new Error("スクリプトロードがタイムアウトしました"));
  }, 5000); // 5秒タイムアウト

  // onload時にタイムアウトをクリア
  mainScript.addEventListener('load', () => {
    clearTimeout(timeoutId);
  });
  
  document.head.appendChild(mainScript);
};

/**
 * チャットボット要素のクリーンアップ
 */
export const cleanup = (): void => {
  console.log("Cleaning up chatbot elements");
  
  const elementsToRemove = [
    'dify-chat-config', 
    'yXBz3rzpDBhMgYcB', 
    'dify-custom-styles', 
    'dify-chatbot-bubble-button-1', 
    'dify-chatbot-label-1',
    'dify-chatbot-bubble-button-2', 
    'dify-chatbot-label-2',
    'chatbot-elements-container',
    'dify-fallback-container'
  ];
  
  elementsToRemove.forEach(id => {
    removeElement(id);
  });
};
