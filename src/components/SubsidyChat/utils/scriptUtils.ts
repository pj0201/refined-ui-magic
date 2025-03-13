
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
  console.log("Loading Dify scripts");
  
  // スタイルを追加
  const style = createStyleTag('dify-custom-styles', getChatbotStyles());
  document.head.appendChild(style);
  
  // Difyの設定スクリプト
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
      height: 50rem !important; /* 40remから50remに高さを増加 */
      max-height: 90vh !important; /* 80vhから90vhに最大高さを増加 */
      position: fixed !important;
      bottom: auto !important;
      top: 50px !important;
      right: 20px !important;
      z-index: 2147483647 !important;
    }
    @media (max-height: 700px) {
      #dify-chatbot-bubble-window {
        top: 20px !important;
        height: calc(100vh - 50px) !important; /* 100pxから50pxに変更してより多くの領域を使用 */
      }
    }`
  );
  document.head.appendChild(customStyles);
  
  // udify.appの埋め込みスクリプトを使用
  const scriptUrl = 'https://udify.app/embed.min.js';
  console.log(`Loading Dify script from: ${scriptUrl}`);
  
  // 既存のスクリプトを削除
  const existingScript = document.getElementById('dify-chat-main-script');
  if (existingScript) {
    existingScript.remove();
  }
  
  // 新しいスクリプトを作成
  const mainScript = createScriptTag(
    'dify-chat-main-script',
    null,
    scriptUrl,
    true,
    true
  );
  
  // スクリプトにIDを設定（トークンと同じ値）
  mainScript.id = DIFY_CONFIG.token;
  
  mainScript.onload = (): void => {
    console.log(`Dify script loaded successfully from: ${scriptUrl}`);
    setTimeout(onSuccess, 500);
  };
  
  mainScript.onerror = (error: Event): void => {
    console.error(`Error loading Dify script from ${scriptUrl}:`, error);
    onError(error);
  };
  
  document.head.appendChild(mainScript);
};
