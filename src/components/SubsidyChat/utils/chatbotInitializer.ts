
import { removeElement, chatbotElementIds } from './domUtils';
import { loadDifyScripts } from './scriptUtils';
import { addChatbotElements } from './uiElementsBuilder';

/**
 * Difyスクリプトの初期化
 */
export const initializeDifyScripts = (
  onSuccess: () => void, 
  onError: (error: Event | Error) => void
): void => {
  console.log("Initializing Dify scripts with new implementation");
  
  // 既存の要素をクリーンアップ
  cleanup();
  
  // Difyスクリプトをロード
  loadDifyScripts(
    () => {
      console.log("Dify scripts loaded successfully, initializing UI");
      onSuccess();
      
      // 少し遅延してからUIを追加（Difyスクリプトの初期化を待つ）
      setTimeout(() => {
        // グローバルオブジェクトのステータスをチェック
        if (window.DifyAI || window.difyChatbot || window.DifyChat) {
          console.log("Dify API detected, adding UI elements");
        } else {
          console.warn("No Dify API detected after script load, but proceeding with UI elements");
        }
        
        // UIを追加
        addChatbotElements();
      }, 1000);
    }, 
    onError
  );
};

/**
 * チャットボット要素の追加をエクスポート
 */
export { addChatbotElements };

/**
 * チャットボット要素のクリーンアップ
 */
export const cleanup = (): void => {
  console.log("Cleaning up chatbot elements");
  
  const elementsToRemove = [
    ...chatbotElementIds,
    'chatbot-elements-container',
    'dify-chat-config',
    'dify-embed-config',
    'dify-window-styles',
    'dify-chat-main-script',
    'dify-custom-styles'
  ];
  
  elementsToRemove.forEach(id => {
    removeElement(id);
  });
  
  // グローバルオブジェクトもクリーンアップ
  try {
    // @ts-ignore - グローバルオブジェクトから削除を試みる
    if (window.DifyChat) window.DifyChat = undefined;
    if (window.difyChatbot) window.difyChatbot = undefined;
    if (window.DifyAI) window.DifyAI = undefined;
    if (window.__DIFY_CHAT_CONFIG__) window.__DIFY_CHAT_CONFIG__ = undefined;
  } catch (e) {
    console.error('Failed to cleanup global objects:', e);
  }
};
