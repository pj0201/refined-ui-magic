
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
    top: 80px !important;
  }

  #dify-chatbot-bubble-button-2 {
    top: 180px !important;
  }

  .dify-chatbot-label {
    position: fixed !important;
    color: #22C55E !important;
    font-size: 13px !important;
    text-align: right !important;
    letter-spacing: 0 !important;
    line-height: 36px !important;
    white-space: nowrap !important;
    right: 65px !important;
    z-index: 2147483646 !important;
    font-weight: normal !important;
    text-shadow: 0 0 1px rgba(0,0,0,0.2) !important;
    transition: color 0.3s ease !important;
    height: 36px !important;
    display: flex !important;
    align-items: center !important;
    transform: none !important;
    writing-mode: horizontal-tb !important;
  }

  .dify-chatbot-label:hover {
    color: #4ADE80 !important;
  }

  #dify-chatbot-label-1 {
    top: 80px !important;
  }

  #dify-chatbot-label-2 {
    top: 180px !important;
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
