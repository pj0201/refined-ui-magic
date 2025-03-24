import React, { useEffect } from 'react';
import { useChatWindows } from './hooks/useChatWindows';

/**
 * 補助金チャットボットコンポーネント
 * チャットボットの初期化と操作のためのグローバル関数を設定
 */
export const SubsidyChatbot: React.FC = () => {
  // チャットウィンドウの状態と操作関数を取得
  const { 
    chatbotStatus, 
    openShoukiboChat, 
    openShorikikaChat 
  } = useChatWindows();

  // グローバル関数を設定
  useEffect(() => {
    // 小規模持続化補助金チャットボット用のグローバル関数
    if (typeof window.openShoukiboJizokaChat !== 'function') {
      window.openShoukiboJizokaChat = openShoukiboChat;
    }

    // 省力化投資補助金チャットボット用のグローバル関数
    if (typeof window.openShorikikaChat !== 'function') {
      window.openShorikikaChat = openShorikikaChat;
    }

    // 後方互換性のための関数
    window.startShoukiboJizokaChat = window.openShoukiboJizokaChat;
    window.startShorikikaChat = window.openShorikikaChat;
    window.openSmallBusinessChatbot = window.openShoukiboJizokaChat;
    window.openSubsidyChatbot = window.openShorikikaChat;
  }, [openShoukiboChat, openShorikikaChat]);

  // チャットボットの初期化を試みる
  useEffect(() => {
    // チャットボットが初期化されていない場合
    if (!window.chatbotsInitialized && typeof window.initChatbots === 'function') {
      window.initChatbots();
    }
  }, []);

  // UIを表示しない（純粋に機能的なコンポーネント）
  return null;
};
