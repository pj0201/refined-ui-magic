
/**
 * Difyチャットボット用のCSSスタイル - より強力に適用するよう修正
 */
export const difyChatStyles = `
  /* Chat button styling - より強力なCSSセレクタを使用 */
  #dify-chatbot-bubble-button {
    background-color: #1C64F2 !important;
    bottom: 11rem !important;
    right: 1rem !important;
    z-index: 9995 !important;
    position: fixed !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 48px !important;
    height: 48px !important;
    border-radius: 50% !important;
    cursor: pointer !important;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
    color: white !important;
    font-size: 24px !important;
    border: none !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
  
  /* Chat window styling - より具体的な指定 */
  #dify-chatbot-bubble-window {
    width: 350px !important;
    height: 500px !important;
    max-height: 80vh !important;
    max-width: calc(100vw - 32px) !important;
    bottom: 5rem !important;
    right: 1rem !important;
    transform: none !important;
    margin-bottom: 0 !important;
    z-index: 9995 !important;
    position: fixed !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
    background-color: white !important;
  }

  /* チャットウィンドウ内部のコンテンツ */
  #dify-chatbot-bubble-window iframe {
    flex: 1 !important;
    height: 100% !important;
    width: 100% !important;
    border: none !important;
  }
  
  /* 閉じるボタンのスタイル - より目立つように */
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
  
  /* カスタム閉じるボタン */
  .custom-dify-close-btn, .dify-custom-close-btn {
    position: absolute !important;
    top: 0.75rem !important;
    right: 0.75rem !important;
    z-index: 9999 !important;
    width: 2rem !important;
    height: 2rem !important;
    background: #ffffff !important;
    border: 1px solid #e2e8f0 !important;
    border-radius: 9999px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    cursor: pointer !important;
  }

  /* iframeでも閉じるボタンを表示するためのCSS */
  iframe#dify-chatbot-bubble-window-iframe {
    position: relative !important;
  }

  /* Difyコンテナの確保 */
  #dify-chatbot-container {
    position: fixed !important;
    bottom: 0 !important;
    right: 0 !important;
    z-index: 9990 !important;
    pointer-events: none !important;
  }
  #dify-chatbot-container * {
    pointer-events: auto !important;
  }
  
  /* より確実にチャットウィンドウを表示 */
  #dify-chatbot-bubble-window.active {
    display: flex !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  
  /* ラベルのスタイリング */
  .chatbot-label {
    position: fixed !important;
    background-color: rgba(255, 255, 255, 0.9) !important;
    padding: 0.375rem 0.75rem !important;
    border-radius: 9999px !important;
    font-size: 0.75rem !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
    z-index: 1000 !important;
    backdrop-filter: blur(4px) !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    border: 1px solid rgba(226, 232, 240, 0.8) !important;
    transition: all 0.2s ease !important;
  }
  
  .small-subsidy-label {
    bottom: 15rem !important;
    right: 1rem !important;
    z-index: 1000 !important;
  }
`;

/**
 * カスタム閉じるボタンのHTMLコード - より目立つアイコン
 */
export const closeButtonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M6 6L18 18"></path></svg>`;
