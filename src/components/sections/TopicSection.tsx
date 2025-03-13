
import { TopicItem } from "./TopicItem";
import { ChatbotInitializer } from "./ChatbotInitializer";
import { topics } from "@/data/topicsData";

export const TopicSection = () => {
  const { openChatbot } = ChatbotInitializer();

  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">トピック</h2>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          {topics.map((topic) => (
            <TopicItem 
              key={topic.id} 
              {...topic} 
              openChatbot={openChatbot} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
