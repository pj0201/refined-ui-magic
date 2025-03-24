import { useState, useEffect, useCallback } from 'react';

/**
 * チャットウィンドウの状態を管理するフック
 */
export const useChatWindows = () => {
  // チャットボットの状態
  const [chatbotStatus, setChatbotStatus] = useState({
    shoukiboLoaded: false,
    shorikikaLoaded: false
  });

  // チャットボットの表示状態
  const [chatbotVisibility, setChatbotVisibility] = useState({
    shoukiboVisible: false,
    shorikikaVisible: false
  });

  // 初期化状態を確認
  useEffect(() => {
    // グローバル変数からチャットボットの初期化状態を確認
    const isInitialized = window.chatbotsInitialized === true;
    
    // グローバル関数が存在するか確認
    const shoukiboFunctionExists = typeof window.openShoukiboJizokaChat === 'function';
    const shorikikaFunctionExists = typeof window.openShorikikaChat === 'function';
    
    setChatbotStatus({
      shoukiboLoaded: isInitialized && shoukiboFunctionExists,
      shorikikaLoaded: isInitialized && shorikikaFunctionExists
    });
    
    // ウィンドウの表示状態を監視
    const checkVisibility = () => {
      const shoukiboWindow = document.getElementById('shoukibo-jizoka-chatbot-window');
      const shorikikaWindow = document.getElementById('shorikika-chatbot-window');
      
      if (shoukiboWindow || shorikikaWindow) {
        setChatbotVisibility({
          shoukiboVisible: shoukiboWindow ? 
            shoukiboWindow.style.display === 'block' || shoukiboWindow.style.display === 'flex' : 
            false,
          shorikikaVisible: shorikikaWindow ? 
            shorikikaWindow.style.display === 'block' || shorikikaWindow.style.display === 'flex' : 
            false
        });
      }
    };
    
    // 初回チェック
    checkVisibility();
    
    // 定期的に表示状態を確認
    const intervalId = setInterval(checkVisibility, 1000);
    
    // クリーンアップ
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // 小規模持続化補助金チャットボットを開く
  const openShoukiboChat = useCallback(() => {
    try {
      // グローバル関数を使用
      if (typeof window.openChatWindow === 'function') {
        window.openChatWindow('shoukibo-jizoka-chatbot-window');
      }
      
      setChatbotVisibility({
        shoukiboVisible: true,
        shorikikaVisible: false
      });
    } catch (error) {
      // エラーを表示しない
    }
  }, []);

  // 省力化投資補助金チャットボットを開く
  const openShorikikaChat = useCallback(() => {
    try {
      // グローバル関数を使用
      if (typeof window.openChatWindow === 'function') {
        window.openChatWindow('shorikika-chatbot-window');
      }
      
      setChatbotVisibility({
        shoukiboVisible: false,
        shorikikaVisible: true
      });
    } catch (error) {
      // エラーを表示しない
    }
  }, []);

  // 全てのチャットボットを閉じる
  const closeAllChats = useCallback(() => {
    try {
      // グローバル関数を使用
      if (typeof window.closeAllChatWindows === 'function') {
        window.closeAllChatWindows();
      }
      
      setChatbotVisibility({
        shoukiboVisible: false,
        shorikikaVisible: false
      });
    } catch (error) {
      // エラーを表示しない
    }
  }, []);

  return {
    chatbotStatus,
    chatbotVisibility,
    openShoukiboChat,
    openShorikikaChat,
    closeAllChats
  };
};

// グローバル型定義の拡張
declare global {
  interface Window {
    // チャットボット関連のグローバル変数
    chatbotsInitialized?: boolean;
    
    // チャットボット関連のグローバル関数
    openShoukiboJizokaChat?: () => void;
    openShorikikaChat?: () => void;
    startShoukiboJizokaChat?: () => void;
    startShorikikaChat?: () => void;
    openSmallBusinessChatbot?: () => void;
    openSubsidyChatbot?: () => void;
    initChatbots?: () => void;
    openChatWindow?: (windowName: string) => void;
    closeAllChatWindows?: () => void;
  }
}
