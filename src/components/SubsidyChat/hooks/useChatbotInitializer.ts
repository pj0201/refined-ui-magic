
import { useState, useRef, useEffect } from 'react';
import { 
  initializeDifyScripts, 
  addChatbotElements, 
  cleanup 
} from '../utils/chatbotInitializer';

/**
 * カスタムフック: チャットボット初期化ロジック
 */
export const useChatbotInitializer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 3; // 最大リトライ回数

  // チャットボット初期化処理
  const initializeChatbot = () => {
    console.log("Initializing subsidy chatbot...");
    
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
      },
      // エラー時のコールバック
      (e) => {
        console.error("Failed to load Dify script", e);
        attemptCountRef.current++;
        if (attemptCountRef.current < MAX_ATTEMPTS) {
          console.log(`Retrying script load (attempt ${attemptCountRef.current}/${MAX_ATTEMPTS}) in 1.5 seconds...`);
          setTimeout(initializeChatbot, 1500); // リトライ間隔を短くする
        } else {
          console.log("Maximum attempts reached, adding fallback button");
          // スクリプトの読み込みに失敗しても要素を追加（UIを表示）
          setIsLoaded(true); // UI表示のためにロード状態を更新
          addChatbotElements();
        }
      }
    );
  };

  // 初期化処理を開始
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

    // クリーンアップ処理
    return () => {
      console.log("Cleaning up from initializer hook");
      cleanup();
    };
  }, []);

  return { isLoaded, initializeChatbot };
};
