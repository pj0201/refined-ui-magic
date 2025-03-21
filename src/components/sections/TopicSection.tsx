
import { TopicItem } from "./TopicItem";
import { useTopicData } from "@/hooks/useTopicData";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useChatWindows } from "@/components/SubsidyChat/hooks/useChatWindows";

export const TopicSection = () => {
  const { topics, isLoading, error } = useTopicData();
  const { 
    isInitialized, 
    isShoukiboReady, 
    isShorikikaReady, 
    startShoukiboJizokaChat, 
    startShorikikaChat 
  } = useChatWindows();
  
  const [showStatus, setShowStatus] = useState(false);
  
  // 初期化状態のログ
  useEffect(() => {
    if (isInitialized) {
      console.log(`チャットボット初期化状態: 小規模持続化=${isShoukiboReady}, 省力化投資=${isShorikikaReady}`);
      
      // 両方のチャットボットが初期化されていない場合は注意メッセージを表示
      if (!isShoukiboReady && !isShorikikaReady) {
        setShowStatus(true);
      }
    }
  }, [isInitialized, isShoukiboReady, isShorikikaReady]);

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
        
        {showStatus && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm">
            <p className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              チャットボットの読み込みに問題が発生しています。チャット機能を使用するには、ページの再読み込みをお試しください。
            </p>
          </div>
        )}
        
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
