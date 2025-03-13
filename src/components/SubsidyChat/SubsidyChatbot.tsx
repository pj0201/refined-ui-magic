
import { useEffect } from "react";
import { useChatbotLoader } from "./hooks/useChatbotLoader";
import { addChatbotElements } from "./utils/chatUIElements";

/**
 * 補助金チャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  // シンプル化されたチャットボット初期化ロジック
  const { isLoaded, isError, initializeChatbot } = useChatbotLoader();
  
  // コンポーネントマウント時に初期化
  useEffect(() => {
    console.log("SubsidyChatbot: コンポーネントがマウントされました");
    initializeChatbot();
    
    return () => {
      console.log("SubsidyChatbot: コンポーネントがアンマウントされました");
      // アンマウント時にチャットボット要素をクリーンアップ
      const elementsToRemove = [
        'dify-chat-config', 
        'yXBz3rzpDBhMgYcB', 
        'dify-custom-styles', 
        'dify-chatbot-bubble-button-1', 
        'dify-chatbot-label-1',
        'dify-chatbot-bubble-button-2', 
        'dify-chatbot-label-2',
        'chatbot-elements-container'
      ];
      
      elementsToRemove.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.remove();
      });
    };
  }, []);
  
  // スクリプトが正常にロードされた後に要素を追加
  useEffect(() => {
    if (isLoaded) {
      console.log("スクリプトがロードされました。チャットボットUI要素を追加します。");
      addChatbotElements();
    }
  }, [isLoaded]);

  // コンポーネントは何も描画しない (チャットUI要素は動的に生成される)
  return null;
};
