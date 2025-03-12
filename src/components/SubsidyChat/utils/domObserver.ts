
import { closeButtonSvg } from "../styles/difyChatStyles";

/**
 * チャットボットウィンドウに閉じるボタンを追加
 */
const addCloseButtonToWindow = (chatWindow: HTMLElement): void => {
  // 既存の閉じるボタンを削除（再作成するため）
  const existingButton = chatWindow.querySelector('.dify-chatbot-window-close-btn');
  if (existingButton) {
    existingButton.remove();
  }
  
  // 新たなより目立つ閉じるボタンを作成
  const closeButton = document.createElement('button');
  closeButton.className = 'dify-chatbot-window-close-btn';
  closeButton.innerHTML = closeButtonSvg;
  closeButton.style.cssText = `
    position: absolute !important;
    top: 0.75rem !important;
    right: 0.75rem !important;
    width: 2rem !important;
    height: 2rem !important;
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 9999px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    z-index: 9999 !important;
    visibility: visible !important;
    opacity: 1 !important;
  `;
  
  // ボタンのヘッダー部分への追加（より確実に表示されるようにするため）
  const header = chatWindow.querySelector('.dify-chatbot-window-header') || chatWindow;
  header.appendChild(closeButton);

  // クリックイベントを設定
  closeButton.onclick = null; // 既存のイベントをクリア
  
  // 新しいイベントを追加
  closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    chatWindow.style.display = 'none';
    
    // チャットボタンを表示
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton) {
      chatButton.style.cssText = `
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9995 !important;
        position: fixed !important;
        bottom: 11rem !important;
        right: 1rem !important;
        width: 48px !important;
        height: 48px !important;
        border-radius: 50% !important;
        background-color: #1C64F2 !important;
        cursor: pointer !important;
      `;
    }
    
    console.log('Chat window closed');
    return false;
  }, true);
};

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
      chatWindow.style.cssText = `
        display: flex !important;
        flex-direction: column !important;
        width: 350px !important;
        height: 500px !important;
        max-height: 80vh !important;
        position: fixed !important;
        bottom: 5rem !important;
        right: 1rem !important;
        z-index: 9995 !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        background-color: white !important;
        overflow: hidden !important;
      `;
      
      // モバイル対応
      if (window.innerWidth <= 640) {
        chatWindow.style.width = 'calc(100vw - 2rem)';
        chatWindow.style.height = '70vh';
      }
    }

    // チャットボタンの表示を確保
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton) {
      // 既存のクリックイベントを削除（重複を防ぐため）
      const newButton = chatButton.cloneNode(true);
      chatButton.replaceWith(newButton);
      
      // 新しいボタン参照
      const refreshedButton = document.getElementById('dify-chatbot-bubble-button');
      if (refreshedButton) {
        refreshedButton.style.cssText = `
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          z-index: 9995 !important;
          position: fixed !important;
          bottom: 11rem !important;
          right: 1rem !important;
          width: 48px !important;
          height: 48px !important;
          border-radius: 50% !important;
          background-color: #1C64F2 !important;
          cursor: pointer !important;
          color: white !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        `;
        
        // アイコンの設定
        if (!refreshedButton.innerHTML.includes('svg')) {
          refreshedButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          `;
        }
        
        // クリックイベントの設定
        refreshedButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Dify chat button clicked from observer');
          
          const chatWindow = document.getElementById('dify-chatbot-bubble-window');
          if (chatWindow) {
            const isHidden = chatWindow.style.display === 'none' || !chatWindow.style.display;
            chatWindow.style.display = isHidden ? 'flex' : 'none';
          } else {
            console.log('Chat window not found, recreating from observer click handler');
            // ここでsetupDifyChatを直接呼び出すのではなく、カスタムイベントをディスパッチ
            document.dispatchEvent(new CustomEvent('recreate-dify-chat'));
          }
        }, true);
      }
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

/**
 * 初期状態のチャットボット要素のチェックと修正
 */
export const performInitialElementsCheck = (): void => {
  // 初期化直後に確認
  const initialCheck = () => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    
    // チャットボタンの表示を確認
    if (chatButton) {
      console.log('Dify chat button found, ensuring visibility');
      
      // SVGアイコンがない場合は追加
      if (!chatButton.innerHTML.includes('svg')) {
        chatButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
      }
      
      chatButton.style.cssText = `
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9995 !important;
        position: fixed !important;
        bottom: 11rem !important;
        right: 1rem !important;
        width: 48px !important;
        height: 48px !important;
        border-radius: 50% !important;
        background-color: #1C64F2 !important;
        cursor: pointer !important;
        color: white !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      `;
      
      // クリックイベントが設定されているか確認
      if (!chatButton.onclick) {
        chatButton.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log('Dify chat button clicked from initial check');
          
          const chatWindow = document.getElementById('dify-chatbot-bubble-window');
          if (chatWindow) {
            const isHidden = chatWindow.style.display === 'none' || !chatWindow.style.display;
            chatWindow.style.display = isHidden ? 'flex' : 'none';
            
            if (isHidden) {
              // チャットウィンドウのスタイルを適用
              chatWindow.style.cssText = `
                display: flex !important;
                flex-direction: column !important;
                width: 350px !important;
                height: 500px !important;
                max-height: 80vh !important;
                position: fixed !important;
                bottom: 5rem !important;
                right: 1rem !important;
                z-index: 9995 !important;
                border-radius: 0.5rem !important;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
                background-color: white !important;
                overflow: hidden !important;
              `;
              
              // モバイル対応
              if (window.innerWidth <= 640) {
                chatWindow.style.width = 'calc(100vw - 2rem)';
                chatWindow.style.height = '70vh';
              }
            }
          } else {
            console.log('Chat window not found on initial check click, triggering recreate event');
            document.dispatchEvent(new CustomEvent('recreate-dify-chat'));
          }
        }, true);
      }
    } else {
      console.warn('Dify chat button not found during initial check');
    }

    // チャットウィンドウの閉じるボタンを確認
    if (chatWindow) {
      console.log('Dify chat window found, adding close button');
      addCloseButtonToWindow(chatWindow);
      
      // チャットウィンドウのスタイルを適用
      chatWindow.style.cssText = `
        display: flex !important;
        flex-direction: column !important;
        width: 350px !important;
        height: 500px !important;
        max-height: 80vh !important;
        position: fixed !important;
        bottom: 5rem !important;
        right: 1rem !important;
        z-index: 9995 !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        background-color: white !important;
        overflow: hidden !important;
      `;
      
      // モバイル対応
      if (window.innerWidth <= 640) {
        chatWindow.style.width = 'calc(100vw - 2rem)';
        chatWindow.style.height = '70vh';
      }
    } else {
      console.warn('Dify chat window not found during initial check');
    }
  };
  
  // 即時実行
  initialCheck();
  
  // 念のため少し遅延して再度実行
  setTimeout(initialCheck, 500);
  setTimeout(initialCheck, 1000);
  
  // 確実にボタンが存在するように定期的に確認（インターバル時間を短く）
  setInterval(() => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    
    if (chatButton) {
      chatButton.style.cssText = `
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9995 !important;
        position: fixed !important;
        bottom: 11rem !important;
        right: 1rem !important;
        width: 48px !important;
        height: 48px !important;
        border-radius: 50% !important;
        background-color: #1C64F2 !important;
        cursor: pointer !important;
        color: white !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      `;
    }
    
    if (chatWindow && !chatWindow.querySelector('.dify-chatbot-window-close-btn')) {
      console.log('Reapplying close button');
      addCloseButtonToWindow(chatWindow);
    }
  }, 1000);
};
