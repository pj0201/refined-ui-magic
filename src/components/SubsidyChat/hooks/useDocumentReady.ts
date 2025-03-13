
import { useEffect } from "react";

/**
 * DOMのロード状態を監視するカスタムフック
 */
export const useDocumentReady = (onReady: () => void) => {
  useEffect(() => {
    console.log("SubsidyChatbot component mounted");
    
    // すぐに初期化関数を呼び出す
    onReady();
    
    // cleanup function
    return () => {
      console.log("useDocumentReady cleanup");
    };
  }, [onReady]);
};
