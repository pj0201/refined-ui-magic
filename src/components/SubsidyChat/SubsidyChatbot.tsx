
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

  // チャットボットスタイルの注入
  useEffect(() => {
    try {
      // スタイル要素がすでに存在するかチェック
      if (!stylesInjected) {
        console.log("SubsidyChatbot: チャットボットスタイルを注入します");
        
        // スタイル要素を作成
        const styleEl = document.createElement('style');
        styleEl.id = 'subsidy-chatbot-styles';
        styleEl.textContent = getChatbotStyles();
        document.head.appendChild(styleEl);
        
        setStylesInjected(true);
        console.log("SubsidyChatbot: チャットボットスタイルの注入が完了しました");
      }
    } catch (error) {
      console.error("SubsidyChatbot: スタイル注入中にエラーが発生しました:", error);
    }
  }, [stylesInjected]);

  // チャットボットスクリプトのロード状態を監視する
  useEffect(() => {
    const checkInterval = 500; // 500ms間隔でチェック
    const maxWaitTime = 60000; // 60秒を最大待機時間とする
    let totalElapsedTime = 0;
    
    console.log("SubsidyChatbot: チャットボットスクリプトのロード状態チェックを開始します");
    
    // 一般的なDifyスクリプトのロード状態を監視
    const checkDifyLoaded = setInterval(() => {
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
        
        clearInterval(checkDifyLoaded);
      }
      
      totalElapsedTime += checkInterval;
      if (totalElapsedTime >= maxWaitTime && !initialLoadAttempted) {
        setInitialLoadAttempted(true);
        if (!isDifyAvailable && !difyButtonExists) {
          console.warn("SubsidyChatbot: 一般的なDifyスクリプトのロードに60秒以上かかっています");
        }
      }
    }, checkInterval);

    // 小規模持続化補助金のDifyスクリプトのロード状態を監視
    const checkShoukiboLoaded = setInterval(() => {
      const isShoukiboAvailable = Boolean(window.shoukiboJizokaChatbot);
      const shoukiboButtonExists = Boolean(document.getElementById('shoukibo-jizoka-chatbot-button'));
      
      if ((isShoukiboAvailable || shoukiboButtonExists) && !shoukiboLoaded) {
        console.log("SubsidyChatbot: 小規模持続化補助金のDifyスクリプトが正常にロードされました");
        setShoukiboLoaded(true);
        
        // ボタンを非表示にする
        const button = document.getElementById('shoukibo-jizoka-chatbot-button');
        if (button) {
          button.style.display = 'none';
        }
        
        clearInterval(checkShoukiboLoaded);
      }
      
      if (totalElapsedTime >= maxWaitTime && !initialLoadAttempted) {
        if (!isShoukiboAvailable && !shoukiboButtonExists) {
          console.warn("SubsidyChatbot: 小規模持続化補助金のDifyスクリプトのロードに60秒以上かかっています");
        }
      }
    }, checkInterval);

    // 省力化投資補助金のDifyスクリプトのロード状態を監視
    const checkShorikikaLoaded = setInterval(() => {
      const isShorikikaAvailable = Boolean(window.shorikika_chatbot);
      const shorikikaButtonExists = Boolean(document.getElementById('shorikika-chatbot-button'));
      
      if ((isShorikikaAvailable || shorikikaButtonExists) && !shorikikaLoaded) {
        console.log("SubsidyChatbot: 省力化投資補助金のDifyスクリプトが正常にロードされました");
        setShorikikaLoaded(true);
        
        // ボタンを非表示にする
        const button = document.getElementById('shorikika-chatbot-button');
        if (button) {
          button.style.display = 'none';
        }
        
        clearInterval(checkShorikikaLoaded);
      }
      
      if (totalElapsedTime >= maxWaitTime && !initialLoadAttempted) {
        if (!isShorikikaAvailable && !shorikikaButtonExists) {
          console.warn("SubsidyChatbot: 省力化投資補助金のDifyスクリプトのロードに60秒以上かかっています");
        }
      }
    }, checkInterval);
    
    // 全てのチャットボットが正常にロードされたか確認
    const checkAllLoaded = setInterval(() => {
      if (difyLoaded && shoukiboLoaded && shorikikaLoaded) {
        console.log("SubsidyChatbot: すべてのチャットボットが正常にロードされました");
        clearInterval(checkAllLoaded);
        
        // チャットボットのスタイルを適用
        adjustChatbotStyles();
        
        // カスタム閉じるボタンを追加
        setTimeout(addCustomCloseButtons, 2000);
      }
      
      if (totalElapsedTime >= maxWaitTime && !initialLoadAttempted) {
        setInitialLoadAttempted(true);
        clearInterval(checkAllLoaded);
        
        // 少なくとも1つのチャットボットがロードされていれば成功とみなす
        if (difyLoaded || shoukiboLoaded || shorikikaLoaded) {
          console.log("SubsidyChatbot: 一部のチャットボットがロードされました");
          adjustChatbotStyles();
          
          // カスタム閉じるボタンを追加
          setTimeout(addCustomCloseButtons, 2000);
        } else {
          console.error("SubsidyChatbot: チャットボットのロードに失敗しました");
        }
      }
    }, checkInterval);
    
    // クリーンアップ関数
    return () => {
      clearInterval(checkDifyLoaded);
      clearInterval(checkShoukiboLoaded);
      clearInterval(checkShorikikaLoaded);
      clearInterval(checkAllLoaded);
    };
  }, [difyLoaded, shoukiboLoaded, shorikikaLoaded, initialLoadAttempted]);
  
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
          
          // サイズと位置を設定
          window.style.width = '24rem';
          window.style.height = '50rem';
          window.style.maxHeight = '90vh';
          window.style.maxWidth = 'calc(100vw - 32px)';
          window.style.bottom = '2rem';
          window.style.right = '1rem';
          window.style.zIndex = '99995';
          
          // ヘッダー要素を探す
          const header = window.querySelector('.dify-chatbot-window-header');
          if (header instanceof HTMLElement) {
            header.style.backgroundColor = '#1C64F2';
            header.style.color = 'white';
          }
          
          // Difyデフォルトの閉じるボタンを非表示
          const closeBtn = window.querySelector('.dify-chatbot-window-close-btn');
          if (closeBtn instanceof HTMLElement) {
            closeBtn.style.display = 'none';
          }
        }
      });
      
      // 青いチャットボタンを非表示にする
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
      
      /* レスポンシブ対応（共通） */
      @media (max-height: 700px) {
        #dify-chatbot-bubble-window,
        #shoukibo-jizoka-chatbot-window,
        #shorikika-chatbot-window {
          top: 20px !important;
          height: calc(100vh - 50px) !important;
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
    if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
      console.log("SubsidyChatbot.openShoukiboJizokaChat: チャットウィンドウは既に表示されています");
      return;
    }
    
    // 直接ボタンクリックを試みる
    const shoukiboButton = document.getElementById('shoukibo-jizoka-chatbot-button');
    if (shoukiboButton instanceof HTMLElement) {
      console.log("SubsidyChatbot.openShoukiboJizokaChat: 小規模持続化補助金ボタンを直接クリックします");
      shoukiboButton.click();
      
      // カスタム閉じるボタンを追加（少し待機してから）
      setTimeout(() => {
        addCustomCloseButton('shoukibo-jizoka-chatbot-window', 'shoukibo-close-button');
      }, 500);
      
      return;
    }
    
    // ChatbotInitializerと同様の処理
    if (window.shoukiboJizokaChatbot && typeof window.shoukiboJizokaChatbot.toggle === 'function') {
      console.log("SubsidyChatbot.openShoukiboJizokaChat: shoukiboJizokaChatbot APIを使用");
      window.shoukiboJizokaChatbot.toggle();
      
      // カスタム閉じるボタンを追加（少し待機してから）
      setTimeout(() => {
        addCustomCloseButton('shoukibo-jizoka-chatbot-window', 'shoukibo-close-button');
      }, 500);
    } else {
      throw new Error("SubsidyChatbot.openShoukiboJizokaChat: 小規模持続化補助金のチャットボタンが見つかりませんでした");
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
      
      // カスタム閉じるボタンを追加（少し待機してから）
      setTimeout(() => {
        addCustomCloseButton('shorikika-chatbot-window', 'shorikika-close-button');
      }, 500);
      
      return;
    }
    
    // ChatbotInitializerと同様の処理
    if (window.shorikika_chatbot && typeof window.shorikika_chatbot.toggle === 'function') {
      console.log("SubsidyChatbot.openShorikikaChat: shorikika_chatbot APIを使用");
      window.shorikika_chatbot.toggle();
      
      // カスタム閉じるボタンを追加（少し待機してから）
      setTimeout(() => {
        addCustomCloseButton('shorikika-chatbot-window', 'shorikika-close-button');
      }, 500);
    } else {
      throw new Error("SubsidyChatbot.openShorikikaChat: 省力化投資補助金のチャットボタンが見つかりませんでした");
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
