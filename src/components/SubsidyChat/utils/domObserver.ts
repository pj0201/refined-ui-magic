
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
  closeButton.setAttribute('style', `
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
  `);
  
  // ボタンのヘッダー部分への追加（より確実に表示されるようにするため）
  const header = chatWindow.querySelector('.dify-chatbot-window-header') || chatWindow;
  header.appendChild(closeButton);

  // クリックイベントを設定
  closeButton.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    chatWindow.style.display = 'none';
    
    // チャットボタンを表示
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton) {
      chatButton.style.display = 'block';
      chatButton.style.visibility = 'visible';
      chatButton.style.opacity = '1';
    }
    
    console.log('Chat window closed');
    return false;
  };
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
      // 直ちに閉じるボタンを追加
      addCloseButtonToWindow(chatWindow);
      
      // チャットウィンドウのスタイルを強制的に適用
      chatWindow.style.display = 'flex';
      chatWindow.style.flexDirection = 'column';
      chatWindow.style.width = '350px';
      chatWindow.style.height = '500px';
      chatWindow.style.maxHeight = '80vh';
      chatWindow.style.position = 'fixed';
      chatWindow.style.bottom = '5rem';
      chatWindow.style.right = '1rem';
      chatWindow.style.zIndex = '1001';
      chatWindow.style.borderRadius = '0.5rem';
      chatWindow.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    }

    // チャットボタンの表示を確保
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton) {
      chatButton.style.display = 'block';
      chatButton.style.visibility = 'visible';
      chatButton.style.opacity = '1';
      chatButton.style.zIndex = '9999';
      chatButton.style.position = 'fixed';
      chatButton.style.bottom = '11rem';
      chatButton.style.right = '1rem';
      chatButton.style.width = '48px';
      chatButton.style.height = '48px';
      chatButton.style.borderRadius = '50%';
      chatButton.style.backgroundColor = '#1C64F2';
      chatButton.style.cursor = 'pointer';
    }
  });

  // DOM変更の監視を開始（最大限の監視範囲）
  observer.observe(document.body, { 
    childList: true, 
    subtree: true,
    attributes: true,
    characterData: true
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
      chatButton.style.display = 'block';
      chatButton.style.visibility = 'visible';
      chatButton.style.opacity = '1';
      chatButton.style.zIndex = '9999';
      chatButton.style.position = 'fixed';
      chatButton.style.bottom = '11rem';
      chatButton.style.right = '1rem';
      chatButton.style.width = '48px';
      chatButton.style.height = '48px';
      chatButton.style.borderRadius = '50%';
      chatButton.style.backgroundColor = '#1C64F2';
      chatButton.style.cursor = 'pointer';
    } else {
      console.warn('Dify chat button not found during initial check');
    }

    // チャットウィンドウの閉じるボタンを確認
    if (chatWindow) {
      console.log('Dify chat window found, adding close button');
      addCloseButtonToWindow(chatWindow);
      
      // チャットウィンドウのスタイルを適用
      chatWindow.style.display = 'flex';
      chatWindow.style.flexDirection = 'column';
      chatWindow.style.width = '350px';
      chatWindow.style.height = '500px';
      chatWindow.style.maxHeight = '80vh';
      chatWindow.style.position = 'fixed';
      chatWindow.style.bottom = '5rem';
      chatWindow.style.right = '1rem';
      chatWindow.style.zIndex = '1001';
      chatWindow.style.borderRadius = '0.5rem';
      chatWindow.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    }
  };
  
  // 即時実行
  initialCheck();
  
  // 念のため少し遅延して再度実行
  setTimeout(initialCheck, 1000);
  
  // 確実にボタンが存在するように定期的に確認
  setInterval(() => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    
    if (chatButton) {
      chatButton.style.display = 'block';
      chatButton.style.visibility = 'visible';
      chatButton.style.opacity = '1';
      chatButton.style.zIndex = '9999';
    }
    
    if (chatWindow && !chatWindow.querySelector('.dify-chatbot-window-close-btn')) {
      console.log('Reapplying close button');
      addCloseButtonToWindow(chatWindow);
    }
  }, 2000);
};
