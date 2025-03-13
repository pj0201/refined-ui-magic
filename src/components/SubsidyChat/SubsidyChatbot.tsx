
import { useEffect, useRef } from "react";
import { cleanup } from "./utils/chatbotInitializer";
import { clearCheckInterval } from "./utils/elementChecker";
import { useChatbotInitializer } from "./hooks/useChatbotInitializer";
import { useElementMonitor } from "./hooks/useElementMonitor";
import { toast } from "@/components/ui/use-toast";

/**
 * 補助金チャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  // チャットボットの初期化ロジックをカスタムフックで管理
  const { isLoaded, isError, initializeChatbot } = useChatbotInitializer();
  
  // 初期化の試行回数を追跡
  const initAttemptsRef = useRef(0);
  const MAX_INIT_ATTEMPTS = 3;
  
  // チャットボット要素のモニタリングをカスタムフックで管理
  const elementMonitor = useElementMonitor(isLoaded);
  
  // Difyチャットの状態を定期チェック
  elementMonitor.checkDifyStatus(initializeChatbot);
  
  // デバッグ情報と状態監視
  useEffect(() => {
    console.log(`SubsidyChatbot: チャットボットのロード状態: ${isLoaded ? '完了' : '未完了'}, エラー状態: ${isError ? 'エラー' : '正常'}`);
    
    // エラー状態がトリガーされたとき、初期化の追加試行を実行
    if (isError && initAttemptsRef.current < MAX_INIT_ATTEMPTS) {
      const retryDelay = 10000; // 10秒後に再試行
      console.log(`エラー状態を検出しました。${retryDelay/1000}秒後に再初期化を試みます (${initAttemptsRef.current + 1}/${MAX_INIT_ATTEMPTS})`);
      
      const retryTimeout = setTimeout(() => {
        initAttemptsRef.current++;
        console.log(`自動再初期化を実行します (${initAttemptsRef.current}/${MAX_INIT_ATTEMPTS})`);
        initializeChatbot();
      }, retryDelay);
      
      return () => clearTimeout(retryTimeout);
    }
    
    // ライフサイクルログ
    return () => {
      console.log("SubsidyChatbot: コンポーネントがアンマウントされました");
      cleanup();
    };
  }, [isLoaded, isError, initializeChatbot]);
  
  // ページの完全な読み込み完了を監視（画像やその他リソースも含む）
  useEffect(() => {
    const handleLoad = () => {
      console.log("ページが完全に読み込まれました。チャットボットの状態を確認します。");
      
      // 既にロードされているか確認
      if (!isLoaded && !document.getElementById('chatbot-elements-container')) {
        console.log("ページ読み込み完了後、チャットボットが初期化されていません。初期化を実行します。");
        // 遅延実行してページの他の処理を妨げないようにする
        setTimeout(initializeChatbot, 500);
      }
    };
    
    // ページ読み込み完了イベントを監視
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [isLoaded, initializeChatbot]);
  
  // 開発モードではブラウザ更新を監視
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("SubsidyChatbot: ページが再表示されました。チャットボット要素を確認します。");
        if (!document.getElementById('chatbot-elements-container')) {
          console.log("SubsidyChatbot: チャットボット要素が見つかりません。再初期化します。");
          initializeChatbot();
        } else {
          // 要素はあってもDifyChatオブジェクトが利用可能かチェック
          if (!window.DifyChat) {
            console.log("SubsidyChatbot: DifyChatオブジェクトが見つかりません。再初期化を検討します。");
            
            // 一定時間DifyChatが初期化されなかった場合に再初期化
            const checkDifyTimeout = setTimeout(() => {
              if (!window.DifyChat) {
                console.log("SubsidyChatbot: DifyChatオブジェクトが見つからないまま。再初期化します。");
                initializeChatbot();
              }
            }, 5000); // 5秒待機
            
            return () => clearTimeout(checkDifyTimeout);
          }
        }
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // ネットワーク状態の変化を監視
    const handleOnline = () => {
      console.log("SubsidyChatbot: ネットワーク接続が回復しました。チャットボットを確認します。");
      // オンラインに戻ったらチャットボットが利用可能か確認
      if (!window.DifyChat || isError) {
        toast({
          title: "ネットワーク接続が回復しました",
          description: "チャットボットを再初期化します",
          duration: 3000,
        });
        // 少し遅延させてから初期化
        setTimeout(initializeChatbot, 1000);
      }
    };
    
    const handleOffline = () => {
      console.log("SubsidyChatbot: ネットワーク接続が切断されました。");
      toast({
        title: "ネットワーク接続が切断されました",
        description: "チャットボットが一時的に利用できなくなる可能性があります",
        variant: "destructive",
        duration: 5000,
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      console.log("Cleaning up subsidy chatbot");
      cleanup();
    };
  }, [initializeChatbot, isError]);

  // コンポーネントは何も描画しない (チャットUI要素は動的に生成される)
  return null;
};
