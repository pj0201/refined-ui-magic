
/**
 * チャットボットのスタイルをセットアップする関数
 */
export const setupChatbotStyles = () => {
  try {
    // 既存のスタイルを確認
    const existingStyle = document.getElementById('dify-chatbot-styles');
    if (existingStyle) {
      console.log("既存のスタイルを更新します");
      existingStyle.remove();
    }
    
    // 新しいスタイル要素を作成
    const style = document.createElement('style');
    style.id = 'dify-chatbot-styles';
    style.textContent = `
      /* チャットウィンドウのスタイル */
      #dify-chatbot-bubble-window,
      #shoukibo-jizoka-chatbot-window,
      #shorikika-chatbot-window,
      [class*="dify-chatbot-bubble-window"] {
        width: 380px !important;
        height: 600px !important;
        max-height: 80vh !important;
        max-width: calc(100vw - 40px) !important;
        bottom: 20px !important;
        right: 20px !important;
        top: auto !important;
        left: auto !important;
        transform: none !important;
        margin-bottom: 0 !important;
        z-index: 99995 !important;
        position: fixed !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        border-radius: 10px !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
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
      
      /* Difyのブランディングを非表示 */
      .dify-chatbot-bubble-window-footer,
      [class*="dify"] [class*="footer"],
      [class*="powered-by"],
      a[href*="dify.ai"] {
        display: none !important;
      }
      
      /* 青いボタンを非表示にする */
      .dify-chatbot-bubble-button,
      #dify-chatbot-bubble-button,
      [id^="dify-chatbot-bubble-button"],
      [class^="dify-chatbot-bubble-button"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        width: 0 !important;
        height: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        z-index: -1 !important;
      }
      
      /* エラーメッセージを「しばらくお待ちください」に変更 */
      .dify-error-message, 
      [class*="error-message"], 
      [class*="errorMessage"] {
        display: block !important;
        color: #4B5563 !important;
        font-weight: normal !important;
        font-size: 0.9rem !important;
        text-align: center !important;
        padding: 1rem !important;
        margin: 1rem 0 !important;
        border: none !important;
        background: none !important;
      }
      
      .dify-error-message::before,
      [class*="error-message"]::before,
      [class*="errorMessage"]::before {
        content: 'しばらくお待ちください...' !important;
      }
      
      .dify-error-message *,
      [class*="error-message"] *,
      [class*="errorMessage"] * {
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
