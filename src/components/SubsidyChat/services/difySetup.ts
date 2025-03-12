
import { scriptExists, createScript, createStyle, createElement } from "../utils/scriptManager";
import { difyChatStyles, smallSubsidyLabelHtml } from "../styles/difyChatStyles";
import { setupDomObserver, performInitialElementsCheck } from "../utils/domObserver";

/**
 * 持続化補助金ラベルを追加する関数
 */
export const addSubsidyLabel = (): void => {
  console.log('Adding subsidy label');
  
  // 既存のラベルを削除（重複を防ぐため）
  const existingLabels = document.getElementById('dify-chat-labels');
  if (existingLabels) {
    existingLabels.remove();
  }
  
  // 小規模持続化補助金ラベルを追加
  const labelElement = document.createElement('div');
  labelElement.id = 'dify-chat-labels';
  labelElement.innerHTML = smallSubsidyLabelHtml;
  document.body.appendChild(labelElement);
};

/**
 * チャットスタイルを適用し、DOM監視を設定する関数
 */
export const applyDifyChatStyles = (): MutationObserver => {
  console.log('Applying Dify chat styles');
  
  // 持続化補助金ラベルを追加
  addSubsidyLabel();
  
  // DOM変更を監視するObserverを設定
  const observer = setupDomObserver();

  // 初期チェックを実行
  performInitialElementsCheck();

  return observer;
};

/**
 * Difyチャットスクリプト関連のリソースをクリーンアップする関数
 */
export const cleanupDifyResources = (): void => {
  // DOM要素を削除
  const configScript = document.getElementById('dify-chat-config');
  if (configScript) configScript.remove();
  
  const mainScript = document.getElementById('yXBz3rzpDBhMgYcB');
  if (mainScript) mainScript.remove();
  
  const styleElement = document.getElementById('dify-chat-styles');
  if (styleElement) styleElement.remove();
  
  const container = document.getElementById('dify-chatbot-container');
  if (container) container.remove();
  
  const labels = document.getElementById('dify-chat-labels');
  if (labels) labels.remove();
  
  console.log('Dify chat resources cleaned up');
};

/**
 * Difyチャットボット用のスクリプトを追加する関数
 */
const addDifyChatScripts = (): void => {
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
};

/**
 * Difyチャットボット用のスタイルを追加する関数
 */
const addDifyChatStyles = (): void => {
  // スタイルの追加
  const difyChatbotStyle = createStyle('dify-chat-styles', difyChatStyles);
  document.head.appendChild(difyChatbotStyle);
};

/**
 * Difyチャットボット用のコンテナを作成する関数
 */
const createDifyChatContainer = (): void => {
  // Difyチャットボット用のコンテナ要素を追加
  const container = createElement('div', 'dify-chatbot-container');
  document.body.appendChild(container);
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
    // 既存のラベルを削除（重複を防ぐため）
    const existingLabels = document.getElementById('dify-chat-labels');
    if (existingLabels) {
      existingLabels.remove();
    }
    
    // 各コンポーネントのセットアップを実行
    addDifyChatScripts();
    addDifyChatStyles();
    createDifyChatContainer();

    console.log('Dify chat setup complete');
  } catch (error) {
    console.error('Error setting up Dify chat:', error);
  }
};

/**
 * チャットボットの設定が読み込まれたかを監視する関数
 */
const monitorScriptLoad = (): ReturnType<typeof setInterval> => {
  // スクリプトが読み込まれたかチェックする
  const scriptLoadCheck = setInterval(() => {
    if (window.hasOwnProperty('difyChatbotConfig')) {
      console.log('Dify chat config detected');
      clearInterval(scriptLoadCheck);
    }
  }, 500);
  
  return scriptLoadCheck;
};

/**
 * タイムアウト後にチャットボットのセットアップを再試行する関数
 */
const setupTimeoutRetry = (interval: ReturnType<typeof setInterval>): ReturnType<typeof setTimeout> => {
  // 最大15秒後に再試行
  const timeout = setTimeout(() => {
    clearInterval(interval);
    if (!window.hasOwnProperty('difyChatbotConfig')) {
      console.log('Dify chat not loaded after timeout, retrying...');
      setupDifyChat();
    }
  }, 15000);
  
  return timeout;
};

/**
 * チャットボットの状態を監視する
 * @returns インターバルとタイムアウトのクリーンアップ用オブジェクト
 */
export const monitorChatbotState = (): { interval: ReturnType<typeof setInterval>; timeout: ReturnType<typeof setTimeout> } => {
  const interval = monitorScriptLoad();
  const timeout = setupTimeoutRetry(interval);

  return { interval, timeout };
};
