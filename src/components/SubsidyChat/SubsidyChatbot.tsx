
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

// Difyの型定義
interface DifyChatbot {
  toggle: () => void;
  open: () => void;
  close: () => void;
}

declare global {
  interface Window {
    difyChatbot?: DifyChatbot;
    DifyAI?: any;
    shoukiboJizokaChatbot?: DifyChatbot;
    shorikika_chatbot?: DifyChatbot;
    // Difyスクリプトの初期化状態を追跡
    difyScriptsInitialized?: boolean;
  }
}

/**
 * Dify専用のチャットボットコンポーネント
 * ロード状態の監視と通知を行う
 */
export const SubsidyChatbot = () => {
  const [difyLoaded, setDifyLoaded] = useState(false);
  const [shoukiboLoaded, setShoukiboLoaded] = useState(false);
  const [shorikikaLoaded, setShorikikaLoaded] = useState(false);
  const [initialLoadAttempted, setInitialLoadAttempted] = useState(false);
  const [stylesInjected, setStylesInjected] = useState(false);
  const [initializationError, setInitializationError] = useState<string | null>(null);

  // チャットボットスタイルの注入 - 優先度を上げる
  useEffect(() => {
    try {
      // スタイル要素がすでに存在するかチェック
      if (!stylesInjected) {
        console.log("SubsidyChatbot: チャットボットスタイルを注入します");

        // 既存のスタイル要素を削除
        const existingStyle = document.getElementById('subsidy-chatbot-styles');
        if (existingStyle) {
          existingStyle.remove();
        }

        // スタイル要素を作成
        const styleEl = document.createElement('style');
        styleEl.id = 'subsidy-chatbot-styles';
        // スタイルを最後に追加して優先度を上げる
        styleEl.textContent = getChatbotStyles();
        document.head.appendChild(styleEl);

        setStylesInjected(true);
        console.log("SubsidyChatbot: チャットボットスタイルの注入が完了しました");
      }
    } catch (error) {
      console.error("SubsidyChatbot: スタイル注入中にエラーが発生しました:", error);
      setInitializationError("スタイルの適用に失敗しました");
    }
  }, [stylesInjected]);

  // Difyスクリプトの初期化を強制する
  const forceDifyInitialization = useCallback(() => {
    try {
      console.log("SubsidyChatbot: Difyスクリプトの初期化を強制します");
      
      // グローバルフラグを設定
      window.difyScriptsInitialized = true;
      
      // 各チャットボットの初期化状態を確認
      const isDifyAvailable = Boolean(window.difyChatbot || window.DifyAI);
      const isShoukiboAvailable = Boolean(window.shoukiboJizokaChatbot);
      const isShorikikaAvailable = Boolean(window.shorikika_chatbot);
      
      // 状態を更新
      setDifyLoaded(isDifyAvailable);
      setShoukiboLoaded(isShoukiboAvailable);
      setShorikikaLoaded(isShorikikaAvailable);
      
      // ボタンの非表示処理
      hideAllChatButtons();
      
      // チャットボットのスタイルを適用
      adjustChatbotStyles();
      
      // カスタム閉じるボタンを追加
      setTimeout(addCustomCloseButtons, 1000);
      
      console.log("SubsidyChatbot: 初期化強制処理が完了しました");
      return true;
    } catch (error) {
      console.error("SubsidyChatbot: 初期化強制中にエラーが発生しました:", error);
      setInitializationError("チャットボットの初期化に失敗しました");
      return false;
    }
  }, []);

  // チャットボットスクリプトのロード状態を監視する
  useEffect(() => {
    const checkInterval = 300; // 300ms間隔でチェック (より短く)
    const maxWaitTime = 30000; // 30秒を最大待機時間とする (短縮)
    let totalElapsedTime = 0;
    let forceInitialized = false;

    console.log("SubsidyChatbot: チャットボットスクリプトのロード状態チェックを開始します");

    // 一般的なDifyスクリプトのロード状態を監視
    const checkDifyLoaded = setInterval(() => {
      // すでに強制初期化済みならチェックを停止
      if (forceInitialized || window.difyScriptsInitialized) {
        clearInterval(checkDifyLoaded);
        return;
      }

      const isDifyAvailable = Boolean(window.difyChatbot || window.DifyAI);
      const difyButtonExists = Boolean(document.getElementById('dify-chatbot-bubble-button'));

      if ((isDifyAvailable || difyButtonExists) && !difyLoaded) {
        console.log("SubsidyChatbot: 一般的なDifyスクリプトが正常にロードされました");
        setDifyLoaded(true);

        // ボタンを非表示にする
        const button = document.getElementById('dify-chatbot-bubble-button');
        if (button) {
          button.style.display = 'none';
        }
      }

      totalElapsedTime += checkInterval;
      
      // 10秒経過したら強制初期化を試みる (早めに対応)
      if (totalElapsedTime >= 10000 && !initialLoadAttempted) {
        setInitialLoadAttempted(true);
        console.log("SubsidyChatbot: 10秒経過したため強制初期化を試みます");
        forceInitialized = forceDifyInitialization();
      }
      
      // 最大待機時間を超えた場合
      if (totalElapsedTime >= maxWaitTime) {
        console.warn("SubsidyChatbot: 最大待機時間を超えました");
        clearInterval(checkDifyLoaded);
        
        // 最後の強制初期化を試みる
        if (!forceInitialized) {
          forceInitialized = forceDifyInitialization();
        }
        
        // それでも失敗した場合はエラーを表示
        if (!forceInitialized) {
          toast.error("チャットボットの読み込みに失敗しました。ページを再読み込みしてください。");
        }
      }
    }, checkInterval);

    // クリーンアップ関数
    return () => {
      clearInterval(checkDifyLoaded);
    };
  }, [difyLoaded, initialLoadAttempted, forceDifyInitialization]);

  // 全てのチャットボタンを非表示にする関数
  const hideAllChatButtons = () => {
    const chatButtons = [
      document.getElementById('dify-chatbot-bubble-button'),
      document.getElementById('shoukibo-jizoka-chatbot-button'),
      document.getElementById('shorikika-chatbot-button')
    ];

    chatButtons.forEach(button => {
      if (button) {
        button.style.display = 'none';
      }
    });
  };

  // カスタム閉じるボタンを追加する関数
  const addCustomCloseButtons = () => {
    // 各チャットウィンドウに閉じるボタンを追加
    const chatWindows = [
      { id: 'dify-chatbot-bubble-window', buttonId: 'dify-close-button' },
      { id: 'shoukibo-jizoka-chatbot-window', buttonId: 'shoukibo-close-button' },
      { id: 'shorikika-chatbot-window', buttonId: 'shorikika-close-button' }
    ];

    chatWindows.forEach(({id, buttonId}) => {
      const window = document.getElementById(id);
      if (window) {
        // 既存のボタンがあれば削除
        const existingButton = document.getElementById(buttonId);
        if (existingButton) {
          existingButton.remove();
        }

        // ヘッダー要素を探す
        const header = window.querySelector('.dify-chatbot-window-header');
        if (header instanceof HTMLElement) {
          // 新しいボタンを作成
          const closeButton = document.createElement('button');
          closeButton.id = buttonId;
          closeButton.className = 'custom-close-button';
          closeButton.innerHTML = '✕';
          closeButton.title = 'チャットを閉じる';

          // クリックイベント
          closeButton.addEventListener('click', () => {
            window.style.display = 'none';
          });

          // ヘッダーに追加
          header.appendChild(closeButton);
          console.log(`チャットウィンドウ ${id} に閉じるボタンを追加しました`);
        }
      }
    });
  };

  // チャットボットのスタイルを調整する関数
  const adjustChatbotStyles = () => {
    try {
      console.log("SubsidyChatbot: チャットボットのスタイルを調整します");

      // 各チャットボットウィンドウのスタイルを調整
      const chatWindows = [
        document.getElementById('dify-chatbot-bubble-window'),
        document.getElementById('shoukibo-jizoka-chatbot-window'),
        document.getElementById('shorikika-chatbot-window')
      ];

      chatWindows.forEach(window => {
        if (window) {
          console.log(`SubsidyChatbot: ${window.id}のスタイルを調整します`);

          // サイズと位置を設定 - !importantを使用
          window.setAttribute('style', `
            width: 24rem !important;
            height: 50rem !important;
            max-height: 90vh !important;
            max-width: calc(100vw - 32px) !important;
            bottom: 2rem !important;
            right: 1rem !important;
            z-index: 99995 !important;
            position: fixed !important;
            display: flex !important;
            flex-direction: column !important;
            overflow: hidden !important;
            border-radius: 0.5rem !important;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          `);

          // ヘッダー要素を探す
          const header = window.querySelector('.dify-chatbot-window-header');
          if (header instanceof HTMLElement) {
            header.setAttribute('style', `
              background-color: #1C64F2 !important;
              padding: 0.75rem !important;
              color: white !important;
              position: relative !important;
              z-index: 99996 !important;
            `);
          }

          // Difyデフォルトの閉じるボタンを非表示
          const closeBtn = window.querySelector('.dify-chatbot-window-close-btn');
          if (closeBtn instanceof HTMLElement) {
            closeBtn.style.display = 'none';
          }
          
          // モバイル対応のための追加スタイル
          if (window.offsetWidth < 768) {
            window.setAttribute('style', window.getAttribute('style') + `
              width: 100% !important;
              height: 100% !important;
              max-height: 100% !important;
              max-width: 100% !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              border-radius: 0 !important;
            `);
          }
        }
      });

      // 青いチャットボタンを非表示にする
      hideAllChatButtons();

      console.log("SubsidyChatbot: チャットボットのスタイル調整が完了しました");
    } catch (error) {
      console.error("SubsidyChatbot: スタイル調整中にエラーが発生しました:", error);
    }
  };

  // チャットボットのスタイルを取得する関数
  const getChatbotStyles = () => {
    return `
      /* 共通のチャットウィンドウスタイル */
      #dify-chatbot-bubble-window,
      #shoukibo-jizoka-chatbot-window,
      #shorikika-chatbot-window {
        width: 24rem !important;
        height: 50rem !important;
        max-height: 90vh !important;
        max-width: calc(100vw - 32px) !important;
        bottom: 2rem !important;
        right: 1rem !important;
        transform: none !important;
        margin-bottom: 0 !important;
        z-index: 99995 !important;
        position: fixed !important;
        display: flex !important;
        flex-direction: column !important;
        overflow: hidden !important;
        border-radius: 0.5rem !important;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
      }

      /* ヘッダーのスタイリング - 上部の青いバー（共通） */
      .dify-chatbot-window-header {
        background-color: #1C64F2 !important;
        padding: 0.75rem !important;
        color: white !important;
        position: relative !important;
        z-index: 99996 !important;
      }

      /* Difyデフォルトの閉じるボタンを非表示 */
      .dify-chatbot-window-close-btn {
        display: none !important;
      }

      /* カスタム閉じるボタン */
      .custom-close-button {
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        background-color: transparent !important;
        border: none !important;
        color: white !important;
        width: 30px !important;
        height: 30px !important;
        font-size: 20px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        z-index: 2147483650 !important;
      }

      .custom-close-button:hover {
        background-color: rgba(255, 255, 255, 0.2) !important;
        border-radius: 50% !important;
      }

      /* 入力エリアのスタイリング（共通） */
      .dify-chatbot-window-footer {
        position: sticky !important;
        bottom: 0 !important;
        background-color: white !important;
        padding: 12px !important;
        z-index: 99996 !important;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1) !important;
        margin-top: auto !important;
      }

      /* レスポンシブ対応（共通） - 強化版 */
      @media (max-width: 768px) {
        #dify-chatbot-bubble-window,
        #shoukibo-jizoka-chatbot-window,
        #shorikika-chatbot-window {
          width: 100% !important;
          height: 100% !important;
          max-height: 100% !important;
          max-width: 100% !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          bottom: 0 !important;
          border-radius: 0 !important;
        }
      }

      /* 高さが小さい画面用の調整 */
      @media (max-height: 700px) {
        #dify-chatbot-bubble-window,
        #shoukibo-jizoka-chatbot-window,
        #shorikika-chatbot-window {
          top: 0 !important;
          height: 100vh !important;
          max-height: 100vh !important;
          border-radius: 0 !important;
        }
      }

      /* 青いボタンを非表示にする */
      #dify-chatbot-bubble-button,
      #shoukibo-jizoka-chatbot-button,
      #shorikika-chatbot-button {
        display: none !important;
      }
    `;
  };

  // エラー表示
  if (initializationError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 mb-4">
        <p className="font-medium">チャットボットの初期化エラー</p>
        <p>{initializationError}</p>
        <button 
          className="mt-2 px-3 py-1 bg-red-100 hover:bg-red-200 rounded-md text-sm"
          onClick={() => window.location.reload()}
        >
          ページを再読み込み
        </button>
      </div>
    );
  }

  return null;
};

/**
 * 小規模持続化補助金チャットボットを開く関数
 */
export const openShoukiboJizokaChat = () => {
  try {
    console.log("SubsidyChatbot.openShoukiboJizokaChat: 小規模持続化補助金チャットボットを開きます");

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

    // チャットウィンドウをチェック
    const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
    
    // ウィンドウが存在し、表示されている場合は何もしない
    if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
      console.log("SubsidyChatbot.openShoukiboJizokaChat: チャットウィンドウは既に表示されています");
      return;
    }

    // 直接ボタンクリックを試みる
    const shoukiboButton = document.getElementById('shoukibo-jizoka-chatbot-button');
    if (shoukiboButton instanceof HTMLElement) {
      console.log("SubsidyChatbot.openShoukiboJizokaChat: 小規模持続化補助金ボタンを直接クリックします");
      shoukiboButton.click();

      // ウィンドウが表示されたか確認
      setTimeout(() => {
        const window = document.getElementById('shoukibo-jizoka-chatbot-window');
        if (window) {
          // 強制的に表示
          window.style.display = 'flex';
          
          // カスタム閉じるボタンを追加
          addCustomCloseButton('shoukibo-jizoka-chatbot-window', 'shoukibo-close-button');
        }
      }, 500);

      return;
    }

    // ChatbotInitializerと同様の処理
    if (window.shoukiboJizokaChatbot && typeof window.shoukiboJizokaChatbot.toggle === 'function') {
      console.log("SubsidyChatbot.openShoukiboJizokaChat: shoukiboJizokaChatbot APIを使用");
      
      // まずopen関数があればそれを使用
      if (typeof window.shoukiboJizokaChatbot.open === 'function') {
        window.shoukiboJizokaChatbot.open();
      } else {
        window.shoukiboJizokaChatbot.toggle();
      }

      // ウィンドウが表示されたか確認
      setTimeout(() => {
        const window = document.getElementById('shoukibo-jizoka-chatbot-window');
        if (window) {
          // 強制的に表示
          window.style.display = 'flex';
          
          // カスタム閉じるボタンを追加
          addCustomCloseButton('shoukibo-jizoka-chatbot-window', 'shoukibo-close-button');
        }
      }, 500);
    } else {
      // 最後の手段 - DOMを直接操作
      const window = document.getElementById('shoukibo-jizoka-chatbot-window');
      if (window) {
        window.style.display = 'flex';
        addCustomCloseButton('shoukibo-jizoka-chatbot-window', 'shoukibo-close-button');
      } else {
        throw new Error("SubsidyChatbot.openShoukiboJizokaChat: 小規模持続化補助金のチャットボタンが見つかりませんでした");
      }
    }
  } catch (error) {
    console.error("SubsidyChatbot.openShoukiboJizokaChat: チャットボットを開く際にエラーが発生しました:", error);
    toast.error("小規模持続化補助金のチャットボットを開けませんでした。ページを再読み込みしてください。");
  }
};

/**
 * 省力化投資補助金チャットボットを開く関数
 */
export const openShorikikaChat = () => {
  try {
    console.log("SubsidyChatbot.openShorikikaChat: 省力化投資補助金チャットボットを開きます");

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

    // チャットウィンドウをチェック
    const chatWindow = document.getElementById('shorikika-chatbot-window');
    if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
      console.log("SubsidyChatbot.openShorikikaChat: チャットウィンドウは既に表示されています");
      return;
    }

    // 直接ボタンクリックを試みる
    const shorikikaButton = document.getElementById('shorikika-chatbot-button');
    if (shorikikaButton instanceof HTMLElement) {
      console.log("SubsidyChatbot.openShorikikaChat: 省力化投資補助金ボタンを直接クリックします");
      shorikikaButton.click();

      // ウィンドウが表示されたか確認
      setTimeout(() => {
        const window = document.getElementById('shorikika-chatbot-window');
        if (window) {
          // 強制的に表示
          window.style.display = 'flex';
          
          // カスタム閉じるボタンを追加
          addCustomCloseButton('shorikika-chatbot-window', 'shorikika-close-button');
        }
      }, 500);

      return;
    }

    // ChatbotInitializerと同様の処理
    if (window.shorikika_chatbot && typeof window.shorikika_chatbot.toggle === 'function') {
      console.log("SubsidyChatbot.openShorikikaChat: shorikika_chatbot APIを使用");
      
      // まずopen関数があればそれを使用
      if (typeof window.shorikika_chatbot.open === 'function') {
        window.shorikika_chatbot.open();
      } else {
        window.shorikika_chatbot.toggle();
      }

      // ウィンドウが表示されたか確認
      setTimeout(() => {
        const window = document.getElementById('shorikika-chatbot-window');
        if (window) {
          // 強制的に表示
          window.style.display = 'flex';
          
          // カスタム閉じるボタンを追加
          addCustomCloseButton('shorikika-chatbot-window', 'shorikika-close-button');
        }
      }, 500);
    } else {
      // 最後の手段 - DOMを直接操作
      const window = document.getElementById('shorikika-chatbot-window');
      if (window) {
        window.style.display = 'flex';
        addCustomCloseButton('shorikika-chatbot-window', 'shorikika-close-button');
      } else {
        throw new Error("SubsidyChatbot.openShorikikaChat: 省力化投資補助金のチャットボタンが見つかりませんでした");
      }
    }
  } catch (error) {
    console.error("SubsidyChatbot.openShorikikaChat: チャットボットを開く際にエラーが発生しました:", error);
    toast.error("省力化投資補助金のチャットボットを開けませんでした。ページを再読み込みしてください。");
  }
};

// カスタム閉じるボタンを追加するヘルパー関数
const addCustomCloseButton = (windowId: string, buttonId: string) => {
  const window = document.getElementById(windowId);
  if (!window) return;

  // 既存のボタンがあれば削除
  const existingButton = document.getElementById(buttonId);
  if (existingButton) {
    existingButton.remove();
  }

  // ヘッダー要素を探す
  const header = window.querySelector('.dify-chatbot-window-header');
  if (header instanceof HTMLElement) {
    // 新しいボタンを作成
    const closeButton = document.createElement('button');
    closeButton.id = buttonId;
    closeButton.className = 'custom-close-button';
    closeButton.innerHTML = '✕';
    closeButton.title = 'チャットを閉じる';

    // クリックイベント
    closeButton.addEventListener('click', () => {
      window.style.display = 'none';
    });

    // ヘッダーに追加
    header.appendChild(closeButton);
    console.log(`チャットウィンドウ ${windowId} に閉じるボタンを追加しました`);
  }
};
