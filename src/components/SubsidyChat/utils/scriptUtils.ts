
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
  
  // 代替URL一覧 - CDNが失敗した場合に試す
  const scriptUrls = [
    'https://cdn.dify.ai/chat-widget/v1.2.0/chat-widget.js',
    'https://unpkg.com/@dify-ai/chat-widget@1.2.0/dist/chat-widget.js',
    'https://cdn.jsdelivr.net/npm/@dify-ai/chat-widget@1.2.0/dist/chat-widget.js'
  ];
  
  let currentUrlIndex = 0;
  const loadScript = () => {
    if (currentUrlIndex >= scriptUrls.length) {
      console.error("All script URLs failed to load");
      onError(new Error("Failed to load Dify script from all sources"));
      return;
    }

    const scriptUrl = scriptUrls[currentUrlIndex];
    console.log(`Attempting to load Dify script from: ${scriptUrl}`);
    
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
    
    mainScript.onload = (): void => {
      console.log(`Dify script loaded successfully from: ${scriptUrl}`);
      setTimeout(onSuccess, 500);
    };
    
    mainScript.onerror = (error: Event): void => {
      console.error(`Error loading Dify script from ${scriptUrl}:`, error);
      currentUrlIndex++;
      setTimeout(loadScript, 500); // 少し待ってから次のURLを試す
    };
    
    document.head.appendChild(mainScript);
  };
  
  // 最初のスクリプトをロード
  loadScript();
};
