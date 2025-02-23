import { Book, ExternalLink, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const glossaryTerms = [
  {
    term: "機械学習 (Machine Learning)",
    definition: "データから規則性やパターンを学習し、新しいデータに対して予測や判断を行うAIの中核技術",
    links: [
      { text: "Googleの機械学習入門", url: "https://developers.google.com/machine-learning/crash-course?hl=ja" }
    ]
  },
  {
    term: "ディープラーニング (Deep Learning)",
    definition: "多層のニューラルネットワークを用いた機械学習手法。画像認識や自然言語処理などで高い性能を発揮",
    links: [
      { text: "Deep Learningの基礎", url: "https://www.tensorflow.org/tutorials/quickstart/beginner?hl=ja" }
    ]
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
  },
  {
    term: "強化学習 (Reinforcement Learning)",
    definition: "試行錯誤を通じて最適な行動を学習する手法。ゲームAIや自律型ロボットの開発に活用"
  },
  {
    term: "転移学習 (Transfer Learning)",
    definition: "ある領域で学習したモデルを別の領域に適用する技術。学習効率の向上に貢献"
  },
  {
    term: "アテンション機構 (Attention Mechanism)",
    definition: "入力データの重要な部分に注目する仕組み。言語モデルの性能向上に大きく貢献"
  },
  {
    term: "ニューラルネットワーク (Neural Network)",
    definition: "脳の神経細胞をモデルにした機械学習の基本構造。深層学習の基盤技術"
  },
  {
    term: "CNN (Convolutional Neural Network)",
    definition: "画像認識に特化したニューラルネットワーク。画像の特徴を効率的に抽出"
  },
  {
    term: "RNN (Recurrent Neural Network)",
    definition: "時系列データを処理できるニューラルネットワーク。言語処理や音声認識に利用"
  },
  {
    term: "バッチ学習 (Batch Learning)",
    definition: "データを一括で学習する手法。大規模データセットの学習に適している"
  },
  {
    term: "オンライン学習 (Online Learning)",
    definition: "データを逐次的に学習する手法。リアルタイムでの学習に適している"
  },
  {
    term: "過学習 (Overfitting)",
    definition: "訓練データに過度に適合し、汎化性能が低下する現象"
  },
  {
    term: "正則化 (Regularization)",
    definition: "過学習を防ぐためのテクニック。モデルの複雑さを制御する"
  }
];

export default function AIGlossary() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 backdrop-blur-sm py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="absolute left-4 top-4">
              <Home className="h-5 w-5" />
              ホームに戻る
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">AI用語集</h1>
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
                <div className="mb-4">
                  <p className="text-gray-600">{item.definition}</p>
                </div>
                {item.links && item.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.links.map((link, linkIndex) => (
                      <a
                        key={linkIndex}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
                      >
                        <ExternalLink className="h-4 w-4" />
                        {link.text}
                      </a>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
