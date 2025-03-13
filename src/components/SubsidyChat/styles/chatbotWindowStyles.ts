
/**
 * チャットボットウィンドウのスタイル定義
 */
export const getChatbotWindowStyles = (): string => `
  #dify-chatbot-bubble-button {
    background-color: #1C64F2 !important; /* ブランドカラー */
  }
  
  #dify-chatbot-bubble-window {
    width: 24rem !important;
    height: 50rem !important; /* 40remから50remに高さを増加 */
    max-height: 90vh !important; /* 80vhから90vhに最大高さを増加 */
    position: fixed !important;
    bottom: auto !important;
    top: 50px !important;
    right: 20px !important;
    z-index: 2147483647 !important;
  }
  
  /* チャットウィンドウ内閉じるボタン */
  .chat-window-close-button {
    position: absolute !important;
    top: 10px !important;
    right: 10px !important;
    background-color: transparent !important;
    color: #1C64F2 !important;
    border: none !important;
    border-radius: 50% !important;
    width: 30px !important;
    height: 30px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    z-index: 2147483649 !important; /* チャットウィンドウよりも前面に */
    opacity: 1 !important;
    transition: background-color 0.2s ease !important;
  }
  
  .chat-window-close-button:hover {
    background-color: rgba(0, 0, 0, 0.05) !important;
  }
  
  @media (max-height: 700px) {
    #dify-chatbot-bubble-window {
      top: 20px !important;
      height: calc(100vh - 50px) !important; /* 100pxから50pxに変更してより多くの領域を使用 */
    }
  }
`;
