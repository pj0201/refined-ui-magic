
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
    const button1 = document.getElementById('dify-chatbot-bubble-button-1');
    const label1 = document.getElementById('dify-chatbot-label-1');
    const button2 = document.getElementById('dify-chatbot-bubble-button-2');
    const label2 = document.getElementById('dify-chatbot-label-2');

    if (!button1 || !label1 || !button2 || !label2) {
      console.log("Chatbot elements missing, restoring...");
      addChatbotElements();
    }
  }, 1000); // より短い間隔でチェック
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
