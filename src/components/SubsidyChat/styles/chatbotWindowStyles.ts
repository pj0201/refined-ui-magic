
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
  
  /* 閉じるボタン */
  .chatbot-close-button {
    position: fixed !important;
    top: 60px !important; /* チャットウィンドウの上部から少し下に配置 */
    right: 30px !important; /* チャットウィンドウの右端から少し内側に配置 */
    background-color: #1C64F2 !important;
    color: white !important;
    border: none !important;
    border-radius: 20px !important;
    padding: 4px 12px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 12px !important;
    cursor: pointer !important;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2) !important;
    z-index: 2147483648 !important; /* チャットウィンドウよりも前面に */
    opacity: 0 !important;
    visibility: hidden !important;
    transition: opacity 0.3s ease, visibility 0.3s ease !important;
  }
  
  .chatbot-close-button.visible {
    opacity: 1 !important;
    visibility: visible !important;
  }
  
  .chatbot-close-button svg {
    margin-right: 4px !important;
  }
  
  @media (max-height: 700px) {
    #dify-chatbot-bubble-window {
      top: 20px !important;
      height: calc(100vh - 50px) !important; /* 100pxから50pxに変更してより多くの領域を使用 */
    }
    
    .chatbot-close-button {
      top: 30px !important;
    }
  }
`;
