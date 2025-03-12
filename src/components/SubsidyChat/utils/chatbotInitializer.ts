
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
  
  // ラベルとボタンを削除
  removeElement('dify-chatbot-bubble-button-1');
  removeElement('dify-chatbot-label-1');
  removeElement('dify-chatbot-bubble-button-2');
  removeElement('dify-chatbot-label-2');
  
  // 1つ目のラベル（省力化投資補助金）
  const label1 = createChatbotLabel(
    'dify-chatbot-label-1', 
    'dify-chatbot-label', 
    '省力化投資補助金の質問はコチラ'
  );
  document.body.appendChild(label1);
  
  // 1つ目のチャットボタン（省力化投資補助金）
  const button1 = createChatbotButton(
    'dify-chatbot-bubble-button-1', 
    'dify-chatbot-bubble-button',
    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM10.5578 5.35559C10.7356 5.17783 11.0272 5.17783 11.205 5.35559C11.3827 5.53336 11.3827 5.82494 11.205 6.0027L8.29703 8.91063L14.6472 8.91063C14.9035 8.91063 15.1111 9.11828 15.1111 9.37453V10.6254C15.1111 10.8817 14.9035 11.0893 14.6472 11.0893L8.29711 11.0893L11.205 13.9972C11.3828 14.175 11.3828 14.4665 11.205 14.6443C11.0272 14.8221 10.7357 14.8221 10.5579 14.6443L6.79497 10.8814C6.70611 10.7925 6.66168 10.6809 6.66168 10.5694V9.43042C6.66168 9.31887 6.70611 9.20727 6.79497 9.11842L10.5578 5.35559Z" fill="white"/>
    </svg>`,
    (): void => {
      window.postMessage({ type: 'CHAT_TYPE_1_CLICK', value: '省力化投資補助金' }, '*');
    }
  );
  document.body.appendChild(button1);
  
  // 2つ目のラベル（小規模持続化補助金）
  const label2 = createChatbotLabel(
    'dify-chatbot-label-2', 
    'dify-chatbot-label', 
    '小規模持続化補助金の質問はコチラ'
  );
  document.body.appendChild(label2);
  
  // 2つ目のチャットボタン（小規模持続化補助金）
  const button2 = createChatbotButton(
    'dify-chatbot-bubble-button-2', 
    'dify-chatbot-bubble-button',
    `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM10.5578 5.35559C10.7356 5.17783 11.0272 5.17783 11.205 5.35559C11.3827 5.53336 11.3827 5.82494 11.205 6.0027L8.29703 8.91063L14.6472 8.91063C14.9035 8.91063 15.1111 9.11828 15.1111 9.37453V10.6254C15.1111 10.8817 14.9035 11.0893 14.6472 11.0893L8.29711 11.0893L11.205 13.9972C11.3828 14.175 11.3828 14.4665 11.205 14.6443C11.0272 14.8221 10.7357 14.8221 10.5579 14.6443L6.79497 10.8814C6.70611 10.7925 6.66168 10.6809 6.66168 10.5694V9.43042C6.66168 9.31887 6.70611 9.20727 6.79497 9.11842L10.5578 5.35559Z" fill="white"/>
    </svg>`,
    (): void => {
      window.postMessage({ type: 'CHAT_TYPE_2_CLICK', value: '小規模持続化補助金' }, '*');
    }
  );
  document.body.appendChild(button2);
  
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
  
  chatbotElementIds.forEach(id => {
    removeElement(id);
  });
};
