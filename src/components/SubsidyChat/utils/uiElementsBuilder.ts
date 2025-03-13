
import { 
  removeElement, 
  createChatbotLabel, 
  createChatbotButton,
  chatbotElementIds,
  toggleCloseButton
} from './domUtils';
import { startShorikikaChat, startShoukiboJizokaChat, setupMessageListeners } from './chatMessageUtils';

/**
 * チャットボット要素の追加
 */
export const addChatbotElements = (): void => {
  console.log("Adding chatbot elements to the DOM");
  
  // 既存の要素をクリーンアップ
  removeElement('chatbot-elements-container');
  removeElement('dify-chatbot-bubble-button-1');
  removeElement('dify-chatbot-label-1');
  removeElement('dify-chatbot-bubble-button-2');
  removeElement('dify-chatbot-label-2');
  removeElement('chatbot-close-button');
  
  // コンテナを作成
  const container = document.createElement('div');
  container.id = 'chatbot-elements-container';
  container.className = 'chatbot-elements-container';
  
  // 1つ目のラベル（省力化投資補助金）
  const label1 = createChatbotLabel(
    'dify-chatbot-label-1', 
    'dify-chatbot-label', 
    '省力化投資補助金の質問はコチラ'
  );
  container.appendChild(label1);
  
  // 1つ目のチャットボタン（省力化投資補助金）- ヘルプアイコン
  const button1 = createChatbotButton(
    'dify-chatbot-bubble-button-1', 
    'dify-chatbot-bubble-button',
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    startShorikikaChat
  );
  container.appendChild(button1);
  
  // 2つ目のラベル（小規模持続化補助金）
  const label2 = createChatbotLabel(
    'dify-chatbot-label-2', 
    'dify-chatbot-label', 
    '小規模持続化補助金の質問はコチラ'
  );
  container.appendChild(label2);
  
  // 2つ目のチャットボタン（小規模持続化補助金）- メッセージアイコン
  const button2 = createChatbotButton(
    'dify-chatbot-bubble-button-2', 
    'dify-chatbot-bubble-button',
    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    startShoukiboJizokaChat
  );
  container.appendChild(button2);
  
  // コンテナをDOMに追加
  document.body.appendChild(container);
  
  // メッセージハンドラー
  setupMessageListeners();
  
  // ウィンドウオブザーバを設定
  setupChatWindowObserver();
};

/**
 * チャットウィンドウの表示状態を監視する
 */
const setupChatWindowObserver = (): void => {
  // MutationObserverを使用してDOM変更を監視
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        // 新しい要素が追加された場合、チャットウィンドウをチェック
        const chatWindow = document.getElementById('dify-chatbot-bubble-window');
        if (chatWindow) {
          // 閉じるボタンをウィンドウに追加
          addCloseButtonToWindow(chatWindow);
          
          // ウィンドウの表示状態を監視するオブザーバーをセットアップ
          setupWindowVisibilityObserver(chatWindow);
        }
      }
    }
  });
  
  // bodyの変更を監視
  observer.observe(document.body, { childList: true, subtree: true });
  
  // 既存のチャットウィンドウをチェック
  const existingWindow = document.getElementById('dify-chatbot-bubble-window');
  if (existingWindow) {
    addCloseButtonToWindow(existingWindow);
    setupWindowVisibilityObserver(existingWindow);
  }
};

/**
 * チャットウィンドウに閉じるボタンを追加
 */
const addCloseButtonToWindow = (windowElement: HTMLElement): void => {
  // 既にボタンが追加されていないか確認
  if (windowElement.querySelector('.chat-window-close-button')) {
    return;
  }
  
  // 閉じるボタン要素を作成
  const closeButton = document.createElement('button');
  closeButton.className = 'chat-window-close-button';
  closeButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6L6 18"></path>
      <path d="M6 6L18 18"></path>
    </svg>
  `;
  
  // クリックイベントを追加
  closeButton.addEventListener('click', () => {
    // チャットウィンドウを非表示にする
    windowElement.style.display = 'none';
  });
  
  // ウィンドウにボタンを追加
  windowElement.appendChild(closeButton);
};

/**
 * 特定のチャットウィンドウ要素の表示状態変化を監視する
 */
const setupWindowVisibilityObserver = (windowElement: HTMLElement): void => {
  // 既存のオブザーバーを確認（data属性を使用）
  if (windowElement.hasAttribute('data-has-observer')) {
    return; // 既にオブザーバーが設定されている
  }
  
  // オブザーバーを設定
  const windowObserver = new MutationObserver(() => {
    const isVisible = window.getComputedStyle(windowElement).display !== 'none';
    console.log(`Chat window visibility changed: ${isVisible ? 'visible' : 'hidden'}`);
    
    // 表示状態に応じて閉じるボタンの表示を調整
    const closeButton = windowElement.querySelector('.chat-window-close-button');
    if (closeButton) {
      (closeButton as HTMLElement).style.display = isVisible ? 'flex' : 'none';
    } else if (isVisible) {
      // ボタンがない場合で、ウィンドウが表示された場合は追加
      addCloseButtonToWindow(windowElement);
    }
  });
  
  // style属性の変更を監視
  windowObserver.observe(windowElement, {
    attributes: true,
    attributeFilter: ['style']
  });
  
  // オブザーバーが設定されたことをマーク
  windowElement.setAttribute('data-has-observer', 'true');
};
