import { ArrowLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";

const aiTerms = [
  {
    id: 1,
    term: "ChatGPT",
    category: "ツール名",
    definition: "OpenAIが開発した対話型AI（チャットボット）。自然言語で質問や指示を入力すると、人間のような文章で回答してくれます。",
    businessApplication: "資料作成、メール対応、アイデア出し、翻訳、コーディング支援など幅広い業務に活用できます。"
  },
  {
    id: 2,
    term: "機械学習",
    category: "技術",
    definition: "コンピューターがデータから自動的にパターンを学習し、予測や判断を行う技術です。",
    businessApplication: "売上予測、顧客行動分析、不正検知、商品推薦システムなどに活用されています。"
  },
  {
    id: 3,
    term: "自然言語処理 (NLP)",
    category: "技術",
    definition: "人間が日常的に使っている言語（日本語、英語など）をコンピューターに理解・処理させる技術です。",
    businessApplication: "文書分析、感情分析、翻訳、チャットボット、音声認識などに使用されます。"
  },
  {
    id: 4,
    term: "生成AI",
    category: "技術",
    definition: "テキスト、画像、音声、動画などの新しいコンテンツを生成することができるAI技術です。",
    businessApplication: "マーケティング素材作成、商品説明文生成、プレゼン資料作成、デザイン制作などに活用できます。"
  },
  {
    id: 5,
    term: "プロンプト",
    category: "用語",
    definition: "AIに対する指示や質問のこと。効果的なプロンプトを作成することで、より良い結果を得ることができます。",
    businessApplication: "AIツールを効果的に活用するための重要なスキル。具体的で明確な指示により業務効率が向上します。"
  },
  {
    id: 6,
    term: "Claude",
    category: "ツール名",
    definition: "Anthropicが開発したAIアシスタント。長い文章の処理と論理的な思考が得意で、安全性を重視して設計されています。",
    businessApplication: "長文の要約、契約書の分析、戦略立案、技術文書の作成などに特に適しています。"
  },
  {
    id: 7,
    term: "RPA",
    category: "技術",
    definition: "Robotic Process Automationの略。ルーチンワークを自動化するソフトウェアロボット技術です。",
    businessApplication: "データ入力、帳票処理、定型的な業務プロセスの自動化により、人的コストを削減できます。"
  },
  {
    id: 8,
    term: "ディープラーニング",
    category: "技術",
    definition: "人間の脳の神経回路を模倣したニューラルネットワークを多層化した機械学習の手法です。",
    businessApplication: "画像認識、音声認識、需要予測、異常検知など、複雑なパターン認識が必要な業務に活用されます。"
  },
  {
    id: 9,
    term: "API",
    category: "技術",
    definition: "Application Programming Interfaceの略。異なるソフトウェア同士が情報をやり取りするための仕組みです。",
    businessApplication: "既存システムにAI機能を組み込んだり、複数のツールを連携させて業務効率化を図ることができます。"
  },
  {
    id: 10,
    term: "Microsoft Copilot",
    category: "ツール名",
    definition: "Microsoft 365に統合されたAI機能。Word、Excel、PowerPoint、Outlook等で業務をサポートします。",
    businessApplication: "文書作成、データ分析、プレゼン資料作成、メール対応など、日常的なオフィス業務の効率化に役立ちます。"
  },
  {
    id: 11,
    term: "Gemini",
    category: "ツール名",
    definition: "Googleが開発したマルチモーダルAI。テキスト、画像、動画、音声を統合的に処理することができます。",
    businessApplication: "多様なメディアを含む資料作成、画像分析、動画コンテンツ制作、プレゼンテーション作成に活用できます。"
  },
  {
    id: 12,
    term: "AutoGPT",
    category: "ツール名",
    definition: "自律的にタスクを実行するAIエージェント。目標を設定すると、自動的にタスクを分解して実行します。",
    businessApplication: "複雑なプロジェクト管理、市場調査の自動化、競合分析、定期レポート作成などに使用できます。"
  },
  {
    id: 13,
    term: "Stable Diffusion",
    category: "ツール名",
    definition: "テキストから高品質な画像を生成するオープンソースのAI画像生成モデルです。",
    businessApplication: "マーケティング素材、商品画像、ソーシャルメディア投稿用画像、プレゼン資料の視覚化に活用できます。"
  },
  {
    id: 14,
    term: "ニューラルネットワーク",
    category: "技術",
    definition: "人間の脳の神経細胞の構造を模倣したコンピューターのアルゴリズム。情報処理と学習を行います。",
    businessApplication: "パターン認識、予測モデル、最適化問題、画像・音声処理などの複雑な問題解決に使用されます。"
  },
  {
    id: 15,
    term: "トランスフォーマー",
    category: "技術",
    definition: "注意機構（Attention）を使った深層学習モデルのアーキテクチャ。ChatGPTの基盤技術です。",
    businessApplication: "自動翻訳、文書要約、質問応答システム、コード生成など、言語理解が必要な業務に活用されます。"
  },
  {
    id: 16,
    term: "ファインチューニング",
    category: "技術",
    definition: "既存の訓練済みAIモデルを特定のタスクやドメインに合わせて追加学習させる手法です。",
    businessApplication: "業界特化型AIの開発、企業固有のデータでのAI最適化、カスタマイズされたソリューション構築に使用されます。"
  },
  {
    id: 17,
    term: "エンベディング",
    category: "技術",
    definition: "テキストや画像などのデータを数値ベクトルに変換する技術。AIがデータの意味を理解するために使用されます。",
    businessApplication: "文書検索、類似商品推薦、顧客セグメンテーション、コンテンツ分類などに活用されます。"
  },
  {
    id: 18,
    term: "RAG（検索拡張生成）",
    category: "技術",
    definition: "Retrieval-Augmented Generationの略。外部データベースから関連情報を検索してAIの回答精度を向上させる技術です。",
    businessApplication: "企業ナレッジベースの活用、顧客サポート、法務文書検索、技術文書の質問応答システムに使用されます。"
  },
  {
    id: 19,
    term: "LLM（大規模言語モデル）",
    category: "技術",
    definition: "Large Language Modelの略。膨大なテキストデータで訓練された大規模なAI言語モデルです。",
    businessApplication: "高度な文章生成、複雑な質問応答、創作活動、専門的な文書作成支援などに活用されます。"
  },
  {
    id: 20,
    term: "マルチモーダルAI",
    category: "技術",
    definition: "テキスト、画像、音声、動画など複数の形式のデータを同時に処理できるAI技術です。",
    businessApplication: "包括的なコンテンツ分析、多様なメディアを活用したマーケティング、顧客体験の向上に使用されます。"
  },
  {
    id: 21,
    term: "プロンプトエンジニアリング",
    category: "技術",
    definition: "AIから最適な回答を得るために、効果的な指示文（プロンプト）を設計・最適化する技術です。",
    businessApplication: "AI活用の効率化、一貫した品質の出力獲得、業務プロセスの標準化、AIツールの効果最大化に重要です。"
  },
  {
    id: 22,
    term: "コンテキストウィンドウ",
    category: "用語",
    definition: "AIが一度に処理できるテキストの長さの上限。モデルによって異なり、より長い文脈を理解できます。",
    businessApplication: "長文書の分析、大量データの一括処理、複雑な指示の実行、詳細な分析レポート作成に影響します。"
  },
  {
    id: 23,
    term: "ハルシネーション",
    category: "用語",
    definition: "AIが事実に基づかない情報や存在しない内容を生成してしまう現象です。",
    businessApplication: "AI出力の品質管理、事実確認プロセスの重要性、信頼性の高いAI活用のためのガイドライン策定に関連します。"
  },
  {
    id: 24,
    term: "温度パラメータ",
    category: "用語",
    definition: "AIの出力の創造性やランダム性を制御するパラメータ。低いほど一貫性が高く、高いほど創造的になります。",
    businessApplication: "用途に応じたAI出力の調整、創造的タスクと分析的タスクでの最適化、品質の安定性確保に使用されます。"
  },
  {
    id: 25,
    term: "トークン",
    category: "用語",
    definition: "AIが処理するテキストの最小単位。料金計算や処理速度に影響する重要な概念です。",
    businessApplication: "AI利用コストの計算、処理効率の最適化、バッチ処理の計画、予算管理に重要な要素です。"
  },
  {
    id: 26,
    term: "OpenAI GPT-4",
    category: "ツール名",
    definition: "OpenAIの最新大規模言語モデル。高度な推論能力と幅広いタスク対応能力を持ちます。",
    businessApplication: "複雑な問題解決、戦略立案、高度な文書作成、コーディング支援、創造的なコンテンツ制作に活用できます。"
  },
  {
    id: 27,
    term: "Anthropic Claude 3",
    category: "ツール名",
    definition: "Anthropicの最新AIアシスタント。安全性と有用性を重視し、長い文脈の処理が得意です。",
    businessApplication: "長文の契約書分析、複雑なビジネス文書の要約、リスク分析、コンプライアンス確認などに適しています。"
  },
  {
    id: 28,
    term: "Midjourney",
    category: "ツール名",
    definition: "Discord上で動作するAI画像生成ツール。芸術的で高品質な画像を生成することで知られています。",
    businessApplication: "ブランドイメージ作成、マーケティング素材、商品コンセプト可視化、クリエイティブキャンペーンに活用できます。"
  },
  {
    id: 29,
    term: "DALL-E 3",
    category: "ツール名",
    definition: "OpenAIが開発したテキストから画像を生成するAI。詳細な指示を正確に画像に反映できます。",
    businessApplication: "プレゼン資料の図解作成、商品イメージ作成、教育コンテンツの視覚化、ソーシャルメディア投稿画像に使用できます。"
  },
  {
    id: 30,
    term: "GitHub Copilot",
    category: "ツール名",
    definition: "GitHubとOpenAIが開発したAIプログラミングアシスタント。コードの自動補完と生成を行います。",
    businessApplication: "開発効率の向上、コード品質の改善、新人プログラマーの教育、プロトタイプの迅速な作成に活用できます。"
  }
];

const categories = ["すべて", "技術", "ツール名", "用語", "概念"];

export default function AIGlossaryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const filteredTerms = useMemo(() => {
    return aiTerms.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "すべて" || term.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-16">
      <div className="max-w-6xl mx-auto px-4">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            ホームに戻る
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">AI用語集</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ビジネスでAIを活用する際に知っておきたい重要な用語を分かりやすく解説します。
            各用語のビジネス活用例も併せてご紹介しています。
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="用語を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTerms.map((termData) => (
            <Card key={termData.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{termData.term}</CardTitle>
                  <Badge variant="secondary">{termData.category}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-gray-700">定義</h4>
                  <CardDescription className="text-sm">
                    {termData.definition}
                  </CardDescription>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2 text-blue-700">ビジネス活用例</h4>
                  <p className="text-sm text-gray-600">
                    {termData.businessApplication}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">該当する用語が見つかりませんでした。</p>
            <p className="text-gray-500 text-sm mt-2">検索条件を変更してお試しください。</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">AI活用についてもっと詳しく知りたい方へ</h2>
          <p className="text-gray-600 mb-6">
            当社では、AI導入コンサルティングやAI活用セミナーを提供しています。
            お気軽にご相談ください。
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