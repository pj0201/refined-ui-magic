
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  MessageCircle, 
  Brain, 
  Sparkles, 
  Bot, 
  Lightbulb,
  Wrench
} from "lucide-react";

interface TopicItemProps {
  id: number;
  isNew?: boolean;
  content: string;
  date?: string;
  link?: string;
  keywords?: string[];
  openChatbot: () => void;
}

export const TopicItem = ({ 
  id, 
  isNew, 
  content, 
  date, 
  link, 
  keywords, 
  openChatbot 
}: TopicItemProps) => {
  // AIアイコンの選択 - ID基づいて異なるアイコンを表示
  const getAiIcon = () => {
    switch (id) {
      case 1: // AI導入支援サポート
        return <Sparkles className="h-5 w-5 text-purple-600" />;
      case 3: // 経営者保証なしの融資
        return <Brain className="h-5 w-5 text-blue-600" />;
      case 4: // AI用語について
        return <Brain className="h-5 w-5 text-purple-600" />;
      case 5: // おすすめのAIツール一覧
        return <Wrench className="h-5 w-5 text-blue-500" />;
      case 6: // 省力化投資補助金
        return <Sparkles className="h-5 w-5 text-yellow-500" />;
      default:
        return isNew ? <Sparkles className="h-5 w-5 text-yellow-500" /> : <Bot className="h-5 w-5 text-gray-500" />;
    }
  };

  // AI関連アイテムかどうかを判定
  const isAiRelated = id === 1 || id === 4 || id === 5;

  // 補助金関連項目かどうかを判定
  const isSubsidyRelated = id === 2 || id === 6;
  
  // 経営者保証のトピックかどうかを判定（ID=3）
  const isCompactLayout = id === 3;

  return (
    <div
      className={cn(
        "p-4 rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md",
        isNew 
          ? "bg-blue-50 border-blue-200" 
          : isAiRelated 
            ? "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200" 
            : "bg-white border-gray-200"
      )}
    >
      <div className="flex items-center gap-2 mb-1">
        {/* アイコン表示 */}
        <span className="flex items-center justify-center">
          {getAiIcon()}
        </span>
        
        {isNew && (
          <span className="text-red-600 text-sm font-semibold">
            NEW
          </span>
        )}
        {date && (
          <span className="text-gray-500 text-sm">
            {date}
          </span>
        )}
      </div>
      <div className={cn(
        "flex items-center",
        isCompactLayout ? "justify-between" : "justify-between flex-wrap"
      )}>
        <p className={cn(
          "text-gray-800 whitespace-pre-line",
          isCompactLayout && "text-sm max-w-[70%]", // コンパクトレイアウトの場合、テキストを小さく
          isSubsidyRelated && "font-bold", // 補助金関連項目のテキストを太字に
          isAiRelated && "font-medium"
        )}>{content}</p>
        <div className="flex space-x-2">
          {link && (
            <Link to={link}>
              <Button 
                variant="outline" 
                size={isCompactLayout ? "xs" : "sm"}
                className={cn(
                  isAiRelated && "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white border-0",
                  isCompactLayout && "p-1.5 h-auto min-h-0 text-xs"
                )}
              >
                {isAiRelated ? <Lightbulb className="h-4 w-4 mr-2" /> : <ExternalLink className={cn("mr-2", isCompactLayout ? "h-3 w-3" : "h-4 w-4")} />}
                詳細を見る
              </Button>
            </Link>
          )}
          {isSubsidyRelated && (
            <Button 
              variant="outline" 
              size={isCompactLayout ? "xs" : "sm"}
              className={cn(
                "bg-purple-500 hover:bg-purple-600 text-white border-purple-500",
                isCompactLayout && "p-1.5 h-auto min-h-0 text-xs"
              )}
              onClick={openChatbot}
            >
              <MessageCircle className={cn("mr-2", isCompactLayout ? "h-3 w-3" : "h-4 w-4")} />
              相談する
            </Button>
          )}
        </div>
      </div>
      {/* Hidden SEO keywords */}
      {keywords && (
        <span className="sr-only">
          {keywords.join(', ')}
        </span>
      )}
    </div>
  );
};
