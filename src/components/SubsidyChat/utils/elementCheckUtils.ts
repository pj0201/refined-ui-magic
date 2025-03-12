
/**
 * チャットボット要素のチェックと修正ユーティリティ
 */
import { setupChatButtonInteractions, setupChatButtonVisibility } from './buttonUtils';
import { addCloseButtonToWindow, optimizeChatWindowStyles } from './windowUtils';

/**
 * チャットボット要素のチェックと処理を実行
 */
export const checkAndProcessChatElements = (): void => {
  const chatWindow = document.getElementById('dify-chatbot-bubble-window');
  const chatButton = document.getElementById('dify-chatbot-bubble-button');
  
  // チャットボタンの処理
  if (chatButton) {
    setupChatButtonVisibility();
    setupChatButtonInteractions();
  }

  // チャットウィンドウの処理
  if (chatWindow) {
    addCloseButtonToWindow(chatWindow);
    optimizeChatWindowStyles(chatWindow);
  }
};

/**
 * 初期状態のチャットボット要素のチェックと修正
 */
export const performInitialElementsCheck = (): void => {
  // 即時実行
  checkAndProcessChatElements();
  
  // 少し遅延して再確認
  setTimeout(checkAndProcessChatElements, 500);
  
  // さらに遅延して再確認（DOMがさらに更新される可能性があるため）
  setTimeout(checkAndProcessChatElements, 1500);
  
  // ページが完全に読み込まれた後にも確認
  window.addEventListener('load', () => {
    setTimeout(checkAndProcessChatElements, 100);
    setTimeout(checkAndProcessChatElements, 1000);
  });
};
