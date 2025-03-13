
import '../types/dify.d.ts';

/**
 * 省力化投資補助金のメッセージを送信
 */
export const sendShoroku = (): void => {
  console.log("省力化投資補助金ボタンがクリックされました");
  if (window.DifyChat) {
    console.log("DifyChat APIを使用してチャットを開始します");
    
    if (window.DifyChat.toggleBubbleWindow) {
      window.DifyChat.toggleBubbleWindow(true);
      if (window.DifyChat.onChatCleared) {
        window.DifyChat.onChatCleared();
      }
      // 省力化投資補助金についてのメッセージを自動送信
      setTimeout(() => {
        if (window.DifyChat?.sendMessage) {
          console.log("自動メッセージを送信: 省力化投資補助金について教えてください");
          window.DifyChat.sendMessage('省力化投資補助金について教えてください');
        } else {
          console.warn("DifyChat.sendMessage が利用できません");
        }
      }, 800); // 遅延を増やして確実にUIが表示されてから送信
    } else {
      console.warn("DifyChat.toggleBubbleWindow が利用できません");
    }
  } else {
    console.warn("DifyChat API が利用できません。フォールバックメッセージングを使用します");
    // フォールバックとしてメッセージングを維持
    // iframeを直接操作する代替手段（プレースホルダー）
    displayFallbackMessage("省力化投資補助金について教えてください");
    window.postMessage({ type: 'CHAT_TYPE_1_CLICK', value: '省力化投資補助金' }, '*');
  }
};

/**
 * 小規模持続化補助金のメッセージを送信
 */
export const sendShokibo = (): void => {
  console.log("小規模持続化補助金ボタンがクリックされました");
  if (window.DifyChat) {
    console.log("DifyChat APIを使用してチャットを開始します");
    
    if (window.DifyChat.toggleBubbleWindow) {
      window.DifyChat.toggleBubbleWindow(true);
      if (window.DifyChat.onChatCleared) {
        window.DifyChat.onChatCleared();
      }
      // 小規模持続化補助金についてのメッセージを自動送信
      setTimeout(() => {
        if (window.DifyChat?.sendMessage) {
          console.log("自動メッセージを送信: 小規模持続化補助金について教えてください");
          window.DifyChat.sendMessage('小規模持続化補助金について教えてください');
        } else {
          console.warn("DifyChat.sendMessage が利用できません");
        }
      }, 800); // 遅延を増やして確実にUIが表示されてから送信
    } else {
      console.warn("DifyChat.toggleBubbleWindow が利用できません");
    }
  } else {
    console.warn("DifyChat API が利用できません。フォールバックメッセージングを使用します");
    // フォールバックとしてメッセージングを維持
    // iframeを直接操作する代替手段（プレースホルダー）
    displayFallbackMessage("小規模持続化補助金について教えてください");
    window.postMessage({ type: 'CHAT_TYPE_2_CLICK', value: '小規模持続化補助金' }, '*');
  }
};

/**
 * フォールバックメッセージを表示する
 */
const displayFallbackMessage = (message: string): void => {
  // フォールバックとして、メッセージを画面に表示する簡易的な方法
  const fallbackContainer = document.createElement('div');
  fallbackContainer.style.position = 'fixed';
  fallbackContainer.style.bottom = '20px';
  fallbackContainer.style.right = '20px';
  fallbackContainer.style.width = '300px';
  fallbackContainer.style.padding = '15px';
  fallbackContainer.style.backgroundColor = '#fff';
  fallbackContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
  fallbackContainer.style.borderRadius = '8px';
  fallbackContainer.style.zIndex = '9999';
  
  const closeButton = document.createElement('button');
  closeButton.textContent = '×';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '5px';
  closeButton.style.right = '10px';
  closeButton.style.background = 'none';
  closeButton.style.border = 'none';
  closeButton.style.fontSize = '18px';
  closeButton.style.cursor = 'pointer';
  closeButton.onclick = () => fallbackContainer.remove();
  
  const title = document.createElement('h4');
  title.textContent = 'チャットボット - ロード中...';
  title.style.marginTop = '0';
  title.style.marginBottom = '10px';
  
  const text = document.createElement('p');
  text.textContent = `質問: ${message}`;
  text.style.marginBottom = '10px';
  
  const info = document.createElement('p');
  info.textContent = 'チャットボットの読み込みに問題が発生しています。ページを再読み込みするか、後ほどお試しください。';
  info.style.fontSize = '12px';
  info.style.color = '#666';
  
  fallbackContainer.appendChild(closeButton);
  fallbackContainer.appendChild(title);
  fallbackContainer.appendChild(text);
  fallbackContainer.appendChild(info);
  
  // 既存のフォールバックコンテナを削除
  const existing = document.getElementById('dify-fallback-container');
  if (existing) existing.remove();
  
  fallbackContainer.id = 'dify-fallback-container';
  document.body.appendChild(fallbackContainer);
  
  // 30秒後に自動的に閉じる
  setTimeout(() => {
    if (document.getElementById('dify-fallback-container')) {
      fallbackContainer.remove();
    }
  }, 30000);
};

/**
 * メッセージイベントリスナーを設定
 */
export const setupMessageListeners = (): void => {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'CHAT_TYPE_1_CLICK') {
      console.log("省力化投資補助金 chat requested via message event");
      sendShoroku();
    } else if (event.data.type === 'CHAT_TYPE_2_CLICK') {
      console.log("小規模持続化補助金 chat requested via message event");
      sendShokibo();
    }
  });
  
  console.log("メッセージイベントリスナーが設定されました");
};
