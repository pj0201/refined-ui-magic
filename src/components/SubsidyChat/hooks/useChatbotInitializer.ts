
import { useState, useRef, useEffect } from 'react';
import { 
  initializeDifyScripts, 
  cleanup 
} from '../utils/scriptInitializer';
import { addChatbotElements } from '../utils/chatUIElements';
import { toast } from '@/components/ui/use-toast';

/**
 * カスタムフック: チャットボット初期化ロジック
 */
export const useChatbotInitializer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 5; // 最大リトライ回数を増加
  const RETRY_DELAY = 3000; // リトライ間隔（ミリ秒）- 3秒に延長

  // チャットボット初期化処理
  const initializeChatbot = () => {
    console.log(`チャットボット初期化を開始（試行回数: ${attemptCountRef.current + 1}/${MAX_ATTEMPTS}）...`);
    
    // 既存の要素をクリーンアップ
    cleanup();
    
    // エラー状態をリセット
    setIsError(false);
    
    // Difyスクリプトを初期化
    initializeDifyScripts((success, source) => {
      if (success) {
        console.log("Dify scripts initialized successfully from source:", source);
        setIsLoaded(true);
        setIsError(false);
        attemptCountRef.current = 0; // リセット
        addChatbotElements();
        
        // window.DifyChatの存在を確認
        if (window.DifyChat) {
          console.log("DifyChat object is available:", window.DifyChat);
          // オプションで成功通知
          if (attemptCountRef.current > 1) {
            toast({
              title: "チャットボットの準備ができました",
              description: "補助金についての質問ができます",
              duration: 3000,
            });
          }
        } else {
          console.warn("DifyChat object is not available yet. Will use fallback messaging.");
        }
      } else {
        console.error(`Difyスクリプト読み込み失敗（${attemptCountRef.current + 1}/${MAX_ATTEMPTS}）`);
        
        attemptCountRef.current++;
        if (attemptCountRef.current < MAX_ATTEMPTS) {
          console.log(`スクリプト読み込みをリトライします（${attemptCountRef.current}/${MAX_ATTEMPTS}）${RETRY_DELAY/1000}秒後...`);
          setTimeout(initializeChatbot, RETRY_DELAY);
        } else {
          console.log("最大試行回数に達しました。フォールバックモードに切り替えます。");
          // エラー状態をセット
          setIsError(true);
          // スクリプトの読み込みに失敗しても要素を追加（UIを表示）
          setIsLoaded(true); // UI表示のためにロード状態を更新
          addChatbotElements();
          
          // エラー通知を表示
          toast({
            title: "チャットボットの読み込みに問題があります",
            description: "ネットワーク接続を確認してください。限定機能で利用できます。",
            variant: "destructive",
            duration: 5000,
          });
        }
      }
    });
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
        window.removeEventListener('online', handleOnline);
        clearTimeout(timeoutId);
        console.log("Cleaning up from initializer hook");
        cleanup();
      };
    }
  }, [isError]);

  return { isLoaded, isError, initializeChatbot };
};

