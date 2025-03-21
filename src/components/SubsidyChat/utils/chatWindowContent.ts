
/**
 * チャットボット用のHTMLコンテンツを作成する関数
 */
export const createChatWindowContent = (title: string, iframeSrc: string) => {
  const htmlContent = `
    <div class="dify-chatbot-bubble-window-header" style="
      background-color: #1C64F2;
      color: white;
      padding: 15px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    ">
      <div class="dify-chatbot-bubble-window-title" style="font-size: 16px;">${title}</div>
      <button class="custom-close-button" aria-label="チャットを閉じる" style="
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        width: 30px !important;
        height: 30px !important;
        border-radius: 50% !important;
        background-color: rgba(255, 255, 255, 0.2) !important;
        border: none !important;
        color: white !important;
        font-size: 18px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        z-index: 10000 !important;
      ">×</button>
    </div>
    <div class="dify-chatbot-bubble-window-content" style="
      flex: 1;
      overflow: hidden;
      position: relative;
      height: calc(100% - 50px);
    ">
      <iframe 
        src="${iframeSrc}" 
        style="width: 100%; height: 100%; border: none; display: block; position: absolute; top: 0; left: 0; right: 0; bottom: 0;"
        allow="microphone"
        title="${title}"
        loading="eager"
        frameborder="0"
      ></iframe>
    </div>
  `;
  return htmlContent;
};
