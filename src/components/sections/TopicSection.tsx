
import { TopicItem } from "./TopicItem";
import { useTopicData } from "@/hooks/useTopicData";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useChatWindows } from "@/components/SubsidyChat/hooks/useChatWindows";

export const TopicSection = () => {
  const { topics, isLoading, error } = useTopicData();
  const { 
    chatbotStatus, 
    chatbotVisibility,
    openShoukiboChat, 
    openShorikikaChat 
  } = useChatWindows();
  
  const [showStatus, setShowStatus] = useState(false);
  
  // 初期化状態のログと監視
  useEffect(() => {
    const isInitialized = window.chatbotsInitialized === true;
    console.log(`TopicSection: チャットボット初期化状態:`, {
      isInitialized,
      chatbotStatus
    });
    
    // 両方のチャットボットが初期化されていない場合は注意メッセージを表示
    if (!isInitialized || (!chatbotStatus.shoukiboLoaded && !chatbotStatus.shorikikaLoaded)) {
      setShowStatus(true);
    } else {
      setShowStatus(false);
    }
    
    // 初期化完了イベントのリスナー
    const handleInitialized = () => {
      console.log('TopicSection: チャットボット初期化完了イベントを受信しました');
      setShowStatus(false);
    };
    
    // イベントリスナーを追加
    document.addEventListener('chatbotsInitialized', handleInitialized);
    
    // クリーンアップ
    return () => {
      document.removeEventListener('chatbotsInitialized', handleInitialized);
    };
  }, [chatbotStatus]);

  // トピックに応じたチャットボットを開く関数
  const handleTopicChat = useCallback((content: string) => {
    console.log(`トピックチャット開始: ${content}`);
    
    try {
      // チャットボットが初期化されていない場合は初期化を試みる
      if (!window.chatbotsInitialized && typeof window.initChatbots === 'function') {
        console.log('チャットボットが初期化されていないため、初期化を試みます');
        window.initChatbots();
        // 初期化後に少し待ってからチャットを開く
        setTimeout(() => {
          openChatForTopic(content);
        }, 1000);
        return;
      }
      
      // 通常の処理
      openChatForTopic(content);
    } catch (error) {
      console.error('チャットボットを開く際にエラーが発生しました:', error);
      toast.error('チャットボットを開けませんでした。ページを再読み込みしてください。');
    }
  }, [openShoukiboChat, openShorikikaChat]);
  
  // トピックに応じたチャットボットを開く内部関数
  const openChatForTopic = useCallback((content: string) => {
    // 小規模持続化補助金のチャットボットを開く
    if (content.includes('小規模持続化補助金')) {
      openShoukiboChat();
      return;
    }
    
    // 省力化投資補助金のチャットボットを開く
    if (content.includes('省力化投資補助金')) {
      openShorikikaChat();
      return;
    }
    
    // デフォルトは小規模持続化補助金チャットボットを開く
    openShoukiboChat();
  }, [openShoukiboChat, openShorikikaChat]);

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
        <h2 className="text-3xl font-bold mb-8 text-center">トピックス</h2>
        
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
