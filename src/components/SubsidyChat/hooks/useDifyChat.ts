
import { useEffect, useState, useRef } from 'react';
import { toast } from '@/components/ui/use-toast';

/**
 * Difyチャットボット統合のためのカスタムフック
 * - スクリプト読み込み状態を管理
 * - スタイル適用とDOMクリーンアップを制御
 */
export const useDifyChat = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);
  const difyToken = 'UlZEhca44ZNfJtdS'; // Difyプロジェクトのトークン
  const maxRetries = 3;

  // チャットボットの初期化
  useEffect(() => {
    console.log('Difyチャットボットを初期化します...');
    
    // コンポーネントがマウントされる前にグローバル設定が存在するかチェック
    if (typeof window !== 'undefined') {
      // まずグローバル設定オブジェクトを作成
      window.difyChatbotConfig = {
        token: difyToken
      };

      console.log('グローバル設定を初期化しました:', window.difyChatbotConfig);
    }

    const loadChatbot = () => {
      // スクリプトが既にロードされているかチェック
      const existingScript = document.getElementById(difyToken) as HTMLScriptElement;
      if (existingScript) {
        console.log('Difyスクリプトは既に読み込まれています');
        scriptRef.current = existingScript;
        setIsLoaded(true);
        return;
      }

      // カスタムスタイルの適用 - 右側に1行で表示するスタイル
      const style = document.createElement('style');
      style.id = 'dify-custom-styles';
      style.textContent = `
        .chatbot-elements-container {
          position: fixed !important;
          right: 20px !important;
          top: 20px !important;
          display: flex !important;
          flex-direction: column !important;
          gap: 11px !important;
          z-index: 2147483646 !important;
        }

        .dify-chatbot-bubble-button {
          width: 32px !important;
          height: 32px !important;
          border-radius: 50% !important;
          background-color: #1C64F2 !important;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
          border: none !important;
          cursor: pointer !important;
          z-index: 2147483647 !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          opacity: 1 !important;
          visibility: visible !important;
          position: relative !important;
          margin-left: auto !important;
        }

        .dify-chatbot-label {
          color: #22C55E !important;
          font-size: 11px !important;
          text-align: center !important;
          letter-spacing: 1px !important;
          line-height: 1.2 !important;
          white-space: nowrap !important;
          z-index: 2147483646 !important;
          font-weight: normal !important;
          text-shadow: 0 0 1px rgba(0,0,0,0.2) !important;
          transition: color 0.3s ease !important;
          width: 32px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          writing-mode: vertical-rl !important;
          text-orientation: upright !important;
          background-color: rgba(255, 255, 255, 0.9) !important;
          padding: 8px 0 !important;
          border-radius: 16px !important;
          position: relative !important;
          margin-left: auto !important;
          margin-bottom: 2px !important;
        }

        .dify-chatbot-label:hover {
          color: #4ADE80 !important;
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
          z-index: 2147483647 !important;
          overflow: hidden !important;
        }
      `;
      document.head.appendChild(style);
      styleRef.current = style;
      console.log('カスタムスタイルを適用しました');

      // スクリプトの作成と追加
      const script = document.createElement('script');
      script.id = difyToken;
      script.src = 'https://udify.app/embed.min.js';
      // deferのみを使用（asyncは削除）
      script.defer = true;
      
      // スクリプトのロードイベント
      script.onload = () => {
        console.log('Difyスクリプトが正常に読み込まれました');
        scriptRef.current = script;
        setIsLoaded(true);
        setIsError(false);
        setRetryCount(0);
        
        // スクリプト読み込み後にDOMを確認
        setTimeout(() => {
          addElementsIfNeeded();
        }, 1000);
      };

      // スクリプトのエラーイベント
      script.onerror = (e) => {
        console.error('Difyスクリプトの読み込みに失敗しました:', e);
        
        if (retryCount < maxRetries) {
          console.log(`再試行 ${retryCount + 1}/${maxRetries}...`);
          setRetryCount(prev => prev + 1);
          
          // 短い遅延後に再試行
          setTimeout(() => {
            script.remove();
            loadChatbot();
          }, 2000);
        } else {
          setIsError(true);
          toast({
            title: "チャットボットの読み込みに失敗しました",
            description: "ネットワーク接続を確認して、ページを再読み込みしてください",
            variant: "destructive",
            duration: 5000,
          });
        }
      };

      document.head.appendChild(script);
      console.log('Difyスクリプトをヘッドに追加しました');
    };
    
    // 必要な場合は要素を追加
    const addElementsIfNeeded = () => {
      const container = document.querySelector('.chatbot-elements-container');
      if (!container) return;
      
      // ラベルと吹き出しボタンを確認
      const existingLabel = document.querySelector('.dify-chatbot-label');
      const existingButton = document.querySelector('.dify-chatbot-bubble-button');
      
      // 要素が存在しない場合は作成
      if (!existingLabel) {
        const label = document.createElement('div');
        label.className = 'dify-chatbot-label';
        label.textContent = '補助金相談';
        container.appendChild(label);
      }
      
      if (!existingButton) {
        // ボタンは通常スクリプトによって自動的に追加されるので、
        // ここでの追加は不要かもしれませんが、念のため
        const button = document.createElement('button');
        button.className = 'dify-chatbot-bubble-button';
        button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" stroke="white" stroke-width="2" stroke-linejoin="round"></path><path d="M8 10.5H16" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 14H13.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
        container.appendChild(button);
      }
    };

    // チャットボットのロード
    loadChatbot();

    // 定期的にDOMを確認して要素を追加
    const checkInterval = setInterval(() => {
      if (isLoaded) {
        addElementsIfNeeded();
      }
    }, 2000);

    // クリーンアップ関数
    return () => {
      console.log('Difyチャットボットリソースをクリーンアップします');
      
      // グローバル設定をリセット
      if (typeof window !== 'undefined' && window.difyChatbotConfig) {
        delete window.difyChatbotConfig;
      }
      
      // インターバルをクリア
      clearInterval(checkInterval);
      
      // スクリプトの削除
      if (scriptRef.current) {
        scriptRef.current.remove();
        scriptRef.current = null;
      }

      // スタイルの削除
      if (styleRef.current) {
        styleRef.current.remove();
        styleRef.current = null;
      }

      // Dify要素をDOM内から探して削除
      const difyElements = document.querySelectorAll('[id^="dify-"]');
      difyElements.forEach(element => {
        element.remove();
      });
      
      // カスタム要素も削除
      const customElements = document.querySelectorAll('.dify-chatbot-label, .dify-chatbot-bubble-button');
      customElements.forEach(element => {
        element.remove();
      });

      setIsLoaded(false);
      console.log('Difyチャットボットリソースをクリーンアップしました');
    };
  }, [retryCount]);

  // DOMチェックとスタイル修正の定期的な実行
  useEffect(() => {
    if (!isLoaded) return;

    // チャットボット要素が追加されたか監視
    const checkInterval = setInterval(() => {
      const bubbleButton = document.getElementById('dify-chatbot-bubble-button');
      const bubbleWindow = document.getElementById('dify-chatbot-bubble-window');
      
      if (bubbleButton && !bubbleButton.getAttribute('data-styled')) {
        bubbleButton.setAttribute('data-styled', 'true');
        console.log('チャットボタンスタイルを適用しました');
      }
      
      if (bubbleWindow && !bubbleWindow.getAttribute('data-styled')) {
        bubbleWindow.setAttribute('data-styled', 'true');
        console.log('チャットウィンドウスタイルを適用しました');
      }
    }, 1000);

    return () => {
      clearInterval(checkInterval);
    };
  }, [isLoaded]);

  return { isLoaded, isError };
};

// グローバル設定用の型定義を追加
declare global {
  interface Window {
    difyChatbotConfig?: {
      token: string;
    };
  }
}
