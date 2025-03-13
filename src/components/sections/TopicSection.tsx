
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle } from "lucide-react";
import { useState } from "react";
import { DIFY_CONFIG } from "@/components/SubsidyChat/utils/difyConfig";

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
  const [isChatbotWindowVisible, setIsChatbotWindowVisible] = useState(false);
  
  const openChatbot = () => {
    // DifyのチャットボットWindowを開く
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      chatWindow.style.display = 'block';
      setIsChatbotWindowVisible(true);
    } else {
      // 既存のチャットボットが読み込まれていない場合は、クリックイベントをトリガー
      const chatButton = document.getElementById('dify-chatbot-bubble-button');
      if (chatButton) {
        chatButton.click();
        setIsChatbotWindowVisible(true);
      } else {
        console.log("チャットボタンが見つかりません。Difyチャットボットが正しく初期化されているか確認してください。");
        // Difyスクリプトを再ロードする
        initDifyChatbot();
      }
    }
  };
  
  // Difyチャットボットを初期化する
  const initDifyChatbot = () => {
    // 既存のスクリプトを削除
    const existingScript = document.getElementById('dify-script');
    if (existingScript) existingScript.remove();
    
    const existingStyle = document.getElementById('dify-style');
    if (existingStyle) existingStyle.remove();
    
    // 設定スクリプトを追加
    const configScript = document.createElement('script');
    configScript.textContent = `
      window.difyChatbotConfig = {
        token: "${DIFY_CONFIG.token}"
      };
    `;
    document.head.appendChild(configScript);
    
    // スタイルを追加
    const style = document.createElement('style');
    style.id = 'dify-style';
    style.textContent = `
      #dify-chatbot-bubble-button {
        background-color: #1C64F2 !important;
      }
      #dify-chatbot-bubble-window {
        width: 24rem !important;
        height: 40rem !important;
        max-height: 80vh !important;
        position: fixed !important;
        bottom: auto !important;
        top: 50px !important;
        right: 20px !important;
        z-index: 2147483647 !important;
      }
      @media (max-height: 700px) {
        #dify-chatbot-bubble-window {
          top: 20px !important;
          height: calc(100vh - 100px) !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    // Difyのスクリプトを追加
    const script = document.createElement('script');
    script.id = 'dify-script';
    script.src = 'https://udify.app/embed.min.js';
    script.defer = true;
    script.async = true;
    
    // スクリプトにIDを設定（トークンと同じ値）
    script.id = DIFY_CONFIG.token;
    
    document.head.appendChild(script);
  };

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
                <div className="flex space-x-2">
                  {topic.link && (
                    <Link to={topic.link}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        詳細を見る
                      </Button>
                    </Link>
                  )}
                  {/* チャットボットを開くためのボタン */}
                  {topic.id <= 2 && ( // 補助金関連のトピックにのみチャットボタンを表示
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-blue-100 hover:bg-blue-200" 
                      onClick={openChatbot}
                    >
                      <MessageCircle className="h-4 w-4 mr-2" />
                      相談する
                    </Button>
                  )}
                </div>
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
