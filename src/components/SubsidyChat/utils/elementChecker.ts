
import { addChatbotElements } from './uiElementsBuilder';

// 再作成ロック（連続再作成を防止）
let recreationLock = false;
let lockTimeoutId: number | null = null;

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

  // まず初期チェックを実行
  performElementCheck();

  // 定期的なチェックを開始
  checkIntervalRef.current = window.setInterval(performElementCheck, 3000); // 3秒間隔（負荷軽減）

  function performElementCheck() {
    // ロック中は処理をスキップ
    if (recreationLock) {
      console.log("Element check skipped (recreation lock active)");
      return;
    }

    const container = document.getElementById('chatbot-elements-container');
    const button1 = document.getElementById('dify-chatbot-bubble-button-1');
    const label1 = document.getElementById('dify-chatbot-label-1');
    const button2 = document.getElementById('dify-chatbot-bubble-button-2');
    const label2 = document.getElementById('dify-chatbot-label-2');
    
    // すべての要素が揃っているか確認
    if (!container || !button1 || !label1 || !button2 || !label2) {
      consecutiveMissingCount++;
      console.log(`UI elements missing (${consecutiveMissingCount}/${MAX_CONSECUTIVE_MISSING} consecutive checks)`);
      
      // 連続して要素が見つからない場合のみ再作成
      if (consecutiveMissingCount >= MAX_CONSECUTIVE_MISSING) {
        console.log("Consecutively missing UI elements, restoring...");
        restoreElements();
        consecutiveMissingCount = 0;
      }
    } else {
      // 要素が見つかった場合はカウンターをリセット
      if (consecutiveMissingCount > 0) {
        console.log("UI elements found, resetting missing counter");
        consecutiveMissingCount = 0;
      }
    }
    
    // Difyのチャットウィンドウの位置を調整（存在する場合のみ）
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
  }

  // 要素の復元処理（連続再作成防止ロックつき）
  function restoreElements() {
    if (recreationLock) return;
    
    // ロックを設定（10秒間、他の再作成を防止）
    recreationLock = true;
    
    // 既存のロックタイマーがあればクリア
    if (lockTimeoutId) {
      window.clearTimeout(lockTimeoutId);
    }
    
    try {
      console.log("Adding chatbot elements with recreation lock");
      addChatbotElements();
    } catch (e) {
      console.error("Error while restoring elements:", e);
    }
    
    // 10秒後にロックを解除
    lockTimeoutId = window.setTimeout(() => {
      console.log("Recreation lock released");
      recreationLock = false;
      lockTimeoutId = null;
    }, 10000);
  }
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
  
  // ロックタイマーもクリア
  if (lockTimeoutId) {
    window.clearTimeout(lockTimeoutId);
    lockTimeoutId = null;
  }
};
