/**
 * チャットボタンとDifyブランディング関連のスタイル定義
 */

/**
 * 青いボタンを非表示にする関数
 * チャットボットの青いボタンを完全に非表示にします
 */
export const hideBlueButton = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* 青いボタンを完全に非表示 */
    #dify-chatbot-bubble-button,
    .dify-chatbot-bubble-button,
    [id^="dify-chatbot-bubble-button"],
    [class^="dify-chatbot-bubble-button"],
    [id*="dify-chatbot-bubble-button"],
    [class*="dify-chatbot-bubble-button"],
    [id*="chatbot-bubble-button"],
    [class*="chatbot-bubble-button"] {
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
  `;
  document.head.appendChild(style);
};

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
      width: 0 !important;
      height: 0 !important;
      position: absolute !important;
      left: -9999px !important;
      top: -9999px !important;
      z-index: -1 !important;
    }
    
    /* エラーメッセージも非表示にする */
    .dify-error-message,
    [class*="dify-error"],
    [id*="dify-error"],
    [class*="error-message"],
    [id*="error-message"],
    .toast-error,
    [class*="toast-error"],
    [id*="toast-error"] {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
    }
  `;
  document.head.appendChild(style);
};
