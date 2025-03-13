
import { useState, useEffect } from 'react';
import { createScriptTag, createStyleTag, removeElement } from '../utils/domUtils';
import { getChatbotStyles } from '../styles/chatbotStyles';
import { toast } from '@/components/ui/use-toast';

/**
 * カスタムフック: チャットボットのスクリプトローダー
 */
export const useChatbotLoader = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  
  // チャットボット初期化
  const initializeChatbot = () => {
    console.log("Initializing chatbot script");
    
    // 既存の要素をクリーンアップ
    cleanup();
    
    // スタイルを追加
    const style = createStyleTag('dify-custom-styles', getChatbotStyles());
    document.head.appendChild(style);
    
    // Difyの設定スクリプト
    const configScript = createScriptTag(
      'dify-chat-config',
      `window.__DIFY_CHAT_CONFIG__ = {
        apiEndpoint: "https://udify.app",
        publicApiKey: "app-KDYnIQfxqkXo7a89jFOplm4c",
        features: {
          text_to_speech: { enabled: false }
        }
      };`
    );
    document.head.appendChild(configScript);
    
    // Difyスクリプトを読み込み
    const mainScript = createScriptTag(
      'yXBz3rzpDBhMgYcB',
      null,
      "https://udify.app/js/web-client-chat.js",
      true,
      true
    );
    
    // 正常にロードされた場合
    mainScript.onload = () => {
      console.log("Difyスクリプトがロードされました");
      setIsLoaded(true);
      setIsError(false);
    };
    
    // エラーが発生した場合
    mainScript.onerror = (error) => {
      console.error("Difyスクリプトのロードエラー:", error);
      setIsError(true);
      setIsLoaded(false);
      
      toast({
        title: "チャットボットの読み込みに問題があります",
        description: "ネットワーク接続を確認してください。",
        variant: "destructive",
        duration: 5000,
      });
    };
    
    document.head.appendChild(mainScript);
  };

  // 要素のクリーンアップ
  const cleanup = () => {
    console.log("Cleaning up chatbot elements");
    
    const elementsToRemove = [
      'dify-chat-config', 
      'yXBz3rzpDBhMgYcB', 
      'dify-custom-styles'
    ];
    
    elementsToRemove.forEach(id => {
      removeElement(id);
    });
  };

  return { isLoaded, isError, initializeChatbot };
};
