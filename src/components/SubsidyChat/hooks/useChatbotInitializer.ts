
import { useState, useRef, useEffect } from "react";
import { 
  initializeDifyScripts, 
  addChatbotElements, 
  cleanup 
} from "../utils/chatbotInitializer";
import { createDirectChatWindow } from "../utils/directChatImplementation";

/**
 * Custom hook to handle the initialization of the chatbot
 */
export const useChatbotInitializer = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 3; // 最大リトライ回数
  const fallbackActivatedRef = useRef(false);

  const initializeChatbot = () => {
    console.log("Initializing small business subsidy chatbot...");
    
    // フォールバックモードがまだ有効になっていない場合
    if (!fallbackActivatedRef.current) {
      // スクリプトのロード前に必ずUIを追加しておく
      addChatbotElements();
      
      // Difyスクリプトを初期化
      initializeDifyScripts(
        // 成功時のコールバック
        () => {
          console.log("Dify scripts initialized successfully");
          setIsLoaded(true);
          attemptCountRef.current = 0; // リセット
        },
        // エラー時のコールバック
        (e) => {
          console.error("Failed to load Dify script", e);
          attemptCountRef.current++;
          if (attemptCountRef.current < MAX_ATTEMPTS) {
            console.log(`Retrying script load (attempt ${attemptCountRef.current}/${MAX_ATTEMPTS}) in 1.5 seconds...`);
            setTimeout(() => {
              // 部分的クリーンアップ（UIボタンは残す）
              cleanup(true);
              initializeChatbot();
            }, 1500);
          } else {
            console.log("Maximum attempts reached, enabling fallback mode");
            fallbackActivatedRef.current = true;
            setUseFallback(true);
            setIsLoaded(true);
            
            // フォールバックモードのチャットウィンドウを作成
            createDirectChatWindow();
            
            // UIボタンは既に表示されている
          }
        }
      );
    } else {
      // フォールバックモードが既に有効の場合は直接実装を使用
      console.log("Using fallback implementation (already activated)");
      
      // 念のためUIエレメントを確認・追加
      const container = document.getElementById('chatbot-elements-container');
      if (!container) {
        console.log("Ensuring UI elements are present");
        addChatbotElements();
      }
      
      createDirectChatWindow();
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    if (useFallback && !fallbackActivatedRef.current) {
      console.log("Fallback mode enabled, reinitializing");
      fallbackActivatedRef.current = true;
      
      // 既存のチャットウィンドウを確認
      const chatWindow = document.getElementById('direct-chat-window');
      if (!chatWindow) {
        createDirectChatWindow();
      }
      
      // UIボタンを確認
      const container = document.getElementById('chatbot-elements-container');
      if (!container) {
        addChatbotElements();
      }
    }
  }, [useFallback]);

  return {
    isLoaded,
    useFallback,
    initializeChatbot,
  };
};
