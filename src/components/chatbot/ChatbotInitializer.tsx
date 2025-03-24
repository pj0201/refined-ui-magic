import React, { useEffect } from 'react';

/**
 * チャットボット初期化コンポーネント
 * DOMが準備できた時点でチャットボットを初期化します
 */
export const ChatbotInitializer: React.FC = () => {
  useEffect(() => {
    // DOMが完全に読み込まれた後にチャットボットを初期化
    const initializeChatbots = () => {
      try {
        // グローバル関数が存在する場合は実行
        if (typeof window.initChatbots === 'function') {
          window.initChatbots();
        }
      } catch (error) {
        // エラーを表示しない
      }
    };

    // DOMContentLoadedイベントが既に発生している場合
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      // 少し遅延させて確実に実行
      setTimeout(initializeChatbots, 100);
    } else {
      // DOMContentLoadedイベントを待つ
      document.addEventListener('DOMContentLoaded', initializeChatbots);
    }

    // カスタムイベントを監視
    const handleChatbotsInitialized = () => {
      // チャットボットが初期化されたことを確認
      window.chatbotsInitialized = true;
    };

    // カスタムイベントリスナーを追加
    document.addEventListener('chatbotsInitialized', handleChatbotsInitialized);

    // クリーンアップ
    return () => {
      document.removeEventListener('DOMContentLoaded', initializeChatbots);
      document.removeEventListener('chatbotsInitialized', handleChatbotsInitialized);
    };
  }, []);

  // UIを表示しない（純粋に機能的なコンポーネント）
  return null;
};
