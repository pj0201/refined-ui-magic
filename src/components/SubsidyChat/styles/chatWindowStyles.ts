
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
  
  /* 閉じるボタンのスタイリング（共通） */
  .dify-chatbot-window-close-btn {
    position: absolute !important;
    top: 10px !important;
    right: 10px !important;
    width: 24px !important;
    height: 24px !important;
    background: transparent !important;
    border: none !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    z-index: 99999 !important;
    visibility: visible !important;
    opacity: 1 !important;
  }

  .dify-chatbot-window-close-btn:hover {
    background: rgba(255, 255, 255, 0.2) !important;
  }

  .dify-chatbot-window-close-btn svg {
    width: 18px !important;
    height: 18px !important;
    color: white !important;
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
  
  /* チャットボタンのスタイル */
  #dify-chatbot-bubble-button,
  #shoukibo-jizoka-chatbot-button,
  #shorikika-chatbot-button {
    background-color: #1C64F2 !important;
    z-index: 99999 !important;
    width: 48px !important;
    height: 48px !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    border: none !important;
    transition: transform 0.2s, background-color 0.2s !important;
  }
  
  #dify-chatbot-bubble-button:hover,
  #shoukibo-jizoka-chatbot-button:hover,
  #shorikika-chatbot-button:hover {
    transform: scale(1.05) !important;
    background-color: #1651c4 !important;
  }
`;
