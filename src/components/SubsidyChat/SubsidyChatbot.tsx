
import { useEffect, useState, useRef } from "react";
import { 
  initializeDifyScripts, 
  addChatbotElements, 
  cleanup 
} from "./utils/chatbotInitializer";
import { 
  startElementCheck, 
  clearCheckInterval 
} from "./utils/elementChecker";

/**
 * 補助金チャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const checkIntervalRef = useRef<number | null>(null);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 10;

  useEffect(() => {
    // DOMコンテンツが読み込まれた後に初期化する
    if (document.readyState === "complete") {
      console.log("DOM already loaded, initializing chatbot");
      initializeChatbot();
    } else {
      console.log("Waiting for DOM to load");
      window.addEventListener("DOMContentLoaded", () => {
        console.log("DOM loaded, initializing chatbot");
        initializeChatbot();
      });
      // フォールバックとして、少し遅延させても初期化する
      setTimeout(initializeChatbot, 1000);
    }

    // クリーンアップ
    return () => {
      console.log("Cleaning up subsidy chatbot");
      cleanup();
      clearCheckInterval(checkIntervalRef);
    };
  }, []);

  const initializeChatbot = () => {
    console.log("Initializing subsidy chatbot...");
    
    // 既存の要素をクリーンアップ
    cleanup();
    
    // Difyスクリプトを初期化
    initializeDifyScripts(
      // 成功時のコールバック
      () => {
        setIsLoaded(true);
        addChatbotElements();
      },
      // エラー時のコールバック
      (e) => {
        console.error("Failed to load Dify script", e);
        attemptCountRef.current++;
        if (attemptCountRef.current < MAX_ATTEMPTS) {
          console.log(`Retrying script load (attempt ${attemptCountRef.current}/${MAX_ATTEMPTS})`);
          setTimeout(initializeChatbot, 2000);
        } else {
          console.log("Maximum attempts reached, adding fallback button");
          addChatbotElements(); // スクリプトの読み込みに失敗しても要素を追加
        }
      }
    );
  };

  // 要素のチェックを開始
  useEffect(() => {
    if (isLoaded) {
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
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return null;
};
