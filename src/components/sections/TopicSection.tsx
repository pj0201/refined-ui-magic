
import { TopicItem } from "./TopicItem";
import { useTopicData } from "@/hooks/useTopicData";
import { useEffect, useState } from "react";
import { Topic } from "@/data/topicsData";

export const TopicSection = () => {
  const { topics, isLoading, error } = useTopicData();
  
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    setShowStatus(false);
  }, []);

  const handleTopicChat = (topic: Topic) => {
    console.log(`トピック選択: ${topic.content}`);
    // チャット機能は削除されました
  };

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
        <h2 className="text-3xl font-bold text-center mb-8">お知らせ</h2>
        
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
    </section>
  );
};
