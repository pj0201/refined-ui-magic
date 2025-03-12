
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
  }

  /* Ensure content is visible */
  #dify-chatbot-bubble-window iframe {
    flex: 1 !important;
    height: 100% !important;
    width: 100% !important;
  }
  
  /* Make close button always visible */
  #dify-chatbot-bubble-window .dify-chatbot-window-close-btn {
    display: flex !important;
    visibility: visible !important;
    opacity: 1 !important;
    position: absolute !important;
    top: 10px !important;
    right: 10px !important;
    z-index: 9999 !important;
    width: 30px !important;
    height: 30px !important;
    color: white !important;
    background: rgba(0, 0, 0, 0.5) !important;
    border-radius: 50% !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3) !important;
    border: 2px solid white !important;
  }
  
  /* Add a custom close button if the default is hidden */
  .custom-dify-close-btn {
    position: absolute !important;
    top: 10px !important;
    right: 10px !important;
    z-index: 9999 !important;
    width: 30px !important;
    height: 30px !important;
    color: white !important;
    background: rgba(0, 0, 0, 0.5) !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    border: 2px solid white !important;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3) !important;
  }

  /* Add container to ensure chat is displayed */
  #dify-chatbot-container {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 1000;
  }
`;

/**
 * カスタム閉じるボタンのHTMLコード
 */
export const closeButtonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
