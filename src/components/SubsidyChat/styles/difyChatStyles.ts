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
  
  /* Close button styling */
  .dify-chatbot-window-close-btn {
    position: absolute !important;
    top: 0.75rem !important;
    right: 0.75rem !important;
    width: 2rem !important;
    height: 2rem !important;
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 9999px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    z-index: 9999 !important;
    transition: background-color 0.2s !important;
  }

  .dify-chatbot-window-close-btn:hover {
    background: #f7fafc !important;
  }

  .dify-chatbot-window-close-btn svg {
    width: 1.25rem !important;
    height: 1.25rem !important;
    color: #4a5568 !important;
  }
  
  /* Add a custom close button if the default is hidden */
  .custom-dify-close-btn {
    position: absolute !important;
    top: 10px !important;
    right: 10px !important;
    z-index: 9999 !important;
    width: 24px !important;
    height: 24px !important;
    color: #666 !important;
    background: rgba(255, 255, 255, 0.8) !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
    border: none !important;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
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
export const closeButtonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M6 6L18 18"></path></svg>`;
