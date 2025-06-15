import { TopicItem } from "./TopicItem";
import { useTopicData } from "@/hooks/useTopicData";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { useChatWindows } from "@/components/SubsidyChat/hooks/useChatWindows";
import { ChatDialog } from "@/components/CustomChat/ChatDialog";
import { Topic } from "@/data/topicsData";

export const TopicSection = () => {
  const { topics, isLoading, error } = useTopicData();
  const { 
    chatbotStatus, 
    openShoukiboChat, 
  } = useChatWindows();
  
  const [showStatus, setShowStatus] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState("");
  
  useEffect(() => {
    const isInitialized = window.chatbotsInitialized === true;
    console.log(`TopicSection: チャットボット初期化状態:`, {
      isInitialized,
      chatbotStatus
    });
    
    if (!isInitialized || (!chatbotStatus.shoukiboLoaded && !chatbotStatus.shorikikaLoaded)) {
      setShowStatus(true);
    } else {
      setShowStatus(false);
    }
    
    const handleInitialized = () => {
      console.log('TopicSection: チャットボット初期化完了イベントを受信しました');
      setShowStatus(false);
    };
    
    document.addEventListener('chatbotsInitialized', handleInitialized);
    
    return () => {
      document.removeEventListener('chatbotsInitialized', handleInitialized);
    };
  }, [chatbotStatus]);

  const handleTopicChat = useCallback((topic: Topic) => {
    console.log(`トピックチャット開始: ${topic.content}`);

    try {
      if (topic.id === 6) { // 省力化投資補助金
        setChatTitle("省力化投資補助金AI相談");
        setIsChatOpen(true);
        return;
      }
      
      if (topic.id === 2) { // 小規模持続化補助金
        setChatTitle("小規模事業者持続化補助金AI相談");
        setIsChatOpen(true);
        return;
      }
      
      // Fallback to shoukibo chat
      openShoukiboChat();

    } catch (error) {
      console.error('チャットボットを開く際にエラーが発生しました:', error);
      toast.error('チャットボットを開けませんでした。ページを再読み込みしてください。');
    }
  }, [openShoukiboChat]);

  if (isLoading) return <div className="loading">トピックを読み込み中...</div>;
  
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
    <section className="topics-section relative py-20 px-4 overflow-hidden">
      {/* 背景画像 */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url("https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80")`,
          filter: 'brightness(0.9)'
        }}
      />
      
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-white/70 z-[1]"></div>
      
      <div className="container mx-auto fade-in relative z-10">
        <h2 className="text-3xl font-bold mb-8 text-center">お知らせ</h2>
        
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:auto-rows-fr">
          {topics.map((topic) => (
            <TopicItem 
              key={topic.id} 
              {...topic} 
              openChatbot={() => handleTopicChat(topic)} 
            />
          ))}
        </div>
      </div>
      <ChatDialog
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        title={chatTitle}
      />
    </section>
  );
};
