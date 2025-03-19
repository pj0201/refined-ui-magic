/**
 * チャットウィンドウのスタイル定義
 * 一般チャット、小規模持続化補助金チャット、省力化投資補助金チャットの共通スタイル
 */
export const getChatWindowStyles = (): string => `
  /* 共通のチャットウィンドウスタイル */
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
  }

  /* ヘッダーのスタイリング - 上部の青いバー（共通） */
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

  /* チャットウィンドウ内閉じるボタン */
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

  /* チャットウィンドウ内閉じるボタンのホバー状態 */
  .chat-window-close-button:hover,
  .custom-close-button:hover {
    background-color: rgba(255, 255, 255, 0.3) !important;
  }

  /* チャットウィンドウ内コンテンツ */
  .dify-chatbot-bubble-window-content {
    flex: 1 !important;
    overflow-y: auto !important;
    padding: 1rem !important;
    background-color: white !important;
  }

  /* フッターの非表示 */
  .dify-chatbot-bubble-window-footer,
  [class*="dify-chatbot-bubble-window-footer"],
  [id*="dify-chatbot-bubble-window-footer"] {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
    height: 0 !important;
  }

  /* 青いボタンを完全に非表示 */
  #dify-chatbot-bubble-button,
  .dify-chatbot-bubble-button,
  [id^="dify-chatbot-bubble-button"],
  [class^="dify-chatbot-bubble-button"],
  [id*="dify-chatbot-bubble-button"],
  [class*="dify-chatbot-bubble-button"] {
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
  [class*="errorMessage"],
  [class*="Error"],
  [class*="error"] {
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
  [class*="errorMessage"]::before,
  [class*="Error"]::before,
  [class*="error"]::before {
    content: 'しばらくお待ちください...' !important;
  }
  
  .dify-error-message *,
  [class*="error-message"] *,
  [class*="errorMessage"] *,
  [class*="Error"] *,
  [class*="error"] * {
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
