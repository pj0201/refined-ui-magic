
/**
 * カスタム閉じるボタンを追加する関数
 */
export const addCustomCloseButtons = (safelyCloseWindowFn: (windowId: string) => void) => {
  try {
    // チャットボットウィンドウのヘッダーを取得
    const chatWindows = [
      { id: 'dify-chatbot-bubble-window', selector: '#dify-chatbot-bubble-window .dify-chatbot-bubble-window-header' },
      { id: 'shoukibo-jizoka-chatbot-window', selector: '#shoukibo-jizoka-chatbot-window .dify-chatbot-bubble-window-header' },
      { id: 'shorikika-chatbot-window', selector: '#shorikika-chatbot-window .dify-chatbot-bubble-window-header' }
    ];
    
    // 各チャットウィンドウに閉じるボタンを追加
    chatWindows.forEach(({ id, selector }) => {
      const header = document.querySelector(selector);
      if (header && !header.querySelector('.custom-close-button')) {
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.className = 'custom-close-button';
        closeButton.setAttribute('aria-label', 'チャットを閉じる');
        closeButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          safelyCloseWindowFn(id);
          
          // 閉じた後に少し待機してから次の操作を許可
          setTimeout(() => {
            // イベントを発行して閉じられたことを通知
            window.dispatchEvent(new CustomEvent('chatbot-closed-completely', { detail: { windowId: id } }));
          }, 500);
        };
        header.appendChild(closeButton);
        console.log(`${id} に閉じるボタンを追加しました`);
      }
    });
  } catch (error) {
    console.error("カスタム閉じるボタンの追加中にエラーが発生しました:", error);
  }
};
