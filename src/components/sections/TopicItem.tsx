
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle } from "lucide-react";

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
  return (
    <div
      className={cn(
        "p-4 rounded-lg border",
        isNew ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
      )}
    >
      <div className="flex items-center gap-2 mb-1">
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
      <div className="flex items-center justify-between">
        <p className="text-gray-800 whitespace-pre-line">{content}</p>
        <div className="flex space-x-2">
          {link && (
            <Link to={link}>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                詳細を見る
              </Button>
            </Link>
          )}
          {id <= 2 && (
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-purple-500 hover:bg-purple-600 text-white border-purple-500" 
              onClick={openChatbot}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
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
