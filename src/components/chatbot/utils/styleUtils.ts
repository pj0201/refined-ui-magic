export const initializeChatbotStyles = () => {
  // スタイルが既に追加されている場合は何もしない
  if (document.getElementById('chatbot-styles')) {
    return;
  }
  
  const style = document.createElement('style');
  style.id = 'chatbot-styles';
  style.textContent = `
    /* チャットボットウィンドウのスタイル */
    .chatbot-window {
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
    }
    
    .chatbot-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 15px 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      font-size: 16px;
    }
    
    .chatbot-close {
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
    }
    
    .chatbot-close:hover {
      background-color: rgba(255,255,255,0.2);
    }
    
    @media (max-width: 768px) {
      .chatbot-window {
        width: 350px;
        height: 500px;
      }
    }
    
    @media (max-width: 480px) {
      .chatbot-window {
        width: 300px;
        height: 450px;
        bottom: 10px;
        right: 10px;
      }
    }
  `;
  
  document.head.appendChild(style);
};