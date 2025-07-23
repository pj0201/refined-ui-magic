import { useEffect } from "react";
import { useChatbotInitializer } from "./hooks/useChatbotInitializer";
import { initializeChatbotStyles } from "./utils/styleUtils";
import { setupGlobalFunctions } from "./utils/globalFunctions";

export const ChatbotInitializer = () => {
  const { initializeChatbots, resetChatbots } = useChatbotInitializer();

  useEffect(() => {
    console.log("ChatbotInitializer: 初期化を開始します");
    
    // スタイルを初期化
    initializeChatbotStyles();
    
    // グローバル関数を設定
    setupGlobalFunctions();
    
    // チャットボットを初期化
    initializeChatbots();
    
    // 5秒間隔で状態をチェック
    const checkInterval = setInterval(() => {
      const shoukiboWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
      const shorikikaWindow = document.getElementById('shorikika-chatbot-window');
      
      if (!shoukiboWindow || !shorikikaWindow) {
        console.log("ChatbotInitializer: チャットボットウィンドウが見つからないため、再初期化します");
        resetChatbots();
        initializeChatbots();
      }
    }, 5000);

    return () => clearInterval(checkInterval);
  }, [initializeChatbots, resetChatbots]);

  return null;
};