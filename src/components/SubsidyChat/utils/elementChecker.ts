
import { addChatbotElements } from './chatbotInitializer';

/**
 * チャットボット要素の存在チェック
 */
export const startElementCheck = (checkIntervalRef: React.MutableRefObject<number | null>): void => {
  console.log("Starting element check interval");
  if (checkIntervalRef.current) {
    clearInterval(checkIntervalRef.current);
  }

  checkIntervalRef.current = window.setInterval(() => {
    const container = document.getElementById('chatbot-elements-container');
    
    if (!container) {
      console.log("Chatbot container missing, restoring...");
      addChatbotElements();
    } else {
      // コンテナがあっても中の要素が揃っているか確認
      const button1 = document.getElementById('dify-chatbot-bubble-button-1');
      const label1 = document.getElementById('dify-chatbot-label-1');
      const button2 = document.getElementById('dify-chatbot-bubble-button-2');
      const label2 = document.getElementById('dify-chatbot-label-2');
      
      if (!button1 || !label1 || !button2 || !label2) {
        console.log("Chatbot elements missing from container, restoring...");
        addChatbotElements();
      }
    }
    
    // Difyのチャットウィンドウの位置を調整
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      const viewportHeight = window.innerHeight;
      const chatWindowHeight = chatWindow.clientHeight;
      
      // ウィンドウがビューポートからはみ出る場合は位置を調整
      if (chatWindowHeight > viewportHeight - 100) {
        chatWindow.style.height = (viewportHeight - 100) + 'px';
        chatWindow.style.top = '50px';
      }
    }
  }, 1000);
};

/**
 * インターバルクリア
 */
export const clearCheckInterval = (checkIntervalRef: React.MutableRefObject<number | null>): void => {
  if (checkIntervalRef.current) {
    console.log("Clearing check interval");
    clearInterval(checkIntervalRef.current);
    checkIntervalRef.current = null;
  }
};
