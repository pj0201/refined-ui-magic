
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
    
    // 追加: 設定オブジェクト
    difyChatbotConfig?: {
      token: string;
    };
    shoukiboJizokaChatbotConfig?: {
      token: string;
    };
    shorikika_chatbot_config?: {
      token: string;
    };
  }
}

export const ChatbotInitializer = () => {
  const [isDifyLoaded, setIsDifyLoaded] = useState(false);
  const [isShoukiboLoaded, setIsShoukiboLoaded] = useState(false);
  const [isShorikikaLoaded, setIsShorikikaLoaded] = useState(false);
  
  // チャットボットの読み込み状態を定期的に確認
  useEffect(() => {
    const checkInterval = 500; // 500ms間隔でチェック
    const maxCheckTime = 30000; // 30秒を最大待機時間とする
    let elapsedTime = 0;
    
    console.log("チャットボットの読み込み状態の監視を開始します");
    
    // 一般的なDifyスクリプトのロード状態を監視
    const checkDifyLoaded = setInterval(() => {
      if (window.difyChatbot || window.DifyAI) {
        console.log("一般的なDifyスクリプトが正常にロードされました");
        setIsDifyLoaded(true);
        clearInterval(checkDifyLoaded);
      } else {
        elapsedTime += checkInterval;
        if (elapsedTime >= maxCheckTime && !isDifyLoaded) {
          console.warn("一般的なDifyスクリプトのロードがタイムアウトしました");
          clearInterval(checkDifyLoaded);
        }
      }
    }, checkInterval);

    // 小規模持続化補助金のDifyスクリプトのロード状態を監視
    const checkShoukiboLoaded = setInterval(() => {
      if (window.shoukiboJizokaChatbot) {
        console.log("小規模持続化補助金のDifyスクリプトが正常にロードされました");
        setIsShoukiboLoaded(true);
        clearInterval(checkShoukiboLoaded);
      } else {
        elapsedTime += checkInterval;
        if (elapsedTime >= maxCheckTime && !isShoukiboLoaded) {
          console.warn("小規模持続化補助金のDifyスクリプトのロードがタイムアウトしました");
          clearInterval(checkShoukiboLoaded);
        }
      }
    }, checkInterval);

    // 省力化投資補助金のDifyスクリプトのロード状態を監視
    const checkShorikikaLoaded = setInterval(() => {
      if (window.shorikika_chatbot) {
        console.log("省力化投資補助金のDifyスクリプトが正常にロードされました");
        setIsShorikikaLoaded(true);
        clearInterval(checkShorikikaLoaded);
      } else {
        elapsedTime += checkInterval;
        if (elapsedTime >= maxCheckTime && !isShorikikaLoaded) {
          console.warn("省力化投資補助金のDifyスクリプトのロードがタイムアウトしました");
          clearInterval(checkShorikikaLoaded);
        }
      }
    }, checkInterval);

    return () => {
      clearInterval(checkDifyLoaded);
      clearInterval(checkShoukiboLoaded);
      clearInterval(checkShorikikaLoaded);
    };
  }, []);

  /**
   * 一般的なDifyチャットボットを開く関数
   */
  const openChatbot = useCallback(() => {
    try {
      console.log("一般的なDifyチャットボットを開きます");
      
      if (!isDifyLoaded) {
        console.warn("一般的なDifyスクリプトがロードされていません");
        toast.error("チャットボットの準備ができていません。しばらくお待ちいただくか、ページを再読み込みしてください。");
        return;
      }
      
      // 一般的なDifyチャットボットを開く
      if (window.difyChatbot?.toggle) {
        window.difyChatbot.toggle();
        console.log("difyChatbot.toggleを使用してチャットボットを開きました");
      } else if (window.DifyAI?.toggleUI) {
        window.DifyAI.toggleUI(true);
        console.log("DifyAI.toggleUIを使用してチャットボットを開きました");
      } else {
        console.log("代替方法でチャットボタンをクリックします");
        // ボタンをクリック
        const difyButton = document.getElementById('dify-chatbot-bubble-button');
        if (difyButton instanceof HTMLElement) {
          difyButton.click();
          console.log("dify-chatbot-bubble-buttonをクリックしました");
        } else {
          throw new Error("Difyのチャットボタンが見つかりませんでした");
        }
      }
    } catch (error) {
      console.error("一般的なチャットボットを開く際にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, [isDifyLoaded]);

  /**
   * 小規模持続化補助金チャットボットを開く関数
   */
  const startShoukiboJizokaChat = useCallback(() => {
    try {
      console.log("小規模持続化補助金のチャットボットを開きます");
      
      if (!isShoukiboLoaded) {
        console.error("小規模持続化補助金のDifyスクリプトがロードされていません");
        toast.error("小規模持続化補助金のチャットボットの準備ができていません。しばらくお待ちいただくか、ページを再読み込みしてください。");
        return;
      }
      
      // 小規模持続化補助金のチャットボットを開く
      if (window.shoukiboJizokaChatbot?.toggle) {
        window.shoukiboJizokaChatbot.toggle();
        console.log("shoukiboJizokaChatbot.toggleを使用してチャットボットを開きました");
        
        // メッセージを送信（少し待機してから）
        setTimeout(() => {
          if (window.shoukiboJizokaChatbot?.sendMessage) {
            window.shoukiboJizokaChatbot.sendMessage("小規模持続化補助金について教えてください");
            console.log("小規模持続化補助金の初期メッセージを送信しました");
          }
        }, 1000);
      } else {
        console.log("代替方法で小規模持続化補助金チャットボタンをクリックします");
        // ボタンをクリック
        const shoukiboButton = document.getElementById('shoukibo-jizoka-chatbot-button');
        if (shoukiboButton instanceof HTMLElement) {
          shoukiboButton.click();
          console.log("shoukibo-jizoka-chatbot-buttonをクリックしました");
          toast.success("小規模持続化補助金のチャットボットが開きました。ご質問をどうぞ。");
        } else {
          throw new Error("小規模持続化補助金のチャットボタンが見つかりませんでした");
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
      console.log("省力化投資補助金のチャットボットを開きます");
      
      if (!isShorikikaLoaded) {
        console.error("省力化投資補助金のDifyスクリプトがロードされていません");
        toast.error("省力化投資補助金のチャットボットの準備ができていません。しばらくお待ちいただくか、ページを再読み込みしてください。");
        return;
      }
      
      // 省力化投資補助金のチャットボットを開く
      if (window.shorikika_chatbot?.toggle) {
        window.shorikika_chatbot.toggle();
        console.log("shorikika_chatbot.toggleを使用してチャットボットを開きました");
        
        // メッセージを送信（少し待機してから）
        setTimeout(() => {
          if (window.shorikika_chatbot?.sendMessage) {
            window.shorikika_chatbot.sendMessage("省力化投資補助金について教えてください");
            console.log("省力化投資補助金の初期メッセージを送信しました");
          }
        }, 1000);
      } else {
        console.log("代替方法で省力化投資補助金チャットボタンをクリックします");
        // ボタンをクリック
        const shorikikaButton = document.getElementById('shorikika-chatbot-button');
        if (shorikikaButton instanceof HTMLElement) {
          shorikikaButton.click();
          console.log("shorikika-chatbot-buttonをクリックしました");
          toast.success("省力化投資補助金のチャットボットが開きました。ご質問をどうぞ。");
        } else {
          throw new Error("省力化投資補助金のチャットボタンが見つかりませんでした");
        }
      }
    } catch (error) {
      console.error("省力化投資補助金のチャットボットを開く際にエラーが発生しました:", error);
      toast.error("省力化投資補助金のチャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, [isShorikikaLoaded]);
  
  return { 
    openChatbot,
    startShorikikaChat,
    startShoukiboJizokaChat,
    isDifyLoaded,
    isShoukiboLoaded,
    isShorikikaLoaded
  };
};
