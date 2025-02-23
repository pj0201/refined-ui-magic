
import { Database, ExternalLink, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const toolCategories = [
  {
    category: "アイデア",
    tools: [
      { name: "Bing Chat", description: "Microsoftの対話型AI。Bingの検索機能と組み合わせて使用可能" },
      { name: "Perplexity", description: "最新情報を含めた高精度な検索と回答が可能なAI" },
      { name: "ChatGPT", description: "OpenAIの対話型言語モデル。様々なタスクに対応可能" },
      { name: "Claude", description: "Anthropicの高性能言語モデル。長文処理と分析が得意" }
    ]
  },
  {
    category: "プレゼン",
    tools: [
      { name: "Prezi", description: "ダイナミックなプレゼンテーション作成ツール" },
      { name: "Pitch", description: "AIを活用したプレゼンテーション作成支援ツール" },
      { name: "Gamma AI", description: "AIパワードのプレゼンテーション生成ツール" },
      { name: "Slides AI", description: "AIによるスライド作成の自動化ツール" },
      { name: "Slidebean", description: "プレゼンテーションのデザインと構成をAIがサポート" }
    ]
  },
  {
    category: "Webサイト",
    tools: [
      { name: "Dora", description: "AIを活用したWebサイト制作ツール" },
      { name: "10Web", description: "WordPressサイトの自動最適化とデザイン" },
      { name: "Wejic", description: "AIによるWebサイト生成プラットフォーム" },
      { name: "Framer", description: "AIを活用したWebデザインとプロトタイピング" }
    ]
  },
  {
    category: "ライティング",
    tools: [
      { name: "Rytr", description: "AIによるコンテンツ作成支援ツール" },
      { name: "Jasper", description: "マーケティングコンテンツの生成に特化したAI" },
      { name: "Copy AI", description: "広告やSNSコピーの生成に特化したAI" },
      { name: "Textbase", description: "テキスト生成と最適化のためのAIツール" },
      { name: "Writesonic", description: "ブログや記事作成を支援するAIツール" }
    ]
  },
  {
    category: "AIモデル",
    tools: [
      { name: "Rendered.ai", description: "AIモデルのトレーニングとデプロイメントプラットフォーム" },
      { name: "Gaussian", description: "3DモデルとAIの統合ツール" },
      { name: "Stable", description: "安定した画像生成AIモデル" },
      { name: "Deepnote", description: "データサイエンスとAIモデル開発環境" }
    ]
  },
  {
    category: "ミーティング",
    tools: [
      { name: "Fey", description: "AIを活用したミーティング支援ツール" },
      { name: "Krisp", description: "ノイズキャンセリングとミーティング分析AI" },
      { name: "Fireflies", description: "ミーティングの自動記録と分析ツール" },
      { name: "Aroma", description: "会議の要約と行動項目の抽出AI" }
    ]
  },
  {
    category: "デザイン",
    tools: [
      { name: "Looka", description: "ロゴデザインのAIツール" },
      { name: "Canva", description: "AIを活用したデザイン制作プラットフォーム" },
      { name: "Autodraw", description: "簡単な描画をAIが洗練されたイラストに変換" },
      { name: "Vance AI", description: "画像編集と最適化のAIツール" },
      { name: "Designs AI", description: "ブランディングデザインのAIソリューション" }
    ]
  },
  {
    category: "コーディング",
    tools: [
      { name: "Codeium", description: "AIによるコード補完と生成支援" },
      { name: "Copilot", description: "GitHubのAIコーディング支援ツール" },
      { name: "x0.dev", description: "AIパワードの開発環境" },
      { name: "Refraction", description: "コードのリファクタリングを支援するAI" }
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
        </div>

        <div className="grid gap-8">
          {toolCategories.map((category, index) => (
            <div key={index}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">{category.category}</h2>
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
