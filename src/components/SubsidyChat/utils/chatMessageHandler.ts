
import '../types/dify.d.ts';

/**
 * 省力化投資補助金のメッセージを送信
 */
export const sendShoroku = (): void => {
  if (window.DifyChat?.toggleBubbleWindow) {
    window.DifyChat.toggleBubbleWindow(true);
    if (window.DifyChat?.onChatCleared) {
      window.DifyChat.onChatCleared();
    }
    // 省力化投資補助金についてのメッセージを自動送信
    setTimeout(() => {
      if (window.DifyChat?.sendMessage) {
        window.DifyChat.sendMessage('省力化投資補助金について教えてください');
      }
    }, 500);
  } else {
    console.error('DifyChat is not available');
    // フォールバックとしてメッセージングを維持
    window.postMessage({ type: 'CHAT_TYPE_1_CLICK', value: '省力化投資補助金' }, '*');
  }
};

/**
 * 小規模持続化補助金のメッセージを送信
 */
export const sendShokibo = (): void => {
  if (window.DifyChat?.toggleBubbleWindow) {
    window.DifyChat.toggleBubbleWindow(true);
    if (window.DifyChat?.onChatCleared) {
      window.DifyChat.onChatCleared();
    }
    // 小規模持続化補助金についてのメッセージを自動送信
    setTimeout(() => {
      if (window.DifyChat?.sendMessage) {
        window.DifyChat.sendMessage('小規模持続化補助金について教えてください');
      }
    }, 500);
  } else {
    console.error('DifyChat is not available');
    // フォールバックとしてメッセージングを維持
    window.postMessage({ type: 'CHAT_TYPE_2_CLICK', value: '小規模持続化補助金' }, '*');
  }
};

/**
 * メッセージイベントリスナーを設定
 */
export const setupMessageListeners = (): void => {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'CHAT_TYPE_1_CLICK') {
      console.log("省力化投資補助金 chat requested");
      sendShoroku();
    } else if (event.data.type === 'CHAT_TYPE_2_CLICK') {
      console.log("小規模持続化補助金 chat requested");
      sendShokibo();
    }
  });
};
