
/**
 * DOM変更を監視するObserverの実装
 */
import { checkAndProcessChatElements } from './elementCheckUtils';

/**
 * DOM変更を監視するObserverを設定
 */
export const setupDomObserver = (): MutationObserver => {
  const observer = new MutationObserver(() => {
    checkAndProcessChatElements();
  });

  // DOM変更の監視を開始（設定を最適化）
  observer.observe(document.body, { 
    childList: true, 
    subtree: true
  });
  
  return observer;
};

/**
 * 初期チェックを実行
 */
export const performInitialElementsCheck = (): void => {
  // 即時実行
  checkAndProcessChatElements();
  
  // 遅延実行（DOMがさらに更新される可能性があるため）
  setTimeout(checkAndProcessChatElements, 1000);
};
