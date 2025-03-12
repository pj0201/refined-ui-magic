
import { closeButtonSvg } from "../styles/difyChatStyles";

/**
 * チャットボットウィンドウに閉じるボタンを追加
 */
export const addCloseButtonToWindow = (chatWindow: HTMLElement): void => {
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
