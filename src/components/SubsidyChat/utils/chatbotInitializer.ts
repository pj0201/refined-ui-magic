
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
  console.log("Initializing Dify scripts");
  
  // 既存の要素をクリーンアップ
  cleanup();
  
  // Difyスクリプトをロード
  loadDifyScripts(onSuccess, onError);
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
    'dify-window-styles'
  ];
  
  elementsToRemove.forEach(id => {
    removeElement(id);
  });
};
