
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
