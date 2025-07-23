interface ChatbotConfig {
  chatbotId: string;
  title: string;
  token: string;
}

export const createScriptBasedChatWindow = (config: ChatbotConfig) => {
  const { chatbotId, title, token } = config;
  
  console.log(`createScriptBasedChatWindow: ${chatbotId} の作成を開始`);
  
  // 既存のチャットボットがあれば削除
  const existingWindow = document.getElementById(chatbotId);
  if (existingWindow) {
    existingWindow.remove();
  }
  
  // チャットボットコンテナを作成
  const chatContainer = document.createElement('div');
  chatContainer.id = chatbotId;
  chatContainer.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 400px;
    height: 600px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 1000;
    display: none;
    flex-direction: column;
    overflow: hidden;
  `;
  
  // ヘッダーを作成
  const header = document.createElement('div');
  header.style.cssText = `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    font-size: 16px;
  `;
  
  const titleElement = document.createElement('div');
  titleElement.textContent = title;
  
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  closeButton.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.2s;
  `;
  
  closeButton.onclick = () => {
    chatContainer.style.display = 'none';
  };
  
  header.appendChild(titleElement);
  header.appendChild(closeButton);
  
  // iframe を作成
  const iframe = document.createElement('iframe');
  iframe.src = `https://udify.app/chatbot/${token}`;
  iframe.style.cssText = `
    flex: 1;
    border: none;
    width: 100%;
    height: 100%;
  `;
  
  // 要素を組み立て
  chatContainer.appendChild(header);
  chatContainer.appendChild(iframe);
  
  // ドキュメントに追加
  document.body.appendChild(chatContainer);
  
  // グローバル関数として登録
  if (chatbotId === 'shoukibo-jizoka-chatbot-window') {
    window.openSmallBusinessChatbot = () => {
      chatContainer.style.display = 'flex';
    };
    window.openShoukiboJizokaChat = window.openSmallBusinessChatbot;
  } else if (chatbotId === 'shorikika-chatbot-window') {
    window.openSubsidyChatbot = () => {
      chatContainer.style.display = 'flex';
    };
    window.openShorikikaChat = window.openSubsidyChatbot;
  }
  
  console.log(`createScriptBasedChatWindow: ${chatbotId} の作成が完了`);
};