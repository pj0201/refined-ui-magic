
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
  const { startShoukiboJizokaChat, startShorikikaChat } = useChatWindows();

  // グローバル関数の設定
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    console.log("補助金チャットボットグローバル関数を設定します");

    // グローバル関数を設定
    window.startShoukiboJizokaChat = startShoukiboJizokaChat;
    window.startShorikikaChat = startShorikikaChat;
    
    // 後方互換性のための関数を設定
    window.openSmallBusinessChatbot = startShoukiboJizokaChat;
    window.openSubsidyChatbot = startShorikikaChat;

    return () => {
      // クリーンアップ（画面遷移時）
      console.log("補助金チャットボットグローバル関数をクリーンアップします");
      
      // グローバル関数を削除
      delete window.startShoukiboJizokaChat;
      delete window.startShorikikaChat;
      delete window.openSmallBusinessChatbot;
      delete window.openSubsidyChatbot;
    };
  }, [startShoukiboJizokaChat, startShorikikaChat]);

  // ChatbotInitializerを返す
  return <ChatbotInitializer />;
};
