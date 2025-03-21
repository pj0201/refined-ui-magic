
import { useEffect, useRef } from "react";
import { toast } from "sonner";

/**
 * チャットボット初期化コンポーネント
 * このコンポーネントはチャットボットの初期化と制御を担当します
 */
export const ChatbotInitializer: React.FC = () => {
  // 初期化実行フラグ
  const initialized = useRef(false);
  
  // 初期化状態
  useEffect(() => {
    // 一度だけ実行するための条件
    if (initialized.current) return;
    initialized.current = true;
    
    console.log("チャットボット初期化を開始します");
    
    // グローバル関数の設定
    setupGlobalFunctions();
    
    // スタイルを設定
    setupChatbotStyles();
    
    // 青いボタンを非表示にする
    hideBlueButton();
    
    // 初期化後に閉じるボタンを追加
    setTimeout(() => addCustomCloseButtons(), 2000);
    
    // 定期的に閉じるボタンをチェック
    const buttonInterval = setInterval(() => addCustomCloseButtons(), 5000);
    
    // クリーンアップ関数
    return () => {
      clearInterval(buttonInterval);
    };
  }, []);
  
  // グローバル関数の設定
  const setupGlobalFunctions = () => {
    // 一般チャットボットを開く関数
    window.openChatbot = () => {
      console.log("一般チャットボットを開きます");
      if (window.difyChatbot) {
        if (typeof window.difyChatbot.open === 'function') {
          window.difyChatbot.open();
        } else if (typeof window.difyChatbot.toggle === 'function') {
          window.difyChatbot.toggle();
        }
      } else {
        toast.error("チャットボットが読み込まれていません。ページを再読み込みしてください。");
      }
    };
    
    // 小規模持続化補助金チャットボットを開く関数
    window.startShoukiboJizokaChat = () => {
      console.log("小規模持続化補助金チャットボットを開きます");
      try {
        // 他のチャットウィンドウを閉じる
        const otherWindows = [
          document.getElementById('dify-chatbot-bubble-window'),
          document.getElementById('shorikika-chatbot-window')
        ];

        otherWindows.forEach(window => {
          if (window && window.style.display !== 'none') {
            window.style.display = 'none';
          }
        });

        // グローバルオブジェクトを使用
        if (window.shoukiboJizokaChatbot) {
          if (typeof window.shoukiboJizokaChatbot.open === 'function') {
            window.shoukiboJizokaChatbot.open();
          } else if (typeof window.shoukiboJizokaChatbot.toggle === 'function') {
            window.shoukiboJizokaChatbot.toggle();
          }
          
          // ウィンドウが表示されたか確認
          setTimeout(() => {
            const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
            if (chatWindow) {
              chatWindow.style.display = 'flex';
              addCustomCloseButtons();
            }
          }, 500);
        } else if (typeof window.openSmallBusinessChatbot === 'function') {
          window.openSmallBusinessChatbot();
        } else {
          toast.error("小規模持続化補助金チャットボットが初期化されていません。ページを再読み込みしてください。");
        }
      } catch (error) {
        console.error("小規模持続化補助金チャットボットの開始中にエラー:", error);
        toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
      }
    };
    
    // 省力化投資補助金チャットボットを開く関数
    window.startShorikikaChat = () => {
      console.log("省力化投資補助金チャットボットを開きます");
      try {
        // 他のチャットウィンドウを閉じる
        const otherWindows = [
          document.getElementById('dify-chatbot-bubble-window'),
          document.getElementById('shoukibo-jizoka-chatbot-window')
        ];

        otherWindows.forEach(window => {
          if (window && window.style.display !== 'none') {
            window.style.display = 'none';
          }
        });

        // グローバルオブジェクトを使用
        if (window.shorikika_chatbot) {
          if (typeof window.shorikika_chatbot.open === 'function') {
            window.shorikika_chatbot.open();
          } else if (typeof window.shorikika_chatbot.toggle === 'function') {
            window.shorikika_chatbot.toggle();
          }
          
          // ウィンドウが表示されたか確認
          setTimeout(() => {
            const chatWindow = document.getElementById('shorikika-chatbot-window');
            if (chatWindow) {
              chatWindow.style.display = 'flex';
              addCustomCloseButtons();
            }
          }, 500);
        } else if (typeof window.openSubsidyChatbot === 'function') {
          window.openSubsidyChatbot();
        } else {
          toast.error("省力化投資補助金チャットボットが初期化されていません。ページを再読み込みしてください。");
        }
      } catch (error) {
        console.error("省力化投資補助金チャットボットの開始中にエラー:", error);
        toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
      }
    };
    
    // 後方互換性のための関数もセット
    window.openSmallBusinessChatbot = window.startShoukiboJizokaChat;
    window.openSubsidyChatbot = window.startShorikikaChat;
  };
  
  // このコンポーネントは何も表示しない
  return null;
};

// useChatbotInitializer関数のエクスポート（後方互換性のため）
export const useChatbotInitializer = () => {
  // 単純化されたフックを返す
  return {
    isDifyLoaded: true,
    isShoukiboLoaded: true,
    isShorikikaLoaded: true,
    openChatbot: () => window.openChatbot?.(),
    startShoukiboJizokaChat: () => window.startShoukiboJizokaChat?.(),
    startShorikikaChat: () => window.startShorikikaChat?.()
  };
};

/**
 * スタイル設定関数
 */
const setupChatbotStyles = () => {
  try {
    // 既存のスタイルを確認
    const existingStyle = document.getElementById('dify-chatbot-styles');
    if (existingStyle) {
      console.log("既存のスタイルを更新します");
      existingStyle.remove();
    }
    
    // 新しいスタイル要素を作成
    const style = document.createElement('style');
    style.id = 'dify-chatbot-styles';
    style.textContent = `
      /* チャットウィンドウのスタイル */
      #dify-chatbot-bubble-window,
      #shoukibo-jizoka-chatbot-window,
      #shorikika-chatbot-window,
      [class*="dify-chatbot-bubble-window"] {
        width: 380px !important;
        height: 600px !important;
        max-height: 80vh !important;
        max-width: calc(100vw - 40px) !important;
        bottom: 20px !important;
        right: 20px !important;
        top: auto !important;
        left: auto !important;
        transform: none !important;
        margin-bottom: 0 !important;
        z-index: 99995 !important;
        position: fixed !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        border-radius: 10px !important;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
        background-color: #fff !important;
      }
      
      /* ヘッダーのスタイリング */
      .dify-chatbot-bubble-window-header,
      .dify-chatbot-window-header {
        background-color: #1C64F2 !important;
        padding: 0.75rem !important;
        color: white !important;
        font-weight: 600 !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        position: relative !important;
      }
      
      /* チャットウィンドウのコンテンツ */
      .dify-chatbot-bubble-window-content {
        flex: 1 !important;
        overflow: hidden !important;
        position: relative !important;
        height: calc(100% - 50px) !important;
      }
      
      /* iframe スタイル修正 */
      .dify-chatbot-bubble-window-content iframe {
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        display: block !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
      }
      
      /* 閉じるボタン */
      .chat-window-close-button,
      .custom-close-button {
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        background-color: rgba(255, 255, 255, 0.2) !important;
        color: white !important;
        border: none !important;
        border-radius: 50% !important;
        width: 30px !important;
        height: 30px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        font-size: 18px !important;
        z-index: 10000 !important;
      }
      
      /* 閉じるボタンホバー */
      .chat-window-close-button:hover,
      .custom-close-button:hover {
        background-color: rgba(255, 255, 255, 0.3) !important;
      }
      
      /* Difyのブランディングを非表示 */
      .dify-chatbot-bubble-window-footer,
      [class*="dify"] [class*="footer"],
      [class*="powered-by"],
      a[href*="dify.ai"] {
        display: none !important;
      }
      
      /* 青いボタンを非表示にする */
      .dify-chatbot-bubble-button,
      #dify-chatbot-bubble-button,
      [id^="dify-chatbot-bubble-button"],
      [class^="dify-chatbot-bubble-button"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        width: 0 !important;
        height: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        z-index: -1 !important;
      }
      
      /* エラーメッセージを「しばらくお待ちください」に変更 */
      .dify-error-message, 
      [class*="error-message"], 
      [class*="errorMessage"] {
        display: block !important;
        color: #4B5563 !important;
        font-weight: normal !important;
        font-size: 0.9rem !important;
        text-align: center !important;
        padding: 1rem !important;
        margin: 1rem 0 !important;
        border: none !important;
        background: none !important;
      }
      
      .dify-error-message::before,
      [class*="error-message"]::before,
      [class*="errorMessage"]::before {
        content: 'しばらくお待ちください...' !important;
      }
      
      .dify-error-message *,
      [class*="error-message"] *,
      [class*="errorMessage"] * {
        display: none !important;
      }
      
      /* モバイル対応 */
      @media (max-width: 640px) {
        #dify-chatbot-bubble-window,
        #shoukibo-jizoka-chatbot-window,
        #shorikika-chatbot-window {
          width: calc(100vw - 32px) !important;
          height: 80vh !important;
          bottom: 1rem !important;
          right: 1rem !important;
          left: 1rem !important;
          top: auto !important;
        }
      }
    `;
    document.head.appendChild(style);
    console.log("チャットボットスタイルをセットアップしました");
  } catch (error) {
    console.error("チャットボットスタイルのセットアップ中にエラーが発生しました:", error);
  }
};

/**
 * 青いボタンを非表示にする関数
 */
const hideBlueButton = () => {
  try {
    // 青いボタンを非表示にするスタイルを追加
    const style = document.createElement('style');
    style.textContent = `
      /* 青いボタンを非表示にする */
      .dify-chatbot-bubble-button,
      #dify-chatbot-bubble-button,
      [id^="dify-chatbot-bubble-button"],
      [class^="dify-chatbot-bubble-button"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        width: 0 !important;
        height: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
        z-index: -1 !important;
      }
    `;
    document.head.appendChild(style);
    console.log("青いボタンを非表示にしました");
  } catch (error) {
    console.error("青いボタンの非表示化中にエラーが発生しました:", error);
  }
};

/**
 * カスタム閉じるボタンを追加する関数
 */
const addCustomCloseButtons = () => {
  console.log("カスタム閉じるボタンを追加します");
  
  try {
    // チャットボットウィンドウのヘッダーを取得
    const chatWindows = [
      { id: 'dify-chatbot-bubble-window', selector: '#dify-chatbot-bubble-window .dify-chatbot-bubble-window-header' },
      { id: 'shoukibo-jizoka-chatbot-window', selector: '#shoukibo-jizoka-chatbot-window .dify-chatbot-bubble-window-header' },
      { id: 'shorikika-chatbot-window', selector: '#shorikika-chatbot-window .dify-chatbot-bubble-window-header' }
    ];
    
    // 各チャットウィンドウに閉じるボタンを追加
    chatWindows.forEach(({ id, selector }) => {
      const header = document.querySelector(selector);
      if (header && !header.querySelector('.custom-close-button')) {
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '×';
        closeButton.className = 'custom-close-button';
        closeButton.setAttribute('style', `
          position: absolute !important;
          top: 10px !important;
          right: 10px !important;
          width: 30px !important;
          height: 30px !important;
          border-radius: 50% !important;
          background-color: rgba(255, 255, 255, 0.2) !important;
          border: none !important;
          color: white !important;
          font-size: 18px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
          transition: background-color 0.3s !important;
          z-index: 10000 !important;
        `);
        closeButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          const chatWindow = document.getElementById(id);
          if (chatWindow) {
            chatWindow.style.display = 'none';
            document.body.classList.remove('chatbot-window-active');
          }
        };
        header.appendChild(closeButton);
      }
    });
  } catch (error) {
    console.error("カスタム閉じるボタンの追加中にエラーが発生しました:", error);
  }
};
