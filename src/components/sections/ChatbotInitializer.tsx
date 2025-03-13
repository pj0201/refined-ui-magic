
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { DIFY_CONFIG } from "@/components/SubsidyChat/utils/difyConfig";

export const ChatbotInitializer = () => {
  // Track if scripts are loaded
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  
  // Initialize scripts when component mounts
  useEffect(() => {
    // Check if script is already loaded
    if (document.getElementById('dify-script')) {
      setIsScriptLoaded(true);
      return;
    }
    
    // Add the Dify config script
    const configScript = document.createElement('script');
    configScript.id = 'dify-config';
    configScript.textContent = `
      window.difyChatbotConfig = {
        token: "${DIFY_CONFIG.token}"
      };
    `;
    document.head.appendChild(configScript);
    
    // Add style for the chatbot window
    const style = document.createElement('style');
    style.id = 'dify-style';
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important; 
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        max-height: 80vh !important;
        position: fixed !important;
        bottom: auto !important;
        top: 50px !important;
        right: 20px !important;
        z-index: 2147483647 !important;
      }
      @media (max-height: 700px) {
        #dify-chatbot-bubble-window {
          top: 20px !important;
          height: calc(100vh - 100px) !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Load Dify script
    const script = document.createElement('script');
    script.id = 'dify-script';
    script.src = 'https://udify.app/embed.min.js';
    script.defer = true;
    script.async = true;
    
    // Handle script load
    script.onload = () => {
      console.log("Dify script loaded successfully");
      setIsScriptLoaded(true);
    };
    
    script.onerror = () => {
      console.error("Failed to load Dify script");
      toast.error("チャットボットの読み込みに失敗しました");
    };
    
    document.head.appendChild(script);
    
    // Cleanup
    return () => {
      // Only remove scripts if component is unmounted
    };
  }, []);

  // Simple function to open the chatbot
  const openChatbot = () => {
    console.log("Opening chatbot...");
    toast.info("チャットボットを開いています...");
    
    // Try to find the chatbot window
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      console.log("Chat window found, displaying it");
      chatWindow.style.display = 'block';
      return;
    }
    
    // Try to click the button if window not found
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton && chatButton instanceof HTMLElement) {
      console.log("Chat button found, clicking it");
      chatButton.click();
      return;
    }
    
    // Show error if neither element is found
    console.log("Chat elements not found");
    toast.error("チャットボットを開けませんでした。しばらくしてからもう一度お試しください。");
  };

  return { openChatbot };
};
