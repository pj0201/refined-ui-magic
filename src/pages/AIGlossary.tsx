
import { Book, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const glossaryTerms = [
  {
    term: "機械学習 (Machine Learning)",
    definition: "データから規則性やパターンを学習し、新しいデータに対して予測や判断を行うAIの中核技術"
  },
  {
    term: "ディープラーニング (Deep Learning)",
    definition: "多層のニューラルネットワークを用いた機械学習手法。画像認識や自然言語処理などで高い性能を発揮"
  },
  {
    term: "自然言語処理 (NLP)",
    definition: "人間の言語を理解・生成・翻訳するAI技術。ChatGPTなどの対話システムの基盤"
  },
  {
    term: "トランスフォーマー (Transformer)",
    definition: "自然言語処理で革新的な性能を実現した注意機構ベースのアーキテクチャ。GPTの基礎技術"
  },
  {
    term: "プロンプトエンジニアリング",
    definition: "AIモデルから望ましい出力を得るための入力（プロンプト）設計技術"
  },
  {
    term: "ファインチューニング",
    definition: "事前学習済みモデルを特定のタスクに適応させるため、追加学習を行うプロセス"
  },
  {
    term: "生成AI (Generative AI)",
    definition: "テキスト、画像、音声などの新しいコンテンツを生成するAI技術"
  },
  {
    term: "エンベッディング (Embedding)",
    definition: "テキストや画像などを数値ベクトルに変換する技術。類似性の計算や検索に利用"
  },
  {
    term: "トークン化 (Tokenization)",
    definition: "テキストを単語や部分文字列に分割する処理。言語モデルの入力の前処理として重要"
  },
  {
    term: "LLM (Large Language Model)",
    definition: "GPT-4などの大規模言語モデル。膨大なテキストデータから学習し、多様な言語タスクに対応"
  }
];

export default function AIGlossary() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI用語集</h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 rounded-full text-yellow-800">
            <Book className="h-5 w-5" />
            <span>2025年3月オープン予定</span>
          </div>
        </div>

        <div className="grid gap-6">
          {glossaryTerms.map((item, index) => (
            <Card key={index} className="backdrop-blur-md bg-white/80 hover:bg-white/90 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>{item.term}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{item.definition}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
