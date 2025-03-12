import { closeButtonSvg } from "../styles/difyChatStyles";

/**
 * チャットボットウィンドウに閉じるボタンを追加
 */
const addCloseButtonToWindow = (chatWindow: HTMLElement): void => {
  let closeButton = chatWindow.querySelector('.dify-chatbot-window-close-btn') as HTMLElement;
  
  if (!closeButton) {
    // 閉じるボタンが存在しない場合は新規作成
    closeButton = document.createElement('button');
    closeButton.className = 'dify-chatbot-window-close-btn';
    closeButton.innerHTML = closeButtonSvg;
    chatWindow.appendChild(closeButton);
  }

  // 確実にクリックイベントを設定（既存のイベン���は削除）
  closeButton.onclick = () => {
    chatWindow.style.display = 'none';
    // チャットボタンを探して状態を更新
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton) {
      chatButton.style.display = 'block';
      chatButton.style.visibility = 'visible';
      chatButton.style.opacity = '1';
    }
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
};
