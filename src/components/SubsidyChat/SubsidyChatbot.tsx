
import { useEffect } from "react";
import { cleanup } from "./utils/chatbotInitializer";
// Import custom hooks
import { useChatbotInitializer } from "./hooks/useChatbotInitializer";
import { useElementChecker } from "./hooks/useElementChecker";
import { useChatWindowAdjuster } from "./hooks/useChatWindowAdjuster";
import { useDocumentReady } from "./hooks/useDocumentReady";
// Import Dify types to ensure type checking
import "./types/dify.d.ts";

/**
 * 補助金チャットボットコンポーネント（小規模持続化補助金対応）
 */
export const SubsidyChatbot = () => {
  // 初期化機能を使用
  const { isLoaded, useFallback, initializeChatbot } = useChatbotInitializer();
  
  // 要素チェック機能を使用
  const { checkIntervalRef } = useElementChecker(isLoaded, useFallback);
  
  // チャットウィンドウの調整機能を使用
  useChatWindowAdjuster(isLoaded);
  
  // ドキュメントの準備完了を検知
  useDocumentReady(initializeChatbot);

  // クリーンアップ
  useEffect(() => {
    return () => {
      console.log("Cleaning up subsidy chatbot");
      cleanup();
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
        checkIntervalRef.current = null;
      }
    };
  }, []);

  return null;
};
