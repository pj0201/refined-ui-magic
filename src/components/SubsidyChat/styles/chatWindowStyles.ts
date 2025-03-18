
/**
 * チャットウィンドウのスタイル定義
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
    bottom: 2rem !important;
    right: 1rem !important;
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
  .dify-chatbot-window-header {
    background-color: #1C64F2 !important;
    padding: 0.75rem !important;
    color: white !important;
    position: relative !important;
    z-index: 99996 !important;
  }
  
  /* Difyデフォルトの閉じるボタンを非表示 */
  .dify-chatbot-window-close-btn {
    display: none !important;
  }
  
  /* カスタム閉じるボタン */
  .custom-close-button {
    position: absolute !important;
    top: 10px !important;
    right: 10px !important;
    background-color: transparent !important;
    border: none !important;
    color: white !important;
    width: 30px !important;
    height: 30px !important;
    font-size: 20px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    z-index: 2147483650 !important;
  }
  
  .custom-close-button:hover {
    background-color: rgba(255, 255, 255, 0.2) !important;
    border-radius: 50% !important;
  }
  
  /* 入力エリアのスタイリング（共通） */
  .dify-chatbot-window-footer {
    position: sticky !important;
    bottom: 0 !important;
    background-color: white !important;
    padding: 12px !important;
    z-index: 99996 !important;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1) !important;
    margin-top: auto !important;
  }
  
  /* レスポンシブ対応（共通） */
  @media (max-height: 700px) {
    #dify-chatbot-bubble-window,
    #shoukibo-jizoka-chatbot-window,
    #shorikika-chatbot-window {
      top: 20px !important;
      height: calc(100vh - 50px) !important;
    }
  }
  
  /* 青いチャットボタンを非表示 */
  #dify-chatbot-bubble-button,
  #shoukibo-jizoka-chatbot-button,
  #shorikika-chatbot-button {
    display: none !important;
  }
`;
