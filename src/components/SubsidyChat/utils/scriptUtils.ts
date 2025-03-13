
import { createScriptTag, createStyleTag } from './domUtils';
import { DIFY_CONFIG } from './difyConfig';
import { getChatbotStyles } from '../styles/chatbotStyles';

/**
 * Difyスクリプトをロードする
 */
export const loadDifyScripts = (
  onSuccess: () => void,
  onError: (error: Event | Error) => void
): void => {
  console.log("Loading Dify scripts");
  
  // スタイルを追加
  const style = createStyleTag('dify-custom-styles', getChatbotStyles());
  document.head.appendChild(style);
  
  // Difyの設定スクリプト - 正しい形式で設定
  const configScript = createScriptTag(
    'dify-chat-config',
    `window.__DIFY_CHAT_CONFIG__ = {
      apiEndpoint: "${DIFY_CONFIG.apiEndpoint}",
      publicApiKey: "${DIFY_CONFIG.publicApiKey}",
      features: {
        text_to_speech: { enabled: ${DIFY_CONFIG.features.text_to_speech.enabled} }
      }
    };`
  );
  document.head.appendChild(configScript);
  
  // チャットウィンドウのスタイル
  const customStyles = createStyleTag(
    'dify-window-styles',
    `#dify-chatbot-bubble-button {
      background-color: #1C64F2 !important;
    }
    #dify-chatbot-bubble-window {
      width: 24rem !important;
      height: 40rem !important;
      max-height: 80vh !important;
      position: fixed !important;
      bottom: auto !important;
      top: 50px !important;
      right: 20px !important;
      z-index: 2147483647 !important;
    }
    @media (max-height: 700px) {
      #dify-chatbot-bubble-window {
        top: 20px !important;
        height: calc(100vh - 100px) !important;
      }
    }`
  );
  document.head.appendChild(customStyles);
  
  // Difyのメインスクリプト - 正しいURLを使用
  const mainScript = createScriptTag(
    'dify-chat-main-script',
    null,
    'https://cdn.dify.ai/chat-widget/v1.1.0/chat-widget.js',
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
