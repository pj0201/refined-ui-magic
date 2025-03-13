
import { useEffect, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

/**
 * Difyチャットボット統合のためのカスタムフック
 */
export const useDifyChat = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const difyToken = 'UlZEhca44ZNfJtdS'; // Difyプロジェクトのトークン

  useEffect(() => {
    console.log('Difyチャットボットを初期化します...');

    // グローバル設定オブジェクトを作成
    if (!window.difyChatbotConfig) {
      window.difyChatbotConfig = {
        token: difyToken
      };
    }

    // スクリプトが既にロードされているかチェック
    const existingScript = document.getElementById(difyToken) as HTMLScriptElement;
    if (existingScript) {
      console.log('Difyスクリプトは既に読み込まれています');
      setIsLoaded(true);
      return;
    }

    // カスタムスタイルの適用
    const style = document.createElement('style');
    style.id = 'dify-custom-styles';
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        max-height: 80vh !important;
        bottom: 80px !important;
        right: 20px !important;
      }
    `;
    document.head.appendChild(style);

    // スクリプトの作成と追加
    const script = document.createElement('script');
    script.id = difyToken;
    script.src = 'https://udify.app/embed.min.js';
    script.defer = true;
    script.async = true;

    // スクリプトのロードイベント
    script.onload = () => {
      console.log('Difyスクリプトが正常に読み込まれました');
      setIsLoaded(true);
      setIsError(false);
    };

    // スクリプトのエラーイベント
    script.onerror = (e) => {
      console.error('Difyスクリプトの読み込みに失敗しました:', e);
      setIsError(true);
      toast({
        title: "チャットボットの読み込みに失敗しました",
        description: "ネットワーク接続を確認して、ページを再読み込みしてください",
        variant: "destructive",
        duration: 5000,
      });
    };

    document.head.appendChild(script);

    // クリーンアップ関数
    return () => {
      // スクリプトの削除
      const scriptToRemove = document.getElementById(difyToken);
      if (scriptToRemove) scriptToRemove.remove();

      // スタイルの削除
      const styleToRemove = document.getElementById('dify-custom-styles');
      if (styleToRemove) styleToRemove.remove();

      console.log('Difyチャットボットリソースをクリーンアップしました');
    };
  }, []);

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
