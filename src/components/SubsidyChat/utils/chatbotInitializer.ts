
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
      apiEndpoint: "https://udify.app",
      publicApiKey: "app-KDYnIQfxqkXo7a89jFOplm4c",
      features: {
        text_to_speech: { enabled: false }
      }
    };`
  );
  document.head.appendChild(configScript);
  
  // Difyのメインスクリプト - URLを修正
  const mainScript = createScriptTag(
    'yXBz3rzpDBhMgYcB',
    null,
    'https://udify.app/js/web-client-chat.js',
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
    '省力化投資補助金の質問はコチラ'
  );
  container.appendChild(label1);
  
  // 1つ目のチャットボタン（省力化投資補助金）- ヘルプアイコン
  const button1 = createChatbotButton(
    'dify-chatbot-bubble-button-1', 
    'dify-chatbot-bubble-button',
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    (): void => {
      // Difyのウィンドウをトグルするよう変更
      if (window.DifyChat) {
        window.DifyChat.toggleBubbleWindow(true);
        window.DifyChat.onChatCleared();
        // 省力化投資補助金についてのメッセージを自動送信
        setTimeout(() => {
          if (window.DifyChat?.sendMessage) {
            window.DifyChat.sendMessage('省力化投資補助金について教えてください');
          }
        }, 500);
      } else {
        console.error('DifyChat is not available');
        // フォールバックとしてメッセージングを維持
        window.postMessage({ type: 'CHAT_TYPE_1_CLICK', value: '省力化投資補助金' }, '*');
      }
    }
  );
  container.appendChild(button1);
  
  // 2つ目のラベル（小規模持続化補助金）
  const label2 = createChatbotLabel(
    'dify-chatbot-label-2', 
    'dify-chatbot-label', 
    '小規模持続化補助金の質問はコチラ'
  );
  container.appendChild(label2);
  
  // 2つ目のチャットボタン（小規模持続化補助金）- メッセージアイコン
  const button2 = createChatbotButton(
    'dify-chatbot-bubble-button-2', 
    'dify-chatbot-bubble-button',
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    (): void => {
      // Difyのウィンドウをトグルするよう変更
      if (window.DifyChat) {
        window.DifyChat.toggleBubbleWindow(true);
        window.DifyChat.onChatCleared();
        // 小規模持続化補助金についてのメッセージを自動送信
        setTimeout(() => {
          if (window.DifyChat?.sendMessage) {
            window.DifyChat.sendMessage('小規模持続化補助金について教えてください');
          }
        }, 500);
      } else {
        console.error('DifyChat is not available');
        // フォールバックとしてメッセージングを維持
        window.postMessage({ type: 'CHAT_TYPE_2_CLICK', value: '小規模持続化補助金' }, '*');
      }
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
        if (window.DifyChat?.onChatCleared) {
          window.DifyChat.onChatCleared();
        }
        // 省力化投資補助金についてのメッセージを自動送信
        setTimeout(() => {
          if (window.DifyChat?.sendMessage) {
            window.DifyChat.sendMessage('省力化投資補助金について教えてください');
          }
        }, 500);
      }
    } else if (event.data.type === 'CHAT_TYPE_2_CLICK') {
      console.log("小規模持続化補助金 chat requested");
      if (window.DifyChat?.toggleBubbleWindow) {
        window.DifyChat.toggleBubbleWindow(true);
        if (window.DifyChat?.onChatCleared) {
          window.DifyChat.onChatCleared();
        }
        // 小規模持続化補助金についてのメッセージを自動送信
        setTimeout(() => {
          if (window.DifyChat?.sendMessage) {
            window.DifyChat.sendMessage('小規模持続化補助金について教えてください');
          }
        }, 500);
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

