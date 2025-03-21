
/**
 * チャットボタンとDifyブランディング関連のスタイル定義
 */

/**
 * Difyのブランディングとエラーメッセージを非表示にする関数
 * フッター、ロゴ、「Powered by」などの要素とエラーメッセージを非表示にします
 */
export const hideDifyBranding = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Difyのブランディングを完全に非表示にする */
    .dify-chatbot-bubble-window-footer,
    .dify-chatbot-bubble-window-footer *,
    [class*="dify-chatbot-bubble-window-footer"],
    [id*="dify-chatbot-bubble-window-footer"],
    [class*="dify"] [class*="footer"],
    [id*="dify"] [class*="footer"],
    [class*="powered-by"],
    [id*="powered-by"],
    [class*="powered"],
    [id*="powered"],
    [class*="brand"],
    [id*="brand"],
    [class*="logo"],
    [id*="logo"],
    a[href*="dify.ai"],
    a[href*="langgenius"],
    a[href*="chat.langgenius"],
    img[src*="dify"],
    img[src*="langgenius"] {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
    
    /* カスタム閉じるボタンのスタイル */
    .custom-close-button {
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
      z-index: 10000 !important;
    }
    
    .custom-close-button:hover {
      background-color: rgba(255, 255, 255, 0.4) !important;
    }
  `;
  document.head.appendChild(style);
};
