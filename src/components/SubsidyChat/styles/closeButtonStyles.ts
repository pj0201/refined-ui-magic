
/**
 * カスタム閉じるボタンのスタイル定義
 */
export const getCloseButtonStyles = (): string => `
  /* カスタム閉じるボタン */
  .chatbot-close-button {
    position: fixed !important;
    top: 60px !important;
    right: 30px !important;
    background-color: #1C64F2 !important;
    color: white !important;
    border: none !important;
    border-radius: 20px !important;
    padding: 4px 12px !important;
    display: none !important; /* デフォルトで非表示に変更 */
    align-items: center !important;
    justify-content: center !important;
    font-size: 12px !important;
    cursor: pointer !important;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
    z-index: 2147483648 !important;
    transition: opacity 0.3s ease !important;
  }
  
  .chatbot-close-button.visible {
    display: flex !important; /* visibleクラスがある場合のみ表示 */
    opacity: 1 !important;
  }
  
  .chatbot-close-button svg {
    margin-right: 4px !important;
  }
`;

/**
 * カスタム閉じるボタンのHTMLコード - 白い×アイコン
 */
export const closeButtonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M6 6L18 18"></path></svg>`;

/**
 * 閉じるボタンのHTML
 */
export const closeButtonHtml = `
<button id="chatbot-close-button" class="chatbot-close-button">
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M18 6L6 18"></path>
    <path d="M6 6L18 18"></path>
  </svg>
  閉じる
</button>
`;
