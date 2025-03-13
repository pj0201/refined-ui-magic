
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

  // 要素のチェックを開始
  useEffect(() => {
    if (isLoaded) {
      console.log("Starting element check");
      startElementCheck(checkIntervalRef);
    }
    return () => clearCheckInterval(checkIntervalRef);
  }, [isLoaded]);

  // フォーカスを戻したときに要素を再チェック
  useEffect(() => {
    const handleFocus = () => {
      console.log("Window focus detected, checking elements");
      const button1 = document.getElementById('dify-chatbot-bubble-button-1');
      const label1 = document.getElementById('dify-chatbot-label-1');
      const button2 = document.getElementById('dify-chatbot-bubble-button-2');
      const label2 = document.getElementById('dify-chatbot-label-2');
      
      if (!button1 || !label1 || !button2 || !label2) {
        console.log("Elements missing after focus, restoring");
        addChatbotElements();
      }
      
      // フォールバックモードの場合はチャットウィンドウも確認
      if (useFallback) {
        const chatWindow = document.getElementById('direct-chat-window');
        if (!chatWindow) {
          console.log("Direct chat window missing, restoring");
          createDirectChatWindow();
        }
      }
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, [useFallback]);

  return {
    checkIntervalRef
  };
};
