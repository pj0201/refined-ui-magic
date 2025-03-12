
/**
 * チャットボットのスタイル定義
 */
export const getChatbotStyles = (): string => `
  .dify-chatbot-bubble-button {
    position: fixed !important;
    width: 36px !important;
    height: 36px !important;
    border-radius: 50% !important;
    background-color: #1C64F2 !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
    border: none !important;
    cursor: pointer !important;
    z-index: 2147483647 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    opacity: 1 !important;
    visibility: visible !important;
    right: 20px !important;
  }

  #dify-chatbot-bubble-button-1 {
    top: 260px !important;
  }

  #dify-chatbot-bubble-button-2 {
    top: 536px !important;
  }

  .dify-chatbot-label {
    position: fixed !important;
    background-color: white !important;
    border-radius: 8px !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
    padding: 12px 8px !important;
    width: 90px !important;
    font-size: 12px !important;
    text-align: center !important;
    writing-mode: vertical-rl !important;
    text-orientation: upright !important;
    letter-spacing: 2px !important;
    line-height: 1.6 !important;
    white-space: nowrap !important;
    right: 20px !important;
    z-index: 2147483647 !important;
    color: #000000 !important;
    font-weight: normal !important;
  }

  #dify-chatbot-label-1 {
    top: 40px !important;
    height: 200px !important;
  }

  #dify-chatbot-label-2 {
    top: 316px !important;
    height: 200px !important;
  }

  #dify-chatbot-bubble-window {
    position: fixed !important;
    bottom: 100px !important;
    right: 20px !important;
    width: 380px !important;
    height: 600px !important;
    max-height: 80vh !important;
    border-radius: 12px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
    z-index: 2147483647 !important;
    overflow: hidden !important;
  }
`;
