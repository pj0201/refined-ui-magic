
import { addCloseButtonToWindow } from "./closeButton";
import { applyChatWindowStyle, applyChatButtonStyle } from "./chatWindowStyle";
import { setupChatButtonEventHandler } from "./chatButtonHandler";

/**
 * 初期状態のチャットボット要素のチェックと修正
 */
export const performInitialElementsCheck = (): void => {
  // 初期化直後に確認（一度だけ実行）
  const initialCheck = () => {
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton) {
      applyChatButtonStyle(chatButton);
      setupChatButtonEventHandler(chatButton);
    }

    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      addCloseButtonToWindow(chatWindow);
      applyChatWindowStyle(chatWindow);
    }
  };
  
  // 即時実行
  initialCheck();
  
  // 遅延実行（一度だけ）
  setTimeout(initialCheck, 1000);
  
  // より軽量な定期チェック（間隔を広げる）
  setInterval(() => {
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    
    if (chatButton && !chatButton.onclick) {
      applyChatButtonStyle(chatButton);
    }
    
    if (chatWindow && !chatWindow.querySelector('.dify-chatbot-window-close-btn')) {
      addCloseButtonToWindow(chatWindow);
    }
  }, 3000); // 3秒ごとに変更（元は1秒）
};
