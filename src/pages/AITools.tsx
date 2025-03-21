
import { Brain, Code, FileVideo, Home, Image, MessageSquare, ScrollText, Zap, Search, Database, Shield, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CategorySection } from "@/components/AITools/CategorySection";
import { BusinessAutomationSection } from "@/components/AITools/BusinessAutomationSection";

const toolCategories = [
  {
    category: "全般での活用",
    icon: Brain,
    tools: [
      { 
        name: "Claude 3.5 Sonnet",
        description: "Anthropicの最新モデル。長文処理と複雑なタスクに特化した高度な理解力と文脈把握能力を持つAI" 
      },
      { 
        name: "GPT-4o",
        description: "OpenAIの最新モデル。テキスト・画像・音声のマルチモーダル処理が可能で、高度な推論能力を持つ" 
      },
      { 
        name: "Gemini 1.5 Pro",
        description: "GoogleのAIモデル。長文脈理解と多言語対応に優れ、様々な形式のデータを統合的に処理可能" 
      },
      { 
        name: "Llama 3.1",
        description: "Metaのオープンソースモデル。高精度な推論と多様なタスク処理能力を持ち、カスタマイズが容易" 
      },
      { 
        name: "Grok 2",
        description: "xAIの対話型モデル。リアルタイムデータアクセスと風刺的ユーモアが特徴の革新的AI" 
      },
      { 
        name: "Mistral Large",
        description: "Mistral AIの高性能モデル。効率的なアーキテクチャで高速処理と低リソースでの動作を実現" 
      },
      { 
        name: "Perplexity AI",
        description: "リアルタイム検索機能を統合した対話型AI。最新情報に基づく回答と情報源の透明性を提供" 
      },
      { 
        name: "DeepSeek Coder",
        description: "コーディング特化型AI。複雑なプログラミング課題解決と技術文書理解に優れた性能を発揮" 
      }
    ]
  },
  {
    category: "クリエイティブ開発",
    icon: Code,
    tools: [
      { 
        name: "v0.dev",
        description: "Vercelのコンポーネント生成AI。UIデザインからコードを自動生成し、React開発を大幅に効率化" 
      },
      { 
        name: "Cursor",
        description: "AIパワードのコードエディタ。GPT-4と連携したリアルタイムのコード補完と最適化を提供" 
      },
      { 
        name: "GitHub Copilot",
        description: "GitHubとOpenAIの共同開発コーディングアシスタント。コンテキストを理解したコード提案が可能" 
      },
      { 
        name: "Replit Ghostwriter",
        description: "コード生成と問題解決を支援するAIツール。学習とリアルタイムフィードバックでスキル向上をサポート" 
      }
    ]
  },
  {
    category: "アプリケーション開発",
    icon: Zap,
    tools: [
      { 
        name: "Lovable",
        description: "AIを活用したWebアプリケーション開発プラットフォーム。直感的な対話でコードを生成し効率的な開発を実現" 
      },
      { 
        name: "Vercel AI SDK",
        description: "AI機能を簡単に統合できるReactフレームワーク。ストリーミングUIと最適化されたAI応答を実装可能" 
      },
      { 
        name: "Plasmic",
        description: "ノーコードでAIパワードのWebサイト・アプリ開発が可能なプラットフォーム。デザインから実装まで効率化" 
      }
    ]
  },
  {
    category: "サーチツール",
    icon: Search,
    tools: [
      { 
        name: "Kagi Search",
        description: "AIを活用したプライバシー重視の検索エンジン。カスタマイズ性が高く高品質な検索結果を提供" 
      },
      { 
        name: "Perplexity",
        description: "AIによる情報検索と要約を行うプラットフォーム。複数のソースから信頼性の高い回答を生成" 
      },
      { 
        name: "You.com",
        description: "AIを統合した次世代検索エンジン。検索結果の要約と視覚的な情報整理機能を提供" 
      }
    ]
  },
  {
    category: "動画生成",
    icon: FileVideo,
    tools: [
      { 
        name: "Runway Gen-3",
        description: "テキストから高品質な映像コンテンツを生成するAIツール。創造的な映像制作をシンプル化" 
      },
      { 
        name: "Sora",
        description: "OpenAIの動画生成AI。簡単な指示から複雑なシーンや動きを含む高品質な動画を作成可能" 
      },
      { 
        name: "Pika Labs",
        description: "テキストプロンプトから短時間で魅力的な動画コンテンツを作成できるAIプラットフォーム" 
      }
    ]
  },
  {
    category: "画像生成",
    icon: Image,
    tools: [
      { 
        name: "DALL-E 3",
        description: "OpenAIの高精度画像生成モデル。詳細な指示から精巧なイメージを作成可能" 
      },
      { 
        name: "Midjourney V6",
        description: "芸術的表現に優れた画像生成AI。リアルからファンタジーまで様々なスタイルに対応" 
      },
      { 
        name: "Stable Diffusion 3",
        description: "オープンソースの画像生成モデル。高度なカスタマイズとローカル実行が可能" 
      }
    ]
  },
  {
    category: "データ分析",
    icon: Database,
    tools: [
      { 
        name: "Akkio",
        description: "ノーコードのAI予測分析プラットフォーム。ビジネスデータから素早く洞察を引き出す" 
      },
      { 
        name: "MindsDB",
        description: "AIを既存データベースに統合するオープンソースツール。予測機能をSQLで簡単に実装可能" 
      },
      { 
        name: "Obviously AI",
        description: "コード不要で予測モデルを構築・展開できるAIプラットフォーム。データサイエンスを民主化" 
      }
    ]
  },
  {
    category: "セキュリティ",
    icon: Shield,
    tools: [
      { 
        name: "Darktrace",
        description: "AIを活用したサイバーセキュリティプラットフォーム。異常検知と自動対応で企業を保護" 
      },
      { 
        name: "Crowdstrike Falcon",
        description: "AIパワードのエンドポイント保護プラットフォーム。高度な脅威をリアルタイムで検知・対応" 
      }
    ]
  },
  {
    category: "ビジネスインテリジェンス",
    icon: LineChart,
    tools: [
      { 
        name: "ThoughtSpot",
        description: "自然言語検索でデータ分析が可能なAIプラットフォーム。複雑なクエリを簡単に実行" 
      },
      { 
        name: "Tableau with Einstein",
        description: "AIを統合した可視化プラットフォーム。データから自動的に洞察を発見し表示" 
      }
    ]
  },
  {
    category: "特殊用途",
    icon: MessageSquare,
    tools: [
      { 
        name: "Kotaba",
        description: "日本語に特化した自然言語処理AI。文脈理解と日本語特有の表現に対応" 
      },
      { 
        name: "Geospy",
        description: "地理空間データ分析のためのAIツール。位置情報の高度な解析と予測を実現" 
      },
      { 
        name: "Firecrawl",
        description: "Webクローリングと情報抽出に特化したAIツール。膨大なウェブデータから価値ある情報を収集" 
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
            <CategorySection 
              key={index}
              category={category.category}
              icon={category.icon}
              tools={category.tools}
            />
          ))}
          <BusinessAutomationSection />
        </div>
      </div>
    </div>
  );
}
