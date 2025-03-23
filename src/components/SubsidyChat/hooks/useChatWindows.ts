import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * チャットウィンドウ操作用カスタムフック
 */
export const useChatWindows = () => {
  const [chatbotStatus, setChatbotStatus] = useState({
    shoukiboReady: false,
    shorikikaReady: false,
    initialized: false
  });
  
  // チャットウィンドウを閉じる関数
  const closeAllChatWindows = useCallback(() => {
    const windowIds = [
      'shoukibo-jizoka-chatbot-window',
      'shorikika-chatbot-window',
      'dify-chatbot-bubble-window',
      'mock-chat-window'
    ];
    
    windowIds.forEach(id => {
      const window = document.getElementById(id);
      if (window && window.style.display !== 'none') {
        window.style.display = 'none';
        console.log(`${id}を閉じました (useChatWindows)`);
      }
    });
  }, []);
  
  // 初期化状態を確認
  useEffect(() => {
    // 即時確認
    const initialCheck = () => {
      const shoukiboReady = !!window.shoukiboJizokaChatbot;
      const shorikikaReady = !!window.shorikika_chatbot;
      const isInitialized = !!window.chatbotInitialized;
      
      setChatbotStatus({
        shoukiboReady,
        shorikikaReady,
        initialized: isInitialized || (shoukiboReady && shorikikaReady)
      });
      
      if (shoukiboReady && shorikikaReady && !window.chatbotInitialized) {
        window.chatbotInitialized = true;
        console.log("チャットボット初期化完了を検出しました");
      }
    };
    
    // 初期化イベントのリスナー
    const handleInitialized = (event: any) => {
      const detail = event.detail || {};
      setChatbotStatus({
        shoukiboReady: !!detail.shoukiboLoaded,
        shorikikaReady: !!detail.shorikikaLoaded,
        initialized: true
      });
      
      window.chatbotInitialized = true;
    };
    
    // 最初のチェック
    initialCheck();
    
    // 初期化イベントリスナーを追加
    document.addEventListener('chatbot-initialized', handleInitialized);
    
    // 3秒後に再確認
    const timer = setTimeout(initialCheck, 3000);
    
    return () => {
      document.removeEventListener('chatbot-initialized', handleInitialized);
      clearTimeout(timer);
    };
  }, []);
  
  // 小規模持続化補助金チャットボットを開く関数
  const startShoukiboJizokaChat = useCallback(() => {
    console.log(`小規模持続化補助金チャットボットを開きます（準備状態: ${chatbotStatus.shoukiboReady ? '完了' : '未完了'}）`);
    
    try {
      // 先に他のチャットウィンドウを全て閉じる
      closeAllChatWindows();
      
      if (window.shoukiboJizokaChatbot && typeof window.shoukiboJizokaChatbot.open === 'function') {
        window.shoukiboJizokaChatbot.open();
      } else if (window.shoukiboJizokaChatbot && typeof window.shoukiboJizokaChatbot.toggle === 'function') {
        window.shoukiboJizokaChatbot.toggle();
      } else {
        console.error("小規模持続化補助金チャットボット関数が見つかりません");
        toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
      }
    } catch (error) {
      console.error("小規模持続化補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, [chatbotStatus.shoukiboReady, closeAllChatWindows]);
  
  // 省力化投資補助金チャットボットを開く関数
  const startShorikikaChat = useCallback(() => {
    console.log(`省力化投資補助金チャットボットを開きます（準備状態: ${chatbotStatus.shorikikaReady ? '完了' : '未完了'}）`);
    
    try {
      // 先に他のチャットウィンドウを全て閉じる
      closeAllChatWindows();
      
      if (window.shorikika_chatbot && typeof window.shorikika_chatbot.open === 'function') {
        window.shorikika_chatbot.open();
      } else if (window.shorikika_chatbot && typeof window.shorikika_chatbot.toggle === 'function') {
        window.shorikika_chatbot.toggle();
      } else {
        console.error("省力化投資補助金チャットボット関数が見つかりません");
        toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
      }
    } catch (error) {
      console.error("省力化投資補助金チャットボットの開始中にエラーが発生しました:", error);
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, [chatbotStatus.shorikikaReady, closeAllChatWindows]);

  // ステータスとメソッドを返す
  return {
    isInitialized: chatbotStatus.initialized,
    isShoukiboReady: chatbotStatus.shoukiboReady,
    isShorikikaReady: chatbotStatus.shorikikaReady,
    startShoukiboJizokaChat,
    startShorikikaChat,
    closeAllChatWindows
  };
};
