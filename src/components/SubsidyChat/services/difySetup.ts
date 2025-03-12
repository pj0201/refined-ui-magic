
import { scriptExists, createScript, createStyle, createElement } from "../utils/scriptManager";
import { difyChatStyles } from "../styles/difyChatStyles";
import { setupDomObserver, performInitialElementsCheck } from "../utils/domObserver";

/**
 * スタイルを適用する関数
 */
export const applyDifyChatStyles = (): MutationObserver => {
  console.log('Applying Dify chat styles');
  
  // DOM変更を監視するObserverを設定
  const observer = setupDomObserver();

  // 初期チェックを実行
  performInitialElementsCheck();

  // 閉じるボタンをチェックして再作成する
  const checkCloseButton = () => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow && !document.querySelector('.dify-custom-close-btn')) {
      console.log('Close button not found, creating custom close button...');
      
      // カスタム閉じるボタンの作成
      const closeBtn = document.createElement('button');
      closeBtn.className = 'dify-custom-close-btn';
      closeBtn.innerHTML = '×';
      closeBtn.style.cssText = `
        position: absolute !important;
        top: 15px !important;
        right: 15px !important;
        z-index: 10000 !important;
        background: #ff5252 !important;
        color: white !important;
        border: 2px solid white !important;
        border-radius: 50% !important;
        width: 32px !important;
        height: 32px !important;
        font-size: 20px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        padding: 0 !important;
        line-height: 1 !important;
      `;
      
      // クリックイベントを追加（チャットウィンドウを閉じる）
      closeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Custom close button clicked');
        
        // チャットウィンドウを非表示にする
        if (chatWindow) {
          chatWindow.style.display = 'none';
        }
        
        // プラグインの状態も更新
        const plugin = document.getElementById('dify-chatbot-bubble-button');
        if (plugin) {
          plugin.classList.remove('active');
        }
      });
      
      // ボタンをウィンドウに追加
      chatWindow.appendChild(closeBtn);
    }
  };

  // 定期的に閉じるボタンの存在をチェック
  setInterval(checkCloseButton, 1000);

  return observer;
};

/**
 * Difyチャットボットのセットアップ
 */
export const setupDifyChat = (): void => {
  console.log('Setting up Dify chat...');

  try {
    // 既存のスクリプトがあれば削除（初期化し直すため）
    if (scriptExists('dify-chat-config') || scriptExists('yXBz3rzpDBhMgYcB')) {
      console.log('Dify chat scripts already exist, removing old scripts...');
      // 古いスクリプトを削除
      const oldConfig = document.getElementById('dify-chat-config');
      const oldScript = document.getElementById('yXBz3rzpDBhMgYcB');
      if (oldConfig) oldConfig.remove();
      if (oldScript) oldScript.remove();
    }
    
    // 設定スクリプトの追加
    const difyChatbotConfig = createScript('dify-chat-config', undefined, `
      window.difyChatbotConfig = { 
        token: 'yXBz3rzpDBhMgYcB',
        containerID: 'dify-chatbot-container'
      };
      console.log('Dify config loaded');
    `);
    document.head.appendChild(difyChatbotConfig);

    // メインスクリプトの追加
    const difyChatbotScript = createScript('yXBz3rzpDBhMgYcB', 'https://udify.app/embed.min.js');
    difyChatbotScript.defer = false;
    difyChatbotScript.async = true;
    difyChatbotScript.onload = () => {
      console.log('Dify script loaded successfully');
      setTimeout(applyDifyChatStyles, 100);
      
      // チャットボタンが表示されるように強制的に作成
      setTimeout(() => {
        let chatButton = document.getElementById('dify-chatbot-bubble-button');
        
        // ボタンが存在しない場合は作成
        if (!chatButton) {
          console.log('Creating new Dify chat button');
          chatButton = document.createElement('button');
          chatButton.id = 'dify-chatbot-bubble-button';
          document.body.appendChild(chatButton);
        }
        
        if (chatButton) {
          chatButton.style.cssText = `
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 9995 !important;
            position: fixed !important;
            bottom: 11rem !important;
            right: 1rem !important;
            width: 48px !important;
            height: 48px !important;
            border-radius: 50% !important;
            background-color: #1C64F2 !important;
            cursor: pointer !important;
            color: white !important;
            font-size: 24px !important;
            border: none !important;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
          `;
          
          // チャットアイコンの設定
          chatButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          `;
          
          // ボタンクリック時のイベントハンドラを設定
          chatButton.onclick = (e) => {
            e.stopPropagation();
            console.log('Dify chat button clicked');
            
            // チャットウィンドウの表示を切り替え
            const chatWindow = document.getElementById('dify-chatbot-bubble-window');
            if (chatWindow) {
              chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
            }
          };
          
          console.log('Dify chat button visibility enforced');
        } else {
          console.warn('Dify chat button not found after script load');
        }
      }, 1000);
    };
    difyChatbotScript.onerror = (error) => {
      console.error('Error loading Dify script:', error);
    };
    document.body.appendChild(difyChatbotScript);

    // スタイルの追加
    const difyChatbotStyle = createStyle('dify-chat-styles', difyChatStyles);
    document.head.appendChild(difyChatbotStyle);

    // Difyチャットボット用のコンテナ要素を追加
    const container = createElement('div', 'dify-chatbot-container');
    container.style.cssText = `
      position: fixed !important;
      bottom: 0 !important;
      right: 0 !important;
      z-index: 9990 !important;
    `;
    document.body.appendChild(container);

    console.log('Dify chat setup complete');
  } catch (error) {
    console.error('Error setting up Dify chat:', error);
  }
};

/**
 * チャットボットの状態を監視する
 * @returns インターバルとタイムアウトのクリーンアップ用オブジェクト
 */
export const monitorChatbotState = (): { interval: ReturnType<typeof setInterval>; timeout: ReturnType<typeof setTimeout> } => {
  // スクリプトが読み込まれたかチェックする
  const scriptLoadCheck = setInterval(() => {
    if (window.hasOwnProperty('difyChatbotConfig')) {
      console.log('Dify chat config detected');
      
      // チャットボタンのチェック
      let chatButton = document.getElementById('dify-chatbot-bubble-button');
      
      // ボタンが存在しない場合は作成
      if (!chatButton) {
        console.log('Creating new Dify chat button during monitoring');
        chatButton = document.createElement('button');
        chatButton.id = 'dify-chatbot-bubble-button';
        chatButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        `;
        document.body.appendChild(chatButton);
      }
      
      if (chatButton) {
        chatButton.style.cssText = `
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          z-index: 9995 !important;
          position: fixed !important;
          bottom: 11rem !important;
          right: 1rem !important;
          width: 48px !important;
          height: 48px !important;
          border-radius: 50% !important;
          background-color: #1C64F2 !important;
          cursor: pointer !important;
          color: white !important;
          font-size: 24px !important;
          border: none !important;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1) !important;
        `;
        
        // クリックイベントがなければ追加
        if (!chatButton.onclick) {
          chatButton.onclick = (e) => {
            e.stopPropagation();
            console.log('Dify chat button clicked during monitoring');
            
            // チャットウィンドウの表示を切り替え
            const chatWindow = document.getElementById('dify-chatbot-bubble-window');
            if (chatWindow) {
              chatWindow.style.display = chatWindow.style.display === 'none' ? 'flex' : 'none';
            }
          };
        }
        
        console.log('Dify chat button visibility enforced during monitoring');
      } else {
        console.warn('Dify chat button not found during monitoring');
        // ボタンが見つからない場合は再セットアップを試みる
        setupDifyChat();
      }
    }
  }, 500);

  // 最大15秒後に再試行
  const timeout = setTimeout(() => {
    if (!window.hasOwnProperty('difyChatbotConfig')) {
      console.log('Dify chat not loaded after timeout, retrying...');
      setupDifyChat();
    }
  }, 15000);

  return { interval: scriptLoadCheck, timeout };
};
