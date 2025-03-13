
/**
 * チャットボットのスタイル定義
 */
export const getChatbotStyles = (): string => `
  .chatbot-elements-container {
    position: fixed !important;
    right: 20px !important;
    top: 20px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 20px !important;
    z-index: 2147483646 !important;
  }

  .dify-chatbot-bubble-button {
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
    position: relative !important;
    margin-left: auto !important; /* Keep it on the right side */
  }

  .dify-chatbot-label {
    color: #22C55E !important;
    font-size: 13px !important;
    text-align: center !important;
    letter-spacing: 1px !important;
    line-height: 1.2 !important;
    white-space: nowrap !important;
    z-index: 2147483646 !important;
    font-weight: normal !important;
    text-shadow: 0 0 1px rgba(0,0,0,0.2) !important;
    transition: color 0.3s ease !important;
    width: 36px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    writing-mode: vertical-rl !important; /* 縦書き */
    text-orientation: upright !important;
    background-color: rgba(255, 255, 255, 0.9) !important;
    padding: 12px 0 !important;
    border-radius: 18px !important;
    position: relative !important;
    margin-left: auto !important; /* Keep it on the right side */
  }

  .dify-chatbot-label:hover {
    color: #4ADE80 !important;
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
