
import { closeButtonSvg } from "../styles/difyChatStyles";

/**
 * チャットボットウィンドウに閉じるボタンを追加
 */
const addCloseButtonToWindow = (chatWindow: HTMLElement): void => {
  // 既存の閉じるボタンを確認
  const existingCloseButton = chatWindow.querySelector('.dify-chatbot-window-close-btn') as HTMLElement;
  
  if (existingCloseButton) {
    console.log('Existing close button found, enhancing it');
    // 既存のボタンが見つかった場合は、表示とスタイルを強制的に適用
    existingCloseButton.setAttribute('style', `
      display: flex !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: absolute !important;
      top: 10px !important;
      right: 10px !important;
      z-index: 9999 !important;
      width: 30px !important;
      height: 30px !important;
      color: white !important;
      background: rgba(0, 0, 0, 0.5) !important;
      border-radius: 50% !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3) !important;
      border: 2px solid white !important;
    `);

    // クリックイベントを追加（既存のイベントがある場合は上書き）
    existingCloseButton.onclick = () => {
      console.log('Close button clicked');
      chatWindow.style.display = 'none';
      // チャットボタンを探してクリック
      const chatButton = document.getElementById('dify-chatbot-bubble-button');
      if (chatButton) {
        chatButton.click();
      }
    };
  } else {
    console.log('No close button found, creating custom button');
    // 既存のボタンがない場合はカスタムボタンを作成
    const customCloseButton = document.createElement('button');
    customCloseButton.className = 'custom-dify-close-btn';
    customCloseButton.innerHTML = closeButtonSvg;
    customCloseButton.setAttribute('style', `
      display: flex !important;
      visibility: visible !important;
      opacity: 1 !important;
      position: absolute !important;
      top: 10px !important;
      right: 10px !important;
      z-index: 9999 !important;
      width: 30px !important;
      height: 30px !important;
      color: white !important;
      background: rgba(0, 0, 0, 0.5) !important;
      border-radius: 50% !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3) !important;
      border: 2px solid white !important;
    `);
    
    // ボタンにクリックイベントを追加
    customCloseButton.addEventListener('click', () => {
      console.log('Custom close button clicked');
      chatWindow.style.display = 'none';
      
      // チャットボタンを探してクリック
      const chatButton = document.getElementById('dify-chatbot-bubble-button');
      if (chatButton) {
        chatButton.click();
      }
    });
    
    // 一度確実に追加
    chatWindow.appendChild(customCloseButton);
  }
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
      console.log('Dify chat window found, checking close button');
      addCloseButtonToWindow(chatWindow);
    }

    // チャットボタンの表示を確保
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton) {
      chatButton.style.display = 'block';
      chatButton.style.visibility = 'visible';
      chatButton.style.opacity = '1';
    }
  });

  // DOM変更の監視を開始
  observer.observe(document.body, { childList: true, subtree: true });
  
  return observer;
};

/**
 * 初期状態のチャットボット要素のチェックと修正
 */
export const performInitialElementsCheck = (): void => {
  setTimeout(() => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    
    // チャットボタンの表示を確認
    if (chatButton) {
      console.log('Dify chat button found, ensuring visibility');
      chatButton.style.display = 'block';
      chatButton.style.visibility = 'visible';
      chatButton.style.opacity = '1';
    } else {
      console.log('Dify chat button not found yet');
    }

    // チャットウィンドウの閉じるボタンを確認
    if (chatWindow) {
      console.log('Dify chat window found, checking close button');
      addCloseButtonToWindow(chatWindow);
    }
  }, 1000);
  
  // 追加の確認を3秒後にも行う（遅延ロードの場合）
  setTimeout(() => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      console.log('Additional check for close button');
      addCloseButtonToWindow(chatWindow);
    }
  }, 3000);
};
