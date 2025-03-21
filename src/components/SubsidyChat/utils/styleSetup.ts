
/**
 * チャットボットのスタイルをセットアップする関数
 */
export const setupChatbotStyles = () => {
  try {
    const style = document.createElement('style');
    style.textContent = `
      /* チャットウィンドウのスタイル */
      #dify-chatbot-bubble-window,
      #shoukibo-jizoka-chatbot-window,
      #shorikika-chatbot-window {
        width: 24rem !important;
        height: 50rem !important;
        max-height: 90vh !important;
        max-width: calc(100vw - 32px) !important;
        bottom: auto !important;
        top: 50px !important;
        right: 20px !important;
        transform: none !important;
        margin-bottom: 0 !important;
        z-index: 99995 !important;
        position: fixed !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
        background-color: #fff !important;
      }
      
      /* ヘッダーのスタイリング */
      .dify-chatbot-bubble-window-header,
      .dify-chatbot-window-header {
        background-color: #1C64F2 !important;
        padding: 0.75rem !important;
        color: white !important;
        font-weight: 600 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        position: relative !important;
      }
      
      /* チャットウィンドウのコンテンツ */
      .dify-chatbot-bubble-window-content {
        flex: 1 !important;
        overflow: hidden !important;
        position: relative !important;
        height: calc(100% - 50px) !important;
      }
      
      /* iframe スタイル修正 */
      .dify-chatbot-bubble-window-content iframe {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        display: block !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
      }
      
      /* 閉じるボタン */
      .chat-window-close-button,
      .custom-close-button {
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        background-color: rgba(255, 255, 255, 0.2) !important;
        color: white !important;
        border: none !important;
        border-radius: 50% !important;
        width: 30px !important;
        height: 30px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        font-size: 18px !important;
        z-index: 10000 !important;
      }
      
      /* 閉じるボタンホバー */
      .chat-window-close-button:hover,
      .custom-close-button:hover {
        background-color: rgba(255, 255, 255, 0.3) !important;
      }
      
      /* エラーメッセージの非表示 */
      .dify-error-message, 
      [class*="error-message"], 
      [class*="errorMessage"],
      #shoukibo-jizoka-chatbot-window .error,
      #shorikika-chatbot-window .error,
      #dify-chatbot-bubble-window .error {
        display: none !important;
      }
      
      /* モバイル対応 */
      @media (max-width: 640px) {
        #dify-chatbot-bubble-window,
        #shoukibo-jizoka-chatbot-window,
        #shorikika-chatbot-window {
          width: calc(100vw - 32px) !important;
          height: 80vh !important;
          bottom: 1rem !important;
          right: 1rem !important;
          left: 1rem !important;
          top: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
    console.log("チャットボットスタイルをセットアップしました");
  } catch (error) {
    console.error("チャットボットスタイルのセットアップ中にエラーが発生しました:", error);
  }
};
