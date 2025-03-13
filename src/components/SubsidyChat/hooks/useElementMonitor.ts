
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
  const restoreAttemptsRef = useRef(0);
  const MAX_RESTORE_ATTEMPTS = 2;

  // 要素のチェックを開始
  useEffect(() => {
    if (isLoaded) {
      console.log("Starting element check");
      startElementCheck(checkIntervalRef);
    }
    return () => clearCheckInterval(checkIntervalRef);
  }, [isLoaded]);

  // フォーカスを戻したときに要素を再チェック
  useEffect(() => {
    const handleFocus = () => {
      console.log("Window focus detected, checking elements");
      
      // 要素の存在チェック
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
        restoreAttemptsRef.current++;
        
        if (restoreAttemptsRef.current <= MAX_RESTORE_ATTEMPTS) {
          console.log(`Restoring chatbot elements (attempt ${restoreAttemptsRef.current}/${MAX_RESTORE_ATTEMPTS})`);
          addChatbotElements();
        } else {
          console.warn(`Maximum restore attempts reached (${MAX_RESTORE_ATTEMPTS})`);
          restoreAttemptsRef.current = 0;
        }
      } else {
        console.log("All chatbot elements are present after focus");
        restoreAttemptsRef.current = 0;
      }
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // シンプル化したDify状態チェック
  return { 
    checkDifyStatus: (initializeChatbot: () => void) => {
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
            }
          }, 20000); // 20秒ごとにチェック（頻度を下げる）
          
          return () => clearInterval(difyCheckInterval);
        }
      }, [isLoaded, initializeChatbot]);
    }
  };
};
