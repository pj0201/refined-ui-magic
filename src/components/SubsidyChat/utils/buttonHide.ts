
/**
 * 青いボタンを非表示にする関数
 */
export const hideBlueButton = () => {
  try {
    const style = document.createElement('style');
    style.textContent = `
    /* 青いボタンを完全に非表示 */
    #dify-chatbot-bubble-button,
    .dify-chatbot-bubble-button,
    [id^="dify-chatbot-bubble-button"],
    [class^="dify-chatbot-bubble-button"],
    [id*="dify-chatbot-bubble-button"],
    [class*="chatbot-bubble-button"] {
      display: none !important;
      opacity: 0 !important;
      visibility: hidden !important;
      pointer-events: none !important;
      width: 0 !important;
      height: 0 !important;
      position: absolute !important;
      left: -9999px !important;
      top: -9999px !important;
      z-index: -1 !important;
    }
    
    /* プレーンコードテキストを非表示 */
    #shoukibo-jizoka-chatbot-window > pre,
    #shorikika-chatbot-window > pre,
    #dify-chatbot-bubble-window > pre {
      display: none !important;
    }
    `;
    document.head.appendChild(style);
    console.log("青いボタンを非表示にしました");
  } catch (error) {
    console.error("青いボタンの非表示化中にエラーが発生しました:", error);
  }
};
