
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

// Dify用の型定義
declare global {
  interface Window {
    difyChatbot?: {
      toggle: () => void;
      sendMessage: (message: string) => void;
      isOpen: boolean;
    };
    DifyAI?: {
      toggleUI: (show: boolean) => void;
      isOpen: () => boolean;
      sendMessage: (message: string) => void;
    };
    // 小規模持続化補助金のDify用オブジェクト
    shoukiboJizokaChatbot?: {
      toggle: () => void;
      sendMessage: (message: string) => void;
      isOpen: boolean;
    };
    // 省力化投資補助金のDify用オブジェクト
    shorikika_chatbot?: {
      toggle: () => void;
      sendMessage: (message: string) => void;
      isOpen: boolean;
    };
    
    // 設定オブジェクト
    difyChatbotConfig?: {
      token: string;
    };
    shoukiboJizokaChatbotConfig?: {
      token: string;
    };
    shorikikaChatbotConfig?: {
      token: string;
    };
  }
}

export const ChatbotInitializer = () => {
  const [isDifyLoaded, setIsDifyLoaded] = useState(false);
  const [isShoukiboLoaded, setIsShoukiboLoaded] = useState(false);
  const [isShorikikaLoaded, setIsShorikikaLoaded] = useState(false);
  const [loadingAttempted, setLoadingAttempted] = useState(false);
  
  // すべてのスクリプトとスタイルが読み込まれたことを確認
  useEffect(() => {
    // ページの読み込みが完了してから実行
    if (document.readyState === 'complete') {
      initChatbots();
    } else {
      window.addEventListener('load', initChatbots);
      return () => window.removeEventListener('load', initChatbots);
    }
    
    function initChatbots() {
      console.log("ページの読み込みが完了しました。チャットボットの初期化を開始します。");
      setLoadingAttempted(true);
      
      // チャットボットのスタイルをインポート
      const styleElement = document.getElementById('dify-chat-styles');
      if (styleElement) {
        styleElement.textContent = getChatStyles();
      }
      
      // カスタム閉じるボタンの実装
      setTimeout(addCustomCloseButtons, 2000);
    }
  }, []);
  
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
        if (header) {
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
  
  // チャットボットの読み込み状態を定期的に確認
  useEffect(() => {
    if (!loadingAttempted) return;
    
    const checkInterval = 500; // 500ms間隔でチェック
    const maxCheckTime = 30000; // 30秒を最大待機時間とする
    let elapsedTime = 0;
    
    console.log("チャットボットの読み込み状態の監視を開始します");
    
    // 一般的なDifyスクリプトのロード状態を監視
    const checkDifyLoaded = setInterval(() => {
      const difyAvailable = !!(window.difyChatbot || window.DifyAI);
      if (difyAvailable) {
        console.log("一般的なDifyスクリプトが正常にロードされました");
        setIsDifyLoaded(true);
        clearInterval(checkDifyLoaded);
      } else {
        elapsedTime += checkInterval;
        if (elapsedTime >= maxCheckTime && !isDifyLoaded) {
          console.warn("一般的なDifyスクリプトのロードがタイムアウトしました");
          // ボタン要素を手動で探してみる
          const difyButton = document.getElementById('dify-chatbot-bubble-button');
          if (difyButton) {
            console.log("Difyボタンは存在しますが、APIがロードされていません");
            setIsDifyLoaded(true); // ボタンがあれば使用可能とする
          }
          clearInterval(checkDifyLoaded);
        }
      }
    }, checkInterval);

    // 小規模持続化補助金のDifyスクリプトのロード状態を監視
    const checkShoukiboLoaded = setInterval(() => {
      const shoukiboAvailable = !!window.shoukiboJizokaChatbot;
      const shoukiboButtonAvailable = !!document.getElementById('shoukibo-jizoka-chatbot-button');
      
      if (shoukiboAvailable || shoukiboButtonAvailable) {
        console.log("小規模持続化補助金のDifyスクリプトが正常にロードされました");
        setIsShoukiboLoaded(true);
        clearInterval(checkShoukiboLoaded);
        
        // ボタンを非表示にする
        const button = document.getElementById('shoukibo-jizoka-chatbot-button');
        if (button) {
          button.style.display = 'none';
        }
      } else {
        elapsedTime += checkInterval;
        if (elapsedTime >= maxCheckTime && !isShoukiboLoaded) {
          console.warn("小規模持続化補助金のDifyスクリプトのロードがタイムアウトしました");
          clearInterval(checkShoukiboLoaded);
        }
      }
    }, checkInterval);

    // 省力化投資補助金のDifyスクリプトのロード状態を監視
    const checkShorikikaLoaded = setInterval(() => {
      const shorikikaAvailable = !!window.shorikika_chatbot;
      const shorikikaButtonAvailable = !!document.getElementById('shorikika-chatbot-button');
      
      if (shorikikaAvailable || shorikikaButtonAvailable) {
        console.log("省力化投資補助金のDifyスクリプトが正常にロードされました");
        setIsShorikikaLoaded(true);
        clearInterval(checkShorikikaLoaded);
        
        // ボタンを非表示にする
        const button = document.getElementById('shorikika-chatbot-button');
        if (button) {
          button.style.display = 'none';
        }
      } else {
        elapsedTime += checkInterval;
        if (elapsedTime >= maxCheckTime && !isShorikikaLoaded) {
          console.warn("省力化投資補助金のDifyスクリプトのロードがタイムアウトしました");
          clearInterval(checkShorikikaLoaded);
        }
      }
    }, checkInterval);

    return () => {
      clearInterval(checkDifyLoaded);
      clearInterval(checkShoukiboLoaded);
      clearInterval(checkShorikikaLoaded);
    };
  }, [loadingAttempted, isDifyLoaded, isShoukiboLoaded, isShorikikaLoaded]);

  /**
   * チャットスタイルを取得する関数
   */
  const getChatStyles = () => {
    return `
      /* チャットウィンドウのスタイル */
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
      
      /* ヘッダーのスタイリング */
      .dify-chatbot-window-header {
        background-color: #1C64F2 !important;
        padding: 0.75rem !important;
        color: white !important;
        position: relative !important;
        z-index: 99996 !important;
      }
      
      /* デフォルトの閉じるボタンを非表示 */
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
      
      /* 入力エリアのスタイリング */
      .dify-chatbot-window-footer {
        position: sticky !important;
        bottom: 0 !important;
        background-color: white !important;
        padding: 12px !important;
        z-index: 99996 !important;
        box-shadow: 0 -2px 10px rgba(0,0,0,0.1) !important;
        margin-top: auto !important;
      }
      
      /* レスポンシブ対応 */
      @media (max-height: 700px) {
        #dify-chatbot-bubble-window,
        #shoukibo-jizoka-chatbot-window,
        #shorikika-chatbot-window {
          top: 20px !important;
          height: calc(100vh - 50px) !important;
        }
      }
      
      /* 青いアイコンを非表示にする */
      #dify-chatbot-bubble-button,
      #shoukibo-jizoka-chatbot-button,
      #shorikika-chatbot-button {
        display: none !important;
      }
    `;
  };

  /**
   * 小規模持続化補助金チャットボットを開く関数
   */
  const startShoukiboJizokaChat = useCallback(() => {
    try {
      console.log("小規模持続化補助金のチャットボットを開く処理を開始します");
      
      // チャットウィンドウをチェック
      const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("小規模持続化補助金のチャットウィンドウは既に表示されています");
        return;
      }
      
      if (!isShoukiboLoaded) {
        console.warn("小規模持続化補助金のDifyスクリプトがロードされていません");
        toast.error("小規模持続化補助金のチャットボットの準備ができていません。しばらくお待ちいただくか、ページを再読み込みしてください。");
        return;
      }
      
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
      
      // 直接ボタンクリックを試みる
      const shoukiboButton = document.getElementById('shoukibo-jizoka-chatbot-button');
      if (shoukiboButton instanceof HTMLElement) {
        console.log("小規模持続化補助金ボタンを直接クリックします");
        shoukiboButton.click();
        
        // カスタム閉じるボタンを追加
        setTimeout(addCustomCloseButtons, 500);
        
        // 成功メッセージ
        setTimeout(() => {
          toast.success("小規模持続化補助金のチャットボットが開きました。ご質問をどうぞ。");
        }, 500);
        return;
      }
      
      // ボタンがない場合はAPIを試す
      if (window.shoukiboJizokaChatbot?.toggle) {
        window.shoukiboJizokaChatbot.toggle();
        console.log("shoukiboJizokaChatbot.toggleを使用してチャットボットを開きました");
        
        // カスタム閉じるボタンを追加
        setTimeout(addCustomCloseButtons, 500);
        
        // メッセージを送信（少し待機してから）
        setTimeout(() => {
          if (window.shoukiboJizokaChatbot?.sendMessage) {
            window.shoukiboJizokaChatbot.sendMessage("小規模持続化補助金について教えてください");
            console.log("小規模持続化補助金の初期メッセージを送信しました");
          }
        }, 1000);
      } else {
        throw new Error("小規模持続化補助金のチャットボタンが見つからず、APIも利用できません");
      }
    } catch (error) {
      console.error("小規模持続化補助金のチャットボットを開く際にエラーが発生しました:", error);
      toast.error("小規模持続化補助金のチャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, [isShoukiboLoaded]);

  /**
   * 省力化投資補助金チャットボットを開く関数
   */
  const startShorikikaChat = useCallback(() => {
    try {
      console.log("省力化投資補助金のチャットボットを開く処理を開始します");
      
      // チャットウィンドウをチェック
      const chatWindow = document.getElementById('shorikika-chatbot-window');
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("省力化投資補助金のチャットウィンドウは既に表示されています");
        return;
      }
      
      if (!isShorikikaLoaded) {
        console.warn("省力化投資補助金のDifyスクリプトがロードされていません");
        toast.error("省力化投資補助金のチャットボットの準備ができていません。しばらくお待ちいただくか、ページを再読み込みしてください。");
        return;
      }
      
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
      
      // 直接ボタンクリックを試みる
      const shorikikaButton = document.getElementById('shorikika-chatbot-button');
      if (shorikikaButton instanceof HTMLElement) {
        console.log("省力化投資補助金ボタンを直接クリックします");
        shorikikaButton.click();
        
        // カスタム閉じるボタンを追加
        setTimeout(addCustomCloseButtons, 500);
        
        // 成功メッセージ
        setTimeout(() => {
          toast.success("省力化投資補助金のチャットボットが開きました。ご質問をどうぞ。");
        }, 500);
        return;
      }
      
      // ボタンがない場合はAPIを試す
      if (window.shorikika_chatbot?.toggle) {
        window.shorikika_chatbot.toggle();
        console.log("shorikika_chatbot.toggleを使用してチャットボットを開きました");
        
        // カスタム閉じるボタンを追加
        setTimeout(addCustomCloseButtons, 500);
        
        // メッセージを送信（少し待機してから）
        setTimeout(() => {
          if (window.shorikika_chatbot?.sendMessage) {
            window.shorikika_chatbot.sendMessage("省力化投資補助金について教えてください");
            console.log("省力化投資補助金の初期メッセージを送信しました");
          }
        }, 1000);
      } else {
        throw new Error("省力化投資補助金のチャットボタンが見つからず、APIも利用できません");
      }
    } catch (error) {
      console.error("省力化投資補助金のチャットボットを開く際にエラーが発生しました:", error);
      toast.error("省力化投資補助金のチャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, [isShorikikaLoaded]);
  
  return { 
    startShorikikaChat,
    startShoukiboJizokaChat,
    isDifyLoaded,
    isShoukiboLoaded,
    isShorikikaLoaded
  };
};
