
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
// Import Dify types to ensure type checking
import "./types/dify.d.ts";

/**
 * 補助金チャットボットコンポーネント（小規模持続化補助金対応）
 */
export const SubsidyChatbot = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const checkIntervalRef = useRef<number | null>(null);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 3; // 最大リトライ回数

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
    console.log("Initializing small business subsidy chatbot...");
    
    // 既存の要素をクリーンアップ
    cleanup();
    
    // Difyスクリプトを初期化
    initializeDifyScripts(
      // 成功時のコールバック
      () => {
        console.log("Dify scripts initialized successfully");
        setIsLoaded(true);
        attemptCountRef.current = 0; // リセット
        addChatbotElements();
        
        // Difyチャットウィンドウのサイズと位置を調整
        const adjustChatWindow = () => {
          const chatWindow = document.getElementById('dify-chatbot-bubble-window');
          if (chatWindow) {
            const viewportHeight = window.innerHeight;
            const chatWindowHeight = chatWindow.clientHeight;
            
            if (chatWindowHeight > viewportHeight - 100) {
              chatWindow.style.height = (viewportHeight - 100) + 'px';
              chatWindow.style.top = '50px';
            }
          }
        };
        
        // ウィンドウリサイズ時にチャットウィンドウを調整
        window.addEventListener('resize', adjustChatWindow);
        // 初期調整
        setTimeout(adjustChatWindow, 1000);
      },
      // エラー時のコールバック
      (e) => {
        console.error("Failed to load Dify script", e);
        attemptCountRef.current++;
        if (attemptCountRef.current < MAX_ATTEMPTS) {
          console.log(`Retrying script load (attempt ${attemptCountRef.current}/${MAX_ATTEMPTS}) in 1.5 seconds...`);
          setTimeout(initializeChatbot, 1500);
        } else {
          console.log("Maximum attempts reached, adding fallback button");
          // スクリプトの読み込みに失敗しても要素を追加（UIを表示）
          setIsLoaded(true);
          addChatbotElements();
        }
      }
    );
  };

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
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // Difyチャットボットの変更検出と自動調整
  useEffect(() => {
    if (isLoaded) {
      // チャットウィンドウ状態の監視
      const chatWindowObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList') {
            const chatWindow = document.getElementById('dify-chatbot-bubble-window');
            if (chatWindow) {
              // チャットウィンドウが表示されたら位置調整
              const viewportHeight = window.innerHeight;
              const chatWindowHeight = chatWindow.clientHeight;
              
              if (chatWindowHeight > viewportHeight - 100) {
                chatWindow.style.height = (viewportHeight - 100) + 'px';
                chatWindow.style.top = '50px';
              }
            }
          }
        });
      });
      
      // body要素を監視して、チャットウィンドウの追加を検出
      chatWindowObserver.observe(document.body, { childList: true, subtree: true });
      
      return () => {
        chatWindowObserver.disconnect();
      };
    }
  }, [isLoaded]);

  return null;
};
