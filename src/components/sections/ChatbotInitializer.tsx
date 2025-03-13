
import { useState, useEffect } from "react";
import { DIFY_CONFIG } from "@/components/SubsidyChat/utils/difyConfig";
import { getChatbotWindowStyles } from "@/components/SubsidyChat/styles/chatbotWindowStyles";

export const ChatbotInitializer = () => {
  const [isChatbotWindowVisible, setIsChatbotWindowVisible] = useState(false);
  
  const openChatbot = () => {
    console.log("Opening chatbot...");
    
    // DifyのチャットボットWindowを開く
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      console.log("Chat window found, displaying it");
      chatWindow.style.display = 'block';
      setIsChatbotWindowVisible(true);
    } else {
      console.log("Chat window not found, initializing chatbot");
      
      // Difyスクリプトを再ロードする
      initDifyChatbot();
      
      // チャットウィンドウが表示されるまで少し待つ
      setTimeout(() => {
        const newChatWindow = document.getElementById('dify-chatbot-bubble-window');
        if (newChatWindow) {
          console.log("New chat window found after initialization");
          newChatWindow.style.display = 'block';
        } else {
          console.log("Still no chat window after initialization");
          
          // ボタンを探してクリックする
          const chatButton = document.getElementById('dify-chatbot-bubble-button');
          if (chatButton) {
            console.log("Chat button found, clicking it");
            chatButton.click();
          }
        }
      }, 1000);
    }
  };
  
  // Difyチャットボットを初期化する
  const initDifyChatbot = () => {
    console.log("Initializing Dify chatbot...");
    
    // 既存のスクリプトを削除
    const existingScript = document.getElementById('dify-script');
    if (existingScript) {
      console.log("Removing existing script");
      existingScript.remove();
    }
    
    const existingStyle = document.getElementById('dify-style');
    if (existingStyle) {
      console.log("Removing existing style");
      existingStyle.remove();
    }
    
    // 設定スクリプトを追加
    const configScript = document.createElement('script');
    configScript.id = 'dify-config';
    configScript.textContent = `
      window.difyChatbotConfig = {
        token: "${DIFY_CONFIG.token}"
      };
    `;
    document.head.appendChild(configScript);
    
    // スタイルを追加
    const style = document.createElement('style');
    style.id = 'dify-style';
    style.textContent = getChatbotWindowStyles();
    document.head.appendChild(style);
    
    // Difyのスクリプトを追加
    const script = document.createElement('script');
    script.id = 'dify-script';
    script.src = 'https://udify.app/embed.min.js';
    script.defer = true;
    script.async = true;
    
    document.head.appendChild(script);
    
    console.log("Dify chatbot initialization complete");
  };

  // コンポーネントがマウントされたときにDifyスクリプトが存在しなければ初期化する
  useEffect(() => {
    const existingScript = document.getElementById('dify-script');
    if (!existingScript) {
      console.log("No Dify script found on mount, initializing");
      initDifyChatbot();
    }
  }, []);

  return { openChatbot };
};
