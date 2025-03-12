
import { applyChatWindowStyle } from "./chatWindowStyle";

/**
 * チャットボタンのクリックイベントハンドラを設定
 */
export const setupChatButtonEventHandler = (button: HTMLElement): void => {
  // 既存のクリックイベントを削除（重複を防ぐため）
  const newButton = button.cloneNode(true);
  button.replaceWith(newButton);
  
  // 新しいボタン参照を取得
  const refreshedButton = document.getElementById('dify-chatbot-bubble-button');
  if (!refreshedButton) return;
  
  // クリックイベントの設定
  refreshedButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Dify chat button clicked from observer');
    
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      const isHidden = chatWindow.style.display === 'none' || !chatWindow.style.display;
      chatWindow.style.display = isHidden ? 'flex' : 'none';
      
      if (isHidden) {
        applyChatWindowStyle(chatWindow);
      }
    } else {
      console.log('Chat window not found, recreating from observer click handler');
      // カスタムイベントをディスパッチ
      document.dispatchEvent(new CustomEvent('recreate-dify-chat'));
    }
  }, true);
};
