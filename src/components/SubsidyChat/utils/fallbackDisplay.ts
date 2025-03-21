
/**
 * チャットボットのフォールバック表示を作成する関数
 */
export const createFallbackDisplay = (windowId: string, title: string) => {
  const container = document.createElement('div');
  container.className = 'chatbot-fallback-container';
  container.style.cssText = `
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;
    background-color: #f9fafb;
  `;
  
  // フォールバックコンテンツを作成
  container.innerHTML = `
    <h3 style="margin-bottom: 1rem; font-weight: bold; color: #1a202c;">${title}</h3>
    <p style="margin-bottom: 1rem; color: #4a5568;">
      チャットボットサーバーに接続できません。<br>
      ネットワーク接続を確認し、しばらく待ってから再度お試しください。
    </p>
    <button class="fallback-retry-button" style="
      background-color: #1C64F2;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 0.25rem;
      font-weight: medium;
      cursor: pointer;
      margin-top: 1rem;
      transition: background-color 0.2s;
    ">もう一度試す</button>
  `;
  
  // イベントリスナーを追加
  setTimeout(() => {
    const retryButton = container.querySelector('.fallback-retry-button');
    if (retryButton) {
      retryButton.addEventListener('click', () => {
        const chatWindow = document.getElementById(windowId);
        if (chatWindow) {
          // ウィンドウをいったん削除
          chatWindow.remove();
          
          // 対応するチャットボットを再起動
          if (windowId === 'shoukibo-jizoka-chatbot-window' && window.startShoukiboJizokaChat) {
            window.startShoukiboJizokaChat();
          } else if (windowId === 'shorikika-chatbot-window' && window.startShorikikaChat) {
            window.startShorikikaChat();
          }
        }
      });
    }
  }, 100);
  
  return container;
};
