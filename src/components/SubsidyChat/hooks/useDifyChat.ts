
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

      // カスタムスタイルの適用
      const style = document.createElement('style');
      style.id = 'dify-custom-styles';
      style.textContent = `
        #dify-chatbot-bubble-button {
          background-color: #1C64F2 !important;
          width: 48px !important;
          height: 48px !important;
          bottom: 20px !important;
          right: 20px !important;
          position: fixed !important;
          border-radius: 50% !important;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
          z-index: 2147483647 !important;
        }
        #dify-chatbot-bubble-window {
          width: 24rem !important;
          height: 40rem !important;
          max-height: 80vh !important;
          bottom: 80px !important;
          right: 20px !important;
          position: fixed !important;
          z-index: 2147483646 !important;
          border-radius: 12px !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
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
      // asyncとdeferを両方設定しない
      script.defer = true;
      
      // スクリプトのロードイベント
      script.onload = () => {
        console.log('Difyスクリプトが正常に読み込まれました');
        scriptRef.current = script;
        setIsLoaded(true);
        setIsError(false);
        setRetryCount(0);
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

    // チャットボットのロード
    loadChatbot();

    // クリーンアップ関数
    return () => {
      console.log('Difyチャットボットリソースをクリーンアップします');
      
      // グローバル設定をリセット
      if (typeof window !== 'undefined' && window.difyChatbotConfig) {
        delete window.difyChatbotConfig;
      }
      
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
