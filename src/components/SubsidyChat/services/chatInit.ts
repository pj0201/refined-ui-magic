
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
  try {
    // 既存のスクリプトがあれば処理を中止（再初期化を避ける）
    if (scriptExists('dify-chat-config') || scriptExists('yXBz3rzpDBhMgYcB')) {
      return;
    }
    
    // 設定スクリプトの追加
    const difyChatbotConfig = createScript('dify-chat-config', undefined, `
      window.difyChatbotConfig = { 
        token: 'yXBz3rzpDBhMgYcB',
        containerID: 'dify-chatbot-container'
      };
    `);
    document.head.appendChild(difyChatbotConfig);

    // メインスクリプトの追加
    const difyChatbotScript = createScript('yXBz3rzpDBhMgYcB', 'https://udify.app/embed.min.js');
    difyChatbotScript.defer = true;
    difyChatbotScript.async = true;
    
    difyChatbotScript.onload = () => {
      // スタイルを適用
      applyStyles();
      
      // チャットボタンをセットアップ
      setupChatButton();
      
      // チャットウィンドウがあれば位置調整
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow) {
        ensureChatWindowVisibility(chatWindow);
      }
    };
    
    document.body.appendChild(difyChatbotScript);

    // スタイルの追加
    const difyChatbotStyle = createStyle('dify-chat-styles', difyChatStyles);
    document.head.appendChild(difyChatbotStyle);

    // Difyチャットボット用のコンテナ要素を追加
    const container = createElement('div', 'dify-chatbot-container');
    container.style.cssText = 'position: fixed !important; bottom: 0 !important; right: 0 !important; z-index: 9990 !important;';
    document.body.appendChild(container);
  } catch (error) {
    console.error('Error setting up Dify chat:', error);
  }
};

/**
 * チャットボットの状態を監視する（軽量化）
 */
export const monitorChatbotState = (): { interval: ReturnType<typeof setInterval>; timeout: ReturnType<typeof setTimeout> } => {
  // より長いインターバルでチェック（5秒ごと）
  const scriptLoadCheck = setInterval(() => {
    if (window.hasOwnProperty('difyChatbotConfig')) {
      // ボタンと機能の確認（必要な場合のみ）
      const chatButton = document.getElementById('dify-chatbot-bubble-button');
      if (!chatButton) {
        setupChatButton();
      }
    }
  }, 5000); // 5秒ごとに変更（元は1秒）

  // 15秒後に一度だけ再試行
  const timeout = setTimeout(() => {
    if (!window.hasOwnProperty('difyChatbotConfig')) {
      setupDifyChat();
    }
  }, 15000);

  return { interval: scriptLoadCheck, timeout };
};
