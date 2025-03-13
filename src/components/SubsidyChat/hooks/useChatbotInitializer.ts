
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
  const RETRY_DELAY = 2000; // リトライ間隔（ミリ秒）- 2秒に延長

  // チャットボット初期化処理
  const initializeChatbot = () => {
    console.log(`チャットボット初期化を開始（試行回数: ${attemptCountRef.current + 1}/${MAX_ATTEMPTS}）...`);
    
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
        
        // window.DifyChatの存在を確認
        if (window.DifyChat) {
          console.log("DifyChat object is available:", window.DifyChat);
        } else {
          console.warn("DifyChat object is not available yet. Will use fallback messaging.");
        }
      },
      // エラー時のコールバック
      (e) => {
        const errorMsg = e instanceof Error ? e.message : 'Unknown error';
        console.error(`Difyスクリプト読み込み失敗（${attemptCountRef.current + 1}/${MAX_ATTEMPTS}）: ${errorMsg}`, e);
        
        attemptCountRef.current++;
        if (attemptCountRef.current < MAX_ATTEMPTS) {
          console.log(`スクリプト読み込みをリトライします（${attemptCountRef.current}/${MAX_ATTEMPTS}）${RETRY_DELAY/1000}秒後...`);
          setTimeout(initializeChatbot, RETRY_DELAY);
        } else {
          console.log("最大試行回数に達しました。フォールバックボタンを追加します。");
          // スクリプトの読み込みに失敗しても要素を追加（UIを表示）
          setIsLoaded(true); // UI表示のためにロード状態を更新
          addChatbotElements();
        }
      }
    );
  };

  // 初期化処理を開始
  useEffect(() => {
    // ページがすでに読み込まれている場合は即時初期化
    if (document.readyState === "complete") {
      console.log("DOM already loaded, initializing chatbot");
      initializeChatbot();
    } else {
      console.log("Waiting for DOM to load");
      
      // DOMContentLoadedイベントで初期化
      const domLoadedHandler = () => {
        console.log("DOM loaded, initializing chatbot");
        initializeChatbot();
      };
      
      window.addEventListener("DOMContentLoaded", domLoadedHandler);
      
      // フォールバックとして、遅延初期化も設定
      const timeoutId = setTimeout(() => {
        console.log("Initializing chatbot after timeout");
        initializeChatbot();
      }, 1500);

      // クリーンアップ
      return () => {
        window.removeEventListener("DOMContentLoaded", domLoadedHandler);
        clearTimeout(timeoutId);
        console.log("Cleaning up from initializer hook");
        cleanup();
      };
    }
  }, []);

  return { isLoaded, initializeChatbot };
};
