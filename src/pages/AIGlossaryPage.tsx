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
  }
];

const categories = ["すべて", "技術", "ツール名", "用語"];

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