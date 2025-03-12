
/**
 * チャットウィンドウ関連のユーティリティ
 */
import { closeButtonSvg } from "../styles/difyChatStyles";

/**
 * チャットボットウィンドウに閉じるボタンを追加
 */
export const addCloseButtonToWindow = (chatWindow: HTMLElement): void => {
  // まず既存の閉じるボタンを探す
  let closeButton = chatWindow.querySelector('.dify-chatbot-window-close-btn') as HTMLElement;
  let headerElement = chatWindow.querySelector('.dify-chatbot-window-header') as HTMLElement;
  
  // ヘッダー要素がない場合は適切な要素を探す
  if (!headerElement) {
    const possibleHeaders = chatWindow.querySelectorAll('div');
    for (let i = 0; i < possibleHeaders.length; i++) {
      const style = window.getComputedStyle(possibleHeaders[i]);
      if (style.backgroundColor === 'rgb(28, 100, 242)' || 
          style.backgroundColor === '#1C64F2' ||
          possibleHeaders[i].classList.contains('dify-chatbot-window-header')) {
        headerElement = possibleHeaders[i] as HTMLElement;
        break;
      }
    }
    
    // それでもヘッダーがない場合は最初の子要素をヘッダーとして使用
    if (!headerElement && chatWindow.firstElementChild) {
      headerElement = chatWindow.firstElementChild as HTMLElement;
    }
  }
  
  // 閉じるボタンが存在しない場合は新規作成
  if (!closeButton) {
    closeButton = document.createElement('button');
    closeButton.className = 'dify-chatbot-window-close-btn';
    closeButton.innerHTML = closeButtonSvg;
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.zIndex = '99999';
    closeButton.style.backgroundColor = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.cursor = 'pointer';
    closeButton.style.display = 'flex';
    closeButton.style.alignItems = 'center';
    closeButton.style.justifyContent = 'center';
    closeButton.style.width = '24px';
    closeButton.style.height = '24px';
    closeButton.style.visibility = 'visible';
    closeButton.style.opacity = '1';
    
    // ヘッダーに閉じるボタンを追加
    if (headerElement) {
      headerElement.appendChild(closeButton);
    } else {
      // それでもダメならチャットウィンドウに直接追加
      chatWindow.appendChild(closeButton);
    }
  }

  // 既存のイベントを全て削除（イベントリスナーの重複を防ぐ）
  const newCloseButton = closeButton.cloneNode(true) as HTMLElement;
  closeButton.parentNode?.replaceChild(newCloseButton, closeButton);
  closeButton = newCloseButton;

  // クリックイベントを確実に設定
  closeButton.onclick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Close button clicked, hiding chat window');
    
    // チャットウィンドウを非表示に
    chatWindow.style.display = 'none';
    chatWindow.style.visibility = 'hidden';
    chatWindow.style.opacity = '0';
    
    // チャットボタンを表示
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton) {
      chatButton.style.display = 'block';
      chatButton.style.visibility = 'visible';
      chatButton.style.opacity = '1';
    }
    
    return false;
  };
  
  // スタイルを確実に適用
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.zIndex = '99999';
  closeButton.style.cursor = 'pointer';
  closeButton.style.display = 'flex';
  closeButton.style.visibility = 'visible';
  closeButton.style.opacity = '1';
};

/**
 * チャットウィンドウのスタイルを最適化
 */
export const optimizeChatWindowStyles = (chatWindow: HTMLElement): void => {
  // ウィンドウ自体のスタイル
  chatWindow.style.width = '24rem';
  chatWindow.style.height = '40rem';
  chatWindow.style.maxHeight = '80vh';
  chatWindow.style.maxWidth = 'calc(100vw - 32px)';
  chatWindow.style.bottom = '2rem';
  chatWindow.style.right = '1rem';
  chatWindow.style.transform = 'none';
  chatWindow.style.marginBottom = '0';
  chatWindow.style.zIndex = '99995';
  chatWindow.style.display = 'flex';
  chatWindow.style.flexDirection = 'column';
  chatWindow.style.overflow = 'hidden';
  chatWindow.style.borderRadius = '0.5rem';
  
  // モバイル対応
  if (window.innerWidth <= 640) {
    chatWindow.style.width = 'calc(100vw - 2rem)';
    chatWindow.style.height = '70vh';
    chatWindow.style.maxHeight = '70vh';
  }
  
  // 入力エリアの閉じるボタンを非表示（混乱を避けるため）
  const footerCloseButton = chatWindow.querySelector('.dify-chatbot-window-footer button[aria-label="Close"]');
  if (footerCloseButton) {
    (footerCloseButton as HTMLElement).style.display = 'none';
  }
};
