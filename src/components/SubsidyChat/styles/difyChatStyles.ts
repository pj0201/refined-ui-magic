/**
 * Difyチャットボット用のCSSスタイル
 */
export const difyChatStyles = `
  /* Chat button styling */
  #dify-chatbot-bubble-button {
    background-color: #1C64F2 !important;
    bottom: 11rem !important;
    right: 1rem !important;
    z-index: 1000 !important;
    position: fixed !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 48px !important;
    height: 48px !important;
    border-radius: 50% !important;
    cursor: pointer !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2) !important;
  }
  
  /* Chat window styling */
  #dify-chatbot-bubble-window {
    width: 24rem !important;
    height: 40rem !important;
    max-height: 80vh !important;
    max-width: calc(100vw - 32px) !important;
    bottom: 5rem !important;
    right: 1rem !important;
    transform: none !important;
    margin-bottom: 0 !important;
    z-index: 1001 !important;
    position: fixed !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15) !important;
    background: white !important;
  }

  /* Ensure content is visible */
  #dify-chatbot-bubble-window iframe {
    flex: 1 !important;
    height: 100% !important;
    width: 100% !important;
    border: none !important;
  }
  
  /* Close button styling */
  .dify-chatbot-window-close-btn {
    position: absolute !important;
    top: 10px !important;
    right: 10px !important;
    z-index: 9999 !important;
    width: 30px !important;
    height: 30px !important;
    color: white !important;
    background: rgba(0, 0, 0, 0.7) !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    border: 2px solid white !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3) !important;
    padding: 0 !important;
    margin: 0 !important;
    transition: all 0.2s ease !important;
  }

  .dify-chatbot-window-close-btn:hover {
    background: rgba(0, 0, 0, 0.9) !important;
    transform: scale(1.1) !important;
  }

  /* Container styling */
  #dify-chatbot-container {
    position: fixed !important;
    bottom: 0 !important;
    right: 0 !important;
    z-index: 1000 !important;
  }
`;

/**
 * カスタム閉じるボタンのHTMLコード
 */
export const closeButtonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
