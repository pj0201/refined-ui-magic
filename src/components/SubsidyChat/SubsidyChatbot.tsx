
import { useEffect, useState } from "react";
import { useChatbotLoader } from "./hooks/useChatbotLoader";
import { addChatbotElements } from "./utils/chatUIElements";

/**
 * 補助金チャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  const [retryCount, setRetryCount] = useState(0);
  const [elementsAdded, setElementsAdded] = useState(false);
  
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
        if (element) {
          console.log(`要素を削除: ${id}`);
          element.remove();
        }
      });
    };
  }, []);
  
  // スクリプトが正常にロードされた後に要素を追加
  useEffect(() => {
    if (isLoaded && !elementsAdded) {
      console.log("スクリプトがロードされました。チャットボットUI要素を追加します。");
      // スクリプトロード後、少し待ってからUI要素を追加
      setTimeout(() => {
        addChatbotElements();
        setElementsAdded(true);
      }, 1000);
    }
  }, [isLoaded, elementsAdded]);

  // エラーが発生した場合や要素が追加されなかった場合のリトライメカニズム
  useEffect(() => {
    // 最大5回まで再試行
    if ((isError || !document.getElementById('chatbot-elements-container')) && retryCount < 5 && !elementsAdded) {
      const timer = setTimeout(() => {
        console.log(`チャットボット初期化をリトライします（${retryCount + 1}/5）`);
        setRetryCount(prev => prev + 1);
        initializeChatbot();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isError, retryCount, initializeChatbot, elementsAdded]);

  // 要素が追加されたことを確認するためのポーリング
  useEffect(() => {
    if (isLoaded && elementsAdded) {
      const checkInterval = setInterval(() => {
        if (!document.getElementById('chatbot-elements-container')) {
          console.log("チャットボット要素が見つかりません。再追加します。");
          addChatbotElements();
        }
      }, 5000);
      
      return () => clearInterval(checkInterval);
    }
  }, [isLoaded, elementsAdded]);

  // コンポーネントは何も描画しない (チャットUI要素は動的に生成される)
  return null;
};
