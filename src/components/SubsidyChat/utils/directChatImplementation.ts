
/**
 * Dify APIが読み込めない場合の代替チャット実装
 */
import { supabase } from "@/integrations/supabase/client";

// チャットウィンドウの状態
let isChatWindowOpen = false;
let chatHistory: {role: string, content: string}[] = [];

/**
 * チャットウィンドウを直接実装
 */
export const createDirectChatWindow = (): void => {
  // 既存のウィンドウを削除
  removeChatWindow();
  
  // チャットウィンドウを作成
  const chatWindow = document.createElement('div');
  chatWindow.id = 'direct-chat-window';
  chatWindow.className = 'direct-chat-window';
  chatWindow.style.display = 'none';
  
  // ヘッダー
  const header = document.createElement('div');
  header.className = 'direct-chat-header';
  
  const title = document.createElement('div');
  title.className = 'direct-chat-title';
  title.textContent = '補助金チャットアシスタント';
  
  const closeButton = document.createElement('button');
  closeButton.className = 'direct-chat-close-button';
  closeButton.innerHTML = '&times;';
  closeButton.onclick = toggleChatWindow;
  
  header.appendChild(title);
  header.appendChild(closeButton);
  
  // メッセージエリア
  const messagesArea = document.createElement('div');
  messagesArea.id = 'direct-chat-messages';
  messagesArea.className = 'direct-chat-messages';
  
  // 初期メッセージ
  const welcomeMessage = document.createElement('div');
  welcomeMessage.className = 'direct-chat-message assistant';
  welcomeMessage.textContent = 'こんにちは！補助金についてお気軽にご質問ください。';
  messagesArea.appendChild(welcomeMessage);
  
  // 入力エリア
  const inputArea = document.createElement('div');
  inputArea.className = 'direct-chat-input-area';
  
  const input = document.createElement('textarea');
  input.id = 'direct-chat-input';
  input.className = 'direct-chat-input';
  input.placeholder = 'メッセージを入力...';
  input.rows = 1;
  input.onkeydown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendDirectMessage();
    }
  };
  
  const sendButton = document.createElement('button');
  sendButton.className = 'direct-chat-send-button';
  sendButton.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  sendButton.onclick = sendDirectMessage;
  
  inputArea.appendChild(input);
  inputArea.appendChild(sendButton);
  
  // ウィンドウに要素を追加
  chatWindow.appendChild(header);
  chatWindow.appendChild(messagesArea);
  chatWindow.appendChild(inputArea);
  
  // スタイルを追加
  addDirectChatStyles();
  
  // ボディに追加
  document.body.appendChild(chatWindow);
};

/**
 * チャットウィンドウの表示/非表示を切り替え
 */
export const toggleChatWindow = (): void => {
  const chatWindow = document.getElementById('direct-chat-window');
  if (!chatWindow) {
    createDirectChatWindow();
    isChatWindowOpen = true;
  } else {
    isChatWindowOpen = !isChatWindowOpen;
  }
  
  if (chatWindow) {
    chatWindow.style.display = isChatWindowOpen ? 'flex' : 'none';
  }
};

/**
 * チャットウィンドウを表示
 */
export const showChatWindow = (): void => {
  if (!isChatWindowOpen) {
    toggleChatWindow();
  }
};

/**
 * メッセージを送信
 */
const sendDirectMessage = async (): Promise<void> => {
  const input = document.getElementById('direct-chat-input') as HTMLTextAreaElement;
  const message = input.value.trim();
  
  if (!message) return;
  
  // 入力をクリア
  input.value = '';
  
  // ユーザーメッセージを表示
  addMessageToChat('user', message);
  
  // チャット履歴に追加
  chatHistory.push({ role: 'user', content: message });
  
  try {
    // ローディングメッセージを表示
    const loadingId = addLoadingMessage();
    
    // Supabase Function を呼び出す
    const { data, error } = await supabase.functions.invoke('chat', {
      body: { question: message }
    });
    
    // ローディングメッセージを削除
    removeLoadingMessage(loadingId);
    
    if (error) {
      console.error('Chat function error:', error);
      addMessageToChat('assistant', 'すみません、エラーが発生しました。しばらくしてからもう一度お試しください。');
      return;
    }
    
    // アシスタントの回答を表示
    const response = data.choices[0].message.content;
    addMessageToChat('assistant', response);
    
    // チャット履歴に追加
    chatHistory.push({ role: 'assistant', content: response });
    
    // 関連リンクがあれば表示
    if (data.relevantUrls && data.relevantUrls.length > 0) {
      let linksHtml = '<div class="related-links"><p>関連リンク:</p><ul>';
      data.relevantUrls.forEach((item: {url: string, imageUrl?: string}) => {
        linksHtml += `<li><a href="${item.url}" target="_blank">${item.url}</a></li>`;
      });
      linksHtml += '</ul></div>';
      
      const messagesArea = document.getElementById('direct-chat-messages');
      if (messagesArea) {
        const linksElement = document.createElement('div');
        linksElement.className = 'direct-chat-message links';
        linksElement.innerHTML = linksHtml;
        messagesArea.appendChild(linksElement);
        messagesArea.scrollTop = messagesArea.scrollHeight;
      }
    }
  } catch (err) {
    console.error('Failed to send message:', err);
    addMessageToChat('assistant', 'すみません、エラーが発生しました。しばらくしてからもう一度お試しください。');
  }
};

/**
 * メッセージをチャットに追加
 */
const addMessageToChat = (role: 'user' | 'assistant', content: string): void => {
  const messagesArea = document.getElementById('direct-chat-messages');
  if (!messagesArea) return;
  
  const messageElement = document.createElement('div');
  messageElement.className = `direct-chat-message ${role}`;
  
  // メッセージ内容をエスケープしてHTMLタグを展開（マークダウンなどの対応も可能）
  const formattedContent = content
    .replace(/\n/g, '<br>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  messageElement.innerHTML = formattedContent;
  messagesArea.appendChild(messageElement);
  messagesArea.scrollTop = messagesArea.scrollHeight;
};

/**
 * ローディングメッセージを追加
 */
const addLoadingMessage = (): string => {
  const messagesArea = document.getElementById('direct-chat-messages');
  if (!messagesArea) return '';
  
  const loadingId = 'loading-' + Date.now();
  const loadingElement = document.createElement('div');
  loadingElement.id = loadingId;
  loadingElement.className = 'direct-chat-message assistant loading';
  loadingElement.innerHTML = '考え中<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span>';
  
  messagesArea.appendChild(loadingElement);
  messagesArea.scrollTop = messagesArea.scrollHeight;
  
  return loadingId;
};

/**
 * ローディングメッセージを削除
 */
const removeLoadingMessage = (id: string): void => {
  const loadingElement = document.getElementById(id);
  if (loadingElement) {
    loadingElement.remove();
  }
};

/**
 * チャットウィンドウを削除
 */
const removeChatWindow = (): void => {
  const chatWindow = document.getElementById('direct-chat-window');
  if (chatWindow) {
    chatWindow.remove();
  }
};

/**
 * スタイルを追加
 */
const addDirectChatStyles = (): void => {
  const styleId = 'direct-chat-styles';
  
  // 既存のスタイルを削除
  const existingStyle = document.getElementById(styleId);
  if (existingStyle) {
    existingStyle.remove();
  }
  
  // スタイルを作成
  const style = document.createElement('style');
  style.id = styleId;
  style.textContent = `
    .direct-chat-window {
      position: fixed;
      bottom: auto;
      top: 50px;
      right: 20px;
      width: 380px;
      height: 600px;
      max-height: 80vh;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      display: flex;
      flex-direction: column;
      z-index: 2147483647;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    
    .direct-chat-header {
      padding: 15px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #1C64F2;
      color: white;
      border-radius: 10px 10px 0 0;
    }
    
    .direct-chat-title {
      font-weight: bold;
      font-size: 16px;
    }
    
    .direct-chat-close-button {
      background: none;
      border: none;
      color: white;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      margin: 0;
      line-height: 1;
    }
    
    .direct-chat-messages {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    
    .direct-chat-message {
      max-width: 80%;
      padding: 10px 15px;
      border-radius: 10px;
      word-break: break-word;
      line-height: 1.4;
    }
    
    .direct-chat-message.user {
      align-self: flex-end;
      background-color: #1C64F2;
      color: white;
    }
    
    .direct-chat-message.assistant {
      align-self: flex-start;
      background-color: #f0f0f0;
      color: #333;
    }
    
    .direct-chat-message.links {
      align-self: center;
      background-color: #f8f8f8;
      width: 90%;
      font-size: 0.9em;
    }
    
    .direct-chat-message.loading {
      color: #888;
    }
    
    @keyframes blink {
      0% { opacity: 0.2; }
      20% { opacity: 1; }
      100% { opacity: 0.2; }
    }
    
    .loading .dot-1 {
      animation: blink 1.4s infinite;
      animation-delay: 0s;
    }
    
    .loading .dot-2 {
      animation: blink 1.4s infinite;
      animation-delay: 0.2s;
    }
    
    .loading .dot-3 {
      animation: blink 1.4s infinite;
      animation-delay: 0.4s;
    }
    
    .direct-chat-input-area {
      display: flex;
      padding: 15px;
      border-top: 1px solid #e0e0e0;
      background-color: #f8f8f8;
      border-radius: 0 0 10px 10px;
    }
    
    .direct-chat-input {
      flex: 1;
      padding: 10px 15px;
      border: 1px solid #ddd;
      border-radius: 20px;
      resize: none;
      outline: none;
      font-family: inherit;
      max-height: 100px;
      overflow-y: auto;
    }
    
    .direct-chat-send-button {
      margin-left: 10px;
      background-color: #1C64F2;
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    
    .related-links {
      font-size: 0.9em;
      margin-top: 10px;
    }
    
    .related-links p {
      margin: 0 0 5px 0;
      font-weight: bold;
    }
    
    .related-links ul {
      margin: 0;
      padding-left: 20px;
    }
    
    .related-links a {
      color: #1C64F2;
      text-decoration: none;
    }
    
    .related-links a:hover {
      text-decoration: underline;
    }
    
    @media (max-width: 480px) {
      .direct-chat-window {
        width: 90%;
        right: 5%;
        left: 5%;
      }
    }
    
    @media (max-height: 700px) {
      .direct-chat-window {
        top: 20px;
        height: calc(100vh - 100px);
      }
    }
  `;
  
  document.head.appendChild(style);
};

/**
 * チャットボットに直接メッセージを送信
 */
export const sendDirectChatMessage = (message: string): void => {
  // チャットウィンドウを表示
  showChatWindow();
  
  // 少し遅延させてから入力を設定
  setTimeout(() => {
    const input = document.getElementById('direct-chat-input') as HTMLTextAreaElement;
    if (input) {
      input.value = message;
      // 送信ボタンをプログラムからクリック
      const sendButton = document.querySelector('.direct-chat-send-button') as HTMLButtonElement;
      if (sendButton) {
        sendButton.click();
      }
    }
  }, 500);
};
