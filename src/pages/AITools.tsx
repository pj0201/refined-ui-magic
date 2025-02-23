
import { Database, ExternalLink, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const toolCategories = [
  {
    category: "テキスト生成・対話",
    tools: [
      { name: "ChatGPT", description: "OpenAIの対話型言語モデル。様々なタスクに対応可能" },
      { name: "Claude", description: "Anthropicの高性能言語モデル。長文処理と分析が得意" },
      { name: "Bard", description: "Googleの対話型AI。検索と情報アクセスが強み" },
      { name: "Notion AI", description: "文書作成支援に特化したAI。アイデア出しやコンテンツ生成をサポート" },
      { name: "Jasper", description: "マーケティングコンテンツの生成に特化したAI" },
      { name: "Perplexity AI", description: "最新情報を含めた高精度な検索と回答が可能なAI" }
    ]
  },
  {
    category: "画像生成",
    tools: [
      { name: "DALL-E", description: "OpenAIのテキストから画像を生成するAI" },
      { name: "Midjourney", description: "高品質なアート作品を生成できるAIツール" },
      { name: "Stable Diffusion", description: "オープンソースの画像生成AI。カスタマイズ可能" },
      { name: "Canva AI", description: "デザイン作成に特化したAI機能を搭載" },
      { name: "Adobe Firefly", description: "Adobeが提供する創造的なAI画像生成ツール" },
      { name: "Leonardo.ai", description: "ゲームアセットやキャラクターデザインに特化したAI" }
    ]
  },
  {
    category: "コード開発支援",
    tools: [
      { name: "GitHub Copilot", description: "AIによるコード補完と生成支援ツール" },
      { name: "Amazon CodeWhisperer", description: "AWSのAIコーディング支援ツール" },
      { name: "Tabnine", description: "機械学習ベースのコード補完ツール" },
      { name: "Replit Ghost", description: "AIを活用したコード生成と問題解決支援" },
      { name: "Codeium", description: "オープンソースのAIコーディング支援ツール" },
      { name: "Cursor", description: "AIパワードのコードエディタ。開発効率を向上" }
    ]
  },
  {
    category: "音声・音楽",
    tools: [
      { name: "Whisper", description: "OpenAIの高精度音声認識モデル" },
      { name: "Mubert", description: "AIによる音楽生成プラットフォーム" },
      { name: "Descript", description: "AI搭載の音声・動画編集ツール" },
      { name: "Soundraw", description: "AIによるロイヤリティフリーの音楽生成" },
      { name: "Vocally", description: "AIを使用した声質変換・音声合成ツール" },
      { name: "Synthesia", description: "AIによる動画ナレーション生成ツール" }
    ]
  },
  {
    category: "ビジネス・生産性",
    tools: [
      { name: "Microsoft Copilot", description: "Microsoft 365アプリに統合されたAIアシスタント" },
      { name: "Duet AI", description: "Googleワークスペース向けAIツール" },
      { name: "Tome", description: "AIを活用したプレゼンテーション作成ツール" },
      { name: "Beautiful.ai", description: "AIによるスライド作成支援ツール" }
    ]
  },
  {
    category: "データ分析・可視化",
    tools: [
      { name: "Obviously AI", description: "ノーコードでAI分析が可能なプラットフォーム" },
      { name: "MindsDB", description: "データベースに直接AIを統合できるツール" },
      { name: "Tableau AI", description: "データ可視化にAIを活用するツール" },
      { name: "Power BI AI", description: "MicrosoftのBIツールに搭載されたAI機能" }
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
