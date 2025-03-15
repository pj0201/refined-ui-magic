
import { useEffect } from "react";
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
  }
}

/**
 * Dify専用のチャットボットコンポーネント
 */
export const SubsidyChatbot = () => {
  useEffect(() => {
    // Difyスクリプトのロード状態を監視
    const checkDifyLoaded = setInterval(() => {
      if (window.difyChatbot || window.DifyAI) {
        console.log("Difyスクリプトが正常にロードされました");
        clearInterval(checkDifyLoaded);
      }
    }, 1000);
    
    // クリーンアップ
    return () => {
      clearInterval(checkDifyLoaded);
    };
  }, []);
  
  return null;
};

/**
 * チャットボットを開く関数
 */
export const openChatbot = () => {
  try {
    console.log("Difyチャットボットを開きます");
    
    // チャットウィンドウをチェック
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
      console.log("チャットウィンドウは既に表示されています");
      return;
    }
    
    // Difyチャットボットを開く
    if (window.difyChatbot && typeof window.difyChatbot.toggle === 'function') {
      console.log("difyChatbot APIを使用");
      window.difyChatbot.toggle();
    } else if (window.DifyAI && typeof window.DifyAI.toggleUI === 'function') {
      console.log("DifyAI APIを使用");
      window.DifyAI.toggleUI(true);
    } else {
      // 非常時にはデフォルトのボタンをクリック
      console.log("デフォルトの方法を使用");
      const difyButton = document.getElementById('dify-chatbot-bubble-button');
      if (difyButton && difyButton instanceof HTMLElement) {
        difyButton.click();
      } else {
        throw new Error("Difyのチャットボタンが見つかりませんでした");
      }
    }
  } catch (error) {
    console.error("チャットボットを開く際にエラーが発生しました:", error);
    toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
  }
};
