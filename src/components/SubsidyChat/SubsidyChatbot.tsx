import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { hideDifyBranding } from './styles/chatButtonStyles';

// グローバルウィンドウオブジェクトの型拡張
declare global {
  interface Window {
    difyChatbot?: {
      toggle: () => void;
      sendMessage?: (message: string) => void;
    };
    DifyAI?: {
      toggleUI: (show: boolean) => void;
      sendMessage?: (message: string) => void;
    };
    openChatbot?: () => void;
    startShoukiboJizokaChat?: () => void;
    openSmallBusinessChatbot?: () => void;
    startShorikikaChat?: () => void;
    openSubsidyChatbot?: () => void;
    subsidyChatbotInitialized?: boolean;
    difyInitializationAttempted?: boolean;
  }
}

// カスタム閉じるボタンを追加する関数
const addCustomCloseButtonsGlobal = () => {
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
          
          // ウィンドウを強制的に閉じる
          const chatWindow = document.getElementById(id);
          if (chatWindow) {
            // 複数のスタイルプロパティを設定して確実に非表示にする
            chatWindow.style.cssText = `
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
            `;
            
            // 親要素も非表示にする試み
            const parent = chatWindow.parentElement;
            if (parent) {
              parent.style.display = 'none';
              parent.style.opacity = '0';
              parent.style.visibility = 'hidden';
            }
            
            // DifyのAPIを使用して閉じる試み
            try {
              if (window.difyChatbot && typeof window.difyChatbot.toggle === 'function') {
                window.difyChatbot.toggle();
              }
              
              if (window.DifyAI && typeof window.DifyAI.toggleUI === 'function') {
                window.DifyAI.toggleUI(false);
              }
            } catch (err) {
              console.error("Dify APIを使用した閉じる処理でエラー:", err);
            }
            
            console.log(`${id}を閉じました`);
          }
        };
        header.appendChild(closeButton);
      }
    });
  } catch (error) {
    console.error("カスタム閉じるボタンの追加中にエラーが発生しました:", error);
  }
};

export const SubsidyChatbot = () => {
  // Difyスクリプトの読み込み状態
  const [isDifyScriptLoaded, setIsDifyScriptLoaded] = useState(false);
  const [difyInitError, setDifyInitError] = useState<string | null>(null);
  
  // スクリプトの読み込みタイムアウト時間（ミリ秒）
  const scriptLoadTimeout = 30000; // 30秒
  const forceInitTimeout = 10000; // 10秒後に強制初期化を試みる
  
  // チェック間隔（ミリ秒）
  const checkInterval = 1000; // 1秒ごとにチェック
  
  // カスタム閉じるボタンを追加する関数
  const addCustomCloseButtons = useCallback(() => {
    addCustomCloseButtonsGlobal();
  }, []);
  
  // カスタムスタイルを適用する関数
  const applyCustomStyles = useCallback(() => {
    try {
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
        
        /* チャットウィンドウのスタイル */
        #dify-chatbot-bubble-window,
        #shoukibo-jizoka-chatbot-window,
        #shorikika-chatbot-window {
          width: 24rem !important;
          height: 50rem !important;
          max-height: 90vh !important;
          max-width: calc(100vw - 32px) !important;
          bottom: auto !important;
          top: 50px !important;
          right: 20px !important;
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
      console.log("カスタムスタイルを適用しました");
    } catch (error) {
      console.error("カスタムスタイルの適用中にエラーが発生しました:", error);
    }
  }, []);
  
  // Difyスクリプトを強制的に初期化する関数
  const forceDifyInitialization = useCallback(() => {
    console.log("Difyスクリプトの強制初期化を試みます");
    
    try {
      // すでに初期化済みの場合は何もしない
      if (window.subsidyChatbotInitialized) {
        console.log("Difyスクリプトはすでに初期化されています");
        return;
      }
      
      // 初期化試行済みフラグを設定
      window.difyInitializationAttempted = true;
      
      // Difyスクリプトの存在を確認
      const difyScript = document.querySelector('script[src*="dify"]');
      if (!difyScript) {
        console.error("Difyスクリプトが見つかりません");
        setDifyInitError("Difyスクリプトが見つかりません");
        return;
      }
      
      // スクリプトを再読み込み
      const scriptSrc = difyScript.getAttribute('src');
      if (scriptSrc) {
        const newScript = document.createElement('script');
        newScript.src = scriptSrc;
        newScript.async = true;
        newScript.defer = true;
        newScript.onload = () => {
          console.log("Difyスクリプトが再読み込みされました");
          setIsDifyScriptLoaded(true);
          
          // 初期化成功フラグを設定
          window.subsidyChatbotInitialized = true;
          
          // スタイルを適用
          applyCustomStyles();
        };
        newScript.onerror = () => {
          console.error("Difyスクリプトの再読み込みに失敗しました");
          setDifyInitError("Difyスクリプトの読み込みに失敗しました");
        };
        
        // 古いスクリプトを削除
        difyScript.parentNode?.removeChild(difyScript);
        
        // 新しいスクリプトを追加
        document.head.appendChild(newScript);
      }
    } catch (error) {
      console.error("Difyスクリプトの強制初期化中にエラーが発生しました:", error);
      setDifyInitError(`初期化エラー: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, []);
  
  // Difyスクリプトの読み込み状態を監視
  useEffect(() => {
    console.log("Difyスクリプトの読み込み状態を監視します");
    
    // 初期化済みフラグをリセット
    window.subsidyChatbotInitialized = false;
    window.difyInitializationAttempted = false;
    
    // スタイルを適用
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', applyCustomStyles);
    } else {
      applyCustomStyles();
    }
    
    // Difyスクリプトの読み込み状態を確認するタイマー
    const checkDifyLoaded = setInterval(() => {
      const isDifyAvailable = Boolean(window.difyChatbot || window.DifyAI);
      
      if (isDifyAvailable) {
        console.log("Difyスクリプトが読み込まれました");
        setIsDifyScriptLoaded(true);
        window.subsidyChatbotInitialized = true;
        clearInterval(checkDifyLoaded);
        
        // Difyのブランディングを非表示にする
        hideDifyBranding();
        
        // カスタム閉じるボタンを追加
        setTimeout(addCustomCloseButtons, 1000);
      }
    }, checkInterval);
    
    // 強制初期化タイマー
    const forceInitTimer = setTimeout(() => {
      if (!window.subsidyChatbotInitialized && !window.difyInitializationAttempted) {
        console.log(`${forceInitTimeout}ミリ秒経過しても初期化されていないため、強制初期化を試みます`);
        forceDifyInitialization();
      }
    }, forceInitTimeout);
    
    // スクリプト読み込みタイムアウト
    const timeoutTimer = setTimeout(() => {
      if (!isDifyScriptLoaded) {
        console.error(`${scriptLoadTimeout}ミリ秒経過してもDifyスクリプトが読み込まれませんでした`);
        setDifyInitError("Difyスクリプトの読み込みがタイムアウトしました");
        clearInterval(checkDifyLoaded);
      }
    }, scriptLoadTimeout);
    
    // ウィンドウロード完了時にもスタイルを再適用
    window.addEventListener('load', () => {
      applyCustomStyles();
      setTimeout(addCustomCloseButtons, 1000);
    });
    
    // クリーンアップ関数
    return () => {
      clearInterval(checkDifyLoaded);
      clearTimeout(timeoutTimer);
      clearTimeout(forceInitTimer);
      document.removeEventListener('DOMContentLoaded', applyCustomStyles);
    };
  }, [applyCustomStyles, addCustomCloseButtons, forceDifyInitialization, forceInitTimeout, scriptLoadTimeout, checkInterval]);
  
  // エラーメッセージを表示
  useEffect(() => {
    if (difyInitError) {
      console.error(`チャットボットの読み込みに失敗しました: ${difyInitError}`);
    }
  }, [difyInitError]);
  
  // このコンポーネントは何も表示しない
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
          addCustomCloseButtonsGlobal();
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
          addCustomCloseButtonsGlobal();
        }
      }, 500);
    } else {
      // 最後の手段 - DOMを直接操作
      const window = document.getElementById('shoukibo-jizoka-chatbot-window');
      if (window) {
        window.style.display = 'flex';
        addCustomCloseButtonsGlobal();
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
          addCustomCloseButtonsGlobal();
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
          addCustomCloseButtonsGlobal();
        }
      }, 500);
    } else {
      // 最後の手段 - DOMを直接操作
      const window = document.getElementById('shorikika-chatbot-window');
      if (window) {
        window.style.display = 'flex';
        addCustomCloseButtonsGlobal();
      } else {
        throw new Error("SubsidyChatbot.openShorikikaChat: 省力化投資補助金のチャットボタンが見つかりませんでした");
      }
    }
  } catch (error) {
    console.error("SubsidyChatbot.openShorikikaChat: チャットボットを開く際にエラーが発生しました:", error);
    toast.error("省力化投資補助金のチャットボットを開けませんでした。ページを再読み込みしてください。");
  }
};
