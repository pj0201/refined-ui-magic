
/**
 * Difyのブランディングを非表示にする関数
 */
export const hideDifyBranding = () => {
  try {
    const style = document.createElement('style');
    style.textContent = `
      /* Difyのブランディング要素を非表示 */
      .dify-chatbot-bubble-window-footer,
      [class*="dify"] [class*="footer"],
      [class*="powered-by"],
      a[href*="dify.ai"],
      [class*="footer-powered"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        height: 0 !important;
        width: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);
    console.log("Difyのブランディングを非表示にしました");
  } catch (error) {
    console.error("Difyブランディングの非表示処理中にエラーが発生しました:", error);
  }
};
