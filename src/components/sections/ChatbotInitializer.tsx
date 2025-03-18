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

    // グローバル関数
    startShorikikaChat?: () => void;
    startShoukiboJizokaChat?: () => void;
    openChatbot?: () => void;
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
      } else {
        // スタイル要素がなければ作成する
        const newStyleElement = document.createElement('style');
        newStyleElement.id = 'dify-chat-styles';
        newStyleElement.textContent = getChatStyles();
        document.head.appendChild(newStyleElement);
        console.log("チャットボット用のスタイル要素を作成しました");
      }
      
      // カスタム閉じるボタンの実装
      setTimeout(addCustomCloseButtons, 2000);
    }
  }, []);
  
  // カスタム閉じるボタンを追加する関数
  const addCustomCloseButtons = useCallback(() => {
    try {
      console.log("カスタム閉じるボタンを追加します");
      
      // 既存の閉じるボタンを削除（重複防止）
      const existingButtons = document.querySelectorAll('.custom-close-button');
      existingButtons.forEach(button => button.remove());
      
      // Difyチャットボットウィンドウの閉じるボタン
      const difyWindow = document.getElementById('dify-chatbot-bubble-window');
      if (difyWindow && window.getComputedStyle(difyWindow).display !== 'none') {
        const difyHeader = difyWindow.querySelector('.dify-chatbot-bubble-window-header');
        if (difyHeader) {
          // ヘッダーにカスタム閉じるボタンを追加
          const closeButton = document.createElement('button');
          closeButton.innerHTML = '×';
          closeButton.className = 'custom-close-button';
          closeButton.style.cssText = `
            position: absolute;
            right: 10px;
            top: 10px;
            background: transparent;
            border: none;
            color: #666;
            font-size: 20px;
            cursor: pointer;
            z-index: 10000;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
          `;
          
          // ホバー効果を追加
          closeButton.onmouseover = () => {
            closeButton.style.backgroundColor = 'rgba(0,0,0,0.1)';
            closeButton.style.color = '#333';
          };
          closeButton.onmouseout = () => {
            closeButton.style.backgroundColor = 'transparent';
            closeButton.style.color = '#666';
          };
          
          // クリックイベントを追加
          closeButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Difyチャットボットの閉じるボタンがクリックされました");
            
            try {
              // 複数の方法で閉じる処理を試みる
              if (window.difyChatbot?.toggle) {
                window.difyChatbot.toggle();
                console.log("difyChatbot.toggleを使用してチャットボットを閉じました");
              } else if (window.DifyAI?.toggleUI) {
                window.DifyAI.toggleUI(false);
                console.log("DifyAI.toggleUIを使用してチャットボットを閉じました");
              } else {
                // 直接DOMを操作
                difyWindow.style.display = 'none';
                console.log("DOM操作でチャットボットを閉じました");
              }
              
              // 確認
              setTimeout(() => {
                if (difyWindow && window.getComputedStyle(difyWindow).display !== 'none') {
                  console.log("チャットボットが閉じられていません。再試行します");
                  difyWindow.style.display = 'none';
                }
              }, 300);
            } catch (error) {
              console.error("チャットボットを閉じる際にエラーが発生しました:", error);
              // 最終手段：直接非表示にする
              difyWindow.style.display = 'none';
            }
          };
          
          difyHeader.appendChild(closeButton);
          console.log("Difyチャットボットに閉じるボタンを追加しました");
        }
      }
      
      // 小規模持続化補助金チャットボットウィンドウの閉じるボタン
      const shoukiboWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
      if (shoukiboWindow && window.getComputedStyle(shoukiboWindow).display !== 'none') {
        const shoukiboHeader = shoukiboWindow.querySelector('.dify-chatbot-bubble-window-header');
        if (shoukiboHeader) {
          // ヘッダーにカスタム閉じるボタンを追加
          const closeButton = document.createElement('button');
          closeButton.innerHTML = '×';
          closeButton.className = 'custom-close-button';
          closeButton.style.cssText = `
            position: absolute;
            right: 10px;
            top: 10px;
            background: transparent;
            border: none;
            color: #666;
            font-size: 20px;
            cursor: pointer;
            z-index: 10000;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
          `;
          
          // ホバー効果を追加
          closeButton.onmouseover = () => {
            closeButton.style.backgroundColor = 'rgba(0,0,0,0.1)';
            closeButton.style.color = '#333';
          };
          closeButton.onmouseout = () => {
            closeButton.style.backgroundColor = 'transparent';
            closeButton.style.color = '#666';
          };
          
          // クリックイベントを追加
          closeButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("小規模持続化補助金チャットボットの閉じるボタンがクリックされました");
            
            try {
              // 複数の方法で閉じる処理を試みる
              if (window.shoukiboJizokaChatbot?.toggle) {
                window.shoukiboJizokaChatbot.toggle();
                console.log("shoukiboJizokaChatbot.toggleを使用してチャットボットを閉じました");
              } else {
                // 直接DOMを操作
                shoukiboWindow.style.display = 'none';
                console.log("DOM操作で小規模持続化補助金チャットボットを閉じました");
              }
              
              // 確認
              setTimeout(() => {
                if (shoukiboWindow && window.getComputedStyle(shoukiboWindow).display !== 'none') {
                  console.log("小規模持続化補助金チャットボットが閉じられていません。再試行します");
                  shoukiboWindow.style.display = 'none';
                }
              }, 300);
            } catch (error) {
              console.error("小規模持続化補助金チャットボットを閉じる際にエラーが発生しました:", error);
              // 最終手段：直接非表示にする
              shoukiboWindow.style.display = 'none';
            }
          };
          
          shoukiboHeader.appendChild(closeButton);
          console.log("小規模持続化補助金チャットボットに閉じるボタンを追加しました");
        }
      }
      
      // 省力化投資補助金チャットボットウィンドウの閉じるボタン
      const shorikikaWindow = document.getElementById('shorikika-chatbot-window');
      if (shorikikaWindow && window.getComputedStyle(shorikikaWindow).display !== 'none') {
        const shorikikaHeader = shorikikaWindow.querySelector('.dify-chatbot-bubble-window-header');
        if (shorikikaHeader) {
          // ヘッダーにカスタム閉じるボタンを追加
          const closeButton = document.createElement('button');
          closeButton.innerHTML = '×';
          closeButton.className = 'custom-close-button';
          closeButton.style.cssText = `
            position: absolute;
            right: 10px;
            top: 10px;
            background: transparent;
            border: none;
            color: #666;
            font-size: 20px;
            cursor: pointer;
            z-index: 10000;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.2s;
          `;
          
          // ホバー効果を追加
          closeButton.onmouseover = () => {
            closeButton.style.backgroundColor = 'rgba(0,0,0,0.1)';
            closeButton.style.color = '#333';
          };
          closeButton.onmouseout = () => {
            closeButton.style.backgroundColor = 'transparent';
            closeButton.style.color = '#666';
          };
          
          // クリックイベントを追加
          closeButton.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("省力化投資補助金チャットボットの閉じるボタンがクリックされました");
            
            try {
              // 複数の方法で閉じる処理を試みる
              if (window.shorikika_chatbot?.toggle) {
                window.shorikika_chatbot.toggle();
                console.log("shorikika_chatbot.toggleを使用してチャットボットを閉じました");
              } else {
                // 直接DOMを操作
                shorikikaWindow.style.display = 'none';
                console.log("DOM操作で省力化投資補助金チャットボットを閉じました");
              }
              
              // 確認
              setTimeout(() => {
                if (shorikikaWindow && window.getComputedStyle(shorikikaWindow).display !== 'none') {
                  console.log("省力化投資補助金チャットボットが閉じられていません。再試行します");
                  shorikikaWindow.style.display = 'none';
                }
              }, 300);
            } catch (error) {
              console.error("省力化投資補助金チャットボットを閉じる際にエラーが発生しました:", error);
              // 最終手段：直接非表示にする
              shorikikaWindow.style.display = 'none';
            }
          };
          
          shorikikaHeader.appendChild(closeButton);
          console.log("省力化投資補助金チャットボットに閉じるボタンを追加しました");
        }
      }
    } catch (error) {
      console.error("カスタム閉じるボタンの追加中にエラーが発生しました:", error);
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
          } else {
            console.error("Difyボタンが見つかりません。チャットボットが正しく初期化されていない可能性があります。");
          }
          clearInterval(checkDifyLoaded);
        }
      }
    }, checkInterval);
    
    // 小規模持続化補助金のDifyスクリプトのロード状態を監視
    const checkShoukiboLoaded = setInterval(() => {
      const shoukiboAvailable = !!window.shoukiboJizokaChatbot;
      if (shoukiboAvailable) {
        console.log("小規模持続化補助金のDifyスクリプトが正常にロードされました");
        setIsShoukiboLoaded(true);
        clearInterval(checkShoukiboLoaded);
      } else {
        elapsedTime += checkInterval;
        if (elapsedTime >= maxCheckTime && !isShoukiboLoaded) {
          console.warn("小規模持続化補助金のDifyスクリプトのロードがタイムアウトしました");
          // ボタン要素を手動で探してみる
          const shoukiboButton = document.getElementById('shoukibo-jizoka-chatbot-button');
          if (shoukiboButton) {
            console.log("小規模持続化補助金ボタンは存在しますが、APIがロードされていません");
            setIsShoukiboLoaded(true); // ボタンがあれば使用可能とする
          } else {
            console.error("小規模持続化補助金ボタンが見つかりません。チャットボットが正しく初期化されていない可能性があります。");
          }
          clearInterval(checkShoukiboLoaded);
        }
      }
    }, checkInterval);
    
    // 省力化投資補助金のDifyスクリプトのロード状態を監視
    const checkShorikikaLoaded = setInterval(() => {
      const shorikikaAvailable = !!window.shorikika_chatbot;
      if (shorikikaAvailable) {
        console.log("省力化投資補助金のDifyスクリプトが正常にロードされました");
        setIsShorikikaLoaded(true);
        clearInterval(checkShorikikaLoaded);
      } else {
        elapsedTime += checkInterval;
        if (elapsedTime >= maxCheckTime && !isShorikikaLoaded) {
          console.warn("省力化投資補助金のDifyスクリプトのロードがタイムアウトしました");
          // ボタン要素を手動で探してみる
          const shorikikaButton = document.getElementById('shorikika-chatbot-button');
          if (shorikikaButton) {
            console.log("省力化投資補助金ボタンは存在しますが、APIがロードされていません");
            setIsShorikikaLoaded(true); // ボタンがあれば使用可能とする
          } else {
            console.error("省力化投資補助金ボタンが見つかりません。チャットボットが正しく初期化されていない可能性があります。");
          }
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
   * 一般的なチャットボットを開く関数
   */
  const openChatbot = useCallback(() => {
    try {
      console.log("一般的なチャットボットを開く処理を開始します");
      
      // チャットウィンドウをチェック
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("チャットウィンドウは既に表示されています");
        return;
      }
      
      if (!isDifyLoaded) {
        console.warn("Difyスクリプトがロードされていません");
        toast.error("チャットボットの準備ができていません。しばらくお待ちいただくか、ページを再読み込みしてください。");
        return;
      }
      
      // 他のチャットウィンドウを閉じる
      const otherWindows = [
        document.getElementById('shoukibo-jizoka-chatbot-window'),
        document.getElementById('shorikika-chatbot-window')
      ];
      
      otherWindows.forEach(window => {
        if (window && window.style.display !== 'none') {
          window.style.display = 'none';
        }
      });
      
      // 直接ボタンクリックを試みる
      const difyButton = document.getElementById('dify-chatbot-bubble-button');
      if (difyButton instanceof HTMLElement) {
        console.log("Difyボタンを直接クリックします");
        
        // クリックイベントを強制的に発生させる
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        difyButton.dispatchEvent(clickEvent);
        
        // カスタム閉じるボタンを追加
        setTimeout(addCustomCloseButtons, 500);
        
        // 成功メッセージ
        setTimeout(() => {
          // チャットウィンドウが表示されているか確認
          const chatWindow = document.getElementById('dify-chatbot-bubble-window');
          if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
            toast.success("チャットボットが開きました。ご質問をどうぞ。");
          } else {
            console.error("チャットウィンドウが表示されていません");
            // 再度試行
            if (window.difyChatbot?.toggle) {
              window.difyChatbot.toggle();
              console.log("difyChatbot.toggleを使用してチャットボットを開きました（再試行）");
              setTimeout(addCustomCloseButtons, 500);
            } else if (window.DifyAI?.toggleUI) {
              window.DifyAI.toggleUI(true);
              console.log("DifyAI.toggleUIを使用してチャットボットを開きました（再試行）");
              setTimeout(addCustomCloseButtons, 500);
            }
          }
        }, 1000);
        return;
      }
      
      // ボタンがない場合はAPIを試す
      if (window.difyChatbot?.toggle) {
        window.difyChatbot.toggle();
        console.log("difyChatbot.toggleを使用してチャットボットを開きました");
        
        // カスタム閉じるボタンを追加
        setTimeout(addCustomCloseButtons, 500);
      } else if (window.DifyAI?.toggleUI) {
        window.DifyAI.toggleUI(true);
        console.log("DifyAI.toggleUIを使用してチャットボットを開きました");
        
        // カスタム閉じるボタンを追加
        setTimeout(addCustomCloseButtons, 500);
      } else {
        // 最終手段：DOMを直接操作
        console.log("APIが利用できないため、DOMを直接操作します");
        const chatWindow = document.getElementById('dify-chatbot-bubble-window');
        if (chatWindow) {
          chatWindow.style.display = 'block';
          console.log("チャットウィンドウを直接表示しました");
          setTimeout(addCustomCloseButtons, 500);
        } else {
          throw new Error("チャットボタンが見つからず、APIも利用できません");
        }
      }
    } catch (error) {
      console.error("チャットボットを開く際にエラーが発生しました:", error);
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
        
        // クリックイベントを強制的に発生させる
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        shoukiboButton.dispatchEvent(clickEvent);
        
        // カスタム閉じるボタンを追加
        setTimeout(addCustomCloseButtons, 500);
        
        // 成功メッセージ
        setTimeout(() => {
          // チャットウィンドウが表示されているか確認
          const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
          if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
            toast.success("小規模持続化補助金のチャットボットが開きました。ご質問をどうぞ。");
          } else {
            console.error("小規模持続化補助金のチャットウィンドウが表示されていません");
            // 再度試行
            if (window.shoukiboJizokaChatbot?.toggle) {
              window.shoukiboJizokaChatbot.toggle();
              console.log("shoukiboJizokaChatbot.toggleを使用してチャットボットを開きました（再試行）");
              setTimeout(addCustomCloseButtons, 500);
            } else {
              // 最終手段：DOMを直接操作
              const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
              if (chatWindow) {
                chatWindow.style.display = 'block';
                console.log("小規模持続化補助金チャットウィンドウを直接表示しました");
                setTimeout(addCustomCloseButtons, 500);
              }
            }
          }
        }, 1000);
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
        // 最終手段：DOMを直接操作
        console.log("APIが利用できないため、DOMを直接操作します");
        const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
        if (chatWindow) {
          chatWindow.style.display = 'block';
          console.log("小規模持続化補助金チャットウィンドウを直接表示しました");
          setTimeout(addCustomCloseButtons, 500);
        } else {
          throw new Error("小規模持続化補助金のチャットボタンが見つからず、APIも利用できません");
        }
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
        
        // クリックイベントを強制的に発生させる
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        shorikikaButton.dispatchEvent(clickEvent);
        
        // カスタム閉じるボタンを追加
        setTimeout(addCustomCloseButtons, 500);
        
        // 成功メッセージ
        setTimeout(() => {
          // チャットウィンドウが表示されているか確認
          const chatWindow = document.getElementById('shorikika-chatbot-window');
          if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
            toast.success("省力化投資補助金のチャットボットが開きました。ご質問をどうぞ。");
          } else {
            console.error("省力化投資補助金のチャットウィンドウが表示されていません");
            // 再度試行
            if (window.shorikika_chatbot?.toggle) {
              window.shorikika_chatbot.toggle();
              console.log("shorikika_chatbot.toggleを使用してチャットボットを開きました（再試行）");
              setTimeout(addCustomCloseButtons, 500);
            } else {
              // 最終手段：DOMを直接操作
              const chatWindow = document.getElementById('shorikika-chatbot-window');
              if (chatWindow) {
                chatWindow.style.display = 'block';
                console.log("省力化投資補助金チャットウィンドウを直接表示しました");
                setTimeout(addCustomCloseButtons, 500);
              }
            }
          }
        }, 1000);
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
        // 最終手段：DOMを直接操作
        console.log("APIが利用できないため、DOMを直接操作します");
        const chatWindow = document.getElementById('shorikika-chatbot-window');
        if (chatWindow) {
          chatWindow.style.display = 'block';
          console.log("省力化投資補助金チャットウィンドウを直接表示しました");
          setTimeout(addCustomCloseButtons, 500);
        } else {
          throw new Error("省力化投資補助金のチャットボタンが見つからず、APIも利用できません");
        }
      }
    } catch (error) {
      console.error("省力化投資補助金のチャットボットを開く際にエラーが発生しました:", error);
      toast.error("省力化投資補助金のチャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, [isShorikikaLoaded]);
  
  // 関数をグローバルに公開
  useEffect(() => {
    // 関数をwindowオブジェクトに登録
    window.startShorikikaChat = startShorikikaChat;
    window.startShoukiboJizokaChat = startShoukiboJizokaChat;
    window.openChatbot = openChatbot;

    console.log("チャットボット関数をグローバルに登録しました");

    // クリーンアップ関数
    return () => {
      // コンポーネントがアンマウントされたときに関数を削除
      delete window.startShorikikaChat;
      delete window.startShoukiboJizokaChat;
      delete window.openChatbot;
    };
  }, [startShorikikaChat, startShoukiboJizokaChat, openChatbot]);
  
  return { 
    openChatbot,
    startShorikikaChat,
    startShoukiboJizokaChat,
    isDifyLoaded,
    isShoukiboLoaded,
    isShorikikaLoaded
  };
};
