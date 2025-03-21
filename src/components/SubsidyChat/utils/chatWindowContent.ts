
/**
 * チャットボット用のHTMLコンテンツを作成する関数
 */
export const createChatWindowContent = (title: string, iframeSrc: string) => {
  // iframeのURLが正しいことを確認
  // コードを簡素化し、api.dify.aiを使用
  const safeIframeSrc = iframeSrc.startsWith('https://') 
    ? iframeSrc 
    : `https://api.dify.ai/embed/${iframeSrc}`;
  
  // 完全なHTMLコンテンツを作成
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
        src="${safeIframeSrc}" 
        style="width: 100%; height: 100%; border: none; display: block; position: absolute; top: 0; left: 0; right: 0; bottom: 0;"
        allow="microphone *"
        allowfullscreen="true"
        title="${title}"
        loading="eager"
        frameborder="0"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads"
        referrerpolicy="no-referrer"
      ></iframe>
    </div>
  `;
  return htmlContent;
};

/**
 * Difyのデフォルトボット用に最適化された代替表示を作成する関数
 * Scriptタグ方式で埋め込む場合に使用
 */
export const createScriptBasedChatWindow = (chatbotId: string, title: string) => {
  const containerElement = document.createElement('div');
  containerElement.id = chatbotId;
  containerElement.className = 'dify-chatbot-container';
  containerElement.style.width = '100%';
  containerElement.style.height = '100%';
  containerElement.style.display = 'flex';
  containerElement.style.flexDirection = 'column';
  
  // ヘッダー部分を作成
  const headerElement = document.createElement('div');
  headerElement.className = 'dify-chatbot-bubble-window-header';
  headerElement.style.cssText = `
    background-color: #1C64F2;
    color: white;
    padding: 15px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  `;
  
  // タイトル要素を作成
  const titleElement = document.createElement('div');
  titleElement.className = 'dify-chatbot-bubble-window-title';
  titleElement.style.fontSize = '16px';
  titleElement.textContent = title;
  
  // 閉じるボタンを作成
  const closeButton = document.createElement('button');
  closeButton.className = 'custom-close-button';
  closeButton.setAttribute('aria-label', 'チャットを閉じる');
  closeButton.style.cssText = `
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
  `;
  closeButton.textContent = '×';
  
  // チャットコンテンツのコンテナを作成
  const contentContainer = document.createElement('div');
  contentContainer.className = 'dify-script-window-content';
  contentContainer.style.cssText = `
    flex: 1;
    overflow: hidden;
    position: relative;
    height: calc(100% - 50px);
  `;
  
  // 実際のチャットを表示する内部コンテナ (Scriptタグによって自動生成される要素用)
  const chatContainer = document.createElement('div');
  chatContainer.id = `${chatbotId}-content`;
  chatContainer.style.cssText = `
    width: 100%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `;
  
  // 要素を組み立てる
  contentContainer.appendChild(chatContainer);
  headerElement.appendChild(titleElement);
  headerElement.appendChild(closeButton);
  
  containerElement.appendChild(headerElement);
  containerElement.appendChild(contentContainer);
  
  return containerElement;
};
