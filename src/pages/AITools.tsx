
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CategorySection } from "@/components/AITools/CategorySection";
import { AIAdoptionStatsCard } from "@/components/AITools/AIAdoptionStatsCard";
import { AIBusinessImpactCard } from "@/components/AITools/AIBusinessImpactCard";
import { toolCategories } from "@/data/ai-tools/toolsData";

export default function AITools() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-sm py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="absolute left-4 top-4">
              <Home className="h-5 w-5" />
              ホームに戻る
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">おすすめAIツール一覧</h1>
          <p className="text-gray-600">目的別に最適なAIツールをご紹介します</p>
        </div>

        <div className="mb-8">
          <AIAdoptionStatsCard />
          <AIBusinessImpactCard />
        </div>

        <div className="grid gap-8">
          {toolCategories.map((category, index) => (
            <CategorySection 
              key={index}
              category={category.category}
              icon={category.icon}
              tools={category.tools}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
