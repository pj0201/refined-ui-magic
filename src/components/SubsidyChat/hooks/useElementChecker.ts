
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
    return () => clearCheckInterval(checkIntervalRef);
  }, [isLoaded]);

  // チャットボット要素の存在チェック
  const checkElementsExist = () => {
    const button1 = document.getElementById('dify-chatbot-bubble-button-1');
    const label1 = document.getElementById('dify-chatbot-label-1');
    const button2 = document.getElementById('dify-chatbot-bubble-button-2');
    const label2 = document.getElementById('dify-chatbot-label-2');
    
    return button1 && label1 && button2 && label2;
  };

  // フォーカスを戻したときに要素を再チェック
  useEffect(() => {
    const handleFocus = () => {
      console.log("Window focus detected, checking elements");
      
      if (!checkElementsExist() && recoveryAttemptRef.current < MAX_RECOVERY_ATTEMPTS) {
        console.log(`Elements missing after focus, restoring (attempt ${recoveryAttemptRef.current + 1}/${MAX_RECOVERY_ATTEMPTS})`);
        recoveryAttemptRef.current++;
        addChatbotElements();
      }
      
      // フォールバックモードの場合はチャットウィンドウも確認
      if (useFallback) {
        const chatWindow = document.getElementById('direct-chat-window');
        if (!chatWindow && recoveryAttemptRef.current < MAX_RECOVERY_ATTEMPTS) {
          console.log("Direct chat window missing, restoring");
          createDirectChatWindow();
        }
      }
    };
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Page became visible, checking elements");
        handleFocus();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [useFallback]);

  return {
    checkIntervalRef
  };
};
