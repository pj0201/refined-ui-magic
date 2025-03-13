
/**
 * チャットボットウィンドウのスタイル定義
 */
export const getChatbotWindowStyles = (): string => `
  #dify-chatbot-bubble-button {
    background-color: #1C64F2 !important; /* ブランドカラー */
  }
  #dify-chatbot-bubble-window {
    width: 24rem !important;
    height: 40rem !important;
    max-height: 80vh !important;
    position: fixed !important;
    bottom: auto !important;
    top: 50px !important;
    right: 20px !important;
    z-index: 2147483647 !important;
  }
  @media (max-height: 700px) {
    #dify-chatbot-bubble-window {
      top: 20px !important;
      height: calc(100vh - 100px) !important;
    }
  }
`;
