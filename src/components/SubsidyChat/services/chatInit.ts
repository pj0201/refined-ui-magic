
import { 
  applyStyles, 
  setupChatButton,
  ensureChatWindowVisibility 
} from "./chatUIManager";
import { scriptExists, createScript, createStyle, createElement } from "../utils/scriptManager";
import { difyChatStyles } from "../styles/difyChatStyles";

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
    difyChatbotScript.async = false; // 順序通りに確実に読み込むために同期読み込みに変更
    
    difyChatbotScript.onload = () => {
      console.log('Dify script loaded successfully');
      
      // 少し遅延させてスタイルを適用
      setTimeout(() => {
        applyStyles();
        
        // チャットボタンをセットアップ
        setupChatButton();
        
        // チャットウィンドウがあれば位置調整
        const chatWindow = document.getElementById('dify-chatbot-bubble-window');
        if (chatWindow) {
          ensureChatWindowVisibility(chatWindow);
        }
      }, 200);
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
      console.log('Dify chat config detected during monitoring');
      
      // ボタンと機能の確認
      setupChatButton();
      
      // チャットウィンドウの確認と位置調整
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow) {
        ensureChatWindowVisibility(chatWindow);
      }
    } else {
      console.warn('Dify chat config not found during monitoring');
    }
  }, 1000);

  // 最大15秒後に再試行
  const timeout = setTimeout(() => {
    if (!window.hasOwnProperty('difyChatbotConfig')) {
      console.log('Dify chat not loaded after timeout, retrying...');
      setupDifyChat();
    }
  }, 15000);

  return { interval: scriptLoadCheck, timeout };
};
