
import { useEffect } from "react";

/**
 * DOMのロード状態を監視するカスタムフック
 */
export const useDocumentReady = (onReady: () => void) => {
  useEffect(() => {
    console.log("SubsidyChatbot component mounted");
    
    // DOMコンテンツが読み込まれた後に初期化する
    if (document.readyState === "complete") {
      console.log("DOM already loaded, initializing chatbot");
      onReady();
    } else {
      console.log("Waiting for DOM to load");
      window.addEventListener("DOMContentLoaded", () => {
        console.log("DOM loaded, initializing chatbot");
        onReady();
      });
      // フォールバックとして、少し遅延させても初期化する
      setTimeout(onReady, 1000);
    }
  }, [onReady]);
};
