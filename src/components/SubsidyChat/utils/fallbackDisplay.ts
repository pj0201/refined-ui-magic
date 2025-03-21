
/**
 * チャットボットのフォールバック表示を作成する関数
 * チャットボットのロードに失敗した場合に表示するフォールバックUI
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
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem;">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    <h3 style="margin-bottom: 1rem; font-weight: bold; color: #1a202c;">${title}</h3>
    <p style="margin-bottom: 1rem; color: #4a5568;">
      現在、チャットボットサーバーに接続できません。<br>
      ネットワーク接続を確認し、しばらく待ってから再度お試しください。
    </p>
    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <button class="fallback-retry-button" style="
        background-color: #1C64F2;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-weight: medium;
        cursor: pointer;
        transition: background-color 0.2s;
      ">もう一度試す</button>
      <button class="fallback-close-button" style="
        background-color: transparent;
        color: #4a5568;
        border: 1px solid #d1d5db;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        font-weight: medium;
        cursor: pointer;
        transition: background-color 0.2s;
      ">閉じる</button>
    </div>
  `;
  
  // イベントリスナーを追加
  setTimeout(() => {
    const retryButton = container.querySelector('.fallback-retry-button');
    if (retryButton) {
      retryButton.addEventListener('click', () => {
        const chatWindow = document.getElementById(windowId) || document.getElementById('mock-chat-window');
        if (chatWindow) {
          // ウィンドウをいったん閉じる
          chatWindow.style.display = 'none';
          
          // 更新を試みる - 対応するチャットボットを再起動
          if (windowId === 'shoukibo-jizoka-chatbot-window' && window.startShoukiboJizokaChat) {
            window.startShoukiboJizokaChat();
          } else if (windowId === 'shorikika-chatbot-window' && window.startShorikikaChat) {
            window.startShorikikaChat();
          } else {
            // スクリプトを再読み込み
            reloadChatbotScript(windowId);
          }
        }
      });
    }
    
    const closeButton = container.querySelector('.fallback-close-button');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        const chatWindow = document.getElementById(windowId) || document.getElementById('mock-chat-window');
        if (chatWindow) {
          chatWindow.style.display = 'none';
        }
      });
    }
  }, 100);
  
  return container;
};

/**
 * チャットボットスクリプトを再読み込みする関数
 */
const reloadChatbotScript = (windowId: string) => {
  try {
    const scriptId = windowId === 'shoukibo-jizoka-chatbot-window' ? 'shoukibo-jizoka-chatbot' : 'shorikika-chatbot';
    const oldScript = document.getElementById(scriptId);
    
    if (oldScript) {
      // 古いスクリプトを削除
      oldScript.remove();
      
      // 新しいスクリプトを作成
      const newScript = document.createElement('script');
      newScript.id = scriptId;
      newScript.src = 'https://unpkg.com/@dify-ai/chatbot@0.1.25/dist/index.min.js';
      newScript.setAttribute('crossorigin', 'anonymous');
      newScript.setAttribute('referrerpolicy', 'no-referrer');
      
      if (windowId === 'shoukibo-jizoka-chatbot-window') {
        newScript.setAttribute('data-chat-name', '小規模持続化補助金AI相談');
        newScript.setAttribute('data-element-id', 'shoukibo-jizoka-chatbot');
        newScript.setAttribute('data-window-id', 'shoukibo-jizoka-chatbot-window');
        newScript.setAttribute('data-button-id', 'shoukibo-jizoka-chatbot-button');
      } else {
        newScript.setAttribute('data-chat-name', '省力化投資補助金AI相談');
        newScript.setAttribute('data-element-id', 'shorikika-chatbot');
        newScript.setAttribute('data-window-id', 'shorikika-chatbot-window');
        newScript.setAttribute('data-button-id', 'shorikika-chatbot-button');
      }
      
      newScript.async = true;
      newScript.defer = true;
      
      // イベントハンドラを追加
      newScript.onload = () => {
        console.log(`${scriptId}スクリプトが再読み込みされました`);
        // 対応するチャットボットを再起動
        setTimeout(() => {
          if (windowId === 'shoukibo-jizoka-chatbot-window' && window.startShoukiboJizokaChat) {
            window.startShoukiboJizokaChat();
          } else if (windowId === 'shorikika-chatbot-window' && window.startShorikikaChat) {
            window.startShorikikaChat();
          }
        }, 500);
      };
      
      newScript.onerror = () => {
        console.error(`${scriptId}スクリプトの再読み込みに失敗しました`);
        // 対応するチャットボットを再起動（フォールバックとして）
        if (windowId === 'shoukibo-jizoka-chatbot-window' && window.startShoukiboJizokaChat) {
          window.startShoukiboJizokaChat();
        } else if (windowId === 'shorikika-chatbot-window' && window.startShorikikaChat) {
          window.startShorikikaChat();
        }
      };
      
      // ドキュメントに追加
      document.body.appendChild(newScript);
      console.log(`${scriptId}スクリプトを再読み込みしました`);
    } else {
      console.warn(`${windowId}のスクリプトが見つかりません`);
      // スクリプトが見つからない場合は、既存の関数を使用
      if (windowId === 'shoukibo-jizoka-chatbot-window' && window.startShoukiboJizokaChat) {
        window.startShoukiboJizokaChat();
      } else if (windowId === 'shorikika-chatbot-window' && window.startShorikikaChat) {
        window.startShorikikaChat();
      }
    }
  } catch (error) {
    console.error('チャットボットスクリプトの再読み込み中にエラーが発生しました:', error);
  }
};
