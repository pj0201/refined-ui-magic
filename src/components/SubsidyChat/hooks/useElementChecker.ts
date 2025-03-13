
import { useEffect, useRef, MutableRefObject } from "react";
import { 
  startElementCheck, 
  clearCheckInterval 
} from "../utils/elementChecker";
import { addChatbotElements } from "../utils/uiElementsBuilder";
import { createDirectChatWindow } from "../utils/directChatImplementation";

/**
 * 要素のチェックと自動復元機能を管理するカスタムフック
 */
export const useElementChecker = (isLoaded: boolean, useFallback: boolean) => {
  const checkIntervalRef = useRef<number | null>(null);
  const recoveryAttemptRef = useRef(0);
  const MAX_RECOVERY_ATTEMPTS = 5;
  const recoveryLockRef = useRef(false);
  const recoveryTimeoutRef = useRef<number | null>(null);

  // 要素の存在チェック（主要なUIボタンとラベル）
  const checkElementsExist = () => {
    const button1 = document.getElementById('dify-chatbot-bubble-button-1');
    const label1 = document.getElementById('dify-chatbot-label-1');
    const button2 = document.getElementById('dify-chatbot-bubble-button-2');
    const label2 = document.getElementById('dify-chatbot-label-2');
    
    return button1 && label1 && button2 && label2;
  };

  // 安全に要素を復元（連続実行を防止）
  const safelyRestoreElements = () => {
    if (recoveryLockRef.current) {
      console.log("Recovery already in progress, skipping");
      return;
    }
    
    if (recoveryAttemptRef.current >= MAX_RECOVERY_ATTEMPTS) {
      console.log(`Maximum recovery attempts reached (${MAX_RECOVERY_ATTEMPTS}), giving up`);
      return;
    }
    
    recoveryLockRef.current = true;
    recoveryAttemptRef.current++;
    
    console.log(`Restoring UI elements (attempt ${recoveryAttemptRef.current}/${MAX_RECOVERY_ATTEMPTS})`);
    
    try {
      addChatbotElements();
      
      if (useFallback) {
        const chatWindow = document.getElementById('direct-chat-window');
        if (!chatWindow) {
          console.log("Direct chat window missing, restoring");
          createDirectChatWindow();
        }
      }
    } catch (e) {
      console.error("Error during element recovery:", e);
    }
    
    // 10秒後にロックを解除
    if (recoveryTimeoutRef.current) {
      window.clearTimeout(recoveryTimeoutRef.current);
    }
    
    recoveryTimeoutRef.current = window.setTimeout(() => {
      recoveryLockRef.current = false;
      recoveryTimeoutRef.current = null;
    }, 10000);
  };

  // 要素のチェックを開始
  useEffect(() => {
    if (isLoaded) {
      console.log("Starting element check");
      
      // 初期化時に一度だけUIを確実に追加
      const elementsExist = checkElementsExist();
      if (!elementsExist) {
        console.log("Initial UI elements missing, adding them");
        addChatbotElements();
      }
      
      // 定期的なチェックを開始
      startElementCheck(checkIntervalRef);
    }
    
    return () => {
      clearCheckInterval(checkIntervalRef);
      
      // クリーンアップ時にロックタイマーも解除
      if (recoveryTimeoutRef.current) {
        window.clearTimeout(recoveryTimeoutRef.current);
        recoveryTimeoutRef.current = null;
      }
    };
  }, [isLoaded]);

  // 画面の表示状態や焦点変更時の要素チェック
  useEffect(() => {
    // 前回のチェック時刻（連続チェックを防止）
    let lastCheckTime = 0;
    const CHECK_INTERVAL_MS = 3000; // 最小チェック間隔（3秒）
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        const now = Date.now();
        if (now - lastCheckTime < CHECK_INTERVAL_MS) {
          console.log("Check interval too short, skipping visibility check");
          return;
        }
        
        lastCheckTime = now;
        console.log("Page became visible, checking elements");
        
        if (!checkElementsExist()) {
          safelyRestoreElements();
        }
      }
    };
    
    const handleFocus = () => {
      const now = Date.now();
      if (now - lastCheckTime < CHECK_INTERVAL_MS) {
        console.log("Check interval too short, skipping focus check");
        return;
      }
      
      lastCheckTime = now;
      console.log("Window focus detected, checking elements");
      
      if (!checkElementsExist()) {
        safelyRestoreElements();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [useFallback]);

  return {
    checkIntervalRef
  };
};
