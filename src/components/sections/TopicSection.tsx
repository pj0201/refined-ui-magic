
import { TopicItem } from "./TopicItem";
import { useTopicData } from "@/hooks/useTopicData";
import { ChatbotInitializer } from "./ChatbotInitializer";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export const TopicSection = () => {
  const { topics, isLoading, error } = useTopicData();
  const [chatbotsReady, setChatbotsReady] = useState(false);
  
  // ChatbotInitializerから関数を取得
  const { 
    openChatbot, 
    startShorikikaChat, 
    startShoukiboJizokaChat,
    isDifyLoaded,
    isShoukiboLoaded,
    isShorikikaLoaded
  } = ChatbotInitializer();

  // チャットボットの読み込み状態を監視
  useEffect(() => {
    if (isDifyLoaded || isShoukiboLoaded || isShorikikaLoaded) {
      setChatbotsReady(true);
    }
  }, [isDifyLoaded, isShoukiboLoaded, isShorikikaLoaded]);

  // トピックからチャットを開始する関数
  const handleTopicChat = (content: string) => {
    console.log(`トピックからチャットを開始: ${content}`);
    
    if (!chatbotsReady) {
      toast.error("チャットボットの準備ができていません。ページを再読み込みしてください。");
      return;
    }
    
    // 正規表現でトピックの内容を精査
    const isShorikikaRelated = /省力化|投資補助金/.test(content);
    const isShoukiboRelated = /小規模|持続化/.test(content);

    try {
      // トピックの内容に基づいて適切なチャットを開始
      if (isShorikikaRelated && isShorikikaLoaded) {
        console.log("省力化投資補助金に関連するトピックを検出しました");
        startShorikikaChat();
      } else if (isShoukiboRelated && isShoukiboLoaded) {
        console.log("小規模持続化補助金に関連するトピックを検出しました");
        startShoukiboJizokaChat();
      } else if (isDifyLoaded) {
        // 特定の補助金が特定できない場合は一般的にチャットを開く
        console.log("一般的なトピックを検出しました");
        openChatbot();
      } else {
        // すべてのチャットボットが利用できない場合
        toast.error("申し訳ありませんが、チャットボットを起動できません。ページを再読み込みしてみてください。");
      }
    } catch (error) {
      console.error("チャットボット起動中にエラーが発生しました:", error);
      toast.error("チャットボットの起動に失敗しました。ページを再読み込みしてください。");
    }
  };

  return (
    <section className="py-4 px-4 bg-gray-100 border-t border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-3 text-gray-800 text-center">トピック</h2>
        <div className="bg-white rounded-lg shadow-sm p-5 space-y-3">
          {isLoading ? (
            <div className="py-4 text-center text-gray-500">トピックを読み込み中...</div>
          ) : error ? (
            <div className="py-4 text-center text-red-500">
              <p>トピックの読み込みに失敗しました</p>
              <p className="text-sm">{error}</p>
            </div>
          ) : (
            topics.map((topic) => (
              <TopicItem 
                key={topic.id} 
                {...topic} 
                openChatbot={() => handleTopicChat(topic.content)} 
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
