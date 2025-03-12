
import { closeButtonSvg } from "../styles/difyChatStyles";

/**
 * チャットボットウィンドウに閉じるボタンを追加
 */
const addCloseButtonToWindow = (chatWindow: HTMLElement): void => {
  // まず既存の閉じるボタンを探す
  let closeButton = chatWindow.querySelector('.dify-chatbot-window-close-btn') as HTMLElement;
  let headerElement = chatWindow.querySelector('.chatbot-header') as HTMLElement;
  
  // ヘッダー要素がない場合は作成する
  if (!headerElement) {
    // チャットボットのウィンドウヘッダーを探す (青いバー)
    const blueHeader = chatWindow.querySelector('.dify-chatbot-window-header') as HTMLElement;
    if (blueHeader) {
      headerElement = blueHeader;
    } else {
      // ヘッダーがない場合は、一番上の要素を探す
      const firstChild = chatWindow.firstElementChild as HTMLElement;
      if (firstChild) {
        headerElement = firstChild;
      } else {
        // どうしてもヘッダーがない場合はチャットウィンドウ自体を使用
        headerElement = chatWindow;
      }
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
    
    // 最初に青いヘッダーに追加を試みる
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
    
    // チャットボタンを探して状態を更新
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
 * DOM変更を監視するObserverを設定
 */
export const setupDomObserver = (): MutationObserver => {
  console.log('Setting up DOM observer for Dify chat');
  
  const observer = new MutationObserver((mutations) => {
    // 小規模持続化補助金のチャットウィンドウを探す
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      addCloseButtonToWindow(chatWindow);
      
      // 問題解決のため、inputエリアの横にある×ボタンも監視して無効化
      const inputAreaCloseButton = chatWindow.querySelector('.dify-chatbot-window-footer button[aria-label="Close"]');
      if (inputAreaCloseButton) {
        inputAreaCloseButton.remove(); // このボタンは混乱を招くので削除
      }
    }

    // チャットボタンの表示を確保
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    if (chatButton) {
      chatButton.style.display = 'block';
      chatButton.style.visibility = 'visible';
      chatButton.style.opacity = '1';
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
    
    // チャットボタンの表示を確認
    if (chatButton) {
      chatButton.style.display = 'block';
      chatButton.style.visibility = 'visible';
      chatButton.style.opacity = '1';
    }

    // チャットウィンドウの閉じるボタンを確認
    if (chatWindow) {
      addCloseButtonToWindow(chatWindow);
    }
  };

  // 即時実行
  checkElements();
  
  // 少し遅延して再確認
  setTimeout(checkElements, 500);
  
  // さらに遅延して再確認（DOMがさらに更新される可能性があるため）
  setTimeout(checkElements, 1500);
};

