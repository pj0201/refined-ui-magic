import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
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
    content: "2025年3月より申請開始\n新たに一般形が追加され利用しやすくなった「中小企業省力化投資補助金一般形」が始まります。\n（詳細は本ページのチャットボットへどうぞ)",
    date: "2025/03",
    keywords: ["補助金", "融資", "中小企業", "神戸", "兵庫"]
  },
  {
    id: 2,
    isNew: true,
    content: "NEW 2025/3 小規模持続化補助金公募要領（暫定版）が公表されました。\n（詳細は本ページのチャットボットへどうぞ)",
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
    console.log("Opening chatbot...");
    
    // DifyのチャットボットWindowを開く
    const chatWindow = document.getElementById('dify-chatbot-bubble-window');
    if (chatWindow) {
      console.log("Chat window found, displaying it");
      chatWindow.style.display = 'block';
      setIsChatbotWindowVisible(true);
    } else {
      console.log("Chat window not found, initializing chatbot");
      
      // Difyスクリプトを再ロードする
      initDifyChatbot();
      
      // チャットウィンドウが表示されるまで少し待つ
      setTimeout(() => {
        const newChatWindow = document.getElementById('dify-chatbot-bubble-window');
        if (newChatWindow) {
          console.log("New chat window found after initialization");
          newChatWindow.style.display = 'block';
        } else {
          console.log("Still no chat window after initialization");
          
          // ボタンを探してクリックする
          const chatButton = document.getElementById('dify-chatbot-bubble-button');
          if (chatButton) {
            console.log("Chat button found, clicking it");
            chatButton.click();
          }
        }
      }, 1000);
    }
  };
  
  // Difyチャットボットを初期化する
  const initDifyChatbot = () => {
    console.log("Initializing Dify chatbot...");
    
    // 既存のスクリプトを削除
    const existingScript = document.getElementById('dify-script');
    if (existingScript) {
      console.log("Removing existing script");
      existingScript.remove();
    }
    
    const existingStyle = document.getElementById('dify-style');
    if (existingStyle) {
      console.log("Removing existing style");
      existingStyle.remove();
    }
    
    // 設定スクリプトを追加
    const configScript = document.createElement('script');
    configScript.id = 'dify-config';
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
        background-color: #8B5CF6 !important; /* ��り目立つ紫色 */
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
    
    document.head.appendChild(script);
    
    console.log("Dify chatbot initialization complete");
  };

  // コンポーネントがマウントされたときにDifyスクリプトが存在しなければ初期化する
  useEffect(() => {
    const existingScript = document.getElementById('dify-script');
    if (!existingScript) {
      console.log("No Dify script found on mount, initializing");
      initDifyChatbot();
    }
  }, []);

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
                <p className="text-gray-800 whitespace-pre-line">{topic.content}</p>
                <div className="flex space-x-2">
                  {topic.link && (
                    <Link to={topic.link}>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        詳細を見る
                      </Button>
                    </Link>
                  )}
                  {/* チャットボットを開くためのボタン - 色を変更 */}
                  {topic.id <= 2 && (
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
