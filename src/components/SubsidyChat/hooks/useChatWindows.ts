
import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { 
  safelyCloseWindow, 
  closeOtherChatWindows 
} from "../utils/chatbotDomUtils";
import { createChatWindowContent, createScriptBasedChatWindow } from "../utils/chatWindowContent";
import { handleChatbotError, checkAllChatbotErrors } from "../utils/errorHandling";

/**
 * チャットウィンドウ操作用カスタムフック
 */
export const useChatWindows = () => {
  // 定期的にエラーチェックを実行
  useEffect(() => {
    // 初回チェック
    const initialCheck = setTimeout(checkAllChatbotErrors, 3000);
    
    // 定期チェック
    const intervalCheck = setInterval(checkAllChatbotErrors, 10000);
    
    return () => {
      clearTimeout(initialCheck);
      clearInterval(intervalCheck);
    };
  }, []);

  // 一般チャットボットを開く関数
  const openChatbot = useCallback(() => {
    console.log("一般チャットボットを開きます (useChatWindows)");
    
    try {
      // 他のチャットウィンドウを閉じる
      closeOtherChatWindows('dify-chatbot-bubble-window', safelyCloseWindow);
      
      // Difyのグローバルオブジェクトを使用する方法を最初に試す
      if (window.difyChatbot && typeof window.difyChatbot.toggle === 'function') {
        console.log("Difyグローバルオブジェクトを使用して一般チャットを開きます");
        
        // Difyグローバルオブジェクトがopenメソッドを持っているか確認
        if (typeof window.difyChatbot.open === 'function') {
          window.difyChatbot.open();
        } else {
          window.difyChatbot.toggle();
        }
        
        // Difyが作成するDOM要素を探し、スタイルを調整
        setTimeout(() => {
          const difyElements = document.querySelectorAll('[class*="dify-chatbot-"]');
          difyElements.forEach(el => {
            if (el instanceof HTMLElement) {
              // チャットウィンドウのスタイル調整
              if (el.classList.contains('dify-chatbot-bubble-window') || 
                  el.className.includes('bubble-window')) {
                el.style.zIndex = '99999';
                el.style.position = 'fixed';
                el.style.bottom = '20px';
                el.style.right = '20px';
                el.style.width = '380px';
                el.style.height = '600px';
                el.style.maxHeight = '80vh';
                el.style.maxWidth = 'calc(100vw - 40px)';
                el.style.borderRadius = '10px';
                el.style.boxShadow = '0 5px 40px rgba(0, 0, 0, 0.2)';
                
                // IDを設定してDOMから参照できるようにする
                el.id = 'dify-chatbot-bubble-window';
              }
            }
          });
          
          // カスタム閉じるボタンを追加
          addCustomCloseButton('dify-chatbot-bubble-window');
        }, 500);
        
        return;
      }
      
      // フォールバック方法: 手動でウィンドウを作成
      console.log("フォールバック: 手動でチャットウィンドウを作成します");
      
      // チャットボットウィンドウを確認
      const existingWindow = document.getElementById("dify-chatbot-bubble-window");
      if (existingWindow) {
        // 既存のウィンドウを完全に削除
        existingWindow.remove();
      }
      
      // 新しいウィンドウを作成
      console.log("一般チャットウィンドウを新規作成します");
      
      // スクリプトベースのアプローチを試みる
      const chatbotWindow = document.createElement("div");
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
      
      // スクリプトベースの埋め込みを試みる場合
      const useScriptBasedApproach = true;
      
      if (useScriptBasedApproach) {
        // スクリプトベースのチャットウィンドウを作成
        const scriptBasedWindow = createScriptBasedChatWindow('general-chatbot', '一般チャット');
        chatbotWindow.appendChild(scriptBasedWindow);
        
        // APIを使用してチャットを開始する試み
        setTimeout(() => {
          if (window.difyChatbot && typeof window.difyChatbot.toggle === 'function') {
            window.difyChatbot.toggle();
          } else if (window.DifyAI && typeof window.DifyAI.toggleUI === 'function') {
            window.DifyAI.toggleUI(true);
          }
        }, 100);
      } else {
        // 従来のiframeベースのアプローチ
        const iframeSrc = "https://api.dify.ai/embed/UlZEhca44ZNfJtdS";
        chatbotWindow.innerHTML = createChatWindowContent("一般チャット", iframeSrc);
      }
      
      // DOMに追加
      document.body.appendChild(chatbotWindow);
      
      // 閉じるボタンのイベントリスナーを追加
      setTimeout(() => {
        addCustomCloseButton('dify-chatbot-bubble-window');
      }, 500);
      
      // エラーチェック
      setTimeout(() => handleChatbotError('dify-chatbot-bubble-window'), 2000);
      
      console.log("一般チャットウィンドウを表示しました");
    } catch (error) {
      console.error("一般チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);
  
  // 小規模持続化補助金チャットボットを開く関数
  const startShoukiboJizokaChat = useCallback(() => {
    console.log("小規模持続化補助金チャットボットを開きます (useChatWindows)");
    
    try {
      // 他のチャットウィンドウを閉じる
      closeOtherChatWindows('shoukibo-jizoka-chatbot-window', safelyCloseWindow);
      
      // グローバルオブジェクトを使用する方法を試す
      if (window.shoukiboJizokaChatbot && typeof window.shoukiboJizokaChatbot.toggle === 'function') {
        console.log("グローバルオブジェクトを使用して小規模持続化補助金チャットを開きます");
        
        // openメソッドを優先して使用
        if (typeof window.shoukiboJizokaChatbot.open === 'function') {
          window.shoukiboJizokaChatbot.open();
        } else {
          window.shoukiboJizokaChatbot.toggle();
        }
        
        // Difyが作成するDOM要素を探し、スタイルを調整
        setTimeout(() => {
          const difyElements = document.querySelectorAll('[id*="shoukibo-jizoka-chatbot"], [class*="dify-chatbot-"]');
          difyElements.forEach(el => {
            if (el instanceof HTMLElement && 
                (el.classList.contains('dify-chatbot-bubble-window') || el.className.includes('bubble-window'))) {
              el.style.zIndex = '99999';
              el.style.position = 'fixed';
              el.style.bottom = '20px';
              el.style.right = '20px';
              el.style.width = '380px';
              el.style.height = '600px';
              el.style.maxHeight = '80vh';
              el.style.maxWidth = 'calc(100vw - 40px)';
              el.style.borderRadius = '10px';
              el.style.boxShadow = '0 5px 40px rgba(0, 0, 0, 0.2)';
              
              // IDを設定してDOMから参照できるようにする
              el.id = 'shoukibo-jizoka-chatbot-window';
            }
          });
          
          // カスタム閉じるボタンを追加
          addCustomCloseButton('shoukibo-jizoka-chatbot-window');
        }, 500);
        
        return;
      }
      
      // フォールバック方法: 手動でウィンドウを作成
      console.log("フォールバック: 手動でチャットウィンドウを作成します");
      
      // チャットボットウィンドウを確認
      const existingWindow = document.getElementById("shoukibo-jizoka-chatbot-window");
      if (existingWindow) {
        // 既存のウィンドウを完全に削除
        existingWindow.remove();
      }
      
      // 新しいウィンドウを作成
      console.log("小規模持続化補助金チャットウィンドウを新規作成します");
      
      // ウィンドウの作成
      const chatbotWindow = document.createElement("div");
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
      
      // HTMLコンテンツを設定 - 完全なURLを指定
      // API.dify.aiを使用
      const iframeSrc = "https://api.dify.ai/embed/jpVCvswMb5KaQFLk";
      chatbotWindow.innerHTML = createChatWindowContent("小規模持続化補助金チャット", iframeSrc);
      
      // DOMに追加
      document.body.appendChild(chatbotWindow);
      
      // 閉じるボタンのイベントリスナーを追加
      setTimeout(() => {
        addCustomCloseButton('shoukibo-jizoka-chatbot-window');
      }, 500);
      
      console.log("小規模持続化補助金チャットウィンドウを表示しました");
    } catch (error) {
      console.error("小規模持続化補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);
  
  // 省力化投資補助金チャットボットを開く関数
  const startShorikikaChat = useCallback(() => {
    console.log("省力化投資補助金チャットボットを開きます (useChatWindows)");
    
    try {
      // 他のチャットウィンドウを閉じる
      closeOtherChatWindows('shorikika-chatbot-window', safelyCloseWindow);
      
      // グローバルオブジェクトを使用する方法を試す
      if (window.shorikika_chatbot && typeof window.shorikika_chatbot.toggle === 'function') {
        console.log("グローバルオブジェクトを使用して省力化投資補助金チャットを開きます");
        
        // openメソッドを優先して使用
        if (typeof window.shorikika_chatbot.open === 'function') {
          window.shorikika_chatbot.open();
        } else {
          window.shorikika_chatbot.toggle();
        }
        
        // Difyが作成するDOM要素を探し、スタイルを調整
        setTimeout(() => {
          const difyElements = document.querySelectorAll('[id*="shorikika-chatbot"], [class*="dify-chatbot-"]');
          difyElements.forEach(el => {
            if (el instanceof HTMLElement && 
                (el.classList.contains('dify-chatbot-bubble-window') || el.className.includes('bubble-window'))) {
              el.style.zIndex = '99999';
              el.style.position = 'fixed';
              el.style.bottom = '20px';
              el.style.right = '20px';
              el.style.width = '380px';
              el.style.height = '600px';
              el.style.maxHeight = '80vh';
              el.style.maxWidth = 'calc(100vw - 40px)';
              el.style.borderRadius = '10px';
              el.style.boxShadow = '0 5px 40px rgba(0, 0, 0, 0.2)';
              
              // IDを設定してDOMから参照できるようにする
              el.id = 'shorikika-chatbot-window';
            }
          });
          
          // カスタム閉じるボタンを追加
          addCustomCloseButton('shorikika-chatbot-window');
        }, 500);
        
        return;
      }
      
      // フォールバック方法: 手動でウィンドウを作成
      console.log("フォールバック: 手動でチャットウィンドウを作成します");
      
      // チャットボットウィンドウを確認
      const existingWindow = document.getElementById("shorikika-chatbot-window");
      if (existingWindow) {
        // 既存のウィンドウを完全に削除
        existingWindow.remove();
      }
      
      // 新しいウィンドウを作成
      console.log("省力化投資補助金チャットウィンドウを新規作成します");
      
      // ウィンドウの作成
      const chatbotWindow = document.createElement("div");
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
      
      // HTMLコンテンツを設定 - 完全なURLを指定
      // API.dify.aiを使用
      const iframeSrc = "https://api.dify.ai/embed/kAwDqVSCnjM6ZfEY";
      chatbotWindow.innerHTML = createChatWindowContent("省力化投資補助金チャット", iframeSrc);
      
      // DOMに追加
      document.body.appendChild(chatbotWindow);
      
      // 閉じるボタンのイベントリスナーを追加
      setTimeout(() => {
        addCustomCloseButton('shorikika-chatbot-window');
      }, 500);
      
      console.log("省力化投資補助金チャットウィンドウを表示しました");
    } catch (error) {
      console.error("省力化投資補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);

  // カスタム閉じるボタンを追加する内部関数
  const addCustomCloseButton = (windowId: string) => {
    try {
      const chatWindow = document.getElementById(windowId);
      if (!chatWindow) return;
      
      // すでに閉じるボタンがあるか確認
      let header = chatWindow.querySelector('.dify-chatbot-bubble-window-header');
      if (!header) {
        // Difyの自動生成されたヘッダーを探す
        header = chatWindow.querySelector('[class*="header"]');
      }
      
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
          safelyCloseWindow(windowId);
          
          // グローバルオブジェクトを使用して閉じる試み
          if (windowId === 'dify-chatbot-bubble-window' && window.difyChatbot) {
            if (typeof window.difyChatbot.toggle === 'function') {
              window.difyChatbot.toggle();
            }
          } else if (windowId === 'shoukibo-jizoka-chatbot-window' && window.shoukiboJizokaChatbot) {
            if (typeof window.shoukiboJizokaChatbot.toggle === 'function') {
              window.shoukiboJizokaChatbot.toggle();
            }
          } else if (windowId === 'shorikika-chatbot-window' && window.shorikika_chatbot) {
            if (typeof window.shorikika_chatbot.toggle === 'function') {
              window.shorikika_chatbot.toggle();
            }
          }
          
          console.log(`カスタム閉じるボタンで${windowId}を閉じました`);
        };
        
        header.appendChild(closeButton);
      }
    } catch (error) {
      console.error("カスタム閉じるボタンの追加中にエラーが発生しました:", error);
    }
  };

  return {
    openChatbot,
    startShoukiboJizokaChat,
    startShorikikaChat
  };
};
