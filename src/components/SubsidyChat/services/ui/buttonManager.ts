
import { ensureChatWindowVisibility } from "./styleManager";

/**
 * チャットボタンのセットアップと確実なイベントハンドラの設定
 */
export const setupChatButton = (): void => {
  let chatButton = document.getElementById('dify-chatbot-bubble-button');
  
  // ボタンが存在しない場合は作成
  if (!chatButton) {
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
        // チャットウィンドウが見つからない場合は再初期化
        const setupDifyChat = require('../chatInit').setupDifyChat;
        
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
  }
};
