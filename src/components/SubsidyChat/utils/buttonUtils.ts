
/**
 * チャットバブルボタンのクリックイベントを管理するユーティリティ
 */

/**
 * チャットボタンのクリックイベントを設定
 * 既存のイベントを削除し、新しいイベントリスナーを追加
 */
export const setupChatButtonInteractions = (): void => {
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
 * チャットボタンの表示状態を設定
 */
export const setupChatButtonVisibility = (): void => {
  const chatButton = document.getElementById('dify-chatbot-bubble-button');
  if (chatButton) {
    chatButton.style.display = 'block';
    chatButton.style.visibility = 'visible';
    chatButton.style.opacity = '1';
  }
};
