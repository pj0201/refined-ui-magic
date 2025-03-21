
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { glossaryCategories } from "@/data/glossaryData";
import { GlossaryCategorySection } from "@/components/glossary/GlossaryCategorySection";
import { CategoryNavigation } from "@/components/glossary/CategoryNavigation";

export default function AIGlossary() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="absolute left-4 top-4">
              <Home className="h-5 w-5" />
              ホームに戻る
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI用語集</h1>
        </div>

        {/* カテゴリーナビゲーション */}
        <CategoryNavigation categories={glossaryCategories} />

        {/* 各カテゴリーセクション */}
        <div className="space-y-8">
          {glossaryCategories.map((category) => (
            <GlossaryCategorySection key={category.id} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
}
