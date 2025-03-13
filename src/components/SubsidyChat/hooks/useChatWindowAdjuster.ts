
import { useEffect } from "react";

/**
 * Difyチャットウィンドウのサイズと位置を調整するためのカスタムフック
 */
export const useChatWindowAdjuster = (isLoaded: boolean) => {
  useEffect(() => {
    if (!isLoaded) return;

    // チャットウィンドウのサイズと位置を調整
    const adjustChatWindow = () => {
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow) {
        console.log("Adjusting chat window position and size");
        const viewportHeight = window.innerHeight;
        const chatWindowHeight = chatWindow.clientHeight;
        
        if (chatWindowHeight > viewportHeight - 100) {
          chatWindow.style.height = (viewportHeight - 100) + 'px';
          chatWindow.style.top = '50px';
        }
      } else {
        console.log("Chat window not found for adjustment");
      }
    };
    
    // ウィンドウリサイズ時にチャットウィンドウを調整
    window.addEventListener('resize', adjustChatWindow);
    // 初期調整
    setTimeout(adjustChatWindow, 1000);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', adjustChatWindow);
    };
  }, [isLoaded]);

  // チャットウィンドウの変更を監視して自動調整する
  useEffect(() => {
    if (!isLoaded) return;

    // チャットウィンドウ状態の監視
    const chatWindowObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const chatWindow = document.getElementById('dify-chatbot-bubble-window');
          if (chatWindow) {
            // チャットウィンドウが表示されたら位置調整
            const viewportHeight = window.innerHeight;
            const chatWindowHeight = chatWindow.clientHeight;
            
            if (chatWindowHeight > viewportHeight - 100) {
              chatWindow.style.height = (viewportHeight - 100) + 'px';
              chatWindow.style.top = '50px';
              console.log("Chat window position adjusted");
            }
          }
        }
      });
    });
    
    // body要素を監視して、チャットウィンドウの追加を検出
    chatWindowObserver.observe(document.body, { childList: true, subtree: true });
    
    return () => {
      chatWindowObserver.disconnect();
    };
  }, [isLoaded]);
};
