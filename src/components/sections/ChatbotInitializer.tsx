
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
    
    // 追加: 設定オブジェクト (名前を統一)
    difyChatbotConfig?: {
      token: string;
    };
    shoukiboJizokaChatbotConfig?: {
      token: string;
    };
    shorikikaChatbotConfig?: { // 修正: _を削除して命名を統一
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
    }
  }, []);
  
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
      /* 共通のチャットボットスタイル */
      #dify-chatbot-bubble-button,
      #shoukibo-jizoka-chatbot-button,
      #shorikika-chatbot-button {
        background-color: #1C64F2 !important;
        z-index: 2147483647 !important;
        width: 48px !important;
        height: 48px !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        border: none !important;
        transition: transform 0.2s, background-color 0.2s !important;
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
      }
      
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
      
      /* 閉じるボタンのスタイリング */
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
    `;
  };

  /**
   * 一般的なDifyチャットボットを開く関数
   */
  const openChatbot = useCallback(() => {
    try {
      console.log("一般的なDifyチャットボットを開く処理を開始します");
      
      // チャットウィンドウをチェック
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("チャットウィンドウは既に表示されています");
        return;
      }
      
      if (!isDifyLoaded) {
        console.warn("一般的なDifyスクリプトがロードされていません");
        toast.error("チャットボットの準備ができていません。しばらくお待ちいただくか、ページを再読み込みしてください。");
        return;
      }
      
      // 直接ボタンクリックを試みる
      const difyButton = document.getElementById('dify-chatbot-bubble-button');
      if (difyButton instanceof HTMLElement) {
        console.log("Difyボタンを直接クリックします");
        difyButton.click();
        return;
      }
      
      // ボタンがない場合はAPIを試す
      if (window.difyChatbot?.toggle) {
        window.difyChatbot.toggle();
        console.log("difyChatbot.toggleを使用してチャットボットを開きました");
      } else if (window.DifyAI?.toggleUI) {
        window.DifyAI.toggleUI(true);
        console.log("DifyAI.toggleUIを使用してチャットボットを開きました");
      } else {
        throw new Error("Difyのチャットボタンが見つからず、APIも利用できません");
      }
    } catch (error) {
      console.error("一般的なチャットボットを開く際にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, [isDifyLoaded]);

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
      
      // 直接ボタンクリックを試みる
      const shoukiboButton = document.getElementById('shoukibo-jizoka-chatbot-button');
      if (shoukiboButton instanceof HTMLElement) {
        console.log("小規模持続化補助金ボタンを直接クリックします");
        shoukiboButton.click();
        
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
      
      // 直接ボタンクリックを試みる
      const shorikikaButton = document.getElementById('shorikika-chatbot-button');
      if (shorikikaButton instanceof HTMLElement) {
        console.log("省力化投資補助金ボタンを直接クリックします");
        shorikikaButton.click();
        
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
    openChatbot,
    startShorikikaChat,
    startShoukiboJizokaChat,
    isDifyLoaded,
    isShoukiboLoaded,
    isShorikikaLoaded
  };
};
