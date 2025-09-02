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
    name: "Gemini",
    category: "対話型AI",
    description: "Googleが開発したマルチモーダルAI。テキスト、画像、動画を統合的に処理できます。",
    features: ["マルチモーダル処理", "画像分析", "動画理解", "リアルタイム情報"],
    pricing: "無料版あり / Advanced版 $20/月",
    url: "https://gemini.google.com",
    icon: <Star className="h-6 w-6" />,
    rating: 5,
    businessUse: "マルチメディア分析、画像解析、動画コンテンツ制作"
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
  },
  {
    id: 5,
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
    id: 6,
    name: "Midjourney",
    category: "画像生成",
    description: "Discord上で動作するAI画像生成ツール。芸術的で高品質な画像を生成します。",
    features: ["高品質画像生成", "芸術的表現", "ブランド画像作成", "コンセプトアート"],
    pricing: "$10/月〜$60/月",
    url: "https://midjourney.com",
    icon: <Zap className="h-6 w-6" />,
    rating: 5,
    businessUse: "ブランドイメージ、マーケティング素材、商品コンセプト"
  },
  {
    id: 7,
    name: "DALL-E 3",
    category: "画像生成",
    description: "OpenAIのテキストから画像生成AI。詳細な指示を正確に画像に反映できます。",
    features: ["正確な画像生成", "テキスト理解", "商用利用可", "高解像度出力"],
    pricing: "ChatGPT Plus経由 $20/月",
    url: "https://openai.com/dall-e-3",
    icon: <Brain className="h-6 w-6" />,
    rating: 5,
    businessUse: "プレゼン資料、商品画像、教育コンテンツ"
  },
  {
    id: 8,
    name: "Stable Diffusion",
    category: "画像生成",
    description: "オープンソースのAI画像生成モデル。ローカル実行やカスタマイズが可能です。",
    features: ["オープンソース", "ローカル実行", "カスタマイズ可", "商用利用無料"],
    pricing: "無料（オープンソース）",
    url: "https://stability.ai",
    icon: <Star className="h-6 w-6" />,
    rating: 4,
    businessUse: "大量画像生成、カスタムモデル、コスト削減"
  },
  {
    id: 9,
    name: "GitHub Copilot",
    category: "プログラミング",
    description: "AIプログラミングアシスタント。コードの自動補完と生成を行います。",
    features: ["コード自動補完", "関数生成", "バグ修正支援", "コメント生成"],
    pricing: "$10/月（個人）/ $19/月（ビジネス）",
    url: "https://github.com/features/copilot",
    icon: <BarChart className="h-6 w-6" />,
    rating: 5,
    businessUse: "開発効率向上、コード品質改善、新人教育"
  },
  {
    id: 10,
    name: "Cursor",
    category: "プログラミング",
    description: "AI機能を統合したコードエディター。高度なコード生成と編集が可能です。",
    features: ["AI統合エディター", "コード生成", "リファクタリング", "バグ検出"],
    pricing: "$20/月",
    url: "https://cursor.sh",
    icon: <Zap className="h-6 w-6" />,
    rating: 4,
    businessUse: "高速開発、コード品質向上、プロトタイピング"
  },
  {
    id: 11,
    name: "Perplexity AI",
    category: "検索・調査",
    description: "AI搭載の検索エンジン。リアルタイム情報を引用付きで提供します。",
    features: ["リアルタイム検索", "引用付き回答", "専門分野対応", "ファクトチェック"],
    pricing: "無料版あり / Pro版 $20/月",
    url: "https://perplexity.ai",
    icon: <Brain className="h-6 w-6" />,
    rating: 4,
    businessUse: "市場調査、競合分析、最新情報収集、リサーチ"
  },
  {
    id: 12,
    name: "Jasper AI",
    category: "マーケティング",
    description: "マーケティング特化のAIライティングツール。ブランドに合わせたコンテンツ生成が可能です。",
    features: ["マーケティング文章", "ブランド学習", "多言語対応", "SEO最適化"],
    pricing: "$49/月〜",
    url: "https://jasper.ai",
    icon: <Users className="h-6 w-6" />,
    rating: 4,
    businessUse: "コンテンツマーケティング、広告文、ブログ記事"
  },
  {
    id: 13,
    name: "Copy.ai",
    category: "マーケティング",
    description: "マーケティングコピー生成に特化したAIツール。多様なテンプレートを提供します。",
    features: ["コピーライティング", "テンプレート豊富", "A/Bテスト支援", "チーム協力"],
    pricing: "無料版あり / Pro版 $49/月",
    url: "https://copy.ai",
    icon: <Star className="h-6 w-6" />,
    rating: 4,
    businessUse: "広告コピー、メール文章、ランディングページ"
  },
  {
    id: 14,
    name: "Runway ML",
    category: "動画編集",
    description: "AI動画生成・編集プラットフォーム。テキストから動画生成や高度な編集が可能です。",
    features: ["動画生成", "画像からアニメ", "背景除去", "音声同期"],
    pricing: "$15/月〜",
    url: "https://runwayml.com",
    icon: <Zap className="h-6 w-6" />,
    rating: 4,
    businessUse: "プロモーション動画、SNSコンテンツ、教育動画"
  },
  {
    id: 15,
    name: "Eleven Labs",
    category: "音声生成",
    description: "高品質なAI音声合成・クローニングサービス。自然な音声を生成します。",
    features: ["音声合成", "音声クローン", "多言語対応", "感情表現"],
    pricing: "無料版あり / Pro版 $22/月",
    url: "https://elevenlabs.io",
    icon: <Brain className="h-6 w-6" />,
    rating: 5,
    businessUse: "ナレーション、音声ガイド、多言語対応、アクセシビリティ"
  },
  {
    id: 16,
    name: "Zapier AI",
    category: "自動化",
    description: "AIを活用した業務自動化プラットフォーム。複雑なワークフローを自動化します。",
    features: ["ワークフロー自動化", "AI判断", "アプリ連携", "データ処理"],
    pricing: "$29.99/月〜",
    url: "https://zapier.com",
    icon: <BarChart className="h-6 w-6" />,
    rating: 4,
    businessUse: "業務プロセス自動化、データ連携、タスク管理"
  },
  {
    id: 17,
    name: "Grammarly",
    category: "文書作成",
    description: "AI文章校正・改善ツール。文法、スタイル、トーンを自動的に最適化します。",
    features: ["文法校正", "スタイル改善", "トーン調整", "盗用チェック"],
    pricing: "無料版あり / Premium版 $12/月",
    url: "https://grammarly.com",
    icon: <Users className="h-6 w-6" />,
    rating: 4,
    businessUse: "ビジネス文書、メール、プレゼン資料、契約書"
  },
  {
    id: 18,
    name: "Canva AI",
    category: "デザイン",
    description: "Canvaに統合されたAI機能。デザイン生成、背景除去、画像拡張などが可能です。",
    features: ["デザイン生成", "背景除去", "画像拡張", "テンプレート提案"],
    pricing: "無料版あり / Pro版 $14.99/月",
    url: "https://canva.com",
    icon: <Star className="h-6 w-6" />,
    rating: 4,
    businessUse: "マーケティング素材、プレゼン、SNS投稿、ブランディング"
  },
  {
    id: 19,
    name: "Otter.ai",
    category: "音声認識",
    description: "AI音声認識・文字起こしサービス。会議の自動記録と要約が可能です。",
    features: ["音声認識", "自動要約", "話者識別", "リアルタイム転写"],
    pricing: "無料版あり / Pro版 $16.99/月",
    url: "https://otter.ai",
    icon: <Brain className="h-6 w-6" />,
    rating: 4,
    businessUse: "会議議事録、インタビュー記録、講演会記録"
  },
  {
    id: 20,
    name: "Loom AI",
    category: "動画編集",
    description: "画面録画ツールLoomのAI機能。動画要約、文字起こし、編集支援を提供します。",
    features: ["動画要約", "自動文字起こし", "編集支援", "ハイライト抽出"],
    pricing: "無料版あり / Business版 $12.5/月",
    url: "https://loom.com",
    icon: <Zap className="h-6 w-6" />,
    rating: 4,
    businessUse: "教育動画、製品デモ、チーム連絡、顧客サポート"
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