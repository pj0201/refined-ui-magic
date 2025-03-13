
import { TopicItem } from "./TopicItem";
import { ChatbotInitializer } from "./ChatbotInitializer";
import { useTopicData } from "@/hooks/useTopicData";

export const TopicSection = () => {
  const { openChatbot } = ChatbotInitializer();
  const { topics, isLoading, error } = useTopicData();

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
                openChatbot={openChatbot} 
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};
