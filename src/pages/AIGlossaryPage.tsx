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
    term: "機械学習",
    category: "技術",
    definition: "コンピューターがデータから自動的にパターンを学習し、予測や判断を行う技術です。",
    businessApplication: "売上予測、顧客行動分析、不正検知、商品推薦システムなどに活用されています。"
  },
  {
    id: 2,
    term: "自然言語処理 (NLP)",
    category: "技術",
    definition: "人間が日常的に使っている言語（日本語、英語など）をコンピューターに理解・処理させる技術です。",
    businessApplication: "文書分析、感情分析、翻訳、チャットボット、音声認識などに使用されます。"
  },
  {
    id: 3,
    term: "生成AI",
    category: "技術",
    definition: "テキスト、画像、音声、動画などの新しいコンテンツを生成することができるAI技術です。",
    businessApplication: "マーケティング素材作成、商品説明文生成、プレゼン資料作成、デザイン制作などに活用できます。"
  },
  {
    id: 4,
    term: "プロンプト",
    category: "用語",
    definition: "AIに対する指示や質問のこと。効果的なプロンプトを作成することで、より良い結果を得ることができます。",
    businessApplication: "AIツールを効果的に活用するための重要なスキル。具体的で明確な指示により業務効率が向上します。"
  },
  {
    id: 5,
    term: "RPA",
    category: "技術",
    definition: "Robotic Process Automationの略。ルーチンワークを自動化するソフトウェアロボット技術です。",
    businessApplication: "データ入力、帳票処理、定型的な業務プロセスの自動化により、人的コストを削減できます。"
  },
  {
    id: 6,
    term: "ディープラーニング",
    category: "技術",
    definition: "人間の脳の神経回路を模倣したニューラルネットワークを多層化した機械学習の手法です。",
    businessApplication: "画像認識、音声認識、需要予測、異常検知など、複雑なパターン認識が必要な業務に活用されます。"
  },
  {
    id: 7,
    term: "API",
    category: "技術",
    definition: "Application Programming Interfaceの略。異なるソフトウェア同士が情報をやり取りするための仕組みです。",
    businessApplication: "既存システムにAI機能を組み込んだり、複数のツールを連携させて業務効率化を図ることができます。"
  },
  {
    id: 8,
    term: "ニューラルネットワーク",
    category: "技術",
    definition: "人間の脳の神経細胞の構造を模倣したコンピューターのアルゴリズム。情報処理と学習を行います。",
    businessApplication: "パターン認識、予測モデル、最適化問題、画像・音声処理などの複雑な問題解決に使用されます。"
  },
  {
    id: 9,
    term: "トランスフォーマー",
    category: "技術",
    definition: "注意機構（Attention）を使った深層学習モデルのアーキテクチャ。ChatGPTの基盤技術です。",
    businessApplication: "自動翻訳、文書要約、質問応答システム、コード生成など、言語理解が必要な業務に活用されます。"
  },
  {
    id: 10,
    term: "ファインチューニング",
    category: "技術",
    definition: "既存の訓練済みAIモデルを特定のタスクやドメインに合わせて追加学習させる手法です。",
    businessApplication: "業界特化型AIの開発、企業固有のデータでのAI最適化、カスタマイズされたソリューション構築に使用されます。"
  },
  {
    id: 11,
    term: "エンベディング",
    category: "技術",
    definition: "テキストや画像などのデータを数値ベクトルに変換する技術。AIがデータの意味を理解するために使用されます。",
    businessApplication: "文書検索、類似商品推薦、顧客セグメンテーション、コンテンツ分類などに活用されます。"
  },
  {
    id: 12,
    term: "RAG（検索拡張生成）",
    category: "技術",
    definition: "Retrieval-Augmented Generationの略。外部データベースから関連情報を検索してAIの回答精度を向上させる技術です。",
    businessApplication: "企業ナレッジベースの活用、顧客サポート、法務文書検索、技術文書の質問応答システムに使用されます。"
  },
  {
    id: 13,
    term: "LLM（大規模言語モデル）",
    category: "技術",
    definition: "Large Language Modelの略。膨大なテキストデータで訓練された大規模なAI言語モデルです。",
    businessApplication: "高度な文章生成、複雑な質問応答、創作活動、専門的な文書作成支援などに活用されます。"
  },
  {
    id: 14,
    term: "マルチモーダルAI",
    category: "技術",
    definition: "テキスト、画像、音声、動画など複数の形式のデータを同時に処理できるAI技術です。",
    businessApplication: "包括的なコンテンツ分析、多様なメディアを活用したマーケティング、顧客体験の向上に使用されます。"
  },
  {
    id: 15,
    term: "プロンプトエンジニアリング",
    category: "技術",
    definition: "AIから最適な回答を得るために、効果的な指示文（プロンプト）を設計・最適化する技術です。",
    businessApplication: "AI活用の効率化、一貫した品質の出力獲得、業務プロセスの標準化、AIツールの効果最大化に重要です。"
  },
  {
    id: 16,
    term: "コンテキストウィンドウ",
    category: "用語",
    definition: "AIが一度に処理できるテキストの長さの上限。モデルによって異なり、より長い文脈を理解できます。",
    businessApplication: "長文書の分析、大量データの一括処理、複雑な指示の実行、詳細な分析レポート作成に影響します。"
  },
  {
    id: 17,
    term: "ハルシネーション",
    category: "用語",
    definition: "AIが事実に基づかない情報や存在しない内容を生成してしまう現象です。",
    businessApplication: "AI出力の品質管理、事実確認プロセスの重要性、信頼性の高いAI活用のためのガイドライン策定に関連します。"
  },
  {
    id: 18,
    term: "温度パラメータ",
    category: "用語",
    definition: "AIの出力の創造性やランダム性を制御するパラメータ。低いほど一貫性が高く、高いほど創造的になります。",
    businessApplication: "用途に応じたAI出力の調整、創造的タスクと分析的タスクでの最適化、品質の安定性確保に使用されます。"
  },
  {
    id: 19,
    term: "トークン",
    category: "用語",
    definition: "AIが処理するテキストの最小単位。料金計算や処理速度に影響する重要な概念です。",
    businessApplication: "AI利用コストの計算、処理効率の最適化、バッチ処理の計画、予算管理に重要な要素です。"
  },
  {
    id: 20,
    term: "人工知能（AI）",
    category: "概念",
    definition: "人間の知的な活動を模倣するコンピューターシステムの総称です。学習、推論、問題解決などの能力を持ちます。",
    businessApplication: "自動化、意思決定支援、予測分析、顧客サービス向上など、あらゆる業務領域での活用が可能です。"
  },
  {
    id: 21,
    term: "教師あり学習",
    category: "技術",
    definition: "正解データ（ラベル）を用いてAIモデルを訓練する機械学習の手法です。",
    businessApplication: "分類問題、回帰問題、品質管理、不良品検出、需要予測などに使用されます。"
  },
  {
    id: 22,
    term: "教師なし学習",
    category: "技術",
    definition: "正解データなしでデータのパターンや構造を発見する機械学習の手法です。",
    businessApplication: "顧客セグメンテーション、異常検知、データマイニング、市場分析などに活用されます。"
  },
  {
    id: 23,
    term: "強化学習",
    category: "技術",
    definition: "試行錯誤を通じて最適な行動を学習するAI技術。報酬とペナルティによって学習します。",
    businessApplication: "ゲームAI、自動運転、ロボット制御、金融取引の最適化、リソース配分の最適化などに使用されます。"
  },
  {
    id: 24,
    term: "コンピュータビジョン",
    category: "技術",
    definition: "画像や動画を解析して情報を抽出するAI技術です。物体認識、顔認識、文字認識などが含まれます。",
    businessApplication: "品質検査、セキュリティシステム、医療画像診断、自動運転、在庫管理などに活用されます。"
  },
  {
    id: 25,
    term: "音声認識",
    category: "技術",
    definition: "人間の音声を文字データに変換するAI技術です。音声コマンドや音声入力に使用されます。",
    businessApplication: "音声アシスタント、議事録自動作成、コールセンター業務支援、アクセシビリティ向上に活用されます。"
  },
  {
    id: 26,
    term: "推論エンジン",
    category: "技術",
    definition: "与えられた情報から論理的な結論を導き出すAIシステムの構成要素です。",
    businessApplication: "診断システム、専門家システム、意思決定支援、リスク評価などに使用されます。"
  },
  {
    id: 27,
    term: "バイアス",
    category: "概念",
    definition: "AIシステムが特定の傾向や偏見を持つこと。訓練データの偏りや設計上の問題から生じます。",
    businessApplication: "公平な採用システム、金融サービス、医療診断など、倫理的なAI活用において重要な考慮事項です。"
  },
  {
    id: 28,
    term: "データマイニング",
    category: "技術",
    definition: "大量のデータから有用なパターンや知識を発見する技術です。統計学とAIを組み合わせて使用されます。",
    businessApplication: "顧客行動分析、市場トレンド予測、リスク管理、商品推薦システムなどに活用されます。"
  },
  {
    id: 29,
    term: "エキスパートシステム",
    category: "技術",
    definition: "特定分野の専門知識をコンピューターに蓄積し、専門家のような判断を行うAIシステムです。",
    businessApplication: "医療診断支援、法務相談、技術サポート、故障診断などの専門的な判断が必要な業務に使用されます。"
  },
  {
    id: 30,
    term: "アルゴリズム",
    category: "概念",
    definition: "問題を解決するための手順や計算方法。AIシステムの基盤となる論理的な処理手順です。",
    businessApplication: "業務プロセスの最適化、自動化システムの設計、データ処理の効率化などに重要な役割を果たします。"
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