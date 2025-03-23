import { useEffect, useRef } from "react";
import { useChatWindows } from "./hooks/useChatWindows";
import { ChatbotInitializer } from "../chatbot/ChatbotInitializer";

/**
 * 補助金チャットボットコンポーネント
 * 小規模持続化補助金チャットボットと省力化投資補助金チャットボットの
 * グローバル関数を提供します
 */
export const SubsidyChatbot = () => {
  const initialized = useRef(false);
  const { startShoukiboJizokaChat, startShorikikaChat, isInitialized } = useChatWindows();

  // グローバル関数の設定
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    console.log("補助金チャットボットグローバル関数を設定します");

    // グローバル関数を設定
    if (typeof window.openShoukiboJizokaChat !== 'function') {
      window.openShoukiboJizokaChat = () => {
        // 実行前に他のウィンドウを閉じる
        closeAllChatWindows();
        startShoukiboJizokaChat();
      };
    }
    
    if (typeof window.openShorikikaChat !== 'function') {
      window.openShorikikaChat = () => {
        // 実行前に他のウィンドウを閉じる
        closeAllChatWindows();
        startShorikikaChat();
      };
    }
    
    // 後方互換性のための関数を設定
    if (typeof window.openSmallBusinessChatbot !== 'function') {
      window.openSmallBusinessChatbot = () => {
        closeAllChatWindows();
        startShoukiboJizokaChat();
      };
    }
    
    if (typeof window.openSubsidyChatbot !== 'function') {
      window.openSubsidyChatbot = () => {
        closeAllChatWindows();
        startShorikikaChat();
      };
    }

    return () => {
      // クリーンアップは必要な場合のみ実行（画面遷移時など）
      console.log("補助金チャットボットグローバル関数をクリーンアップします");
    };
  }, [startShoukiboJizokaChat, startShorikikaChat, isInitialized]);

  // ウィンドウの競合を避けるために他のウィンドウを閉じる関数
  const closeAllChatWindows = () => {
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
        console.log(`${id}を閉じました (SubsidyChatbot)`);
      }
    });
  };

  // ChatbotInitializerを返す
  return <ChatbotInitializer />;
};
