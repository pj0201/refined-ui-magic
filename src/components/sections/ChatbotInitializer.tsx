
import { useEffect, useCallback, useState } from "react";
import { toast } from "sonner";
import { hideDifyBranding } from "../SubsidyChat/styles/chatButtonStyles";
import { useChatWindowAdjuster } from "../SubsidyChat/hooks/useChatWindowAdjuster";

/**
 * チャットボット初期化のためのカスタムフック
 */
export const useChatbotInitializer = () => {
  // 各チャットボットの読み込み状態
  const [isDifyLoaded, setIsDifyLoaded] = useState(false);
  const [isShoukiboLoaded, setIsShoukiboLoaded] = useState(false);
  const [isShorikikaLoaded, setIsShorikikaLoaded] = useState(false);
  
  // チャットウィンドウアジャスター
  useChatWindowAdjuster(isDifyLoaded || isShoukiboLoaded || isShorikikaLoaded);

  // チャットウィンドウを安全に閉じる関数
  const safelyCloseWindow = useCallback((windowId: string) => {
    try {
      const chatWindow = document.getElementById(windowId);
      if (chatWindow) {
        // 安全な閉じ方のために複数のプロパティを設定
        chatWindow.style.cssText = `
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          z-index: -1 !important;
        `;
        chatWindow.classList.add('dify-hidden');
        
        console.log(`チャットウィンドウ ${windowId} を安全に閉じました`);
      }
    } catch (error) {
      console.error(`チャットウィンドウ ${windowId} を閉じる際にエラーが発生しました:`, error);
    }
  }, []);

  // 青いボタンを非表示にする関数
  const hideBlueButton = useCallback(() => {
    try {
      const style = document.createElement('style');
      style.textContent = `
      /* 青いボタンを完全に非表示 */
      #dify-chatbot-bubble-button,
      .dify-chatbot-bubble-button,
      [id^="dify-chatbot-bubble-button"],
      [class^="dify-chatbot-bubble-button"],
      [id*="dify-chatbot-bubble-button"],
      [class*="chatbot-bubble-button"] {
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
      
      /* プレーンコードテキストを非表示 */
      #shoukibo-jizoka-chatbot-window > pre,
      #shorikika-chatbot-window > pre,
      #dify-chatbot-bubble-window > pre {
        display: none !important;
      }
      `;
      document.head.appendChild(style);
      console.log("青いボタンを非表示にしました");
    } catch (error) {
      console.error("青いボタンの非表示化中にエラーが発生しました:", error);
    }
  }, []);

  // チャットボットのスタイルをセットアップする関数
  const setupChatbotStyles = useCallback(() => {
    try {
      const style = document.createElement('style');
      style.textContent = `
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
  }, []);
  
  // カスタム閉じるボタンを追加する関数
  const addCustomCloseButtons = useCallback(() => {
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
          closeButton.setAttribute('aria-label', 'チャットを閉じる');
          closeButton.onclick = function(e) {
            e.preventDefault();
            e.stopPropagation();
            safelyCloseWindow(id);
          };
          header.appendChild(closeButton);
          console.log(`${id} に閉じるボタンを追加しました`);
        }
      });
    } catch (error) {
      console.error("カスタム閉じるボタンの追加中にエラーが発生しました:", error);
    }
  }, [safelyCloseWindow]);

  // 他のチャットウィンドウを閉じる関数
  const closeOtherChatWindows = useCallback((keepWindowId: string) => {
    try {
      const windowIds = [
        'dify-chatbot-bubble-window',
        'shoukibo-jizoka-chatbot-window',
        'shorikika-chatbot-window'
      ];
      
      windowIds.forEach(id => {
        if (id !== keepWindowId) {
          safelyCloseWindow(id);
        }
      });
    } catch (error) {
      console.error("他のチャットウィンドウを閉じる際にエラーが発生しました:", error);
    }
  }, [safelyCloseWindow]);

  // チャットボット用のHTMLコンテンツを作成する関数
  const createChatWindowContent = useCallback((title: string, iframeSrc: string) => {
    const htmlContent = `
      <div class="dify-chatbot-bubble-window-header" style="
        background-color: #1C64F2;
        color: white;
        padding: 15px;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
      ">
        <div class="dify-chatbot-bubble-window-title" style="font-size: 16px;">${title}</div>
        <button class="custom-close-button" aria-label="チャットを閉じる" style="
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
          z-index: 10000 !important;
        ">×</button>
      </div>
      <div class="dify-chatbot-bubble-window-content" style="
        flex: 1;
        overflow: hidden;
        position: relative;
      ">
        <iframe 
          src="${iframeSrc}" 
          style="width: 100%; height: 100%; border: none;"
          allow="microphone"
        ></iframe>
      </div>
    `;
    return htmlContent;
  }, []);

  // 一般チャットボットを開く関数
  const openChatbot = useCallback(() => {
    console.log("一般チャットボットを開きます (ChatbotInitializer)");
    
    try {
      // 他のチャットウィンドウを閉じる
      closeOtherChatWindows('dify-chatbot-bubble-window');
      
      // チャットボットウィンドウが既に表示されているか確認
      const chatWindow = document.getElementById("dify-chatbot-bubble-window");
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("一般チャットウィンドウは既に表示されています");
        return;
      }
      
      // 既存のチャットウィンドウがあるか確認
      let chatbotWindow = document.getElementById("dify-chatbot-bubble-window");
      
      // なければ新しく作成
      if (!chatbotWindow) {
        console.log("一般チャットウィンドウを新規作成します");
        
        // ウィンドウの作成
        chatbotWindow = document.createElement("div");
        chatbotWindow.id = "dify-chatbot-bubble-window";
        chatbotWindow.className = "dify-chatbot-bubble-window";
        chatbotWindow.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 380px;
          height: 600px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          background-color: #fff;
        `;
        
        // HTMLコンテンツを設定
        const iframeSrc = "https://udify.app/chatbot/UlZEhca44ZNfJtdS";
        chatbotWindow.innerHTML = createChatWindowContent("一般チャット", iframeSrc);
        
        // DOMに追加
        document.body.appendChild(chatbotWindow);
        
        // 閉じるボタンのイベントリスナーを追加
        const closeButton = chatbotWindow.querySelector('.custom-close-button');
        if (closeButton) {
          closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            safelyCloseWindow("dify-chatbot-bubble-window");
          });
        }
      }
      
      // ウィンドウを表示
      chatbotWindow.style.display = "flex";
      chatbotWindow.style.opacity = "1";
      chatbotWindow.style.visibility = "visible";
      chatbotWindow.classList.remove('dify-hidden');
      
      // DOMにウィンドウが存在することを確認
      if (!document.body.contains(chatbotWindow)) {
        document.body.appendChild(chatbotWindow);
      }
      
      console.log("一般チャットウィンドウを表示しました");
    } catch (error) {
      console.error("一般チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, [closeOtherChatWindows, safelyCloseWindow, createChatWindowContent]);
  
  // 小規模持続化補助金チャットボットを開く関数
  const startShoukiboJizokaChat = useCallback(() => {
    console.log("小規模持続化補助金チャットボットを開きます (ChatbotInitializer)");
    
    try {
      // 他のチャットウィンドウを閉じる
      closeOtherChatWindows('shoukibo-jizoka-chatbot-window');
      
      // チャットボットウィンドウが既に表示されているか確認
      const chatWindow = document.getElementById("shoukibo-jizoka-chatbot-window");
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("小規模持続化補助金チャットウィンドウは既に表示されています");
        return;
      }
      
      // 既存のチャットウィンドウがあるか確認
      let chatbotWindow = document.getElementById("shoukibo-jizoka-chatbot-window");
      
      // なければ新しく作成
      if (!chatbotWindow) {
        console.log("小規模持続化補助金チャットウィンドウを新規作成します");
        
        // ウィンドウの作成
        chatbotWindow = document.createElement("div");
        chatbotWindow.id = "shoukibo-jizoka-chatbot-window";
        chatbotWindow.className = "dify-chatbot-bubble-window";
        chatbotWindow.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 380px;
          height: 600px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          background-color: #fff;
        `;
        
        // HTMLコンテンツを設定
        const iframeSrc = "https://udify.app/chatbot/jpVCvswMb5KaQFLk";
        chatbotWindow.innerHTML = createChatWindowContent("小規模持続化補助金チャット", iframeSrc);
        
        // DOMに追加
        document.body.appendChild(chatbotWindow);
        
        // 閉じるボタンのイベントリスナーを追加
        const closeButton = chatbotWindow.querySelector('.custom-close-button');
        if (closeButton) {
          closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            safelyCloseWindow("shoukibo-jizoka-chatbot-window");
          });
        }
      }
      
      // ウィンドウを表示
      chatbotWindow.style.display = "flex";
      chatbotWindow.style.opacity = "1";
      chatbotWindow.style.visibility = "visible";
      chatbotWindow.classList.remove('dify-hidden');
      
      // DOMにウィンドウが存在することを確認
      if (!document.body.contains(chatbotWindow)) {
        document.body.appendChild(chatbotWindow);
      }
      
      console.log("小規模持続化補助金チャットウィンドウを表示しました");
    } catch (error) {
      console.error("小規模持続化補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, [closeOtherChatWindows, safelyCloseWindow, createChatWindowContent]);
  
  // 省力化投資補助金チャットボットを開く関数
  const startShorikikaChat = useCallback(() => {
    console.log("省力化投資補助金チャットボットを開きます (ChatbotInitializer)");
    
    try {
      // 他のチャットウィンドウを閉じる
      closeOtherChatWindows('shorikika-chatbot-window');
      
      // チャットボットウィンドウが既に表示されているか確認
      const chatWindow = document.getElementById("shorikika-chatbot-window");
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("省力化投資補助金チャットウィンドウは既に表示されています");
        return;
      }
      
      // 既存のチャットウィンドウがあるか確認
      let chatbotWindow = document.getElementById("shorikika-chatbot-window");
      
      // なければ新しく作成
      if (!chatbotWindow) {
        console.log("省力化投資補助金チャットウィンドウを新規作成します");
        
        // ウィンドウの作成
        chatbotWindow = document.createElement("div");
        chatbotWindow.id = "shorikika-chatbot-window";
        chatbotWindow.className = "dify-chatbot-bubble-window";
        chatbotWindow.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 380px;
          height: 600px;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2);
          z-index: 9999;
          display: flex;
          flex-direction: column;
          background-color: #fff;
        `;
        
        // HTMLコンテンツを設定
        const iframeSrc = "https://udify.app/chatbot/kAwDqVSCnjM6ZfEY";
        chatbotWindow.innerHTML = createChatWindowContent("省力化投資補助金チャット", iframeSrc);
        
        // DOMに追加
        document.body.appendChild(chatbotWindow);
        
        // 閉じるボタンのイベントリスナーを追加
        const closeButton = chatbotWindow.querySelector('.custom-close-button');
        if (closeButton) {
          closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            safelyCloseWindow("shorikika-chatbot-window");
          });
        }
      }
      
      // ウィンドウを表示
      chatbotWindow.style.display = "flex";
      chatbotWindow.style.opacity = "1";
      chatbotWindow.style.visibility = "visible";
      chatbotWindow.classList.remove('dify-hidden');
      
      // DOMにウィンドウが存在することを確認
      if (!document.body.contains(chatbotWindow)) {
        document.body.appendChild(chatbotWindow);
      }
      
      console.log("省力化投資補助金チャットウィンドウを表示しました");
    } catch (error) {
      console.error("省力化投資補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, [closeOtherChatWindows, safelyCloseWindow, createChatWindowContent]);

  // チャットボットスクリプトを読み込む
  useEffect(() => {
    console.log("チャットボットスクリプトを読み込みます");
    
    // グローバル関数を設定
    window.openChatbot = openChatbot;
    window.startShoukiboJizokaChat = startShoukiboJizokaChat;
    window.startShorikikaChat = startShorikikaChat;
    
    // 後方互換性のための関数もセット
    window.openSmallBusinessChatbot = startShoukiboJizokaChat;
    window.openSubsidyChatbot = startShorikikaChat;
    
    // スタイルを設定
    setupChatbotStyles();
    
    // 青いボタンを非表示にする
    hideBlueButton();
    
    // Difyのブランディングを非表示にする
    hideDifyBranding();
    
    // 読み込み完了を通知
    setIsDifyLoaded(true);
    setIsShoukiboLoaded(true);
    setIsShorikikaLoaded(true);
    
    // 定期的に閉じるボタンを追加（初期化直後とそれ以降）
    const initialTimer = setTimeout(addCustomCloseButtons, 1000);
    
    const timers = [];
    for (let i = 1; i <= 5; i++) {
      const timer = setTimeout(addCustomCloseButtons, i * 2000);
      timers.push(timer);
    }
    
    return () => {
      // クリーンアップ
      clearTimeout(initialTimer);
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [openChatbot, startShoukiboJizokaChat, startShorikikaChat, setupChatbotStyles, hideBlueButton, addCustomCloseButtons]);

  return {
    isDifyLoaded,
    isShoukiboLoaded,
    isShorikikaLoaded,
    openChatbot,
    startShoukiboJizokaChat,
    startShorikikaChat
  };
};

/**
 * チャットボット初期化コンポーネント
 * このコンポーネントはチャットボットの初期化と制御を担当します
 */
export const ChatbotInitializer: React.FC = () => {
  // カスタムフックを使用してチャットボットを初期化
  const chatbotState = useChatbotInitializer();
  
  // このコンポーネントは何も表示しない
  return null;
};
