
import { useState, useEffect } from "react";
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
  }
}

export const ChatbotInitializer = () => {
  const [isDifyLoaded, setIsDifyLoaded] = useState(false);
  const [isShoukiboLoaded, setIsShoukiboLoaded] = useState(false);
  const [isShorikikaLoaded, setIsShorikikaLoaded] = useState(false);

  // すべてのDifyスクリプトのロード状態を確認
  useEffect(() => {
    // 一般的なDifyスクリプトのロード状態を監視
    const checkDifyLoaded = setInterval(() => {
      if (window.difyChatbot || window.DifyAI) {
        console.log("一般的なDifyスクリプトが正常にロードされました");
        setIsDifyLoaded(true);
        clearInterval(checkDifyLoaded);
      }
    }, 1000);

    // 小規模持続化補助金のDifyスクリプトのロード状態を監視
    const checkShoukiboLoaded = setInterval(() => {
      if (window.shoukiboJizokaChatbot) {
        console.log("小規模持続化補助金のDifyスクリプトが正常にロードされました");
        setIsShoukiboLoaded(true);
        clearInterval(checkShoukiboLoaded);
      }
    }, 1000);

    // 省力化投資補助金のDifyスクリプトのロード状態を監視
    const checkShorikikaLoaded = setInterval(() => {
      if (window.shorikika_chatbot) {
        console.log("省力化投資補助金のDifyスクリプトが正常にロードされました");
        setIsShorikikaLoaded(true);
        clearInterval(checkShorikikaLoaded);
      }
    }, 1000);

    return () => {
      clearInterval(checkDifyLoaded);
      clearInterval(checkShoukiboLoaded);
      clearInterval(checkShorikikaLoaded);
    };
  }, []);

  /**
   * 一般的なDifyチャットボットを開く関数
   */
  const openChatbot = () => {
    try {
      console.log("一般的なDifyチャットボットを開きます");
      
      // すでに開いているかチェック
      const chatWindow = document.getElementById('dify-chatbot-bubble-window');
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("チャットウィンドウは既に表示されています");
        return;
      }
      
      // ロードされていなければエラー
      if (!isDifyLoaded) {
        console.error("一般的なDifyスクリプトがロードされていません");
        toast.error("チャットボットの準備ができていません。ページをリロードして再度お試しください。");
        return;
      }

      // 一般的なDifyチャットボットを開く
      if (window.difyChatbot?.toggle) {
        window.difyChatbot.toggle();
      } else if (window.DifyAI?.toggleUI) {
        window.DifyAI.toggleUI(true);
      } else {
        // ボタンをクリック
        const difyButton = document.getElementById('dify-chatbot-bubble-button');
        if (difyButton instanceof HTMLElement) {
          difyButton.click();
        } else {
          throw new Error("Difyのチャットボタンが見つかりませんでした");
        }
      }
    } catch (error) {
      console.error("一般的なチャットボットを開く際にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  };

  /**
   * 小規模持続化補助金チャットボットを開く関数
   */
  const startShoukiboJizokaChat = () => {
    try {
      console.log("小規模持続化補助金のチャットボットを開きます");
      
      // すでに開いているかチェック
      const chatWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("小規模持続化補助金チャットウィンドウは既に表示されています");
        return;
      }
      
      // ロードされていなければエラー
      if (!isShoukiboLoaded) {
        console.error("小規模持続化補助金のDifyスクリプトがロードされていません");
        toast.error("小規模持続化補助金のチャットボットの準備ができていません。ページをリロードして再度お試しください。");
        return;
      }

      // 小規模持続化補助金のチャットボットを開く
      if (window.shoukiboJizokaChatbot?.toggle) {
        window.shoukiboJizokaChatbot.toggle();
        
        // メッセージを送信（少し待機してから）
        setTimeout(() => {
          if (window.shoukiboJizokaChatbot?.sendMessage) {
            window.shoukiboJizokaChatbot.sendMessage("小規模持続化補助金について教えてください");
          }
        }, 1000);
      } else {
        // ボタンをクリック
        const shoukiboButton = document.getElementById('shoukibo-jizoka-chatbot-button');
        if (shoukiboButton instanceof HTMLElement) {
          shoukiboButton.click();
          
          // 実装は保留 - DOMが確実に更新された後に実行する必要がある
          toast.success("小規模持続化補助金のチャットボットが開きました。ご質問をどうぞ。");
        } else {
          throw new Error("小規模持続化補助金のチャットボタンが見つかりませんでした");
        }
      }
    } catch (error) {
      console.error("小規模持続化補助金のチャットボットを開く際にエラーが発生しました:", error);
      toast.error("小規模持続化補助金のチャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  };

  /**
   * 省力化投資補助金チャットボットを開く関数
   */
  const startShorikikaChat = () => {
    try {
      console.log("省力化投資補助金のチャットボットを開きます");
      
      // すでに開いているかチェック
      const chatWindow = document.getElementById('shorikika-chatbot-window');
      if (chatWindow && window.getComputedStyle(chatWindow).display !== 'none') {
        console.log("省力化投資補助金チャットウィンドウは既に表示されています");
        return;
      }
      
      // ロードされていなければエラー
      if (!isShorikikaLoaded) {
        console.error("省力化投資補助金のDifyスクリプトがロードされていません");
        toast.error("省力化投資補助金のチャットボットの準備ができていません。ページをリロードして再度お試しください。");
        return;
      }

      // 省力化投資補助金のチャットボットを開く
      if (window.shorikika_chatbot?.toggle) {
        window.shorikika_chatbot.toggle();
        
        // メッセージを送信（少し待機してから）
        setTimeout(() => {
          if (window.shorikika_chatbot?.sendMessage) {
            window.shorikika_chatbot.sendMessage("省力化投資補助金について教えてください");
          }
        }, 1000);
      } else {
        // ボタンをクリック
        const shorikikaButton = document.getElementById('shorikika-chatbot-button');
        if (shorikikaButton instanceof HTMLElement) {
          shorikikaButton.click();
          
          // 実装は保留 - DOMが確実に更新された後に実行する必要がある
          toast.success("省力化投資補助金のチャットボットが開きました。ご質問をどうぞ。");
        } else {
          throw new Error("省力化投資補助金のチャットボタンが見つかりませんでした");
        }
      }
    } catch (error) {
      console.error("省力化投資補助金のチャットボットを開く際にエラーが発生しました:", error);
      toast.error("省力化投資補助金のチャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  };
  
  return { 
    openChatbot,
    startShorikikaChat,
    startShoukiboJizokaChat,
    isDifyLoaded,
    isShoukiboLoaded,
    isShorikikaLoaded
  };
};
