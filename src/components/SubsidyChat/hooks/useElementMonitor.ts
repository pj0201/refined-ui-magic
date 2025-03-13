
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
      console.log("Starting element check");
      startElementCheck(checkIntervalRef);
    }
    return () => clearCheckInterval(checkIntervalRef);
  }, [isLoaded]);

  // フォーカスを戻したときに要素を再チェック
  useEffect(() => {
    const handleFocus = () => {
      console.log("Window focus detected, checking elements");
      const button1 = document.getElementById('dify-chatbot-bubble-button-1');
      const label1 = document.getElementById('dify-chatbot-label-1');
      const button2 = document.getElementById('dify-chatbot-bubble-button-2');
      const label2 = document.getElementById('dify-chatbot-label-2');
      
      if (!button1 || !label1 || !button2 || !label2) {
        console.log("Elements missing after focus, restoring");
        addChatbotElements();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  // 定期的にDifyチャットの状態を確認し、必要に応じて再初期化
  return { checkDifyStatus: (initializeChatbot: () => void) => {
    useEffect(() => {
      if (isLoaded) {
        const difyCheckInterval = setInterval(() => {
          if (!window.DifyChat && document.getElementById('dify-chatbot-bubble-button-1')) {
            console.log("DifyChat not available but UI elements exist - reinitializing");
            initializeChatbot();
          }
        }, 30000); // 30秒ごとにチェック
        
        return () => clearInterval(difyCheckInterval);
      }
    }, [isLoaded, initializeChatbot]);
  }};
};
