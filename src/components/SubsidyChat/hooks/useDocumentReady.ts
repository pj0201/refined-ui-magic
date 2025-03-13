
import { useEffect } from "react";

/**
 * DOMのロード状態を監視するシンプルなカスタムフック
 */
export const useDocumentReady = (onReady: () => void) => {
  useEffect(() => {
    console.log("SubsidyChatbot component mounted");
    
    // DOMコンテンツが読み込まれた後に初期化する
    if (document.readyState === "complete" || document.readyState === "interactive") {
      console.log("DOM already loaded, initializing chatbot");
      onReady();
    } else {
      console.log("Waiting for DOM to load");
      const domLoadedHandler = () => {
        console.log("DOM loaded event fired, initializing chatbot");
        onReady();
      };
      
      window.addEventListener("DOMContentLoaded", domLoadedHandler);
      
      // クリーンアップ時にイベントリスナーを削除
      return () => {
        window.removeEventListener("DOMContentLoaded", domLoadedHandler);
      };
    }
  }, [onReady]);
};
