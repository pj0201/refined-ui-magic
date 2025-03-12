
/**
 * Difyチャットボット用のCSSスタイル
 */
export const difyChatStyles = `
  /* Chat button styling */
  #dify-chatbot-bubble-button {
    background-color: #1C64F2 !important;
    bottom: 11rem !important;
    right: 1rem !important;
    z-index: 99995 !important;
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
    z-index: 99995 !important;
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
  
  /* Header styling - blue bar at the top */
  .dify-chatbot-window-header {
    background-color: #1C64F2 !important;
    padding: 0.75rem !important;
    color: white !important;
    position: relative !important;
    z-index: 99996 !important;
  }
  
  /* Close button styling */
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
  
  /* Custom container to ensure chat is displayed */
  #dify-chatbot-container {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 99995;
  }
  
  /* Fix for the input area close button which might confuse users */
  .dify-chatbot-window-footer button[aria-label="Close"] {
    display: none !important;
  }
`;

/**
 * カスタム閉じるボタンのHTMLコード - 白い×アイコン
 */
export const closeButtonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M6 6L18 18"></path></svg>`;

