
import { useEffect, useState, useRef } from "react";

/**
 * 補助金チャットボットコンポーネント - 強化バージョン
 */
export const SubsidyChatbot = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const checkIntervalRef = useRef<number | null>(null);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 5;

  useEffect(() => {
    // DOM完全ロード後に初期化を確実に行う
    if (document.readyState === 'complete') {
      initializeChatbot();
    } else {
      window.addEventListener('load', initializeChatbot);
      return () => window.removeEventListener('load', initializeChatbot);
    }
  }, []);

  const initializeChatbot = () => {
    console.log("Initializing subsidy chatbot...");
    
    // すでに存在する要素を削除（重複を防止）
    cleanup();
    
    // 設定スクリプトを追加
    const configScript = document.createElement('script');
    configScript.id = 'dify-chat-config';
    configScript.textContent = `
      window.difyChatbotConfig = { 
        token: 'yXBz3rzpDBhMgYcB'
      };
    `;
    document.head.appendChild(configScript);

    // メインスクリプトを追加
    const mainScript = document.createElement('script');
    mainScript.id = 'yXBz3rzpDBhMgYcB';
    mainScript.src = 'https://udify.app/embed.min.js';
    mainScript.defer = true;
    mainScript.async = true;
    mainScript.onload = () => {
      console.log("Dify script loaded successfully");
      setIsLoaded(true);
      
      // スクリプトロード後、少し待機してから要素が表示されているか確認
      setTimeout(ensureElementsExist, 1000);
    };
    mainScript.onerror = () => {
      console.error("Failed to load Dify script");
      attemptCountRef.current++;
      if (attemptCountRef.current < MAX_ATTEMPTS) {
        setTimeout(initializeChatbot, 2000);
      }
    };
    document.body.appendChild(mainScript);

    // スタイルを追加（より強力なセレクタと !important を使用）
    addEnhancedStyles();

    // ラベルを追加
    addChatbotLabel();

    // 定期的に要素の存在を確認
    startElementCheck();
  };

  const addEnhancedStyles = () => {
    const style = document.createElement('style');
    style.id = 'dify-chat-styles';
    style.textContent = `
      /* より高い重要度でチャットボタンのスタイルを強制 */
      body #dify-chatbot-bubble-button,
      html body #dify-chatbot-bubble-button,
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
        bottom: 8rem !important;
        right: 1rem !important;
        z-index: 2147483647 !important; /* 最大のz-indexを使用 */
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        position: fixed !important;
        width: 48px !important;
        height: 48px !important;
        padding: 0 !important;
        margin: 0 !important;
        border-radius: 50% !important;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
        cursor: pointer !important;
        border: none !important;
        pointer-events: auto !important;
        transform: none !important;
        transition: none !important;
        contain: none !important;
        isolation: isolate !important;
      }
      
      /* チャットウィンドウのスタイル */
      body #dify-chatbot-bubble-window,
      html body #dify-chatbot-bubble-window,
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        max-height: 80vh !important;
        max-width: calc(100vw - 32px) !important;
        bottom: 2rem !important;
        right: 1rem !important;
        z-index: 2147483646 !important;
        display: flex !important;
        flex-direction: column !important;
        border-radius: 0.5rem !important;
        overflow: hidden !important;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
        position: fixed !important;
        visibility: visible !important;
        pointer-events: auto !important;
      }
      
      /* モバイル対応 */
      @media (max-width: 640px) {
        body #dify-chatbot-bubble-window,
        html body #dify-chatbot-bubble-window,
        #dify-chatbot-bubble-window {
          width: calc(100vw - 2rem) !important;
          height: 70vh !important;
        }
      }
      
      /* ラベルのスタイル - 極めて高い優先度 */
      body #dify-chatbot-label,
      html body #dify-chatbot-label,
      #dify-chatbot-label {
        position: fixed !important;
        bottom: 12rem !important;
        right: 1rem !important;
        background-color: rgba(255,255,255,0.9) !important;
        padding: 0.375rem 0.75rem !important;
        border-radius: 9999px !important;
        font-size: 0.75rem !important;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
        z-index: 2147483645 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
        border: 1px solid rgba(226,232,240,0.8) !important;
        visibility: visible !important;
        opacity: 1 !important;
        pointer-events: auto !important;
      }
    `;
    document.head.appendChild(style);
  };

  const addChatbotLabel = () => {
    // 既存のラベルを削除
    const existingLabel = document.getElementById('dify-chatbot-label');
    if (existingLabel) {
      existingLabel.remove();
    }

    // ラベルを新規作成し追加
    const label = document.createElement('div');
    label.id = 'dify-chatbot-label';
    label.innerHTML = `
      <span>小規模持続化補助金</span>
      <span>の質問はコチラ</span>
    `;
    document.body.appendChild(label);
  };

  const ensureElementsExist = () => {
    console.log("Checking if chatbot elements exist...");
    const chatButton = document.getElementById('dify-chatbot-bubble-button');
    const chatLabel = document.getElementById('dify-chatbot-label');
    
    if (!chatButton) {
      console.log("Chat button not found, adding custom button");
      
      // ボタンが存在しない場合、カスタムボタンを作成
      const customButton = document.createElement('button');
      customButton.id = 'dify-chatbot-bubble-button';
      customButton.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="white"/><path d="M8 12H8.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12H12.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 12H16.01" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
      customButton.style.cssText = `
        background-color: #1C64F2;
        position: fixed;
        bottom: 8rem;
        right: 1rem;
        z-index: 2147483647;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        border: none;
      `;
      
      customButton.onclick = () => {
        console.log("Custom button clicked, reloading script");
        cleanup();
        initializeChatbot();
      };
      
      document.body.appendChild(customButton);
    }
    
    if (!chatLabel) {
      addChatbotLabel();
    }
  };

  const startElementCheck = () => {
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }
    
    // ブラウザのsetIntervalを使用し、IDを保存
    checkIntervalRef.current = window.setInterval(() => {
      const chatButton = document.getElementById('dify-chatbot-bubble-button');
      if (!chatButton) {
        console.log("Chat button not found during check, reloading script");
        // スクリプトを再読み込み
        const mainScript = document.getElementById('yXBz3rzpDBhMgYcB');
        if (mainScript) {
          mainScript.remove();
        }
        
        const newScript = document.createElement('script');
        newScript.id = 'yXBz3rzpDBhMgYcB';
        newScript.src = 'https://udify.app/embed.min.js';
        newScript.defer = true;
        newScript.async = true;
        document.body.appendChild(newScript);
        
        // スタイルを再適用
        addEnhancedStyles();
      }
      
      const chatLabel = document.getElementById('dify-chatbot-label');
      if (!chatLabel) {
        addChatbotLabel();
      }
    }, 3000);
  };

  const cleanup = () => {
    // 既存の要素をクリーンアップ
    document.getElementById('dify-chat-config')?.remove();
    document.getElementById('yXBz3rzpDBhMgYcB')?.remove();
    document.getElementById('dify-chat-styles')?.remove();
    document.getElementById('dify-chatbot-label')?.remove();
    
    // インターバルをクリア
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
  };

  // コンポーネントのアンマウント時にクリーンアップ
  useEffect(() => {
    return cleanup;
  }, []);

  return null;
};
