
import { useState, useRef, useEffect } from 'react';
import { 
  initializeDifyScripts, 
  addChatbotElements, 
  cleanup 
} from '../utils/chatbotInitializer';
import { toast } from '@/components/ui/use-toast';

/**
 * カスタムフック: チャットボット初期化ロジック
 */
export const useChatbotInitializer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 3; // 最大リトライ回数を減少
  const RETRY_DELAY = 2000; // リトライ間隔（ミリ秒）- 2秒に短縮

  // チャットボット初期化処理
  const initializeChatbot = () => {
    console.log(`チャットボット初期化を開始（試行回数: ${attemptCountRef.current + 1}/${MAX_ATTEMPTS}）...`);
    
    // 既存の要素をクリーンアップ
    cleanup();
    
    // エラー状態をリセット
    setIsError(false);
    
    // Difyスクリプトを初期化
    initializeDifyScripts(
      // 成功時のコールバック
      () => {
        console.log("Dify scripts initialized successfully");
        setIsLoaded(true);
        setIsError(false);
        attemptCountRef.current = 0; // リセット
        addChatbotElements();
        
        // window.DifyChatの存在を確認
        if (window.DifyChat) {
          console.log("DifyChat object is available:", window.DifyChat);
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
          console.log("最大試行回数に達しました。エラー状態に設定します。");
          // エラー状態をセット
          setIsError(true);
          
          // エラー通知を表示
          toast({
            title: "チャットボットの読み込みに問題があります",
            description: "ネットワーク接続を確認してください。ページを再読み込みしてみてください。",
            variant: "destructive",
            duration: 5000,
          });
        }
      }
    );
  };

  // 初期化処理を開始
  useEffect(() => {
    // ネットワーク状態の監視
    const handleOnline = () => {
      console.log("ネットワーク接続が回復しました。チャットボットを再初期化します。");
      // オンラインに戻ったら再初期化
      if (isError) {
        initializeChatbot();
      }
    };
    
    window.addEventListener('online', handleOnline);
    
    // DOMContentLoadedイベントで初期化
    const domLoadedHandler = () => {
      console.log("DOM loaded, initializing chatbot");
      initializeChatbot();
    };
    
    // ページがすでに読み込まれている場合は即時初期化
    if (document.readyState === "complete") {
      console.log("DOM already loaded, initializing chatbot");
      initializeChatbot();
    } else {
      window.addEventListener("DOMContentLoaded", domLoadedHandler);
    }

    // クリーンアップ
    return () => {
      window.removeEventListener("DOMContentLoaded", domLoadedHandler);
      window.removeEventListener('online', handleOnline);
      console.log("Cleaning up from initializer hook");
      cleanup();
    };
  }, [isError]);

  return { isLoaded, isError, initializeChatbot };
};
