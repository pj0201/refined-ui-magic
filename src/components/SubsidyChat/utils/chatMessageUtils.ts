
import { sendDirectChatMessage, showChatWindow } from './directChatImplementation';

/**
 * チャットメッセージの送信とウィンドウ表示を処理する
 */
export const sendChatMessage = (message: string): void => {
  console.log('Attempting to send message:', message);
  
  // Dify APIが利用可能かチェック
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
    return;
  }
  
  // 古いバージョンのDify APIをチェック
  if (typeof window.DifyChat !== 'undefined' && window.DifyChat.toggleWindow) {
    console.log('Using legacy DifyChat API');
    window.DifyChat.toggleWindow();
    
    // メッセージを送信する方法がないため、ウィンドウを表示するだけ
    console.log('Cannot send message via legacy DifyChat API');
    return;
  }
  
  // どのDify APIも利用できない場合は直接実装を使用
  console.log('Using direct chat implementation');
  sendDirectChatMessage(message);
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
