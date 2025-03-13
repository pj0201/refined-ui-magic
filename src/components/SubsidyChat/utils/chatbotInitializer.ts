
import { removeElement, chatbotElementIds } from './domUtils';
import { loadDifyScripts } from './scriptUtils';
import { addChatbotElements } from './uiElementsBuilder';

// 初期化プロセスの進行状態を追跡
let initializationInProgress = false;

/**
 * Difyスクリプトの初期化
 */
export const initializeDifyScripts = (
  onSuccess: () => void, 
  onError: (error: Event | Error) => void
): void => {
  // 既に初期化中の場合は処理を中断
  if (initializationInProgress) {
    console.log("Initialization already in progress, skipping");
    return;
  }
  
  initializationInProgress = true;
  console.log("Initializing Dify scripts with new implementation");
  
  // UIを確実に追加（Difyのスクリプト読み込み成否に関わらず）
  addChatbotElements();
  
  // Difyスクリプトをロード
  loadDifyScripts(
    () => {
      console.log("Dify scripts loaded successfully");
      initializationInProgress = false;
      onSuccess();
      
      // グローバルオブジェクトのステータスをすぐにチェック
      const hasDifyAI = !!window.DifyAI;
      const hasLegacyDifyChat = typeof window.DifyChat !== 'undefined';
      const hasLegacyDifyChatbot = typeof window.difyChatbot !== 'undefined';
      
      console.log("Dify API available:", hasDifyAI || hasLegacyDifyChat || hasLegacyDifyChatbot);
      
      // Difyのオブジェクトが存在しない場合は警告を出すだけ（UIは残す）
      if (!hasDifyAI && !hasLegacyDifyChat && !hasLegacyDifyChatbot) {
        console.warn("No Dify API detected after script load, but UI elements are maintained");
      }
    }, 
    (error) => {
      console.error("Failed to load Dify script:", error);
      initializationInProgress = false;
      onError(error);
    }
  );
};

/**
 * チャットボット要素の追加をエクスポート
 */
export { addChatbotElements };

/**
 * チャットボット要素のクリーンアップ
 * isPartial=trueの場合、UIボタン要素は保持する
 */
export const cleanup = (isPartial = false): void => {
  console.log(`Cleaning up chatbot elements (${isPartial ? 'partial' : 'full'} cleanup)`);
  
  // 部分的クリーンアップの場合、UIボタン要素は削除しない
  const elementsToRemove = isPartial ? 
    ['dify-chat-config', 'dify-embed-config', 'dify-window-styles', 'dify-chat-main-script', 'dify-custom-styles'] :
    [
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
    // 型安全なグローバルオブジェクトのクリーンアップ
    if (typeof window.DifyChat !== 'undefined') {
      delete window.DifyChat;
    }
    if (typeof window.difyChatbot !== 'undefined') {
      delete window.difyChatbot;
    }
    if (window.DifyAI) {
      window.DifyAI = undefined;
    }
    if (window.__DIFY_CHAT_CONFIG__) {
      window.__DIFY_CHAT_CONFIG__ = undefined;
    }
  } catch (e) {
    console.error('Failed to cleanup global objects:', e);
  }
};
