import { TopicItem } from "./TopicItem";
import { useTopicData } from "@/hooks/useTopicData";
import { useChatbotInitializer } from "./ChatbotInitializer";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";

export const TopicSection = () => {
  const { topics, isLoading, error } = useTopicData();
  const [chatbotsReady, setChatbotsReady] = useState(false);
  
  // useChatbotInitializerフックから関数を取得
  const { 
    openChatbot, 
    startShorikikaChat, 
    startShoukiboJizokaChat,
    isDifyLoaded,
    isShoukiboLoaded,
    isShorikikaLoaded
  } = useChatbotInitializer();

  // チャットボットの読み込み状態を監視
  useEffect(() => {
    if (isDifyLoaded || isShoukiboLoaded || isShorikikaLoaded) {
      setChatbotsReady(true);
    }
  }, [isDifyLoaded, isShoukiboLoaded, isShorikikaLoaded]);

  // トピックに応じたチャットボットを開く関数
  const handleTopicChat = useCallback((content: string) => {
    console.log(`トピックチャット開始: ${content}`);
    
    try {
      // 小規模持続化補助金のチャットボットを開く
      if (content.includes('小規模持続化補助金')) {
        console.log('小規模持続化補助金のチャットボットを開きます');
        startShoukiboJizokaChat();
        return;
      }
      
      // 省力化投資補助金のチャットボットを開く
      if (content.includes('省力化投資補助金')) {
        console.log('省力化投資補助金のチャットボットを開きます');
        startShorikikaChat();
        return;
      }
      
      // 一般チャットボットを開く（デフォルト）
      console.log('一般チャットボットを開きます');
      openChatbot();
    } catch (error) {
      console.error('チャットボットを開く際にエラーが発生しました:', error);
      toast.error('チャットボットを開けませんでした。ページを再読み込みしてください。');
    }
  }, [openChatbot, startShoukiboJizokaChat, startShorikikaChat]);

  if (isLoading) return <div className="loading">トピックを読み込み中...</div>;
  if (error) return <div className="error">エラーが発生しました: {error instanceof Error ? error.message : String(error)}</div>;
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
