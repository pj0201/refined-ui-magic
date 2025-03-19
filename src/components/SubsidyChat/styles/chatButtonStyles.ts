/**
 * チャットボタンのスタイル定義
 */
export const getChatButtonStyles = (): string => `
  /* チャットボタンのスタイリング */
  #dify-chatbot-bubble-button {
    background-color: #1C64F2 !important;
    bottom: 8rem !important;
    right: 1rem !important;
    z-index: 99995 !important;
    position: fixed !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 48px !important;
    height: 48px !important;
    border-radius: 50% !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
    cursor: pointer !important;
  }
`;

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
