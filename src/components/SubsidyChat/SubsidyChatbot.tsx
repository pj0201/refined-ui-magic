
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
      }
      
      if (totalElapsedTime >= maxWaitTime && !initialLoadAttempted) {
        setInitialLoadAttempted(true);
        clearInterval(checkAllLoaded);
        
        // 少なくとも1つのチャットボットがロードされていれば成功とみなす
        if (difyLoaded || shoukiboLoaded || shorikikaLoaded) {
          console.log("SubsidyChatbot: 一部のチャットボットがロードされました");
          adjustChatbotStyles();
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
          
          // 閉じるボタンを探す
          const closeBtn = window.querySelector('.dify-chatbot-window-close-btn');
          if (closeBtn instanceof HTMLElement) {
            closeBtn.style.position = 'absolute';
            closeBtn.style.top = '10px';
            closeBtn.style.right = '10px';
          }
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
      
      /* 閉じるボタンのスタイリング（共通） */
      .dify-chatbot-window-close-btn {
        position: absolute !important;
        top: 10px !important;
        right: 10px !important;
        width: 24px !important;
        height: 24px !important;
        background: transparent !important;
        border: none !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        z-index: 99999 !important;
        visibility: visible !important;
        opacity: 1 !important;
      }

      .dify-chatbot-window-close-btn:hover {
        background: rgba(255, 255, 255, 0.2) !important;
      }

      .dify-chatbot-window-close-btn svg {
        width: 18px !important;
        height: 18px !important;
        color: white !important;
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
    `;
  };
  
  return null;
};

/**
 * 一般的なDifyチャットボットを開く関数
 * ※互換性のため残していますが、新しいChatbotInitializerを使用することを推奨
 */
export const openChatbot = () => {
  try {
    console.log("SubsidyChatbot.openChatbot: Difyチャットボットを開きます");
    
    // チャットウィンドウをチェック
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
      console.log("SubsidyChatbot.openChatbot: チャットウィンドウは既に表示されています");
      return;
    }
    
    // 直接ボタンクリックを試みる
    const difyButton = document.getElementById('dify-chatbot-bubble-button');
    if (difyButton instanceof HTMLElement) {
      console.log("SubsidyChatbot.openChatbot: Difyボタンを直接クリックします");
      difyButton.click();
      return;
    }
    
    // Difyチャットボットを開く
    if (window.difyChatbot && typeof window.difyChatbot.toggle === 'function') {
      console.log("SubsidyChatbot.openChatbot: difyChatbot APIを使用");
      window.difyChatbot.toggle();
    } else if (window.DifyAI && typeof window.DifyAI.toggleUI === 'function') {
      console.log("SubsidyChatbot.openChatbot: DifyAI APIを使用");
      window.DifyAI.toggleUI(true);
    } else {
      throw new Error("SubsidyChatbot.openChatbot: Difyのチャットボタンが見つかりませんでした");
    }
  } catch (error) {
    console.error("SubsidyChatbot.openChatbot: チャットボットを開く際にエラーが発生しました:", error);
    toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
  }
};
