
/**
 * 青いデフォルトのチャットボタンを非表示にする関数
 */
export const hideBlueButton = () => {
  try {
    // スタイルを追加して青いボタンを非表示にする
    const style = document.createElement('style');
    style.textContent = `
      /* 青いボタンを非表示にする */
      .dify-chatbot-bubble-button,
      #dify-chatbot-bubble-button,
      [id^="dify-chatbot-bubble-button"],
      [class^="dify-chatbot-bubble-button"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
    console.log("青いボタンを非表示にしました");
  } catch (error) {
    console.error("青いボタンの非表示処理中にエラーが発生しました:", error);
  }
};
