
/**
 * ラベルのスタイル定義
 */
export const getLabelStyles = (): string => `
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
  
  @media (max-width: 640px) {
    .small-subsidy-label {
      bottom: 12rem !important;
      right: 1rem !important;
    }
  }
`;

/**
 * 小規模持続化補助金ラベルのHTML
 */
export const smallSubsidyLabelHtml = `
<div class="chatbot-label small-subsidy-label">
  <span>小規模持続化補助金</span>
  <span>の質問はコチラ</span>
</div>
`;
