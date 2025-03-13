
import { useState, useEffect, useRef } from "react";
import { DIFY_CONFIG } from "@/components/SubsidyChat/utils/difyConfig";
import { getChatbotWindowStyles } from "@/components/SubsidyChat/styles/chatbotWindowStyles";
import { toast } from "sonner";

export const ChatbotInitializer = () => {
  const [isChatbotWindowVisible, setIsChatbotWindowVisible] = useState(false);
  const initAttemptedRef = useRef(false);
  
  const openChatbot = () => {
    console.log("Opening chatbot...");
    toast.info("チャットボットを開いています...");
    
    // DifyのチャットボットWindowを開く
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      console.log("Chat window found, displaying it");
      chatWindow.style.display = 'block';
      setIsChatbotWindowVisible(true);
      return;
    }
    
    console.log("Chat window not found, initializing chatbot");
    
    // Difyスクリプトを再ロードする
    initDifyChatbot();
    
    // チャットウィンドウが表示されるまで少し待つ
    setTimeout(() => {
      const newChatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (newChatWindow) {
        console.log("New chat window found after initialization");
        newChatWindow.style.display = 'block';
        setIsChatbotWindowVisible(true);
      } else {
        console.log("Still no chat window after initialization");
        
        // ボタンを探してクリックする
        const chatButton = document.getElementById('dify-chatbot-bubble-button');
        if (chatButton) {
          console.log("Chat button found, clicking it");
          chatButton.click();
          setIsChatbotWindowVisible(true);
        } else {
          console.log("Chat button not found, attempting fallback");
          initializeFallbackChatbot();
        }
      }
    }, 1500); // Wait longer for script to initialize
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

  // フォールバックチャットボットUIを初期化
  const initializeFallbackChatbot = () => {
    console.log("Initializing fallback chatbot UI");
    toast.info("代替チャットボットを使用しています");
    
    // サブシディチャットのUIエレメントを追加
    const { addChatbotElements } = require('@/components/SubsidyChat/utils/uiElementsBuilder');
    const { createDirectChatWindow } = require('@/components/SubsidyChat/utils/directChatImplementation');
    
    try {
      addChatbotElements();
      createDirectChatWindow();
    } catch (e) {
      console.error("Error initializing fallback chatbot:", e);
      toast.error("チャットボットの初期化に失敗しました");
    }
  };

  // コンポーネントがマウントされたときにDifyスクリプトが存在しなければ初期化する
  useEffect(() => {
    if (!initAttemptedRef.current) {
      initAttemptedRef.current = true;
      const existingScript = document.getElementById('dify-script');
      if (!existingScript) {
        console.log("No Dify script found on mount, initializing");
        initDifyChatbot();
      }
    }
  }, []);

  return { openChatbot };
};
