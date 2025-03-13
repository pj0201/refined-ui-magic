
import { useEffect, useRef } from 'react';
import { 
  startElementCheck, 
  clearCheckInterval 
} from '../utils/elementChecker';
import { addChatbotElements } from '../utils/chatbotInitializer';
import '../types/dify.d.ts';

/**
 * カスタムフック: チャットボット要素のモニタリング
 */
export const useElementMonitor = (isLoaded: boolean) => {
  const checkIntervalRef = useRef<number | null>(null);

  // 要素のチェックを開始
  useEffect(() => {
    if (isLoaded) {
      console.log("Starting element check with more frequent checks");
      startElementCheck(checkIntervalRef);
    }
    return () => clearCheckInterval(checkIntervalRef);
  }, [isLoaded]);

  // フォーカスを戻したときに要素を再チェック - 処理を強化
  useEffect(() => {
    const handleFocus = () => {
      console.log("Window focus detected, performing thorough element check");
      
      // 要素の完全性チェック - すべての要素をチェック
      const elementsToCheck = [
        'dify-chatbot-bubble-button-1',
        'dify-chatbot-label-1',
        'dify-chatbot-bubble-button-2',
        'dify-chatbot-label-2',
        'chatbot-elements-container'
      ];
      
      const missingElements = elementsToCheck.filter(id => !document.getElementById(id));
      
      if (missingElements.length > 0) {
        console.log(`Missing elements after focus: ${missingElements.join(', ')}`);
        console.log("Restoring all chatbot elements");
        addChatbotElements();
      } else {
        console.log("All chatbot elements are present after focus");
      }
      
      // DifyChatオブジェクトの状態確認
      if (!window.DifyChat) {
        console.log("DifyChat object not found after focus. This might cause functionality issues.");
      }
    };
    
    // ウィンドウフォーカスイベントの監視
    window.addEventListener('focus', handleFocus);
    
    // ページ表示状態の監視（タブ切り替え時など）
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        console.log("Page visibility changed to visible, checking elements");
        handleFocus();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // 定期的にDifyチャットの状態を確認し、必要に応じて再初期化
  return { checkDifyStatus: (initializeChatbot: () => void) => {
    useEffect(() => {
      if (isLoaded) {
        const difyCheckInterval = setInterval(() => {
          // DifyChat APIが利用可能かチェック
          if (!window.DifyChat) {
            const uiElementsExist = !!document.getElementById('dify-chatbot-bubble-button-1');
            if (uiElementsExist) {
              console.log("DifyChat not available but UI elements exist - reinitializing");
              initializeChatbot();
            }
          } else {
            // DifyChat APIの各メソッドが利用可能かチェック
            const methods = ['toggleBubbleWindow', 'onChatCleared', 'sendMessage'];
            const missingMethods = methods.filter(method => !window.DifyChat?.[method as keyof typeof window.DifyChat]);
            
            if (missingMethods.length > 0) {
              console.log(`Some DifyChat methods are missing: ${missingMethods.join(', ')} - may cause issues`);
            }
          }
        }, 20000); // 20秒ごとにチェック（30秒から短縮）
        
        return () => clearInterval(difyCheckInterval);
      }
    }, [isLoaded, initializeChatbot]);
  }};
};
