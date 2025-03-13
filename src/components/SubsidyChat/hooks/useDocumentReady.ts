
import { useEffect, useRef } from "react";

/**
 * DOMのロード状態を監視するカスタムフック
 * 初期化処理が複数回実行されないよう制御する
 */
export const useDocumentReady = (onReady: () => void) => {
  // 初期化済みフラグを保持
  const isInitializedRef = useRef(false);

  useEffect(() => {
    console.log("SubsidyChatbot component mounted");
    
    // 既に初期化済みの場合は実行しない
    const initialize = () => {
      if (!isInitializedRef.current) {
        console.log("Initializing chatbot (first time only)");
        isInitializedRef.current = true;
        onReady();
      }
    };
    
    // DOMコンテンツが読み込まれた後に初期化する
    if (document.readyState === "complete" || document.readyState === "interactive") {
      console.log("DOM already loaded, initializing chatbot");
      initialize();
    } else {
      console.log("Waiting for DOM to load");
      const domLoadedHandler = () => {
        console.log("DOM loaded event fired, initializing chatbot");
        initialize();
      };
      
      window.addEventListener("DOMContentLoaded", domLoadedHandler);
      
      // クリーンアップ時にイベントリスナーを削除
      return () => {
        window.removeEventListener("DOMContentLoaded", domLoadedHandler);
      };
    }
  }, [onReady]);
};
