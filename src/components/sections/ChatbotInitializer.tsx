import { useEffect, useCallback, useState } from "react";
import { toast } from "sonner";
import { hideDifyBranding } from "../SubsidyChat/styles/chatButtonStyles";

/**
 * チャットボット初期化のためのカスタムフック
 */
export const useChatbotInitializer = () => {
  // 各チャットボットの読み込み状態
  const [isDifyLoaded, setIsDifyLoaded] = useState(false);
  const [isShoukiboLoaded, setIsShoukiboLoaded] = useState(false);
  const [isShorikikaLoaded, setIsShorikikaLoaded] = useState(false);

  // チャットボットのスタイルを設定
  const setupChatbotStyles = useCallback(() => {
    console.log("チャットボットのスタイルを設定します");
    
    // 既存のスタイルを削除（重複防止）
    const existingStyle = document.getElementById('chatbot-custom-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    const style = document.createElement("style");
    style.id = 'chatbot-custom-styles';
    style.innerHTML = `
      /* チャットボットのヘッダーに閉じるボタンを追加 */
      .dify-chatbot-bubble-window-header {
        position: relative !important;
      }
      
      /* カスタム閉じるボタンのスタイル */
      .custom-close-button {
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
      }
      
      .custom-close-button:hover {
        background-color: rgba(255, 255, 255, 0.4) !important;
      }

      /* チャットボットウィンドウの表示を確実にする */
      #dify-chatbot-bubble-window.dify-chatbot-bubble-window,
      #shoukibo-jizoka-chatbot-window.dify-chatbot-bubble-window,
      #shorikika-chatbot-window.dify-chatbot-bubble-window {
        display: flex !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      
      /* 青いボタンを非表示にする */
      #dify-chatbot-bubble-button,
      .dify-chatbot-bubble-button,
      [id^="dify-chatbot-bubble-button"],
      [class^="dify-chatbot-bubble-button"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // 一般チャットボットを開く関数
  const openChatbot = useCallback(() => {
    console.log("一般チャットボットを開きます (ChatbotInitializer)");
    
    try {
      // チャットボットウィンドウが既に表示されているか確認
      const chatWindow = document.getElementById("dify-chatbot-bubble-window");
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("一般チャットウィンドウは既に表示されています");
        return;
      }
      
      // 他のチャットウィンドウを閉じる
      const otherWindows = [
        document.getElementById("shoukibo-jizoka-chatbot-window"),
        document.getElementById("shorikika-chatbot-window")
      ];
      
      otherWindows.forEach(window => {
        if (window && window.style.display !== 'none') {
          window.style.display = 'none';
        }
      });
      
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
        
        // ヘッダーの作成
        const header = document.createElement("div");
        header.className = "dify-chatbot-bubble-window-header";
        header.style.cssText = `
          background-color: #7c3aed;
          color: white;
          padding: 15px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        `;
        
        // タイトルの作成
        const title = document.createElement("div");
        title.className = "dify-chatbot-bubble-window-title";
        title.textContent = "一般チャット";
        title.style.cssText = `
          font-size: 16px;
        `;
        
        // 閉じるボタンの作成
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "×";
        closeButton.className = "custom-close-button";
        closeButton.style.cssText = `
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
        `;
        closeButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (chatbotWindow) {
            // 複数のスタイルプロパティを設定して確実に非表示にする
            chatbotWindow.style.cssText = `
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
            const parent = chatbotWindow.parentElement;
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
            
            console.log("一般チャットウィンドウを閉じました");
          }
        };
        
        // コンテンツエリアの作成
        const content = document.createElement("div");
        content.className = "dify-chatbot-bubble-window-content";
        content.style.cssText = `
          flex: 1;
          overflow: hidden;
          position: relative;
        `;
        
        // iframeの作成（Difyチャットボットを埋め込む）
        const iframe = document.createElement("iframe");
        iframe.src = "https://api.dify.ai/embed/chat?from=embed";
        iframe.style.cssText = `
          width: 100%;
          height: 100%;
          border: none;
        `;
        
        // DOM構造の構築
        header.appendChild(title);
        header.appendChild(closeButton);
        content.appendChild(iframe);
        chatbotWindow.appendChild(header);
        chatbotWindow.appendChild(content);
        document.body.appendChild(chatbotWindow);
      }
      
      // ウィンドウを表示
      chatbotWindow.style.display = "flex";
      chatbotWindow.style.opacity = "1";
      chatbotWindow.style.visibility = "visible";
      
      console.log("一般チャットウィンドウを表示しました");
    } catch (error) {
      console.error("一般チャットボットの開始中にエラーが発生しました:", error);
    }
  }, []);
  
  // 小規模持続化補助金チャットボットを開く関数
  const startShoukiboJizokaChat = useCallback(() => {
    console.log("小規模持続化補助金チャットボットを開きます (ChatbotInitializer)");
    
    try {
      // チャットボットウィンドウが既に表示されているか確認
      const chatWindow = document.getElementById("shoukibo-jizoka-chatbot-window");
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("小規模持続化補助金チャットウィンドウは既に表示されています");
        return;
      }
      
      // 他のチャットウィンドウを閉じる
      const otherWindows = [
        document.getElementById("dify-chatbot-bubble-window"),
        document.getElementById("shorikika-chatbot-window")
      ];
      
      otherWindows.forEach(window => {
        if (window && window.style.display !== 'none') {
          window.style.display = 'none';
        }
      });
      
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
        
        // ヘッダーの作成
        const header = document.createElement("div");
        header.className = "dify-chatbot-bubble-window-header";
        header.style.cssText = `
          background-color: #7c3aed;
          color: white;
          padding: 15px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        `;
        
        // タイトルの作成
        const title = document.createElement("div");
        title.className = "dify-chatbot-bubble-window-title";
        title.textContent = "小規模持続化補助金チャット";
        title.style.cssText = `
          font-size: 16px;
        `;
        
        // 閉じるボタンの作成
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "×";
        closeButton.className = "custom-close-button";
        closeButton.style.cssText = `
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
        `;
        closeButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (chatbotWindow) {
            // 複数のスタイルプロパティを設定して確実に非表示にする
            chatbotWindow.style.cssText = `
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
            const parent = chatbotWindow.parentElement;
            if (parent) {
              parent.style.display = 'none';
              parent.style.opacity = '0';
              parent.style.visibility = 'hidden';
            }
            
            // DifyのAPIを使用して閉じる試み
            try {
              if (window.shoukiboJizokaChatbot && typeof window.shoukiboJizokaChatbot.toggle === 'function') {
                window.shoukiboJizokaChatbot.toggle();
              }
              
              if (window.DifyAI && typeof window.DifyAI.toggleUI === 'function') {
                window.DifyAI.toggleUI(false);
              }
            } catch (err) {
              console.error("Dify APIを使用した閉じる処理でエラー:", err);
            }
            
            console.log("小規模持続化補助金チャットウィンドウを閉じました");
          }
        };
        
        // コンテンツエリアの作成
        const content = document.createElement("div");
        content.className = "dify-chatbot-bubble-window-content";
        content.style.cssText = `
          flex: 1;
          overflow: hidden;
          position: relative;
        `;
        
        // iframeの作成（Difyチャットボットを埋め込む）
        const iframe = document.createElement("iframe");
        iframe.src = "https://api.dify.ai/embed/shoukibo-jizoka?from=embed";
        iframe.style.cssText = `
          width: 100%;
          height: 100%;
          border: none;
        `;
        
        // DOM構造の構築
        header.appendChild(title);
        header.appendChild(closeButton);
        content.appendChild(iframe);
        chatbotWindow.appendChild(header);
        chatbotWindow.appendChild(content);
        document.body.appendChild(chatbotWindow);
      }
      
      // ウィンドウを表示
      chatbotWindow.style.display = "flex";
      chatbotWindow.style.opacity = "1";
      chatbotWindow.style.visibility = "visible";
      
      console.log("小規模持続化補助金チャットウィンドウを表示しました");
    } catch (error) {
      console.error("小規模持続化補助金チャットボットの開始中にエラーが発生しました:", error);
    }
  }, []);
  
  // 省力化投資補助金チャットボットを開く関数
  const startShorikikaChat = useCallback(() => {
    console.log("省力化投資補助金チャットボットを開きます (ChatbotInitializer)");
    
    try {
      // チャットボットウィンドウが既に表示されているか確認
      const chatWindow = document.getElementById("shorikika-chatbot-window");
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("省力化投資補助金チャットウィンドウは既に表示されています");
        return;
      }
      
      // 他のチャットウィンドウを閉じる
      const otherWindows = [
        document.getElementById("dify-chatbot-bubble-window"),
        document.getElementById("shoukibo-jizoka-chatbot-window")
      ];
      
      otherWindows.forEach(window => {
        if (window && window.style.display !== 'none') {
          window.style.display = 'none';
        }
      });
      
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
        
        // ヘッダーの作成
        const header = document.createElement("div");
        header.className = "dify-chatbot-bubble-window-header";
        header.style.cssText = `
          background-color: #7c3aed;
          color: white;
          padding: 15px;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        `;
        
        // タイトルの作成
        const title = document.createElement("div");
        title.className = "dify-chatbot-bubble-window-title";
        title.textContent = "省力化投資補助金チャット";
        title.style.cssText = `
          font-size: 16px;
        `;
        
        // 閉じるボタンの作成
        const closeButton = document.createElement("button");
        closeButton.innerHTML = "×";
        closeButton.className = "custom-close-button";
        closeButton.style.cssText = `
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
        `;
        closeButton.onclick = function(e) {
          e.preventDefault();
          e.stopPropagation();
          if (chatbotWindow) {
            // 複数のスタイルプロパティを設定して確実に非表示にする
            chatbotWindow.style.cssText = `
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
            const parent = chatbotWindow.parentElement;
            if (parent) {
              parent.style.display = 'none';
              parent.style.opacity = '0';
              parent.style.visibility = 'hidden';
            }
            
            // DifyのAPIを使用して閉じる試み
            try {
              if (window.shorikika_chatbot && typeof window.shorikika_chatbot.toggle === 'function') {
                window.shorikika_chatbot.toggle();
              }
              
              if (window.DifyAI && typeof window.DifyAI.toggleUI === 'function') {
                window.DifyAI.toggleUI(false);
              }
            } catch (err) {
              console.error("Dify APIを使用した閉じる処理でエラー:", err);
            }
            
            console.log("省力化投資補助金チャットウィンドウを閉じました");
          }
        };
        
        // コンテンツエリアの作成
        const content = document.createElement("div");
        content.className = "dify-chatbot-bubble-window-content";
        content.style.cssText = `
          flex: 1;
          overflow: hidden;
          position: relative;
        `;
        
        // iframeの作成（Difyチャットボットを埋め込む）
        const iframe = document.createElement("iframe");
        iframe.src = "https://api.dify.ai/embed/shorikika?from=embed";
        iframe.style.cssText = `
          width: 100%;
          height: 100%;
          border: none;
        `;
        
        // DOM構造の構築
        header.appendChild(title);
        header.appendChild(closeButton);
        content.appendChild(iframe);
        chatbotWindow.appendChild(header);
        chatbotWindow.appendChild(content);
        document.body.appendChild(chatbotWindow);
      }
      
      // ウィンドウを表示
      chatbotWindow.style.display = "flex";
      chatbotWindow.style.opacity = "1";
      chatbotWindow.style.visibility = "visible";
      
      console.log("省力化投資補助金チャットウィンドウを表示しました");
    } catch (error) {
      console.error("省力化投資補助金チャットボットの開始中にエラーが発生しました:", error);
    }
  }, []);

  // チャットボットスクリプトを読み込む
  useEffect(() => {
    console.log("チャットボットスクリプトを読み込みます");
    
    // グローバル関数を設定
    window.openChatbot = openChatbot;
    window.startShoukiboJizokaChat = startShoukiboJizokaChat;
    window.startShorikikaChat = startShorikikaChat;
    
    // スタイルを設定
    setupChatbotStyles();
    
    // Difyのブランディングを非表示にする
    hideDifyBranding();
    
    // 読み込み完了を通知
    setIsDifyLoaded(true);
    setIsShoukiboLoaded(true);
    setIsShorikikaLoaded(true);
    
    return () => {
      // クリーンアップ
      delete window.openChatbot;
      delete window.startShoukiboJizokaChat;
      delete window.startShorikikaChat;
    };
  }, [openChatbot, startShoukiboJizokaChat, startShorikikaChat, setupChatbotStyles]);

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
