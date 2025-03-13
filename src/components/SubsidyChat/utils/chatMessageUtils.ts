
/**
 * チャットメッセージの送信とウィンドウ表示を処理する
 */
export const sendChatMessage = (message: string): void => {
  console.log('Attempting to send message:', message);
  
  // Dify APIオブジェクトを検出する前に、少し遅延してグローバルオブジェクトが初期化される時間を確保
  setTimeout(() => {
    if (window.DifyAI) {
      console.log('Using DifyAI API (latest version)');
      // 最新のDify AIウィジェットAPIを使用
      if (!window.DifyAI.isOpen()) {
        window.DifyAI.toggleUI(true);
      }
      
      // メッセージを遅延して送信（UIが完全に開くまで待機）
      setTimeout(() => {
        if (window.DifyAI) {
          window.DifyAI.sendMessage(message);
          console.log('Message sent via DifyAI API');
        }
      }, 800);
    } else if (window.difyChatbot) {
      console.log('Using difyChatbot API');
      // 新しいDify埋め込みAPIを使用
      window.difyChatbot.toggle();
      
      // メッセージを遅延して送信
      setTimeout(() => {
        if (window.difyChatbot) {
          window.difyChatbot.sendMessage(message);
          console.log('Message sent via difyChatbot API');
        }
      }, 800);
    } else if (window.DifyChat && window.DifyChat.sendMessage) {
      console.log('Using DifyChat API (legacy)');
      // 古いAPIが利用可能な場合
      window.DifyChat.toggleBubbleWindow?.(true);
      window.DifyChat.onChatCleared?.();
      
      // メッセージを遅延して送信
      setTimeout(() => {
        if (window.DifyChat?.sendMessage) {
          window.DifyChat.sendMessage(message);
          console.log('Message sent via DifyChat API');
        }
      }, 800);
    } else {
      console.error('No Dify API available - Attempting fallback method');
      // フォールバックメソッド：メッセージイベントを発行
      window.postMessage({ type: 'CHAT_REQUEST', value: message }, '*');
      
      // スクリプトの状態をコンソールに出力（デバッグ用）
      console.log('DifyChat available:', !!window.DifyChat);
      console.log('difyChatbot available:', !!window.difyChatbot);
      console.log('DifyAI available:', !!window.DifyAI);
      console.log('__DIFY_CHAT_CONFIG__ available:', !!window.__DIFY_CHAT_CONFIG__);
      
      // グローバルオブジェクトを確認
      const globalKeys = Object.keys(window).filter(key => 
        key.toLowerCase().includes('dify') || 
        key.includes('chat') || 
        key.includes('Chat') ||
        key.includes('AI') ||
        key.includes('widget')
      );
      console.log('Potential Dify related global objects:', globalKeys);
      
      // 手動でDifyのチャットウィンドウを探してクリック
      const chatElements = document.querySelectorAll('[id*="dify"], [class*="dify"], [id*="chat"], [class*="chat"]');
      console.log('Found potential chat elements:', chatElements.length);
      
      // チャットウィンドウを検索して開く試み
      chatElements.forEach(el => {
        console.log('Potential chat element:', el.tagName, el.id, el.className);
        if (el instanceof HTMLElement) {
          // ボタンや対話要素のみクリックを試みる
          if (el.tagName === 'BUTTON' || el.tagName === 'A' || el.tagName === 'DIV' || el.tagName === 'SPAN') {
            console.log('Attempting to click element:', el.tagName, el.id, el.className);
            el.click();
          }
        }
      });
    }
  }, 500);
};

/**
 * 省力化投資補助金についてのチャットを開始
 */
export const startShorikikaChat = (): void => {
  console.log('Starting chat about 省力化投資補助金');
  sendChatMessage('省力化投資補助金について教えてください');
};

/**
 * 小規模持続化補助金についてのチャットを開始
 */
export const startShoukiboJizokaChat = (): void => {
  console.log('Starting chat about 小規模持続化補助金');
  sendChatMessage('小規模持続化補助金について教えてください');
};

/**
 * メッセージイベントリスナーの設定
 */
export const setupMessageListeners = (): void => {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'CHAT_TYPE_1_CLICK') {
      console.log("省力化投資補助金 chat requested");
      startShorikikaChat();
    } else if (event.data.type === 'CHAT_TYPE_2_CLICK') {
      console.log("小規模持続化補助金 chat requested");
      startShoukiboJizokaChat();
    } else if (event.data.type === 'CHAT_REQUEST' && event.data.value) {
      sendChatMessage(event.data.value);
    }
  });
};
