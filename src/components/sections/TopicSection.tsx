
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Topic {
  id: number;
  isNew?: boolean;
  content: string;
  date?: string;
  link?: string;
}

const topics: Topic[] = [
  {
    id: 1,
    isNew: true,
    content: "2025年3月より申請開始 　新たに一般形が追加され利用しやすくなった「中小企業省力化投資補助金一般形」が始まります。（詳細は本ページのチャットボットへどうぞ)",
    date: "2025/03"
  },
  {
    id: 2,
    content: "AI用語についてのまとめ（準備中）",
    link: "/ai-glossary"
  },
  {
    id: 3,
    content: "おすすめのAIツール一覧（準備中）",
    link: "/ai-tools"
  }
];

export const TopicSection = () => {
  return (
    <section className="py-8 px-4 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">トピック</h2>
        <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={cn(
                "p-4 rounded-lg border",
                topic.isNew ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
              )}
            >
              <div className="flex items-center gap-2 mb-1">
                {topic.isNew && (
                  <span className="text-red-600 text-sm font-semibold">
                    NEW
                  </span>
                )}
                {topic.date && (
                  <span className="text-gray-500 text-sm">
                    {topic.date}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-800">{topic.content}</p>
                {topic.link && (
                  <Link to={topic.link}>
                    <Button variant="outline" size="sm" className="ml-4">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      詳細を見る
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
