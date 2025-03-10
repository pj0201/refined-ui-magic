
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
  keywords?: string[];
}

const topics: Topic[] = [
  {
    id: 1,
    isNew: true,
    content: "2025年3月より申請開始 　新たに一般形が追加され利用しやすくなった「中小企業省力化投資補助金一般形」が始まります。（詳細は本ページのチャットボットへどうぞ)",
    date: "2025/03",
    keywords: ["補助金", "融資", "中小企業", "神戸", "兵庫"]
  },
  {
    id: 2,
    isNew: true,
    content: "NEW 2025/3 小規模持続化補助金公募要領（暫定版）が公表されました。（詳細は本ページのチャットボットへどうぞ)",
    date: "2025/03",
    keywords: ["補助金", "小規模持続化補助金", "神戸", "兵庫"]
  },
  {
    id: 3,
    content: "AI用語について",
    link: "/ai-glossary",
    keywords: ["AI", "経営コンサルティング"]
  },
  {
    id: 4,
    content: "おすすめのAIツール一覧",
    link: "/ai-tools",
    keywords: ["AI", "業務効率化", "神戸", "兵庫"]
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
              {/* Hidden SEO keywords */}
              {topic.keywords && (
                <span className="sr-only">
                  {topic.keywords.join(', ')}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
