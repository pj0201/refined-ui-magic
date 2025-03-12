
import { addCloseButtonToWindow } from "./closeButton";
import { applyChatWindowStyle, applyChatButtonStyle } from "./chatWindowStyle";
import { setupChatButtonEventHandler } from "./chatButtonHandler";

/**
 * 初期状態のチャットボット要素のチェックと修正
 */
export const performInitialElementsCheck = (): void => {
  // 初期化直後に確認
  const initialCheck = () => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    
    // チャットボタンの表示を確認
    if (chatButton) {
      console.log('Dify chat button found, ensuring visibility');
      
      // スタイルの適用
      applyChatButtonStyle(chatButton);
      
      // クリックイベントが設定されているか確認
      if (!chatButton.onclick) {
        setupChatButtonEventHandler(chatButton);
      }
    } else {
      console.warn('Dify chat button not found during initial check');
    }

    // チャットウィンドウの閉じるボタンを確認
    if (chatWindow) {
      console.log('Dify chat window found, adding close button');
      addCloseButtonToWindow(chatWindow);
      
      // チャットウィンドウのスタイルを適用
      applyChatWindowStyle(chatWindow);
    } else {
      console.warn('Dify chat window not found during initial check');
    }
  };
  
  // 即時実行
  initialCheck();
  
  // 念のため少し遅延して再度実行
  setTimeout(initialCheck, 500);
  setTimeout(initialCheck, 1000);
  
  // 確実にボタンが存在するように定期的に確認
  setInterval(() => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    
    if (chatButton) {
      applyChatButtonStyle(chatButton);
    }
    
    if (chatWindow && !chatWindow.querySelector('.dify-chatbot-window-close-btn')) {
      console.log('Reapplying close button');
      addCloseButtonToWindow(chatWindow);
    }
  }, 1000);
};
