
/**
 * カスタム閉じるボタンを追加する関数
 */
export const addCustomCloseButtons = () => {
  console.log("カスタム閉じるボタンを追加します");
  
  try {
    // チャットボットウィンドウのヘッダーを取得
    const chatWindows = [
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
        closeButton.setAttribute('style', `
          position: absolute !important;
          top: 10px !important;
          right: 10px !important;
          width: 30px !important;
          height: 30px !important;
          border-radius: 50% !important;
          background-color: rgba(255, 255, 255, 0.2) !important;
          border: none !important;
          color: white !important;
          font-size: 18px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: background-color 0.3s !important;
          z-index: 10000 !important;
        `);
        closeButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          const chatWindow = document.getElementById(id);
          if (chatWindow) {
            chatWindow.style.display = 'none';
            document.body.classList.remove('chatbot-window-active');
          }
        };
        header.appendChild(closeButton);
      }
    });
    
    return true;
  } catch (error) {
    console.error("カスタム閉じるボタンの追加中にエラーが発生しました:", error);
    return false;
  }
};
