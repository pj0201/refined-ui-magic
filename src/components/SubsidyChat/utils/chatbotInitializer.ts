
import { getChatbotStyles } from '../styles/chatbotStyles';
import { 
  removeElement, 
  createScriptTag, 
  createStyleTag, 
  createChatbotLabel, 
  createChatbotButton,
  chatbotElementIds
} from './domUtils';

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
      apiEndpoint: "https://cloud.dify.ai",
      publicApiKey: "app-KDYnIQfxqkXo7a89jFOplm4c",
      features: {
        text_to_speech: { enabled: false }
      }
    };`
  );
  document.head.appendChild(configScript);
  
  // Difyのメインスクリプト
  const mainScript = createScriptTag(
    'yXBz3rzpDBhMgYcB',
    null,
    'https://cloud.dify.ai/js/web-client-chat.js',
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
 * チャットボット要素の追加
 */
export const addChatbotElements = (): void => {
  console.log("Adding chatbot elements to the DOM");
  
  // 既存の要素をクリーンアップ
  removeElement('chatbot-elements-container');
  removeElement('dify-chatbot-bubble-button-1');
  removeElement('dify-chatbot-label-1');
  removeElement('dify-chatbot-bubble-button-2');
  removeElement('dify-chatbot-label-2');
  
  // コンテナを作成
  const container = document.createElement('div');
  container.id = 'chatbot-elements-container';
  container.className = 'chatbot-elements-container';
  
  // 1つ目のラベル（省力化投資補助金）
  const label1 = createChatbotLabel(
    'dify-chatbot-label-1', 
    'dify-chatbot-label', 
    '省'
  );
  container.appendChild(label1);
  
  // 1つ目のチャットボタン（省力化投資補助金）
  const button1 = createChatbotButton(
    'dify-chatbot-bubble-button-1', 
    'dify-chatbot-bubble-button',
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z" fill="white"/>
    </svg>`,
    (): void => {
      window.postMessage({ type: 'CHAT_TYPE_1_CLICK', value: '省力化投資補助金' }, '*');
    }
  );
  container.appendChild(button1);
  
  // 2つ目のラベル（小規模持続化補助金）
  const label2 = createChatbotLabel(
    'dify-chatbot-label-2', 
    'dify-chatbot-label', 
    '小'
  );
  container.appendChild(label2);
  
  // 2つ目のチャットボタン（小規模持続化補助金）
  const button2 = createChatbotButton(
    'dify-chatbot-bubble-button-2', 
    'dify-chatbot-bubble-button',
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" fill="white"/>
    </svg>`,
    (): void => {
      window.postMessage({ type: 'CHAT_TYPE_2_CLICK', value: '小規模持続化補助金' }, '*');
    }
  );
  container.appendChild(button2);
  
  // コンテナをDOMに追加
  document.body.appendChild(container);
  
  // メッセージハンドラー
  window.addEventListener('message', (event) => {
    if (event.data.type === 'CHAT_TYPE_1_CLICK') {
      console.log("省力化投資補助金 chat requested");
      if (window.DifyChat?.toggleBubbleWindow) {
        window.DifyChat.toggleBubbleWindow(true);
      }
      if (window.DifyChat?.onChatCleared) {
        window.DifyChat.onChatCleared();
      }
    } else if (event.data.type === 'CHAT_TYPE_2_CLICK') {
      console.log("小規模持続化補助金 chat requested");
      if (window.DifyChat?.toggleBubbleWindow) {
        window.DifyChat.toggleBubbleWindow(true);
      }
      if (window.DifyChat?.onChatCleared) {
        window.DifyChat.onChatCleared();
      }
    }
  });
};

/**
 * チャットボット要素のクリーンアップ
 */
export const cleanup = (): void => {
  console.log("Cleaning up chatbot elements");
  
  const elementsToRemove = [
    ...chatbotElementIds,
    'chatbot-elements-container'
  ];
  
  elementsToRemove.forEach(id => {
    removeElement(id);
  });
};
