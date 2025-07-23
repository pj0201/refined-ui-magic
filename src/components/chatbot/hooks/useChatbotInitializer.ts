import { useCallback } from "react";
import { createScriptBasedChatWindow } from "../utils/buttonUtils";

export const useChatbotInitializer = () => {
  const initializeChatbots = useCallback(() => {
    console.log("useChatbotInitializer: チャットボットの初期化を開始");
    
    try {
      // 小規模事業者持続化補助金チャットボット
      const shoukiboConfig = {
        chatbotId: "shoukibo-jizoka-chatbot-window",
        title: "小規模事業者持続化補助金 AI相談",
        token: "dify_dHNiRXQ0V0xVT01LVWFnZGNlZzkyR242"
      };
      
      createScriptBasedChatWindow(shoukiboConfig);
      
      // 省力化投資補助金チャットボット
      const shorikikaConfig = {
        chatbotId: "shorikika-chatbot-window", 
        title: "省力化投資補助金 AI相談",
        token: "dify_6vGNQsGMhR9IxcKFUoFe4NKL"
      };
      
      createScriptBasedChatWindow(shorikikaConfig);
      
      // 初期化完了をマーク
      window.chatbotsInitialized = true;
      
      // イベントを発火
      const event = new CustomEvent('chatbotsInitialized');
      document.dispatchEvent(event);
      
      console.log("useChatbotInitializer: チャットボット初期化完了");
      
    } catch (error) {
      console.error("useChatbotInitializer: チャットボット初期化エラー:", error);
    }
  }, []);

  const resetChatbots = useCallback(() => {
    console.log("useChatbotInitializer: チャットボットのリセットを開始");
    
    // 既存のチャットボットを削除
    const shoukiboWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
    if (shoukiboWindow) {
      shoukiboWindow.remove();
    }
    
    const shorikikaWindow = document.getElementById('shorikika-chatbot-window');
    if (shorikikaWindow) {
      shorikikaWindow.remove();
    }
    
    // 初期化フラグをリセット
    window.chatbotsInitialized = false;
    
    console.log("useChatbotInitializer: チャットボットリセット完了");
  }, []);

  return {
    initializeChatbots,
    resetChatbots
  };
};