
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
      closeBtn.style.position = 'absolute';
      closeBtn.style.top = '15px';
      closeBtn.style.right = '15px';
      closeBtn.style.zIndex = '10000';
      closeBtn.style.background = '#ff5252';
      closeBtn.style.color = 'white';
      closeBtn.style.border = '2px solid white';
      closeBtn.style.borderRadius = '50%';
      closeBtn.style.width = '32px';
      closeBtn.style.height = '32px';
      closeBtn.style.fontSize = '20px';
      closeBtn.style.display = 'flex';
      closeBtn.style.alignItems = 'center';
      closeBtn.style.justifyContent = 'center';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.padding = '0';
      closeBtn.style.lineHeight = '1';
      
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
  if (scriptExists('dify-chat-config') || scriptExists('yXBz3rzpDBhMgYcB')) {
    console.log('Dify chat scripts already exist, removing old scripts...');
    // 古いスクリプトを削除
    const oldConfig = document.getElementById('dify-chat-config');
    const oldScript = document.getElementById('yXBz3rzpDBhMgYcB');
    if (oldConfig) oldConfig.remove();
    if (oldScript) oldScript.remove();
  }

  console.log('Setting up Dify chat...');

  try {
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
    difyChatbotScript.async = true;
    difyChatbotScript.onload = () => {
      console.log('Dify script loaded successfully');
      setTimeout(applyDifyChatStyles, 100);
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
    document.body.appendChild(container);

    console.log('Dify chat setup complete');
  } catch (error) {
    console.error('Error setting up Dify chat:', error);
  }
};

