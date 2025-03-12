
import { useEffect, useState, useRef } from "react";

/**
 * 補助金チャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const checkIntervalRef = useRef<number | null>(null);
  const attemptCountRef = useRef(0);
  const MAX_ATTEMPTS = 10;

  useEffect(() => {
    // DOMコンテンツが読み込まれた後に初期化する
    if (document.readyState === "complete") {
      console.log("DOM already loaded, initializing chatbot");
      initializeChatbot();
    } else {
      console.log("Waiting for DOM to load");
      window.addEventListener("DOMContentLoaded", () => {
        console.log("DOM loaded, initializing chatbot");
        initializeChatbot();
      });
      // フォールバックとして、少し遅延させても初期化する
      setTimeout(initializeChatbot, 1000);
    }

    // クリーンアップ
    return () => {
      console.log("Cleaning up subsidy chatbot");
      cleanup();
    };
  }, []);

  const initializeChatbot = () => {
    console.log("Initializing subsidy chatbot...");
    
    // 既存の要素をクリーンアップ
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
      addChatbotElements();
    };
    
    mainScript.onerror = (e) => {
      console.error("Failed to load Dify script", e);
      attemptCountRef.current++;
      if (attemptCountRef.current < MAX_ATTEMPTS) {
        console.log(`Retrying script load (attempt ${attemptCountRef.current}/${MAX_ATTEMPTS})`);
        setTimeout(initializeChatbot, 2000);
      } else {
        console.log("Maximum attempts reached, adding fallback button");
        addChatbotElements(); // スクリプトの読み込みに失敗しても要素を追加
      }
    };
    
    document.body.appendChild(mainScript);
  };

  const addChatbotElements = () => {
    console.log("Adding chatbot elements to the DOM");
    
    // 既存の要素を削除（念のため）
    document.getElementById('dify-custom-styles')?.remove();
    document.getElementById('dify-chatbot-bubble-button-1')?.remove();
    document.getElementById('dify-chatbot-label-1')?.remove();
    document.getElementById('dify-chatbot-sublabel-1')?.remove();
    document.getElementById('dify-chatbot-bubble-button-2')?.remove();
    document.getElementById('dify-chatbot-label-2')?.remove();
    document.getElementById('dify-chatbot-sublabel-2')?.remove();
    
    // スタイルを追加（重要度を上げるため!importantを多用）
    const style = document.createElement('style');
    style.id = 'dify-custom-styles';
    style.textContent = `
      .dify-chatbot-bubble-button {
        position: fixed !important;
        width: 36px !important;
        height: 36px !important;
        border-radius: 50% !important;
        background-color: #1C64F2 !important;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
        border: none !important;
        cursor: pointer !important;
        z-index: 2147483647 !important; /* 最大値 */
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        opacity: 1 !important;
        visibility: visible !important;
        right: 20px !important;
      }

      #dify-chatbot-bubble-button-1 {
        top: 180px !important;
      }

      #dify-chatbot-bubble-button-2 {
        top: 380px !important;
      }

      .dify-chatbot-label {
        position: fixed !important;
        background-color: white !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        padding: 8px 6px !important;
        width: 28px !important;
        font-size: 13px !important;
        text-align: center !important;
        writing-mode: vertical-rl !important;
        text-orientation: upright !important;
        letter-spacing: 0.5px !important;
        line-height: 1 !important;
        white-space: nowrap !important;
        right: 20px !important;
        z-index: 2147483647 !important;
        color: #000000 !important;
        font-weight: normal !important;
      }

      #dify-chatbot-label-1 {
        top: 40px !important;
        height: 130px !important;
      }

      #dify-chatbot-label-2 {
        top: 240px !important;
        height: 130px !important;
      }

      .dify-chatbot-sublabel {
        position: fixed !important;
        background-color: white !important;
        border-radius: 8px !important;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1) !important;
        padding: 4px 2px !important;
        width: 20px !important;
        font-size: 10px !important;
        text-align: center !important;
        writing-mode: vertical-rl !important;
        text-orientation: upright !important;
        letter-spacing: 0.5px !important;
        line-height: 1 !important;
        white-space: nowrap !important;
        right: 55px !important;
        z-index: 2147483647 !important;
        color: #666666 !important;
        font-weight: normal !important;
      }

      #dify-chatbot-sublabel-1 {
        top: 60px !important;
        height: 90px !important;
      }

      #dify-chatbot-sublabel-2 {
        top: 260px !important;
        height: 90px !important;
      }

      #dify-chatbot-bubble-window {
        position: fixed !important;
        bottom: 100px !important;
        right: 20px !important;
        width: 380px !important;
        height: 600px !important;
        max-height: 80vh !important;
        border-radius: 12px !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
        z-index: 2147483647 !important; /* 最大値 */
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);

    // 1つ目のラベル（省力化投資補助金の質問はコチラ）
    const label1 = document.createElement('div');
    label1.id = 'dify-chatbot-label-1';
    label1.className = 'dify-chatbot-label';
    label1.textContent = '省力化投資補助金の質問はコチラ';
    document.body.appendChild(label1);

    // 1つ目のサブラベルは削除（メインラベルに統合）
    // const sublabel1 = document.createElement('div');
    // sublabel1.id = 'dify-chatbot-sublabel-1';
    // sublabel1.className = 'dify-chatbot-sublabel';
    // sublabel1.textContent = '補助金の質問はコチラ';
    // document.body.appendChild(sublabel1);

    // 1つ目のチャットボタン（省力化投資補助金）
    const button1 = document.createElement('button');
    button1.id = 'dify-chatbot-bubble-button-1';
    button1.className = 'dify-chatbot-bubble-button';
    button1.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
    button1.onclick = function() {
      console.log("省力化投資補助金 chatbot button clicked");
      // クリックされたときにDifyのボタンをクリックする
      const difyButton = document.querySelector('dify-chatbot-button');
      if (difyButton) {
        console.log("Triggering click on Dify button");
        // @ts-ignore
        difyButton.click();
      } else {
        console.log("Dify button not found, opening fallback chat window");
        // フォールバック処理
      }
    };
    document.body.appendChild(button1);

    // 2つ目のラベル（小規模持続化補助金の質問はコチラ）
    const label2 = document.createElement('div');
    label2.id = 'dify-chatbot-label-2';
    label2.className = 'dify-chatbot-label';
    label2.textContent = '小規模持続化補助金の質問はコチラ';
    document.body.appendChild(label2);

    // 2つ目のサブラベルは削除（メインラベルに統合）
    // const sublabel2 = document.createElement('div');
    // sublabel2.id = 'dify-chatbot-sublabel-2';
    // sublabel2.className = 'dify-chatbot-sublabel';
    // sublabel2.textContent = '補助金の質問はコチラ';
    // document.body.appendChild(sublabel2);

    // 2つ目のチャットボタン（小規模持続化補助金）
    const button2 = document.createElement('button');
    button2.id = 'dify-chatbot-bubble-button-2';
    button2.className = 'dify-chatbot-bubble-button';
    button2.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>';
    button2.onclick = function() {
      console.log("小規模持続化補助金 chatbot button clicked");
      // 現状では同じDifyボタンをクリックするが、将来的に別のチャットサービスを使用する可能性もある
      const difyButton = document.querySelector('dify-chatbot-button');
      if (difyButton) {
        console.log("Triggering click on Dify button");
        // @ts-ignore
        difyButton.click();
      } else {
        console.log("Dify button not found, opening fallback chat window");
        // フォールバック処理
      }
    };
    document.body.appendChild(button2);

    // 要素の存在を定期的にチェック
    startElementCheck();
  };

  const startElementCheck = () => {
    console.log("Starting element check interval");
    if (checkIntervalRef.current) {
      clearInterval(checkIntervalRef.current);
    }

    checkIntervalRef.current = window.setInterval(() => {
      const button1 = document.getElementById('dify-chatbot-bubble-button-1');
      const label1 = document.getElementById('dify-chatbot-label-1');
      const button2 = document.getElementById('dify-chatbot-bubble-button-2');
      const label2 = document.getElementById('dify-chatbot-label-2');

      if (!button1 || !label1 || !button2 || !label2) {
        console.log("Chatbot elements missing, restoring...");
        addChatbotElements();
      }
    }, 1000); // より短い間隔でチェック
  };

  const cleanup = () => {
    console.log("Cleaning up subsidy chatbot elements");
    // 既存の要素を削除
    ['dify-chat-config', 'yXBz3rzpDBhMgYcB', 'dify-custom-styles', 
     'dify-chatbot-bubble-button-1', 'dify-chatbot-label-1', 'dify-chatbot-sublabel-1',
     'dify-chatbot-bubble-button-2', 'dify-chatbot-label-2', 'dify-chatbot-sublabel-2'].forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        console.log(`Removing element: ${id}`);
        element.remove();
      }
    });

    // インターバルをクリア
    if (checkIntervalRef.current) {
      console.log("Clearing check interval");
      clearInterval(checkIntervalRef.current);
      checkIntervalRef.current = null;
    }
  };

  // フォーカスを戻したときに要素を再チェック
  useEffect(() => {
    const handleFocus = () => {
      console.log("Window focus detected, checking elements");
      const button1 = document.getElementById('dify-chatbot-bubble-button-1');
      const label1 = document.getElementById('dify-chatbot-label-1');
      const button2 = document.getElementById('dify-chatbot-bubble-button-2');
      const label2 = document.getElementById('dify-chatbot-label-2');
      
      if (!button1 || !label1 || !button2 || !label2) {
        console.log("Elements missing after focus, restoring");
        addChatbotElements();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  return null;
};
