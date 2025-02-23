
import { Database, ExternalLink, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const toolCategories = [
  {
    category: "テキスト生成・対話",
    tools: [
      { name: "ChatGPT", description: "OpenAIの対話型言語モデル。様々なタスクに対応可能" },
      { name: "Claude", description: "Anthropicの高性能言語モデル。長文処理と分析が得意" },
      { name: "Bard", description: "Googleの対話型AI。検索と情報アクセスが強み" }
    ]
  },
  {
    category: "画像生成",
    tools: [
      { name: "DALL-E", description: "OpenAIのテキストから画像を生成するAI" },
      { name: "Midjourney", description: "高品質なアート作品を生成できるAIツール" },
      { name: "Stable Diffusion", description: "オープンソースの画像生成AI。カスタマイズ可能" }
    ]
  },
  {
    category: "コード開発支援",
    tools: [
      { name: "GitHub Copilot", description: "AIによるコード補完と生成支援ツール" },
      { name: "Amazon CodeWhisperer", description: "AWSのAIコーディング支援ツール" },
      { name: "Tabnine", description: "機械学習ベースのコード補完ツール" }
    ]
  },
  {
    category: "音声・音楽",
    tools: [
      { name: "Whisper", description: "OpenAIの高精度音声認識モデル" },
      { name: "Mubert", description: "AIによる音楽生成プラットフォーム" },
      { name: "Descript", description: "AI搭載の音声・動画編集ツール" }
    ]
  }
];

export default function AITools() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-sm py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">おすすめAIツール一覧</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-800">
            <Database className="h-5 w-5" />
            <span>2025年3月オープン予定</span>
          </div>
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
                      <p className="text-gray-600">{tool.description}</p>
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
