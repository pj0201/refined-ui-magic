
import { closeButtonSvg } from "../styles/difyChatStyles";

/**
 * チャットバブルボタンのクリックイベントを管理
 */
const setupChatButtonInteractions = (): void => {
  // チャットボタンを取得
  const chatButton = document.getElementById('dify-chatbot-bubble-button');
  
  // 既存のイベントを削除し、新しいイベントリスナーを追加
  if (chatButton) {
    // すべてのイベントリスナーをクリア（新しいボタンに置き換え）
    const newButton = chatButton.cloneNode(true);
    chatButton.parentNode?.replaceChild(newButton, chatButton);
    
    // 新しいクリックイベントを追加
    newButton.addEventListener('click', () => {
      console.log('Chat button clicked, showing window');
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow) {
        chatWindow.style.display = 'flex';
        chatWindow.style.visibility = 'visible';
        chatWindow.style.opacity = '1';
      }
    });
  }
};

/**
 * チャットボットウィンドウに閉じるボタンを追加
 */
const addCloseButtonToWindow = (chatWindow: HTMLElement): void => {
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
const optimizeChatWindowStyles = (chatWindow: HTMLElement): void => {
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

/**
 * DOM変更を監視するObserverを設定
 */
export const setupDomObserver = (): MutationObserver => {
  console.log('Setting up DOM observer for Dify chat');
  
  const observer = new MutationObserver((mutations) => {
    // チャットボタンのインタラクションを設定
    setupChatButtonInteractions();
    
    // 小規模持続化補助金のチャットウィンドウを探す
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      addCloseButtonToWindow(chatWindow);
      optimizeChatWindowStyles(chatWindow);
    }
  });

  // DOM変更の監視を開始（より積極的な監視のため設定を強化）
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
  const checkElements = () => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    
    // チャットボタンの表示とインタラクションを設定
    if (chatButton) {
      chatButton.style.display = 'block';
      chatButton.style.visibility = 'visible';
      chatButton.style.opacity = '1';
      setupChatButtonInteractions();
    }

    // チャットウィンドウの閉じるボタンとスタイルを確認
    if (chatWindow) {
      addCloseButtonToWindow(chatWindow);
      optimizeChatWindowStyles(chatWindow);
    }
  };

  // 即時実行
  checkElements();
  
  // 少し遅延して再確認
  setTimeout(checkElements, 500);
  
  // さらに遅延して再確認（DOMがさらに更新される可能性があるため）
  setTimeout(checkElements, 1500);
  
  // ページが完全に読み込まれた後にも確認
  window.addEventListener('load', () => {
    setTimeout(checkElements, 100);
    setTimeout(checkElements, 1000);
  });
};
