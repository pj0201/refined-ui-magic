
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
  @media (max-height: 700px) {
    #dify-chatbot-bubble-window {
      top: 20px !important;
      height: calc(100vh - 50px) !important; /* 100pxから50pxに変更してより多くの領域を使用 */
    }
  }
`;
