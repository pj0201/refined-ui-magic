
/**
 * チャットメッセージの送信とウィンドウ表示を処理する
 */
export const sendChatMessage = (message: string): void => {
  console.log('Attempting to send message:', message);
  
  setTimeout(() => {
    if (window.DifyAI) {
      console.log('Using DifyAI API');
      if (!window.DifyAI.isOpen()) {
        window.DifyAI.toggleUI(true);
      }
      
      setTimeout(() => {
        if (window.DifyAI) {
          window.DifyAI.sendMessage(message);
          console.log('Message sent via DifyAI API');
        }
      }, 800);
    } else {
      console.error('DifyAI API not available');
      console.log('window.__DIFY_CHAT_CONFIG__ available:', !!window.__DIFY_CHAT_CONFIG__);
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
