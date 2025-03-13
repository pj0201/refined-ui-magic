
/**
 * チャットメッセージの送信とウィンドウ表示を処理する
 */
export const sendChatMessage = (message: string): void => {
  if (window.DifyChat) {
    window.DifyChat.toggleBubbleWindow?.(true);
    window.DifyChat.onChatCleared?.();
    setTimeout(() => {
      if (window.DifyChat?.sendMessage) {
        window.DifyChat.sendMessage(message);
      }
    }, 500);
  } else if (window.difyChatbot) {
    // 新しいDify埋め込みAPIを使用
    window.difyChatbot.toggle();
    setTimeout(() => {
      window.difyChatbot.sendMessage(message);
    }, 500);
  } else {
    console.error('Dify Chatbot API is not available');
    window.postMessage({ type: 'CHAT_REQUEST', value: message }, '*');
  }
};

/**
 * 省力化投資補助金についてのチャットを開始
 */
export const startShorikikaChat = (): void => {
  sendChatMessage('省力化投資補助金について教えてください');
};

/**
 * 小規模持続化補助金についてのチャットを開始
 */
export const startShoukiboJizokaChat = (): void => {
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
