
/**
 * チャットボット要素のチェックと修正ユーティリティ - 軽量化バージョン
 */
import { setupChatButtonVisibility } from './buttonUtils';
import { addCloseButtonToWindow } from './windowUtils';

/**
 * チャットボット要素のチェックと処理を実行 - 必要最小限の処理のみ実行
 */
export const checkAndProcessChatElements = (): void => {
  const chatWindow = document.getElementById('dify-chatbot-bubble-window');
  const chatButton = document.getElementById('dify-chatbot-bubble-button');
  
  // チャットボタンの処理
  if (chatButton) {
    setupChatButtonVisibility();
  }

  // チャットウィンドウの処理
  if (chatWindow) {
    addCloseButtonToWindow(chatWindow);
  }
};

// エクスポート
export { performInitialElementsCheck } from './domObserver';
