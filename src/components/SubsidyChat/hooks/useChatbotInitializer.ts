
import { useState, useRef, useEffect } from "react";
import { 
  initializeDifyScripts, 
  addChatbotElements, 
  cleanup 
} from "../utils/chatbotInitializer";
import { createDirectChatWindow } from "../utils/directChatImplementation";

/**
 * Custom hook to handle the initialization of the chatbot
 */
export const useChatbotInitializer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 3; // 最大リトライ回数

  const initializeChatbot = () => {
    console.log("Initializing small business subsidy chatbot...");
    
    // 既存の要素をクリーンアップ
    cleanup();
    
    // フォールバックモードが有効の場合は直接実装を使用
    if (useFallback) {
      console.log("Using fallback implementation");
      createDirectChatWindow();
      addChatbotElements();
      setIsLoaded(true);
      return;
    }
    
    // Difyスクリプトを初期化
    initializeDifyScripts(
      // 成功時のコールバック
      () => {
        console.log("Dify scripts initialized successfully");
        setIsLoaded(true);
        attemptCountRef.current = 0; // リセット
        
        // 確認のために一定時間後にグローバルオブジェクトを再確認
        setTimeout(() => {
          console.log("Re-checking Dify global objects");
          console.log('DifyAI available:', !!window.DifyAI);
          console.log('__DIFY_CHAT_CONFIG__ available:', !!window.__DIFY_CHAT_CONFIG__);
          
          // Window型定義の問題を解決
          const hasLegacyDifyChat = typeof window.DifyChat !== 'undefined';
          const hasLegacyDifyChatbot = typeof window.difyChatbot !== 'undefined';
          
          console.log('Legacy DifyChat available:', hasLegacyDifyChat);
          console.log('Legacy difyChatbot available:', hasLegacyDifyChatbot);
          
          // Difyのオブジェクトが存在しない場合はフォールバックモードを有効化
          if (!window.DifyAI && !hasLegacyDifyChat && !hasLegacyDifyChatbot) {
            console.log("No Dify objects detected, enabling fallback mode");
            setUseFallback(true);
            cleanup();
            createDirectChatWindow();
          }
          
          // Difyウィジェットの状態を確認
          const chatElements = document.querySelectorAll('[id*="dify"], [class*="dify"], [id*="chat"], [class*="chat"]');
          console.log(`Found ${chatElements.length} potential Dify elements in the DOM`);
        }, 3000);
      },
      // エラー時のコールバック
      (e) => {
        console.error("Failed to load Dify script", e);
        attemptCountRef.current++;
        if (attemptCountRef.current < MAX_ATTEMPTS) {
          console.log(`Retrying script load (attempt ${attemptCountRef.current}/${MAX_ATTEMPTS}) in 1.5 seconds...`);
          setTimeout(initializeChatbot, 1500);
        } else {
          console.log("Maximum attempts reached, enabling fallback mode");
          setUseFallback(true);
          setIsLoaded(true);
          
          // フォールバックモードのチャットウィンドウを作成
          createDirectChatWindow();
          
          // 通常のUIボタンも追加
          addChatbotElements();
        }
      }
    );
  };

  useEffect(() => {
    if (useFallback) {
      console.log("Fallback mode enabled, reinitializing");
      cleanup();
      createDirectChatWindow();
      addChatbotElements();
    }
  }, [useFallback]);

  return {
    isLoaded,
    useFallback,
    initializeChatbot,
  };
};
