/**
 * Difyチャットボット用のCSSスタイル
 */
export const difyChatStyles = `
  /* チャットボタンのスタイリング */
  #dify-chatbot-bubble-button {
    background-color: #1C64F2 !important;
    bottom: 8rem !important;
    right: 1rem !important;
    z-index: 99995 !important;
    position: fixed !important;
    display: block !important;
    visibility: visible !important;
    opacity: 1 !important;
    width: 48px !important;
    height: 48px !important;
    border-radius: 50% !important;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
    cursor: pointer !important;
  }
  
  /* チャットウィンドウのスタイリング */
  #dify-chatbot-bubble-window {
    width: 24rem !important;
    height: 50rem !important; /* 40remから50remに高さを増加 */
    max-height: 90vh !important; /* 80vhから90vhに最大高さを増加 */
    max-width: calc(100vw - 32px) !important;
    bottom: 2rem !important;
    right: 1rem !important;
    transform: none !important;
    margin-bottom: 0 !important;
    z-index: 99995 !important;
    position: fixed !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    border-radius: 0.5rem !important;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
  }

  /* コンテンツが表示されることを確保 */
  #dify-chatbot-bubble-window iframe {
    flex: 1 !important;
    height: 100% !important;
    width: 100% !important;
  }
  
  /* ヘッダーのスタイリング - 上部の青いバー */
  .dify-chatbot-window-header {
    background-color: #1C64F2 !important;
    padding: 0.75rem !important;
    color: white !important;
    position: relative !important;
    z-index: 99996 !important;
  }
  
  /* 閉じるボタンのスタイリング */
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
  
  /* 入力エリアのスタイリング */
  .dify-chatbot-window-footer {
    position: sticky !important;
    bottom: 0 !important;
    background-color: white !important;
    padding: 12px !important;
    z-index: 99996 !important;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.1) !important;
    margin-top: auto !important;
  }
  
  /* 入力エリアの横にある×ボタン（混乱を招くので非表示） */
  .dify-chatbot-window-footer button[aria-label="Close"] {
    display: none !important;
  }
  
  /* カスタムコンテナでチャットの表示を確保 */
  #dify-chatbot-container {
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 99995;
  }
  
  /* ラベルのスタイリング - 共通スタイル */
  .chatbot-label {
    position: fixed !important;
    background-color: rgba(255, 255, 255, 0.9) !important;
    backdrop-filter: blur(4px) !important;
    padding: 0.375rem 0.75rem !important;
    border-radius: 9999px !important;
    font-size: 0.75rem !important;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
    z-index: 99994 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    border: 1px solid rgba(226, 232, 240, 0.8) !important;
    transition: all 0.2s ease !important;
  }
  
  /* 小規模持続化補助金のラベル */
  .small-subsidy-label {
    bottom: 12rem !important;
    right: 1rem !important;
  }
  
  /* モバイル対応 */
  @media (max-width: 640px) {
    #dify-chatbot-bubble-window {
      width: calc(100vw - 2rem) !important;
      height: 70vh !important;
      max-height: 70vh !important;
    }
    
    .small-subsidy-label {
      bottom: 12rem !important;
      right: 1rem !important;
    }
  }
`;

/**
 * カスタム閉じるボタンのHTMLコード - 白い×アイコン
 */
export const closeButtonSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"></path><path d="M6 6L18 18"></path></svg>`;

/**
 * 小規模持続化補助金ラベルのHTML
 */
export const smallSubsidyLabelHtml = `
<div class="chatbot-label small-subsidy-label">
  <span>小規模持続化補助金</span>
  <span>の質問はコチラ</span>
</div>
`;
