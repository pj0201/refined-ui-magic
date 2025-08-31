import { ArrowLeft, ExternalLink, Star, Zap, Brain, Users, BarChart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const aiTools = [
  {
    id: 1,
    name: "ChatGPT",
    category: "対話型AI",
    description: "OpenAIが開発した対話型AI。文章作成、翻訳、コーディング、アイデア出しなど幅広い業務に活用できます。",
    features: ["文章作成", "翻訳", "コーディング支援", "データ分析"],
    pricing: "無料版あり / Pro版 $20/月",
    url: "https://chat.openai.com",
    icon: <Brain className="h-6 w-6" />,
    rating: 5,
    businessUse: "資料作成、メール対応、企画書作成、マーケティング文章"
  },
  {
    id: 2,
    name: "Claude",
    category: "対話型AI",
    description: "Anthropicが開発したAIアシスタント。長い文章の処理と論理的な思考が得意です。",
    features: ["長文処理", "論理的分析", "コード生成", "文書要約"],
    pricing: "無料版あり / Pro版 $20/月",
    url: "https://claude.ai",
    icon: <Zap className="h-6 w-6" />,
    rating: 5,
    businessUse: "契約書レビュー、市場分析、戦略立案、技術文書作成"
  },
  {
    id: 3,
    name: "Notion AI",
    category: "文書作成",
    description: "Notionに統合されたAI機能。ワークスペース内で直接文章作成や要約が可能です。",
    features: ["文章生成", "要約", "翻訳", "アイデア整理"],
    pricing: "$10/月（Notionプランに追加）",
    url: "https://notion.so",
    icon: <Users className="h-6 w-6" />,
    rating: 4,
    businessUse: "議事録作成、プロジェクト管理、ナレッジベース構築"
  },
  {
    id: 4,
    name: "Microsoft Copilot",
    category: "生産性向上",
    description: "Microsoft 365に統合されたAI。Excel、Word、PowerPointで業務を効率化します。",
    features: ["Excel分析", "プレゼン作成", "メール下書き", "データ可視化"],
    pricing: "$30/月（Microsoft 365 Business Premium）",
    url: "https://copilot.microsoft.com",
    icon: <BarChart className="h-6 w-6" />,
    rating: 4,
    businessUse: "データ分析、プレゼン資料作成、業務効率化"
  }
];

export default function AIToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ホームに戻る
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">おすすめAIツール一覧</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ビジネスの効率化と成長を支援する厳選されたAIツールをご紹介します。
            各ツールの特徴と活用方法を参考に、あなたのビジネスに最適なAIを見つけてください。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {aiTools.map((tool) => (
            <Card key={tool.id} className="hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {tool.icon}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{tool.name}</CardTitle>
                      <Badge variant="secondary">{tool.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(tool.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600">
                  {tool.description}
                </CardDescription>
                
                <div>
                  <h4 className="font-semibold mb-2">主な機能</h4>
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, index) => (
                      <Badge key={index} variant="outline">{feature}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">ビジネス活用例</h4>
                  <p className="text-sm text-gray-600">{tool.businessUse}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm font-medium">料金</p>
                    <p className="text-sm text-gray-600">{tool.pricing}</p>
                  </div>
                  <Button asChild>
                    <a href={tool.url} target="_blank" rel="noopener noreferrer">
                      詳細を見る
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">AI導入をお考えですか？</h2>
          <p className="text-gray-600 mb-6">
            当社では、あなたのビジネスに最適なAIツールの選定から導入、活用方法の研修まで、
            トータルでサポートいたします。
          </p>
          <Button size="lg" asChild>
            <Link to="/#contact">
              無料相談を申し込む
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}