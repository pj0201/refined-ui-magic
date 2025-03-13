
import { useEffect } from "react";

/**
 * DOMのロード状態を監視するシンプルなカスタムフック
 */
export const useDocumentReady = (onReady: () => void) => {
  useEffect(() => {
    console.log("useDocumentReady hook triggered");
    
    // DOMコンテンツが読み込まれた後に初期化する
    if (document.readyState === "complete" || document.readyState === "interactive") {
      console.log("DOM already loaded, initializing immediately");
      onReady();
    } else {
      console.log("DOM not fully loaded, waiting for DOMContentLoaded event");
      const domLoadedHandler = () => {
        console.log("DOMContentLoaded event fired, initializing");
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
