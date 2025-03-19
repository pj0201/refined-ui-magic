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
      
      /* 下部の閉じるボタンを非表示にする */
      .dify-chatbot-bubble-window .dify-chatbot-bubble-window-close-button {
        display: none !important;
      }
      
      /* 最下段の丸い青いボタンを非表示にする */
      #dify-chatbot-bubble-button,
      .dify-chatbot-bubble-button {
        display: none !important;
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
        
        // ウィンドウを強制的に表示
        setTimeout(function() {
          const chatWindow = document.getElementById("dify-chatbot-bubble-window");
          if (chatWindow) {
            chatWindow.style.display = 'flex';
            chatWindow.style.opacity = '1';
            chatWindow.style.visibility = 'visible';
          }
          
          // 閉じるボタンを追加
          const header = document.querySelector('#dify-chatbot-bubble-window .dify-chatbot-bubble-window-header');
          if (header) {
            // 既存の閉じるボタンがあれば削除
            const existingButton = header.querySelector('.custom-close-button');
            if (existingButton) {
              existingButton.remove();
            }
            
            // 新しい閉じるボタンを作成
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '×';
            closeButton.className = 'custom-close-button';
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
              const chatWindow = document.getElementById('dify-chatbot-bubble-window');
              if (chatWindow) chatWindow.style.display = 'none';
            };
            header.appendChild(closeButton);
            
            console.log("閉じるボタンを追加しました");
          } else {
            // ヘッダーが見つからなかった場合は、チャットウィンドウ自体に閉じるボタンを追加
            const chatWindow = document.getElementById("dify-chatbot-bubble-window");
            if (chatWindow) {
              const closeButton = document.createElement('button');
              closeButton.innerHTML = '×';
              closeButton.className = 'custom-close-button';
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
                chatWindow.style.display = 'none';
              };
              chatWindow.appendChild(closeButton);
              
              console.log("チャットウィンドウに閉じるボタンを追加しました");
            } else {
              console.error("チャットウィンドウが見つかりませんでした");
            }
          }
        }, 300);
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
        
        // ウィンドウを強制的に表示
        setTimeout(function() {
          const chatWindow = document.getElementById("shoukibo-jizoka-chatbot-window");
          if (chatWindow) {
            chatWindow.style.display = 'flex';
            chatWindow.style.opacity = '1';
            chatWindow.style.visibility = 'visible';
          }
          
          // 閉じるボタンを追加
          const header = document.querySelector('#shoukibo-jizoka-chatbot-window .dify-chatbot-bubble-window-header');
          if (header) {
            // 既存の閉じるボタンがあれば削除
            const existingButton = header.querySelector('.custom-close-button');
            if (existingButton) {
              existingButton.remove();
            }
            
            // 新しい閉じるボタンを作成
            const closeButton = document.createElement('button');
            closeButton.innerHTML = '×';
            closeButton.className = 'custom-close-button';
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
              const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
              if (chatWindow) chatWindow.style.display = 'none';
            };
            header.appendChild(closeButton);
            
            console.log("閉じるボタンを追加しました");
          } else {
            console.error("チャットウィンドウのヘッダーが見つかりませんでした");
          }
        }, 300);
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
      
      // まず右下の青いボタンが存在するか確認
      const difyButton = document.getElementById("dify-chatbot-bubble-button");
      if (difyButton) {
        console.log("Difyボタンが見つかりました - 省力化投資補助金チャットを開始します");
        
        // まずDifyボタンをクリックして基本のチャットウィンドウを開く
        const difyClickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        difyButton.dispatchEvent(difyClickEvent);
        
        // 少し待ってからウィンドウを表示
        setTimeout(function() {
          const chatWindow = document.getElementById("dify-chatbot-bubble-window");
          if (chatWindow) {
            chatWindow.style.display = 'flex';
            chatWindow.style.opacity = '1';
            chatWindow.style.visibility = 'visible';
            
            // 省力化投資補助金用のIDを設定
            chatWindow.id = "shorikika-chatbot-window";
            
            // 閉じるボタンを追加
            const header = chatWindow.querySelector('.dify-chatbot-bubble-window-header');
            if (header) {
              // 既存の閉じるボタンがあれば削除
              const existingButton = header.querySelector('.custom-close-button');
              if (existingButton) {
                existingButton.remove();
              }
              
              // 新しい閉じるボタンを作成
              const closeButton = document.createElement('button');
              closeButton.innerHTML = '×';
              closeButton.className = 'custom-close-button';
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
                chatWindow.style.display = 'none';
              };
              header.appendChild(closeButton);
              
              console.log("閉じるボタンを追加しました");
            } else {
              console.error("チャットウィンドウのヘッダーが見つかりませんでした");
            }
            
            // タイトルを変更（もし可能であれば）
            const titleElement = header?.querySelector('.dify-chatbot-bubble-window-title');
            if (titleElement) {
              titleElement.textContent = '省力化投資補助金チャット';
            }
            
            // 初期メッセージを送信（もし可能であれば）
            if (window.difyChatbot && window.difyChatbot.sendMessage) {
              setTimeout(() => {
                window.difyChatbot.sendMessage("省力化投資補助金について教えてください");
              }, 1000);
            }
          }
        }, 300);
      } else {
        // 専用ボタンを探して直接クリック（バックアップ方法）
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
          
          // ウィンドウを強制的に表示
          setTimeout(function() {
            const chatWindow = document.getElementById("shorikika-chatbot-window");
            if (chatWindow) {
              chatWindow.style.display = 'flex';
              chatWindow.style.opacity = '1';
              chatWindow.style.visibility = 'visible';
            }
            
            // 閉じるボタンを追加
            const header = document.querySelector('#shorikika-chatbot-window .dify-chatbot-bubble-window-header');
            if (header) {
              // 既存の閉じるボタンがあれば削除
              const existingButton = header.querySelector('.custom-close-button');
              if (existingButton) {
                existingButton.remove();
              }
              
              // 新しい閉じるボタンを作成
              const closeButton = document.createElement('button');
              closeButton.innerHTML = '×';
              closeButton.className = 'custom-close-button';
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
                const chatWindow = document.getElementById('shorikika-chatbot-window');
                if (chatWindow) chatWindow.style.display = 'none';
              };
              header.appendChild(closeButton);
              
              console.log("閉じるボタンを追加しました");
            } else {
              console.error("チャットウィンドウのヘッダーが見つかりませんでした");
            }
          }, 300);
        } else {
          console.error("省力化投資補助金のチャットボタンが見つかりませんでした");
          toast.error("チャットボットの読み込みに失敗しました。ページを再読み込みしてください。");
        }
      }
    } catch (error) {
      console.error("省力化投資補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);
  
  // チャットボットの読み込み状態を監視
  useEffect(() => {
    console.log("チャットボットの読み込み状態を監視します");
    
    // スタイルの設定 - DOMContentLoadedイベント後に実行
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setupChatbotStyles);
    } else {
      setupChatbotStyles();
    }
    
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
      } else if (document.getElementById("dify-chatbot-bubble-button")) {
        // 省力化投資補助金用の専用ボタンがない場合は、Difyボタンが読み込まれたら準備完了とする
        console.log("Difyボタンを省力化投資補助金チャットボットとして使用します");
        setIsShorikikaLoaded(true);
        clearInterval(checkShorikikaLoaded);
      }
    }, 1000);
    
    // ウィンドウロード完了時にもスタイルを再適用
    window.addEventListener('load', setupChatbotStyles);
    
    // クリーンアップ関数
    return () => {
      clearInterval(checkDifyLoaded);
      clearInterval(checkShoukiboLoaded);
      clearInterval(checkShorikikaLoaded);
      window.removeEventListener('load', setupChatbotStyles);
      document.removeEventListener('DOMContentLoaded', setupChatbotStyles);
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
