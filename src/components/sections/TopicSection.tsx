
import { TopicItem } from "./TopicItem";
import { useTopicData } from "@/hooks/useTopicData";
import { useEffect, useState, useCallback, useRef } from "react";
import { toast } from "sonner";

export const TopicSection = () => {
  const { topics, isLoading, error } = useTopicData();
  const [chatbotsReady, setChatbotsReady] = useState(false);
  const chatInitialized = useRef(false);
  
  // チャットボットの開始関数
  const startShoukiboJizokaChat = useCallback(() => {
    if (typeof window.startShoukiboJizokaChat === 'function') {
      window.startShoukiboJizokaChat();
    } else {
      console.error("小規模持続化補助金チャットボット関数が見つかりません");
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);
  
  const startShorikikaChat = useCallback(() => {
    if (typeof window.startShorikikaChat === 'function') {
      window.startShorikikaChat();
    } else {
      console.error("省力化投資補助金チャットボット関数が見つかりません");
      toast.error("チャットボットを開けませんでした。ページを再読み込みしてください。");
    }
  }, []);

  // チャットボットの読み込み状態を確認
  useEffect(() => {
    const checkChatsReady = () => {
      // グローバル関数が設定されているかを確認
      if (typeof window.startShoukiboJizokaChat === 'function' || 
          typeof window.startShorikikaChat === 'function') {
        setChatbotsReady(true);
        return true;
      }
      return false;
    };
    
    // 初回チェック
    if (checkChatsReady()) return;
    
    // 定期的に確認
    const interval = setInterval(() => {
      if (checkChatsReady()) {
        clearInterval(interval);
      }
    }, 1000);
    
    // 10秒後にタイムアウト
    const timeout = setTimeout(() => {
      if (!chatbotsReady) {
        console.log("チャットボットの読み込みがタイムアウトしました");
        clearInterval(interval);
      }
    }, 10000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [chatbotsReady]);

  // トピックに応じたチャットボットを開く関数
  const handleTopicChat = useCallback((content: string) => {
    console.log(`トピックチャット開始: ${content}`);
    
    try {
      // 小規模持続化補助金のチャットボットを開く
      if (content.includes('小規模持続化補助金')) {
        startShoukiboJizokaChat();
        return;
      }
      
      // 省力化投資補助金のチャットボットを開く
      if (content.includes('省力化投資補助金')) {
        startShorikikaChat();
        return;
      }
      
      // デフォルトは小規模持続化補助金チャットボットを開く
      startShoukiboJizokaChat();
    } catch (error) {
      console.error('チャットボットを開く際にエラーが発生しました:', error);
      toast.error('チャットボットを開けませんでした。ページを再読み込みしてください。');
    }
  }, [startShoukiboJizokaChat, startShorikikaChat]);

  if (isLoading) return <div className="loading">トピックを読み込み中...</div>;
  
  // エラー処理
  if (error) {
    const errorMessage = typeof error === 'string' 
      ? error 
      : typeof error === 'object' && error !== null && 'message' in error
        ? (error as { message: string }).message
        : "不明なエラーが発生しました";
    
    return <div className="error">エラーが発生しました: {errorMessage}</div>;
  }
  
  if (!topics || topics.length === 0) return <div className="no-topics">トピックがありません</div>;

  return (
    <section className="topics-section">
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">よくあるご質問</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic) => (
            <TopicItem 
              key={topic.id} 
              {...topic} 
              openChatbot={() => handleTopicChat(topic.content)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
