import { useEffect, useCallback, useState } from "react";
import { toast } from "sonner";

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
    
    const style = document.createElement("style");
    style.innerHTML = `
      /* チャットボットのヘッダーに閉じるボタンを追加 */
      .dify-chatbot-bubble-window-header {
        position: relative;
      }
      
      /* カスタム閉じるボタンのスタイル */
      .custom-close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.3s;
      }
      
      .custom-close-button:hover {
        background-color: rgba(255, 255, 255, 0.4);
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
      
      // ボタンを探して直接クリック
      const chatButton = document.getElementById("dify-chatbot-bubble-button");
      if (chatButton) {
        console.log("一般チャットボタンをクリックします");
        
        // クリックイベントを強制的に発生させる
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        chatButton.dispatchEvent(clickEvent);
        
        // 閉じるボタンを追加
        setTimeout(function() {
          const header = document.querySelector('#dify-chatbot-bubble-window .dify-chatbot-bubble-window-header');
          if (header && !header.querySelector('.custom-close-button')) {
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '×';
            closeButton.className = 'custom-close-button';
            closeButton.onclick = function(e) {
              e.preventDefault();
              e.stopPropagation();
              const chatWindow = document.getElementById('dify-chatbot-bubble-window');
              if (chatWindow) chatWindow.style.display = 'none';
            };
            header.appendChild(closeButton);
          }
        }, 500);
      } else {
        console.error("一般チャットボタンが見つかりませんでした");
        toast.error("チャットボットの読み込みに失敗しました。ページを再読み込みしてください。");
      }
    } catch (error) {
      console.error("一般チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
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
      
      // ボタンを探して直接クリック
      const chatButton = document.getElementById("shoukibo-jizoka-chatbot-button");
      if (chatButton) {
        console.log("小規模持続化補助金ボタンをクリックします");
        
        // クリックイベントを強制的に発生させる
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        chatButton.dispatchEvent(clickEvent);
        
        // 閉じるボタンを追加
        setTimeout(function() {
          const header = document.querySelector('#shoukibo-jizoka-chatbot-window .dify-chatbot-bubble-window-header');
          if (header && !header.querySelector('.custom-close-button')) {
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '×';
            closeButton.className = 'custom-close-button';
            closeButton.onclick = function(e) {
              e.preventDefault();
              e.stopPropagation();
              const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
              if (chatWindow) chatWindow.style.display = 'none';
            };
            header.appendChild(closeButton);
          }
        }, 500);
      } else {
        console.error("小規模持続化補助金のチャットボタンが見つかりませんでした");
        toast.error("チャットボットの読み込みに失敗しました。ページを再読み込みしてください。");
      }
    } catch (error) {
      console.error("小規模持続化補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
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
      
      // ボタンを探して直接クリック
      const chatButton = document.getElementById("shorikika-chatbot-button");
      if (chatButton) {
        console.log("省力化投資補助金ボタンをクリックします");
        
        // クリックイベントを強制的に発生させる
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        chatButton.dispatchEvent(clickEvent);
        
        // 閉じるボタンを追加
        setTimeout(function() {
          const header = document.querySelector('#shorikika-chatbot-window .dify-chatbot-bubble-window-header');
          if (header && !header.querySelector('.custom-close-button')) {
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '×';
            closeButton.className = 'custom-close-button';
            closeButton.onclick = function(e) {
              e.preventDefault();
              e.stopPropagation();
              const chatWindow = document.getElementById('shorikika-chatbot-window');
              if (chatWindow) chatWindow.style.display = 'none';
            };
            header.appendChild(closeButton);
          }
        }, 500);
      } else {
        console.error("省力化投資補助金のチャットボタンが見つかりませんでした");
        toast.error("チャットボットの読み込みに失敗しました。ページを再読み込みしてください。");
      }
    } catch (error) {
      console.error("省力化投資補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);
  
  // チャットボットの読み込み状態を監視
  useEffect(() => {
    console.log("チャットボットの読み込み状態を監視します");
    
    // スタイルの設定
    setupChatbotStyles();
    
    // 一般チャットボットの読み込み状態を確認
    const checkDifyLoaded = setInterval(() => {
      const difyButton = document.getElementById("dify-chatbot-bubble-button");
      if (difyButton) {
        console.log("一般チャットボットが読み込まれました");
        setIsDifyLoaded(true);
        clearInterval(checkDifyLoaded);
      }
    }, 1000);
    
    // 小規模持続化補助金チャットボットの読み込み状態を確認
    const checkShoukiboLoaded = setInterval(() => {
      const shoukiboButton = document.getElementById("shoukibo-jizoka-chatbot-button");
      if (shoukiboButton) {
        console.log("小規模持続化補助金チャットボットが読み込まれました");
        setIsShoukiboLoaded(true);
        clearInterval(checkShoukiboLoaded);
      }
    }, 1000);
    
    // 省力化投資補助金チャットボットの読み込み状態を確認
    const checkShorikikaLoaded = setInterval(() => {
      const shorikikaButton = document.getElementById("shorikika-chatbot-button");
      if (shorikikaButton) {
        console.log("省力化投資補助金チャットボットが読み込まれました");
        setIsShorikikaLoaded(true);
        clearInterval(checkShorikikaLoaded);
      }
    }, 1000);
    
    // クリーンアップ関数
    return () => {
      clearInterval(checkDifyLoaded);
      clearInterval(checkShoukiboLoaded);
      clearInterval(checkShorikikaLoaded);
    };
  }, [setupChatbotStyles]);
  
  // グローバル関数を設定
  useEffect(() => {
    console.log("ChatbotInitializer: グローバル関数を設定します");
    
    // 一般チャットボット用のグローバル関数
    window.openChatbot = openChatbot;
    
    // 小規模持続化補助金チャットボット用のグローバル関数
    window.startShoukiboJizokaChat = startShoukiboJizokaChat;
    window.openSmallBusinessChatbot = startShoukiboJizokaChat; // 後方互換性のため
    
    // 省力化投資補助金チャットボット用のグローバル関数
    window.startShorikikaChat = startShorikikaChat;
    window.openSubsidyChatbot = startShorikikaChat; // 後方互換性のため
    
    return () => {
      // クリーンアップ時にグローバル関数を削除
      delete window.openChatbot;
      delete window.startShoukiboJizokaChat;
      delete window.openSmallBusinessChatbot;
      delete window.startShorikikaChat;
      delete window.openSubsidyChatbot;
    };
  }, [openChatbot, startShoukiboJizokaChat, startShorikikaChat]);
  
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
