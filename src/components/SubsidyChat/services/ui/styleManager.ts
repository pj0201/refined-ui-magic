
import { closeButtonSvg } from "../../styles/difyChatStyles";

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
    z-index: 99995 !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
    background-color: white !important;
    overflow: hidden !important;
    visibility: visible !important;
    opacity: 1 !important;
  `;
  
  // 画面サイズに応じた調整
  if (window.innerWidth <= 640) {
    chatWindow.style.width = 'calc(100vw - 2rem)';
    chatWindow.style.height = '70vh';
  }
  
  console.log('Chat window visibility ensured with higher z-index');
};

/**
 * カスタム閉じるボタンを作成して追加する
 */
export const createCloseButton = (chatWindow: HTMLElement): void => {
  if (chatWindow && !document.querySelector('.dify-custom-close-btn')) {
    // カスタム閉じるボタンの作成
    const closeBtn = document.createElement('button');
    closeBtn.className = 'dify-custom-close-btn';
    closeBtn.innerHTML = closeButtonSvg;
    closeBtn.style.cssText = `
      position: absolute !important;
      top: 15px !important;
      right: 15px !important;
      z-index: 100000 !important;
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
      visibility: visible !important;
      opacity: 1 !important;
    `;
    
    // クリックイベントを追加（チャットウィンドウを閉じる）
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
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
