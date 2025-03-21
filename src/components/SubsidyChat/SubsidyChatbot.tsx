
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
    if (typeof window.startShoukiboJizokaChat !== 'function') {
      window.startShoukiboJizokaChat = startShoukiboJizokaChat;
    }
    
    if (typeof window.startShorikikaChat !== 'function') {
      window.startShorikikaChat = startShorikikaChat;
    }
    
    // 後方互換性のための関数を設定
    if (typeof window.openSmallBusinessChatbot !== 'function') {
      window.openSmallBusinessChatbot = startShoukiboJizokaChat;
    }
    
    if (typeof window.openSubsidyChatbot !== 'function') {
      window.openSubsidyChatbot = startShorikikaChat;
    }

    return () => {
      // クリーンアップは必要な場合のみ実行（画面遷移時など）
      console.log("補助金チャットボットグローバル関数をクリーンアップします");
    };
  }, [startShoukiboJizokaChat, startShorikikaChat, isInitialized]);

  // ChatbotInitializerを返す
  return <ChatbotInitializer />;
};
