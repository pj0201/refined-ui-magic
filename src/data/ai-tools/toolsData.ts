
import { Brain, Code, FileVideo, Image, MessageSquare, Zap, Search, Database, Shield, LineChart, Package, Bot } from "lucide-react";
import { ToolCategory } from "./types";

export const toolCategories: ToolCategory[] = [
  {
    category: "全般での活用",
    icon: Brain,
    tools: [
      { name: "Claude 4 (Opus / Sonnet)", description: "Anthropicの最新世代AIモデル。特にOpus 4は、高度な推論、複雑なコーディング、自律的なAIエージェント構築能力において業界最高水準の性能を発揮。Sonnet 4は、効率性とコストパフォーマンスに優れ、多様なビジネスユースケースに対応する。" },
      { name: "GPT-4o", description: "OpenAIの最新フラッグシップモデル。テキスト、画像、音声の入出力にネイティブ対応するマルチモーダルAIで、リアルタイムに近い応答速度と人間のような自然な対話能力、高度な推論力を兼ね備える。顧客対応、クリエイティブコンテンツ生成、リアルタイム通訳など、広範な用途で革新的な活用が可能。" },
      { name: "Gemini 2.5 Pro", description: "Googleの最先端AIモデル。最大100万トークンという超長文脈理解（約1時間分の動画、11時間分の音声、3万行以上のコードに相当）を持ち、非常に大規模なデータセットから複雑なパターンを抽出し、高度な分析を可能にする。推論、コーディング、マルチモーダル理解において高い性能を発揮し、企業の大規模な文書分析、動画コンテンツの要約、複雑なデータからの洞察抽出など、エンタープライズ領域で特に強みを発揮。" },
      { name: "Llama 3.1", description: "Metaのオープンソースモデル。高精度な推論と多様なタスク処理能力を持ち、ローカル環境での実行や特定用途へのカスタマイズが容易。企業のプライバシー要件に対応しやすい。" },
      { name: "Grok 2", description: "xAIの対話型モデル。リアルタイムデータアクセスと風刺的ユーモアが特徴の革新的AI。最新の時事情報に基づいた洞察や、マーケティングにおけるユニークなコンテンツ生成に活用可能。" },
      { name: "Mistral Large", description: "Mistral AIの高性能モデル。効率的なアーキテクチャで高速処理と低リソースでの動作を実現。コスト効率と性能のバランスが良く、多様なビジネスシーンでの導入に適している。" },
      { name: "Perplexity AI", description: "リアルタイム検索機能を統合した対話型AI。最新情報に基づく回答と、その情報源の透明性を提供。リサーチ業務や市場調査において、信頼性の高い情報収集をサポート。" },
      { name: "DeepSeek Coder", description: "コーディング特化型AI。複雑なプログラミング課題解決と技術文書理解に優れた性能を発揮し、開発者の生産性向上とコード品質の改善に貢献。" }
    ]
  },
  {
    category: "開発・クリエイティブ",
    icon: Code,
    tools: [
      { name: "Cursor", description: "AIパワードのコードエディタ。GPT-4oなどの最新LLMと連携し、リアルタイムのコード補完、バグ修正提案、リファクタリング支援、そして自然言語によるコード生成まで可能にする、開発者のための強力なAIパートナー。" },
      { name: "Devin", description: "Cognition AIが開発した世界初のAIソフトウェアエンジニア。自然言語の指示だけで、複雑なソフトウェアプロジェクト全体を計画・実行・デバッグできる、自律性の高い開発AI。" },
      { name: "GitHub Copilot", description: "GitHubとOpenAIの共同開発によるコーディングアシスタント。開発中のコードコンテキストを深く理解し、的確なコード提案、関数生成、テストコード生成を自動で行うことで、開発効率と品質を飛躍的に向上させる。" },
      { name: "V0.dev", description: "VercelのUIコンポーネント生成AI。自然言語の指示からReactなどのUIコンポーネントのデザインとコードを瞬時に自動生成し、Webアプリケーションのプロトタイプ作成や開発を大幅に効率化する。" },
      { name: "Replit Ghostwriter", description: "コード生成と問題解決を支援するAIツール。学習とリアルタイムフィードバックを通じて、開発者のスキル向上をサポートし、チームでの共同開発も容易にする。" }
    ]
  },
  {
    category: "アプリケーション開発",
    icon: Zap,
    tools: [
      { name: "Lovable", description: "AIを活用したWebアプリケーション開発プラットフォーム。直感的な対話でコードを生成し、ビジネスロジックに集中できる効率的な開発を実現。プログラミング経験が少ない担当者でもアプリ開発が可能に。" },
      { name: "Vercel AI SDK", description: "AI機能を簡単に統合できるReactフレームワーク。ストリーミングUIと最適化されたAI応答を実装可能で、ユーザー体験を損なうことなく、AIを活用したリッチなWebアプリケーションを開発できる。" },
      { name: "Plasmic", description: "ノーコードでAIパワードのWebサイト・アプリ開発が可能なプラットフォーム。デザイナーと開発者の連携をスムーズにし、デザインから実装までを効率化。マーケティングサイトやLPの迅速な立ち上げに貢献。" }
    ]
  },
  {
    category: "サーチツール",
    icon: Search,
    tools: [
      { name: "Kagi Search", description: "AIを活用したプライバシー重視の検索エンジン。広告なしでカスタマイズ性が高く、高品質な検索結果を提供。特定の専門分野のリサーチや、ノイズの少ない情報収集に適している。" },
      { name: "Perplexity", description: "AIによる情報検索と要約を行うプラットフォーム。複数のソースから信頼性の高い回答を生成し、引用元を明示するため、ビジネスにおける情報収集の信頼性を向上させる。" },
      { name: "You.com", description: "AIを統合した次世代検索エンジン。検索結果の要約と視覚的な情報整理機能を提供し、ユーザーの検索意図に合わせたパーソナライズされた情報提供で、効率的なリサーチを支援。" }
    ]
  },
  {
    category: "動画生成",
    icon: FileVideo,
    tools: [
      { name: "Runway Gen-3", description: "テキストから高品質な映像コンテンツを生成するAIツール。創造的な映像制作をシンプル化し、マーケティング動画やプレゼンテーション用のコンテンツを迅速に作成できる。" },
      { name: "Sora", description: "OpenAIの動画生成AI。簡単な指示から複雑なシーンや動き、複数のキャラクターを含む高品質な動画を作成可能。映画制作、広告、教育コンテンツなど、幅広い用途での活用が期待される。" },
      { name: "Pika Labs", description: "テキストプロンプトから短時間で魅力的な動画コンテンツを作成できるAIプラットフォーム。手軽に高品質な動画を生成できるため、SNSマーケティングやクイックなコンテンツ制作に最適。" }
    ]
  },
  {
    category: "画像生成",
    icon: Image,
    tools: [
      { name: "DALL-E 3", description: "OpenAIの高精度画像生成モデル。詳細な指示からコンセプト通りの精巧なイメージを作成可能。マーケティング素材、製品デザイン、イラスト制作など多様なビジネスシーンで活用。" },
      { name: "Midjourney V6", description: "芸術的表現に優れた画像生成AI。リアルからファンタジーまで様々なスタイルに対応し、プロフェッショナルなグラフィックデザインやブランディング素材の作成に適している。" },
      { name: "Stable Diffusion 3", description: "オープンソースの画像生成モデル。高度なカスタマイズとローカル実行が可能で、企業のセキュリティポリシーに合わせた運用や、特定の画像生成タスクに特化したモデル構築が可能。" }
    ]
  },
  {
    category: "データ分析",
    icon: Database,
    tools: [
      { name: "Akkio", description: "ノーコードのAI予測分析プラットフォーム。ビジネスデータから素早く洞察を引き出し、売上予測、顧客離反予測、需要予測などを専門知識なしで実行できる。" },
      { name: "MindsDB", description: "AIを既存データベースに統合するオープンソースツール。予測機能をSQLで簡単に実装可能で、データアナリストや開発者がAIを活用したスマートなアプリケーションを迅速に構築できる。" },
      { name: "Obviously AI", description: "コード不要で予測モデルを構築・展開できるAIプラットフォーム。データサイエンスを民主化し、ビジネスユーザーが自らデータに基づいた意思決定を行えるよう支援する。" }
    ]
  },
  {
    category: "セキュリティ",
    icon: Shield,
    tools: [
      { name: "Darktrace", description: "AIを活用したサイバーセキュリティプラットフォーム。自己学習型AIがネットワークの「正常な状態」を学習し、未知の脅威や異常をリアルタイムで検知・自動対応することで、企業を保護する。" },
      { name: "Crowdstrike Falcon", description: "AIパワードのエンドポイント保護プラットフォーム。機械学習と行動分析を組み合わせることで、高度なマルウェアやゼロデイ攻撃をリアルタイムで検知・対応し、企業のデジタル資産を守る。" }
    ]
  },
  {
    category: "ビジネスインテリジェンス",
    icon: LineChart,
    tools: [
      { name: "ThoughtSpot", description: "自然言語検索でデータ分析が可能なAIプラットフォーム。複雑なクエリを簡単に実行し、ビジネスユーザーが専門知識なしにデータから直接洞察を得られるように支援する。" },
      { name: "Tableau with Einstein", description: "AIを統合した可視化プラットフォーム。Einstein DiscoveryなどのAI機能がデータから自動的に洞察を発見し表示することで、データに基づいた意思決定を加速させる。" }
    ]
  },
  {
    category: "特殊用途",
    icon: MessageSquare,
    tools: [
      { name: "Kotoba", description: "日本語に特化した自然言語処理AI。文脈理解と日本語特有の表現に対応し、高精度なテキスト分析、要約、生成が可能。日本の企業が顧客対応やコンテンツ生成に活用しやすい。" },
      { name: "Geospy", description: "地理空間データ分析のためのAIツール。衛星画像、GPSデータなど、位置情報の高度な解析と予測を実現し、物流最適化、都市計画、災害対策などに貢献する。" },
      { name: "Firecrawl", description: "Webクローリングと情報抽出に特化したAIツール。膨大なウェブデータから価値ある情報を効率的に収集し、市場調査、競合分析、リード生成などのビジネス活動を強化する。" }
    ]
  },
  {
    category: "AI開発環境・プラットフォーム",
    icon: Package,
    tools: [
      { name: "Bolt", description: "特定のAIモデルを指すものではなく、開発者がAIアプリケーションを迅速に構築・デプロイするための高速開発フレームワークやプラットフォームを指す総称。効率的なAIワークフローの実現を支援する。" },
      { name: "Windsorf AI (Windsor.ai)", description: "複数のマーケティングデータソースを統合し、AIを活用してデータ分析とレポート生成を自動化するプラットフォーム。広告パフォーマンスの最適化やROIの可視化を支援し、データドリブンなマーケティング戦略立案に貢献する。" }
    ]
  },
  {
    category: "業務自動化",
    icon: Bot,
    tools: [
        { name: "GAS (Google Apps Script)", description: "Google Workspaceサービス（スプレッドシート、ドキュメント、Gmailなど）を連携・自動化するためのスクリプト言語。AIモデルのAPIと組み合わせることで、日々の業務フローの効率化や、データに基づいた意思決定支援ツールを構築できる。" },
        { name: "NBLM (Neural-Bandit Language Model)", description: "強化学習（バンディット問題）の概念を言語モデルに応用した技術。ユーザーのフィードバックや行動から最適な応答戦略を学習し、よりパーソナライズされた対話や推薦を行うことが可能になる。" },
        { name: "Dify", description: "LLMアプリケーション開発プラットフォーム。カスタムAIエージェントを簡単に構築・デプロイ可能で、社内業務の自動化、顧客サポートチャットボット、情報検索システムなどを迅速に開発できる。" },
        { name: "Zapier AI", description: "自然言語指示でワークフローを自動化できるAIプラットフォーム。5,000以上のアプリを連携し、日常的な定型業務をAIと連携して自動化することで、業務効率を大幅に向上させる。" },
        { name: "Make", description: "ノーコードで複雑な業務自動化シナリオを構築できるプラットフォーム。AIとの連携機能も充実しており、複数のSaaSツールを連携させ、より高度で柔軟な業務自動化を実現する。" },
        { name: "n8n", description: "オープンソースのワークフロー自動化ツール。AIとの統合が容易でカスタマイズ性が高く、企業独自の複雑な業務プロセスやシステム連携を効率的に自動化できる。" }
    ]
  }
];
