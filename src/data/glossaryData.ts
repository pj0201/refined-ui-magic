
export interface GlossaryTerm {
  term: string;
  definition: string;
  links?: {
    text: string;
    url: string;
  }[];
}

export interface GlossaryCategory {
  id: string;
  title: string;
  terms: GlossaryTerm[];
}

// 基本概念カテゴリー
const basicConcepts: GlossaryTerm[] = [
  {
    term: "AGI (Artificial General Intelligence)",
    definition: "人間のような汎用的な知能を持つAI。様々なタスクに対して人間レベルの理解と実行が可能"
  },
  {
    term: "ASI (Artificial Super Intelligence)",
    definition: "人間の知能を超えた知能を持つAI。AGIの発展形として想定される概念"
  },
  {
    term: "MCP (Machine Consciousness Problem)",
    definition: "AIが本当の意識や自己認識を持つことができるかという哲学的・技術的問題"
  },
  {
    term: "エージェント (Agent)",
    definition: "特定の目的を達成するために自律的に行動するAIシステム。環境を認識し、判断して行動を実行"
  },
  {
    term: "AI倫理 (AI Ethics)",
    definition: "AIの設計、開発、利用において、公平性、透明性、説明責任、プライバシー保護などの倫理原則を遵守すること。信頼性の高いAIシステム構築の基盤となる"
  }
];

// 機械学習の基礎カテゴリー
const machineLearningBasics: GlossaryTerm[] = [
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
    term: "ニューラルネットワーク (Neural Network)",
    definition: "脳の神経細胞をモデルにした機械学習の基本構造。深層学習の基盤技術"
  }
];

// 言語モデル関連カテゴリー
const languageModels: GlossaryTerm[] = [
  {
    term: "LLM (Large Language Model)",
    definition: "GPT-4などの大規模言語モデル。膨大なテキストデータから学習し、多様な言語タスクに対応"
  },
  {
    term: "トランスフォーマー (Transformer)",
    definition: "自然言語処理で革新的な性能を実現した注意機構ベースのアーキテクチャ。GPTの基礎技術"
  },
  {
    term: "自然言語処理 (NLP)",
    definition: "人間の言語を理解・生成・翻訳するAI技術。ChatGPTなどの対話システムの基盤"
  },
  {
    term: "LoRA (Low-Rank Adaptation)",
    definition: "大規模言語モデルを効率的に微調整するための手法。少ないパラメータで特定タスクに適応可能"
  },
  {
    term: "蒸留モデル (Distilled Model)",
    definition: "大規模なモデルの知識を小規模なモデルに転移させる技術。モデルの軽量化と高速化を実現"
  },
  {
    term: "RAG (Retrieval-Augmented Generation)",
    definition: "外部知識をリアルタイムで検索・参照しながら応答を生成する手法。最新情報や正確性の向上に貢献"
  },
  {
    term: "生成AI (Generative AI)",
    definition: "テキスト、画像、音声など、これまでにない新しいコンテンツを創造するAI技術。ビジネスにおけるコンテンツ制作、デザイン、顧客対応などで革新的な活用が期待される"
  },
  {
    term: "マルチモーダルAI (Multimodal AI)",
    definition: "複数の異なる種類のデータ（テキスト、画像、音声など）を同時に処理し、統合的に理解・生成するAI。人間のような多様な情報処理を可能にする"
  },
  {
    term: "小さな言語モデル (Small Language Model / SLM)",
    definition: "LLMよりも小規模な言語モデル。特定のタスクに特化することで、高速化やコスト削減、エッジデバイスでの実行を可能にする"
  }
];

// 技術実装関連カテゴリー
const technicalImplementation: GlossaryTerm[] = [
  {
    term: "API (Application Programming Interface)",
    definition: "AIシステムと外部アプリケーションを連携させるためのインターフェース。機能やサービスを提供"
  },
  {
    term: "APIキー (API Key)",
    definition: "AIサービスやAPIにアクセスするための認証キー。セキュリティと利用制限の管理に使用される"
  },
  {
    term: "ブラウザユース (Browser Use)",
    definition: "Webブラウザ上で直接AIモデルを実行する技術。サーバーレスでローカルでの処理が可能"
  },
  {
    term: "ローカル実行 (Local Execution)",
    definition: "AIモデルをユーザーの端末上で直接実行する方式。プライバシー保護やオフライン利用が可能"
  },
  {
    term: "ローカル環境 (Local Environment)",
    definition: "開発者が自分のコンピュータ上でAIモデルを動かすための設定環境。データプライバシーとカスタマイズの自由度が高い"
  },
  {
    term: "GitHub",
    definition: "AIプロジェクトやコードの共有・管理プラットフォーム。多くのオープンソースAIモデルやツールが公開されている"
  },
  {
    term: "Git",
    definition: "コードのバージョン管理システム。AIモデルやアプリケーションの開発履歴を追跡し、複数の開発者が協働できる"
  },
  {
    term: "リポジトリ (Repository)",
    definition: "AIプロジェクトのソースコードや関連ファイルを格納・管理する場所。バージョン管理が可能で共同開発の基盤となる"
  },
  {
    term: "YAML",
    definition: "人間が読みやすい形式のデータシリアライゼーション言語。AIモデルの設定ファイルやワークフロー定義に広く使用される"
  },
  {
    term: "SQL (Structured Query Language)",
    definition: "AIシステムでデータを操作・分析するための標準的なデータベース言語"
  },
  {
    term: "Docker",
    definition: "アプリケーションをコンテナ化する技術。AIモデルの依存関係を含む環境を一貫して再現可能にする"
  },
  {
    term: "サンドボックス (Sandbox)",
    definition: "安全に隔離された環境でAIモデルをテストできる仕組み。セキュリティリスクを軽減しながら実験が可能"
  },
  {
    term: "TypeScript",
    definition: "JavaScriptを拡張した静的型付け言語。AIフロントエンドの開発において型安全性を提供し、バグの早期発見を支援"
  },
  {
    term: "Node.js",
    definition: "JavaScriptをサーバーサイドで実行するランタイム環境。AIアプリケーションのバックエンド開発に広く利用される"
  },
  {
    term: "クラウドAI (Cloud AI)",
    definition: "クラウドサービスプロバイダー（AWS, Azure, GCPなど）が提供するAIサービスやプラットフォーム。インフラ構築の手間なく、スケーラブルなAIソリューションを迅速に導入できる"
  },
  {
    term: "ノーコードAI / ローコードAI (No-code AI / Low-code AI)",
    definition: "プログラミング知識がなくても、視覚的なインターフェースや簡易な記述でAIモデルの開発・導入を可能にするツールやプラットフォーム。AI活用の敷居を下げる"
  },
  {
    term: "バイブコーディング (Vibe Coding)",
    definition: "AIに自然言語で指示を出し、AIがコードを生成する新しいプログラミング手法。プログラミングの知識が少ない人でも、AIとの対話を通じて開発ができる"
  },
  {
    term: "エッジAI (Edge AI)",
    definition: "AIモデルをクラウドではなく、スマートフォンやIoTデバイスなどの「エッジ」で直接実行する技術。リアルタイム処理やプライバシー保護に貢献する"
  },
  {
    term: "ベクトルデータベース (Vector Database)",
    definition: "埋め込み（Embedding）されたベクトルデータを効率的に格納・検索するために特化したデータベース。RAGなどの外部知識利用型AIシステムの基盤となる"
  }
];

// プロンプトとトークンカテゴリー
const promptsAndTokens: GlossaryTerm[] = [
  {
    term: "プロンプト (Prompt)",
    definition: "AIモデルに対する指示や入力テキスト。モデルの出力を制御するために重要"
  },
  {
    term: "プロンプトエンジニアリング",
    definition: "AIモデルから望ましい出力を得るための入力（プロンプト）設計技術"
  },
  {
    term: "コンテキスト (Context)",
    definition: "AIモデルに与える文脈や背景情報。より適切な応答を得るために重要な要素"
  },
  {
    term: "トークン化 (Tokenization)",
    definition: "テキストを単語や部分文字列に分割する処理。言語モデルの入力の前処理として重要"
  },
  {
    term: "トークン (Token)",
    definition: "言語モデルが処理する最小単位。単語や文字の一部に分割された要素"
  },
  {
    term: "ハルシネーション (Hallucination)",
    definition: "AIモデルが事実でない情報を自信を持って生成してしまう現象。精度向上の課題の一つ"
  },
  {
    term: "マークダウン (Markdown)",
    definition: "軽量マークアップ言語の一種。AI生成テキストの構造化や書式設定に用いられ、多くのAIツールが出力形式として採用"
  }
];

// 学習手法カテゴリー
const learningMethods: GlossaryTerm[] = [
  {
    term: "ファインチューニング",
    definition: "事前学習済みモデルを特定のタスクに適応させるため、追加学習を行うプロセス"
  },
  {
    term: "転移学習 (Transfer Learning)",
    definition: "ある領域で学習したモデルを別の領域に適用する技術。学習効率の向上に貢献"
  },
  {
    term: "強化学習 (Reinforcement Learning)",
    definition: "試行錯誤を通じて最適な行動を学習する手法。ゲームAIや自律型ロボットの開発に活用"
  },
  {
    term: "自己教師あり学習 (Self-supervised Learning)",
    definition: "人間によるラベル付けなしに、データ自体から教師信号を生成して学習を行う手法。大量の未ラベルデータから効率的に知識を獲得できる"
  }
];

// モデルの構成要素カテゴリー
const modelComponents: GlossaryTerm[] = [
  {
    term: "エンベッディング (Embedding)",
    definition: "テキストや画像などを数値ベクトルに変換する技術。類似性の計算や検索に利用"
  },
  {
    term: "アテンション機構 (Attention Mechanism)",
    definition: "入力データの重要な部分に注目する仕組み。言語モデルの性能向上に大きく貢献"
  },
  {
    term: "CNN (Convolutional Neural Network)",
    definition: "画像認識に特化したニューラルネットワーク。画像の特徴を効率的に抽出"
  },
  {
    term: "RNN (Recurrent Neural Network)",
    definition: "時系列データを処理できるニューラルネットワーク。言語処理や音声認識に利用"
  }
];

// 学習プロセスカテゴリー
const learningProcess: GlossaryTerm[] = [
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

// 開発プロセス関連カテゴリー
const developmentProcess: GlossaryTerm[] = [
  {
    term: "Accept",
    definition: "AIモデルやシステムの出力や機能が要件を満たしているかを検証し承認するプロセス"
  },
  {
    term: "ウォーターホール (Waterhole)",
    definition: "AIプロジェクトにおいて、共通の情報源や知識ベースとして機能する中央集約型のリソース"
  },
  {
    term: "アジャイル (Agile)",
    definition: "反復的かつ漸進的なアプローチでAI開発を行う方法論。柔軟性と迅速な適応を重視"
  },
  {
    term: "オーケストレーション (Orchestration)",
    definition: "複数のAIシステムやサービスを連携させ、統合的に管理・制御するプロセス"
  },
  {
    term: "プロビジョニング (Provisioning)",
    definition: "AIモデルを実行するためのリソースや環境を準備し、構成するプロセス"
  },
  {
    term: "ワイヤーフレーム (Wireframe)",
    definition: "AIアプリケーションのユーザーインターフェースの基本構造を示す簡略図"
  },
  {
    term: "ロールバック (Rollback)",
    definition: "AIモデルやシステムを以前のバージョンや状態に戻すプロセス。問題発生時の対応策として重要"
  },
  {
    term: "デプロイ (Deploy)",
    definition: "AIモデルやアプリケーションを本番環境に展開し、実際に使用可能な状態にするプロセス"
  },
  {
    term: "PoC (Proof of Concept)",
    definition: "AIプロジェクトを本格的に開始する前に、特定のアイデアや技術が実現可能であるかを検証するための試作・実証。リスクを抑えながら効果を評価できる"
  },
  {
    term: "MLOps (Machine Learning Operations)",
    definition: "機械学習モデルの開発から運用までの一連のライフサイクルを効率化・自動化するプラクティス。信頼性の高いAIシステムの構築に不可欠"
  }
];

// すべてのカテゴリーを配列にまとめる
export const glossaryCategories: GlossaryCategory[] = [
  {
    id: "basic-concepts",
    title: "基本概念",
    terms: basicConcepts
  },
  {
    id: "machine-learning-basics",
    title: "機械学習の基礎",
    terms: machineLearningBasics
  },
  {
    id: "language-models",
    title: "言語モデル関連",
    terms: languageModels
  },
  {
    id: "technical-implementation",
    title: "技術実装関連",
    terms: technicalImplementation
  },
  {
    id: "prompts-tokens",
    title: "プロンプトとトークン",
    terms: promptsAndTokens
  },
  {
    id: "learning-methods",
    title: "学習手法",
    terms: learningMethods
  },
  {
    id: "model-components",
    title: "モデルの構成要素",
    terms: modelComponents
  },
  {
    id: "learning-process",
    title: "学習プロセス",
    terms: learningProcess
  },
  {
    id: "development-process",
    title: "開発プロセス関連",
    terms: developmentProcess
  }
];
