
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
  
  // URLが有効かチェック - ロケーションによって適切なURLを選択
  const scriptUrl = "https://udify.app/js/web-client-chat.js";
  console.log(`Attempting to load Dify script from: ${scriptUrl}`);
  
  // 読み込み前のチェック
  fetch(scriptUrl, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        console.log("Script URL is reachable, proceeding with script load");
        loadMainScript(scriptUrl, onSuccess, onError);
      } else {
        console.error(`Script URL returned status: ${response.status}`);
        onError(new Error(`Script URL returned status: ${response.status}`));
      }
    })
    .catch(err => {
      console.error("Failed to check script URL:", err);
      // URLチェック失敗でもスクリプトのロードを試みる
      loadMainScript(scriptUrl, onSuccess, onError);
    });
};

/**
 * メインスクリプトをロードする
 */
const loadMainScript = (
  scriptUrl: string,
  onSuccess: () => void,
  onError: (error: Event | Error) => void
) => {
  const mainScript = createScriptTag(
    'yXBz3rzpDBhMgYcB',
    null,
    scriptUrl,
    true,
    true
  );
  
  // 正常にロードされた場合
  mainScript.onload = (): void => {
    console.log("Dify script loaded successfully");
    onSuccess();
  };
  
  // エラーが発生した場合
  mainScript.onerror = (error: Event): void => {
    console.error("Error loading Dify script:", error);
    onError(error);
  };
  
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
    'chatbot-elements-container'
  ];
  
  elementsToRemove.forEach(id => {
    removeElement(id);
  });
};
