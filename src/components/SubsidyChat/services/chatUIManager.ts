
import { setupDomObserver, performInitialElementsCheck } from "../utils/domObserver";
import { closeButtonSvg } from "../styles/difyChatStyles";

/**
 * スタイルを適用する関数
 */
export const applyStyles = (): MutationObserver => {
  console.log('Applying Dify chat styles');
  
  // DOM変更を監視するObserverを設定
  const observer = setupDomObserver();

  // 初期チェックを実行
  performInitialElementsCheck();

  // 閉じるボタンをチェックして再作成する
  const checkCloseButton = () => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow && !document.querySelector('.dify-custom-close-btn')) {
      console.log('Close button not found, creating custom close button...');
      
      // カスタム閉じるボタンの作成
      const closeBtn = document.createElement('button');
      closeBtn.className = 'dify-custom-close-btn';
      closeBtn.innerHTML = closeButtonSvg;
      closeBtn.style.cssText = `
        position: absolute !important;
        top: 15px !important;
        right: 15px !important;
        z-index: 10000 !important;
        background: #ffffff !important;
        color: #4a5568 !important;
        border: 1px solid #e2e8f0 !important;
        border-radius: 50% !important;
        width: 32px !important;
        height: 32px !important;
        font-size: 20px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        padding: 0 !important;
        line-height: 1 !important;
      `;
      
      // クリックイベントを追加（チャットウィンドウを閉じる）
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Custom close button clicked');
        
        // チャットウィンドウを非表示にする
        if (chatWindow) {
          chatWindow.style.display = 'none';
        }
        
        // プラグインの状態も更新
        const plugin = document.getElementById('dify-chatbot-bubble-button');
        if (plugin) {
          plugin.classList.remove('active');
        }
      }, true);
      
      // ボタンをウィンドウに追加
      chatWindow.appendChild(closeBtn);
    }
  };

  // 定期的に閉じるボタンの存在をチェック
  setInterval(checkCloseButton, 1000);

  return observer;
};

/**
 * チャットボタンのセットアップと確実なイベントハンドラの設定
 */
export const setupChatButton = (): void => {
  let chatButton = document.getElementById('dify-chatbot-bubble-button');
  
  // ボタンが存在しない場合は作成
  if (!chatButton) {
    console.log('Creating new Dify chat button');
    chatButton = document.createElement('button');
    chatButton.id = 'dify-chatbot-bubble-button';
    document.body.appendChild(chatButton);
  }
  
  if (chatButton) {
    // 既存のクリックイベントを削除
    chatButton.onclick = null;
    const newButton = chatButton.cloneNode(true);
    chatButton.replaceWith(newButton);
    chatButton = document.getElementById('dify-chatbot-bubble-button');
    
    if (!chatButton) return;
    
    // スタイルを強制的に適用
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
      font-size: 24px !important;
      border: none !important;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    `;
    
    // チャットアイコンの設定
    chatButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    `;
    
    // 新しいクリックイベントハンドラを設定
    chatButton.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Dify chat button clicked - NEW HANDLER');
      
      // チャットウィンドウの表示を切り替え
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow) {
        const isHidden = chatWindow.style.display === 'none' || !chatWindow.style.display;
        chatWindow.style.display = isHidden ? 'flex' : 'none';
        
        if (isHidden) {
          // ウィンドウが表示されている場合、位置を調整
          ensureChatWindowVisibility(chatWindow);
        }
      } else {
        console.log('Chat window not found on click, reinitializing...');
        // チャットウィンドウが見つからない場合は再初期化
        const setupDifyChat = require('./chatInit').setupDifyChat;
        
        setTimeout(() => {
          setupDifyChat();
          
          // 少し遅延してウィンドウを表示
          setTimeout(() => {
            const newWindow = document.getElementById('dify-chatbot-bubble-window');
            if (newWindow) {
              newWindow.style.display = 'flex';
              ensureChatWindowVisibility(newWindow);
            }
          }, 500);
        }, 100);
      }
    }, true);
    
    console.log('Dify chat button setup complete with new click handler');
  }
};

/**
 * チャットウィンドウが画面内に収まるように調整
 */
export const ensureChatWindowVisibility = (chatWindow: HTMLElement): void => {
  // 基本スタイルを適用
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
  
  // 画面サイズに応じた調整
  if (window.innerWidth <= 640) {
    chatWindow.style.width = 'calc(100vw - 2rem)';
    chatWindow.style.height = '70vh';
  }
  
  console.log('Chat window visibility ensured');
};
