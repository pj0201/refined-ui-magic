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

  // 閉じるボタンが常に存在するように定期的にチェック
  setInterval(() => {
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow && !chatWindow.querySelector('.dify-chatbot-window-close-btn')) {
      console.log('Close button not found, recreating...');
      performInitialElementsCheck();
    }
  }, 1000);

  return observer;
};

/**
 * Difyチャットボットのセットアップ
 */
export const setupDifyChat = (): void => {
  // スクリプトが既に存在するか確認
  if (scriptExists('dify-chat-config') || scriptExists('yXBz3rzpDBhMgYcB')) {
    console.log('Dify chat scripts already exist, skipping initialization');
    return;
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

    // メインスクリプトの追加 - onloadイベントの追加
    const difyChatbotScript = createScript('yXBz3rzpDBhMgYcB', 'https://udify.app/embed.min.js');
    difyChatbotScript.onload = () => {
      console.log('Dify script loaded successfully');
      // スクリプト読み込み後にスタイルを適用するためにタイムアウトを設定
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

/**
 * チャットボットの状態を監視する
 * @returns インターバルとタイムアウトのクリーンアップ用オブジェクト
 */
export const monitorChatbotState = (): { interval: ReturnType<typeof setInterval>; timeout: ReturnType<typeof setTimeout> } => {
  // スクリプトが読み込まれたかチェックする
  const scriptLoadCheck = setInterval(() => {
    if (window.hasOwnProperty('difyChatbotConfig')) {
      console.log('Dify chat config detected');
      clearInterval(scriptLoadCheck);
    }
  }, 500);

  // 最大15秒後に再試行
  const timeout = setTimeout(() => {
    clearInterval(scriptLoadCheck);
    if (!window.hasOwnProperty('difyChatbotConfig')) {
      console.log('Dify chat not loaded after timeout, retrying...');
      setupDifyChat();
    }
  }, 15000);

  return { interval: scriptLoadCheck, timeout };
};
