
import { addCloseButtonToWindow } from "./closeButton";
import { applyChatWindowStyle, applyChatButtonStyle } from "./chatWindowStyle";
import { setupChatButtonEventHandler } from "./chatButtonHandler";
import { performInitialElementsCheck } from "./initialCheck";

/**
 * DOM変更を監視するObserverを設定
 */
export const setupDomObserver = (): MutationObserver => {
  console.log('Setting up DOM observer for Dify chat');
  
  const observer = new MutationObserver((mutations) => {
    // 小規模持続化補助金のチャットウィンドウを探す
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      // チャットウィンドウが見つかったらスタイル適用と閉じるボタンの追加
      addCloseButtonToWindow(chatWindow);
      
      // チャットウィンドウのスタイルを強制的に適用
      applyChatWindowStyle(chatWindow);
    }

    // チャットボタンの表示を確保
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton) {
      applyChatButtonStyle(chatButton);
      setupChatButtonEventHandler(chatButton);
    }
  });

  // DOM変更の監視を開始（最大限の監視範囲）
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    characterData: true
  });
  
  // カスタムイベントのリスナーを設定（依存関係のループを回避）
  document.addEventListener('recreate-dify-chat', () => {
    console.log('Recreate Dify chat event received');
    
    // 外部からlocationオブジェクトを読み込み直す（循環参照を避けるために）
    if (window.hasOwnProperty('setupDifyChat')) {
      (window as any).setupDifyChat();
    } else {
      console.warn('setupDifyChat function not available on window object');
      // 最終手段としてページをリロード
      // window.location.reload();
    }
  });
  
  return observer;
};

// 公開するために必要な関数をエクスポート
export { performInitialElementsCheck };
