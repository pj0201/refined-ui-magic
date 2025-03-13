
import { createScriptTag, createStyleTag } from './domUtils';
import { DIFY_CONFIG, getDifyConfigScript } from './difyConfig';
import { getChatbotStyles } from '../styles/chatbotStyles';

/**
 * Difyスクリプトをロードする
 */
export const loadDifyScripts = (
  onSuccess: () => void,
  onError: (error: Event | Error) => void
): void => {
  console.log("Loading Dify scripts with new implementation");
  
  // スタイルを追加
  const style = createStyleTag('dify-custom-styles', getChatbotStyles());
  document.head.appendChild(style);
  
  // Difyの設定スクリプト - 正しい形式で設定
  const configScript = createScriptTag(
    'dify-chat-config',
    getDifyConfigScript()
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
  
  // Difyのメインスクリプト - 最新のURLを使用
  const mainScript = createScriptTag(
    'dify-chat-main-script',
    null,
    'https://cdn.dify.ai/chat-widget/v1.2.0/chat-widget.js', // 最新のバージョンに更新
    true,
    true
  );
  
  // 正常にロードされた場合
  mainScript.onload = (): void => {
    console.log("Dify script loaded successfully, checking for global objects");
    setTimeout(() => {
      // グローバルオブジェクトをチェック
      if (window.DifyAI) {
        console.log("DifyAI global object found");
      } else if (window.difyChatbot) {
        console.log("difyChatbot global object found");
      } else if (window.DifyChat) {
        console.log("DifyChat global object found");
      } else {
        console.warn("No Dify global objects found after script load");
      }
      onSuccess();
    }, 500); // スクリプトが正しく初期化される時間を確保
  };
  
  // エラーが発生した場合
  mainScript.onerror = (error: Event): void => {
    console.error("Error loading Dify script:", error);
    onError(error);
  };
  
  document.head.appendChild(mainScript);
};
