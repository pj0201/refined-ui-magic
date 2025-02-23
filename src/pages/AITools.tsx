
import { Bot, Brain, Code, FileVideo, Home, Image, MessageSquare, ScrollText, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const toolCategories = [
  {
    category: "全般での活用",
    icon: <Brain className="w-6 h-6" />,
    tools: [
      { 
        name: "ChatGPT-o1",
        description: "OpenAIの基本モデル。一般的な会話や文章生成に最適。コストパフォーマンスに優れる" 
      },
      { 
        name: "ChatGPT-o1pro",
        description: "高度な分析と専門的なタスクに対応。長文処理と複雑な指示に強い上位モデル" 
      },
      { 
        name: "ChatGPT-o3mini",
        description: "軽量で高速な応答が特徴。シンプルなタスクや短い会話に最適化された省コストモデル" 
      },
      { 
        name: "GEMINI",
        description: "Googleの最新AI。マルチモーダル対応で、テキスト・画像・音声を統合的に処理" 
      },
      { 
        name: "Grok 3",
        description: "リアルタイムデータを活用した対話型AI。ユーモアのある応答が特徴" 
      },
      { 
        name: "Claude Sonnet",
        description: "Anthropicの高性能モデル。長文処理と分析が得意で、高い正確性を実現" 
      },
      { 
        name: "DeepSeek",
        description: "深い文脈理解と専門知識を備えたAI。研究開発向けの高度な機能を提供" 
      },
      { 
        name: "Hunyuan",
        description: "中国語と英語のバイリンガルAI。アジア圏のビジネス利用に最適" 
      }
    ]
  },
  {
    category: "クリエイティブ開発",
    icon: <Code className="w-6 h-6" />,
    tools: [
      { 
        name: "v0",
        description: "AIを活用したウェブアプリケーション開発プラットフォーム。直感的なインターフェース" 
      },
      { 
        name: "Cursor",
        description: "AIパワードのコードエディタ。リアルタイムのコード補完と最適化を提供" 
      },
      { 
        name: "Roocode",
        description: "効率的なコード生成と最適化を行うAIツール。開発プロセスを加速" 
      },
      { 
        name: "Windsurf",
        description: "フロントエンド開発に特化したAIツール。モダンなUIコンポーネントを自動生成" 
      }
    ]
  },
  {
    category: "業務自動化",
    icon: <Bot className="w-6 h-6" />,
    tools: [
      { 
        name: "Dify",
        description: "ビジネスプロセスの自動化を実現するRPAプラットフォーム。カスタマイズ性が高い" 
      },
      { 
        name: "GENSPARK",
        description: "AIを活用した高度な検索エンジン。業界特化型の情報収集と分析が可能" 
      },
      { 
        name: "Felo",
        description: "マルチソース検索と情報統合のAIプラットフォーム。複数のデータソースを横断的に分析" 
      }
    ]
  },
  {
    category: "議事録・文書管理",
    icon: <ScrollText className="w-6 h-6" />,
    tools: [
      { 
        name: "tl;dv",
        description: "会議の自動文字起こしと要約を行うAIツール。重要ポイントを抽出" 
      },
      { 
        name: "Notion",
        description: "AIを活用した次世代のナレッジマネジメントプラットフォーム" 
      },
      { 
        name: "NotebookLM",
        description: "AIによる文書解析と知識管理を統合したツール" 
      }
    ]
  },
  {
    category: "アプリケーション開発",
    icon: <Zap className="w-6 h-6" />,
    tools: [
      { 
        name: "Lovable",
        description: "AIを活用したWebアプリケーション開発プラットフォーム。効率的な開発を実現" 
      },
      { 
        name: "Ray2",
        description: "分散システム開発のためのAIパワードフレームワーク" 
      },
      { 
        name: "GEAR.indigo",
        description: "エンタープライズアプリケーション開発向けAIプラットフォーム" 
      }
    ]
  },
  {
    category: "動画生成",
    icon: <FileVideo className="w-6 h-6" />,
    tools: [
      { 
        name: "Kling",
        description: "AIによる高品質な動画生成ツール。編集も自動化" 
      },
      { 
        name: "Veo2",
        description: "スポーツ分析や動画編集に特化したAI動画処理ツール" 
      }
    ]
  },
  {
    category: "画像生成",
    icon: <Image className="w-6 h-6" />,
    tools: [
      { 
        name: "Flux",
        description: "高品質な画像生成AIツール。商用利用に適した権利処理付き" 
      },
      { 
        name: "Goku AI",
        description: "アニメ風イラスト生成に特化したAIツール" 
      }
    ]
  },
  {
    category: "特殊用途",
    icon: <MessageSquare className="w-6 h-6" />,
    tools: [
      { 
        name: "Kotaba",
        description: "日本語に特化した自然言語処理AI。文脈理解が優れている" 
      },
      { 
        name: "Geospy",
        description: "地理空間データ分析のためのAIツール" 
      },
      { 
        name: "Firecrawl",
        description: "Webクローリングと情報抽出に特化したAIツール" 
      }
    ]
  }
];

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

        <div className="grid gap-8">
          {toolCategories.map((category, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                {category.icon}
                <span>{category.category}</span>
              </h2>
              <div className="grid gap-4">
                {category.tools.map((tool, toolIndex) => (
                  <Card key={toolIndex} className="backdrop-blur-md bg-white/80 hover:bg-white/90 transition-colors">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span>{tool.name}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <p className="text-gray-600">{tool.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
