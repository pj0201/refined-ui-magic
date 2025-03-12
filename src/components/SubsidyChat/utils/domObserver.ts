
/**
 * DOM変更を監視するObserverの実装
 */
import { checkAndProcessChatElements } from './elementCheckUtils';
import { performInitialElementsCheck } from './elementCheckUtils';

/**
 * DOM変更を監視するObserverを設定
 */
export const setupDomObserver = (): MutationObserver => {
  console.log('Setting up DOM observer for Dify chat');
  
  const observer = new MutationObserver(() => {
    // 要素のチェックと処理を実行
    checkAndProcessChatElements();
  });

  // DOM変更の監視を開始（より積極的な監視のため設定を強化）
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    characterData: true
  });
  
  return observer;
};

// 初期チェック関数をエクスポート
export { performInitialElementsCheck };
