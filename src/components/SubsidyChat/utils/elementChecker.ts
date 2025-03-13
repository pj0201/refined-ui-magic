
import { addChatbotElements } from './uiElementsBuilder';

/**
 * チャットボット要素の存在チェック
 */
export const startElementCheck = (checkIntervalRef: React.MutableRefObject<number | null>): void => {
  console.log("Starting element check interval");
  
  // 既存のインターバルがあれば一度クリア
  if (checkIntervalRef.current) {
    clearInterval(checkIntervalRef.current);
    checkIntervalRef.current = null;
  }

  let consecutiveMissingCount = 0;
  const MAX_CONSECUTIVE_MISSING = 3;

  checkIntervalRef.current = window.setInterval(() => {
    const container = document.getElementById('chatbot-elements-container');
    const button1 = document.getElementById('dify-chatbot-bubble-button-1');
    const label1 = document.getElementById('dify-chatbot-label-1');
    const button2 = document.getElementById('dify-chatbot-bubble-button-2');
    const label2 = document.getElementById('dify-chatbot-label-2');
    
    // すべての要素が揃っているか確認
    if (!container || !button1 || !label1 || !button2 || !label2) {
      consecutiveMissingCount++;
      console.log(`UI elements missing (${consecutiveMissingCount}/${MAX_CONSECUTIVE_MISSING} consecutive checks)`);
      
      // 連続して要素が見つからない場合のみ再作成（一時的な非表示状態を許容）
      if (consecutiveMissingCount >= MAX_CONSECUTIVE_MISSING) {
        console.log("Consecutively missing UI elements, restoring...");
        consecutiveMissingCount = 0;
        addChatbotElements();
      }
    } else {
      // 要素が見つかった場合はカウンターをリセット
      if (consecutiveMissingCount > 0) {
        console.log("UI elements found, resetting missing counter");
        consecutiveMissingCount = 0;
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
  }, 2000); // 2秒間隔でチェック（負荷を減らすため1秒から2秒に変更）
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
